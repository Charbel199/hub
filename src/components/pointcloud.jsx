import React, { useEffect, useState } from 'react';
import { PLYLoader } from 'three-stdlib';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

const Pointcloud = ({ filePath }) => {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    const loader = new PLYLoader();
    loader.load(filePath, (loadedGeometry) => {
      // Ensure vertex colors are being used (if available in the PLY)
      console.log(loadedGeometry.attributes.color.array)
      // Normalize color attribute if it exists
      if (loadedGeometry.hasAttribute('color')) {
        const colors = loadedGeometry.attributes.color.array;
        // for (let i = 0; i < colors.length; i += 3) {
        //   colors[i] *= 255;      // Red
        //   colors[i + 1] *= 255;  // Green
        //   colors[i + 2]  *= 255;  // Blue
        // }
        loadedGeometry.attributes.color.needsUpdate = true;

      }
      loadedGeometry.computeVertexNormals();
      console.log(loadedGeometry.attributes.color.array)
      // Calculate the bounding box to center the geometry
      const boundingBox = new THREE.Box3().setFromObject(new THREE.Points(loadedGeometry));
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      loadedGeometry.translate(-center.x, -center.y, -center.z);

      setGeometry(loadedGeometry);
    });
  }, [filePath]);

  if (!geometry) return null;

  return (
    <points>
      <bufferGeometry attach="geometry" {...geometry} />
      <pointsMaterial
        attach="material"
        vertexColors={true} // Use vertex colors provided by the PLY file
        size={0.01} // Adjust point size as needed
      />
    </points>
  );
};
export default Pointcloud;
