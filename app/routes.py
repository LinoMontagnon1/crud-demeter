from flask import render_template, request, redirect, flash, url_for
from app import app
from firebase_connection import db

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/crud', methods=['POST'])
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

@app.route('/create', methods=['POST', ])
def create():
    data = request.get_json()
    user_data = data['novoUsuario']
    # print(data)
    # print(user_data)

    dataset = {
        'bairroDistrito': user_data['bairroDistrito'],
        'cep': user_data['cep'],
        'cidade': user_data['cidade'],
        'cnpj': user_data['cnpj'],
        'email': user_data['email'],
        'endereco': user_data['endereco'],
        'inscricaoEstadual': user_data['ie'],
        'nome': user_data['nome'],
        'produtos': [],
        'telefone': user_data['telefone'],
        'tipoUsuario': user_data['tipoUsuario'],
        'uf': user_data['uf'],
        'urls': []
    }

    db.create(dataset)

    return {'status': 'success'}

# @app.route('/create', methods=['POST', ])
# def create():
#     # Recebe e imprime os dados
#     if request.method == 'POST':
#         data = request.json  # Obtém os dados do JSON

#         usuario = data.get('usuario')
#         nome = data.get('nome')
#         email = data.get('email')
#         cpf_cnpj = data.get('cpf_cnpj')
#         telefone = data.get('telefone')
#         ie = data.get('ie')
#         endereco = data.get('endereco')
#         bairro = data.get('bairro')
#         cidade = data.get('cidade')
#         cep = data.get('cep')
#         uf = data.get('uf')

#         # Lógica para salvar os dados no banco de dados ou realizar outras operações

#         # Redireciona de volta para a rota /crud
#         return jsonify({'success': True})  # Ou qualquer outra resposta JSON que desejar