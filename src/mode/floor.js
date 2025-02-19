import * as THREE from 'three'

const width = 50
const height = 50

class Floor{
    constructor(){
        this.width = 0
        this.height = 0
        this.repeatX = 10
        this.repeatY = 10

        this.mesh = null
    }

    init(scene,__width=width,__height=height){
        if (this.mesh) {
            scene.remove(this.mesh);
        }
        this.width = __width
        this.height = __height
        const geometry = new THREE.PlaneGeometry(__width, __height)
        const textureLoader = new THREE.TextureLoader()
        const floorTexture = textureLoader.load('img/cizhuan.jpg')
        // 横向重复  纵向重复 重复次数
        floorTexture.wrapS = THREE.RepeatWrapping
        floorTexture.wrapT = THREE.RepeatWrapping
        floorTexture.repeat.set(this.repeatX, this.repeatY)
        //const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
        const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xc5a70f});
        const mesh = new THREE.Mesh(geometry, floorMaterial);
        mesh.xmType = 'floor'
        // 使地板平铺
        mesh.rotation.x = -Math.PI / 2
        scene.add(mesh)
    }

    loadTexture(file){
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
              };
              reader.readAsDataURL(file);
        }
    }
}

export default Floor