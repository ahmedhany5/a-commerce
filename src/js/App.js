import "/css/main.css";
import showProduct from "./productShow";
import addProduct from "./addToCart";
import searchSystem from "./searchSystem";
const allPages = document.querySelectorAll("nav ul li a");
const sliders = document.querySelectorAll("main .slider .bullets li");
const category = document.querySelectorAll("main .shop .category li");
const items = document.querySelector("main .shop .items");
const itemsInPage = [];
let itemsInCart = [];

function addToPage() {
  let index = 0;
  itemsInPage.forEach((value, key) => {
    index++;
    let content = `
      <div class="item" id="prod" tabindex="${index}">
          <div class="image"><img src="${value.img}" alt=""></div>
          <div class="type">${value.type}</div>
          <div class="title">${value.title}</div>
          <div class="rate">
          <ul>
                  <li><i class="fa-solid fa-star"></i></i></li>
                  <li><i class="fa-solid fa-star"></i></li>
                  <li><i class="fa-solid fa-star"></i></li>
                  <li><i class="fa-solid fa-star"></i></li>
                  <li><i class="fa-solid fa-star"></i></li>
              </ul>
          </div>
          <div class="price">${Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
          })
            .format(value.price)
            .replace(".00", "")}</div>
          <button>Buy</button>
      </div>
        `;

    items.innerHTML += content;
    document.querySelectorAll("main .items .item button").forEach((v, i) => {
      v.addEventListener("click", () => {
        addToCart(i);
      });
    });
  });

  searchSystem();
}

async function getItems() {
  await fetch("/APIs/products.json")
    .then((res) => res.json())
    .then((data) => itemsInPage.push(...data))
    .then(() => {
      addToPage();
    });
}

changeOnclick(allPages);
changeOnclick(sliders);
changeOnclick(category);

function changeOnclick(arrOfButtons) {
  arrOfButtons.forEach((page) => {
    page.addEventListener("click", (e) => {
      arrOfButtons.forEach((e) => e.classList.remove("active"));
      e.target.classList.add("active");
    });
  });
}

category.forEach((el) => {
  el.addEventListener("click", (e) => {
    document
      .querySelectorAll("main .shop .items .item .type")
      .forEach((value, key) => {
        if (
          e.target.innerHTML ===
            document.querySelectorAll("main .shop .items .item .type")[key]
              .innerHTML ||
          e.target.innerHTML === "All Departments"
        ) {
          document
            .querySelectorAll("main .shop .items .item")
            [key].classList.remove("hide");
        } else {
          document
            .querySelectorAll("main .shop .items .item")
            [key].classList.add("hide");
        }
      });
  });
});

function addToCart(key) {
  if (itemsInCart !== null) {
    itemsInCart.push(itemsInPage[key]);
    itemsInCart = itemsInCart.filter((v, i) => itemsInCart.indexOf(v) === i);
  }
  showProduct(key, itemsInPage);
  addProduct(itemsInCart);
}

allPages.forEach((e) => {
  if (e.attributes.href.value === "#cart") {
    e.addEventListener("click", () => {
      document.querySelector("body .shopping main").classList.add("hidden");
      document.querySelector("body .shopping").classList.add("edit");
      document.querySelector(".cart").classList.remove("hidden");
      document.querySelector("body .product-show").classList.add("hide");
    });
  }
});

document
  .querySelector(".cart .header a")
  .addEventListener("click", async () => {
    const homeShow = await import("./homeShow").then(
      (module) => module.homeShow
    );

    homeShow();
  });


document.querySelector("body .menu").addEventListener("click", ()=> {
  let nav = document.querySelector("body nav")
  nav.classList.toggle("show")
})

getItems();
