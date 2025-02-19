<template>
    <div class="room-edit" id="room_edit"></div>
</template>

<script>
import {defineComponent, onMounted} from 'vue'
import RoomMode from 'mode/room'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const roomMode = new RoomMode()

        onMounted(()=>{
            roomMode.el = document.getElementById("room_edit")
            roomMode.initScene()
            //roomMode.createFloor()
        })

        return {}
    }
})
</script>

<style lang="less">
    .room-edit{
        width : 100%;
        height : 100%;
    }
</style>
