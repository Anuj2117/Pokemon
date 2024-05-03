const input = document.querySelector("input");
const poketype = document.querySelector("#poketype");
const search = document.querySelector(".searchbutton");
const reset = document.querySelector(".resetbutton");
const pokediv = document.querySelector(".pokemondiv");

const limit = 500;
const offset = 0;

let pokemonarray = [];
let finalData;
window.addEventListener("load", async () => {
  const data = await getDataFromAPI(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  console.log(data.results);
  const promises = data.results.map(async (dt) => {
    return await getDataFromAPI(dt.url);
  });
  finalData = await Promise.all(promises);
  //   console.log(finalData)

  pokemonarray = [...finalData];
  PopulatePomemon(finalData);
});

function PopulatePomemon(data) {
  pokediv.innerHTML = "";
  if (data) {
    console.log(data);
    data.forEach(async (pokemon) => {
      // const response = await getDataFromAPI(pokemon.url);
      // // console.log(response);
      // pokemonarray.push(response);

      const pokemoninfo = document.createElement("div");
      pokemoninfo.classList.add("pokemoninfo");

      //extra info div creation
      const pokemonextrainfodiv = document.createElement("div");
      pokemonextrainfodiv.classList.add("extrainfo");

      const pokemonid = document.createElement("h2");
      pokemonid.textContent = "#" + pokemon.id;

      const pokemonimg = document.createElement("img");
      pokemonimg.src = pokemon.sprites.other.dream_world.front_default;

      const pokemonname = document.createElement("h2");
      pokemonname.textContent = pokemon.name;

      const pokemontype = document.createElement("h2");
      pokemontype.innerText = "Type : " + pokemon.types[0].type.name;
      pokemoninfo.classList.add(pokemon.types[0].type.name);

      const knowmore = document.createElement("button");
      knowmore.classList.add("knowmore");
      knowmore.innerText = "Know More";
      knowmore.addEventListener("click", () => {
        pokemonextrainfodiv.style.display = "flex";
        pokemoninfo.style.display = "none";
      });

      pokemoninfo.append(
        pokemonid,
        pokemonimg,
        pokemonname,
        pokemontype,
        knowmore
      );

      //extra info div

      const pokemonheight = document.createElement("h2");
      pokemonheight.innerHTML =
        "<strong>Height : </strong>" + pokemon.height + "cm";

      const pokemonweight = document.createElement("h2");
      pokemonweight.innerHTML =
        "<strong>Weight : </strong>" + pokemon.weight + "kg";

      pokemon.stats.forEach((stat) => {
        const pokemonstat = document.createElement("h2");
        pokemonstat.innerHTML =
          "<strong>" + stat.stat.name + "</strong>" + " : " + stat.base_stat;
        pokemonextrainfodiv.append(pokemonstat);
      });

      const showless=document.createElement("button");
      showless.classList.add("showless");
      showless.innerText="Show Less";
      showless.addEventListener("click",()=>{
        pokemonextrainfodiv.style.display = "none";
        pokemoninfo.style.display = "flex";
      });

      pokemonextrainfodiv.append(pokemonheight, pokemonweight,showless);

      // append child

      pokediv.append(pokemoninfo, pokemonextrainfodiv);

      // console.log(pokemonarray);
    });
  } else {
    pokediv.innerHTML =
      "<p class='noPokemon'>NO POKEMON FOUND WITH THIS FILTER</p>";
  }
}

async function getDataFromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

input.addEventListener("keyup", async (e) => {
  e.preventDefault();

  let query = input.value;
  console.log(query.length);
  if (query.length > 0) {
    try {
      const searchPokemons = pokemonarray.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      console.log(searchPokemons);
      searchPokemons.length > 0
        ? PopulatePomemon(searchPokemons)
        : PopulatePomemon(pokemonarray);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  } else {
    PopulatePomemon(pokemonarray);
  }
});

poketype.addEventListener("change", (e) => {
  let pokemonarray2 = pokemonarray.filter((pokemon) => {
    return pokemon.types[0].type.name === e.target.value;
  });
  //   console.log(filteredPokemons);
  pokemonarray2.length > 0
    ? PopulatePomemon(pokemonarray2)
    : PopulatePomemon(false);
});

reset.addEventListener("click", () => {
  poketype.value = "";
  input.value = "";
  PopulatePomemon(finalData);
});


const headingText = "Geekster Pokemon";
    const typingDelay = 100; // Adjust typing speed here
    let charIndex = 0;

    function typeHeading() {
      if (charIndex <= headingText.length) {
        document.getElementById('typing-heading').textContent = headingText.substring(0, charIndex);
        charIndex++;
       
      }
      else{
        charIndex=0;
      }
      setTimeout(typeHeading, typingDelay);
    }

    document.addEventListener("DOMContentLoaded", function() {
      typeHeading();
    });