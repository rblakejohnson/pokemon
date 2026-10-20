# Pokemon - try/catch 'em all!

## Part 1: Advanced DOM Manipulation

### 1. Separation of Concerns (Pure Logic vs. DOM Rendering)

Keep your data fetching/formatting separate from the DOM updates so each piece is easy to reason about and test.

* **Pure vs. Impure Functions**: Separate data processing (pure functions) from DOM manipulation (impure functions) to make code predictable and easily testable.  
* **State-Driven Rendering**: Instead of manually updating individual elements inline → build render functions that accept a state object and update the DOM accordingly.

### 2. Modern DOM APIs & Dynamic Templates

* **Dynamic Content Creation**: Moving beyond basic element.textContent to HTML `<template\>` tags and `element.insertAdjacentHTML()`.  
* **Efficient DOM Updates**: Instead of replacing everything repeatedly with raw strings, you can use HTML `<template>` tags for batched DOM updates (minimizing reflows).

```javascript
// Render using an <template> element in index.html:
// <template id="pokemon-template">
//   <div class="pokemon-card">
//     <h2 class="pokemon-name"></h2>
//     <img class="pokemon-image" />
//   </div>
// </template>

export function renderWithTemplate(containerElement, pokemonData) {
  const template = document.getElementById('pokemon-template');
  // Clone the template content in memory
  const clone = template.content.cloneNode(true);

  clone.querySelector('.pokemon-name').textContent = pokemonData.name;
  
  const img = clone.querySelector('.pokemon-image');
  img.src = pokemonData.image;
  img.alt = pokemonData.name;

  containerElement.innerHTML = ''; // Clear previous
  containerElement.appendChild(clone); // Fast, single batch insertion
}
```

### 3. Event Handling Patterns

Handle user interactions (like a search form or list click) cleanly using event delegation.

* **Event Delegation**: Attaching a single event listener to a parent container (e.g., ul or table) using `e.target.closest()` rather than binding individual listeners to every dynamically added element.  
* **Custom Events & Dispatching**: Creating and dispatching custom events (`new CustomEvent()`) to decouple components.

```javascript
// Attach one listener on the form instead of individual buttons
export function setupSearchHandler(formElement, onSearch) {
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = formElement.querySelector('input[name="pokemon-name"]');
    const query = input.value.trim().toLowerCase();
    
    if (query) {
      await onSearch(query);
      input.value = '';
    }
  });
}
```

## Part 2: Unit Testing the DOM

### 1. Test Environment Setup & Resetting DOM

* **JSDOM / Happy-DOM Setup**: How virtual DOM environments work under test runners like Jest or Vitest.  
* **Global Setup & Teardown**: Using `beforeEach()` to reset `document.body.innerHTML` so tests never pollute each other.

### 2. Testing Pure Logic vs. DOM Components

* **Unit Testing Logic First**: Isolating functions that calculate or transform state before touching the DOM.  
* Testing DOM Render Functions:  
* Setting up dummy HTML templates.  
* Calling the render function with sample input data.  
* Asserting elements exist using DOM selection queries (`querySelector`, `textContent`, `classList.contains`).

### 3. Simulating Events & Interactions

* **Simulating User Actions**: Using `element.click()` or `dispatchEvent(new Event('submit'))` to trigger handlers.  
* **Event Delegation Testing**: Asserting that clicks on dynamically created child elements fire the expected parent callbacks.  
* **Testing Dynamic Updates**: Verifying state changes reflected in the UI after an event fires (e.g., item added to list, class toggled, input cleared).
