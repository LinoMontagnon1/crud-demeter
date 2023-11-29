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

function editarRegistro(docId) {
    // Encontrar os elementos da linha correspondente
    const row = document.querySelector(`tr[data-doc-id="${docId}"]`);

    // Iterar sobre as células da linha, excluindo a célula do doc-id
    const cells = row.cells;
    for (let i = 1; i < cells.length - 1; i++) {
        const currentContent = cells[i].textContent;

        // Criar um campo de entrada e definir o valor atual como o valor padrão
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentContent;

        // Substituir o conteúdo atual pelo campo de entrada
        cells[i].textContent = '';
        cells[i].appendChild(input);
    }

    // Substituir o botão de edição por botões de salvar e cancelar
    const editarButton = row.querySelector('.editar button');
    editarButton.innerHTML = `
        <button onclick="salvarEdicao('${docId}')">Salvar</button>
        <button onclick="cancelarEdicao('${docId}')">Cancelar</button>
    `;
}

function salvarEdicao(docId) {
    // Encontrar os elementos da linha correspondente
    const row = document.querySelector(`tr[data-doc-id="${docId}"]`);

    // Iterar sobre as células da linha
    const cells = row.cells;
    for (let i = 1; i < cells.length - 1; i++) {
        const input = cells[i].querySelector('input');

        // Substituir o campo de entrada pelo valor atualizado
        cells[i].textContent = input.value;
    }

    // Restaurar o botão de edição
    const editarButton = row.querySelector('.editar button');
    editarButton.innerHTML = `
        <button onclick="editarRegistro('${docId}')">
            <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/pencil-tip.png" alt="pencil-tip"/>
        </button>
    `;
}

function cancelarEdicao(docId) {
    // Encontrar os elementos da linha correspondente
    const row = document.querySelector(`tr[data-doc-id="${docId}"]`);

    // Iterar sobre as células da linha
    const cells = row.cells;
    for (let i = 1; i < cells.length - 1; i++) {
        const input = cells[i].querySelector('input');

        // Substituir o campo de entrada pelo valor original
        cells[i].textContent = input.defaultValue;
    }

    // Restaurar o botão de edição
    const editarButton = row.querySelector('.editar button');
    editarButton.innerHTML = `
        <button onclick="editarRegistro('${docId}')">
            <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/48/pencil-tip.png" alt="pencil-tip"/>
        </button>
    `;
}