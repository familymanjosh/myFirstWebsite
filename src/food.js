const url = "http://www.omdbapi.com/?i=tt3896198&"

const searchform = document.getElementById("search-form")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("search-btn")
const menu = document.getElementById("recipeMenu")


const searchBar = () => { 
    fetch(`${url}${apiKey}`)
    .then(response => response.json())
    .then(meal => {
            console.log(meal)
            renderRandomMeal(meal)
        })
    }
const renderRandomMeal = (meal) => {
    const pTag = document.createElement("p")
    pTag.textContent = meal.title
    menu.append(pTag)
}
const init = () => {
    searchBar()
}
init()