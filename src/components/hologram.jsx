import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function Hologram({ modelPath, sounds,  }) {
    
    const [positions, setPositions] = useState(null);
    const [initialPositions, setInitialPositions] = useState(null);
    const [direction, setDirection] = useState(0);
    const [verticesDown, setVerticesDown] = useState(0);
    const [verticesUp, setVerticesUp] = useState(0);
    const [delay, setDelay] = useState(500);
    const [speed, setSpeed] = useState(15);
    const gltf = useGLTF(modelPath);  // Load the GLTF model

    const combineBuffer = (model, bufferName) => {
        let totalCount = 0;
        model.traverse((child) => {
            if (child.isMesh) {
                totalCount += child.geometry.attributes[bufferName].array.length;
            }
        });
        const combined = new Float32Array(totalCount);
        let offset = 0;
        model.traverse((child) => {
            if (child.isMesh) {
                const buffer = child.geometry.attributes[bufferName];
                combined.set(buffer.array, offset);
                offset += buffer.array.length;
            }
        });
        console.log("Combined: ",combined)
        return new THREE.BufferAttribute(combined, 3);
    };

    const create_pointcloud = () => {

        const positionsBuffer = combineBuffer(gltf.scene, 'position');
        setPositions(positionsBuffer);
        setInitialPositions(positionsBuffer.clone());
    
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', positionsBuffer);
        // geometry.setAttribute('initialPosition', positionsBuffer.clone());
        // geometry.attributes.position.setUsage(THREE.DynamicDrawUsage);
    
        const pointsMaterial = new THREE.PointsMaterial({
            size: 1,
            color: "red",
            sizeAttenuation: true // Adjust opacity for the hologram effect
        });
    
        const pointcloud = new THREE.Points(geometry, pointsMaterial);
        return pointcloud
    };


    // pointcloud.scale.set(1, 1, 1); // Adjust scaling for visibility
    // pointcloud.position.set(0, 1, 0); // Adjust position to center the model


    // Handles raising and breaking of the hologram
    // const raiseHologram = () => {
    //     setDirection(1);
    //     setSpeed(5);
    //     setVerticesDown(0);
    //     setDelay(1000);
    // };

    // const breakHologram = () => {
    //     setDirection(-1);
    //     setSpeed(15);
    //     setVerticesUp(0);
    //     setDelay(50);
    //     if (sounds) {
    //         sounds.playHologram();
    //     }
    // };

    // // Animation loop
    // useFrame((state, delta) => {
    //     if (!positions || !initialPositions) return;

    //     const count = positions.count;
    //     let newVerticesDown = verticesDown;
    //     let newVerticesUp = verticesUp;

    //     for (let i = 0; i < count; i++) {
    //         const px = positions.getX(i);
    //         const py = positions.getY(i);
    //         const pz = positions.getZ(i);

    //         if (direction < 0 && py > 0) {
    //             positions.setXYZ(
    //                 i,
    //                 px + 1.5 * (0.50 - Math.random()) * speed * delta * 0.01,
    //                 py + 3.0 * (0.25 - Math.random()) * speed * delta * 0.01,
    //                 pz + 1.5 * (0.50 - Math.random()) * speed * delta * 0.01
    //             );
    //         } else if (direction > 0) {
    //             const ix = initialPositions.getX(i);
    //             const iy = initialPositions.getY(i);
    //             const iz = initialPositions.getZ(i);

    //             positions.setXYZ(
    //                 i,
    //                 px - (px - ix) / Math.abs(px - ix) * speed * delta * (0.85 - Math.random()) * 0.01,
    //                 py - (py - iy) / Math.abs(py - iy) * speed * delta * (1 + Math.random()) * 0.01,
    //                 pz - (pz - iz) / Math.abs(pz - iz) * speed * delta * (0.85 - Math.random()) * 0.01
    //             );
    //         }

    //         // Handle vertex counts and transitions
    //         if (direction < 0 && py <= 0) {
    //             newVerticesDown++;
    //         } else if (direction > 0 && Math.abs(px - initialPositions.getX(i)) < 1) {
    //             newVerticesUp++;
    //         }
    //     }

    //     if (newVerticesDown >= count && delay <= 0) {
    //         raiseHologram();
    //     } else if (newVerticesUp >= count) {
    //         breakHologram();
    //     }

    //     setVerticesDown(newVerticesDown);
    //     setVerticesUp(newVerticesUp);
    //     positions.needsUpdate = true;
    // });

    return (
    
        <primitive object={create_pointcloud()} />
    );
}

export default Hologram;
