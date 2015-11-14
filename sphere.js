/*Sphere.js*/

var sphereVertices=[];
var r=0.5;
var numPointsPerCirc=0;
var nlat = 30;   //horizontal
var nlong = 20; //vertical

var nHor = [];
var nVer = [];

var panico;


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
    
    /*sphere_faces_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_faces_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(sphere_faces), gl.STATIC_DRAW);*/
    
    sphere_edges_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_edges_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere_edges), gl.STATIC_DRAW);
}


function sphereDrawWireFrame(gl, program){
    gl.useProgram(program);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere_points_buffer);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
     
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_edges_buffer);
    gl.drawElements(gl.LINES, sphere_edges.length, gl.UNSIGNED_SHORT, 0);
}

function sphereAddPoints () {
	var d_phi = Math.PI/(nlat+1);
	var d_theta = (2*Math.PI)/nlong;
		
	var x,y,z;

   for(phi=-Math.PI;phi<=Math.PI;phi+=d_phi){
		for(theta=0;theta<=(2*Math.PI);theta+=d_theta){
			//alert("phi = " + phi + " theta = " + theta);
			x = r*Math.sin(phi)*Math.sin(theta);
			y = r*Math.cos(phi);
			z = r*Math.sin(phi)*Math.cos(theta);
            
			sphere_points.push(vec3(x,-y,z));
			//alert("x = " + x + " y = " + y + " z = " + z);
		}
	}


}

function sphereAddFacesEdges () {
    var i;
   
    for(i=0;i<sphere_points.length-1;i+=1){    
        sphere_edges.push(i);   
        sphere_edges.push(i+1);
    }
    //sphere_edges.push(i);
   for(var j = 1; j <nlong+1; j++)
        
    for(var k = j ; k < (nlong+j+1) * (nlat) ; k+=nlong+1){
        sphere_edges.push(k);        
        sphere_edges.push(k+nlong+1);
    }
    
    
    
}

