import { beforeEach, describe, expect, test } from "vitest";
import {
  formatPokemonData,
  createPokemonCardHTML,
  renderPokemon,
} from "./pokemon.js";

describe("Pokemon App Unit Tests", () => {
  let container;

  // Reset the DOM before every single test to prevent test bleed
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    container = document.getElementById("app");
  });

  // --- 2. Testing Pure Functions (Logic First) ---
  test("formatPokemonData correctly formats API object", () => {
    const mockApiResponse = {
      name: "pikachu",
      sprites: {
        front_default: "https://raw.githubusercontent.com/.../25.png",
      },
      types: [{ type: { name: "electric" } }],
    };

    const result = formatPokemonData(mockApiResponse);

    expect(result).toEqual({
      name: "PIKACHU",
      image: "https://raw.githubusercontent.com/.../25.png",
      types: "electric",
    });
  });

  test("createPokemonCardHTML outputs expected HTML string", () => {
    const mockData = {
      name: "PIKACHU",
      image: "pikachu.png",
      types: "electric",
    };
    const html = createPokemonCardHTML(mockData);

    expect(html).toContain('<h2 class="pokemon-name">PIKACHU</h2>');
    expect(html).toContain('src="pikachu.png"');
  });

  // --- 3. Testing DOM Render & Updates ---
  test("renderPokemon updates container innerHTML with name and image", () => {
    const mockApiResponse = {
      name: "ditto",
      sprites: { front_default: "ditto.png" },
      types: [{ type: { name: "normal" } }],
    };

    renderPokemon(container, mockApiResponse);

    // Verify DOM updates directly
    const nameHeading = container.querySelector(".pokemon-name");
    const pokemonImg = container.querySelector(".pokemon-image");

    expect(nameHeading).not.toBeNull();
    expect(nameHeading.textContent).toBe("DITTO");
    expect(pokemonImg.getAttribute("src")).toBe("ditto.png");
  });
});
