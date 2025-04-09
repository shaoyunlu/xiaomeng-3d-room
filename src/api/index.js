import http from 'util/http'
/** 获取机房详情 */
export const getRoomDetail = async ()=>{
    let params = {
        pageNum : 0,
        pageSize : 10,
    }
    let res = await http.get('mroom/query',{params})
    return res.content[0]
}

/** 上传纹理 */
export const uploadTexture = async (file,metaData)=>{
    let formData = new FormData()
    formData.append('file',file)
    formData.append('metadata', 
                    new Blob([JSON.stringify(metaData)],{type:"application/json"}))
    await http.post("mroom/file/upload",formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

/** 删除纹理 */
export const deleteTexture = async (roomId ,fileName)=>{
    let formData = new FormData()
    formData.append('roomId' ,roomId)
    formData.append('fileName' ,fileName)
    await http.post("mroom/file/delete",formData)
}

/** 更新机房信息 */
export const updateRoom = async(roomData)=>{
    await http.post("mroom/update" ,roomData)
}