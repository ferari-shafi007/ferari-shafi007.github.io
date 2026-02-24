// Scene setup for robot canvas wrapped in IIFE to avoid global scope conflicts
(function () {
  const robotScene = new THREE.Scene();
  const robotCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  const robotCanvas = document.querySelector("#robot");

  if (!robotCanvas) {
    console.warn("Robot canvas (#robot) not found, skipping robot.js setup");
    return;
  }

  const robotRenderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: robotCanvas,
  });

  robotRenderer.setSize(window.innerWidth, window.innerHeight);
  robotRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  robotRenderer.toneMappingExposure = 1;
  robotCamera.position.z = 5;

  // Helper function to wait for loader availability
  function waitForLoader(loaderName, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const checkLoader = () => {
        // Check both THREE.LoaderName and global LoaderName
        const loader = THREE[loaderName] || window[loaderName];
        if (typeof loader !== "undefined") {
          console.log(`✓ ${loaderName} loaded`);
          resolve(loader);
        } else if (Date.now() - startTime > timeout) {
          // Log what's available for debugging
          console.warn(
            `✗ ${loaderName} not found. Available THREE: ${Object.keys(THREE)
              .filter((k) => k.includes("Loader"))
              .join(", ")}`,
          );
          reject(new Error(`${loaderName} failed to load after ${timeout}ms`));
        } else {
          setTimeout(checkLoader, 300);
        }
      };
      checkLoader();
    });
  }

  // Load HDRI
  async function loadHDRI() {
    try {
      const RGBELoader = await waitForLoader("RGBELoader");
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load(
        "assets/img/church_meeting_room_1k.hdr",
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          robotScene.background = texture;
          robotScene.environment = texture;
          console.log("Robot HDRI loaded");
        },
        undefined,
        (error) => {
          console.warn("Failed to load HDRI:", error);
          robotScene.background = new THREE.Color(0x222222);
        },
      );
    } catch (error) {
      console.error("RGBELoader error:", error);
      robotScene.background = new THREE.Color(0x222222);
    }
  }

  // Load 3D Model
  async function loadModel() {
    try {
      const GLTFLoader = await waitForLoader("GLTFLoader");
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        "assets/img/mini_robot.glb",
        (gltf) => {
          robotScene.add(gltf.scene);
          console.log("Robot model loaded");
        },
        undefined,
        (error) => {
          console.warn("Failed to load model:", error);
          createFallbackModel();
        },
      );
    } catch (error) {
      console.error("GLTFLoader error:", error);
      createFallbackModel();
    }
  }

  function createFallbackModel() {
    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const cylinder = new THREE.Mesh(geometry, material);
    robotScene.add(cylinder);
    console.log("Using fallback cylinder model");
  }

  // Start loading assets asynchronously
  loadHDRI();
  loadModel();

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  robotScene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 10, 7);
  robotScene.add(directionalLight);

  // Orbit Controls
  let robotControls = null;

  async function initOrbitControls() {
    try {
      const OrbitControls = await waitForLoader("OrbitControls");
      robotControls = new OrbitControls(robotCamera, robotRenderer.domElement);
      robotControls.enableDamping = true;
      robotControls.dampingFactor = 0.05;
      robotControls.minDistance = 2;
      robotControls.maxDistance = 50;
      console.log("Robot OrbitControls initialized");
    } catch (error) {
      console.error("OrbitControls error:", error);
    }
  }

  initOrbitControls();

  // Handle window resize
  window.addEventListener("resize", () => {
    robotCamera.aspect = window.innerWidth / window.innerHeight;
    robotCamera.updateProjectionMatrix();
    robotRenderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop for robot scene
  function animateRobot() {
    requestAnimationFrame(animateRobot);
    if (robotControls) {
      robotControls.update();
    }
    robotRenderer.render(robotScene, robotCamera);
  }

  animateRobot();
  console.log("Robot scene initialized");
})();
