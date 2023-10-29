import { deleteComment } from "./deleteComment";
import { redAlert } from "./notifications";

export function addComment(setInput) {
  let comment = {
    img: "/public/images/profileImg/ahmedk05a_optimized.png",
    text: setInput.value,
  };

  if (setInput.value !== "") {
    let newComment = `
        <div class="comment">
          <div class="p-img"><img src="${comment.img}" /></div>
          <div class="text">${comment.text}</div>
          <i class="fa-solid fa-trash"></i>
        </div>
      `;
    document.querySelector(".product-show .right .comments").innerHTML +=
      newComment;
    deleteComment();
    setInput.value = "";
  } else {
    redAlert("Please type any comment.");
  }
}