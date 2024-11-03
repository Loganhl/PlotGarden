import sqlite3
import numpy as np

# Function to parse dimensions and return width and height.
def parse_dimension(dimension):
    if '-' in dimension:
        parts = dimension.split('-')
        min_size = float(parts[0].strip().split()[0])
        max_size = float(parts[1].strip().split()[0])
        return int(np.ceil(min_size)), int(np.ceil(max_size)) 
    else:
        single_size = int(np.ceil(float(dimension.strip().split()[0])))
        return single_size, single_size

# Get dimension data.
def fetch_crops_and_garden_dimensions(garden_id):
    conn = sqlite3.connect('backend/database/database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT garden_len, garden_wid FROM gardens WHERE garden_id = ?", (garden_id,))
    garden_dimensions = cursor.fetchone()
    if garden_dimensions is None:
        print("Garden not found.")
        return None, None

    garden_len, garden_wid = garden_dimensions

    cursor.execute(""" 
        SELECT p.dimensions, c.crop_name 
        FROM crops c 
        JOIN plants p ON c.id = p.id 
        WHERE c.garden_id = ? 
    """, (garden_id,))
    
    crops = cursor.fetchall()
    
    conn.close()
    
    return (garden_len, garden_wid), crops

# Function to get garden dimensions.
def get_garden_dimensions(garden_id):
    garden_dimensions, _ = fetch_crops_and_garden_dimensions(garden_id)
    return garden_dimensions

# Function to create a garden plot.
def create_garden_plot(garden_dimensions, crops):
    garden_len, garden_wid = garden_dimensions
    garden = np.full((garden_len, garden_wid), '', dtype=object)

    def parse_crop(crop):
        dimension, crop_name = crop
        return crop_name, parse_dimension(dimension)

    grouped_crops = {}
    crop_dimensions = {}
    for crop in crops:
        crop_name, (crop_width, crop_height) = parse_crop(crop)
        if crop_name not in grouped_crops:
            grouped_crops[crop_name] = []
        grouped_crops[crop_name].append((crop_width, crop_height))
        crop_dimensions[crop_name] = (crop_width, crop_height)

    def place_crop(crop_width, crop_height, crop_name):
        for r in range(garden_len - crop_height + 1):
            for c in range(garden_wid - crop_width + 1):
                if all(garden[r + h, c + w] == '' for h in range(crop_height) for w in range(crop_width)):
                    for h in range(crop_height):
                        for w in range(crop_width):
                            garden[r + h, c + w] = crop_name
                    return True
        return False

    def fill_garden_clustered():
        for crop_name, dimensions_list in grouped_crops.items():
            for (crop_width, crop_height) in dimensions_list:
                place_crop(crop_width, crop_height, crop_name)

    fill_garden_clustered()

    def compact_rows():
        for r in range(garden_len):
            crops_in_row = [crop for crop in garden[r] if crop]
            new_row = crops_in_row + [''] * (garden_wid - len(crops_in_row))
            garden[r] = new_row

    compact_rows()

    def rotate_and_fill():
        for crop_name, dimensions_list in grouped_crops.items():
            for crop_width, crop_height in dimensions_list:
                if crop_width != crop_height:
                    place_crop(crop_height, crop_width, crop_name)

    rotate_and_fill()

    def fill_empty_spaces():
        for r in range(garden_len):
            for c in range(garden_wid):
                if garden[r][c] == '':
                    for crop_name, dimensions_list in grouped_crops.items():
                        for crop_width, crop_height in dimensions_list:
                            if place_crop(crop_width, crop_height, crop_name):
                                break

    fill_empty_spaces()

    return garden, crop_dimensions

# Function to calculate the number of squares each crop occupies and the number of crops.
def calculate_crop_squares(garden, crop_dimensions):
    crop_square_count = {}
    crop_count = {}

    for row in garden:
        for crop in row:
            if crop:
                if crop not in crop_square_count:
                    crop_square_count[crop] = 0
                crop_square_count[crop] += 1

    for crop, total_squares in crop_square_count.items():
        if crop in crop_dimensions:
            width, height = crop_dimensions[crop]
            individual_crop_size = width * height
            crop_count[crop] = total_squares // individual_crop_size

    return crop_square_count, crop_count

# Function to get crop counts.
def get_crop_counts(garden_id):
    garden_dimensions, crops = fetch_crops_and_garden_dimensions(garden_id)

    if garden_dimensions and crops:
        garden, crop_dimensions = create_garden_plot(garden_dimensions, crops)
        _, crop_count = calculate_crop_squares(garden, crop_dimensions)
        return crop_count
    return None

# Function to get crop dimensions.
def get_crops_info(garden_id):
    _, crops = fetch_crops_and_garden_dimensions(garden_id)
    
    crops_info = {}
    if crops:
        for crop in crops:
            crop_name, dimensions = parse_crop(crop)
            crops_info[crop_name] = dimensions
    return crops_info

def parse_crop(crop):
    dimension, crop_name = crop
    return crop_name, parse_dimension(dimension)
