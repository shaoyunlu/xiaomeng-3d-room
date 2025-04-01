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
export const uploadTexture = async (roomId,metaData)=>{
    let formData = new FormData()
    formData.append('file',file)
    formData.append('metadata', 
                    new Blob([JSON.stringify(metaData)],{type:"application/json"}))
    const res = await http.post("mroom/upload",formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    console.log(res)
}