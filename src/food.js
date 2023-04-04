//DomSelectors
const searchform = document.getElementById("search-form")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("btn")
const menu = document.getElementsByClassName("card")
const menuInfo = document.getElementById("card-info")
const randomImage = document.getElementById("img")
// fetches
    fetch(`${apiKey}search.php?s=${searchInput.value}`)
    .then(response => response.json())
    .then(mealArr => { 
        console.log(mealArr)
        let allMeals = mealArr.meals
        allMeals.forEach(meal => {
            let newArr =  Object.keys(meal)
            .filter((k) => meal[k] != null) // finding any value that == null
            .reduce((a, k) => ({ ...a, [k]: meal[k] }), {}); // removing it from array
            console.log(newArr)
            renderRandomMeal(meal)
    })
})
    fetch(`${apiKey}random.php`)
    .then(response => response.json())
    .then(mealArr => {
    console.log(mealArr)
    let allMeals = mealArr.meals
    allMeals.forEach(meal => {
    renderRandom(meal)
})
})
const renderRandom = (meal) => {
    const li = document.createElement("h2")
    li.textContent = meal.strMeal
    randomImage.src = meal.strMealThumb
    randomImage.alt = meal.strMeal
    const area = document.createElement("p")
    area.textContent = meal.strArea
    const category = document.createElement("p")
    category.textContent = meal.strCategory
    const instructions = document.createElement("p")
    instructions.textContent = meal.strInstructions
    const ingredients = document.createElement("p")
    ingredients.textContent = meal.strIngredient1
    const ingredients2 = document.createElement("p")
    ingredients2.textContent = meal.strIngredient2
    const ingredients3 = document.createElement("p")
    ingredients3.textContent = meal.strIngredient3
    const ingredients4 = document.createElement("p")
    ingredients4.textContent = meal.strIngredient4
    const ingredients5 = document.createElement("p")
    ingredients5.textContent = meal.strIngredient5
    const ingredients6 = document.createElement("p")
    ingredients6.textContent = meal.strIngredient6
    const ingredients7 = document.createElement("p")
    ingredients7.textContent = meal.strIngredient7
    const ingredients8 = document.createElement("p")
    menuInfo.innerHtml = ""
    menuInfo.append(li, area, category, instructions, ingredients, ingredients2, ingredients3, ingredients4, ingredients5, ingredients6, ingredients7, ingredients8)
}

const renderRandomMeal = (meal) => {
    const li = document.createElement("h1")
    li.textContent = meal.strMeal
    searchBtn.addEventListener("submit", (e) => {
        e.preventDefault()
})
//menu.append(li)
}
