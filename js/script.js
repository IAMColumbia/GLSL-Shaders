import * as THREE from "three";
import { Vector2 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

var width = window.innerWidth - 20;
var height = window.innerHeight - 50;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, width / height, .1, 1000);
camera.position.z = 50;
camera.updateProjectionMatrix();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#00000");
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);

window.addEventListener("newSize", () => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

const uniforms =
{
    u_time: { type: "f", value: 0.0 },
    u_res: {type: "v2", value: new THREE.Vector2(width, height)}
}
const sphereGeo = new THREE.SphereGeometry(10, 10, 30, 30);
const sphereMat = new THREE.ShaderMaterial({
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    wireframe: false,
    uniforms: uniforms
});
const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
sphereMesh.position.x = 13;
scene.add(sphereMesh);

const uniforms2 =
{
    u_time: { type: "f", value: 0.0 },
    u_res: {type: "v2", value: new THREE.Vector2(width, height)}
}
const torusGeo = new THREE.TorusGeometry(10, 1, 30, 30);
const torusMat = new THREE.ShaderMaterial({
    vertexShader: document.getElementById("vertexShader2").textContent,
    fragmentShader: document.getElementById("fragmentShader2").textContent,
    wireframe: false,
    uniforms: uniforms2
});
const torusMesh = new THREE.Mesh(torusGeo, torusMat);
torusMesh.position.x = -13;
scene.add(torusMesh);

const clock = new THREE.Clock();

function animate(time)
{
    uniforms.u_time.value = clock.getElapsedTime();
    uniforms2.u_time.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);