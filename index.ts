import * as THREE from 'three';

/**
 * The location, where everything will be rendered
 */
const scene = new THREE.Scene();
/**
 * https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera
 * The type of camera is good for 3D view
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

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

/**
 * We are creating 4 points
 */
const points = [];
points.push(new THREE.Vector3(-10, 0, 0)); // Starting point
points.push(new THREE.Vector3(0, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(-10, 10, 0)); // Ending point
// points.push(new THREE.Vector3(-10, 0, 0));
/**
 * We could create a rectangle by adding one more point, the same as starting point
 */

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
/**
 * Add it to your scene
 */
scene.add(line);

/**
 * Whenever we create or add stuff, the location is at the same place
 * Which means our cube and our camera an inside each other
 * In order to view the object (cube), we need to shift back a little bit
 * Another way to write this is: camera.position.set( 0, 0, 5 );
 * Note, if it was OrthographicCamera, z index will not work
 * OrthographicCamera is good for 2D where regardless of the distance between camera, the size is the same
 * https://threejs.org/docs/#api/en/cameras/OrthographicCamera
 */
camera.position.z = 20;

camera.lookAt(0, 1, 0);

function animate() {
  // A better version of setInterval, made specific for these types of animation
  requestAnimationFrame(animate);

  /**
   * Rotate slightly
   */
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;
  line.rotation.z += 0.01;

  /**
   * Rerender the new update (rotated cube)
   */
  renderer.render(scene, camera);
}

animate();
