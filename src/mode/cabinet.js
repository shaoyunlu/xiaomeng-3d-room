import * as THREE from 'three'

import { getObjectTransform,applyObjectTransformState,setMatColor } from 'util/biz'
import { assignMatchingProperties } from 'util/data'

const default_num = 42

class Cabinet{
    constructor(uNum = default_num){
        this.type = 'cabinet'
        this.width = 3
        this.height = 8.4
        this.depth = 3
        this.thickness = 0.2

        this.uNum = uNum

        this.sigleUWidth = this.width
        this.sigleUHeight = ((this.height - this.thickness * 2)/this.uNum).toFixed(2)
        this.sigleUDepth = this.depth

        this.group
    }

    init(scene){
        const otherSideMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const frontSideMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        const pinkSideMaterial = new THREE.MeshBasicMaterial({ color: 0xe26e62 });
        const yellowSideMaterial = new THREE.MeshBasicMaterial({ color: 0xceda1c });

        this.group = new THREE.Group();
        this.group.xmType = this.type
        this.group.xmObj = this

        const frontPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.width, this.height, this.thickness), frontSideMaterial);
        frontPanel.position.set(0, 0, this.depth / 2 - this.thickness / 2)
        //this.group.add(frontPanel);

        // **背板（黑色）**
        const backPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.width, this.height, this.thickness), pinkSideMaterial);
        backPanel.position.set(0, 0, -this.depth / 2 + this.thickness/2); // 放置在后面
        this.group.add(backPanel);

        // **左侧板**
        const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.thickness, this.height, this.depth), yellowSideMaterial);
        leftPanel.position.set(-this.width / 2 - this.thickness / 2, 0, 0);
        this.group.add(leftPanel);

        // **右侧板**
        const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.thickness, this.height, this.depth), yellowSideMaterial);
        rightPanel.position.set(this.width / 2 + this.thickness / 2, 0, 0);
        this.group.add(rightPanel);

        // **顶部板**
        const topPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.width + this.thickness * 2, this.thickness, this.depth), otherSideMaterial);
        topPanel.position.set(0, this.height / 2 + this.thickness / 2, 0);
        this.group.add(topPanel);

        // **底部板**
        const bottomPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.width + this.thickness * 2, this.thickness, this.depth), otherSideMaterial);
        bottomPanel.position.set(0, -this.height / 2 - this.thickness / 2, 0);
        this.group.add(bottomPanel);

        scene.add(this.group);
    }

    addAsset(startPos ,uCount){
        // 创建一个 asset
        const material = new THREE.MeshBasicMaterial({ color: 0x1fd63e });
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(
                this.sigleUWidth, this.sigleUHeight*uCount, this.sigleUDepth), material);
        mesh.position.set(0,0-this.height / 2 + this.sigleUHeight*uCount/2 ,0)
        this.group.add(mesh);
    }

    setName(){

    }

    serialization(){
        let transState = getObjectTransform(this.group)
        let res = {
            position : transState.position,
            quaternion : transState.quaternion,
            scale : transState.scale,
            type : this.type
        }
        return res
    }

    deserialization(config){
        assignMatchingProperties(config ,this)
        applyObjectTransformState(this.group,config)
    }
}

export default Cabinet