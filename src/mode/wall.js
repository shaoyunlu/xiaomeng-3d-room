import * as THREE from 'three'

class Wall{
    constructor(){
        this.width = 10
        this.height = 3
        this.depth = 1

        this.mesh = null
    }

    init(scene){
        const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
        const wallGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
        this.mesh = new THREE.Mesh(wallGeometry, wallMaterial)
        this.mesh.xmType = 'wall'
        this.mesh.xmObj = this
        scene.add(this.mesh)
    }
}

export default Wall
