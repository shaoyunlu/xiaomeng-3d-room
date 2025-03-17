<template>
    <xmv-dialog v-model="dialogModeFormVisible" title="添加机柜" width="500px" @close="handleClose">
        <xmv-form :mode="formMode" :rules="rules" label-width="100px" ref="dialogFormRef">
            <xmv-form-item label="名称" prop="cabinetName">
                <xmv-input v-model="formMode.cabinetName"></xmv-input>
            </xmv-form-item>
            <xmv-form-item label="U位高度" prop="uCount">
                <xmv-input v-model="formMode.uCount"></xmv-input>
            </xmv-form-item>
        </xmv-form>
        <template #footer>
            <span class="dialog-footer">
                <xmv-button @click="handleClose">取消</xmv-button>
                <xmv-button type="primary" @click="handleEnterDialogModeForm">
                    确认
                </xmv-button>
            </span>
        </template>
    </xmv-dialog>
</template>

<script>
import {defineComponent, reactive ,ref ,inject} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const roomMode = inject('roomMode')
        const dialogModeFormVisible = ref(true)
        const formMode = reactive({
            cabinetName : '',
            uCount : 0
        })
        const rules = reactive({
            cabinetName : [{required : true}],
            uCount : [{required : true ,number:true}]
        })
        const handleClose = ()=>{
            roomMode.cabinetFormCompVisibleRef.value = false
        }
        const handleEnterDialogModeForm = ()=>{

        }
        return {dialogModeFormVisible,formMode,rules,handleEnterDialogModeForm,handleClose}
    }
})
</script>

<style lang="" scoped></style>
