import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS
from pairing import present_plant_ids
from dotenv import load_dotenv
import os
from create_cluster import create_garden_plot
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

def get_db_connection():
    print("Connected to Database")
    db_path = 'database/database.db'
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def convert_user_id(user_id):
    return user_id[-9:]


@app.route('/api/plants', methods=['GET'])
def get_plants():
    conn = get_db_connection()
    plants = conn.execute('SELECT * FROM plants').fetchall()
    conn.close()

    return jsonify([dict(plant) for plant in plants])

@app.route('/api/present-plants/<int:garden_id>', methods=["GET"])
def get_present_plants(garden_id):
    print(f"Received request for present plants with garden ID: {garden_id}")  # Test
    conn = get_db_connection()  # Test
    try:
        plants_data = present_plant_ids(garden_id)

        if plants_data:
            #print(f"Plants data retrieved: {plants_data}") 
            return jsonify(plants_data)
        else:
            print("No plants found for this garden ID.")
            return jsonify({"message": "No plants found for this garden ID."}), 404
            
    except Exception as e:
        print(f"An error occurred: {e}")  
        return jsonify({"error": str(e)}), 500 #server error response
    finally:
        conn.close()
    
@app.route('/api/crop/<int:id>', methods=["GET"])
def get_crop(id):
    conn = get_db_connection()
    crop = conn.execute('SELECT * FROM plants WHERE id = ?', (id,)).fetchone()
    conn.close()

    if crop is None:
        return jsonify({"error": "Plant not found"}), 404
    
    return jsonify(dict(crop))

@app.route('/api/crop', methods=["POST"])
def add_crops():
    conn = get_db_connection()

    data = request.get_json()

    print(data)

    garden_id = data.get('garden_id')
    id = data.get('crop_id')
    crop_name = data.get('crop_name')

    if garden_id is None or id is None or crop_name is None:
        return jsonify({"error": "Missing required fields"}), 400

    insert_query = '''
        INSERT INTO crops (garden_id,id,crop_name)
        VALUES (?,?,?)
    '''

    params = (garden_id,id,crop_name)

    try:
        conn.execute(insert_query, params)
        conn.commit()
        #create_garden_plot(garden_id)
        return jsonify({"garden_id": garden_id}), 201 
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        conn.close()

@app.route('/api/gardens/<int:id>', methods=["GET"])
def get_gardens(id):

    conn = get_db_connection()
    gardens = conn.execute('SELECT * FROM gardens WHERE user_id = ?', (id,)).fetchall()
    print(gardens)
    conn.close()

    return jsonify([dict(garden) for garden in gardens])

@app.route('/api/garden/<int:id>', methods=["GET"])
def get_garden(id):
    conn = get_db_connection()
    garden = conn.execute('SELECT * FROM gardens WHERE garden_id = ?', (id,)).fetchone()
    conn.close()

    if garden is None:
        return jsonify({"error": "Garden not found"}), 404
    
    return jsonify(dict(garden))

@app.route('/api/crops/<int:id>', methods=["GET"])
def get_crops(id):
    conn = get_db_connection()
    crops = conn.execute('SELECT * FROM crops WHERE garden_id = ?', (id, )).fetchall()
    conn.close()

    return jsonify([dict(crop) for crop in crops])


@app.route('/api/gardens', methods=["POST"])
def add_garden():
    conn = get_db_connection()

    data = request.get_json()

    garden_name = data.get('garden_name')
    location = data.get('location')
    description = data.get('description')
    image_link = data.get('image_link')
    garden_len = data.get('garden_len')
    garden_width = data.get('garden_wid')
    user_id = data.get('user_id')

    new_id = convert_user_id(user_id)

    insert_query = '''
        INSERT INTO gardens (garden_name, location, description, image_link, garden_len, garden_wid, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)'''
    
    params = (garden_name, location, description, image_link, garden_len, garden_width, new_id)

    try:
        conn.execute(insert_query, params)
        conn.commit()
        garden_id = conn.execute('SELECT last_insert_rowid()').fetchone()[0]  
        return jsonify({"garden_id": garden_id}), 201 
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        conn.close()
