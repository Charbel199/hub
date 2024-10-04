import React, { useState, useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CameraRotationController = () => {
  const { camera } = useThree()
  const rotationSpeed = 0.002  // Speed of camera rotation
  const maxPitch = Math.PI / 2 - 0.0872665  // Limit pitch to 85 degrees (in radians)

  const [isRotating, setIsRotating] = useState(false)  // Whether the camera is rotating
  const mousePosition = useRef({ x: 0, y: 0 })  // Initial mouse position

  const pitchQuaternion = useRef(new THREE.Quaternion())  // For pitch rotation (up-down)
  const yawQuaternion = useRef(new THREE.Quaternion())  // For yaw rotation (left-right)

  const currentPitch = useRef(0)  // Track the current pitch angle

  // Handle mouse down events for left-click rotation
  const handleMouseDown = (event) => {
    if (event.button === 0) {  // Left click
      setIsRotating(true)
      mousePosition.current = { x: event.clientX, y: event.clientY }  // Store initial mouse position
    }
  }

  // Handle mouse up events to stop rotation
  const handleMouseUp = (event) => {
    if (event.button === 0) {  // Left click
      setIsRotating(false)
    }
  }

  // Handle mouse move events to rotate the camera
  const handleMouseMove = (event) => {
    if (isRotating) {
      const deltaX = event.clientX - mousePosition.current.x
      const deltaY = event.clientY - mousePosition.current.y
      mousePosition.current = { x: event.clientX, y: event.clientY }  // Update mouse position

      // Yaw (left-right rotation) around the world Y-axis
      yawQuaternion.current.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -deltaX * rotationSpeed)

      // Pitch (up-down rotation) around the camera's local X-axis, clamped to avoid flipping
      const newPitch = currentPitch.current - deltaY * rotationSpeed
      const clampedPitch = Math.max(-maxPitch, Math.min(maxPitch, newPitch))
      pitchQuaternion.current.setFromAxisAngle(new THREE.Vector3(1, 0, 0), clampedPitch - currentPitch.current)
      currentPitch.current = clampedPitch  // Update current pitch

      // Apply the rotations using quaternions
      camera.quaternion.multiplyQuaternions(yawQuaternion.current, camera.quaternion)  // Apply yaw
      camera.quaternion.multiplyQuaternions(camera.quaternion, pitchQuaternion.current)  // Apply pitch
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isRotating])

  return null
}

export default CameraRotationController
