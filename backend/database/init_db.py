import sqlite3
import os

#get folder path
script_dir = os.path.dirname(os.path.abspath(__file__))

#create paths for database and schema
db_path = os.path.join(script_dir, "/database/database.db")
schema_path = os.path.join(script_dir, "schema.sql")

#connect to db file
connection = sqlite3.connect(db_path)

with open(schema_path) as database_schema:
    connection.executescript(database_schema.read())

connection.commit()
connection.close()