const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
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
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
let canvas = document.querySelector("#draw");
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas });
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
  // cube.rotation.x = time / 2000;
  cube.rotation.y = time / 5000;
}
renderer.setAnimationLoop(animate);
