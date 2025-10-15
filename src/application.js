import * as THREE from 'three/webgpu'
import { Scene } from './scene'

export class Application {
    
    constructor() {
        this.renderer = new THREE.WebGPURenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        document.body.appendChild(this.renderer.domElement)
        this.scene = new Scene();
        this.scene.createCube();
    }




}