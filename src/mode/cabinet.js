import * as THREE from 'three'

class Cabinet{
    constructor(){
        this.type = 'cabinet'
        this.width = 2
        this.height = 4
        this.depth = 2
        this.thickness = 0.1

        this.group
    }

    init(scene){
        const otherSideMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const frontSideMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        this.group = new THREE.Group();
        this.group.xmType = this.type
        this.group.xmObj = this

        const frontPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.width, this.height, this.thickness), frontSideMaterial);
        frontPanel.position.set(0, 0, this.depth / 2 + this.thickness / 2)
        this.group.add(frontPanel);

        const leftPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.thickness, this.height, this.depth), otherSideMaterial);
        leftPanel.position.set(-this.width / 2 - this.thickness / 2, 0, 0);
        this.group.add(leftPanel);

        // **右侧板**
        const rightPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.thickness, this.height, this.depth), otherSideMaterial);
        rightPanel.position.set(this.width / 2 + this.thickness / 2, 0, 0);
        this.group.add(rightPanel);

        // **顶部板**
        const topPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.width, this.thickness, this.depth), otherSideMaterial);
        topPanel.position.set(0, this.height / 2 + this.thickness / 2, 0);
        this.group.add(topPanel);

        // **底部板**
        const bottomPanel = new THREE.Mesh(new THREE.BoxGeometry(
                this.width, this.thickness, this.depth), otherSideMaterial);
        bottomPanel.position.set(0, -this.height / 2 - this.thickness / 2, 0);
        this.group.add(bottomPanel);

        scene.add(this.group);
    }

    serialization(){

    }

    deserialization(config){

    }
}

export default Cabinet