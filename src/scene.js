import * as THREE from 'three/webgpu'
import { createStandardMaterial, loadGltf } from './tools'

export class Scene {

    constructor() {
        this.loadedObjects = {};
        this.scene = new THREE.Scene()
    }

    addDirectionalLight() {
        this.sun = new THREE.DirectionalLight(0xFFFFFF, 1.0)
        this.sun.position.set(-50, 100, 0)
        this.sun.target.position.set(0, 0, 0)
        this.scene.add(this.sun)
        this.sunHelper = new THREE.DirectionalLightHelper(this.sun);
        this.scene.add(this.sunHelper);
        return this.sunHelper;
    }

    addAmbiantLight() {
        const ambient = new THREE.AmbientLight(0xFFFFFF, .025)
        this.scene.add(ambient)
    }

    addGround(texture, repeats) {
        const planeSize = 5000
        const planeMatPBR = createStandardMaterial(texture, repeats)

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
        planeGeo.setAttribute('uv2', new THREE.BufferAttribute(planeGeo.attributes.uv.array, 2))

        const planeMesh = new THREE.Mesh(planeGeo, planeMatPBR)
        planeMesh.rotation.x = Math.PI * -.5
        planeMesh.receiveShadow = true

        this.scene.add(planeMesh)
    }

    addCube() {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshPhongMaterial({
            color: 0xFF0000,  
            flatShading: true,
        })
        const cube = new THREE.Mesh(geometry, material)
        cube.castShadow = true
        cube.position.y = 1.0
        this.scene.add(cube)
    }

    async loadScene(url) {
        let data = null
        const response = await fetch(url)
        data = await response.json()
        for (const obj of data.nodes) {
            if (this.loadedObjects[obj.name] == undefined) {
                this.loadedObjects[obj.name] = await loadGltf(obj.name)
            }
            let mesh = this.loadedObjects[obj.name].clone()
            mesh.position.fromArray(obj.position.split(',').map(Number))
            mesh.quaternion.fromArray(obj.rotation.split(',').map(Number))
            mesh.scale.fromArray(obj.scale.split(',').map(Number))
            this.scene.add(mesh)
        }
    }

}