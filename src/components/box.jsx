import React, { useState } from 'react';

function Box() {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      position={[0, 1, 0]}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}  // Toggles scale on click
      onPointerOver={() => setHovered(true)}  // Changes color on hover
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default Box;
