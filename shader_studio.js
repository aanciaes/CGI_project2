var gl;

var canvas;

var vertex_shader_area, fragment_shader_area;


// GLSL programs
var program;


function initialize() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.viewport(0,0,canvas.width, canvas.height);
    gl.enable(gl.DEPTH_TEST);
    
    program = initShaders(gl, "vertex-default", "fragment-default");
    
    // remaining initializations
    
}

function updateShaderAreas()
{
    vertex_shader_area.value = document.getElementById(vtxName()).text;
    fragment_shader_area.value = document.getElementById(frgName()).text;    
}

function setupGUI() {
    vertex_shader_area = document.getElementById("vertex-shader-area");
    vertex_shader_area.style.width="512px";
    vertex_shader_area.resize = "none";

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
                projection = projFront;
                break;
            case "PLANTA":
                projection = projTop;
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
