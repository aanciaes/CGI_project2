cube_vertices = [
    vec3(-0.5, -0.5, +0.5),     // 0
    vec3(+0.5, -0.5, +0.5),     // 1
    vec3(+0.5, +0.5, +0.5),     // 2
    vec3(-0.5, +0.5, +0.5),     // 3
    vec3(-0.5, -0.5, -0.5),     // 4
    vec3(+0.5, -0.5, -0.5),     // 5
    vec3(+0.5, +0.5, -0.5),     // 6
    vec3(-0.5, +0.5, -0.5)      // 7
];
    
var cube_points = [];
var cube_normals = [];
var cube_faces = [];
var cube_edges = [];

function cubeInit() {
    cubeBuild();
    cubeUploadData(gl);
}

function cubeBuild() 
{
    cubeAddFace(0,1,2,3,vec3(0,0,1));
    cubeAddFace(1,5,6,2,vec3(1,0,0));
    cubeAddFace(4,7,6,5,vec3(0,0,-1));
    cubeAddFace(0,3,7,4,vec3(-1,0,0));
    cubeAddFace(3,2,6,7,vec3(0,1,0));
    cubeAddFace(0,4,5,1,vec3(0,-1,0));    
}


function cubeAddFace(a, b, c, d, n)
{
    var offset = cube_points.length;
    
    cube_points.push(cube_vertices[a]);
    cube_points.push(cube_vertices[b]);
    cube_points.push(cube_vertices[c]);
    cube_points.push(cube_vertices[d]);
    for(var i=0; i<4; i++)
        cube_normals.push(n);
    
    // Add 2 triangular faces (a,b,c) and (a,c,d)
    cube_faces.push(offset);
    cube_faces.push(offset+1);
    cube_faces.push(offset+2);
    
    cube_faces.push(offset);
    cube_faces.push(offset+2);
    cube_faces.push(offset+3);
    
    // Add first edge (a,b)
    cube_edges.push(offset);
    cube_edges.push(offset+1);
    
    // Add second edge (b,c)
    cube_edges.push(offset+1);
    cube_edges.push(offset+2);
}