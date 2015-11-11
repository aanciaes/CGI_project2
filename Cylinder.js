var segments = 32;

var vertices = [];


var cylinderBotVertices=[];
var cylinderTopVertices=[];


var cylinderEdges = [];
var cylinderFaces = [];
var cylinderNormal = [];
var cylinderPoints = [];

var cylinderEdgesBuffer;
var cylinderFacesBuffer;
var cylinderPointsBuffer;
var cylinderNormalBuffer;



function cylinderInit(){
	cylinderBuild(segments);
	cylinderUpLoadData(gl);
}

function cylinderUpLoadData (gl){
    cylinderPointsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderPointsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    cylinderFacesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderFacesBufferuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(cylinderFaces), gl.STATIC_DRAW);
    
    cylinderEdgesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(cylinderEdges), gl.STATIC_DRAW);
}

function drawCylinder (gl, program){    
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderPointsBuffer);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
    gl.drawElements(gl.LINES,cylinderEdges.length,gl.UNSIGNED_BYTE,0);
}

function cylinderBuild (sgments) {
	addPoints(segments);
	addFacesEdges();
}

function addFacesEdges (){
    var lastPointUsedTop = [2];
    var lastPointUsedBot = [3];
    
    for(i=0;i<segments-1;i++){
        var lastTop = lastPointUsedTop.pop();
        var lastBot = lastPointUsedBot.pop();

        cylinderPoints.push(vertices[lastTop]);
        cylinderPoints.push(vertices[lastTop+2]);
        cylinderPoints.push(vertices[lastBot]);
        cylinderPoints.push(vertices[lastBot+2]);
        
        
        //start top triangle
        cylinderEdges.push(0);
        cylinderEdges.push(lastTop);
        
        cylinderEdges.push(lastTop);
        cylinderEdges.push(lastTop+2);
        
        cylinderEdges.push(lastTop+2);
        cylinderEdges.push(0);
        
        cylinderFaces.push(0);
        cylinderFaces.push(lastTop);
        cylinderFaces.push(lastTop+2);
        //end top triangle
        
        //start bot triangle
        cylinderEdges.push(1);
        cylinderEdges.push(lastBot);
        
        cylinderEdges.push(lastBot);
        cylinderEdges.push(lastBot+2);
        
        cylinderEdges.push(lastBot+2);
        cylinderEdges.push(1);
        
        cylinderFaces.push(1);
        cylinderFaces.push(lastBot);
        cylinderFaces.push(lastBot+2);
        //end bot triangle
        
        //side rectangle
        cylinderEdges.push(lastTop);
        cylinderEdges.push(lastBot);
        cylinderEdges.push(lastTop+2);
        cylinderEdges.push(lastBot+2);
        
        cylinderFaces.push(lastTop);
        cylinderFaces.push(lastBot);
        cylinderFaces.push(lastBot+2);
        
        cylinderFaces.push(lastTop);
        cylinderFaces.push(lastTop+2);
        cylinderFaces.push(lastBot+2);
        //end side rectangle
        
    
        lastPointUsedTop.push(lastTop+2);
        lastPointUsedBot.push(lastBot+2);
    }
    alert(vertices);
}


/**
 * Descobre os pontos dependendo do segments e adiciona ao vetor vertices
 * @param segments Numero de segmentos em que dividimos a base
 */
function addPoints(segments) {
	   var theta = (2*Math.PI / segments); //Degrees = radians * (180 / π)
	   vertices.push(vec3(0,0.5,0));
       vertices.push(vec3(0,-0.5,0));

	   for (i =0;i<=segments;i++){
	       var x =  0.5*Math.cos(theta*i); 
	       var z =  0.5*Math.sin(theta*i);
	   
	       vertices.push(vec3(x,0.5,z));	//Bottom Vertex
	       vertices.push(vec3(x,-0.5,z));	//Top Vertex
	       
	       /****************************************************************
	        *                                                              *
	        * NAO SEI SE É PRECISO MAS ADICIONA-SE CASO SEJA PRECISO DEPOIS*
	        *                                                              *
	        ****************************************************************/
	       cylinderBotVertices.push(vec3(x,-0.5,z));
	       cylinderTopVertices.push(vec3(x,0.5,z));
       }
}