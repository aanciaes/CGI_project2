var gl;
var canvas;

var vertex_shader_area, fragment_shader_area;


// GLSL programs
var program;

var projection;

var projAxo = mult(rotateX(23),rotateY(-30));

var projFront;

var projTop;


//PASSAR PARA RADIANOS
var projOblique;

var projPerspective;



var filling = 1;


function initialize() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0,0,canvas.width, canvas.height);
    gl.enable(gl.DEPTH_TEST);
    
    program = initShaders(gl, "vertex-default", "fragment-default");
    
   
    // remaining initializations
    projFront = mat4(1,0,0,0,
                     0,1,0,0,
                     0,0,0,0,
                     0,0,0,1);
    
     projTop = mat4(1,0,0,0,
                   0,0,-1,0,
                   0,0,0,0,
                   0,0,0,1);
    
    projOblique = mat4(1,0,-0.75*Math.cos(radians(45)),0,
                       0,1,-0.75*Math.sin(radians(45)),0,
                       0,0,0,0,
                       0,0,0,1);
    
    projPerspective = mat4(1,0,0,0,
                       0,1,0,0,
                       0,0,1,0,
                       0,0,1.5,0);
    
    projAxo = mult(rotateX(23),rotateY(-30))

    
    projection = projAxo;
    
}

function updateShaderAreas()
{
    vertex_shader_area.value = document.getElementById("vertex-shader-area").value ;
    fragment_shader_area.value = document.getElementById("fragment-shader-area").value;   
    
    document.getElementById("vertex-default").text = vertex_shader_area.value;
    document.getElementById("fragment-default").text =  fragment_shader_area.value;

    program = initShaders(gl, "vertex-default", "fragment-default");

}

function setupGUI() {
    document.getElementById("vertex-shader-area").value = document.getElementById("vertex-default").innerHTML;
    
    vertex_shader_area = document.getElementById("vertex-shader-area");
    vertex_shader_area.style.width="512px";
    vertex_shader_area.resize = "none";

    document.getElementById("fragment-shader-area").value = document.getElementById("fragment-default").innerHTML;
    
    fragment_shader_area = document.getElementById("fragment-shader-area");
    fragment_shader_area.style.width="512px";
    fragment_shader_area.resize = "none";

    vertex_shader_area.onchange = function () {
        updateShaderAreas();
    }
    
    fragment_shader_area.onchange = function () {  
        updateShaderAreas();
    }
    
    document.getElementById("shading").onchange = function() {
        switch(this.value) {
            case "Gouraud":
                break;
            case "Phong":
                document.getElementById("vertex-shader-area").value = document.getElementById("vertex-phong").innerHTML;
                document.getElementById("fragment-shader-area").value = document.getElementById("fragment-phong").innerHTML;
               // program = initShaders(gl, "vertex-phong", "fragment-phong");
                break;
        }    
        updateShaderAreas();
    }
    
    document.getElementById("object").onchange = function() {
        switch(this.value) {
            case "Cubo":
                cubeInit(gl);
                break;
            case "Esfera":
                sphereInit(gl);
                break;
            case "Cilindro":
            	cylinderInit(gl);
                break;
        }
    }

    
    document.getElementById("projection").onchange = function() {
        hideStuff();
        switch(this.value) {
            case "AP":
                
                projection =  projFront;
                break;
                
            case "PLANTA":
                 projection = projTop;
                break;
                
            case "Axonometrica": 
                document.getElementById("Axo").style.display = "inline";
                projection = projAxo;
                break;
                
            case "Obliqua":
                document.getElementById("Oblique").style.display = "inline";
                projection = projOblique;
                break;
                
            case "Perspetiva":
                document.getElementById("Perspective").style.display = "inline";
                projection =  projPerspective;
                break;
        }
    }
}

function hideStuff(){
    document.getElementById("Perspective").style.display = "none";
    document.getElementById("Oblique").style.display = "none";
    document.getElementById("Axo").style.display = "none";

}

function changeFilling(){
    
    filling *=-1;
}

function changePerspective(d){
    //d = document.getElementById("rangeInput").value;
    
    document.getElementById("rangeDo").value = d;
    projPerspective=  mat4(1,0,0,0,
                       0,1,0,0,
                       0,0,1,0,
                       0,0,1/d,0);
    
    projection = projPerspective;
}

function changeObliq(l,a){
    l = document.getElementById("rangeL").value;
    a = document.getElementById("rangeA").value;
    
    document.getElementById("rangeLo").value = l;
    document.getElementById("rangeAo").value = a;


    var projOblique = mat4(1,0,-l*Math.cos(radians(a)),0,
                       0,1,-l*Math.sin(radians(a)),0,
                       0,0,0,0,
                       0,0,0,1);
    
    projection = projOblique;
}

function changeAxo(){
    
    X = document.getElementById("rangeX").value;
    Y = document.getElementById("rangeY").value;
    document.getElementById("rangeXo").value = X;
    document.getElementById("rangeYo").value = Y;

    
    projAxo = mult(rotateX(X),rotateY(Y));
    projection = projAxo;
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    gl.useProgram(program);
    
    //aximetric projection
    //send the current projection matrix
    
    var mProj= gl.getUniformLocation(program,"mProj");
    gl.uniformMatrix4fv(mProj,false,flatten(projection));
    
    if( document.getElementById("object").value == "Cubo")
    {
        if(filling == 1)
        cubeDrawWireFrame(gl,program);
            else
        cubeDrawFilled(gl,program);
    }
    if( document.getElementById("object").value == "Cilindro")
    {
        if(filling == 1)
            cylinderDrawWireFrame(gl, program);
        else
            cylinderDrawFilled(gl,program);

    }
    if( document.getElementById("object").value == "Esfera"){
        if(filling == 1)
            sphereDrawWireFrame(gl, program);
        else
            sphereDrawFilled(gl, program);
        
    }
    
    requestAnimFrame(render);
}

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if(!gl) { alert("WebGL isn't available"); }
    
    setupGUI();
    initialize();
    
    render();
}
