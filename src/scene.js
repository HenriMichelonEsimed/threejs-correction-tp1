import * as THREE from 'three/webgpu'

export class Scene {

    constructor() {
        this.scene = new THREE.Scene()
    }

    createCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({
            color: 0xFF0000,  
            flatShading: true,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.position.y = 1.0;
        this.scene.add(cube);
    }
}