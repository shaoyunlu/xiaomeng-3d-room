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
    const box = new THREE.Box3().setFromObject(mesh);
    const meshBottomY = box.min.y;
    const gridY = gridHelper.position.y;
    return meshBottomY - gridY;
}

export function getObjectTransformState(obj) {
    if (!obj || !obj.isObject3D) {
      console.error("参数必须是 Three.js 的 Object3D 对象");
      return null;
    }
    return {
      position: obj.position.clone(),
      scale: obj.scale.clone(),
      rotation: obj.rotation.clone(),
      quaternion: obj.quaternion.clone()
    };
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

export function getOrbitControlsStateAsJson(controls) {
    // 获取状态对象
    const state = {
        cameraPosition: controls.object.position.toArray(),
        cameraQuaternion: controls.object.quaternion.toArray(),
        cameraZoom: controls.object.zoom,
        target: controls.target.toArray()
    };
    return JSON.stringify(state);
  }

  export function applyOrbitControlsStateFromJson(controls, jsonString) {
    // 将 JSON 字符串解析为状态对象
    const state = JSON.parse(jsonString)
    controls.object.position.fromArray(state.cameraPosition)
    controls.object.quaternion.fromArray(state.cameraQuaternion)
    controls.object.zoom = state.cameraZoom
    controls.object.updateProjectionMatrix()
    controls.target.fromArray(state.target)
    controls.update()
  }

  export function getObjectTransform(obj) {
    // 获取物体的偏移、旋转、缩放
    const state = {
      position: obj.position.toArray(),    // 偏移（位置）
      quaternion: obj.quaternion.toArray(), // 旋转（四元数）
      scale: obj.scale.toArray()           // 缩放
    };
  
    return state
  }

  export function applyObjectTransformState(obj, state) {
    // 还原物体的偏移、旋转、缩放
    obj.position.fromArray(state.position);    // 设置偏移（位置）
    obj.quaternion.fromArray(state.quaternion); // 设置旋转（四元数）
    obj.scale.fromArray(state.scale);          // 设置缩放
  }