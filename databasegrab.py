import requests
import sqlite3

plant_ids = [
    3013, 3024, 3025, 3234, 3387,
    4302, 4463, 4626, 5021, 5022, 5023, 5024, 5498, 5533, 5535,
    5841, 6169, 6236, 6539, 6766, 6950, 6952, 6963, 7109, 7405,
    7409, 7833, 7843, 8039, 8065, 8062, 8489, 8546, 8658, 8759,
    10096
]

# Database connection
conn = sqlite3.connect('database/database.db')
cursor = conn.cursor()

# Function to insert plant data into the database
def insert_plant_data(plant_data):
    # Ensure plant_data is a dictionary
    if not isinstance(plant_data, dict):
        print("Invalid plant data:", plant_data)
        return
    
    try:
        cursor.execute(""" 
            INSERT INTO plants (id, common_name, scientific_name, dimensions, cycle, watering, 
                                watering_period, watering_general_benchmark, sunlight, hardiness, 
                                attracts, propagation, flowers, flowering_season, soil, 
                                fruits, edible_fruit, harvest_method, 
                                harvest_season, leaf, edible_leaf, growth_rate, maintenance, 
                                poisonous_to_pets, care_level, description, default_image)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                plant_data.get('id', None),
                plant_data.get('common_name', ''),
                ', '.join(plant_data.get('scientific_name', [])),
                f"{plant_data.get('dimensions', {}).get('min_value', 0)} - {plant_data.get('dimensions', {}).get('max_value', 0)} {plant_data.get('dimensions', {}).get('unit', '')}",
                plant_data.get('cycle', ''),
                plant_data.get('watering', ''),
                plant_data.get('watering_period', ''),
                f"{plant_data.get('watering_general_benchmark', {}).get('value', '')} {plant_data.get('watering_general_benchmark', {}).get('unit', '')}",
                ', '.join(plant_data.get('sunlight', [])),
                f"{plant_data.get('hardiness', {}).get('min', '')} - {plant_data.get('hardiness', {}).get('max', '')}",
                ', '.join(plant_data.get('attracts', [])),
                ', '.join(plant_data.get('propagation', [])),
                plant_data.get('flowers', ''),
                plant_data.get('flowering_season', ''),
                ', '.join(plant_data.get('soil', [])),
                plant_data.get('fruits', ''),
                plant_data.get('edible_fruit', ''),
                plant_data.get('harvest_method', ''),
                plant_data.get('harvest_season', ''),
                plant_data.get('leaf', ''),
                plant_data.get('edible_leaf', ''),
                plant_data.get('growth_rate', ''),
                plant_data.get('maintenance', ''),
                plant_data.get('poisonous_to_pets', ''),
                plant_data.get('care_level', ''),
                plant_data.get('description', ''),
                plant_data.get('default_image', {}).get('original_url', '')
            )
        )
    except Exception as e:
        print(f"Error inserting data for plant ID {plant_data.get('id', 'unknown')}: {e}")

# Base URL for the API
base_url = 'https://perenual.com/api/species/details/'

# Loop through each plant ID and make the API request
for plant_id in plant_ids:
    url = f"{base_url}{plant_id}?key=sk-2A276725d1fa3322f7505"
    response = requests.get(url)
    
    if response.status_code == 200:
        plant_data = response.json()
        
        # Check if plant_data is valid
        if plant_data:
            insert_plant_data(plant_data)
        else:
            print(f"No data found for plant ID {plant_id}")
    else:
        print(f"Error fetching data for plant ID {plant_id}: {response.status_code}")

# Commit to the database.
conn.commit()
conn.close()
