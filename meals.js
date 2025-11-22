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

  const category = getQueryParam('category');
  const search = getQueryParam('search');

  let API_URL = '';
  const title = document.getElementById('meal-category-title');
  if (search) {
    API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    if (title) title.textContent = `${search}`;
  } else {
    API_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    if (title) title.textContent = `${category} Meals`;
  }
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const mealsDiv = document.getElementById('meals-list');
      const noResults = document.getElementById('no-results');
      mealsDiv.innerHTML = '';
      if (!data.meals) {
        noResults.classList.remove('hidden');
        return;
      }
      noResults.classList.add('hidden');
      data.meals.forEach(meal => {
        const div = document.createElement('div');
        div.className = 'meal-card';
        div.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="100">
          <h3>${meal.strMeal}</h3>
        `;
        div.onclick = () => window.location.href = `meal-details.html?mealId=${meal.idMeal}`;
        mealsDiv.appendChild(div);
      });
    });
});
