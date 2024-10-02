import React from 'react';
import { useGLTF } from '@react-three/drei';

function Street() {
    const gltf = useGLTF('/assets/japan_street.glb'); // Replace with your actual path
  
    return <primitive object={gltf.scene} scale={1} />;
  }

export default Street;
