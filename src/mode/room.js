import * as THREE from 'three'

class Room{
    constructor(){
        this.el = null
        this.scene = null
        this.camera = null
        this.renderer = null
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
        this.camera.position.set(0, 45, 0); 
        this.camera.lookAt(0, 0, 0);

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.el.appendChild(this.renderer.domElement)

        // 渲染循环
        function animate() {
            requestAnimationFrame(animate);
            //controls.update(); // 更新控制器
            self.renderer.render(self.scene, self.camera);
        }
        animate();
    }
}

export default Room