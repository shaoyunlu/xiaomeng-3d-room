<template>
    <div class="right-panel" v-show="panelShowRef">
        <span>墙体颜色</span>
        <br>
        <xmv-color-picker v-model="bgColorRef" show-alpha/>
        <br>
        <xmv-select v-model="sideSelect">
            <xmv-option v-for="tmp in sideOption" :key="tmp.value" 
            :label="tmp.label" :value="tmp.value"></xmv-option>
        </xmv-select>
        <div>
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

        const sideSelect = ref("6")

        const sideOption = [
                                {value: '6',label: '全部'},
                                {value: '0',label: '右面'},
                                {value: '1',label: '左面'},
                                {value: '2',label: '上面'},
                                {value: '3',label: '下面'},
                                {value: '4',label: '前面'},
                                {value: '5',label: '后面'},
                            ]

        const handleUpdate = ()=>{
            
        }

        watch(bgColorRef,val=>{
            currentWall.matColor = val
            if (sideSelect.value != 6){
                setMatColor(currentWall.mesh,val,sideSelect.value)
            }else{
                setMatColor(currentWall.mesh,val,0)
                setMatColor(currentWall.mesh,val,1)
                setMatColor(currentWall.mesh,val,2)
                setMatColor(currentWall.mesh,val,3)
                setMatColor(currentWall.mesh,val,4)
                setMatColor(currentWall.mesh,val,5)
            }
        })

        roomMode.$on('MeshClick' ,(mesh)=>{
            panelShowRef.value = (mesh.xmType == 'wall')
            if (panelShowRef.value){
                currentWall = mesh.xmObj
                bgColorRef.value = currentWall.matColor
            }
        })

        return {panelShowRef,bgColorRef,widthRef,heightRef,depthRef,
                sideSelect,sideOption,
                handleUpdate}
    }
})
</script>

<style lang="" scoped></style>
