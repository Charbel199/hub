import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three'; // Ensure THREE is imported for vector calculations
import { PointLightHelper } from 'three'; // Import PointLightHelper
import Model from './components/model';
import CameraController from './controller/camera_position_controller';
import CameraRotationController from './controller/camera_rotation_controller';
import Box from './components/Box'; // Assuming you have a Box component
import './App.css';

function Flashlight() {
  const { camera, scene } = useThree(); // Get the camera and scene from useThree()
  const pointLightRef = useRef();

  useEffect(() => {
    // Create a PointLightHelper and add it to the scene
    if (pointLightRef.current) {
      const lightHelper = new PointLightHelper(pointLightRef.current, 0.1); // 1 is the size of the helper
      scene.add(lightHelper);

      return () => {
        // Clean up the helper when the component unmounts
        scene.remove(lightHelper);
      };
    }
  }, [scene]);

  // Update the position of the PointLight to follow the camera and rotate with it
  useFrame(() => {
    if (pointLightRef.current) {
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);

      // Calculate the right direction (90 degrees offset from camera direction)
      const rightDirection = new THREE.Vector3();
      rightDirection.crossVectors(camera.up, cameraDirection).normalize();

      // Position the light 90 degrees to the right of the camera and slightly ahead
      pointLightRef.current.position.set(
        camera.position.x + rightDirection.x* 0.2 + cameraDirection.x * 0.5, // 0.5 to place slightly ahead
        camera.position.y + rightDirection.y* 0.01-0.2,
        camera.position.z + rightDirection.z* 0.1 + cameraDirection.z * 0.5
      );
    }
  });

  return (
    <pointLight
      ref={pointLightRef}
      intensity={3}        // Adjust intensity as needed
      distance={15}        // How far the light reaches
      decay={2}            // Rate at which the light dims over distance
      color="orange"        // Color of the light
      castShadow           // Enable shadow casting
    />
  );
}

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
        {/* Camera Controllers */}
        <CameraController boxes={boxes} />
        <CameraRotationController />

        {/* Flashlight effect */}
        <Flashlight />

        {/* Render your model */}
        <Model />

        {/* Render boxes */}
        {boxes.map((box, index) => (
          <Box key={index} position={box.position} size={box.size} />
        ))}

        <Stats showPanel={0} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.1} intensity={0.3} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  );
}

export default App;
