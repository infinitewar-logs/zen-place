import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 1. Core Setup (Scene, Camera, Renderer)
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100000,
);
camera.position.set(0, 2, 100); // Position camera up and back slightly

// Change this line to include the alpha: true setting
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 2. Interactive Cursor Controls (Click and drag to rotate, scroll to zoom)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Makes the movement feel smooth and professional
controls.dampingFactor = 0.05;

// 3. Studio Lighting (Ensures your model textures aren't pitch black)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// 4. Load your downloaded Model
const loader = new GLTFLoader();
let myModel;

loader.load(
  "./ZenPlace.glb", // Change this to your exact file name (e.g., './try1.glb' or './try1.gltf')
  function (gltf) {
    myModel = gltf.scene;

    // Center the model in your scene automatically
    const box = new THREE.Box3().setFromObject(myModel);
    const center = box.getCenter(new THREE.Vector3());
    myModel.position.sub(center);

    scene.add(myModel);
    console.log("🚀 Model successfully added to the workspace!");
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error("Oops, something went wrong loading the model:", error);
  },
);

// 5. Smooth Window Resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 6. The Continuous Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Keep updating cursor controls every frame
  controls.update();

  // Optional: Add a very gentle automatic rotation idle animation
  if (myModel) {
    myModel.rotation.y += 0.003;
  }

  renderer.render(scene, camera);
}

animate();
