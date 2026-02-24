// import * as THREE from "three";
// import { GLTFLoader } from "./GLTFLoader.js";

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
const geometry = new THREE.CylinderGeometry(1, 1, 1, 32, 1, true);
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
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
// renderer.outputEncoding = THREE.sRGBEncoding;

// Set a simple background for now
// scene.background = new THREE.Color(0x222222);

// Add some basic lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const objloader = THREE.GLTFLoader ? new THREE.GLTFLoader() : null;

objloader.load(
  // "assets/img/zweihander_sword.glb",
  "assets/img/mini_robot.glb",
  // "assets/img/robot_playground.glb",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  },
);

// Skip GLB loading - use fallback objects instead
let fallbackObjects = [];

function loadGLBModel() {
  console.log("Creating fallback 3D objects");
  // createFallbackObjects();
}

// Create fallback objects
function createFallbackObjects() {
  // Cube
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b6b,
    metalness: 0.4,
    roughness: 0.6,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.set(-4, 0, 0);
  scene.add(cube);
  fallbackObjects.push(cube);

  // Sphere
  const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x4ecdc4,
    metalness: 0.7,
    roughness: 0.2,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(4, 0, 0);
  scene.add(sphere);
  fallbackObjects.push(sphere);

  // Torus
  const torusGeometry = new THREE.TorusGeometry(2, 0.8, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd93d,
    metalness: 0.5,
    roughness: 0.4,
  });
  const torus = new THREE.Mesh(torusGeometry, torusMaterial);
  torus.position.set(0, 3, 0);
  scene.add(torus);
  fallbackObjects.push(torus);

  console.log("✓ Fallback 3D objects added to scene");
}

loadGLBModel();

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

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate(time) {
  // Smoothly interpolate rotation for cylinder
  //   cylender.rotation.y += (targetRotationY - cylender.rotation.y) * 0.1;
  cylender.rotation.x += (targetRotationX - cylender.rotation.x) * 0.1;
  cylender.rotation.y = time * 0.0001; // Rotate around Y-axis over time

  // Rotate fallback objects
  if (fallbackObjects.length > 0) {
    fallbackObjects[0].rotation.x += 0.005;
    fallbackObjects[0].rotation.y += 0.008;

    fallbackObjects[1].rotation.y += 0.004;

    fallbackObjects[2].rotation.x += 0.003;
    fallbackObjects[2].rotation.y += 0.006;
  }

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
