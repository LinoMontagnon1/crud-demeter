function excluirRegistro() {
    var docId = document.getElementById('doc-id').textContent;
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
            alert("Registro" + docId + " deletado com sucesso");
            location.reload();
        })
        .catch(error => {
            console.error('Erro ao enviar solicitação:', error);
        });
    }
}