//DomSelectors
const searchform = document.getElementById("search-form")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("btn")
const menu = document.getElementsByClassName("card")
const menuInfo = document.getElementById("card-info")
const cards = document.getElementById("cards")
const filtersDropDown = document.getElementById("filtersDropDown")
const fDropDown = document.getElementById("dropdown")

//FILTERS DROP DOWN
const filtersData = {
    "Ingredients": "ingredients",
    "Categories": "categorites",
    "Areas": "areas",
    "First Letter": "first-letter",
    "Random Meal": "random-meal"
}

for (let key in filtersData) {
    let option = document.createElement("option");
    option.setAttribute('value', `${option.value}`[key]);
  
    let optionText = document.createTextNode(key);
    option.appendChild(optionText);
  
    filtersDropDown.appendChild(option);
  }

filtersDropDown.addEventListener("change", (e)=> {
    fDropDown.innerHTML = e.target.value
})

// fetches
    fetch(`${apiKey}search.php?s=${searchInput.value}`)
    .then(response => response.json())
    .then(mealObj => { 
        console.log(mealObj)
        let allMeals = mealObj.meals
        cards.innerHTML = ""
        allMeals.forEach(meal => {
            renderMeal(meal)
    })
})
const renderMeal = (meal) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="card-info">
      <img id="img" src=${meal.strMealThumb}>
      <h2 id="card-name">${meal.strMeal}</h2>
      <p id="card-area">${meal.strArea}</p>
      <p id="card-catagory">${meal.strCategory}</p>
      <p id="card-ingredients">${"Ingredients: " + meal.strIngredient1 + ", " + meal.strIngredient2 + ", " + meal.strIngredient3 + ", " + meal.strIngredient4 + ", " + meal.strIngredient5 + ", " + meal.strIngredient6 + ", " + meal.strIngredient7 + ", " + meal.strIngredient8 + ", " + meal.strIngredient9 + ", " + meal.strIngredient10 + ", " + meal.strIngredient11 + ", " + meal.strIngredient12 + ", " + meal.strIngredient13 + ", " + meal.strIngredient14 + ", " + meal.strIngredient15 + ", " + meal.strIngredient16 + ", " + meal.strIngredient17 + ", " + meal.strIngredient18 + ", " + meal.strIngredient19 + ", " + meal.strIngredient20 }</p>
      <p id="card-instructions">${meal.strInstructions}</p>
      <p id="card-measure">${"Measurements: " + meal.strMeasure1 + ", " + meal.strMeasure2 + ", " + meal.strMeasure3 + ", " + meal.strMeasure4 + ", " + meal.strMeasure5 + ", " + meal.strMeasure6 + ", " + meal.strMeasure7 + ", " + meal.strMeasure8 + ", " + meal.strMeasure9 + ", " + meal.strMeasure10 + ", " + meal.strMeasure11 + ", " + meal.strMeasure12 + ", " + meal.strMeasure13 + ", " + meal.strMeasure14 + ", " + meal.strMeasure15 + ", " + meal.strMeasure16 + ", " + meal.strMeasure17 + ", " + meal.strMeasure18 + ", " + meal.strMeasure19 + ", " + meal.strMeasure20}</p>
      <a href="#">Read more</a>
    </div>`
    cards.append(card)
}
