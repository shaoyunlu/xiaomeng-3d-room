import * as THREE from 'three'

export function removeMesh(scene ,meshToRemove){
    scene.remove(meshToRemove);
    // 如果你需要确保该 mesh 已经被完全清理并且不再占用内存，则还需要调用 dispose()
    if (meshToRemove.geometry !== undefined && !Array.isArray(meshToRemove.geometry)) {
        meshToRemove.geometry.dispose();
    }
    if (meshToRemove.material.isMaterial) {
        meshToRemove.material.dispose();
    } else if (Array.isArray(meshToRemove.material)) {
        for (let i = 0; i < meshToRemove.material.length; ++i) {
            meshToRemove.material[i].dispose();
        }
    }
    meshToRemove = null;
}

export function getPositionByMesh(object){
    return [object.position.x, object.position.y, object.position.z].join(",")
}

export function setMeshPostion(mesh,positionStr){
    let positionArray = positionStr.split(",")
    mesh.position.set(parseFloat(positionArray[0]),
                        parseFloat(positionArray[1]),
                        parseFloat(positionArray[2]));
}

export function getRotationByMesh(mesh) {
    if (!mesh || !mesh.rotation) {
        console.warn("Invalid mesh object");
        return null;
    }
    return [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z].join(",")
}

export function setMeshRotation(mesh, rotationStr) {
    let rotationArray = rotationStr.split(",")
    mesh.rotation.set(parseFloat(rotationArray[0]),
                        parseFloat(rotationArray[1]),
                        parseFloat(rotationArray[2]));
}

export function getMeshBottomDistance(mesh, gridHelper) {
    // 计算 mesh 的包围盒（bounding box）
    const box = new THREE.Box3().setFromObject(mesh);
    // 获取 mesh 最低点的 Y 坐标
    const meshBottomY = box.min.y;
    // GridHelper 的 Y 坐标（默认在 Y=0）
    const gridY = gridHelper.position.y;
    // 计算距离
    return meshBottomY - gridY;
}

export function getObjectTransformState(obj) {
    if (!obj || !obj.isObject3D) {
      console.error("参数必须是 Three.js 的 Object3D 对象");
      return null;
    }
  
    // 返回深拷贝的变换数据
    return {
      position: obj.position.clone(),
      scale: obj.scale.clone(),
      rotation: obj.rotation.clone(),
      quaternion: obj.quaternion.clone()
    };
}

export function applyObjectTransformState(obj, state) {
    if (!obj || !obj.isObject3D || !state) {
      console.error("参数无效：obj 必须是 Object3D，state 必须是有效的变换状态");
      return;
    }
  
    // 应用变换状态 位置 缩放 四元数设置旋转
    obj.position.copy(state.position);
    obj.scale.copy(state.scale);
    obj.quaternion.copy(state.quaternion);
}

export function setMatColor(mesh,rgbaString){
    const match = rgbaString.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,?\s*([\d.]*)?\s*\)/);
    const r = parseInt(match[1]) / 255;
    const g = parseInt(match[2]) / 255;
    const b = parseInt(match[3]) / 255;
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;

    mesh.material = mesh.material.clone();
    mesh.material.color.setRGB(r, g, b);
    mesh.material.transparent = a < 1
    mesh.material.opacity = a;
    mesh.material.needsUpdate = true
}