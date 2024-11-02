import asyncio
from zip_api import *
import sqlite3
import re

crop_categories = {
    "small": [],
    "medium": [],
    "large": []
}

def calculate_size(garden_size):
    length, width = garden_size
    square_feet = length * width
    
    if square_feet < 50:
        return 1 
    elif 50 <= square_feet < 200:
        return 2
    else:
        return 3

def pair_size(size_code):
    # Return recommended crops based on the size code.
    if size_code == 1:
        return crop_categories["small"]
    elif size_code == 2:
        return crop_categories["medium"]
    elif size_code == 3:
        return crop_categories["large"]
    return []

async def get_user_zone(zipcode):
    return await get_zone_number(zipcode)

def get_zip_match(user_zip):
    zipcode = user_zip
    
    # Run the asynchronous get_user_zone function to get the zone number.
    user_zone = asyncio.run(get_user_zone(zipcode))
    
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    
    recommended_zipcode_list = []

    # Query the database to find plants with matching hardiness zones.
    cursor.execute("SELECT id, hardiness FROM plants")
    plants = cursor.fetchall()

    for plant_id, hardiness in plants:
        # Check if the hardiness value is not empty and matches the expected format.
        if hardiness and ' - ' in hardiness:
            try:
                # Extract min and max zone values
                min_zone, max_zone = map(float, hardiness.split(' - '))
                
                # Check if the user zone is within the range.
                if min_zone <= user_zone <= max_zone:
                    recommended_zipcode_list.append(plant_id)
            except ValueError:
                print(f"Skipping plant_id {plant_id} due to invalid hardiness value: {hardiness}")
    
    conn.close()
    
    return recommended_zipcode_list

def categorize_plants_by_size():
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    
    # Query the database to retrieve dimensions.
    cursor.execute("SELECT id, dimensions FROM plants")
    plants = cursor.fetchall()

    for plant_id, dimensions in plants:
        match = re.match(r"(\d*\.?\d+)\s*-\s*(\d*\.?\d+)\s*feet", dimensions)
        if match:
            min_size = float(match.group(1))

            # Categorize based on the minimum size.
            if min_size <= 1:
                crop_categories["small"].append(plant_id)
            elif 1 < min_size <= 2:
                crop_categories["medium"].append(plant_id)
            else:
                crop_categories["large"].append(plant_id)

    conn.close()

# Categorize plants by size at the start.
categorize_plants_by_size()

# Print Testing
garden_dimensions = [25, 52]
size_code = calculate_size(garden_dimensions)
recommended_crops = pair_size(size_code)
print(f"Recommended crops for a garden of size {size_code}: {recommended_crops}")

user_zip = '65201'
matching_plants = get_zip_match(user_zip)
print(f"Plants matching the user's zone: {matching_plants}")

print(f"Crop categories: {crop_categories}")