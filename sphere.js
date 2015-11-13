/*Sphere.js*/

var sphereVertices=[];
var r=0.5;
var numPointsPerCirc=0;
var nlat = 20;
var nlong = 20;


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

function sphereAddPoints () {
	var d_phi = Math.PI/(nlat+1);
	var d_theta = (2*Math.PI)/nlong;
	
	sphereVertices.push(vec3(0,r,0));
	
	var x,y,z;
	for(phi=0;phi<=Math.PI;phi+=d_phi){
		for(theta=0;theta<=(2*Math.PI);theta+=d_theta){
			//alert("phi = " + phi + " theta = " + theta);
			x = r*Math.cos(phi)*Math.cos(theta);
			y = r*Math.sin(phi);
			z = r*Math.cos(phi)*Math.sin(theta);
			sphereVertices.push(vec3(x,y,z));
			//alert("x = " + x + " y = " + y + " z = " + z);
		}
	}
	sphereVertices.push(vec3(0,-r,0));
	//alert(sphereVertices);
}

function sphereAddFacesEdges () {

    for(i=1;i<sphereVertices.length;i++){
        sphere_points.push(sphereVertices[i]);
        //sphere_points.push(sphereVertices[i+1]);
        //sphere_points.push(sphereVertices[i+nlong*2]);
        
        
        sphere_edges.push(i);
        sphere_edges.push(i+1);
    }
}

