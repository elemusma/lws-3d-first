import './styles/fonts.css';
import './styles/style.css';

import * as THREE from 'three';
function Header() {
  // Get the container where you want to append the header elements
  const container = document.body; // You can choose another element as your container

  // Create an image element
  const img = document.createElement('img');

  img.src = 'assets/sunset.jpg'; // Path to your image file
  img.alt = 'Logo';

  // Create a paragraph element
  const p = document.createElement('p');
  p.textContent = 'helloss';

  // Append both elements to the container
  container.appendChild(img);
  container.appendChild(p);
}

// Call the Header function to execute it
// Header();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1,1000 ); // first argument: field of view second: aspect ratio, third: view frustum

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth,window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene,camera)

// Torus

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:0xFFC80F});
const torus = new THREE.Mesh(geometry, material); // mesh = geometry + material

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff,200);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50)
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);
// alert('ehhlo1');

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh( geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// background

const spaceTexture = new THREE.TextureLoader().load('assets/sunset.jpg')
scene.background = spaceTexture

// avatar
const tadeoTexture = new THREE.TextureLoader().load('assets/headshot-square.jpg')

const tadeo = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: tadeoTexture})
)

scene.add(tadeo)

// Moon
const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg')
const normalTexture = new THREE.TextureLoader().load('assets/normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({map: moonTexture,normalMap: normalTexture})
)

scene.add(moon)

moon.position.z = 30;
moon.position.setX(-10);

tadeo.position.z = -5;
tadeo.position.x = 2;

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  tadeo.rotation.y += 0.01;
  tadeo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate () {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene,camera)
}

animate()
// renderer.render(scene, camera)

// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))
