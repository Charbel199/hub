import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';;
import { Stats, OrbitControls, Sampler, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const PointCloud2 = () => {
  const gltf = useGLTF("/assets/ramenHologram.gltf");  // Load the GLTF model
  const { nodes, materials } = useGLTF('/assets/japan_street.glb')
  const geom = nodes.Object_16.geometry
  const area_multiplier=100


  const calculateGeometryArea = (geometry) => {
    let area = 0;
    
    // If the geometry is indexed, we need to access index array
    const positionAttribute = geometry.attributes.position;
    const index = geometry.index;
  
    const vA = new THREE.Vector3();
    const vB = new THREE.Vector3();
    const vC = new THREE.Vector3();
  
    // If the geometry is indexed
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
      // Non-indexed geometry
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
  }

  const area = calculateGeometryArea(geom)
  console.log("Area: ",area)
  const number_of_points = area*area_multiplier
  const combineBuffer = (model, bufferName) => {
    let totalCount = 0;
    console.log("is model mesh ",model.isMesh)
    
    model.traverse((child) => {
        if (child.isMesh) {
            totalCount += child.geometry.attributes[bufferName].array.length;
        }
    });
    console.log("total count: ", totalCount)
    const combined = new Float32Array(totalCount);
    let offset = 0;
    const jitterAmount = 3.2;
    model.traverse((child) => {
        if (child.isMesh) {
            const buffer = child.geometry.attributes[bufferName];
            combined.set(buffer.array.map(value => value + (Math.random() - 0.5) * jitterAmount), offset);
            offset += buffer.array.length;
        }
    });

    return combined;
};
const combineBufferGeometry = (geometry, bufferName) => {
  let totalCount = 0;
  

  totalCount += geometry.attributes[bufferName].array.length;
  console.log("total count: ", totalCount)
  const combined = new Float32Array(totalCount);
  let offset = 0;
  const jitterAmount = 0;

  const buffer = geometry.attributes[bufferName];
  combined.set(buffer.array.map(value => value + (Math.random() - 0.5) * jitterAmount), offset);
  offset += buffer.array.length;

  return combined;
};
  // Define the points' positions (x, y, z)
  const points = useMemo(() => combineBufferGeometry(geom, 'position'), []);


  // const points = useMemo(() => new Float32Array([
  //   12, 95, 3,  // Point 1 at origin
  //   1, 1, 1,  // Point 2 at (1, 1, 1)
  //   -1, -1, -1 // Point 3 at (-1, -1, -1)
  // ]), []);
  
  const geometry = useMemo(() => {

      console.log("Points: ",points)
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return geometry;
  }, [points]);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      color: 'purple',
      size: 0.02,
      sizeAttenuation: true,
    });
  }, []);

  const pointCloud = useMemo(() => new THREE.Points(geometry, material), [geometry, material]);

  return (
    // Use the primitive to directly render the THREE.Points object
    <>
    <primitive object={pointCloud} />

    <Sampler
    count={number_of_points}>
      <mesh geometry={geom} scale={1}>
        <meshStandardMaterial color="blue" wireframe />
      </mesh>
 
      <instancedMesh args={[undefined, undefined, number_of_points]}> 
        <sphereGeometry args={[0.004]} />
        <meshStandardMaterial color="blue" emissive="blue" emissiveIntensity={20} />
      </instancedMesh>

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.3} />
      </EffectComposer>
    </Sampler></>
  );
};



export default PointCloud2;