const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const loader = new THREE.TextureLoader();

const texture = loader.load("./assets/img/Mesa de trabajo 2.png");
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.CylinderGeometry(1.5, 1.5, 1.5, 64, 1, false);
const material = new THREE.MeshBasicMaterial({ map: texture });
const cylinder = new THREE.Mesh(geometry, material);
scene.add(cylinder);
let canvas = document.querySelector("#draw");
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

function animate(time) {
  renderer.render(scene, camera);
  // cylinder.rotation.x = time / 2000;
  cylinder.rotation.y = time / 5000;
}
renderer.setAnimationLoop(animate);
