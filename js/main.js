// load news categories data
const loadNewsCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.data.news_category);
  displayNewsCategories(data.data.news_category);
}
// display news categories data on ui
const displayNewsCategories = categories => {
  // console.log(categories);
  const newsContainer = document.getElementById('news-categories-container');
  categories.forEach(category => {
    const newsLi = document.createElement('li');
    newsLi.innerHTML = `
    <a onclick="loadNewsCategoryId('${category.category_id}')" href="#" class="bg-gray-200 hover:bg-blue-100 px-2 py-1 my-2 inline-block rounded-sm active">${category.category_name}</a>
    `;
    newsContainer.appendChild(newsLi);
    // console.log(category);
  });
}
// load category content details
const loadNewsCategoryId = async id => {
  toggleSpinner(true);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data);

}
// display category content details on ui
const displayNewsDetails = newsId => {
  // console.log(newsId);
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ``;
  // console.log(newsId);

  // find content number by clicking category name
  const findCategoryContent = document.getElementById('find-category-content');
  findCategoryContent.innerText = `${newsId.length ? newsId.length : "No"} Items Found`;
  
  // loop through an array

  newsId.forEach(newsDetails => {
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
              <img src="${newsDetails.author.img ? newsDetails.author.img : 'No Image Found'}" alt="" class="w-10 h-10 rounded-full">
            </div>
            <div class="pl-4 font-semibold text-gray-500">
              <p>${newsDetails.author.name ? newsDetails.author.name : "No Name Found"}</p>
              <p class="text-sm text-gray-400">${newsDetails.author.published_date ? newsDetails.author.published_date : "No Date Found"}</p>
            </div>
          </div>
          <div class="font-bold">
            <p><i class="fa-solid fa-eye"></i> ${newsDetails.total_view}</p>
          </div>
          <label onclick="loadNewsModalDetails('${newsDetails._id}')" class="btn modal-button text-slate-700 border-0 bg-blue-200 hover:bg-blue-300 px-4 py-2 rounded-md font-bold w-full md:w-auto mt-8 lg:mt-0" for="my-modal-5">See Details <i class="fa-solid fa-arrow-right-long ml-3"></i></label>
      </div>
    </div>
    `;
    cardContainer.appendChild(cardDiv);
    // console.log(newsDetails._id);
  })
  toggleSpinner(false);
}

const loadNewsModalDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsModalDetails(data.data[0]);
}

const displayNewsModalDetails = cardDetails => {
  console.log(cardDetails);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
  <img src="${cardDetails.thumbnail_url}" class="block mx-auto my-8"/>
  <h3 class="font-bold text-lg text-2xl mb-4">${cardDetails.title}</h3>
  <p>${cardDetails.details}</p>
        <div class="card-actions justify-between items-center flex-row mt-8 lg:mt-0">
          <div class="flex items-center">
            <div>
              <img src="${cardDetails.author.img ? cardDetails.author.img : "No Image Found"}" alt="" class="w-10 h-10 rounded-full">
            </div>
            <div class="pl-4 font-semibold text-gray-500">
              <p>${cardDetails.author.name ? cardDetails.author.name : "No Name Found"}</p>
              <p class="text-sm text-gray-400">${cardDetails.author.published_date ? cardDetails.author.published_date : "No Date Found"}</p>
            </div>
          </div>
          <div class="font-bold">
            <p><i class="fa-solid fa-eye"></i> ${cardDetails.total_view}</p>
          </div>
          <div class="modal-action">
            <label for="my-modal-5" class="btn bg-blue-300 text-slate-700 hover:bg-blue-400 border-0 font-bold">Close</label>
          </div>
  `;
}

const toggleSpinner = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading === true){
    loaderSection.classList.remove('hidden');
  }else{
    loaderSection.classList.add('hidden');
  }
}

loadNewsCategoryId('01');

loadNewsCategories();