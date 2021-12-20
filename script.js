const arrayDaTabela = [];
const tempoDoDia = 1000 * 3600 * 24;

const dadosFornecidos = () => ({

    cliente : document.getElementById("nomeDoCliente").value,
    vencimento : document.getElementById('dataDoVencimento').value,
    valor : parseFloat(document.getElementById('valorDaCompra').value),
    total: 0
});

function limpardados() {
    let limpar = document.getElementById("tabela2");
    limpar.innerHTML = "";
}

function adicionarNaPagina(item){

    let clienteTr = document.createElement("tr");

    let clienteTd = document.createElement("td");
    let vencimentoTd = document.createElement("td");
    let valorTd = document.createElement("td");
    let totaTd = document.createElement("td");

    clienteTd.textContent = item.cliente;
    vencimentoTd.textContent = item.vencimento;
    valorTd.textContent = item.valor;
    totaTd.textContent = item.total;

    clienteTr.appendChild(clienteTd);
    clienteTr.appendChild(vencimentoTd);
    clienteTr.appendChild(valorTd);
    clienteTr.appendChild(totaTd);

    let tabela = document.getElementById("tabela2");
    tabela.appendChild(clienteTr);
}

function inserirArray(){
   
    arrayDaTabela.push(dadosFornecidos());  
    limpardados();
    arrayDaTabela.forEach(adicionarNaPagina);

    document.getElementById("nomeDoCliente").value = "";
    document.getElementById('dataDoVencimento').value = "";
    document.getElementById('valorDaCompra').value = "";
}

function adiconarJuros(){

    limpardados();
    let jurosCalculado = arrayDaTabela.map(function(item, indice){

        const hoje = new Date();
        const vence = new Date(item.vencimento);

        let diferencaDeDias = (hoje.getTime() - vence.getTime()) / tempoDoDia;
        let taxa = (diferencaDeDias * 0.001) + 0.02;
        let valorCompra = item.valor;
        let totalPagar = "";
        
        if(diferencaDeDias > 0){
            totalPagar = (valorCompra + valorCompra * taxa).toFixed(0);
        }else{
            totalPagar = valorCompra
        }

        item.total = parseFloat(totalPagar);     
        adicionarNaPagina(item);

    });
}

function organizarPorCliente (){

    arrayDaTabela.sort(function (a, b) {
	
        return (a.cliente > b.cliente) ? 1 : ((b.cliente > a.cliente) ? -1 : 0);
    });

    limpardados();

    function agruparPor(item, index) {
        return item.reduce(function (comparacao, objeto) {
          let valor = objeto[index];
          if (!comparacao[valor]) {
            comparacao[valor] = [];
          }
          comparacao[valor].push(objeto);
          return comparacao;
        }, {});
    }

    let grupodePessoas = agruparPor(arrayDaTabela, 'cliente');
    const array = [];
    for (const key in grupodePessoas)
    array.push(grupodePessoas[key]);

    for(i = 0; i <= array.length; i++){

        array[i].forEach(adicionarNaPagina);

        const somaFeita = array[i].map(item => item.total).reduce((prev, curr) => prev + curr, 0);

        let clienteTr = document.createElement("tr");
        let tudoTd = document.createElement("h3");
        tudoTd.textContent = `Total do Cliente: ${somaFeita}`;
        clienteTr.appendChild(tudoTd);
        let tabela = document.getElementById("tabela2");
        tabela.appendChild(clienteTr);
    }
}

function organizarPorVencimento(){

    arrayDaTabela.sort(function (a, b) {
	
        return (a.vencimento > b.vencimento) ? 1 : ((b.vencimento > a.vencimento) ? -1 : 0);
    });

    limpardados();

    function agruparPor(item, index) {
        return item.reduce(function (comparacao, objeto) {
          let valor = objeto[index];
          if (!comparacao[valor]) {
            comparacao[valor] = [];
          }
          comparacao[valor].push(objeto);
          return comparacao;
        }, {});
    }

    let grupodePessoas = agruparPor(arrayDaTabela, 'vencimento');
    const array = [];
    for (const key in grupodePessoas)
    array.push(grupodePessoas[key]);

    for(i = 0; i <= array.length; i++){

        array[i].forEach(adicionarNaPagina);

        const somaFeita = array[i].map(item => item.total).reduce((prev, curr) => prev + curr, 0);

        let clienteTr = document.createElement("tr");
        let tudoTd = document.createElement("h3");
        tudoTd.textContent = `Total da Data: ${somaFeita}`;
        clienteTr.appendChild(tudoTd);
        let tabela = document.getElementById("tabela2");
        tabela.appendChild(clienteTr);
    }
}

function fazerFiltragem(){

    limpardados();

    const dataMinima = document.getElementById("dataMinima").value;
    const dataMaxima = document.getElementById("dataMaxima").value;
    const valorMinimo = document.getElementById("valorMinimo").value;
    const valorMaximo = document.getElementById("valorMaximo").value;

    let informacoesFiltradas = arrayDaTabela.filter(array => array.valor >= valorMinimo && array.valor <= valorMaximo && array.vencimento >= dataMinima && array.vencimento <= dataMaxima);

    let clienteTr = document.createElement("tr");
    let tudoTd = document.createElement("h3");
    tudoTd.textContent = "Filtro Aplicado ";
    clienteTr.appendChild(tudoTd);
    let tabela = document.getElementById("tabela2");
    tabela.appendChild(clienteTr);

    informacoesFiltradas.forEach(adicionarNaPagina);
}