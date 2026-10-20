import "./style.css";
import { fetchPokemon, renderPokemon } from "./pokemon.js";

// 1. Grab initial DOM elements
const searchForm = document.querySelector("#search-form");
const container = document.querySelector("#pokemon-container");

// 2. Add event listener for form submission
//    and handle 3 states - loading, data and error
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = searchForm.querySelector('input[name="pokemon-name"]');
  const query = input.value.trim();

  if (!query) return;

  // Show loading state
  container.innerHTML = "<p>Loading Pokemon...</p>";

  try {
    // Fetch data from API
    const data = await fetchPokemon(query);

    // Render data to DOM using template literal innerHTML
    renderPokemon(container, data);
  } catch (err) {
    // Render error state
    container.innerHTML = `<p class="error">${err.message}</p>`;
  } finally {
    input.value = "";
  }
});
