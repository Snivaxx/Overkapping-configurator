// 3D Configurator Script
let scene, camera, renderer, tuinhuis;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Licht en achtergrond
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);
    scene.background = new THREE.Color(0xbfd1e5);

    // Voeg standaard tuinhuis toe
    updateModel();

    camera.position.set(5, 5, 10);
    camera.lookAt(0, 0, 0);

    animate();
}

function updateModel() {
    if (tuinhuis) scene.remove(tuinhuis);

    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const height = parseFloat(document.getElementById('height').value);
    const materialType = document.getElementById('material').value;
    const roofType = document.getElementById('roofType').value;

    let materialColor = materialType === 'wood' ? 0x8B4513 : 0x999999;
    let material = new THREE.MeshStandardMaterial({ color: materialColor, roughness: 0.5 });

    let geometry = new THREE.BoxGeometry(length, height, width);
    tuinhuis = new THREE.Mesh(geometry, material);
    scene.add(tuinhuis);

    // Dak toevoegen
    let dak;
    if (roofType === 'gable') {
        dak = new THREE.ConeGeometry(Math.max(length, width) / 1.5, height / 2, 4);
    } else if (roofType === 'shed') {
        dak = new THREE.BoxGeometry(length, height / 4, width);
    } else {
        dak = new THREE.BoxGeometry(length, 0.1, width);
    }
    let dakMesh = new THREE.Mesh(dak, new THREE.MeshStandardMaterial({ color: 0x444444 }));
    dakMesh.position.y = height / 2 + height / 4;
    scene.add(dakMesh);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.onload = init;
