//DomSelectors
const searchform = document.getElementById("search-form")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("btn")
const menu = document.getElementsByClassName("card")
const menuInfo = document.getElementById("card-info")
const randomImage = document.getElementById("img")
const cardName = document.getElementById("card-name")
const cardArea = document.getElementById("card-area")
const cardCategory = document.getElementById("card-category")
const cardInstructions = document.getElementById("card-instructions")
const cardIngredients = document.getElementById("card-ingredients")
const cardMeasurements = document.getElementById("card-measure")
allIngredients = []

// fetches
    fetch(`${apiKey}search.php?s=${searchInput.value}`)
    .then(response => response.json())
    .then(mealArr => { 
        console.log(mealArr)
        let allMeals = mealArr.meals
        allMeals.forEach(meal => {
            renderSearch(meal)
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
    randomImage.src = meal.strMealThumb
    randomImage.alt = meal.strMeal
    cardName.textContent = meal.strMeal
    cardArea.textContent = meal.strArea
    cardInstructions.textContent = "Instructions: " + meal.strInstructions
    cardIngredients.textContent = meal.strIngredient1 + ", " + meal.strIngredient2 + ", " + meal.strIngredient3 + ", " + meal.strIngredient4 + ", " + meal.strIngredient5 + ", " + meal.strIngredient6 + ", " + meal.strIngredient7 + ", " + meal.strIngredient8 + ", " + meal.strIngredient9 + ", " + meal.strIngredient10 + ", " + meal.strIngredient11 + ", " + meal.strIngredient12 + ", " + meal.strIngredient13 + ", " + meal.strIngredient14 + ", " + meal.strIngredient15 + ", " + meal.strIngredient16 + ", " + meal.strIngredient17 + ", " + meal.strIngredient18 + ", " + meal.strIngredient19 + ", " + meal.strIngredient20 
    //cardCategory.textContent = meal.strCategory
    cardMeasurements.textContent = meal.strMeasure1 + ", " + meal.strMeasure2 + ", " + meal.strMeasure3 + ", " + meal.strMeasure4 + ", " + meal.strMeasure5 + ", " + meal.strMeasure6 + ", " + meal.strMeasure7 + ", " + meal.strMeasure8 + ", " + meal.strMeasure9 + ", " + meal.strMeasure10 + ", " + meal.strMeasure11 + ", " + meal.strMeasure12 + ", " + meal.strMeasure13 + ", " + meal.strMeasure14 + ", " + meal.strMeasure15 + ", " + meal.strMeasure16 + ", " + meal.strMeasure17 + ", " + meal.strMeasure18 + ", " + meal.strMeasure19 + ", " + meal.strMeasure20
}

const renderSearch = (meal) => {
    searchBtn.addEventListener("submit", (e) => {
        e.preventDefault()
        randomImage.src = meal.strMealThumb
        randomImage.alt = meal.strMeal
        cardName.textContent = "Recipe: " + meal.strMeal
        cardArea.textContent = meal.strArea
        cardInstructions.textContent = "Instructions: " + meal.strInstructions
        
        // Filter out empty ingredient and measurement values
        const ingredients = [];
        const measurements = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal["strIngredient" + i];
            const measurement = meal["strMeasure" + i];
            if (ingredient && ingredient.trim() !== "") {
                ingredients.push(ingredient);
            }
            if (measurement && measurement.trim() !== "") {
                measurements.push(measurement);
            }
        }
        
        cardIngredients.textContent = "Ingredients: " + ingredients.join(", ");
        cardMeasurements.textContent = "Measurements: " + measurements.join(", ");
    });
};

