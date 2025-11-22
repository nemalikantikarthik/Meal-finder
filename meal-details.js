function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
      fillSidebar(data.categories);
    });

  const mealId = getQueryParam('mealId');
  const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const infoDiv = document.getElementById('meal-info');
      const noMeal = document.getElementById('no-meal');
      infoDiv.innerHTML = '';
      if (!data.meals || data.meals.length === 0) {
        noMeal.classList.remove('hidden');
        return;
      }
      noMeal.classList.add('hidden');
      const meal = data.meals[0];
      document.getElementById('meal-title').textContent = meal.strMeal;
      let ingredients = '';
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
          ingredients += `<li>${ingredient}: ${measure}</li>`;
        }
      }
      infoDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300">
        <h2>Ingredients</h2>
        <ul>${ingredients}</ul>
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
      `;
    });
});
