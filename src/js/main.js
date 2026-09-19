import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

async function init() {
  await loadHeaderFooter();

  const listElement = document.querySelector(".product-list");
  if (!listElement) return;

  const dataSource = new ProductData("tents");
  const productList = new ProductList("tents", dataSource, listElement);
  productList.init();
}

init();
