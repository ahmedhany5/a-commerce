// green alert

let distance = 25;

export function greenAlert(message = "Please add a message") {
  let alertHtml = `
    <i class="fa-solid fa-circle-check"></i>
    <div class="message">${message}</div>
  `;

  let alert = document.createElement("div");
  alert.className = "green-alert";
  document.querySelector("body").appendChild(alert);

  alert.innerHTML = "";

  alert.innerHTML = alertHtml;
  setTimeout(() => {
    alert.style.cssText = `top: ${distance}px`;
  }, 0);

  setTimeout(() => {
    alert.style.cssText = `top: -80px`;
    distance = 25;
  }, 2000);

  setTimeout(() => {
    alert.remove();
  }, 4000);

  distance += 10;
}

// red alert

export function redAlert(message = "Please add a message") {
  let alertHtml = `
    <i class="fa-solid fa-circle-xmark"></i>
    <div class="message">${message}</div>
  `;

  let alert = document.createElement("div");
  alert.className = "red-alert";
  document.querySelector("body").appendChild(alert);

  alert.innerHTML = "";

  alert.innerHTML = alertHtml;
  setTimeout(() => {
    alert.style.cssText = `top: ${distance}px`;
  }, 0);

  setTimeout(() => {
    alert.style.cssText = `top: -80px`;
    distance = 25;
  }, 2000);

  setTimeout(() => {
    alert.remove();
  }, 4000);

  distance += 10;
}
