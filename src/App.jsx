// src/App.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls, Environment } from '@react-three/drei'
import Box from './components/box';
import Sphere from './components/sphere';
import Plane from './components/plane';
import Street from './components/street';
import Pointcloud from './components/pointcloud'
import Model from './components/model'
import './App.css'; // Styles for full screen

function App() {
  return (
    <Canvas resize={{ scroll: false }} style={{ backgroundColor: 'white' }} camera={{position: [0, 5, 10]}}>
      {/* <Environment files="/assets/royal_esplanade_1k.hdr"
      background
      backgroundBlurriness={0.5}/> */}
      {/* <ambientLight intensity={1} /> */}
      {/* <pointLight position={[15, 15, 15]} intensity={1}/> */}
      
      {/* Importing 3D interactive components */}
      {/* <Box />
      <Sphere />
      <Plane /> */}
      <Model />
      {/* <Pointcloud filePath="/assets/pc_room.ply" />  */}
  {/* <Street /> */}
      <OrbitControls />
      <Stats showPanel={0} /> {/* FPS and performance metrics */}
    </Canvas>
  );
}

export default App;
