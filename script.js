const search = document.querySelector("#search");
const results = document.querySelector("#results");

var heroes;

const xhr = new XMLHttpRequest();

// using XMLHttpRequest

// fetchHeroes = async (key) => {
//   var xhr = new XMLHttpRequest();
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
  //   result.innerHTML = "";
  await fetchHeroes(key);

  console.log("show ", heroes);

  var ul = document.createElement("ul");

  ul.classList.add("heroes");
  heroes = heroes.results;
  var names = heroes.filter((hero) =>
    hero.name.toLowerCase().startsWith(key.toLowerCase())
  );
  console.log(names);
  names.forEach((hero) => {
    const li = document.createElement("li");

    li.classList.add("hero-item");
  });
};

search.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  console.log(searchTerm);

  showHeroes(searchTerm);
});
