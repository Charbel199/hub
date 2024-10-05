import { EffectComposer, Bloom } from '@react-three/postprocessing';
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { PerformanceMonitor } from '@react-three/drei'; // Import PerformanceMonitor here
import Model from './components/model';
import CameraController from './controller/camera_position_controller';
import CameraRotationController from './controller/camera_rotation_controller';
import './App.css'; // Styles for full screen

function App() {
  // Initial dpr set to 2 for high quality
  const [dpr, setDpr] = useState(1);

  return (
    <Suspense fallback={<span>loading...</span>}>
      <Canvas 
        dpr={dpr} 
        shadows 
        resize={{ scroll: false }} 
        style={{ backgroundColor: "black" }} 
        camera={{ position: [0, 5, 10] }}
      >
        {/* Performance monitor placed inside Canvas */}
        <PerformanceMonitor 
          factor={1}  // Start from the highest quality
          onChange={({ factor, fps }) => {
            // Log performance metrics to the console
            console.log(`Performance Factor: ${factor}`);
            console.log(`Frames per Second (FPS): ${fps}`);
            
            // Adjust dpr based on performance factor
            setDpr(Math.floor(0.5 + 1.5 * factor));
            console.log("New DPR: ",Math.floor(0.5 + 1.5 * factor))
          }}
          flipflops={3} // Fallback after 3 performance dips
          onFallback={() => {
            console.log("Performance fell back to lowest possible dpr (1)");
            setDpr(1); // Set baseline to 1 when performance is consistently low
          }}
        />
        
        <CameraController />
        <CameraRotationController />
        <pointLight position={[0, 1.5, 0]} intensity={1} />
        <Model />

        {/* Uncomment OrbitControls if needed */}
        {/* <OrbitControls /> */}
        <Stats showPanel={0} /> {/* FPS and performance metrics */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.3} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}

export default App;
