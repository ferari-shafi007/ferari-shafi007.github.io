var menu = document.querySelector("#menu");
var openMenuBtn = document.querySelector(".fa-bars-staggered");
var closeMenuBtn = document.querySelector(".fa-xmark");

var tlMenu = gsap.timeline();
openMenuBtn.addEventListener("click", function () {
  tlMenu.to(menu, {
    duration: 0.5,
    x: 0,
    ease: "power1.inOut",
  });
});

closeMenuBtn.addEventListener("click", function () {
  tl.to(menu, {
    duration: 0.5,
    x: "100%",
    ease: "power1.inOut",
  });
});
