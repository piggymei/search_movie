//When the "create keyword" button is clicked, a card with:
document.querySelector("#search_button").addEventListener("click", createCard);
let searchKey;

function appendContents(content, type) {
  let card = document.createElement("div");
  card.setAttribute("class", "card-body");
  let title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  debugger;

  let img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  console.log(content);
  if (type === "mov") {
    title.innerHTML = content.Title;
    img.src = content.Poster;
  } else {
    title.innerHTML = content.title;
    img.src = content.images.original.url;
  }
  card.append(title, img);
  document.querySelector("#final_results").append(card);
}

function getContents(e) {
  const id = e.target.id;
  //choose URL depending on id //KzW6J0DbGeAl45Wl0Np6SZPJalttCYIv  "http://www.omdbapi.com/?&apikey=a92d1656&s=";
  let url;
  if (id === "movie_btn") {
    url = "http://www.omdbapi.com/?apikey=a92d1656&s=";
  } else {
    url =
      "http://api.giphy.com/v1/gifs/search?api_key=KzW6J0DbGeAl45Wl0Np6SZPJalttCYIv&limit=12&q=";
  }
  url = url.concat(searchKey);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let content, type;
      if (id === "movie_btn") {
        content = data.Search;
        type = "mov";
      } else {
        content = data.data;
        type = "gif";
      }
      content.forEach((element) => {
        appendContents(element, type);
      });
    });
}

//create div.card
function createCard(e) {
  e.preventDefault();
  let card = document.createElement("div");
  card.setAttribute("class", "card-body");

  //add keyword as a title
  searchKey = document.querySelector("#search").value;
  let title = document.createElement("h5");
  title.className = "card-title";
  title.innerText = searchKey;
  card.append(title);

  //create 2 buttons:
  //One button to search for at most 12 movies that have that keyword in their title
  let movieBtn = document.createElement("button");
  movieBtn.setAttribute("id", "movie_btn");
  movieBtn.className = "btn btn-primary";
  movieBtn.innerText = "movie";
  movieBtn.addEventListener("click", getContents);

  //One button to search for at most 12 gifs about that keyword
  let gifBtn = document.createElement("button");
  gifBtn.setAttribute("id", "gif_btn");
  gifBtn.className = "btn btn-primary";
  gifBtn.innerText = "gif";
  gifBtn.addEventListener("click", getContents);

  card.append(movieBtn, gifBtn);

  document.querySelector("#search_results").append(card);
}
