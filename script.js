const search = document.querySelector("#search");
const results = document.querySelector("#results");
const localHostUrl = window.document.URL;

var heroes;

var favourites = [];

// {
//   id : String,
//   name : String,
//   done : Boolean
// }

const heroInfo = () => {
  console.log("hello");
};

// newPage = async (key) => {
//   const xhr = new XMLHttpRequest();

//   url = ` https://superheroapi.com/api/1469687849876867/search/${key}`;

//   xhr.onload = () => {
//     let result = JSON.parse(xhr.response);
//     heroes = result;
//   };
//   xhr.open("GET", url, false);
//   xhr.send();
// };

fetchHeroes = async (key) => {
  url = ` https://superheroapi.com/api/1469687849876867/search/${key}`;
  heroes = await fetch(url).then((res) => res.json());
};

const showHeroes = async (key) => {
  // making async call to fetch data
  await fetchHeroes(key);

  // ul of heroes
  var ul = document.createElement("ul");

  ul.classList.add("heroes");

  // filter all heroes starting with key
  console.log(heroes);
  if (heroes.response == "success") {
    heroes = heroes.results.filter((hero) =>
      hero.name.toLowerCase().startsWith(key.toLowerCase())
    );

    // clear the ul
    results.innerHTML = "";

    // populate the ul
    heroes.forEach((hero) => {
      const li = document.createElement("li");
      let heroId = hero.id;
      let heroName = hero.name;

      li.innerHTML = `<div id="div${heroId}">
                          <p><a href="hero-info.html#${heroId}" onclick="heroInfo()" >${heroName}</a></p> 
                          <input type="checkbox" id="input${heroId}"class="favourite"/>
                      </div>`;

      ul.appendChild(li);
    });

    results.appendChild(ul);
  } else if (heroes.response == "error") {
    results.innerHTML = heroes.error;
  }
};

search.addEventListener("input", async (e) => {
  searchTerm = await e.target.value;
  await showHeroes(searchTerm);
});

addToFavourite = (inputId) => {
  var elem = document.querySelector("#" + inputId).parentElement;
  console.log(elem);
};
// handle click event

handleClickListener = (e) => {
  if (e.target.className === `favourite`) {
    const taskId = e.target.id;
    console.log(taskId);

    addToFavourite(taskId);
  }
};

eventHandler = () => {
  document.addEventListener("click", handleClickListener);
};

eventHandler();
