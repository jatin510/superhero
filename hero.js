const localHostUrl = window.document.URL;
const result = document.querySelector("#result");
// hero id
arr = localHostUrl.split("#");
heroId = arr[1];

var heroData;

const fetchHeroInfo = async (heroId) => {
  url = `https://superheroapi.com/api.php/1469687849876867/${heroId}`;
  heroData = await fetch(url).then((res) => res.json());
};

// const getImage = async (heroId) => {
//   url = `https://superheroapi.com/api/1469687849876867/${heroId}/image`;

//   imageUrl = await fetch(url);
//   imageUrl = imageUrl.url;

//   return imageUrl;
// };

const showHeroInfo = async (heroId) => {
  await fetchHeroInfo(heroId);

  let name = heroData.name;
  let powerstats = heroData.powerstats;

  //not required
  //   let image = await getImage(heroId);

  const div = document.createElement("div");

  div.innerHTML = `
  <h4>Name : ${name} </h4>
  <h3>Image : </h3>
  <img src="${heroData.image.url}">
  <h3>Bio </h3>
  <hr>
  <h4>Full Name : ${heroData.biography["full-name"]} </h4>
  <h4>Alter Ego : ${heroData.biography["alter-egos"]}</h4>
  <h4>First Apperance : ${heroData.biography["first-appearance"]}</h4>
  <h4>Alter Ego : ${heroData.biography["alter-egos"]}</h4>
  <br>
  <h3>Stats</h3>
  <hr>
  <h4>Intelligence : ${powerstats.intelligence} </h4>
  <h4>Strength : ${powerstats.strength} </h4>
  <h4>Intelligence : ${powerstats.intelligence} </h4>
  <h4>Power : ${powerstats.power} </h4>
  <h4>Combat : ${powerstats.combat} </h4>
  <h4>Speed : ${powerstats.speed} </h4>

  `;

  result.appendChild(div);
};

showHeroInfo(heroId);
