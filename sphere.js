/*Sphere.js*/

var sphereVertices=[];
var r=0.5;

var nlat = 20;   //horizontal
var nlong = 20; //vertical

var panico;

var sphere_points=[];
var sphere_edges=[];
var sphere_faces=[];
var sphere_normals=[];

var sphere_points_buffer;
var sphere_edges_buffer;
var sphere_faces_buffer;
var sphere_normal_buffer;

function sphereInit(){
    sphere_points=[];
    sphere_edges=[];
    sphere_faces=[];
    sphere_normals=[];
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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere_faces), gl.STATIC_DRAW);
    
     sphere_normal_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere_normal_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(sphere_normals), gl.STATIC_DRAW);
    
    sphere_edges_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_edges_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere_edges), gl.STATIC_DRAW);
}


function sphereDrawWireFrame(gl, program){
    //gl.useProgram(program);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere_points_buffer);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
     gl.bindBuffer(gl.ARRAY_BUFFER, sphere_normal_buffer);
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_edges_buffer);
    gl.drawElements(gl.LINES, sphere_edges.length, gl.UNSIGNED_SHORT, 0);
   
}

function sphereDrawFilled(gl, program){

   // gl.useProgram(program);
   // alert(sphere_faces.length);

    
    gl.bindBuffer(gl.ARRAY_BUFFER, sphere_points_buffer);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
     gl.bindBuffer(gl.ARRAY_BUFFER, sphere_normal_buffer);
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);
    
     gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, sphere_faces_buffer);
    gl.drawElements(gl.TRIANGLES, sphere_faces.length, gl.UNSIGNED_SHORT, 0);
     
    
}


function sphereAddPoints () {
	var d_phi = Math.PI/(nlat+1);
	var d_theta = (2*Math.PI)/nlong;
		
	var x,y,z;
   
   panico = (2*Math.PI);

   for(phi=-Math.PI;phi<=0;phi+=d_phi){
		for(theta=0;theta<=panico;theta+=d_theta){
			//alert("phi = " + phi + " theta = " + theta);
			x = r*Math.sin(phi)*Math.sin(theta);
			y = r*Math.cos(phi);
			z = r*Math.sin(phi)*Math.cos(theta);
            
			sphere_points.push(vec3(x,-y,z));
            sphere_normals.push(normalize(vec3(x,-y,z)));
			//alert("x = " + x + " y = " + y + " z = " + z);
		}
      if(sphere_points.length == nlong){
            x = r*Math.sin(phi)*Math.sin(theta);
			y = r*Math.cos(phi);
			z = r*Math.sin(phi)*Math.cos(theta);
            sphere_points.push(vec3(x,-y,z));
                      sphere_normals.push(normalize(vec3(x,-y,z)));

          panico = (2*Math.PI)+d_theta;
      }
	}

    sphere_points.push(vec3(0,-r,0));
    sphere_normals.push(normalize(vec3(0,-r,0)));


}

function sphereAddFacesEdges () {
    var i;
   
    //horizontais
         for(i=0;i<sphere_points.length-1;i+=1){    
        sphere_edges.push(i);   
        sphere_edges.push(i+1);
        }
        
    //verticais
    for(var j = 1; j <nlong+1; j++){        
        for(k = j ; k < (sphere_points.length)-(nlong+1); k+=nlong+1){
            sphere_edges.push(k);        
            sphere_edges.push(k+nlong+1);
            
            sphere_faces.push(k);
            sphere_faces.push(k+nlong+1);
            sphere_faces.push(k+nlong+2);
            
            sphere_faces.push(k);
            sphere_faces.push(k+1);
            sphere_faces.push(k+nlong+2); 
           if(j==1){
                sphere_faces.push(k);
                sphere_faces.push(k+nlong+1);
                sphere_faces.push(k+nlong+1+nlong);
                
                sphere_faces.push(k);
                sphere_faces.push(k+nlong);
                sphere_faces.push(k+nlong+1+nlong);
                
                
            }

    }
          sphere_edges.push(k);
          sphere_edges.push((sphere_points.length)-1);
    }
    
    //parte de baixo e de cima
    var a;
    for(a = 0; a<nlong*2; a++){    
        
         sphere_faces.push(sphere_points.length-1);
        sphere_faces.push(sphere_points.length-2-a);
        sphere_faces.push(sphere_points.length-3-a);
        
        sphere_faces.push(0);
        sphere_faces.push(a+1);
        sphere_faces.push(a+2);     
    }
    sphere_faces.push(sphere_points.length-1);
    sphere_faces.push(sphere_points.length-2-a);
    sphere_faces.push(sphere_points.length-3-a);
    

        
}

