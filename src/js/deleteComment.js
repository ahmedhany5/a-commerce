
export function deleteComment() {
  document
    .querySelectorAll(".product-show .comments .comment i")
    .forEach((v) => {
      v.addEventListener("click", () => {
        v.parentElement.remove();
      });
    });
}