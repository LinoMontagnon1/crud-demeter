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
    // Aqui você pode recuperar os valores dos campos de entrada e fazer o que for necessário,
    // como enviar para o servidor, adicionar à lista 'docs', etc.

    // Exemplo: Adicionando um objeto fictício à lista docs
    var novoUsuario = {
        'tipoUsuario': 'Novo Tipo',
        'nome': document.getElementById('novo-nome').value,
        'email': document.getElementById('novo-email').value,
        'cpf': document.getElementById('novo-cpf-cnpj').value,
        'telefone': document.getElementById('novo-telefone').value,
        'inscricaoEstadual': document.getElementById('novo-inscricao-estadual').value,
        'endereco': document.getElementById('novo-endereco').value,
        'bairroDistrito': document.getElementById('novo-bairro').value,
        'cidade': document.getElementById('novo-cidade').value,
        'cep': document.getElementById('novo-cep').value,
        'uf': document.getElementById('novo-uf').value,
    };

    // Adicionando o novo usuário à lista de documentos
    docs.push({ 'novo-id': novoUsuario });

    // Redirecionando para a página com a nova linha adicionada
    window.location.reload();
}