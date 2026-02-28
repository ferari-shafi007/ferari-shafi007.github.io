let welcomescreen = document.getElementById("welcome");
let welcomeText = document.querySelector(".welcome-text");
let welcomwesubtext = document.querySelector(".welcome-subtext");
// Animate the welcome text using GSAP
let tl = gsap.timeline();
tl.from(welcomeText, {
  duration: 1,
  opacity: 0,
  y: 100,
  ease: "power1.in",
});
tl.from(
  welcomwesubtext,
  {
    duration: 1,
    opacity: 0,
    y: 100,
    ease: "power1.in",
  },
  "-=0.5"
); // Start this animation 0.5 seconds before the previous one ends
// After the animation is complete, hide the welcome screen
tl.to(welcomescreen, {
  duration: 1,
  pointerEvents: "none",
  y: -1000,
  delay: 0.5,
  onComplete: function () {
    welcomescreen.style.display = "none";
  },
});

// menu code starts here
var menu = document.querySelector("#menu");
var openMenuBtn = document.querySelector(".fa-bars-staggered");
var closeMenuBtn = document.querySelector(".fa-xmark");
var menuItems = document.querySelectorAll(".nav-links li");
let menuTl = gsap.timeline({ paused: true });
openMenuBtn.addEventListener("click", function (e) {
  menuTl.play();
});
menuTl.from(menu, {
  duration: 0.5,
  x: "100%",
  duration: 0.8,
  ease: "power1.in",
  pointerEvents: "none",
});
menuTl.from(menuItems, {
  duration: 0.5,
  opacity: 0,
  x: 50,
  ease: "power1.in",
  stagger: 0.2,
});
closeMenuBtn.addEventListener("click", function () {
  menuTl.reverse();
});
