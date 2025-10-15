
export const createStandardMaterial = function (texture, repeats) {
    
  const floorTexture = textureloader.load(`textures/${texture}_diff_1k.jpg`);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(repeats, repeats);
    floorTexture.magFilter = THREE.NearestFilter;
    floorTexture.colorSpace = THREE.SRGBColorSpace;

    const floorTextureNormal = textureloader.load(`textures/${texture}_nor_gl_1k.jpg`);
    floorTextureNormal.wrapS = THREE.RepeatWrapping;
    floorTextureNormal.wrapT = THREE.RepeatWrapping;
    floorTextureNormal.repeat.set(repeats, repeats);
    floorTextureNormal.magFilter = THREE.NearestFilter;
    floorTextureNormal.colorSpace = THREE.SRGBColorSpace;

    const floorTextureARM = textureloader.load(`textures/${texture}_arm_1k.jpg`);
    floorTextureARM.wrapS = THREE.RepeatWrapping;
    floorTextureARM.wrapT = THREE.RepeatWrapping;
    floorTextureARM.repeat.set(repeats, repeats);
    floorTextureARM.magFilter = THREE.NearestFilter;
    floorTextureARM.colorSpace = THREE.LinearSRGBColorSpace;

    return new THREE.MeshStandardMaterial ({
        map: floorTexture,
        normalMap: floorTextureNormal,
        aoMap: floorTextureARM,          // R
        roughnessMap: floorTextureARM,   // G
        metalnessMap: floorTextureARM,   // B
        roughness: 1.0,       
        metalness: 1.0,      
    });
}