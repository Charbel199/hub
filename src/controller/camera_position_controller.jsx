import React, { useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CameraController = () => {
  const { camera } = useThree()
  const acceleration = 0.25  // Acceleration rate
  const friction = 0.05  // Friction (deceleration rate)
  const maxSpeed = 4  // Maximum speed (adjust for faster movement)
  const bobbingAmplitude = 0.02  // How much the camera bobs up and down
  const bobbingFrequency = 20  // How fast the bobbing happens

  const velocity = useRef(new THREE.Vector3(0, 0, 0))  // Store velocity for x and z directions
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false
  })

  const [isMoving, setIsMoving] = useState(false)
  const bobbingOffset = useRef(0) // Used to simulate head bobbing

  // Handle keydown events
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'w':
        setMovement((prev) => ({ ...prev, forward: true }))
        break
      case 's':
        setMovement((prev) => ({ ...prev, backward: true }))
        break
      case 'a':
        setMovement((prev) => ({ ...prev, left: true }))
        break
      case 'd':
        setMovement((prev) => ({ ...prev, right: true }))
        break
      default:
        break
    }
  }

  // Handle keyup events
  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'w':
        setMovement((prev) => ({ ...prev, forward: false }))
        break
      case 's':
        setMovement((prev) => ({ ...prev, backward: false }))
        break
      case 'a':
        setMovement((prev) => ({ ...prev, left: false }))
        break
      case 'd':
        setMovement((prev) => ({ ...prev, right: false }))
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame((state, delta) => {
    const direction = new THREE.Vector3()

    // Update the velocity based on movement and apply acceleration
    if (movement.forward) {
      velocity.current.z = Math.max(velocity.current.z - acceleration, -maxSpeed)
    } else if (movement.backward) {
      velocity.current.z = Math.min(velocity.current.z + acceleration, maxSpeed)
    } else {
      // Apply friction (deceleration) when not moving forward or backward
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, 0, friction)
    }

    if (movement.left) {
      velocity.current.x = Math.max(velocity.current.x - acceleration, -maxSpeed)
    } else if (movement.right) {
      velocity.current.x = Math.min(velocity.current.x + acceleration, maxSpeed)
    } else {
      // Apply friction (deceleration) when not moving left or right
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0, friction)
    }

    // Apply movement based on velocity
    direction.copy(velocity.current).multiplyScalar(delta)  // Multiply by delta for smooth movement
    direction.applyQuaternion(camera.quaternion)  // Make sure the movement is relative to the camera's direction
    camera.position.add(direction)

    // Simulate head bobbing when moving
    const isMovingNow = movement.forward || movement.backward || movement.left || movement.right
    if (isMovingNow) {
      bobbingOffset.current += bobbingFrequency * delta
      camera.position.y = 1 + Math.sin(bobbingOffset.current) * bobbingAmplitude
    } else {
      // Reset head bobbing when not moving
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1, 0.1)
      bobbingOffset.current = 0
    }

    setIsMoving(isMovingNow)  // Update movement status
  })

  return null
}

export default CameraController
