// src/App.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Sampler, Environment, Stage, AccumulativeShadows, RandomizedLight, GizmoHelper, GizmoViewport } from '@react-three/drei';
import Box from './components/box';
import Sphere from './components/sphere';
import Plane from './components/plane';
import Street from './components/street';
import Hologram from './components/hologram';
import PointCloud2 from './components/test_points';
// import Pointcloud from './components/pointcloud';
import Model from './components/model';
import './App.css'; // Styles for full screen

function App() {
  return (
    <Canvas shadows resize={{ scroll: false }} style={{backgroundColor:"black"}}camera={{position: [0, 5, 10]}}>
      {/* <Environment files="/assets/royal_esplanade_1k.hdr"
      background
      backgroundBlurriness={0.5}/> */}
      {/* <ambientLight intensity={5} /> */}
      
      {/* <pointLight  position={[0, 1.5, 0]} intensity={1} /> */}
      <PointCloud2 />
      {/* <Hologram modelPath="/assets/ramenHologram.gltf"  /> */}
      {/* Adding Gizmo for visualizing light */}
      {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
      </GizmoHelper> */}

      {/* Importing 3D interactive components */}
      {/* <Box />
      <Sphere />
      <Plane /> */}
      {/* <pointLight castShadow color="white" position={[0, 1.082, 1.603]} intensity={3}/> */}
      <Model />
      {/* <Pointcloud filePath="/assets/pc_room.ply" /> */}
      {/* <Street /> */}

      <OrbitControls />
      <Stats showPanel={0} /> {/* FPS and performance metrics */}
    </Canvas>
  );
}

export default App;
