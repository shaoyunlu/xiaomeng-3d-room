<template>
    <div class="room-edit" id="room_edit"></div>
    <div class="room-edit-tools">
        <xmv-button @click="handleAddFloor">地板</xmv-button>
        <xmv-button @click="handleAddWall">墙体</xmv-button>
        <xmv-button @click="handleAddCabinet">机柜</xmv-button>
        <xmv-button @click="handleSave">保存</xmv-button>
        <xmv-button @click="handleLoad">加载</xmv-button>
    </div>
    <floor-panel-comp></floor-panel-comp>
    <wall-panel-comp></wall-panel-comp>
    <cabinet-panel-comp></cabinet-panel-comp>
    <tfc-helper-comp></tfc-helper-comp>
    <cabinet-form-comp v-if="cabinetFormCompVisibleRef"></cabinet-form-comp>
</template>

<script>
import {defineComponent, onMounted ,provide,reactive ,ref} from 'vue'
import RoomMode from 'mode/room'
import floorPanelComp from 'comp/floorPanel.vue'
import wallPanelComp from 'comp/wallPanel.vue'
import cabinetPanelComp from 'comp/cabinetPanel.vue'
import tfcHelperComp from 'comp/tfcHelper.vue'
import cabinetFormComp from 'comp/cabinetForm.vue'
import {createEventBus} from 'util/event'
import {getRoomDetail} from 'api/index'
import {isEmpty} from 'util/data'
export default defineComponent({
    name:"",
    components:{floorPanelComp,wallPanelComp,tfcHelperComp,cabinetPanelComp,cabinetFormComp},
    setup(props ,context) {

        const roomMode = new RoomMode()
        const eventBus = reactive({
            listeners : {}
        })
        const {$on ,$emit} = createEventBus(eventBus)
        roomMode.$on = $on
        roomMode.$emit = $emit
        const cabinetFormCompVisibleRef = ref(false)

        provide('roomMode' ,roomMode)

        const handleAddFloor = ()=>{
            roomMode.createFloor()
        }

        const handleAddWall = ()=>{
            let wallMode = roomMode.createWall()
            roomMode.stick(wallMode.mesh)
        }

        const handleAddCabinet = ()=>{
            roomMode.cabinetFormCompVisibleRef.value = true
        }

        const handleLoad = ()=>{
            roomMode.loadData()
        }

        const handleSave = ()=>{
            roomMode.saveData()
        }

        onMounted(async ()=>{
            let res = await getRoomDetail()
            roomMode.id = res.id
            roomMode.name = res.name
            roomMode.el = document.getElementById("room_edit")
            roomMode.cabinetFormCompVisibleRef = cabinetFormCompVisibleRef
            roomMode.initScene()
            if (!isEmpty(res.mjson)){
                roomMode.loadData(res.mjson)
            }
            
        })

        return {cabinetFormCompVisibleRef,handleAddFloor,handleSave,handleLoad,handleAddWall,handleAddCabinet}
    }
})
</script>

<style lang="less">
    .room-edit{
        width : 100%;
        height : 100%;
    }
    .room-edit-tools{
        position: absolute;
        top : 0;
        left : 0;
    }
</style>
