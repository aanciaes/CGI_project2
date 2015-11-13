/*Sphere.js*/

var sphereVertices=[];
var rad=0.5;
var numPointsPerCirc;
var degrees = 20;

var sphere_points=[];
var sphere_edges=[];
var sphere_faces=[];
var sphere_normals=[];

var sphere_points_buffer;
var sphere_edges_buffer;
var sphere_faces_buffer;

function sphereInit(){
    sphereBuild();
    sphereUpLoadData(gl);
}

function sphereBuild(){
    sphereAddPoints();
    sphereAddFacesEdges();
}

function sphereUpLoadData(gl){
    sphere_points_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere_points_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sphere_points), gl.STATIC_DRAW);
    
    sphere_faces_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_faces_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(sphere_faces), gl.STATIC_DRAW);
    
    sphere_edges_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_edges_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(sphere_edges), gl.STATIC_DRAW);
}


function sphereDrawWireFrame(gl, program){
    gl.useProgram(program);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere_points_buffer);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
     
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_edges_buffer);
    gl.drawElements(gl.LINES, sphere_edges.length, gl.UNSIGNED_BYTE, 0);
}

function sphereAddPoints2() {
    
    var theta=0;
    var phi=0;
    var x=0, y=0, z=0;
    
    for(theta; theta<(2*Math.PI);theta+=radians(degrees)){
        for(phi; phi<(2*Math.PI);phi+=radians(degrees)){
            alert("theta = "+ theta + " phi = " + phi);
            x=rad*Math.cos(theta)*Math.sin(phi);
            y=rad*Math.sin(theta)*Math.sin(phi);
            z=rad*Math.cos(phi);
            sphereVertices.push(vec3(x,y,z));
            alert("x= " +x + " y = " + y + " z = " + z);
        }
        phi=0;
        if(theta==0)
            numPointsPerCirc=sphereVertices.length;
        //alert("theta = " +theta)
    }
    alert("Sphere with points =" + sphereVertices.length);
}

function sphereAddPoints () {
    var r =0.1;
    var x = 0, y=0.4, z=0;
    
    
    sphereVertices.push(vec3(0,0.5,0));
    
    for(r;r<=0.5;r+=0.1){
        for(theta = 0;theta<(6*Math.PI);theta+=radians(20)){
            x=r*Math.cos(theta);
            z=r*Math.sin(theta);
            sphereVertices.push(vec3(x,y,z));
           // alert("x= " +x + " y = " + y + " z = " + z);        
        }
        y-=0.01;
        if(r==0.1)
            numPointsPerCirc=sphereVertices.length-1;
    }
    //alert(sphereVertices.length + " " + numPointsPerCirc);
    
}

function sphereAddFacesEdges () {
    
    var offset=1;
    
    for(i=0;i<numPointsPerCirc;i++){
        sphere_points.push(sphereVertices[0]);
        sphere_points.push(sphereVertices[i]);
        sphere_points.push(sphereVertices[i+1]);
        
        sphere_edges.push(0);
        sphere_edges.push(i);
        
        sphere_edges.push(i);
        sphere_edges.push(i+1);
        
        sphere_edges.push(0);
        sphere_edges.push(i+1);
        
        
        sphere_faces.push(0);
        sphere_faces.push(i);
        sphere_faces.push(i+1);
    }
    
    for(q=0;q<numPointsPerCirc*3;q++){
        sphere_points.push(sphereVertices[offset]);
        sphere_points.push(sphereVertices[offset+numPointsPerCirc+20]);
        sphere_points.push(sphereVertices[offset+numPointsPerCirc+1+20]);
        sphere_points.push(sphereVertices[offset+1]);
        
        sphere_edges.push(offset);
        sphere_edges.push(offset+numPointsPerCirc+20);
        
        sphere_edges.push(offset);
        sphere_edges.push(offset+1);
        
        sphere_faces.push(offset);
        sphere_faces.push(offset+numPointsPerCirc+20);
        sphere_faces.push(offset+1);
        
        sphere_faces.push(offset+1);
        sphere_faces.push(offset+1+numPointsPerCirc+20);
        sphere_faces.push(offset+numPointsPerCirc+20);
        offset++;
    }
}

