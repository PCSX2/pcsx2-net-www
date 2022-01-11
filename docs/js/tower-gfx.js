let params = (new URL(document.location)).searchParams;
let guiEnabled = params.get('dev') == "true";

var gui;
if (guiEnabled) {
  gui = new dat.GUI({ autoPlace: false });
  gui.domElement.id = 'splash-screen-gui';
}

let camera, scene, renderer;

let fog;

let ambLight;
let dirLight;

let light1, light2, light3, light4;

const clock = new THREE.Clock();

init();

function isWebGLAvailable() {
  try {
    const canvas = document.createElement( 'canvas' );
    return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
  } catch ( e ) {
    return false;
  }
}

function init() {
  let container = document.getElementById('splash-screen');

  if (!isWebGLAvailable()) {
    return;
  }

  camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 25);
  scene = new THREE.Scene();

  var xPadding = 0.5;
  var yPadding = 0.5;
  var numCubesX = 50;
  var numCubesY = 50;
  var cubeWidth = 1;

  var xPixels = numCubesX * cubeWidth + (numCubesX * xPadding);
  var yPixels = numCubesY * cubeWidth + (numCubesY * yPadding);

  let g = new THREE.BoxGeometry();
  let m = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 100 });
  let io = new THREE.InstancedMesh(g, m, numCubesX * numCubesY);

  var cubeCounter = 0;
  let dummy = new THREE.Object3D();
  for (var xPixel = (xPixels / 2) * -1; xPixel <= (xPixels / 2); xPixel += xPadding + cubeWidth) {
    for (var yPixel = (yPixels / 2) * -1; yPixel <= (yPixels / 2); yPixel += yPadding + cubeWidth) {
      var height = Math.ceil(Math.random() * 20) + 1;
      dummy.position.set(xPixel, yPixel, -10);
      dummy.scale.set(1, 1, height); // individual size for each instance
      if (Math.random() > 0.75) {
        dummy.scale.setScalar(0);
      }
      dummy.updateMatrix();
      io.setMatrixAt(cubeCounter, dummy.matrix);
      cubeCounter++;
    }
  }

  scene.add(io);

  fog = new THREE.Fog(0x000000, 25, 150);
  scene.fog = fog;

  ambLight = new THREE.AmbientLight(0x404040); // soft white light
  // scene.add( ambLight );

  const sphere = new THREE.SphereGeometry(0.125, 32, 16);

  light1 = new THREE.PointLight(0x00d4ca, 2, 10, 2);
  light1.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({ color: 0x00d4ca, emissive: 0x00d4ca })));
  light1.position.set(0, 0, 1);
  scene.add(light1);

  light2 = new THREE.PointLight(0xff5653, 2, 10, 2);
  light2.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({ color: 0xff5653, emissive: 0xff5653 })));
  light2.position.set(0, 0, 1);
  scene.add(light2);

  light3 = new THREE.PointLight(0x8dbbf2, 2, 10, 2);
  light3.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({ color: 0x8dbbf2, emissive: 0x8dbbf2 })));
  light3.position.set(0, 0, 1);
  scene.add(light3);

  light4 = new THREE.PointLight(0xf887d6, 2, 10, 2);
  light4.add(new THREE.Mesh(sphere, new THREE.MeshPhongMaterial({ color: 0xf887d6, emissive: 0xf887d6 })));
  light4.position.set(0, 0, 1);
  scene.add(light4);

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
  // scene.add( directionalLight );

  if (guiEnabled) {
    const cameraFolder = gui.addFolder('Camera')
    cameraFolder.add(camera.position, 'x', 0, 100)
    cameraFolder.add(camera.position, 'y', 0, 100)
    cameraFolder.add(camera.position, 'z', 0, 100)
    cameraFolder.open()
    const fogFolder = gui.addFolder('Fog')
    fogFolder.addColor(fog, 'color');
    fogFolder.add(fog, 'near', -100, 100)
    fogFolder.add(fog, 'far', -100, 1000)
    fogFolder.open()
    const ambientLightFolder = gui.addFolder('Ambient Light')
    ambientLightFolder.addColor(ambLight, 'color');
    ambientLightFolder.add(ambLight, 'intensity', -100, 100);
    const directionalLightFolder = gui.addFolder('Directional Light')
    directionalLightFolder.addColor(directionalLight, 'color');
    directionalLightFolder.add(directionalLight.position, 'x', -100, 100);
    directionalLightFolder.add(directionalLight.position, 'y', -100, 100);
    directionalLightFolder.add(directionalLight.position, 'z', -100, 100);
  }

  renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.autoClearColor = false;
  container.appendChild(renderer.domElement);
  if (guiEnabled) {
    container.appendChild(gui.domElement);
  }
  window.addEventListener("resize", onWindowResize);

  animate();
}

// https://tympanus.net/codrops/2019/10/29/real-time-multiside-refraction-in-three-steps/

function onWindowResize() {
  let container = document.getElementById('splash-screen');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

var poorPerfFrames = 0;
var maxPoorPerfFrames = 30;
function animate() {
  var id = requestAnimationFrame(animate);
  const t0 = performance.now();
  render();
  const t1 = performance.now();
  // If it takes longer than 33ms to render a frame (aka, below 30fps)
  // then stop rendering, we'll just pause and it will use whatever was the last frame
  if (t1 - t0 > 33) {
    poorPerfFrames += 1;
    if (poorPerfFrames > maxPoorPerfFrames) {
      cancelAnimationFrame(id);
    }
  }
}

var light1Angle = 0;
var light2Angle = 90;
var light3Angle = 180;
var light4Angle = 360;
function render() {
  camera.rotation.z += 0.0005;

  light1.position.x = Math.sin(light1Angle * 0.7) * 10;
  light1.position.y = Math.cos(light1Angle * 0.5) * 10;
  light2.position.x = Math.sin(light2Angle * 0.7 * -1) * 9;
  light2.position.y = Math.cos(light2Angle * 0.5 * -1) * 9;
  light3.position.x = Math.sin(light3Angle * 0.7 * -1) * 8;
  light3.position.y = Math.cos(light3Angle * 0.5 * -1) * 2;
  light4.position.x = Math.sin(light4Angle * 0.7) * 10;
  light4.position.y = Math.cos(light4Angle * 0.5) * 10;

  light1Angle += 0.02 / (Math.random() + 2);
  light2Angle += 0.02 / (Math.random() + 1.5);
  light3Angle += 0.02 / (Math.random() + 1.75);
  light4Angle += 0.02 / (Math.random() + 1);

  renderer.render(scene, camera);
}
