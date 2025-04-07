// 判断数据是否为空
export function isEmpty(obj, withZero = false) {
    if (obj == undefined) {
        return true
    }
    else if (typeof obj == "string") {
        return !obj
    }
    else if (typeof obj == "object") {
        if (obj instanceof Array)
            return obj.length == 0
        else
            return !obj
    } else if (typeof obj == "number") {
        if (withZero) {
            return obj == 0
        }
        return false
    }
}

export function assignMatchingProperties(objA, objB) {
    if (typeof objA !== "object" || typeof objB !== "object" || !objA || !objB) {
        console.error("参数必须是有效的对象");
        return;
    }

    // 遍历对象 B 的属性
    for (const key in objB) {
        // 如果对象 A 也有该属性，则赋值
        if (objA.hasOwnProperty(key)) {
            objB[key] = objA[key];
        }
    }
}

export function getFileType(file) {
    if (!(file instanceof File)) {
        throw new Error("参数必须是 File 对象");
    }

    // 1. 通过文件名获取扩展名
    const extension = file.name.includes('.') ? file.name.split('.').pop().toLowerCase() : null;

    // 2. 通过 MIME 类型映射常见文件后缀
    const mimeToExt = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "webp",
        "image/svg+xml": "svg",
        "image/bmp": "bmp",
        "image/tiff": "tiff",
        "image/x-icon": "ico",

        "video/mp4": "mp4",
        "video/webm": "webm",
        "video/ogg": "ogv",

        "audio/mpeg": "mp3",
        "audio/wav": "wav",
        "audio/ogg": "ogg",

        "application/pdf": "pdf",
        "application/msword": "doc",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
        "application/vnd.ms-excel": "xls",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
        "application/vnd.ms-powerpoint": "ppt",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",

        "text/plain": "txt",
        "text/html": "html",
        "text/css": "css",
        "application/javascript": "js",
        "application/json": "json",
        "application/zip": "zip",
        "application/x-rar-compressed": "rar",
    };

    const mimeType = file.type || "";
    const mimeExtension = mimeToExt[mimeType] || null;

    // 优先使用 MIME 类型识别，若 MIME 类型无法识别，则使用文件名后缀
    return mimeExtension || extension || "未知类型";
}