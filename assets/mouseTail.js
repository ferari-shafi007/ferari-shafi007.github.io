let mouseTail = document.querySelector("#mouseTail");

document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  console.log(`Mouse position: (${x}, ${y})`);

  gsap.to(mouseTail, {
    x: x,
    y: y,
    duration: 1,
    ease: "power2.out",
  });
});
