import {XmvLoading} from 'xiaomeng-ui'
import {XmvMessage} from 'xiaomeng-ui'
import {XmvMessageBox} from 'xiaomeng-ui'

let loading

export function loadingOpen (){
    loading = XmvLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.3)',
    })
}

export function loadingClose(){
    loading.close()
}

export function messageDialog(text='操作成功',type='success',duration){
    XmvMessage({
        message : text,
        type : type,
        duration : duration
    })
}

export function confirmDialog(msg,successCbf,failCbf){
    XmvMessageBox.confirm(msg).then(()=>{
        successCbf && successCbf()
    }).catch(()=>{
        failCbf && failCbf()
    })
}