function excluirRegistro(docId) {
    // var docId = document.getElementById('doc-id').textContent;
    var shouldDelete = confirm("Deseja deletar " + docId + " ?");
    
    if (shouldDelete) {
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ docId: docId }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta do servidor:', data);
            alert("Registro " + docId + " deletado com sucesso");
            location.reload();
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação: ', error);
        });
    }
}

function adicionarUsuario() {
    var novaLinha = document.getElementById('nova-linha');
    novaLinha.style.display = 'table-row';
}

function salvarNovoUsuario() {
    var novoUsuario = {
        'tipoUsuario': document.getElementById('novo-usuario').value,
        'nome': document.getElementById('novo-nome').value,
        'email': document.getElementById('novo-email').value,
        'cnpj': document.getElementById('novo-cnpj').value,
        'telefone': document.getElementById('novo-telefone').value,
        'ie': document.getElementById('novo-inscricao-estadual').value,
        'endereco': document.getElementById('novo-endereco').value,
        'bairroDistrito': document.getElementById('novo-bairro').value,
        'cidade': document.getElementById('novo-cidade').value,
        'cep': document.getElementById('novo-cep').value,
        'uf': document.getElementById('novo-uf').value,
    };

    fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novoUsuario }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
        alert("Usuário criado com sucesso");
        location.reload();
    })
    .catch(error => {
        console.error('Erro ao enviar solicitação: ', error);
    });
}