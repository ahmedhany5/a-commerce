import { addComment } from "./addComment";
import { deleteComment } from "./deleteComment";

export default function showProduct(key, arrayOfProducts) {
  document.querySelector("body .product-show").innerHTML = "";
  let item = arrayOfProducts[key];
  let product = `   
        <a href="#home">Back</a>
        <div class="image">
          <img
            src="${item.img}"
            alt=""
          />
        </div>
        <div class="right">
          <div class="info">
            <div class="title">${item.title}</div>
            <div class="price">${Intl.NumberFormat(undefined, {
              style: "currency",
              currency: "USD",
            })
              .format(item.price)
              .replace(".00", "")}</div>

            <button id="buy">Buy</button>
          </div>
          <div class="comments">
          </div>
  
          <div class="add-comments">
            <input type="text" placeholder="Type your comment here" />
            <button id="comment">Comment</button>
          </div>
        </div>
    `;
  document.querySelector("body .product-show").classList.remove("hide");
  document.querySelector("body .shopping main").classList.add("hidden");
  document.querySelector("body .shopping").classList.add("edit");
  document.querySelector("body .product-show").innerHTML += product;

  let input = document.querySelector(".product-show .add-comments input");

  document
    .querySelector(".product-show .right #buy")
    .addEventListener("click", async () => {
      const greenAlert = await import("./notifications").then(
        (module) => module.greenAlert
      );
      greenAlert("Product has been added to the cart.");
    });

  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      if (input.value !== "") {
        addComment(input);
        deleteComment();
        input.value = "";
      } else {
      }
      async () => {
        const redAlert = await import("./notifications").then(
          (module) => module.redAlert
        );

        redAlert();
      };
    }
  });
  document
    .querySelector(".product-show .add-comments #comment")
    .addEventListener("click", () => {
      addComment(input);
    });

  document
    .querySelector(".product-show a")
    .addEventListener("click", async () => {
      const homeShow = await import("./homeShow").then(
        (module) => module.homeShow
      );

      homeShow();
    });
}
