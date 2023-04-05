//DomSelectors
const searchform = document.getElementById("searchForm")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("btn")
const cards = document.getElementById("cards")
const filtersDropDown = document.getElementById("filtersDropDown")
const fDropDown = document.getElementsByClassName("dropdown")
const latestBtn = document.getElementById("latestbtn")
const sidebar = document.getElementById("sidebar")
//FILTERS DROP DOWN
const filtersData = {
    "Ingredients": "ingredients",
    "Categories": "categories",
    "Areas": "areas",
    "First Letter": "first-letter",
    "Random Meal": "random-meal"
}

let key = (filtersData) => {
    let option = document.createElement("option");
    option.setAttribute('value', `${filtersData[key]}`);
  
    let optionText = document.createTextNode(key);
    option.appendChild(optionText);
  
    filtersDropDown.appendChild(option);
}

filtersDropDown.addEventListener('change', (event) => {
    switch (event.target.value) {
      case 'ingredients':
        // Call function to display cards for ingredient search
        fetchIngredients(filterInput.value);
        break;
      case 'categories':
        // Call function to display cards for category search
        fetchCategories(filterInput.value);
        break;
      case 'areas':
        // Call function to display cards for area search
        fetchAreas(filterInput.value);
        break;
      case 'random-meal':
        // Call function to display cards for random meal
        fetchRandom();
        break;
      default:
        // Clear cards and display all recipes
        clearCards();
        displayAllRecipes();
        break;
    }
  });
  // fetches
  const fetchMeals = () => {
      fetch(`${apiKey}search.php?s=${searchInput.value}`)
        .then(response => response.json())
        .then(mealObj => {
          console.log(mealObj);
          let allMeals = mealObj.meals;
          cards.innerHTML = "";
          allMeals.forEach(meal => { 
            const ingredients = []
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`] != "") {
                    ingredients.push(meal[`strIngredient${i}`])
                }
            }
            const measurements = []
            for (let i = 1; i <= 20; i++) {
                if (meal[`strMeasure${i}`] != "") {
                    measurements.push(meal[`strMeasure${i}`])
                }
            }
            meal.measurements = measurements
            meal.ingredients = ingredients
            renderMeal(meal);
          });
        });
    };
    
    searchform.addEventListener("submit", (e) => {
      e.preventDefault();
      fetchMeals();
    });
  const renderMeal = (meal) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <div class="card-info">
        <img id="img" src=${meal.strMealThumb}>
        <h2 id="card-name">${meal.strMeal}</h2>
        <p id="card-area">${meal.strArea}</p>
        <p id="card-catagory">${meal.strCategory}</p>
        <p id="card-ingredients">Ingredients: ${meal.ingredients.join(", ")}</p>
        <p id="card-instructions">${meal.strInstructions}</p>
        <p id="card-measure">Measurements: ${meal.measurements.join(", ")}</p>  
      </div>`
      sidebar.append(card)
  }
  const latestFetch = () => {
  fetch(`${apiKey}latest.php`)
  .then(response => response.json())
  .then(mealObj => {
    console.log(mealObj);
    let allMeals = mealObj.meals;
    sidebar.innerHTML = "";
    allMeals.forEach(meal => {
        const ingredients = []
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`] != "") {
                ingredients.push(meal[`strIngredient${i}`])
            }
        }
        const measurements = []
        for (let i = 1; i <= 20; i++) {
            if (meal[`strMeasure${i}`] != "") {
                measurements.push(meal[`strMeasure${i}`])
            }
        }
      renderLatest(meal);
    });
  });
  }
  const renderLatest = (meal) => {
      latestBtn.addEventListener("click", (e) => {
      const latestCard = document.createElement("div");
      latestCard.classList.add("latestCard");
      latestCard.innerHTML = `
      <div class="latestCard-info">
        <img id="img" src=${meal.strMealThumb}>
        <h2 id="latestCard-name">${meal.strMeal}</h2>
        <p id="latestCard-area">${meal.strArea}</p>
        <p id="latestCard-catagory">${meal.strCategory}</p>
        <p id="latestCard-ingredients">${"Ingredients: " + meal.strIngredient1 + ", " + meal.strIngredient2 + ", " + meal.strIngredient3 + ", " + meal.strIngredient4 + ", " + meal.strIngredient5 + ", " + meal.strIngredient6 + ", " + meal.strIngredient7 + ", " + meal.strIngredient8 + ", " + meal.strIngredient9 + ", " + meal.strIngredient10 + ", " + meal.strIngredient11 + ", " + meal.strIngredient12 + ", " + meal.strIngredient13 + ", " + meal.strIngredient14 + ", " + meal.strIngredient15 + ", " + meal.strIngredient16 + ", " + meal.strIngredient17 + ", " + meal.strIngredient18 + ", " + meal.strIngredient19 + ", " + meal.strIngredient20 }</p>
        <p id="latestCard-instructions">${meal.strInstructions}</p>
        <p id="latestCard-measure">${"Measurements: " + meal.strMeasure1 + ", " + meal.strMeasure2 + ", " + meal.strMeasure3 + ", " + meal.strMeasure4 + ", " + meal.strMeasure5 + ", " + meal.strMeasure6 + ", " + meal.strMeasure7 + ", " + meal.strMeasure8 + ", " + meal.strMeasure9 + ", " + meal.strMeasure10 + ", " + meal.strMeasure11 + ", " + meal.strMeasure12 + ", " + meal.strMeasure13 + ", " + meal.strMeasure14 + ", " + meal.strMeasure15 + ", " + meal.strMeasure16 + ", " + meal.strMeasure17 + ", " + meal.strMeasure18 + ", " + meal.strMeasure19 + ", " + meal.strMeasure20}</p>
      </div>`
      sidebar.append(latestCard)
      console.log(e.target)
  })
  }
  const fetchIngredients = () => {
  fetch(`${apiKey}list.php?i=list`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      let allingredients = mealObj.meals;
      cards.innerHTML = "";
      allingredients.forEach(ing => {
      renderAllIngredients(ing);
      });
  });
  }
  const renderAllIngredients = (ing) => {
        const ingCard = document.createElement("div");
        ingCard.classList.add("ingCard");
        ingCard.innerHTML = `
        <div class="ingCard-info">
            <h2 id="ingCard-name">${ing.strIngredient}</h2>
            <p id="ingCard-area">${ing.strDescription}</p>
        </div>` 
        sidebar.innerHTML = "";
        sidebar.append(ingCard)
    }
      
  const fetchCategories = () => {
  fetch(`${apiKey}list.php?c=list`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      let allcategories = mealObj.meals;
      sidebar.innerHTML = "";
      allcategories.forEach(cat => {
      renderAllCategories(cat);
      });
  });
  }
  const renderAllCategories = (cat) => {
        const catCard = document.createElement("div");
        catCard.classList.add("catCard");
        catCard.innerHTML = `
        <div class="catCard-info">
            <h2 id="catCard-name">${cat.strCategory}</h2>
            </div>`
        sidebar.innerHTML = "";
        sidebar.append(catCard)
    }
  const fetchAreas = () => {
  fetch(`${apiKey}list.php?a=list`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      let allareas = mealObj.meals;
      sidebar.innerHTML = "";
      allareas.forEach(area => {
      renderAllAreas(area);
      });
  });
  }
  const renderAllAreas = (area) => {
        const areaCard = document.createElement("div");
        areaCard.classList.add("areaCard");
        areaCard.innerHTML = `
        <div class="areaCard-info">
            <h2 id="areaCard-name">${area.strArea}</h2>
            </div>`
            sidebar.innerHTML = "";
        sidebar.append(areaCard)
    }
  const fetchRandom = () => {
  fetch(`${apiKey}random.php`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      let allrandom = mealObj.meals;
      sidebar.innerHTML = "";
      allrandom.forEach(random => {
        const ingredients = []
        for (let i = 1; i <= 20; i++) {
            if (random[`strIngredient${i}`] != "") {
                ingredients.push(random[`strIngredient${i}`])
            }
        }
        const measurements = []
        for (let i = 1; i <= 20; i++) {
            if (random[`strMeasure${i}`] != "") {
                measurements.push(random[`strMeasure${i}`])
            }
        }
      renderRandom(random);
      });
  });
  }
const renderRandom = (random) => {
        const randomCard = document.createElement("div");
        randomCard.classList.add("randomCard");
        randomCard.innerHTML = `
        <div class="randomCard-info">
            <img id="img" src=${random.strMealThumb}>
            <h2 id="randomCard-name">${random.strMeal}</h2>
            <p id="randomCard-area">${random.strArea}</p>
            <p id="randomCard-catagory">${random.strCategory}</p>
            <p id="randomCard-ingredients">${"Ingredients: " + random.strIngredient1 + ", " + random.strIngredient2 + ", " + random.strIngredient3 + ", " + random.strIngredient4 + ", " + random.strIngredient5 + ", " + random.strIngredient6 + ", " + random.strIngredient7 + ", " + random.strIngredient8 + ", " + random.strIngredient9 + ", " + random.strIngredient10 + ", " + random.strIngredient11 + ", " + random.strIngredient12 + ", " + random.strIngredient13 + ", " + random.strIngredient14 + ", " + random.strIngredient15 + ", " + random.strIngredient16 + ", " + random.strIngredient17 + ", " + random.strIngredient18 + ", " + random.strIngredient19 + ", " + random.strIngredient20 }</p>
            <p id="randomCard-instructions">${random.strInstructions}</p>
            <p id="randomCard-measure">${"Measurements: " + random.strMeasure1 + ", " + random.strMeasure2 + ", " + random.strMeasure3 + ", " + random.strMeasure4 + ", " + random.strMeasure5 + ", " + random.strMeasure6 + ", " + random.strMeasure7 + ", " + random.strMeasure8 + ", " + random.strMeasure9 + ", " + random.strMeasure10 + ", " + random.strMeasure11 + ", " + random.strMeasure12 + ", " + random.strMeasure13 + ", " + random.strMeasure14 + ", " + random.strMeasure15 + ", " + random.strMeasure16 + ", " + random.strMeasure17 + ", " + random.strMeasure18 + ", " + random.strMeasure19 + ", " + random.strMeasure20}</p>  
            </div>`
            sidebar.innerHTML = "";
        sidebar.append(randomCard)
    }

const init = () => {
    fetchRandom();
    fetchCategories();
    fetchIngredients();
    fetchAreas();
    latestFetch();
    }
    init();