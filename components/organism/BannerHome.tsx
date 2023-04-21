import React, { useEffect } from 'react';
import styles from './BannerHome.module.scss';
import * as THREE from 'three';
import { setupUniverse } from '../../hooks/setup';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const BannerHome = () => {
    useEffect(() => {
        const {scene, camera, renderer} = setupUniverse()

        let body;

        // Control of the image
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true

        // GLB image
        const loader = new GLTFLoader();

        loader.load( '/images/parrot.glb', function ( glt ) {
            body = glt.scene;
            body.position.set(0, -2, 0)

            scene.add(body)
        });

        // Light
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        pointLight.position.set(5, 3, 0);
        scene.add(pointLight, ambientLight);

        // Animation Loop
        function animate() {
        requestAnimationFrame(animate);
        body && (body.rotation.y += 0.005);
        renderer.render(scene, camera);
        }

        animate();
    }, []);

    return (
        <div className={styles.background}>
            <canvas id="bg"></canvas>
        </div>
    )
}