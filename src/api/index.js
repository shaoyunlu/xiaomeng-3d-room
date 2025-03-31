import http from 'util/http'
/** 获取机房详情 */
export const getRoomDetail = async ()=>{
    let params = {
        pageNum : 0,
        pageSize : 10,
    }
    let res = await http.get('mroom/query',{params})
    return res
}