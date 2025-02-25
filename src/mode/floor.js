import * as THREE from 'three'
import { setMeshPostion,setMeshRotation,
        getObjectTransform,applyObjectTransformState,setMatColor } from 'util/biz'
import { assignMatchingProperties } from 'util/data'

class Floor{
    constructor(){
        this.width = 20
        this.height = 10
        this.repeatX = 2
        this.repeatY = 2
        this.mapRotation = 0
        this.matColor = 'rgba(255, 255, 255, 1)'
        this.type = 'floor'

        this.mesh = null
    }

    init(scene){
        const geometry = new THREE.PlaneGeometry(this.width, this.height)
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff});
        this.mesh = new THREE.Mesh(geometry, floorMaterial);
        this.mesh.xmType = this.type
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

    setSize(width,height){
        this.width = width
        this.height = height
        const newPlaneGeometry = new THREE.PlaneGeometry(width, height);
        this.mesh.geometry.dispose();
        this.mesh.geometry = newPlaneGeometry;
    }

    setMaterial(repeatX,repeatY,mapRotation){
        this.repeatX = repeatX
        this.repeatY = repeatY
        this.mapRotation = mapRotation
        if (this.mesh.material.map){
            this.mesh.material.map.repeat.set(repeatX, repeatY)
            this.mesh.material.map.rotation = parseFloat(mapRotation) * (Math.PI / 180);
            this.mesh.material.map.needsUpdate = true
        }
    }

    setPosition(positionStr){
        setMeshPostion(this.mesh,positionStr)
    }

    setRotation(meshStr){
        setMeshRotation(this.mesh,meshStr)
    }

    serialization(){
        let transState = getObjectTransform(this.mesh)
        let res = {
            position : transState.position,
            quaternion : transState.quaternion,
            scale : transState.scale,
            repeatX : this.repeatX,
            repeatY : this.repeatY,
            mapRotation : this.mapRotation,
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

export default Floor