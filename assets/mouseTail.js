let mouseTail = document.querySelector("#mouseTail");

document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  mouseTail.style.left = x + "px";
  mouseTail.style.top = y + "px";
});
