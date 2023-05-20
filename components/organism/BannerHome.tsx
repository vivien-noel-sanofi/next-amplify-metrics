import React, { useEffect, useState } from 'react';
import styles from './BannerHome.module.scss';
import * as THREE from 'three';
import { setupUniverse } from '../../hooks/setup';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const BannerHome = () => {
    const [displayMesh, setDisplayMesh] = useState(false);

  useEffect(() => {
    const {scene, camera, renderer} = setupUniverse();
    let body;
    let mixer;

    // Control of the image
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enabled = false

    // Plane for shadow
    const geometry = new THREE.CircleGeometry( 4.5, 32 )
    geometry.rotateX( - Math.PI / 1.85 );

    const material = new THREE.ShadowMaterial();
    material.opacity = 0.2;

    const plane = new THREE.Mesh( geometry, material );
    plane.position.y = -1.9
    plane.position.z = -0.3
    plane.receiveShadow = true;
    scene.add( plane );

    // GLB image
    const loader = new GLTFLoader();
    loader.load( '/images/animatedTechFog.glb', function ( glt ) {
      body = glt.scene;
      mixer = new THREE.AnimationMixer( body );

      // Animations of Blender
      const clips = glt.animations;
      clips.forEach( function ( clip ) {
        clip.duration = 7;
        mixer.clipAction(clip).setEffectiveTimeScale ( 0.5 )
        mixer.clipAction( clip ).play();
      } );

      body.position.set(0, -2, -1)
      glt.scene.traverse(function (child) {
        child.castShadow = true;
      });

      scene.add(body)
      setDisplayMesh(true);
    });

    let smokeGroup = new THREE.Group();

scene.add(smokeGroup);

    // Light
    const pointLightLeft = new THREE.PointLight(0x285fd4, 0.8);
    const pointLightFront = new THREE.PointLight(0x2e456f, 0.6);
    const pointLightTop = new THREE.PointLight(0xecb7ff, 1);
    pointLightTop.position.set( 0, 6, -1 );
    pointLightFront.position.set( 10, 10, 50 );
    pointLightLeft.position.set( -50, 0, 5 );

    const light = new THREE.PointLight( 0x95bdff, 2 );
    light.position.set( 10, 1, -4 );
    pointLightTop.castShadow = true; // default false
    scene.add( light, pointLightLeft, pointLightFront, pointLightTop );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 800; // default
    light.shadow.mapSize.height = 800; // default
    light.shadow.camera.near = 3; // default
    light.shadow.camera.far = 2000; // default

    // Animation Loop
    function animate() {
      requestAnimationFrame(animate);
      mixer && mixer.update( 0.015 );
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.render(scene, camera);
    }

    animate();
  }, []);

  return (
    <div className={`${styles.background} ${displayMesh && styles.background_anim}`}>
        <div className={`${styles.canvas_wrapper} ${displayMesh && styles.canvas_anim}`}>
            <canvas id="bg" className={styles.canvas}></canvas>
        </div>
    </div>
    )
}