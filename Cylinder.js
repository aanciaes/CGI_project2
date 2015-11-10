var segments = 32;

var vertices = [];

var cylinderBotVertices=[];
var cylinderTopVertices=[];


var cylinderEdges = [];
var cylinderFaces = [];
var cylinderNormal = [];
var points = [];

var cylinderEdgesBuffer;
var cylinderFacesBuffer;
var cylinderPointsBuffer;
var cylinderNormalBuffer;



function cylinderInit(){
	cylinderBuild(segments);
	cylinderUpLoadData(gl);
}

function cylinderUpLoadData (gl){
//	cylinderVertexBuffer = gl.createBuffer();
//	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexBuffer);
//	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
//	
//	cylinderEdgesBuffer = gl.createBuffer();
//	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
//	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(cylinderEdges), gl.STATIC_DRAW);
}

function drawCylinder (gl, program){
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexBuffer);
    var vPosition=gl.getAttribLocation(program,"vPosition");
    gl.vertexAttribPointer(vPosition,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vPosition);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
    gl.drawElements(gl.LINES,cylinderEdges.length,gl.UNSIGNED_BYTE,0);
}

function cylinderBuild (sgments) {
	addPoints(segments);
	addFaces();
}

/**
 * Descobre os pontos dependendo do segments e adiciona ao vetor vertices
 * @param segments Numero de segmentos em que dividimos a base
 */
function addPoints(segments) {
	   var theta = (2*Math.PI / segments); //Degrees = radians * (180 / π)
	   

	   for (i =0;i<=segments;i++){
	       var x =  0.5*Math.cos(theta*i); 
	       var z =  0.5*Math.sin(theta*i);
	   
	       vertices.push(vec3(x,-0.5,z));	//Bottom Vertex
	       vertices.push(vec3(x,0.5,z));	//Top Vertex
	       
	       /****************************************************************
	        *                                                              *
	        * NAO SEI SE É PRECISO MAS ADICIONA-SE CASO SEJA PRECISO DEPOIS*
	        *                                                              *
	        ****************************************************************/
	       cylinderBotVertices(vec3(x,-0.5,z));
	       cylinderTopVertices(vec3(x,0.5,z));
	       
	      
	   }
}