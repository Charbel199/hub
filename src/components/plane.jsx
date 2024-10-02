import React from 'react';
import { DoubleSide } from 'three'; // Import DoubleSide from three.js

function Plane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="lightgray" side={DoubleSide} /> {/* DoubleSide */}
    </mesh>
  );
}

export default Plane;
