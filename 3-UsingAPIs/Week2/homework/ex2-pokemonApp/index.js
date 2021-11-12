'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all
Complete the four functions provided in the starter `index.js` file:
`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.
`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.
`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.
Use async/await and try/catch to handle promises.
Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
document.getElementById('getPokemon').addEventListener('click', fetchAndPopulatePokemons);
const selectElem = document.getElementById("pokemonDropdown");
selectElem.addEventListener('change', (event) => {
  const pokemonSelected = event.target.value;
  fetchImage(pokemonSelected);
});


function fetchData(url) {
  const promise = fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Request failed!');
  }, networkError => {
    console.error(networkError.message);
  });

  return promise;
}

async function fetchAndPopulatePokemons() {
  const query = "pokemon";
  const pokemonApi = await fetchData(`https://pokeapi.co/api/v2/${query}`);
  const pokemonResults = pokemonApi.results;

  pokemonResults.forEach((element, index) => {
    const optionElem = document.createElement("option");
    optionElem.value = index + 1;
    optionElem.textContent = element.name;
    selectElem.appendChild(optionElem);
  });

  return pokemonResults;
}

async function fetchImage(query) {
  const pokemonFetched = await fetchData(`https://pokeapi.co/api/v2/pokemon/${query}`);
  console.log(pokemonFetched);
  const image = pokemonFetched.sprites.front_default;
  document.getElementById("pokemonImage").src = image;
}

async function main() {
  try {
    fetchData("https://pokeapi.co/api/v2/");
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', main);