const search = document.querySelector("#search");
const results = document.querySelector("#results");
const favouriteUI = document.querySelector("#fav");
const localHostUrl = window.document.URL;

var heroes;

var favouriteArr = [];

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
    results.innerHTML = "<h2>Heroes</h2>";

    // populate the ul
    heroes.forEach((hero) => {
      const li = document.createElement("li");
      let heroId = hero.id;
      let heroName = hero.name;

      li.innerHTML = `<div id="div${heroId}" name="${heroName}">
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

// render favourite
//
const renderFav = () => {
  // making async call to fetch data

  // ul of heroes
  var ul = document.createElement("ul");

  ul.classList.add("heroes");

  // clear the ul
  favouriteUI.innerHTML = "<h2>Favourite</h2>";

  // populate the ul
  favouriteArr.forEach((hero) => {
    const li = document.createElement("li");
    let heroId = hero.id;
    let heroName = hero.name;

    li.innerHTML = `<div id="div${heroId}" name="${heroName}">
                          <p><a href="hero-info.html#${heroId}"  >${heroName}</a></p> 
                          <button id="remove${heroId}" class="remove" >remove</button>
                      </div>`;

    ul.appendChild(li);
  });

  favouriteUI.appendChild(ul);
};

// favourite create
var elem;
addToFavourite = (inputId) => {
  elem = document.querySelector("#" + inputId).parentElement;

  var favData = {
    name: elem.innerText,
    id: elem.id.substring(3),
  };

  let find = favouriteArr.findIndex((hero) => hero.id == elem.id.substring(3));

  if (find == -1) {
    favouriteArr.push(favData);

    renderFav();
  }
};

removeFav = (taskId) => {
  let id = taskId.substring(6);
  console.log(id);

  favouriteArr = favouriteArr.filter((hero) => hero.id != id);

  renderFav();
};
// handle click event

handleClickListener = (e) => {
  if (e.target.className === `favourite`) {
    const taskId = e.target.id;
    console.log(taskId);

    addToFavourite(taskId);
  }

  if (e.target.className == "remove") {
    const taskId = e.target.id;

    removeFav(taskId);
  }
};

eventHandler = () => {
  document.addEventListener("click", handleClickListener);
};

eventHandler();
