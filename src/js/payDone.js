import addProduct from "./addToCart";
export default function payDone(arrayOfProducts) {
  const items = document.querySelectorAll("div .itemsList .item button");
  items.forEach((v, i) => {
    v.addEventListener("click", async () => {
      const greenAlert = await import("./notifications").then(
        (module) => module.greenAlert
      );
      greenAlert("You have been purshased this product");
      arrayOfProducts.splice(i, 1);
      addProduct(arrayOfProducts);
    });
  });
}
