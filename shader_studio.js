var gl;
var canvas;

var vertex_shader_area, fragment_shader_area;


// GLSL programs
var program;

var projection;



function initialize() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0,0,canvas.width, canvas.height);
    gl.enable(gl.DEPTH_TEST);
    
    program = initShaders(gl, "vertex-default", "fragment-default");
   
    // remaining initializations
    projection = mult(rotateX(23),rotateY(-30));
}

function updateShaderAreas()
{
    vertex_shader_area.value = document.getElementById(vtxName()).text;
    fragment_shader_area.value = document.getElementById(frgName()).text;    
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
    }
    
    fragment_shader_area.onchange = function () {  
    }
    
    document.getElementById("shading").onchange = function() {
        switch(this.value) {
            case "Gouraud":
                break;
            case "Phong":
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
                break;
            case "Cilindro":
                break;
        }
    }

    
    document.getElementById("projection").onchange = function() {
        switch(this.value) {
            case "AP":
                
                projection = mult(rotateX(23),rotateY(-30));
                break;
            case "PLANTA":
           
                break;
            case "Axonometrica": 
                projection = projAxo;
                break;
            case "Obliqua":
                projection = projOblique;
                break;
            case "Perspetiva":
                projection = projPerspective;
                break;
        }
    }
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
        cubeDrawWireFrame(gl,program);
        cubeDrawWireFrame(gl,program);
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
