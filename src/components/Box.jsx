import React, { forwardRef } from 'react';

const Box = forwardRef(({ position, size }, ref) => {
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
});

export default Box;
