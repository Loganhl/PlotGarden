import sqlite3
from flask import Flask, render_template, request, url_for, flash, redirect, abort


app = Flask(__name__)
app.config["DEBUG"] = True
app.config['SECRET_KEY'] = 'secret key'

def get_db_connection():
    conn = sqlite3.connect('/database/')

    conn.row_factory = sqlite3.Row

    return conn

@app.route('/')
def index():
    
    return render_template('index.html')