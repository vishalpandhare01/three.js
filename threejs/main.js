import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(30, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6387,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointtLight = new THREE.PointLight(0xffffff)
pointtLight.position.set(5,50,5)

const ambientLight =  new THREE.AmbientLight(0xffffff)
scene.add(pointtLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointtLight)
const gridHelper = new THREE.GridHelper(200,5)

scene.add(lightHelper,gridHelper)


const controls = new OrbitControls(camera , renderer.domElement)

function addStar(){
  const geoMetry =  new THREE.SphereGeometry(0.25 ,24,24)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})

  const star = new THREE.Mesh(geoMetry,material)

  const [x,y,z] = Array(3).fill().map(()=>THREE.MathUtils.randFloatSpread(100))
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


const spaceTexture = new  THREE.TextureLoader().load('gif.gif')
scene.background = spaceTexture


const gokuTexture = new THREE.TextureLoader().load('bgimg.jpg')
const goku =  new THREE.Mesh(
  new THREE.SphereGeometry(4,40,40),
  new THREE.MeshStandardMaterial({
    map:gokuTexture,
    normalMap:gokuTexture
  })
)


goku.position.z = 30
goku.position.setX(-10)
scene.add(goku)

const gokuTexture2 = new THREE.TextureLoader().load('bgimg.jpg')
const goku2 =  new THREE.Mesh(
  new THREE.SphereGeometry(6,40,40),
  new THREE.MeshStandardMaterial({
    map:gokuTexture2,
    normalMap:gokuTexture2
  })
  
)

scene.add(goku2)

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  goku.rotation.x += 0.01

  controls.update()
}
animate()

function animat2() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera)
  goku2.rotation.x += 0.01
  goku2.rotation.y += 0.005
  goku2.rotation.z += 0.01


}

animat2()


function moveCamera(){
  const t = document.body.getBoundingClientRect().top

  goku.rotation.x += 0.05
  goku.rotation.y += 0.75
  goku.rotation.z += 0.05

  camera.position.x += t * - 0.01
  camera.position.y += t * - 0.0002
  camera.position.z += t * - 0.0002
}

document.body.onscroll =  moveCamera