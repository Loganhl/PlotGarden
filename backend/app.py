import sqlite3
from flask import Flask, jsonify
from flask_cors import CORS
import os


app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = True
app.config['SECRET_KEY'] = 'secret key'

def get_db_connection():
    db_path = os.path.join(os.path.dirname(__file__), '..', 'database', 'database.db')
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/plants', methods=['GET'])
def get_plants():
    conn = get_db_connection()
    plants = conn.execute('SELECT * FROM plants').fetchall()
    conn.close()

    return jsonify([dict(plant) for plant in plants])
    
@app.route('/api/crop/<int:id>', methods=["GET"])
def get_crop(id):
    conn = get_db_connection()
    crop = conn.execute('SELECT * FROM plants WHERE id = ?', (id,)).fetchone()
    conn.close()

    if crop is None:
        return jsonify({"error": "Plant not found"}), 404
    
    return jsonify(dict(crop))