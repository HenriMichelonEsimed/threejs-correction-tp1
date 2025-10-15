import * as THREE from 'three/webgpu'
import { Scene } from './scene'
import { Camera } from './camera'

export class Application {
    
    constructor() {
        this.renderer = new THREE.WebGPURenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        document.body.appendChild(this.renderer.domElement)

        this.camera = new Camera(this.renderer);

        this.scene = new Scene();
        this.scene.addCube();

        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    render() {
        this.renderer.render(this.scene.scene, this.camera.camera);
    }


}