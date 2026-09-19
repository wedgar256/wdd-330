// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Update the cart badge with the number of products currently saved.
export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart");
  const countElement = document.getElementById("cart-count");

  if (!countElement) return;

  const count = Array.isArray(cartItems) ? cartItems.length : 0;
  countElement.textContent = count;
  countElement.classList.toggle("hide", count === 0);
}

// Fetch an HTML partial and return it as text.
export async function loadTemplate(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load template at ${path}`);
  }

  return response.text();
}

// Populate the shared header and footer slots, then refresh the cart badge.
export async function loadHeaderFooter() {
  const [headerTemplate, footerTemplate] = await Promise.all([
    loadTemplate("/partials/header.html"),
    loadTemplate("/partials/footer.html"),
  ]);
  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  if (headerElement) headerElement.innerHTML = headerTemplate;
  if (footerElement) footerElement.innerHTML = footerTemplate;

  updateCartCount();
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
