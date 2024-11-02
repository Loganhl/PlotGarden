from flask import Flask, render_template, request, url_for, flash, redirect, abort


app = Flask(__name__)
app.config["DEBUG"] = True
app.config['SECRET_KEY'] = 'secret key'

@app.route('/')
def index():
    
    return render_template('index.html')