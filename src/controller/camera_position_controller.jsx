import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CameraController = ({ boxes }) => {
  const { camera } = useThree();
  const acceleration = 0.25;
  const friction = 0.05;
  const maxSpeed = 4;
  const bobbingAmplitude = 0.02;
  const bobbingFrequency = 20;

  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const bobbingOffset = useRef(0);

  const handleKeyDown = (event) => {
    switch (event.key.toLowerCase()) {
      case 'w':
        setMovement((prev) => ({ ...prev, forward: true }));
        break;
      case 's':
        setMovement((prev) => ({ ...prev, backward: true }));
        break;
      case 'a':
        setMovement((prev) => ({ ...prev, left: true }));
        break;
      case 'd':
        setMovement((prev) => ({ ...prev, right: true }));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key.toLowerCase()) {
      case 'w':
        setMovement((prev) => ({ ...prev, forward: false }));
        break;
      case 's':
        setMovement((prev) => ({ ...prev, backward: false }));
        break;
      case 'a':
        setMovement((prev) => ({ ...prev, left: false }));
        break;
      case 'd':
        setMovement((prev) => ({ ...prev, right: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    const direction = new THREE.Vector3();

    // Update the velocity based on movement and apply acceleration
    if (movement.forward) {
      velocity.current.z = Math.max(velocity.current.z - acceleration, -maxSpeed);
    } else if (movement.backward) {
      velocity.current.z = Math.min(velocity.current.z + acceleration, maxSpeed);
    } else {
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, 0, friction);
    }

    if (movement.left) {
      velocity.current.x = Math.max(velocity.current.x - acceleration, -maxSpeed);
    } else if (movement.right) {
      velocity.current.x = Math.min(velocity.current.x + acceleration, maxSpeed);
    } else {
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0, friction);
    }

    // Calculate the proposed movement based on velocity
    direction.copy(velocity.current).multiplyScalar(delta);
    direction.applyQuaternion(camera.quaternion);

    // Calculate the proposed new camera position
    const proposedPosition = camera.position.clone().add(direction);

    // Create a bounding sphere for the camera at the proposed position
    const cameraBoundingSphere = new THREE.Sphere(proposedPosition, 0.5); // Adjust radius as needed

    // Check for collisions on x, y, z axes separately
    let collisionX = false;
    let collisionY = false;
    let collisionZ = false;

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      const boxPosition = new THREE.Vector3(...box.position);
      const boxSize = new THREE.Vector3(...box.size);
      const boxMin = boxPosition.clone().sub(boxSize.clone().multiplyScalar(0.5));
      const boxMax = boxPosition.clone().add(boxSize.clone().multiplyScalar(0.5));
      const boxBoundingBox = new THREE.Box3(boxMin, boxMax);

      // Check for collisions along x, y, and z independently
      if (boxBoundingBox.intersectsSphere(cameraBoundingSphere)) {
        // Check X-axis collision
        const proposedX = new THREE.Vector3(proposedPosition.x, camera.position.y, camera.position.z);
        if (boxBoundingBox.containsPoint(proposedX)) {
          collisionX = true;
        }

        // Check Z-axis collision
        const proposedZ = new THREE.Vector3(camera.position.x, camera.position.y, proposedPosition.z);
        if (boxBoundingBox.containsPoint(proposedZ)) {
          collisionZ = true;
        }

        // Check Y-axis (if you have vertical movement, otherwise ignore)
        const proposedY = new THREE.Vector3(camera.position.x, proposedPosition.y, camera.position.z);
        if (boxBoundingBox.containsPoint(proposedY)) {
          collisionY = true;
        }
      }
    }

    // Adjust velocity based on the collision on specific axes
    if (!collisionX) {
      camera.position.x = proposedPosition.x; // Move along X if no collision
    } else {
      velocity.current.x = 0; // Stop X-axis movement if collision
    }

    if (!collisionZ) {
      camera.position.z = proposedPosition.z; // Move along Z if no collision
    } else {
      velocity.current.z = 0; // Stop Z-axis movement if collision
    }

    if (!collisionY) {
      camera.position.y = proposedPosition.y; // Move along Y if no collision
    } else {
      velocity.current.y = 0; // Stop Y-axis movement if collision (if relevant)
    }

    // Simulate head bobbing when moving
    const isMovingNow = movement.forward || movement.backward || movement.left || movement.right;
    if (isMovingNow && !collisionX && !collisionZ) {
      bobbingOffset.current += bobbingFrequency * delta;
      camera.position.y = 1 + Math.sin(bobbingOffset.current) * bobbingAmplitude;
    } else {
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1, 0.1);
      bobbingOffset.current = 0;
    }
  });

  return null;
};

export default CameraController;
