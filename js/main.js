// load news categories data
const spinner = document.getElementById('spinner');
const loadNewsCategories = async () =>{
  spinner.classList.remove('hidden');
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

const displayNewsId = newsId =>{
  // console.log(newsId);
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ``;
  // console.log(newsId);

  // find content number by clicking category name
  const findCategoryContent = document.getElementById('find-category-content');
  findCategoryContent.innerText = `${newsId.length ? newsId.length : "No"} Items Found`;
  // loop through an array
  newsId.forEach(newsDetails =>{
    // console.log(newsDetails);
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'card-side', 'bg-white', 'shadow-xl', 'my-8', 'flex-col', 'md:flex-row');
    cardDiv.innerHTML = `
    <div class="p-4"><img src="${newsDetails.thumbnail_url}" alt="Movie" class="md:h-80 rounded-lg order-first w-full h-auto"></div>
      <div class="card-body w-full md:w-8/12 order-last">
        <h2 class="card-title text-2xl font-bold">${newsDetails.title}</h2>
        <p>${newsDetails.details.slice(0, 300) + "..."}</p>
        <div class="card-actions justify-between items-center flex-row mt-8 lg:mt-0">
          <div class="flex items-center">
            <div>
              <img src="${newsDetails.author.img ? newsDetails.author.img : "No Image Found"}" alt="" class="w-10 h-10 rounded-full">
            </div>
            <div class="pl-4 font-semibold text-gray-500">
              <p>${newsDetails.author.name ? newsDetails.author.name : "No Name Found"}</p>
              <p class="text-sm text-gray-400">${newsDetails.author.published_date ? newsDetails.author.published_date : "No Date Found"}</p>
            </div>
          </div>
          <div class="font-bold">
            <p><i class="fa-solid fa-eye"></i> ${newsDetails.total_view}</p>
          </div>
          <button class="bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded-md font-bold w-full md:w-auto mt-8 lg:mt-0">See Details <i class="fa-solid fa-arrow-right-long"></i></button>
      </div>
    </div>
    `;
    cardContainer.appendChild(cardDiv);
  })
  spinner.classList.add('hidden');
}

loadNewsCategories();