var search = document.querySelector("#search");
console.log(search);

var searchTerm = "";
var heroes = "";

const xhr = new XMLHttpRequest();

// xhr.onreadystatechange = () => {};

// const fetchSearchData = async (key) => {
//   url = ` https://superheroapi.com/api/1469687849876867/search/${key}`;
//   heroes = await fetch(url, {
//     method: "GET",
//     mode: "cors",
//     credentials: "same-origin", // include, same-origin, *omit
//     headers: {
//       "Content-Type": "application/json; charset=utf-8",
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   });

//   //   .then((res) => res.json());
//   console.log(url);
//   console.log(heroes);
// };

fetchSearchData = (key) => {
  var xhr = new XMLHttpRequest();
  url = ` https://superheroapi.com/api/1469687849876867/search/${key}`;
  //   xhr.readyState = () => {
  //     console.log("xhr");
  //     if (this.onreadystatechange == 4 && this.status == 200) {
  //       //   console.log(this.responseText);
  //       console.log("hello");
  //     }
  //     xhr.open("GET", url, true);
  //     // xhr.onload = success;
  //     xhr.send();
  //   };

  xhr.onload = () => {
    let result = JSON.parse(xhr.response);
    console.log(result.results[0]);
  };
  xhr.open("GET", url, true);
  xhr.send();
};

search.addEventListener("input", (e) => {
  searchTerm = e.target.value;
  console.log(searchTerm);

  fetchSearchData(searchTerm);
});
