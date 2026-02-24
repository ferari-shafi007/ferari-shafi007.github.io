const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x7bff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
let canvas = document.querySelector("#draw");
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Dynamically load OrbitControls (no change to index.html required)
let controls = null;
(function loadOrbitControls() {
  const script = document.createElement("script");
  script.src = "three/addons/controls/OrbitControls.js";
  script.onload = () => {
    if (THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.screenSpacePanning = false;
      controls.minDistance = 2;
      controls.maxDistance = 20;
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };
  document.head.appendChild(script);
})();

function animate(time) {
  if (controls) controls.update();
  renderer.render(scene, camera);
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
}
renderer.setAnimationLoop(animate);
