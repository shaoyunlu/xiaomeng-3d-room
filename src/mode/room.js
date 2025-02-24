import * as THREE from 'three'
import Floor from './floor'
import Wall from './wall'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

class Room{
    constructor(){
        this.el = null
        this.scene = null
        this.camera = null
        this.renderer = null
        this.controls = null
        this.transformControls = null
        this.$on = null
        this.$emit = null
        this.currentMesh = null
        this.isDragging = false
    }

    initScene(){
        const self = this
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xeeeeee);

        // 视角 长宽比 近端裁剪平面 远端裁剪平面
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )

        // 设置摄像机位置,朝向
        this.camera.position.set(0, 42, 33); 
        this.camera.lookAt(0, 0, 0);

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.el.appendChild(this.renderer.domElement)

        // 创建一个 GridHelper
        const size = 100; // 网格大小
        const divisions = 50; // 分割次数
        const gridHelper = new THREE.GridHelper(size, divisions);

        // 将 GridHelper 添加到场景中
        self.scene.add(gridHelper);

        // 添加轨道控制器 (OrbitControls) 启用阻尼效果（惯性） 允许平移
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = false
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = true;

        // 初始化 TransformControls
        this.transformControls = new TransformControls(self.camera, self.renderer.domElement);
        self.scene.add(this.transformControls.getHelper());

        this.transformControls.setTranslationSnap(0.5)
        this.transformControls.setRotationSnap(THREE.MathUtils.degToRad(15))
        this.transformControls.showX = true
        this.transformControls.showY = false
        this.transformControls.showZ = true

        // 添加 TransformControls 的事件监听，避免与 OrbitControls 冲突
        this.transformControls.addEventListener('dragging-changed', (event) => {
            self.isDragging = true
            self.controls.enabled = !event.value
            
        })

        // 调整窗口大小事件监听
        window.addEventListener('resize', () => {
            self.camera.aspect = window.innerWidth / window.innerHeight
            self.camera.updateProjectionMatrix()
            self.renderer.setSize(window.innerWidth, window.innerHeight)
        })

        window.addEventListener('mousedown',(event)=>{
            if (self.isDragging){
                return false
            }
            const raycaster = new THREE.Raycaster()
            const mouse = new THREE.Vector2(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1
            )
            raycaster.setFromCamera(mouse, self.camera);
            let meshList = self.scene.children.filter(tmp => tmp['xmType'] != undefined)

            const intersects = raycaster.intersectObjects(meshList);
            if (intersects.length > 0) {
                self.currentMesh = intersects[0].object
                self.$emit('MeshClick',intersects[0].object)
                self.transformControls.attach(intersects[0].object);
            }else{
                self.currentMesh = null
                //self.$emit('MeshClick','none')
                self.transformControls.detach();
            }
        })

        window.addEventListener('mouseup',(event)=>{
            self.isDragging = false
        })

        // 渲染循环
        function animate() {
            requestAnimationFrame(animate);
            self.controls.update(); // 更新控制器
            self.renderer.render(self.scene, self.camera);
            //console.log(self.camera)
            //const direction = new THREE.Vector3();
            //self.camera.getWorldDirection(direction);
            //const distance = self.camera.position.distanceTo(self.controls.target);
            //console.log(distance)
        }
        animate();
    }

    createFloor(){
        const floor = new Floor()
        floor.init(this.scene)
        return floor
    }

    createWall(){
        const wall = new Wall()
        wall.init(this.scene)
        return wall
    }
}

export default Room