<template>
    <xmv-dialog v-model="dialogModeFormVisible" title="添加机柜" width="500px" @close="handleClose">
        <xmv-form :mode="formMode" :rules="rules" label-width="100px" ref="dialogFormRef">
            <xmv-form-item label="名称" prop="cabinetName">
                <xmv-input v-model="formMode.cabinetName"></xmv-input>
            </xmv-form-item>
            <xmv-form-item label="U位高度" prop="uNum">
                <xmv-input v-model="formMode.uNum"></xmv-input>
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
        const dialogFormRef = ref(null)
        const formMode = reactive({
            cabinetName : '',
            uNum : ''
        })
        const rules = reactive({
            cabinetName : [{required : true}],
            uNum : [{required : true ,number:true}]
        })
        const handleClose = ()=>{
            roomMode.cabinetFormCompVisibleRef.value = false
        }
        const handleEnterDialogModeForm = ()=>{
            dialogFormRef.value.validate().then(()=>{
                let cabinetMode = roomMode.createCabinet(formMode)
                roomMode.stick(cabinetMode.group)
                roomMode.cabinetFormCompVisibleRef.value = false
            }).catch(msg =>{ 
                console.log(msg)
            })
        }
        return {dialogModeFormVisible,formMode,rules,dialogFormRef,
                handleEnterDialogModeForm,handleClose}
    }
})
</script>

<style lang="" scoped></style>
