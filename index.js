document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gasto-form');
    const listaGastos = document.getElementById('lista-gastos');
    let gastos = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const descricao = document.getElementById('descricao').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const categoria = document.getElementById('categoria').value;

        if (descricao.trim() === '' || isNaN(valor) || valor <= 0 || categoria.trim() === '') {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const novoGasto = {
            descricao: descricao,
            valor: valor,
            categoria: categoria
        };

        gastos.push(novoGasto);
        renderizarLista();
        form.reset();
    });

    function renderizarLista() {
        listaGastos.innerHTML = '';

        const gastosPorCategoria = agruparPorCategoria(gastos);

        for (const categoria in gastosPorCategoria) {
            const categoriaElement = document.createElement('div');
            categoriaElement.innerHTML = `<h3>${categoria}</h3>`;
            listaGastos.appendChild(categoriaElement);

            const listaGastosCategoria = document.createElement('ul');
            gastosPorCategoria[categoria].forEach(function(gasto, index) {
                const li = document.createElement('li');
                li.textContent = `${gasto.descricao}: R$ ${gasto.valor.toFixed(2)}`;
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.addEventListener('click', function() {
                    removerGasto(gasto);
                });
                li.appendChild(deleteButton);

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', function() {
                    editarGasto(gasto);
                });
                li.appendChild(editButton);

                listaGastosCategoria.appendChild(li);
            });

            categoriaElement.appendChild(listaGastosCategoria);
        }
    }

    function removerGasto(gasto) {
        const index = gastos.indexOf(gasto);
        if (index !== -1) {
            gastos.splice(index, 1);
            renderizarLista();
        }
    }

    function editarGasto(gasto) {
        const descricao = prompt('Digite a nova descrição:', gasto.descricao);
        if (descricao === null) {
            return; // Usuário cancelou a edição
        }
        const valor = parseFloat(prompt('Digite o novo valor:', gasto.valor));
        if (isNaN(valor) || valor <= 0) {
            alert('Valor inválido. Por favor, insira um número positivo.');
            return;
        }
        const categoria = prompt('Digite a nova categoria:', gasto.categoria);
        if (categoria === null) {
            return; // Usuário cancelou a edição
        }

        gasto.descricao = descricao;
        gasto.valor = valor;
        gasto.categoria = categoria;

        renderizarLista();
    }

    function agruparPorCategoria(gastos) {
        const grupos = {};
        gastos.forEach(function(gasto) {
            if (!grupos[gasto.categoria]) {
                grupos[gasto.categoria] = [];
            }
            grupos[gasto.categoria].push(gasto);
        });
        return grupos;
    }
});
