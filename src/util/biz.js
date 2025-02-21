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