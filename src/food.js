const url = "https://www.themealdb.com/api/json/v2/"

const searchform = document.getElementById("search-form")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("btn")
const menu = document.getElementById("container1")


const searchBar = () => { 
    fetch(`${url}${apiKey}+"/randomselection.php"`)
    .then(response => response.json())
    .then(meal => {
        console.log(meal)
            renderRandomMeal(meal)
            foodDetails(meal)
    })
}
const renderRandomMeal = (meal) => {
    const pTag = document.createElement("h1")
    pTag.textContent = meal.strMeal
    menu.append(pTag)
    searchBtn.addEventListener("submit", (e) => {
        e.preventDefault()
        foodDetails()
})
const foodDetails = (meal) => {
    const li = document.createElement("li")
    li.forEach(ingredient => {
        li.textContent = meal.strIngredient
        menu.append(li)
    });
    const li2 = document.createElement("li")
    li2.forEach(measure => {
        li2.textContent = meal.strMeasure
        menu.append(li2)
    })
    const li3 = document.createElement("li")
    li3.forEach(measure => {
        li3.textContent = meal.strMeal
        menu.append(li3)
    })
}
}
const init = () => {
    searchBar()
}
init()