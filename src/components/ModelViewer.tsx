import { Suspense } from "react";
import { Canvas } from '@react-three/fiber'
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from '@react-three/fiber'
import {
    useGLTF,
    useFBX,
    OrbitControls,
    Html,
    useProgress,
} from "@react-three/drei";
import ModelViewerImage from './ModelViewerImage';


type ModelProps = {
    modelUrl: string
}

type ModelViewerProps = {
    modelData: {
        url: string,
        extension: string
    };
};

function GLTFModel({ modelUrl }: ModelProps) {
    const gltf = useGLTF(modelUrl);
    return <primitive object={gltf.scene} />;
}

function OBJModel({ modelUrl }: ModelProps) {
    const obj = useLoader(OBJLoader, modelUrl)
    return <primitive object={obj} />
}

function FBXModel({ modelUrl }: ModelProps) {
    const fbx = useFBX(modelUrl)
    return <primitive object={fbx} />
}

function Loader() {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>
}

function ModelViewer({ modelData }: ModelViewerProps) {
    const modelUrl = modelData?.url;
    const extension = modelData?.extension;

    console.log(modelData, "modelData")
    console.log(modelUrl, "modelUrl")

    return (
        <Canvas camera={{ position: [0, 0, 3], near: 0.1 }} >
            <ambientLight />
            <Suspense fallback={<Loader />}>
                <mesh position={[0, -1, 0]}>
                    {extension?.toLowerCase() === 'glb' && <GLTFModel modelUrl={modelUrl} />}
                    {extension?.toLowerCase() === 'fbx' && <FBXModel modelUrl={modelUrl} />}
                    {extension?.toLowerCase() === 'obj' && <OBJModel modelUrl={modelUrl} />}
                    {['webp', 'png', 'jpg'].includes(extension?.toLowerCase()) && (
                        <ModelViewerImage imageUrl={modelUrl} />
                    )}
                </mesh>
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}

export default ModelViewer
