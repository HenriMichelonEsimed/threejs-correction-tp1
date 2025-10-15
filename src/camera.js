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

        this.direction = new THREE.Vector2(0,0)
        this.speed = 0.2
        window.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyW': this.direction.x = 1; break;
                case 'KeyS': this.direction.x = -1; break;
                case 'KeyA': this.direction.y = -1; break;
                case 'KeyD': this.direction.y = 1; break;
            }
        });

        window.addEventListener('keyup', (event) => {
            switch (event.code) {
                case 'KeyW':  
                case 'KeyS': this.direction.x = 0; break;
                case 'KeyA': 
                case 'KeyD': this.direction.y = 0; break;
            }
        });
    }

    process() {
        const forwardVector = new THREE.Vector3()
        this.camera.getWorldDirection(forwardVector)
        forwardVector.y = 0
        forwardVector.normalize()
        const rightVector = new THREE.Vector3()
        rightVector.crossVectors(forwardVector, this.camera.up).normalize()
        this.camera.position.addScaledVector(forwardVector, this.direction.x * this.speed)
        this.camera.position.addScaledVector(rightVector, this.direction.y * this.speed)
    }

    defaultPosition() {
        this.camera.position.set(0, 1.7, 10)
    }

}