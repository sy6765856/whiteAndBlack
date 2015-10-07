//初始化渲染器
var renderer = function() {
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.antialias = true;
    renderer.precision = 'highp';
    renderer.setClearColor(0xffffff,1);
//    renderer.shadowMap.enabled = true;
    return renderer;
}();
document.body.appendChild( renderer.domElement );

//初始化光源
var light = function() {
    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.z = 200;
    light.position.x = 0;
    light.position.y = 0;
    return light;
}();

//初始化相机
var cw = 3.5;
var camera = new THREE.OrthographicCamera(-cw, cw, cw/window.innerWidth*window.innerHeight, -cw/window.innerWidth*window.innerHeight, 0, 1000);
camera.position.z = 3;


var scene = new THREE.Scene();
scene.add(light).add(camera);
var boxesUD = function() {
    var boxes = [];
    var x=0.3, y=0.3, z=0.35;
    var w = 8, h = 8;
    var dx = 0.05, dy = 0.05;
    var geometryu = new THREE.BoxGeometry( x, dy, dy);
//    var materialu = new THREE.MeshLambertMaterial( { color: 0x000000 } );
//    var materialw = new THREE.MeshLambertMaterial( { color: 0xffffff, visible: false} );
    var materials = [];
    for (var i = 0; i < 6; ++i) {
        if(i == 2) {
            var color = {'color' : 0xffffff};
        } else {
            var color = {'color' : 0x000000};
        }
        materials.push(new THREE.MeshBasicMaterial(color));
    }
    var materialu = new THREE.MeshFaceMaterial(materials);
    for(var i= 0 ; i<w;i++) {
        for(var j = -1 ; j<h;j++) {
            var group = new THREE.Object3D();
            var cubed = new THREE.Mesh( geometryu, materialu );
//            var cubedw  = new THREE.Mesh(geometryu, materialw);
            cubed.position.set(x*(i-w/2) + i*dx, y*(j-h/2)+ j*dy + (y+dy)/2, -z/2);
//            cubed.position.z = -z/2;
//            cubedw.position.z = z/2;
//            group.add(cubed).add(cubedw);
//            group.position.set(x*(i-w/2) + i*dx, y*(j-h/2)+ j*dy + (y+dy)/2, 0);
            boxes.push(cubed);
        }
    }
    return boxes;
}();
var boxesLR = function() {
    var boxes = [];
    var x=0.3, y=0.3, z=0.35;
    var w = 8, h = 8;
    var dx = 0.05, dy = 0.05;
    var geometryu = new THREE.BoxGeometry( x, dy, dy);
    var materials = [];
    for (var i = 0; i < 6; ++i) {
        if(i == 2) {
           var color = {'color' : 0xffffff};
        } else {
            var color = {'color' : 0x000000};
        }
        materials.push(new THREE.MeshBasicMaterial(color));
    }
//    var materialu = new THREE.MeshLambertMaterial( { color: 0x000000 } );
    var materialu = new THREE.MeshFaceMaterial(materials);
//    var materialw = new THREE.MeshLambertMaterial( { color: 0xffffff, visible: false} );
    for(var i= -1 ; i<w;i++) {
        for(var j =0 ; j<h;j++) {
//            var group = new THREE.Object3D();
            var cubed = new THREE.Mesh( geometryu, materialu );
            cubed.position.set(x*(i-w/2) + i*dx + (x+dx)/2, y*(j-h/2)+ j*dy,0);
//            var cubedw  = new THREE.Mesh(geometryu, materialw);
//            cubed.position.z = -z/2;
//            cubedw.position.z = z/2;
//            group.add(cubed).add(cubedw);
//            group.position.set(x*(i-w/2) + i*dx + (x+dx)/2, y*(j-h/2)+ j*dy, 0);
            cubed.rotation.z += Math.acos(-1)/2;
            boxes.push(cubed);
        }
    }
    return boxes;
}();
var boxesMd = function() {
    var boxes = [];
    var x=0.3, y=0.3, z=0.35;
    var w = 8, h = 8;
    var dx = 0.05, dy = 0.05;
    var geometrym = new THREE.BoxGeometry( dx, dy, dx);
    var materials = [];
    for (var i = 0; i < 6; ++i) {
        if(i == 2) {
            var color = {'color' : 0xffffff};
        } else {
            var color = {'color' : 0x000000};
        }
        materials.push(new THREE.MeshBasicMaterial(color));
    }
//    var materialm = new THREE.MeshLambertMaterial( { color: 0x000000 } );
    var materialm = new THREE.MeshFaceMaterial(materials);
    for(var i= -1 ; i<w;i++) {
        for(var j = -1 ; j<h;j++) {
            var cubem = new THREE.Mesh( geometrym, materialm );
            cubem.position.set(x*(i-w/2) + i*dx + (x+dx)/2, y*(j-h/2)+ j*dy + (y+dy)/2,0);
            boxes.push(cubem);
        }
    }
    return boxes;
}();

for(var key in boxesUD) {
    scene.add(boxesUD[key]);
}
for(var key in boxesLR) {
    scene.add(boxesLR[key]);
}
for(var key in boxesMd) {
    scene.add(boxesMd[key]);
}
var createObjUDs = function() {
    var boxes = [];
    var x=0.3, y=0.3, z=0.35;
    var w = 8, h = 8;
    var dx = 0.05, dy = 0.05;
    var geometry = new THREE.Geometry();
    // 设置顶点位置
    // 顶部3顶点
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, y, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -z));
    // 底部3顶点
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, y, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -z));
    // 设置顶点连接情况
    // 顶面
    geometry.faces.push(new THREE.Face3(0,1,2));
    geometry.faces.push(new THREE.Face3(3,4,5));
    geometry.faces.push(new THREE.Face3(0,1,4));
    geometry.faces.push(new THREE.Face4(4,3,0));
    geometry.faces.push(new THREE.Face3(1,2,5));
    geometry.faces.push(new THREE.Face3(5,4,1));
    geometry.faces.push(new THREE.Face3(2,0,3));
    geometry.faces.push(new THREE.Face3(3,5,2));
    var materialde = new THREE.MeshLambertMaterial( { color: 0x000000, side:THREE.DoubleSide} );
//    var geometryu = new THREE.BoxGeometry( dx, y, dx);
//    var materialu = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    for(var i= 0 ; i<w;i++) {
        for(var j = 0 ; j<h;j++) {
//            var group = new THREE.Object3D();
//            var cubew = new THREE.Mesh(geometryu, materialu);
            var cube = new THREE.Mesh( geometry, materialde );
//            cubew.position.z = cube.position.z+dx;
//            cubew.position.y = cube.position.y+y/2;
//            group.add(cubew).add(cube);
//            group.position.set(x*(i-w/2) + i*dx + (x+dx)/2 - dx/2 - x , y*(j-h/2)+ j*dy + y/2, 0);
//            group.rotation.z += Math.acos(-1)/2;
//            group.rotation.y += Math.acos(-1);
            cube.position.set(x*(i-w/2) + i*dx - x/2, y*(j-h/2)+ j*dy - dy/2+ (y+dy)/2, 0);
            cube.rotation.z += Math.acos(-1)/2;
            cube.rotation.y += Math.acos(-1);
            boxes.push(cube);
        }
    }
    return boxes;
}();
var createObjLRs = function() {
    var boxes = [];
    var x=0.3, y=0.3, z=0.35;
    var w = 8, h = 8;
    var dx = 0.05, dy = 0.05;
    var geometry = new THREE.Geometry();
    // 设置顶点位置
    // 顶部3顶点
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, y, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -z));
    // 底部3顶点
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, y, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, -z));
    // 设置顶点连接情况
    // 顶面
    geometry.faces.push(new THREE.Face3(0,1,2));
    geometry.faces.push(new THREE.Face3(3,4,5));
    geometry.faces.push(new THREE.Face3(0,1,4));
    geometry.faces.push(new THREE.Face4(4,3,0));
    geometry.faces.push(new THREE.Face3(1,2,5));
    geometry.faces.push(new THREE.Face3(5,4,1));
    geometry.faces.push(new THREE.Face3(2,0,3));
    geometry.faces.push(new THREE.Face3(3,5,2));
    var materialde = new THREE.MeshLambertMaterial( { color: 0x000000, side:THREE.DoubleSide} );
//    var geometryu = new THREE.BoxGeometry( dx, y, dx);
//    var materialu = new THREE.MeshLambertMaterial( { color: 0xffffff } );
    for(var i= 0 ; i<w;i++) {
            for(var j = 0 ; j<h;j++) {
//                var group = new THREE.Object3D();
//                var cubew = new THREE.Mesh(geometryu, materialu);
                var cube = new THREE.Mesh( geometry, materialde );
//                cubew.position.z = cube.position.z+dx;
//                cubew.position.y = cube.position.y+y/2;
//                group.add(cubew).add(cube);
//                group.rotation.y += Math.acos(-1);
//                group.position.set(x*(i-w/2) + i*dx + 5*(x)/8 , y*(j-h/2)+ j*dy - y/2, 0);
                cube.position.set(x*(i-w/2) + i*dx + (x)/2, y*(j-h/2)+ j*dy - y/2, 0);
//                group.rotation.x += Math.acos(-1)*2;
                boxes.push(cube);
        }
    }
    return boxes;
}();
for(var key in createObjUDs) {
    scene.add(createObjUDs[key]);
}
for(var key in createObjLRs) {
    scene.add(createObjLRs[key]);
}
//step = Math.acos(-1) / 60;
step = 1.0471975511965979 / 15;
step1 = Math.acos(-1) / 30;
var onU = 0,
    onL = 0,
    onR = 0,
    onD = 0,
    onM = 0;
var render = function () {
    requestAnimationFrame( render);

    for(var key in boxesUD) {
        var box = boxesUD[key];
        if(onD) {
            box.rotation.x += step1;
        }
    }onD=0;

    for(var key in boxesLR) {
        var box = boxesLR[key];
        if(onR) {
            box.rotation.y += step1;
        }
    }onR = 0;

    for(var key in boxesMd) {
        var box = boxesMd[key];
        if(onM) {
            box.rotation.x += step1;
        }
    }onM = 0;

    for(var key in createObjLRs) {
        var box = createObjLRs[key];
        if(onL) {
            box.rotation.y += step;
            console.log(box.rotation.y);
        }
    }onL = 0;

    for(var key in createObjUDs) {
        var box = createObjUDs[key];
        if(onU) {
            box.rotation.x += step;
        }
    }onU = 0;

    renderer.render(scene, camera);
};
render();

index = 0;
$('.on').click(function() {
    $('.step').text('step:' + (index+1));
    if(index==15) {
        alert('You have done great work, Congratulations!');
        return;
    }
    onU=1;
    onL=1;
    onR=1;
    onD=1;
    onM=1;
    index ++;
});

