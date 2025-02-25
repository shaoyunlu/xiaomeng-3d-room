<template>
    <div class="tfc-helper">
        <xmv-radio-group v-model="radio">
            <xmv-radio label="translate">translate</xmv-radio>
            <xmv-radio label="rotate">rotate</xmv-radio>
            <xmv-radio label="scale">scale</xmv-radio>
        </xmv-radio-group>
        <xmv-checkbox-group v-model="group">
            <xmv-checkbox label="X" @check="handleCheck">X轴</xmv-checkbox>
            <xmv-checkbox label="Y" @check="handleCheck">Y轴</xmv-checkbox>
            <xmv-checkbox label="Z" @check="handleCheck">Z轴</xmv-checkbox>
        </xmv-checkbox-group>
    </div>
</template>

<script>
import {defineComponent, inject, ref, watch} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const radio = ref("translate")
        const group = ref(['X','Z'])
        const roomMode = inject('roomMode')

        watch(radio ,val=>{
            roomMode.transformControls.setMode(val);
            if (val == 'translate'){
                group.value = ['X','Z']
            }else if(val == 'rotate'){
                group.value = ['Y']
            }
            handleCheck()
        })

        const handleCheck = ()=>{
            roomMode.transformControls.showX = (group.value.indexOf('X') >=0)
            roomMode.transformControls.showY = (group.value.indexOf('Y') >=0)
            roomMode.transformControls.showZ = (group.value.indexOf('Z') >=0)
        }

        return {radio,group,handleCheck}
    }
})
</script>

<style lang="less">
    .tfc-helper{
        position: absolute;
        left : 10px;
        top : 50px;
    }
</style>
