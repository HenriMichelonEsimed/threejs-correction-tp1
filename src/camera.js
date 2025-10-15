import * as THREE from 'three/webgpu'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'

export class Camera {
    
    constructor(renderer) {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.controls = new OrbitControls(this.camera, renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05
        this.controls.target.set(0, 1.7, 0)
        this.defaultPosition()
    }

    defaultPosition() {
        this.camera.position.set(0, 1.7, 10)
    }

}