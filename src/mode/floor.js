import * as THREE from 'three'
import { getObjectTransform,applyObjectTransformState,setMatColor } from 'util/biz'
import { assignMatchingProperties } from 'util/data'

class Floor{
    constructor(){
        this.id = ""
        this.width = 50
        this.height = 50
        this.repeatX = 2
        this.repeatY = 2
        this.mapRotation = 0
        this.matColor = 'rgba(255, 255, 255, 1)'
        this.type = 'floor'
        this.textureUrl = ''

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

    loadTextureFromServer(url, cbf) {
        const self = this
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                const texture = new THREE.TextureLoader().load(objectURL, () => {
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.set(self.repeatX, self.repeatY);
    
                    if (self.mesh) {
                        self.mesh.material.map = texture;
                        self.mesh.material.needsUpdate = true;
                    }
    
                    // 释放临时 URL，避免内存泄漏
                    URL.revokeObjectURL(objectURL);
    
                    cbf && cbf();
                });
            })
            .catch(error => console.error("加载纹理失败:", error));
    }

    loadTexture(file,cbf){
        const self = this
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

    setSize(width,height){
        this.width = width
        this.height = height
        const newPlaneGeometry = new THREE.PlaneGeometry(width, height);
        this.mesh.geometry.dispose();
        this.mesh.geometry = newPlaneGeometry;
    }

    setMaterialProp(repeatX,repeatY,mapRotation){
        this.repeatX = repeatX
        this.repeatY = repeatY
        this.mapRotation = mapRotation
        if (this.mesh.material.map){
            this.mesh.material.map.repeat.set(repeatX, repeatY)
            this.mesh.material.map.rotation = parseFloat(mapRotation) * (Math.PI / 180);
            this.mesh.material.map.needsUpdate = true
        }
    }

    serialization(){
        let transState = getObjectTransform(this.mesh)
        let res = {
            id : this.id,
            position : transState.position,
            quaternion : transState.quaternion,
            scale : transState.scale,
            repeatX : this.repeatX,
            repeatY : this.repeatY,
            mapRotation : this.mapRotation,
            matColor : this.matColor,
            type : this.type,
            textureUrl : this.textureUrl
        }
        return res
    }

    deserialization(config){
        assignMatchingProperties(config ,this)
        setMatColor(this.mesh,config.matColor)
        this.loadTextureFromServer(config.textureUrl ,null)
        applyObjectTransformState(this.mesh,config)
    }
}

export default Floor