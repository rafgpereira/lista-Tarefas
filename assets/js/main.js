const inputTarefa = document.querySelector("input");
const botaoAdicionar = document.querySelector(".botaoAdicionar");
const listaTarefas = document.querySelector(".listaTarefas");

function criaLi(){
    const li = document.createElement('li')
    return li
}

function limpaInput(){
    inputTarefa.value=''
    inputTarefa.focus()
}

function criaBotaoApagar(li){
    li.innerText+= "  "
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = ' Apagar '
    botaoApagar.setAttribute('class', 'apagar')
    li.appendChild(botaoApagar)
}

function salvarTarefas(){
    const liTarefas = listaTarefas.querySelectorAll('li')
    const vetorDeTarefas = []

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '')
        vetorDeTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(vetorDeTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}
function criarTarefa(textoInput){
    const li = criaLi()
    li.innerText = textoInput
    listaTarefas.appendChild(li)
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

function recuperaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)
    for(let tarefa of listaDeTarefas){
        criarTarefa(tarefa)
    }
}

recuperaTarefasSalvas()

inputTarefa.addEventListener('keypress', (e)=>{
    if(e.key == "Enter"){
        if (!inputTarefa.value) return
        criarTarefa(inputTarefa.value)
    }
})

botaoAdicionar.addEventListener("click", () => {
    if (!inputTarefa.value) return
    criarTarefa(inputTarefa.value)
});

document.addEventListener('click', (e)=>{
    const elemento = e.target
    if(elemento.classList.contains('apagar')){
        elemento.parentElement.remove()
        salvarTarefas()
    }

})