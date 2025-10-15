import * as THREE from 'three/webgpu'
import { Scene } from './scene'
import { UI } from './ui'
import { Camera } from './camera'

export class Application {
    
    constructor() {
        this.initParams();
        this.renderer = new THREE.WebGPURenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        document.body.appendChild(this.renderer.domElement)

        this.camera = new Camera(this.renderer, this.globalParams)

        this.scene = new Scene()        
        // this.scene.addCube()
        this.scene.addAmbiantLight()
        this.scene.addGround(this.groundParams.texture, this.groundParams.repeats)
        this.scene.addSkybox(this.skyboxParams.file)
        this.sunHelper = this.scene.addDirectionalLight()
        this.scene.loadScene('/scenes/scene_1.json')

        this.ui = new UI()
        this.ui.addGlobalUI(this.globalParams, this.camera.toogleControls.bind(this.camera))
        this.ui.addSelectionUI()
        this.ui.addSkyboxUI(this.skyboxFiles, this.skyboxParams, this.scene.addSkybox.bind(this.scene))
        this.ui.addGroundUI(this.groundTextures, this.groundParams, this.scene.changeGround.bind(this.scene))
        this.ui.addSunUI(this.scene.sun)

        this.selectedObject = null;
        this.selectedMesh = null;
        this.selectedMeshMaterial = null;
        this.renderer.domElement.addEventListener('click', (event) => {
            if (this.globalParams.useWASD) return;
            if (this.selectedObject != null) {
                this.selectedMesh.material = this.selectedMeshMaterial
                this.selectedObject = null;
            }
            const rect = this.renderer.domElement.getBoundingClientRect()
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            )
            const raycaster = new THREE.Raycaster()
            raycaster.setFromCamera(mouse, this.camera.camera)
            const intersects = raycaster.intersectObjects(this.scene.scene.children, true)
            const hit = intersects.find(i => i.object && i.object.userData && i.object.userData.isSelectable)
            if (hit) {
                this.selectedMesh = hit.object
                this.selectedObject = this.selectedMesh.userData.object
                this.selectedMeshMaterial = this.selectedMesh.material
                this.selectedMesh.material = new THREE.MeshStandardMaterial({ color: 0xffff00 })
                this.ui.updateSelectionUI(this.selectedObject)
            } else {
                this.ui.hideSelectionUI()
            }
        });

        this.moveSelectedObject = false
        window.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyG': this.moveSelectedObject = !this.moveSelectedObject; break
            }
        })
        document.addEventListener('mousemove', (event) => {
            if (this.moveSelectedObject && this.selectedObject != null) {
                const rect = this.renderer.domElement.getBoundingClientRect()
                const mouse = new THREE.Vector2(
                    ((event.clientX - rect.left) / rect.width) * 2 - 1,
                    -((event.clientY - rect.top) / rect.height) * 2 + 1
                )
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(mouse, this.camera.camera);
                const intersects = raycaster.intersectObject(this.scene.ground, true);
                if (intersects.length > 0) {
                    this.selectedObject.position.copy(intersects[0].point);
                    this.ui.updateSelectionUI(this.selectedObject)
g                }
            }
        });

        this.renderer.setAnimationLoop(this.render.bind(this))
    }

    initParams() {
        this.groundTextures = [
            'aerial_grass_rock',
            'brown_mud_leaves_01',
            'forrest_ground_01',
            'gravelly_sand',
            'forest_floor'
        ]
        this.groundParams = {
            texture: this.groundTextures[0],
            repeats: 750,
        }
        this.skyboxFiles = [
            'DaySkyHDRI019A_2K-TONEMAPPED.jpg',
            'DaySkyHDRI050A_2K-TONEMAPPED.jpg',
            'NightSkyHDRI009_2K-TONEMAPPED.jpg',
        ]
        this.skyboxParams = {
            file: this.skyboxFiles[0]
        }
        this.globalParams = {
            useWASD: false
        }
    }

    render() {
        this.camera.process(this.globalParams)
        this.sunHelper.update()
        this.renderer.render(this.scene.scene, this.camera.camera)
    }

}
