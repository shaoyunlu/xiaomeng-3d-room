<template>
    <div class="room-edit" id="room_edit"></div>
    <div class="room-edit-tools">
        <xmv-button @click="handleAddFloor">地板</xmv-button>
    </div>
    <floor-panel-comp></floor-panel-comp>
</template>

<script>
import {defineComponent, onMounted ,provide,reactive} from 'vue'
import RoomMode from 'mode/room'
import {createEventBus} from 'util/event'
import floorPanelComp from 'comp/floorPanel.vue'
export default defineComponent({
    name:"",
    components:{floorPanelComp},
    setup(props ,context) {

        const roomMode = new RoomMode()
        const eventBus = reactive({
            listeners : {}
        })
        const {$on ,$emit} = createEventBus(eventBus)
        roomMode.$on = $on
        roomMode.$emit = $emit

        provide('roomMode' ,roomMode)

        const handleAddFloor = ()=>{
            roomMode.createFloor()
        }

        onMounted(()=>{
            roomMode.el = document.getElementById("room_edit")
            roomMode.initScene()
            roomMode.createFloor()
        })

        return {handleAddFloor}
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
