var segments =60;

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
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cylinderPoints), gl.STATIC_DRAW);
    
    cylinderNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(cylinderNormal), gl.STATIC_DRAW);  
 
    cylinderFacesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderFacesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cylinderFaces), gl.STATIC_DRAW);
 
    cylinderEdgesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cylinderEdges), gl.STATIC_DRAW);
 
}

function cylinderDrawWireFrame (gl, program){    
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderPointsBuffer);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderNormalBuffer);
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderEdgesBuffer);
    gl.drawElements(gl.LINES,cylinderEdges.length,gl.UNSIGNED_SHORT,0);
}

function cylinderDrawFilled(gl,program){
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderPointsBuffer);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, cylinderNormalBuffer);
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cylinderFacesBuffer);
    gl.drawElements(gl.TRIANGLES,cylinderFaces.length,gl.UNSIGNED_SHORT,0);

}


function cylinderBuild (sgments) {
	addPoints(segments);
	addFacesEdges();
}

function addFacesEdges (){
    //First vertices to be used
    var lastPointUsedTop = [2];
    var lastPointUsedBot = [3];
    var aux;
    //Push bot and top center vertices
    

        //cylinderNormal.push(normalize(vertices[1]));

    for(i=0;i<segments*2;i++){
        //pop last vertice used to re use again
        var lastTop = lastPointUsedTop.pop();
        var lastBot = lastPointUsedBot.pop();
        
       //push vertices to be used to create edges and faces to points 
        //cylinderPoints.push(vertices[lastTop]);
        //cylinderPoints.push(vertices[lastBot]);
        //cylinderPoints.push(vertices[lastTop+2]);
        //cylinderPoints.push(vertices[lastBot+2]);
		
		
		/*if(i<segments*2){
		 
		 
		 aux = vertices[lastTop];

        cylinderNormal.push(normalize(vec3(aux[0],0,aux[2])));
		

         aux = vertices[lastBot];
        
        cylinderNormal.push(normalize(vec3(aux[0],0,aux[2])));
		 
		}*/
		
		
		
		
		
		
		
            
        /*start top triangle*/
        
        //first edge
        cylinderEdges.push(0);
        cylinderEdges.push(lastTop);
        
        //Second Edge
        cylinderEdges.push(lastTop);
        cylinderEdges.push(lastTop+2);
        
        //third edge
        //cylinderEdges.push(lastTop+2);
        //cylinderEdges.push(0);
        
        //push face - Top triangle
        cylinderFaces.push(0);
        cylinderFaces.push(lastTop);
        cylinderFaces.push(lastTop+2);
        /*end top triangle*/
        
        /*start bot triangle*/
        
        //first edge
        cylinderEdges.push(1);
        cylinderEdges.push(lastBot);
        
        //Second edge
        cylinderEdges.push(lastBot);
        cylinderEdges.push(lastBot+2);
        
        //third edge
        //cylinderEdges.push(lastBot+2);
        //cylinderEdges.push(1);
        
        //push face - Bottom triangle
        cylinderFaces.push(1);
        cylinderFaces.push(lastBot);
        cylinderFaces.push(lastBot+2);
        //end bot triangle
        
        /*side rectangle*/
        //push edges of the two triangles to be made in te middle
        //cylinderEdges.push(lastBot);                                       /*******************
        //cylinderEdges.push(lastTop);                                       *  REPEATED EDGES  *
        //cylinderEdges.push(lastBot+2);                                     *******************/
        //cylinderEdges.push(lastTop+2);
        
        
        cylinderEdges.push(lastTop);
        cylinderEdges.push(lastBot+2);
        
        //first triangle of middle section
        cylinderFaces.push(lastTop);
        cylinderFaces.push(lastBot);
        cylinderFaces.push(lastBot+2);
        
        //Second triangle of middle section
        cylinderFaces.push(lastTop);
        cylinderFaces.push(lastTop+2);
        cylinderFaces.push(lastBot+2);
        /*end side rectangle*/
        
        //push last used vertices to help next section
        lastPointUsedTop.push(lastTop+2);
        lastPointUsedBot.push(lastBot+2);
    }
}


/**
 * Descobre os pontos dependendo do numero de segmentos e adiciona ao vetor vertices
 * @param segments Numero de segmentos em que dividimos a base
 */
function addPoints(segments) {
	   var theta = (2*Math.PI / segments); //Degrees = radians * (180 / π)
	   
   
		cylinderPoints.push(vec3(0,0.5,0));
        cylinderNormal.push(vec3(0,1,0));
		cylinderPoints.push(vec3(0,-0.5,0));
        cylinderNormal.push(vec3(0,-1,0));
    
    
	   for (i =0;i<=segments*2;i++){
	       var x =  0.5*Math.cos(theta*i); 
	       var z =  0.5*Math.sin(theta*i);
	   
           

	       cylinderPoints.push(vec3(x,0.5,z));	//Bottom Vertex
	       cylinderPoints.push(vec3(x,-0.5,z));	//Top Vertex

		  /* if(i<segments){
		   cylinderNormal.push(vec3(0,1,0));
		   cylinderNormal.push(vec3(0,-1,0));
		   }
		   else{*/
		   cylinderNormal.push(normalize(vec3(x,0.5,z)));
		   cylinderNormal.push(normalize(vec3(x,-0.5,z)));
		   //}

	       
	       /****************************************************************
	        *                                                              *
	        * NAO SEI SE É PRECISO MAS ADICIONA-SE CASO SEJA PRECISO DEPOIS*
	        *                                                              *
	        ****************************************************************/
           
            //alert("ola");

	      //Nao necessario, falar com o prof
           cylinderBotVertices.push(vec3(x,-0.5,z));
	       cylinderTopVertices.push(vec3(x,0.5,z));
       }
}