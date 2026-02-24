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
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

function animate(time) {
  renderer.render(scene, camera);
  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;
}
renderer.setAnimationLoop(animate);
