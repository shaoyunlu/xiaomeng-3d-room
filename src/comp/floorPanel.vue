<template>
    <div class="right-panel" v-show="panelShowRef">
        <span>宽</span>
        <xmv-input v-model="widthRef"></xmv-input>
        <span>高</span>
        <xmv-input v-model="heightRef"></xmv-input>
        <span>RepeatX</span>
        <xmv-input v-model="repeatXRef"></xmv-input>
        <span>RepeatY</span>
        <xmv-input v-model="repeatYRef"></xmv-input>
        <xmv-button @click="handleUpdate">确认修改</xmv-button>
        <xmv-upload :file-list="fileListRef" @uploadDone="handleUploadDone">
            <xmv-button type="primary">上传纹理</xmv-button>
            <template #tip>
                <div class="xmv-upload__tip">
                </div>
            </template>
        </xmv-upload>
    </div>
</template>

<script>
import {defineComponent, inject ,ref} from 'vue'
import {removeMesh,getPositionByMesh} from 'util/biz'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const roomMode = inject('roomMode')
        const panelShowRef = ref(false)
        const widthRef = ref(0)
        const heightRef = ref(0)
        const repeatXRef = ref(0)
        const repeatYRef = ref(0)
        const fileListRef = ref([])

        let currentTt = new Object()
        let currentFloor = null

        const handleUpdate = ()=>{
            roomMode.transformControls.detach()
            let res = getPositionByMesh(currentFloor.mesh)
            removeMesh(roomMode.scene,currentFloor.mesh)
            currentFloor = roomMode.createFloor(
                                    widthRef.value ,
                                    heightRef.value,
                                    repeatXRef.value,
                                    repeatYRef.value,
                                    currentTt.obj
                                )
            currentFloor.setPosition(res)
        }

        const handleUploadDone = ()=>{
            currentTt = fileListRef.value[0]
            currentFloor.loadTexture(fileListRef.value[0].obj,()=>{
                fileListRef.value = []
            })
        }

        roomMode.$on('MeshClick' ,mesh=>{
            currentFloor = mesh.xmObj
            panelShowRef.value = (mesh.xmType == 'floor')
            if (panelShowRef.value){
                widthRef.value = currentFloor.width
                heightRef.value = currentFloor.height
                repeatXRef.value = currentFloor.repeatX
                repeatYRef.value = currentFloor.repeatY
            }
        })

        return {panelShowRef,widthRef,heightRef,fileListRef,
                repeatXRef,repeatYRef,
                handleUpdate,handleUploadDone}
    }
})
</script>

<style lang="" scoped></style>
