// API Endpoints
const CATEGORY_API = 'https://www.themealdb.com/api/json/v1/1/categories.php';

// Load categories on page load
document.addEventListener('DOMContentLoaded', () => {
  fetch(CATEGORY_API)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('categories');
      container.innerHTML = '';
      data.categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
          <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}" width="100">
          <h3>${cat.strCategory}</h3>
        `;
        card.onclick = () => window.location.href = `meals.html?category=${cat.strCategory}`;
        container.appendChild(card);
      });
      fillSidebar(data.categories); // add sidebar categories after fetch
    });
});

// Search Button redirects
document.getElementById('searchBtn').addEventListener('click', () => {
  const searchTerm = document.getElementById('searchBox').value.trim();
  if (!searchTerm) return;
  window.location.href = `meals.html?search=${encodeURIComponent(searchTerm)}`;
});



