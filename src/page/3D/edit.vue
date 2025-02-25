<template>
    <div class="room-edit" id="room_edit"></div>
    <div class="room-edit-tools">
        <xmv-button @click="handleAddFloor">地板</xmv-button>
        <xmv-button @click="handleAddWall">墙体</xmv-button>
        <xmv-button @click="handleSave">保存</xmv-button>
        <xmv-button @click="handleLoad">加载</xmv-button>
    </div>
    <floor-panel-comp></floor-panel-comp>
    <wall-panel-comp></wall-panel-comp>
    <tfc-helper-comp></tfc-helper-comp>
</template>

<script>
import {defineComponent, onMounted ,provide,reactive ,ref} from 'vue'
import RoomMode from 'mode/room'
import {createEventBus} from 'util/event'
import floorPanelComp from 'comp/floorPanel.vue'
import wallPanelComp from 'comp/wallPanel.vue'
import tfcHelperComp from 'comp/tfcHelper.vue'
export default defineComponent({
    name:"",
    components:{floorPanelComp,wallPanelComp,tfcHelperComp},
    setup(props ,context) {

        const roomMode = new RoomMode()
        const eventBus = reactive({
            listeners : {}
        })
        const {$on ,$emit} = createEventBus(eventBus)
        roomMode.$on = $on
        roomMode.$emit = $emit

        const TFCModeRef = ref('translate')

        provide('roomMode' ,roomMode)

        const handleAddFloor = ()=>{
            roomMode.createFloor()
        }

        const handleAddWall = ()=>{
            roomMode.createWall()
        }

        const handleLoad = ()=>{
            roomMode.loadData()
        }

        const handleSave = ()=>{
            roomMode.saveData()
        }

        onMounted(()=>{
            roomMode.el = document.getElementById("room_edit")
            roomMode.initScene()
        })

        return {handleAddFloor,handleSave,handleLoad,handleAddWall}
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
