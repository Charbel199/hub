import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Model from './components/model';
import CameraController from './controller/camera_position_controller';
import CameraRotationController from './controller/camera_rotation_controller';
import Box from './components/Box'; // Assuming you have a Box component
import './App.css';

function App() {

  // Define your boxes here
  const boxes = [
    { position: [0, 1, 0], size: [1, 1, 1] },
    { position: [2, 1, 2], size: [1, 1, 1] },
    // Add more boxes as needed
  ];

  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas
        dpr={1}
        shadows
        resize={{ scroll: false }}
        style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}
        camera={{ position: [0, 5, 10] }}
      >


        {/* Pass boxes to CameraController */}
        <CameraController boxes={boxes} />
        <CameraRotationController />
        <pointLight position={[0, 1.5, 0]} intensity={1} />
        <Model />

        {/* Render boxes */}
        {boxes.map((box, index) => (
          <Box key={index} position={box.position} size={box.size} />
        ))}

        {/* <OrbitControls /> */}
        <Stats showPanel={0} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.3} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}

export default App;
