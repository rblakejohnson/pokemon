// 0. Fetch raw API data from PokeAPI
export async function fetchPokemon(nameOrId) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`,
  );
  if (!response.ok) {
    throw new Error("Pokemon not found!");
  }
  return await response.json();
}

// 1. Pure Function: Formats raw API data into clean state
export function formatPokemonData(apiData) {
  return {
    name: apiData.name.toUpperCase(),
    image: apiData.sprites?.front_default || "",
    types: apiData.types?.map((t) => t.type.name).join(", ") || "Unknown",
  };
}

// 2. Pure Template Function: Generates HTML string using template literals
export function createPokemonCardHTML(pokemon) {
  return `
    <div class="pokemon-card">
      <h2 class="pokemon-name">${pokemon.name}</h2>
      <img class="pokemon-image" src="${pokemon.image}" alt="${pokemon.name}" />
      <p class="pokemon-types">Types: ${pokemon.types}</p>
    </div>
  `;
}

// 3. Impure DOM Function: Gets element and updates innerHTML
export function renderPokemon(containerElement, apiData) {
  const formattedData = formatPokemonData(apiData);
  const cardHTML = createPokemonCardHTML(formattedData);
  containerElement.innerHTML = cardHTML;
}
