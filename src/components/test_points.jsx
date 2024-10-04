import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';;
import { Stats, OrbitControls, Sampler, useGLTF } from '@react-three/drei';


const Pointcloud2 = () => {
  const { nodes, materials } = useGLTF('/assets/japan_street.glb')
  const geom = nodes.Object_16.geometry
  const area_multiplier=100




  const area = calculateGeometryArea(geom)
  console.log("Area: ",area)
  const number_of_points = area*area_multiplier

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

    </Sampler></>
  );
};



export default Pointcloud2;