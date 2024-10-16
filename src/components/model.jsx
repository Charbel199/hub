import React, { useState, useRef } from 'react';
import { Sampler, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function Model(props) {
  const { nodes, materials } = useGLTF('/assets/japan_street.glb');
  const mesh_cast_shadows_id = [4, 6, 16, 12, 28, 12, 14, 32, 44, 64, 160, 206, 92, 96, 192, 194, 188, 200, 104, 90, 216, 218, 222, 230, 236, 112, 128, 284, 272, 276, 278, 292, 40, 80, 170, 208, 136, 110];
  const area_multiplier = 50;
  const point_width = 0.004;
  const wireframe_color = "blue";
  const point_color = "yellow";
  const emissive_point_color = "yellow";
  const emissive_point_intensity = 20;
  let num_of_points;

  const meshes = [
    { id: 4, geometry: nodes.Object_4.geometry, material: materials.Props_10, position: [1.548, 0.082, 1.603] },
    { id: 6, geometry: nodes.Object_6.geometry, material: materials.Props_10, position: [1.481, 0.082, 0.541] },
    { id: 8, geometry: nodes.Object_8.geometry, material: materials.Props_10, position: [1.281, 0.029, 2.036], rotation: [Math.PI, -1.531, Math.PI] },
    { id: 10, geometry: nodes.Object_10.geometry, material: materials.Props_10, position: [1.217, 0.029, 1.038], rotation: [Math.PI, -1.387, Math.PI] },
    { id: 12, geometry: nodes.Object_12.geometry, material: materials.Props_01, position: [-1.039, 0.092, -0.205] },
    { id: 14, geometry: nodes.Object_14.geometry, material: materials.Props_02, position: [-1.246, 1.12, -0.197] },
    { id: 16, geometry: nodes.Object_16.geometry, material: materials.Props_06, position: [-0.986, 0, 0.44] },
    { id: 18, geometry: nodes.Object_18.geometry, material: materials.Props_03, position: [-1.249, 1.417, 0.32] },
    { id: 20, geometry: nodes.Object_20.geometry, material: materials.Props_05, position: [-1.255, 1.862, 0.048] },
    { id: 22, geometry: nodes.Object_22.geometry, material: materials.Props_05, position: [-1.222, 2.289, -0.194] },
    { id: 24, geometry: nodes.Object_24.geometry, material: materials.Build_A_1, position: [-2.543, 0, 0.578] },
    { id: 26, geometry: nodes.Object_26.geometry, material: materials.Build_2, position: [-1.012, 3.137, 0.481] },
    { id: 28, geometry: nodes.Object_28.geometry, material: materials.Props_09, position: [-0.256, 0.15, -0.01] },
    { id: 30, geometry: nodes.Object_30.geometry, material: materials.Build_A_2, position: [-1.202, 2.308, 1.781] },
    { id: 32, geometry: nodes.Object_32.geometry, material: materials.Props_09, position: [-1.201, 1.066, -0.458] },
    { id: 34, geometry: nodes.Object_34.geometry, material: materials.Build_1, position: [-2.543, 0, 0.58] },
    { id: 36, geometry: nodes.Object_36.geometry, material: materials.Build_A_2, position: [-1.234, 1.655, -0.437] },
    { id: 38, geometry: nodes.Object_38.geometry, material: materials.Build_2, position: [-1.093, 2.518, 0.649] },
    { id: 40, geometry: nodes.Object_40.geometry, material: materials.Props_08, position: [-0.936, 3.161, -0.574] },
    { id: 42, geometry: nodes.Object_42.geometry, material: materials.Props_09, position: [-1.255, 2.213, 0.02] },
    { id: 44, geometry: nodes.Object_44.geometry, material: materials.Props_03, position: [-0.984, 0, -2.089], rotation: [Math.PI, -1.358, Math.PI] },
    { id: 46, geometry: nodes.Object_46.geometry, material: materials.Props_05, position: [-1.275, 2.873, -0.946] },
    { id: 48, geometry: nodes.Object_48.geometry, material: materials.Props_05, position: [-1.25, 3.193, -0.977] },
    { id: 50, geometry: nodes.Object_50.geometry, material: materials.Props_05, position: [-1.302, 4.039, -3.116] },
    { id: 52, geometry: nodes.Object_52.geometry, material: materials.Props_01, position: [-1.746, 0.092, -3.703] },
    { id: 54, geometry: nodes.Object_54.geometry, material: materials.Props_02, position: [-1.899, 1.345, -3.573] },
    { id: 56, geometry: nodes.Object_56.geometry, material: materials.Props_02, position: [-1.82, 0.718, -3.548] },
    { id: 58, geometry: nodes.Object_58.geometry, material: materials.Props_06, position: [-2.524, 0, -3.756], rotation: [0, 0.048, 0] },
    { id: 60, geometry: nodes.Object_60.geometry, material: materials.Props_06, position: [-2.524, 0.36, -3.756], rotation: [-Math.PI, -0.014, -Math.PI] },
    { id: 62, geometry: nodes.Object_62.geometry, material: materials.Props_06, position: [-2.566, 0.721, -3.772], rotation: [0, 0.102, 0] },
    { id: 64, geometry: nodes.Object_64.geometry, material: materials.Props_06, position: [-1.051, 0, -2.854], rotation: [0, 0.049, 0] },
    { id: 66, geometry: nodes.Object_66.geometry, material: materials.Build_3, position: [-2.283, 0, -2.05] },
    { id: 68, geometry: nodes.Object_68.geometry, material: materials.Build_B_1, position: [-2.283, 0, -2.05] },
    { id: 70, geometry: nodes.Object_70.geometry, material: materials.Build_3, position: [-1.218, 4.262, -1.934] },
    { id: 72, geometry: nodes.Object_72.geometry, material: materials.Props_09, position: [-1.24, 0.002, -2.321], rotation: [0, 0, 0.018] },
    { id: 74, geometry: nodes.Object_74.geometry, material: materials.Build_1, position: [-2.283, 0, -2.05] },
    { id: 76, geometry: nodes.Object_76.geometry, material: materials.Props_09, position: [-1.275, 2.053, -1.412] },
    { id: 78, geometry: nodes.Object_78.geometry, material: materials.Build_B_2, position: [-1.501, 2.892, -1.882] },
    { id: 80, geometry: nodes.Object_80.geometry, material: materials.Props_08, position: [-0.806, 2.894, -3.087], rotation: [0, 0, -0.044] },
    { id: 82, geometry: nodes.Object_82.geometry, material: materials.Build_B_2, position: [-1.076, 4.451, -3.386] },
    { id: 84, geometry: nodes.Object_84.geometry, material: materials.Props_05, position: [-0.998, 0.799, -1.867], rotation: [-2.461, 0.205, 2.978] },
    { id: 86, geometry: nodes.Object_86.geometry, material: materials.Build_C_2, position: [-1.11, 2.308, -6.284] },
    { id: 88, geometry: nodes.Object_88.geometry, material: materials.Build_C_1, position: [-2.152, 0, -5.263] },
    { id: 90, geometry: nodes.Object_90.geometry, material: materials.Build_3, position: [-1.033, 2.146, -5.695] },
    { id: 92, geometry: nodes.Object_92.geometry, material: materials.Props_07, position: [-0.915, 0.36, -4.661], rotation: [0, 0.017, 0] },
    { id: 94, geometry: nodes.Object_94.geometry, material: materials.Props_01, position: [-0.904, 0.05, -4.645], rotation: [0, 1.538, 0] },
    { id: 96, geometry: nodes.Object_96.geometry, material: materials.Props_07, position: [-0.89, 0.722, -4.627], rotation: [0, -0.206, 0] },
    { id: 98, geometry: nodes.Object_98.geometry, material: materials.Props_01, position: [-0.947, 2.222, -4.615] },
    { id: 100, geometry: nodes.Object_100.geometry, material: materials.Props_05, position: [-1.122, 2.561, -6.033] },
    { id: 102, geometry: nodes.Object_102.geometry, material: materials.Props_02, position: [-1.514, 1.12, -4.156] },
    { id: 104, geometry: nodes.Object_104.geometry, material: materials.Props_09, position: [-1.099, 1.298, -4.539] },
    { id: 106, geometry: nodes.Object_106.geometry, material: materials.Build_1, position: [-2.152, 0, -5.263] },
    { id: 108, geometry: nodes.Object_108.geometry, material: materials.Build_C_2, position: [-1.107, 3.147, -5.118] },
    { id: 110, geometry: nodes.Object_110.geometry, material: materials.Props_08, position: [-0.834, 3.679, -6.113], rotation: [0, 0, -0.019] },
    { id: 112, geometry: nodes.Object_112.geometry, material: materials.Props_03, position: [-0.951, 0, -8.744], rotation: [0, 0.183, 0] },
    { id: 114, geometry: nodes.Object_114.geometry, material: materials.Props_01, position: [-1.061, 2.426, -7.435] },
    { id: 116, geometry: nodes.Object_116.geometry, material: materials.Props_05, position: [-1.234, 2.909, -8.04] },
    { id: 118, geometry: nodes.Object_118.geometry, material: materials.Props_05, position: [-1.027, 4.181, -8.993] },
    { id: 120, geometry: nodes.Object_120.geometry, material: materials.Build_1, position: [-2.55, 0, -7.595] },
    { id: 122, geometry: nodes.Object_122.geometry, material: materials.Build_1, position: [-2.256, 0, -8.601] },
    { id: 124, geometry: nodes.Object_124.geometry, material: materials.Build_D_2, position: [-1.225, 3.175, -7.564] },
    { id: 126, geometry: nodes.Object_126.geometry, material: materials.Build_D_1, position: [-2.265, 0, -7.794] },
    { id: 128, geometry: nodes.Object_128.geometry, material: materials.Build_3, position: [-1.08, 2.249, -7.492] },
    { id: 130, geometry: nodes.Object_130.geometry, material: materials.Build_D_2, position: [-1.14, 3.852, -8.239] },
    { id: 132, geometry: nodes.Object_132.geometry, material: materials.Props_09, position: [-1.214, 0.89, -9.131] },
    { id: 134, geometry: nodes.Object_134.geometry, material: materials.Props_09, position: [-1.254, 1.952, -8.604] },
    { id: 136, geometry: nodes.Object_136.geometry, material: materials.Props_08, position: [-0.947, 2.97, -6.72] },
    { id: 138, geometry: nodes.Object_138.geometry, material: materials.Build_E, position: [3.248, 0, 1.024] },
    { id: 140, geometry: nodes.Object_140.geometry, material: materials.Props_01, position: [2.05, 2.48, 0.418], rotation: [Math.PI, 0, 3.07] },
    { id: 142, geometry: nodes.Object_142.geometry, material: materials.Props_05, position: [2.214, 4.042, 1.636] },
    { id: 144, geometry: nodes.Object_144.geometry, material: materials.Build_E, position: [2.184, 2.808, 1.27], rotation: [Math.PI, 0, 0] },
    { id: 146, geometry: nodes.Object_146.geometry, material: materials.Props_09, position: [2.193, 2.807, 1.688] },
    { id: 148, geometry: nodes.Object_148.geometry, material: materials.Build_4, position: [2.284, 0, -1.426] },
    { id: 150, geometry: nodes.Object_150.geometry, material: materials.Build_F_2, position: [2.284, 0, -1.426] },
    { id: 152, geometry: nodes.Object_152.geometry, material: materials.Build_F_2, position: [3.207, 0, -0.916] },
    { id: 154, geometry: nodes.Object_154.geometry, material: materials.Props_02, position: [1.21, 1.328, -1.535] },
    { id: 156, geometry: nodes.Object_156.geometry, material: materials.Props_02, position: [1.214, 1.191, -1.57] },
    { id: 158, geometry: nodes.Object_158.geometry, material: materials.Props_03, position: [1.656, 1.349, -1.317], rotation: [0.038, 0, 0] },
    { id: 160, geometry: nodes.Object_160.geometry, material: materials.Props_01, position: [1.044, 2.222, -2.162], rotation: [-Math.PI, 0, -Math.PI] },
    { id: 162, geometry: nodes.Object_162.geometry, material: materials.Props_05, position: [1.566, 3.214, -0.191] },
    { id: 164, geometry: nodes.Object_164.geometry, material: materials.Props_05, position: [1.41, 3.779, -0.21] },
    { id: 166, geometry: nodes.Object_166.geometry, material: materials.Props_05, position: [1.824, 4.414, -0.181] },
    { id: 168, geometry: nodes.Object_168.geometry, material: materials.Build_F_2, position: [0.929, 4.752, -1.497] },
    { id: 170, geometry: nodes.Object_170.geometry, material: materials.Props_08, position: [0.824, 3.557, -0.405], rotation: [0, 0, 0.009] },
    { id: 172, geometry: nodes.Object_172.geometry, material: materials.Props_09, position: [1.415, 3.917, -0.311] },
    { id: 174, geometry: nodes.Object_174.geometry, material: materials.Build_F_2, position: [1.317, 3.141, -0.82] },
    { id: 176, geometry: nodes.Object_176.geometry, material: materials.Props_09, position: [1.238, 2.043, -2.479] },
    { id: 178, geometry: nodes.Object_178.geometry, material: materials.Build_F_1, position: [2.284, 0, -1.426] },
    { id: 180, geometry: nodes.Object_180.geometry, material: materials.Build_A_2, position: [2.13, 1.558, -1.322] },
    { id: 182, geometry: nodes.Object_182.geometry, material: materials.Props_05, position: [1.659, 1.766, -1.343] },
    { id: 184, geometry: nodes.Object_184.geometry, material: materials.Build_1, position: [1.204, 0.908, -2.418] },
    { id: 186, geometry: nodes.Object_186.geometry, material: materials.Build_G_1, position: [2.269, 0, -3.854] },
    { id: 188, geometry: nodes.Object_188.geometry, material: materials.Props_01, position: [1.036, 0.1, -4.375], rotation: [-Math.PI, 0, -Math.PI] },
    { id: 190, geometry: nodes.Object_190.geometry, material: materials.Props_01, position: [1.044, 0.05, -4.398], rotation: [0, 1.556, 0] },
    { id: 192, geometry: nodes.Object_192.geometry, material: materials.Props_06, position: [1.023, 0.664, -4.343], rotation: [0, 0.065, 0] },
    { id: 194, geometry: nodes.Object_194.geometry, material: materials.Props_07, position: [0.981, 0.103, -4.91], rotation: [-Math.PI, 1.331, -Math.PI] },
    { id: 196, geometry: nodes.Object_196.geometry, material: materials.Props_04, position: [1.113, 1.971, -3.4] },
    { id: 198, geometry: nodes.Object_198.geometry, material: materials.Props_03, position: [1.228, 1.422, -4.267] },
    { id: 200, geometry: nodes.Object_200.geometry, material: materials.Props_04, position: [0.996, 1.903, -4.219] },
    { id: 202, geometry: nodes.Object_202.geometry, material: materials.Build_1, position: [2.559, 0, -2.828], rotation: [-Math.PI, 0, -Math.PI] },
    { id: 204, geometry: nodes.Object_204.geometry, material: materials.Build_G_2, position: [1.045, 2.513, -3.044] },
    { id: 206, geometry: nodes.Object_206.geometry, material: materials.Build_4, position: [1.262, 2.412, -3.849] },
    { id: 208, geometry: nodes.Object_208.geometry, material: materials.Props_08, position: [0.952, 3.091, -2.997] },
    { id: 210, geometry: nodes.Object_210.geometry, material: materials.Build_4, position: [1.123, 4.122, -3.862], rotation: [0, 0, 0.16] },
    { id: 212, geometry: nodes.Object_212.geometry, material: materials.Props_05, position: [1.239, 2.252, -3.07], rotation: [-Math.PI, 0, -Math.PI] },
    { id: 214, geometry: nodes.Object_214.geometry, material: materials.Build_H_1, position: [2.324, 0, -6.135] },
    { id: 216, geometry: nodes.Object_216.geometry, material: materials.Props_03, position: [0.99, 0, -5.638], rotation: [Math.PI, -1.455, Math.PI] },
    { id: 218, geometry: nodes.Object_218.geometry, material: materials.Props_02, position: [1.227, 1.345, -5.275], rotation: [-Math.PI, 0, -Math.PI] },
    { id: 220, geometry: nodes.Object_220.geometry, material: materials.Props_02, position: [1.253, 0.718, -5.354] },
    { id: 222, geometry: nodes.Object_222.geometry, material: materials.Props_02, position: [1.312, 1.12, -5.84] },
    { id: 224, geometry: nodes.Object_224.geometry, material: materials.Props_05, position: [0.979, 2.016, -6.669] },
    { id: 226, geometry: nodes.Object_226.geometry, material: materials.Props_05, position: [1.292, 3, -6.955] },
    { id: 228, geometry: nodes.Object_228.geometry, material: materials.Props_05, position: [1.477, 4.753, -5.42] },
    { id: 230, geometry: nodes.Object_230.geometry, material: materials.Props_09, position: [1.263, 1.475, -5.696] },
    { id: 232, geometry: nodes.Object_232.geometry, material: materials.Build_1, position: [1.988, 0, -7.144], rotation: [-Math.PI, 0, -Math.PI] },
    { id: 234, geometry: nodes.Object_234.geometry, material: materials.Build_H_2, position: [1.321, 2.597, -6.387] },
    { id: 236, geometry: nodes.Object_236.geometry, material: materials.Props_08, position: [0.949, 2.165, -5.184] },
    { id: 238, geometry: nodes.Object_238.geometry, material: materials.Props_08, position: [0.955, 3.919, -7.13], rotation: [0, 0, 0.013] },
    { id: 240, geometry: nodes.Object_240.geometry, material: materials.Build_4, position: [1.204, 3.264, -5.46] },
    { id: 242, geometry: nodes.Object_242.geometry, material: materials.Props_09, position: [1.312, 1.952, -5.872] },
    { id: 244, geometry: nodes.Object_244.geometry, material: materials.Build_I, position: [-1.244, 0, -11.397] },
    { id: 246, geometry: nodes.Object_246.geometry, material: materials.Props_02, position: [-1.74, 1.12, -10.425] },
    { id: 248, geometry: nodes.Object_248.geometry, material: materials.Props_07, position: [-2.427, 0.259, -10.205], rotation: [0, -1.555, 0] },
    { id: 250, geometry: nodes.Object_250.geometry, material: materials.Props_06, position: [-3.132, -0.001, -9.854], rotation: [0, 0.001, 0] },
    { id: 252, geometry: nodes.Object_252.geometry, material: materials.Props_05, position: [-1.439, 4.384, -10.378] },
    { id: 254, geometry: nodes.Object_254.geometry, material: materials.Build_I, position: [-1.554, 2.649, -10.41] },
    { id: 256, geometry: nodes.Object_256.geometry, material: materials.Build_F_2, position: [-0.396, 3.141, -10.503] },
    { id: 258, geometry: nodes.Object_258.geometry, material: materials.Props_01, position: [-1.738, 2.222, -10.231] },
    { id: 260, geometry: nodes.Object_260.geometry, material: materials.Build_1, position: [-1.155, 0.908, -10.403] },
    { id: 262, geometry: nodes.Object_262.geometry, material: materials.Build_J, position: [2.782, 0, -11.402] },
    { id: 264, geometry: nodes.Object_264.geometry, material: materials.Build_2, position: [2.042, 5.157, -10.243] },
    { id: 266, geometry: nodes.Object_266.geometry, material: materials.Build_1, position: [1.286, 0.949, -10.266] },
    { id: 268, geometry: nodes.Object_268.geometry, material: materials.Props_05, position: [0.794, 2.647, -10.417] },
    { id: 270, geometry: nodes.Object_270.geometry, material: materials.Build_J, position: [0.941, 2.606, -10.422] },
    { id: 272, geometry: nodes.Object_272.geometry, material: materials.Props_02, position: [3.384, 1.345, -10.347] },
    { id: 274, geometry: nodes.Object_274.geometry, material: materials.Props_02, position: [3.305, 0.718, -10.373] },
    { id: 276, geometry: nodes.Object_276.geometry, material: materials.Props_02, position: [2.319, 1.12, -10.432] },
    { id: 278, geometry: nodes.Object_278.geometry, material: materials.Props_09, position: [2.642, 0.89, -10.389] },
    { id: 280, geometry: nodes.Object_280.geometry, material: materials.Build_J, position: [2.186, 2.491, -10.464] },
    { id: 282, geometry: nodes.Object_282.geometry, material: materials.Props_09, position: [2.186, 2.491, -10.464] },
    { id: 284, geometry: nodes.Object_284.geometry, material: materials.Props_06, position: [2.651, 0, -10.235], rotation: [0, -1.484, 0] },
    { id: 286, geometry: nodes.Object_286.geometry, material: materials.pole, position: [0, 3.079, -0.293] },
    { id: 288, geometry: nodes.Object_288.geometry, material: materials.material },
    { id: 290, geometry: nodes.Object_290.geometry, material: materials.ground },
    { id: 292, geometry: nodes.Object_292.geometry, material: materials.pole, position: [0.213, 0, -9.96] },
    { id: 294, geometry: nodes.Object_294.geometry, material: materials.pole, position: [0.213, 8.167, -9.739] },
    { id: 296, geometry: nodes.Object_296.geometry, material: materials.pole, position: [0.075, 0, -9.96] },
    { id: 298, geometry: nodes.Object_298.geometry, material: materials.pole, position: [0.211, 3.641, -9.299], rotation: [-0.16, 0, 0] },
    { id: 300, geometry: nodes.Object_300.geometry, material: materials.pole },
    // Add more mesh objects here if needed
  ];


  const [clickedMeshes, setClickedMeshes] = useState({});
  const isDragging = useRef(false); // Track if the mouse is dragging
  const clickStart = useRef({ x: 0, y: 0 }); // Store the start position of the click

  const calculateGeometryArea = (geometry) => {
    let area = 0;
    const positionAttribute = geometry.attributes.position;
    const index = geometry.index;

    const vA = new THREE.Vector3();
    const vB = new THREE.Vector3();
    const vC = new THREE.Vector3();

    if (index !== null) {
      for (let i = 0; i < index.count; i += 3) {
        vA.fromBufferAttribute(positionAttribute, index.getX(i));
        vB.fromBufferAttribute(positionAttribute, index.getX(i + 1));
        vC.fromBufferAttribute(positionAttribute, index.getX(i + 2));

        const edge1 = new THREE.Vector3().subVectors(vB, vA);
        const edge2 = new THREE.Vector3().subVectors(vC, vA);
        const crossProduct = new THREE.Vector3().crossVectors(edge1, edge2);
        const triangleArea = crossProduct.length() * 0.5;

        area += triangleArea;
      }
    } else {
      for (let i = 0; i < positionAttribute.count; i += 3) {
        vA.fromBufferAttribute(positionAttribute, i);
        vB.fromBufferAttribute(positionAttribute, i + 1);
        vC.fromBufferAttribute(positionAttribute, i + 2);

        const edge1 = new THREE.Vector3().subVectors(vB, vA);
        const edge2 = new THREE.Vector3().subVectors(vC, vA);
        const crossProduct = new THREE.Vector3().crossVectors(edge1, edge2);
        const triangleArea = crossProduct.length() * 0.5;

        area += triangleArea;
      }
    }

    return area;
  };

  const handlePointerDown = (e) => {
    clickStart.current = { x: e.clientX, y: e.clientY }; // Record where the mouse was clicked
    isDragging.current = false;
  };

  const handlePointerMove = (e) => {
    // If the mouse moves more than a small threshold, it's considered a drag
    const dx = Math.abs(e.clientX - clickStart.current.x);
    const dy = Math.abs(e.clientY - clickStart.current.y);
    if (dx > 5 || dy > 5) {
      isDragging.current = true;
    }
  };

  const handlePointerUp = (e, id) => {
    if (!isDragging.current) {
      // Only trigger click event if not dragging
      handleMeshClick(e, id);
    }
  };

  const handleMeshClick = (e, id) => {
    console.debug("Clicked on mesh with id:", id);
    e.stopPropagation();  // Prevent the click event from passing through to other meshes
    setClickedMeshes((prev) => ({
      ...prev,
      [id]: !prev[id],  // Toggle the clicked state of the mesh
    }));
  };

  return (
    <group {...props} dispose={null}>
      {meshes.map(({ id, geometry, material, position, rotation }) => (
        clickedMeshes[id] ? (
          <Sampler count={num_of_points = calculateGeometryArea(geometry) * area_multiplier} key={id}>
            <mesh
              position={position}
              rotation={rotation || [0, 0, 0]}
              geometry={geometry}
              scale={1}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={(e) => handlePointerUp(e, id)}
            >
              <meshStandardMaterial color={wireframe_color} wireframe />
            </mesh>
            <instancedMesh
              position={position}
              rotation={rotation || [0, 0, 0]}
              args={[undefined, undefined, num_of_points]}
            >
              <sphereGeometry args={[point_width]} />
              <meshStandardMaterial color={point_color} emissive={emissive_point_color} emissiveIntensity={emissive_point_intensity} />
            </instancedMesh>
          </Sampler>
        ) : (
          <mesh
            key={id}
            castShadow={mesh_cast_shadows_id.includes(id)}
            receiveShadow={!mesh_cast_shadows_id.includes(id)}
            geometry={geometry}
            material={material}
            position={position}
            rotation={rotation || [0, 0, 0]}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={(e) => handlePointerUp(e, id)}
          />
        )
      ))}
      <group>
        <pointLight color="hotpink" position={[1.548, 1.082, 1.603]} intensity={0.5} />
        <pointLight color="hotpink" position={[1.081, 1.082, 0.541]} intensity={0.5} />
        <pointLight color="blue" position={[-0.536, 3.161, -0.474]} intensity={0.5} />
        <pointLight color="white" position={[-0.806, 2.894, -3.087]} intensity={0.5} />
        <pointLight color="purple" position={[-0.947, 2.97, -6.72]} intensity={0.5} />
        <pointLight color="white" position={[0.824, 3.557, -0.405]} intensity={0.5} />
        <pointLight color="orange" position={[0.996, 1.903, -4.219]} intensity={0.5} />
        <pointLight color="red" position={[0.952, 3.091, -2.997]} intensity={0.5} />
        <pointLight color="blue" position={[0.949, 2.165, -5.184]} intensity={0.5} />
      </group>
    </group>
  );
}

useGLTF.preload('/assets/japan_street.glb');
export default Model;
