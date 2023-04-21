import * as THREE from 'three';

export const setupUniverse = () => {
    // setup of the scene
    const scene = new THREE.Scene();

    // setup of the camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setY(1);
    camera.position.setZ(-7);

    //setup of the rerender
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    // return the universe created
    const universeElements = {scene: scene, camera: camera, renderer: renderer}
    return universeElements
}