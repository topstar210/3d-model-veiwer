import React from 'react';
import { TextureLoader } from 'three';

type ImageModelProps = {
  imageUrl: string;
};

const ModelViewerImage: React.FC<ImageModelProps> = ({ imageUrl }) => {
    console.log("enter ")
    console.log(imageUrl , "enter")
  const texture = new TextureLoader().load(imageUrl);
  console.log(texture)
  return (
    <mesh position={[0, 0, 0]}>
      <planeBufferGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default ModelViewerImage;