<template>
    <div class="room-show" id="room_show">

    </div>
</template>

<script>
import {defineComponent, onMounted} from 'vue'
import RoomMode from 'mode/room'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const roomMode = new RoomMode()

        onMounted(()=>{
            roomMode.el = document.getElementById("room_show")
            roomMode.initScene()
        })

        return {}
    }
})
</script>

<style lang="less">
    .room-show{
        width : 100%;
        height : 100%;
    }
</style>
