export default function searchSystem() {
  let input = document.querySelector("header .lang-and-search .search input");
  let productsS = document.querySelectorAll("main .shop .item .title");
  input.addEventListener("change", () => {
    let searching = input.value.toLowerCase();
    productsS.forEach((v) => {
      if (!v.innerHTML.toLowerCase().includes(searching)) {
        v.parentElement.classList.add("hide");
      } else {
        v.parentElement.classList.remove("hide");
      }
    });
  });
}
