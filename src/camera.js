import * as THREE from 'three/webgpu'

export class Camera {
    
    constructor() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    }

    

}