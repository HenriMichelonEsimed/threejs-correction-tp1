import * as THREE from 'three/webgpu'

export class Scene {

    constructor() {
        this.scene = new THREE.Scene()
        this.ambiantLight()
    }

    ambiantLight() {
        const ambient = new THREE.AmbientLight(0xFFFFFF, .5);
        this.scene.add(ambient);
    }

    addCube() {
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