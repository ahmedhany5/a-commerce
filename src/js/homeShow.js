export function homeShow() {
  document.querySelector("body .shopping main").classList.remove("hidden");
  document.querySelector("body .shopping").classList.remove("edit");
  document.querySelector("body .shopping").classList.remove("hidden");
  document.querySelector(".cart").classList.add("hidden");
  document.querySelector("body .product-show").classList.add("hide");
  document.querySelector("nav ul li #cart").classList.remove("active")
  document.querySelector("nav ul li #home").classList.add("active");
}
