import * as THREE from 'three'
import Floor from './floor'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class Room{
    constructor(){
        this.el = null
        this.scene = null
        this.camera = null
        this.renderer = null
        this.floor = null
        this.controls = null
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
        this.camera.position.set(30, 45, 0); 
        this.camera.lookAt(0, 0, 0);

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.el.appendChild(this.renderer.domElement)

        // 添加轨道控制器 (OrbitControls) 启用阻尼效果（惯性） 允许平移
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = false
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = true;

        // 调整窗口大小事件监听
        window.addEventListener('resize', () => {
            self.camera.aspect = window.innerWidth / window.innerHeight;
            self.camera.updateProjectionMatrix();
            self.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // 渲染循环
        function animate() {
            requestAnimationFrame(animate);
            self.controls.update(); // 更新控制器
            self.renderer.render(self.scene, self.camera);
        }
        animate();
    }

    createFloor(){
        this.floor = new Floor()
        this.floor.init(this.scene)
    }
}

export default Room