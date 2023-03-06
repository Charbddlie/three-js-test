// import * as THREE from 'three';
import * as THREE from "three";
import { TDSLoader } from 'three/addons/loaders/TDSLoader.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.x = 0;

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建光源
const light_up = new THREE.PointLight(0xffffff, 5, 100);
light_up.position.set(0, 10, 0);
scene.add(light_up);

// 创建光源
const light_front = new THREE.PointLight(0xffffff, 5, 100);
light_front.position.set(0, 0, 10);
scene.add(light_front);

// 创建光源
const light_back = new THREE.PointLight(0xffffff, 5, 100);
light_back.position.set(0, 0, -10);
scene.add(light_back);

// 创建光源
const light_inner = new THREE.PointLight(0xffffff, 5, 100);
light_inner.position.set(0, 0, 0);
scene.add(light_inner);

// 创建加载器
const gltfloader = new GLTFLoader();

// 加载模型
gltfloader.load('Rigged_UFO_gltf/Rigged_Modular UFO 2.8.glb.gltf', function (gltf) {

    // 获取模型对象
    const model = gltf.scene;

    // 更改模型的位置和缩放属性
    model.position.set(0, 0, 1);
    model.scale.set(2, 2, 2);
    // model.update();

    // 将模型添加到场景中
    scene.add(model);

}, undefined, function (error) {
    console.error(error);
});


// 渲染场景
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

function reset() {
    camera.position.z = 10;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.lookAt(0, 0, 0);
}
// 创建全局变量以存储按键状态
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    left: false,
    right: false,
    up: false,
    down: false,
    space: false,
    c: false,
};

// 监听键盘按下事件
window.addEventListener('keydown', function (event) {

    switch (event.key) {
        case 'w':
            keys.w = true;
            break;
        case 'a':
            keys.a = true;
            break;
        case 's':
            keys.s = true;
            break;
        case 'd':
            keys.d = true;
            break;
        case 'ArrowLeft':
            keys.left = true;
            break;
        case 'ArrowRight':
            keys.right = true;
            break;
        case 'ArrowUp':
            keys.up = true;
            break;
        case 'ArrowDown':
            keys.down = true;
            break;
        case ' ':
            keys.space = true;
            break;
        case 'c':
            keys.c = true;
            break;
        case 'r':
            reset();
            break;
        default:
            console.log(event)
            break;
    }

});

// 监听键盘松开事件
window.addEventListener('keyup', function (event) {
    // console.log(event)
    switch (event.key) {
        case 'w':
            keys.w = false;
            break;
        case 'a':
            keys.a = false;
            break;
        case 's':
            keys.s = false;
            break;
        case 'd':
            keys.d = false;
            break;
        case 'ArrowLeft':
            keys.left = false;
            break;
        case 'ArrowRight':
            keys.right = false;
            break;
        case 'ArrowUp':
            keys.up = false;
            break;
        case 'ArrowDown':
            keys.down = false;
            break;
        case ' ':
            keys.space = false;
            break;
        case 'c':
            keys.c = false;
            break;
        default:
            break;
    }
});

var prevTime = performance.now();
var time, deltaTime

var cameraDirection = new THREE.Vector3();
// console.log(cameraDirection)
const cameraUpVector = new THREE.Vector3(0, 1, 0); // 设置相机的上方向量
let cameraLeftVector = new THREE.Vector3();

// // 视角旋转要用
// let matrix = new THREE.Matrix4();


// 在每个帧上更新游戏状态
function update() {
    time = performance.now();
    deltaTime = time - prevTime;
    prevTime = time;

    //获取世界坐标系下的朝向
    camera.getWorldDirection(cameraDirection);
    // console.log(camera.up)

    cameraLeftVector.crossVectors(cameraUpVector, cameraDirection).normalize(); // 获得相机的左侧向量

    //这个不需要，上方是固定的
    // cameraUpVector.crossVectors(cameraDirection, cameraLeftVector).normalize(); // 获得相机的上方向量

    let moveSpeed = 0.05
    // 如果W键被按住
    if (keys.w) {
        // 向前移动对象
        // camera.position.z -= 0.01 * deltaTime;
        camera.position.add(cameraDirection.clone().multiplyScalar(moveSpeed))
    }

    // 如果A键被按住
    if (keys.a) {
        // 向左移动对象
        // camera.position.x -= 0.01 * deltaTime;
        // 将向量顺时针旋转90度
        // const leftVector = cameraDirection.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).normalize();
        camera.position.add(cameraLeftVector.clone().multiplyScalar(moveSpeed))
    }

    // 如果S键被按住
    if (keys.s) {
        // 向后移动对象
        // camera.position.z += 0.01 * deltaTime;
        camera.position.add(cameraDirection.clone().multiplyScalar(-moveSpeed))
    }

    // 如果D键被按住
    if (keys.d) {
        // 向右移动对象
        // camera.position.x += 0.01 * deltaTime;
        // 将向量逆时针旋转90度
        // const rightVector = cameraDirection.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2).normalize();
        camera.position.add(cameraLeftVector.clone().multiplyScalar(-moveSpeed))
    }

    // 定义旋转角度（弧度）
    // var angle = Math.PI * moveSpeed * deltaTime;



    if (keys.left) {
        // 视角左旋转
        // // 绕相机向上的向量旋转
        // matrix.makeRotationAxis(cameraUpVector, deltaTime * moveSpeed * -0.05);

        // // 应用旋转变换
        // camera.applyMatrix4(matrix);
        // const angle = cameraDirection.angleTo(cameraLeftVector);
        // if (angle < Math.PI) {
        // console.log(angle)
        // console.log(camera.position)
        console.log(cameraDirection)
        // rotation = moveSpeed > angle ? angle : moveSpeed;
        // const axis = new THREE.Vector3();
        // axis.crossVectors(cameraDirection, cameraUpVector).normalize();
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(cameraUpVector, moveSpeed * deltaTime * 0.05);
        const vectorC = cameraDirection.clone().applyQuaternion(quaternion).normalize();
        camera.lookAt(vectorC.add(camera.position))
        // }

    }

    if (keys.right) {
        // 视角右旋转
        // // 绕相机向上的向量旋转
        // matrix.makeRotationAxis(cameraUpVector, deltaTime * moveSpeed * 0.05);

        // // 应用旋转变换
        // camera.applyMatrix4(matrix);
        // const angle = cameraDirection.angleTo(cameraLeftVector);
        // if (angle < Math.PI) {
        // console.log(angle)
        // console.log(camera.position)
        console.log(cameraDirection)
        // rotation = moveSpeed > angle ? angle : moveSpeed;
        // const axis = new THREE.Vector3();
        // axis.crossVectors(cameraDirection, cameraUpVector).normalize();
        const quaternion = new THREE.Quaternion();
        quaternion.setFromAxisAngle(cameraUpVector, -moveSpeed * deltaTime * 0.05);
        const vectorC = cameraDirection.clone().applyQuaternion(quaternion).normalize();
        camera.lookAt(vectorC.add(camera.position))
        // }
    }

    if (keys.up) {
        // 仰视
        // // 绕相机向左的向量旋转
        // matrix.makeRotationAxis(cameraLeftVector, deltaTime * moveSpeed * -0.05);

        // // 应用旋转变换
        // camera.applyMatrix4(matrix);

        const angle = cameraDirection.angleTo(cameraUpVector);
        if (angle > 0) {
            console.log(angle)
            // rotation = moveSpeed > angle ? angle : moveSpeed;
            // const axis = new THREE.Vector3();
            // axis.crossVectors(cameraDirection, cameraUpVector).normalize();
            const quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(cameraLeftVector, -angle / 100);
            const vectorC = cameraDirection.clone().applyQuaternion(quaternion);
            camera.lookAt(vectorC.add(camera.position))
        }

    }

    if (keys.down) {
        // 俯视
        // // 绕相机向左的向量旋转
        // matrix.makeRotationAxis(cameraLeftVector, deltaTime * moveSpeed * 0.05);

        // // 应用旋转变换
        // camera.applyMatrix4(matrix);

        const angle = cameraDirection.angleTo(cameraUpVector);
        if (angle < Math.PI) {
            console.log(angle)
            // rotation = moveSpeed > angle ? angle : moveSpeed;
            // const axis = new THREE.Vector3();
            // axis.crossVectors(cameraDirection, cameraUpVector).normalize();
            const quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(cameraLeftVector, angle / 100);
            const vectorC = cameraDirection.clone().applyQuaternion(quaternion);
            camera.lookAt(vectorC.add(camera.position))
        }
    }

    if (keys.space) {
        console.log("jump")
        console.log(cameraUpVector)
        camera.position.add(cameraUpVector.clone().multiplyScalar(moveSpeed))
        console.log(camera.position)
    }

    if (keys.c) {
        console.log(cameraUpVector)
        camera.position.add(cameraUpVector.clone().multiplyScalar(-moveSpeed))
    }

    camera.updateProjectionMatrix();

    // 请求下一帧
    requestAnimationFrame(update);
}

update();
