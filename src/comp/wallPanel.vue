<template>
    <div class="right-panel" v-show="panelShowRef">
        <span>墙体颜色</span>
        <br>
        <xmv-color-picker v-model="bgColorRef" show-alpha/>
        <br>
        <div>
            <xmv-button @click="handleStick">贴地</xmv-button>
            <xmv-button @click="handleUpdate">确认修改</xmv-button>
        </div>
    </div>
</template>

<script>
import {defineComponent, inject ,ref, watch} from 'vue'
import {getMeshBottomDistance,setMatColor} from 'util/biz'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const roomMode = inject('roomMode')
        const panelShowRef = ref(false)
        const widthRef = ref(0)
        const heightRef = ref(0)
        const depthRef = ref(0)
        var currentWall = null
        const bgColorRef = ref('rgba(0, 0, 0, 1)')

        const handleUpdate = ()=>{
            
        }

        const handleStick = ()=>{
            let distance = getMeshBottomDistance(currentWall.mesh,roomMode.gridHelper)
            currentWall.mesh.position.y -= distance;
        }

        watch(bgColorRef,val=>{
            setMatColor(currentWall.mesh,val)
        })

        roomMode.$on('MeshClick' ,(mesh)=>{
            panelShowRef.value = (mesh.xmType == 'wall')
            if (panelShowRef.value){
                currentWall = mesh.xmObj
            }
        })

        return {panelShowRef,bgColorRef,widthRef,heightRef,depthRef,
                handleUpdate,handleStick}
    }
})
</script>

<style lang="" scoped></style>
