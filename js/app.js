import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';
import { ObjectControls } from '../vendor/objectControls.js';
import { AsciiEffect } from '../vendor/asciiEffect.js';

$(document).on('click', '[data-toggle="show"]', function (event) {
  event.preventDefault();
  var target = $(this).data('target');
  $(target).toggleClass('show');
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, $('#container-3d').innerWidth() / $('#container-3d').innerHeight(), 0.1, 1000);
let controls;
let objectControls;
let objToRender = 'model2';
const loader = new OBJLoader();

loader.load(
  `assets/model1/${objToRender}.obj`,
  function (object) {
    object.scale.set(1, 1, 1);
    objectControls = object;
    scene.add(object);
    controls = new ObjectControls(camera, effect.domElement, objectControls);  // Cambiar renderer.domElement a effect.domElement
    controls.disableZoom();
    controls.setRotationSpeed(0.35);
    controls.setRotationSpeedTouchDevices(0.28);
    controls.setSpeedAutoRotate(0.1);
    controls.enableHorizontalRotation();
    controls.enableVerticalRotation();
    controls.autoRotate();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.log('An error happened', error);
  }
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize($('#container-3d').innerWidth(), $('#container-3d').innerHeight());

const effect = new AsciiEffect(renderer);
effect.setSize($('#container-3d').innerWidth(), $('#container-3d').innerHeight());

document.getElementById("container-3d").appendChild(effect.domElement);

camera.position.z = 350;
camera.position.y = -15;
camera.position.x = 0;

const light1 = new THREE.PointLight(0xffffff, 0.3);
light1.position.set(500, 500, 500);
scene.add(light1);
const light2 = new THREE.PointLight(0xffffff, 0.25);
light2.position.set(-500, -500, -500);
scene.add(light2);

function animate() {
  requestAnimationFrame(animate);
  effect.render(scene, camera);
}

animate();
