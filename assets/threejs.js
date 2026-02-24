const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const loader = new THREE.TextureLoader();
const texture = loader.load("assets/img/Mesa de trabajo 2.png");
texture.colorSpace = THREE.SRGBColorSpace;
const geometry = new THREE.CylinderGeometry(2, 2, 2, 32, 1, true);
// texture alpha (0.0 transparent -> 1.0 opaque)
const textureAlpha = 0.9;
const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.DoubleSide,
  transparent: true,
  // opacity: textureAlpha,
});
const cylender = new THREE.Mesh(geometry, material);
scene.add(cylender);
let canvas = document.querySelector("#draw");
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// Simple mouse controls (alternative to OrbitControls)
let isDragging = false;
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

document.addEventListener("mousedown", (e) => {
  isDragging = true;
  mouseX = e.clientX;
  mouseY = e.clientY;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaX = e.clientX - mouseX;
    const deltaY = e.clientY - mouseY;
    targetRotationY += deltaX * 0.01;
    targetRotationX += deltaY * 0.01;
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

// Mouse wheel zoom
// document.addEventListener("wheel", (e) => {
//   e.preventDefault();
//   camera.position.z += e.deltaY * 0.01;
//   camera.position.z = Math.max(2, Math.min(20, camera.position.z));
// });

function animate(time) {
  // Smoothly interpolate rotation
  //   cylender.rotation.y += (targetRotationY - cylender.rotation.y) * 0.1;
  cylender.rotation.x += (targetRotationX - cylender.rotation.x) * 0.1;
  cylender.rotation.y = time * 0.0001; // Rotate around Y-axis over time
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
