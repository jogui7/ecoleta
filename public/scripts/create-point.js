
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for ( state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}




document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)

}

let selectedItems = []
const collecteditems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {
    const itemLi = event.target 

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verificar se existem dados selecionados, se sim pegar os itens selecionados

    const  alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    //se já estiver selecionado
    if (alreadySelected >= 0){
        const filtereditems = selectedItems.filter( item => {
            const itemisDifferent = item != itemId
            return itemisDifferent
        })

        selectedItems = filtereditems
    } else {
        //se não estiver selecionado, adicionar
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido
    collecteditems.value = selectedItems
}