const loadNewsCategories = async () =>{
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsCategories(data.data.news_category);
}

const displayNewsCategories = categories =>{
  // console.log(categories);
  const newsContainer = document.getElementById('news-categories-container');
  categories.forEach(category => {
    const newsLi = document.createElement('li');
    newsLi.innerHTML = `
    <a onclick="displayNewsId(${category.id})" href="#" class="bg-gray-100 hover:bg-blue-100 px-2 py-1 rounded-sm">${category.category_name}</a>
    `;
    newsContainer.appendChild(newsLi);
    // console.log(category);
  });
}

loadNewsCategories();