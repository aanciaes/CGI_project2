var segments = 32;

var cylinderBotVertices;
var cylinderTopVertices;

var cylinderEdges;

var cylinderEdgesBuffer = [];
var cylinderVertexBuffer = [];

function cylinderInit(){
	cylinderBuild(segments);
	cylinderUpLoadData(gl);
}

function cylinderUpLoadData (gl){
	cylinderVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
	
	cylinderEdgesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(cylinderEdges), gl.STATIC_DRAW);
}

function drawCylinder (gl, program){
	gl.bindBuffer(gl.ARRAY_BUFFER, cylinderVertexBuffer);
    var vPosition=gl.getAttribLocation(program,"vPosition");
    gl.vertexAttribPointer(vPosition,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vPosition);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
    gl.drawElements(gl.LINES,cylinderEdges.length,gl.UNSIGNED_BYTE,0);
}

function cylinderBuild(segments) {
	   var theta = (Math.PI / 180) * (360 / segments); //Degrees = radians * (180 / π)
	   

	   for (i =0;i<=segments;i++){
	       var x =  Math.cos(theta*i); 
	       var z =  Math.sin(theta*i);
	       
	       var offset = cylinderBotVertices.length;
	       
	       cylinderBotVertices.push(0,-0,5,0);
	       cylinderBotVertices.push(x, -0.5, z); //Bottomvertices
	       cylinderEdges.push(offset);
	       cylinderEdges.push(offset+1);
	       i+=1;
	       
	       x =  Math.cos(theta*i); 
	       z =  Math.sin(theta*i);
	      
	       cylinderBotVertices.push(x, -0.5, z); //Bottomvertices
	       cylinderEdges.push(offset+2);
	       cylinderEdges.push(offset);
	      
	      //cylinderSideVertices.push(x, y, z); //Sidevertices along the bottom 
	      //cylinderSideVertices.push(x, y+2, z); //Sidevertices along the top with y = 2
	     
	      //cylinderTopVertices.push(x, 0.5, z); //Topvertices with y = 2
	   }
}