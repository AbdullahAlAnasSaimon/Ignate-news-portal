// load news categories data
const loadNewsCategories = async () =>{
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.news_category);
  displayNewsCategories(data.data.news_category);
}
// display news categories data on ui
const displayNewsCategories = categories =>{
  // console.log(categories);
  const newsContainer = document.getElementById('news-categories-container');
  categories.forEach(category => {
    const newsLi = document.createElement('li');
    newsLi.innerHTML = `
    <a onclick="loadNewsCategoryId('${category.category_id}')" href="#" class="bg-gray-200 hover:bg-blue-100 px-2 py-1 my-2 inline-block rounded-sm">${category.category_name}</a>
    `;
    newsContainer.appendChild(newsLi);
    // console.log(category);
  });
}

const loadNewsCategoryId = async id =>{
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsId(data.data);
}


loadNewsCategories();