import asyncio
from zip_api import *
import sqlite3

'''
recommended_size_list = plants that are in the small category
recommended_zipcode_list = plants that are in the recommended hardiness zone
difficulty_easy_list = easy plants
difficulty_medium_list = medium plants
difficulty_hard_list = hard plants
'''

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
    recommended_size_crops = []
    
    if size_code == 1:
        recommended_size_crops = crop_categories["small"]
    elif size_code == 2:
        recommended_size_crops = crop_categories["medium"]
    elif size_code == 3:
        recommended_size_crops = crop_categories["large"]

    return recommended_size_crops

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
        # Split the hardiness range (e.g., "5 - 10") and check if user range is a match.
        min_zone, max_zone = map(int, hardiness.split(' - '))
        if min_zone <= user_zone <= max_zone:
            recommended_zipcode_list.append(plant_id)
    
    conn.close()
    
    return recommended_zipcode_list

# Print Testing
garden_dimensions = [50, 52]
size_code = calculate_size(garden_dimensions)
recommended_crops = pair_size(size_code)
print(f"Recommended crops for a garden of size {size_code}: {recommended_crops}")

user_zip = '65201'
matching_plants = get_zip_match(user_zip)
print(f"Plants matching the user's zone: {matching_plants}")
