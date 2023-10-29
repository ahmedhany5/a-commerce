import payDone from "./payDone";
export default function addProduct(arrayOfProducts) {
  document.querySelector("div .itemsList").innerHTML = "";
  for (const item of arrayOfProducts) {
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
      });
  }

  function incrementProduct(key) {
    let count = document.querySelectorAll(".cart .list .item .add-more .count");
    let price = document.querySelectorAll(".itemsList .item .total-price");
    count[key].innerHTML++;
  }

  function decrementProduct(key, number) {
    let count = document.querySelectorAll(".cart .list .item .add-more .count");
    if (count[key].innerHTML === "1") {
      return;
    }
    count[key].innerHTML--;
  }

  payDone(arrayOfProducts)
}
