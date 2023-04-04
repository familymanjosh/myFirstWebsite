

const searchform = document.getElementById("search-form")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("btn")
const menu = document.getElementById("container1")


const searchBar = () => { 
    fetch(`${apiKey}search.php?s=${searchInput.value}`)
    .then(response => response.json())
    .then(meal => {
        console.log(meal)
            renderRandomMeal(meal)
    })
}
const renderRandomMeal = (meal) => {
    const li = document.createElement("li")
    li.textContent = meal.strMeal
    searchBtn.addEventListener("submit", (e) => {
        e.preventDefault()
})
menu.append(li)
}

const init = () => {
    searchBar()
}
init()