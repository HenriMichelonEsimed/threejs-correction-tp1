import * as THREE from 'three/webgpu'
import { Scene } from './scene'
import { Camera } from './camera'

export class Application {
    
    constructor() {
        this.initParams();
        this.renderer = new THREE.WebGPURenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        this.camera = new Camera(this.renderer);
        this.scene = new Scene();
        this.scene.addCube();
        this.scene.addAmbiantLight();
        this.scene.addGround(this.groundParams.texture, this.groundParams.repeats);
        this.scene.loadScene('/scenes/scene_1.json');
        this.sunHelper = this.scene.addDirectionalLight();
        this.renderer.setAnimationLoop(this.render.bind(this));
    }

    initParams() {
        this.groundTextures = [
            'aerial_grass_rock',
            'brown_mud_leaves_01',
            'forrest_ground_01',
            'gravelly_sand',
            'forest_floor'
        ];
        this.groundParams = {
            texture: this.groundTextures[0],
            repeats: 750,
        };    
    }

    render() {
        this.sunHelper.update();
        this.renderer.render(this.scene.scene, this.camera.camera);
    }

}