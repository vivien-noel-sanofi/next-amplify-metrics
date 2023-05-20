import * as THREE from 'three';

export const setupUniverse = () => {
    // setup of the scene
    const scene = new THREE.Scene();

    // setup of the camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setY(0);
    camera.position.setZ(11);

    //setup of the rerender
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener( 'resize', onWindowResize, false );
    function onWindowResize(){
      console.log('RESIZE')
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    console.log('RESIZE OTHER')
    renderer.render(scene, camera);

    
    // return the universe created
    const universeElements = {scene: scene, camera: camera, renderer: renderer}
    return universeElements
}