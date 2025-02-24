import * as THREE from 'three'

class Wall{
    constructor(){
        this.mesh = null
    }

    init(scene){
        const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
        const wallGeometry = new THREE.BoxGeometry(10, 3, 0.2);
        this.mesh = new THREE.Mesh(wallGeometry, wallMaterial);
        this.mesh.xmType = 'wall'
        scene.add(this.mesh);
    }
}

export default Wall
