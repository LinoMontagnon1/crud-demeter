from flask import render_template
from app import app

from flask import render_template
from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/crud')
def outra_pagina():
    return render_template('crud.html')