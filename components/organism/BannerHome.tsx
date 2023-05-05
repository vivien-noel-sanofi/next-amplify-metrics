import React, { useEffect, useState } from 'react';
import styles from './BannerHome.module.scss';
import * as THREE from 'three';
import { setupUniverse } from '../../hooks/setup';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export const BannerHome = () => {

    useEffect(() => {
        const {scene, camera, renderer} = setupUniverse()
        let body;
        let mixer;

        // Control of the image
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enabled = false

        // GLB image
        const loader = new GLTFLoader();
        loader.load( '/images/animatedHumanTexture.glb', function ( glt ) {
            body = glt.scene;
            mixer = new THREE.AnimationMixer( body );
            const clips = glt.animations;
            clips.forEach( function ( clip ) {
                clip.duration = 10;
                mixer.clipAction( clip ).play();
            } );
                        
            body.position.set(0, -3, 0)
            scene.add(body)
        });

        // Light
        const pointLightRight = new THREE.PointLight(0xFFFFCC, 10);
        const pointLightLeft = new THREE.PointLight(0xFFE84E, 5);
        const pointLightFront = new THREE.PointLight(0x00FFFF, 1);
        pointLightFront.position.set( 10, 10, 50 );
        pointLightLeft.position.set( -50, 50, 0 );
        pointLightRight.position.set( 50, 70, 50 );
        const ambientLight = new THREE.AmbientLight(0xFFFFCC, 10);
        pointLightRight.position.set(5, 3, 0);
        scene.add(pointLightRight, pointLightLeft, pointLightFront, ambientLight);

        // LIghtning HDR
        function setLighting(){

            new RGBELoader()
                .setDataType( THREE.HalfFloatType )
                .load( '/images/resizedPaperBg.hdr', function ( texture ) {
                var envMap = pmremGenerator.fromEquirectangular( texture ).texture;
        
                scene.background = envMap;
                scene.environment = envMap;
        
                texture.dispose();
                pmremGenerator.dispose();
            })
            var pmremGenerator = new THREE.PMREMGenerator( renderer );
            pmremGenerator.compileEquirectangularShader();
        }

        // Animation Loop
        function animate() {
        requestAnimationFrame(animate);
        mixer && mixer.update( 0.015 )
        renderer.render(scene, camera);
        }

        animate();
        // setLighting();
    }, []);

    return (
        <div className={styles.background}>
            <canvas id="bg"></canvas>
        </div>
    )
}