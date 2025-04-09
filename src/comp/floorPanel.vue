<template>
    <div class="right-panel" v-show="panelShowRef">
        <span>地板颜色</span>
        <br>
        <xmv-color-picker v-model="bgColorRef" show-alpha/>
        <br>
        <span>RepeatX</span>
        <xmv-input v-model="repeatXRef"></xmv-input>
        <span>RepeatY</span>
        <xmv-input v-model="repeatYRef"></xmv-input>
        <span>纹理方向</span>
        <xmv-input v-model="mapRotationRef"></xmv-input>
        <xmv-button @click="handleUpdate">确认修改</xmv-button>
        <xmv-upload :file-list="fileListRef" @uploadDone="handleUploadDone">
            <xmv-button type="primary">上传纹理</xmv-button>
            <template #tip>
                <div class="xmv-upload__tip">
                </div>
            </template>
        </xmv-upload>
        <xmv-button type="danger" @click="handleDelete">删除</xmv-button>
    </div>
</template>

<script>
import {defineComponent, inject ,ref ,watch} from 'vue'
import {uploadTexture,deleteTexture} from 'api/index'
import {setMatColor,removeMesh} from 'util/biz'
import {getFileType} from 'util/data'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const roomMode = inject('roomMode')
        const panelShowRef = ref(false)
        const repeatXRef = ref(0)
        const repeatYRef = ref(0)
        const mapRotationRef = ref(0)
        const bgColorRef = ref('rgba(255, 255, 255, 1)')
        const fileListRef = ref([])

        let currentTt = new Object()
        let currentFloor = null

        const handleUpdate = ()=>{
            roomMode.transformControls.detach()
            currentFloor.setMaterialProp(repeatXRef.value,repeatYRef.value,mapRotationRef.value)
        }

        const handleDelete = async ()=>{
            removeMesh(roomMode.scene,currentFloor.mesh)
        }

        /** 上传纹理到服务端 */
        const handleUploadDone = async ()=>{
            currentTt = fileListRef.value[0]
            let file = fileListRef.value[0].obj

            let fileType = getFileType(file)
            await uploadTexture(file ,{
                fileId : currentFloor.id,
                mroomId : roomMode.id,
                fileType : fileType
            })

            let fileUrl = global_base_url + roomMode.id + '/' + currentFloor.id + "." + fileType

            currentFloor.loadTextureFromServer(
                fileUrl + "?date=" + new Date().getTime(),
                ()=>{
                    fileListRef.value = []
                    currentFloor.textureUrl = fileUrl
                }
            )
        }

        watch(bgColorRef,val=>{
            currentFloor.matColor = val
            setMatColor(currentFloor.mesh,val)
        })

        roomMode.$on('MeshClick' ,mesh=>{
            currentFloor = mesh.xmObj
            panelShowRef.value = (mesh.xmType == 'floor')
            if (panelShowRef.value){
                repeatXRef.value = currentFloor.repeatX
                repeatYRef.value = currentFloor.repeatY
                mapRotationRef.value = currentFloor.mapRotation
                bgColorRef.value = currentFloor.matColor
            }
        })

        return {panelShowRef,fileListRef,
                repeatXRef,repeatYRef,mapRotationRef,
                bgColorRef,
                handleUpdate,handleUploadDone,handleDelete}
    }
})
</script>

<style lang="" scoped></style>
