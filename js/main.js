// load news categories data
const loadNewsCategories = async () => {
  try {
    //  Block of code to try
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategories(data.data.news_category);
  }
  catch(error) {
    //  Block of code to handle errors
    console.log(error);
  }
}
// display news categories data on ui
const displayNewsCategories = categories => {
  const newsContainer = document.getElementById('news-categories-container');
  categories.forEach(category => {
    const newsLi = document.createElement('li');
    newsLi.innerHTML = `
    <a onclick="loadNewsCategoryId('${category.category_id}')" href="#" class="category-btn bg-gray-200 hover:bg-blue-100 px-2 py-1 my-2 inline-block rounded-sm active">${category.category_name}</a>
    `;
    newsContainer.appendChild(newsLi);
  })
  // set the category name by clicking category button
  const categoryBtn = document.getElementsByClassName('category-btn');
  for(const category of categoryBtn){
    category.addEventListener('click', function(){
      const categoryName = document.getElementById('find-category-name');
      categoryName.innerText = category.innerText;
  });
  }
}
// load category content details
const loadNewsCategoryId = async id => {
  toggleSpinner(true);
  try{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
  }
  catch(error){
    console.log(error);
  }
}
// display category content details on ui
const displayNewsDetails = newsId => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ``;
  // console.log(newsId);

  const sortFunc = isSorting =>{
    
    if(isSorting === true){
      newsId.sort(function(a, b){return b.total_view - a.total_view});
      // console.log(sorting);
    }else{
      newsId.sort(function(a, b){return a.total_view - b.total_view});
      // console.log(sorting);
    }
  }

  sortFunc(true);
  
  // find content number by clicking category name
  const findCategoryContent = document.getElementById('find-category-content');
  findCategoryContent.innerText = `${newsId.length ? newsId.length : "No"} Items Found For`;
  
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
            <p><i class="fa-solid fa-eye"></i> ${newsDetails.total_view ? newsDetails.total_view : "No View"}</p>
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
      <label for="my-modal-5" class="btn btn-sm btn-circle absolute right-2 top-2 bg-gray-300 hover:bg-gray-400 text-slate-700 border-0">✕</label>
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