import asyncio
from zip_api import *
import sqlite3
import re

crop_size_categories = {
    "small": [],
    "medium": [],
    "large": []
}

maintain_categories = {
    "Low": [],
    "Moderate": [],
    "High": []
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
        return crop_size_categories["small"]
    elif size_code == 2:
        return crop_size_categories["medium"]
    elif size_code == 3:
        return crop_size_categories["large"]
    return []

async def get_user_zone(zipcode):
    return await get_zone_number(zipcode)

def get_zip_match(user_zip):
    # Run the asynchronous get_user_zone function to get the zone number.
    user_zone = asyncio.run(get_user_zone(user_zip))
    
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

def categorize_plants():
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    
    # Query the database to retrieve dimensions and maintenance level.
    cursor.execute("SELECT id, dimensions, maintenance FROM plants")
    plants = cursor.fetchall()

    for plant_id, dimensions, maintenance in plants:
        # Categorize by size
        match = re.match(r"(\d*\.?\d+)\s*-\s*(\d*\.?\d+)\s*feet", dimensions)
        if match:
            min_size = float(match.group(1))

            # Categorize based on the minimum size.
            if min_size <= 1:
                crop_size_categories["small"].append(plant_id)
            elif 1 < min_size <= 2:
                crop_size_categories["medium"].append(plant_id)
            else:
                crop_size_categories["large"].append(plant_id)

        # Categorize by maintenance level
        if maintenance in maintain_categories:
            maintain_categories[maintenance].append(plant_id)

    conn.close()

def get_garden_info(garden_id):
    conn = sqlite3.connect('database/database.db')
    cursor = conn.cursor()
    
    # Query the database to retrieve garden dimensions and zip code for the specified garden_id.
    cursor.execute("SELECT garden_len, garden_wid, location FROM gardens WHERE garden_id = ?", (garden_id,))
    garden = cursor.fetchone()
    
    conn.close()
    
    if garden:
        garden_len, garden_wid, zipcode = garden
        garden_size = (garden_len, garden_wid)
        size_code = calculate_size(garden_size)
        recommended_crops = pair_size(size_code)
        return (zipcode, size_code, recommended_crops)
    
    return None

# The present_plant_ids function can be imported and called from other code.
def present_plant_ids(garden_id):
    # Categorize plants by size and maintenance level at the start.
    categorize_plants()

    # Get garden info for the given garden_id
    garden_info = get_garden_info(garden_id)
    
    if garden_info:
        zipcode, size_code, recommended_crops = garden_info
        user_zone = asyncio.run(get_user_zone(zipcode))
        matching_plants = get_zip_match(zipcode)
        
        return {
            "matching_plants": matching_plants,
            "maintain_categories": maintain_categories,
            "recommended_crops": recommended_crops
        }
    
    return None
