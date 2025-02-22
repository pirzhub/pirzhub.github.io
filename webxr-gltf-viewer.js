import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

let scene, camera, renderer, controller, reticle;

init();

function init() {
    // Set up the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Check for WebXR support
    if (navigator.xr) {
        // WebXR is supported, enable AR
        renderer.xr.enabled = true;
        document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));
    } else {
        // Fallback for non-WebXR browsers
        console.log("WebXR is not supported in this browser.");
        alert("WebXR is not supported in this browser. Please use Chrome or Edge for AR features.");
    }

    // Set up the scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
    scene.add(camera);

    // Add hemisphere light for better lighting
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    // Set up the controller (only for WebXR)
    if (navigator.xr) {
        controller = renderer.xr.getController(0);
        controller.addEventListener('select', onSelect);
        scene.add(controller);
    }

    // Create the reticle and file input
    createReticle();
    createFileInput();

    // Start the animation loop
    animate();
}

// Rest of the code remains the same...
