const search = document.querySelector("#search");
const results = document.querySelector("#results");
const localHostUrl = window.document.URL;

var heroes;

var favourites = [];

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

    li.innerHTML = `<div>
                            <p><a href="hero-info.html#${heroId}" onclick="heroInfo()" >${heroName}</a></p> 
                            <input type="checkbox" id="${heroId}"/>
                    </div>`;

    ul.appendChild(li);
  });

  results.appendChild(ul);
};

search.addEventListener("input", (e) => {
  searchTerm = e.target.value;

  showHeroes(searchTerm);
});
