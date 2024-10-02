import React from 'react';

function Sphere() {
  return (
    <mesh position={[2, 1, 0]}>
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default Sphere;
