<template>
    <div class="right-panel" v-show="panelShowRef">
        <div>
            <xmv-button @click="handleAddAsset">设置资产(测试)</xmv-button>
        </div>
    </div>
</template>

<script>
import {defineComponent, inject, ref} from 'vue'
import {getMeshBottomDistance,setMatColor} from 'util/biz'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const roomMode = inject('roomMode')
        const panelShowRef = ref(false)

        var currentCabinet = null

        const handleAddAsset = ()=>{
            currentCabinet.addAsset(1 ,3)
        }

        roomMode.$on('MeshClick' ,mesh=>{
            currentCabinet = mesh.xmObj
            panelShowRef.value = (mesh.xmType == 'cabinet')
            if (panelShowRef.value){
                // repeatXRef.value = currentFloor.repeatX
                // repeatYRef.value = currentFloor.repeatY
                // mapRotationRef.value = currentFloor.mapRotation
                // bgColorRef.value = currentFloor.matColor
            }
        })

        return {panelShowRef,handleAddAsset}
    }
})
</script>

<style lang="" scoped></style>
