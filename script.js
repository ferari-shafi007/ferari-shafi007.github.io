document.addEventListener("DOMContentLoaded", function () {
  const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"), // The main container element
    smooth: true, // Enable smooth scrolling
    // Add other options as needed, e.g., multiplier, smoothMobile
  });
});
