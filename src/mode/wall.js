import * as THREE from 'three'

import { setMeshPostion,setMeshRotation,
            getObjectTransform,applyObjectTransformState,setMatColor } from 'util/biz'
import { assignMatchingProperties } from 'util/data'

class Wall{
    constructor(){
        this.width = 10
        this.height = 3
        this.depth = 1

        this.matColor = 'rgba(255, 255, 255, 1)'
        this.type = 'wall'

        this.mesh = null
    }

    init(scene){
        const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const wallGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
        this.mesh = new THREE.Mesh(wallGeometry, wallMaterial)
        this.mesh.xmType = 'wall'
        this.mesh.xmObj = this
        scene.add(this.mesh)
    }

    serialization(){
        let transState = getObjectTransform(this.mesh)
        let res = {
            position : transState.position,
            quaternion : transState.quaternion,
            scale : transState.scale,
            matColor : this.matColor,
            type : this.type
        }
        return res
    }

    deserialization(config){
        assignMatchingProperties(config ,this)
        setMatColor(this.mesh,config.matColor)
        applyObjectTransformState(this.mesh,config)
    }
}

export default Wall
