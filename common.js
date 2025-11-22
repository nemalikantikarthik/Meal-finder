const hamburgerBtn = document.getElementById('hamburgerBtn');
const sidebar = document.getElementById('sidebar');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');

hamburgerBtn.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
  closeSidebarBtn.style.display = sidebar.classList.contains('hidden') ? 'none' : 'block';
  hamburgerBtn.style.display = sidebar.classList.contains('hidden') ? 'block' : 'none';
});

closeSidebarBtn.addEventListener('click', () => {
  sidebar.classList.add('hidden');
  closeSidebarBtn.style.display = 'none';
  hamburgerBtn.style.display = 'block';
});

function fillSidebar(categories) {
  const ul = document.getElementById('category-list');
  ul.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="meals.html?category=${cat.strCategory}">${cat.strCategory}</a>`;
    ul.appendChild(li);
  });
}
