import "/css/main.css";
import { greenLightNotifi } from "/js/notifications";
const allPages = document.querySelectorAll("nav ul li a");
const sliders = document.querySelectorAll("main .slider .bullets li");
const category = document.querySelectorAll("main .shop .category li");
const items = document.querySelector("main .shop .items");
const itemsInPage = [];
const itemsInCart = new Set();

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
}

async function getItems() {
  await fetch("/APIs/products.json")
    .then((res) => res.json())
    .then((data) => itemsInPage.push(...data))
    .then(() => {
      addToPage();
    });
}

getItems();

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
    itemsInCart.add(itemsInPage[key]);
  }
  greenLightNotifi("The product has been added to the cart.");

  reloadCart();
}

function reloadCart() {
  document.querySelector("div .itemsList").innerHTML = "";
  for (const item of itemsInCart) {
    const content = `
    <div class="item">
    <div class="img"><img src="${item.img}" alt=""></div>
    <div class="add-more">
    <div class="increment">+</div>
          <div class="count">1</div>
          <div class="decrement">-</div>
        </div>
        <div class="title">${item.title}</div>
        <div class="total-price">$${item.price}</div>
        <button>Pay</button>
      </div>  
      `;

    document.querySelector("div .itemsList").innerHTML += content;

    document
      .querySelectorAll(".cart .list .item .increment")
      .forEach((v, i) => {
        v.addEventListener("click", () => {
          incrementProduct(i);
        });
      });

    document
      .querySelectorAll(".cart .list .item .decrement")
      .forEach((v, i) => {
        v.addEventListener("click", () => {
          decrementProduct(i);
        });

        document
          .querySelectorAll(".cart .list .item button")
          .forEach((v, i) => {
            v.addEventListener("click", () => {
              payDone(i);
            });
          });
      });
  }
}

function incrementProduct(key) {
  let count = document.querySelectorAll(".cart .list .item .add-more .count");
  count[key].innerHTML++;
}

function decrementProduct(key) {
  let count = document.querySelectorAll(".cart .list .item .add-more .count");
  if (count[key].innerHTML === "1") {
    return;
  }
  count[key].innerHTML--;
}

(() => {
  allPages.forEach((e) => {
    if (e.attributes.href.value === "#cart") {
      e.addEventListener("click", () => {
        document.querySelector(".shopping").classList.add("hidden");
        document.querySelector(".cart").classList.remove("hidden");
        document.querySelector(".cart").classList.add("show");
      });
    }
  });
})();

function payDone(key) {
  const items = document.querySelectorAll("div .itemsList .item");
  greenLightNotifi("Purchase completed successfully.");
  items[key].remove();
}
