import * as THREE from 'three';

/**
 * The location, where everything will be rendered
 */
const scene = new THREE.Scene();
/**
 * The Point of View, the idea is that the scene is being recorded via a camera, and everything we see is what is being captured by the camera
 * * FOV (75 degrees): The section that will be seen out of the 360 degrees
 * * Aspect ratio: It's usually best to use the ratio of the screen ie. width/height
 * * Near point: Indicates the closest object to be rendered. Any object closer than 0.1 won't be rendered
 * * Far point: The farthest object that will be visible, anything farther than 1000 won't be see
 */
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

/**
 * The engine that will be used to render the image. Three will select the best available on that device, most like WebGL
 */
const renderer = new THREE.WebGLRenderer();
/**
 * The engine rendered on the DOM
 * Note, all the scene will be rendered inside the engine, so if you divide half the size (e.g window.innerWidth/2), all the screen will still be rendered by at half the resolution
 */
renderer.setSize(window.innerWidth, window.innerHeight);
/**
 * Attach DOM to HTML
 */
document.body.appendChild(renderer.domElement);

/**
 * Create an shape, this time a box
 * https://threejs.org/docs/#api/en/geometries/BoxGeometry
 */
const geometry = new THREE.BoxGeometry(2, 1, 1.5);
/**
 * Create the skin of that object, something green
 * https://threejs.org/docs/#api/en/materials/MeshBasicMaterial
 */
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
/**
 * Create an object from the shape and skin, this time a green box
 */
const cube = new THREE.Mesh(geometry, material);
/**
 * Add it to your scene
 */
scene.add(cube);

/**
 * Whenever we create or add stuff, the location is at the same place
 * Which means our cube and our camera an inside each other
 * In order to view the object (cube), we need to shift back a little bit
 */
camera.position.z = 5;

function animate() {
  // A better version of setInterval, made specific for these types of animation
  requestAnimationFrame(animate);

  /**
   * Rotate slightly
   */
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  /**
   * Rerender the new update (rotated cube)
   */
  renderer.render(scene, camera);
}

animate();
