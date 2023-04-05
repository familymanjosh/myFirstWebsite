//DomSelectors
const searchform = document.getElementById("searchForm")
const searchInput = document.getElementById("search")
const searchBtn = document.getElementById("btn")
const cards = document.getElementById("cards")
const filtersDropDown = document.getElementById("filtersDropDown")
const fDropDown = document.getElementsByClassName("dropdown")
const latestBtn = document.getElementById("latestbtn")
const sidebar = document.getElementById("sidebar")
const catForm = document.getElementById("SearchCatfilter")
const ingForm = document.getElementById("SearchIngfilter")
const areaForm = document.getElementById("SearchAreafilter")
const sCatInput = document.getElementById("filtercatInput")
const sIngInput = document.getElementById("filteringInput")
const sAreaInput = document.getElementById("filterareaInput")

//SEARCH FILTERS EVENTLISTENERS
catForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    fetchCatFilters();
})

ingForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    fetchIngFilters();
})

areaForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    fetchAreaFilters();
})
 
//DROPDOWN EVENT
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
        fetchIngredients();
        break;
      case 'categories':
        // Call function to display cards for category search
        fetchCategories();
        break;
      case 'areas':
        // Call function to display cards for area search
        fetchAreas();
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
          sidebar.innerHTML = "";
          allMeals.forEach(meal => { 
            let ingredients = []
            for (let i = 1; i <= 20; i++) {
                if (meal[`strIngredient${i}`] != "") {
                    ingredients.push(meal[`strIngredient${i}`])
                }
            }
            let measurements = []
            for (let i = 1; i <= 20; i++) {
                if (meal[`strMeasure${i}`] != " ") {
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
        let ingredients = []
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`] != "") {
                ingredients.push(meal[`strIngredient${i}`])
            }
        }
        let measurements = []
        for (let i = 1; i <= 20; i++) {
            if (meal[`strMeasure${i}`] != " ") {
                measurements.push(meal[`strMeasure${i}`])
            }
        }
            meal.measurements = measurements
            meal.ingredients = ingredients
      renderLatest(meal);
    });
  });
  }
  const renderLatest = (meal) => {
    const card = document.createElement("div");
    card.classList.add("card")
    card.innerHTML = `
      <div class="card-info">
        <img id="img" src=${meal.strMealThumb}>
        <h2 id="card-name">${meal.strMeal}</h2>
        <p id="card-area">${meal.strArea}</p>
        <p id="card-catagory">${meal.strCategory}</p>
        <p id="card-ingredients">Ingredients: ${meal.ingredients.join(", ")}</p>
        <p id="card-instructions">${meal.strInstructions}</p>
        <p id="card-measure">Measurements: ${meal.measurements.join(", ")}</p>
      </div>
    `;
    sidebar.append(card)
  }
  
  latestBtn.addEventListener("click", (e) => {
    e.preventDefault();
    latestFetch();
  });
  
  const fetchIngredients = () => {
  fetch(`${apiKey}list.php?i=list`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      let allingredients = mealObj.meals;
      sidebar.innerHTML = "";
      allingredients.forEach(ing => {
      renderAllIngredients(ing);
      });
  });
  }
  const renderAllIngredients = (ing) => {
    const card = document.createElement("div");
    card.classList.add("card")
        card.innerHTML = `
        <div class="card-info">
            <h2 id="card-name">${ing.strIngredient}</h2>
            <p id="card-area">${ing.strDescription}</p>
        </div>` 
        sidebar.append(card)
    }
      
  const fetchCategories = () => {
  fetch(`${apiKey}list.php?c=list`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      sidebar.innerHTML = "";
      const card = document.createElement("div");
      sidebar.append(card)
      card.classList.add("card")
      let allcategories = mealObj.meals;
      allcategories.forEach(cat => {
        card.innerHTML += `
            <h2 id="card-name">${cat.strCategory}</h2>`
            
      });
  });
  }
  const fetchAreas = () => {
  fetch(`${apiKey}list.php?a=list`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      sidebar.innerHTML = "";
    const card = document.createElement("div");
    sidebar.append(card)
    card.classList.add("card")
      mealObj.meals.forEach(area => {
        card.innerHTML += `
            <p id="card-name">${area.strArea}</p>`
      });
  });
  }

  const fetchRandom = () => {
  fetch(`${apiKey}random.php`)
  .then(response => response.json())
  .then(mealObj => {
      console.log(mealObj);
      let allrandom = mealObj.meals;
      sidebar.innerHTML = ""
      allrandom.forEach(random => {
        let ingredients = []
        for (let i = 1; i <= 20; i++) {
            if (random[`strIngredient${i}`] != "") {
                ingredients.push(random[`strIngredient${i}`])
            }
        }
        let measurements = []
        for (let i = 1; i <= 20; i++) {
            if (random[`strMeasure${i}`] != " " , random[`strMeasure${i}`] != "") {
                measurements.push(random[`strMeasure${i}`])
            }
        }
            random.measurements = measurements
            random.ingredients = ingredients
      renderRandom(random);
      });
  });
  }
const renderRandom = (random) => {
    const card = document.createElement("div");
    card.classList.add("card")
        card.innerHTML = `
        <div class="card-info">
            <img id="img" src=${random.strMealThumb}>
            <h2 id="card-name">${random.strMeal}</h2>
            <p id="card-area">${random.strArea}</p>
            <p id="card-catagory">${random.strCategory}</p>
            <p id="card-ingredients">Ingredients: ${random.ingredients.join(", ")}</p>
            <p id="card-instructions">${random.strInstructions}</p>
            <p id="card-measure">Measurements:  ${random.measurements.join(", ")}</p>
            </div>`
        
        sidebar.append(card)
    }

    //FETCH FILTER FORMS

    const fetchCatFilers = () => {
        fetch(`${apiKey}filter.php?c=${sCatInput.value}`)
        .then(response => response.json())
        .then(mealObj => {
            console.log(mealObj);
            let allMeals = mealObj.meals;
            sidebar.innerHTML = "";
          allMeals.forEach(meal => { 

        })
    })
    }

     const fetchIngFilters = () => {
         fetch(`${apiKey}filter.php?i=${sIngInput.value}`)
        .then(response => response.json())
        .then(mealObj => {
            console.log(mealObj);
            let allMeals = mealObj.meals;
            sidebar.innerHTML = "";
          allMeals.forEach(meal => { 

        })
    })
    }

    const fetchAreaFilters = () => {
        fetch(`${apiKey}filter.php?a=${sAreaInput.value}`)
        .then(response => response.json())
        .then(mealObj => {
            console.log(mealObj);
            let allMeals = mealObj.meals;
            sidebar.innerHTML = "";
          allMeals.forEach(meal => {
             
        })
    });
    }
