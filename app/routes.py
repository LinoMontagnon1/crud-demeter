from flask import render_template, request, redirect, flash, url_for
from app import app
from firebase_connection import db

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/crud', methods=['POST', ])
def crud():
    email = request.form['email']
    pwd = request.form['pwd']

    if email != 'admin' or pwd != 'admin':
        flash('Credenciais inválidas', 'error')
        return redirect(url_for('index'))
    
    docs = db.read()

    return render_template('crud.html', docs=docs)

@app.route('/delete', methods=['POST', ])
def delete():
    data = request.get_json()
    doc_id = data.get('docId').replace(' ', '')
    db.delete(doc_id)

    return {'status': 'success'}