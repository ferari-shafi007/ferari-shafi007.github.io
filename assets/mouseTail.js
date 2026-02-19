let mouseTail = document.querySelector("#mouseTail");
function moveMouseTail(e) {
  let x = e.clientX;
  let y = e.clientY;
  mouseTail.style.left = x + "px";
  mouseTail.style.top = y + "px";
}
document.addEventListener("mousemove", moveMouseTail);
