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
  "-=0.5",
); // Start this animation 0.5 seconds before the previous one ends
// After the animation is complete, hide the welcome screen
tl.to(welcomescreen, {
  duration: 2,
  pointerEvents: "none",
  y: -1000,
  delay: 2,
  onComplete: function () {
    welcomescreen.style.display = "none";
  },
});
