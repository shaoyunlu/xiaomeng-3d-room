import * as THREE from 'three'
import { setMeshPostion } from 'util/biz'

const width = 20
const height = 10
const repeatX = 2
const repeatY = 2

class Floor{
    constructor(){
        this.width = 0
        this.height = 0
        this.repeatX = 0
        this.repeatY = 0

        this.mesh = null
    }

    init(scene,__width=width,__height=height,__repeatX=repeatX,__repeatY=repeatY){
        this.width = __width
        this.height = __height
        this.repeatX = __repeatX
        this.repeatY = __repeatY
        const geometry = new THREE.PlaneGeometry(__width, __height)
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xc5a70f});
        this.mesh = new THREE.Mesh(geometry, floorMaterial);
        this.mesh.xmType = 'floor'
        // 使地板平铺
        this.mesh.rotation.x = -Math.PI / 2
        this.mesh.xmObj = this
        scene.add(this.mesh)
    }

    loadTexture(file,cbf){
        const self = this
        if (typeof str === 'string'){

        }else{
            const reader = new FileReader();
            reader.onload = (e) => {
                const texture = new THREE.TextureLoader().load(e.target.result);
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(self.repeatX, self.repeatY)
                if (self.mesh) {
                    self.mesh.material.map = texture;
                    self.mesh.material.needsUpdate = true;
                }
                cbf && cbf()
              };
              reader.readAsDataURL(file);
        }
    }

    setPosition(positionStr){
        setMeshPostion(this.mesh,positionStr)
    }
}

export default Floor