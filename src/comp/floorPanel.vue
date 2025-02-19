<template>
    <div class="right-panel" v-show="panelShowRef">
        123
    </div>
</template>

<script>
import {defineComponent, inject ,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const roomMode = inject('roomMode')
        const panelShowRef = ref(false)

        roomMode.$on('MeshClick' ,payLoad=>{
            panelShowRef.value = (payLoad == 'floor')
        })

        return {panelShowRef}
    }
})
</script>

<style lang="" scoped></style>
