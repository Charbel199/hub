// src/App.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Model from './components/model';
import CameraController from './controller/camera_position_controller';
import CameraRotationController from './controller/camera_rotation_controller';
import './App.css'; // Styles for full screen

function App() {

  return (
    <Canvas shadows resize={{ scroll: false }} style={{backgroundColor:"black"}}camera={{position: [0, 5, 10]}}>
      <CameraController />
      <CameraRotationController />
      <pointLight castShadow  position={[0, 1.5, 0]} intensity={1} />
      <Model />

      {/* <OrbitControls /> */}
      <Stats showPanel={0} /> {/* FPS and performance metrics */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.3} />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
