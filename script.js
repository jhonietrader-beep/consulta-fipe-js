const tipo = document.getElementById('tipo');
const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const ano = document.getElementById('ano');


    console.log('select carregou:', tipo);

//  BUSCAR  MARCAS //

async function buscarmarcas(tipo) {
    const url = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`;
   
    const response = await fetch(url);
    const data = await response.json();

    marca.innerHTML = '';

    data.forEach((item) =>{

    const option = document.createElement('option');

    option.value = item.codigo;

    option.textContent = item.nome;

    marca.appendChild(option);

});


}
// EVENTO MODELO //



modelo.addEventListener('change', ()=>{

buscarAnos(

tipo.value,
marca.value,
modelo.value

);

});
// BUSCAR MODELOS//
   
async function buscarModelos(tipo,marca) {
    const url = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos`;

    const response = await fetch(url);
    const data = await response.json();

    const modelo = document.getElementById('modelo');
    
    modelo.innerHTML='';
    data.modelos.forEach((item)=> {
        
        const option = document.createElement('option');
        option.value = item.codigo;

        option.textContent = 
        item.nome;

        modelo.appendChild(option);
    });
    
    }

    // EVENTO TIPO  



tipo.addEventListener('change', () => {

    const valorselecionado =
     tipo.value;

    buscarmarcas(valorselecionado);

});
// EVENTO MARCA // 
document
.getElementById('marca')
.addEventListener('change', ()=>{

buscarModelos(
tipo.value,
marca.value
);

});

// BUSCAR ANO  
async function buscarAnos(tipo,marca,modelo) {

    const url = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos`;

    const response = await fetch(url);
    const data = await response.json();


    ano.innerHTML= '';
    data.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.codigo;

        option.textContent = item.nome;

        ano.appendChild(option);
        
    });
}
async function consultarFipe(tipo, marca, modelo, ano) {

    const url = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`;

    const response = await fetch(url);

    const dados = await response.json();

    document.getElementById('resultado').innerHTML = `
        <div class="card-resultado">

            <h2>Consulta FIPE</h2>

            <p><strong>Veículo:</strong> ${dados.Modelo}</p>

            <p><strong>Ano:</strong> ${dados.AnoModelo}</p>

            <p><strong>Valor FIPE:</strong> ${dados.Valor}</p>

        </div>
    `;
}

// EVENTO BOTÃO CONSULTAR

document
.getElementById('consultar')
.addEventListener('click', () => {

    consultarFipe(
        tipo.value,
        marca.value,
        modelo.value,
        ano.value
    );

});