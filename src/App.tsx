import { Hands, VRButton, XR, Controllers } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { Plane } from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { useLocation } from 'wouter';
import * as THREE from 'three';
import getUuid from 'uuid-by-string';

const GOLDENRATIO = 1.61803398875;

function Frames() {
    const [, setLocation] = useLocation();
    const items = [1, 2, 3, 4, 5].map((idx) => ({
        idx
    }));
    return (
        <group
            onPointerMissed={() => setLocation('/')}>
            {items.map((props) => <Frame key={props.idx} {...props} /> /* prettier-ignore */)}
        </group>
    )
}

function Frame({ idx, c = new THREE.Color(), ...props }: { idx: number; c?: THREE.Color }) {
    const name = getUuid(idx.toString());

    return (
        <group {...props}>
            <mesh
                name={name}
                scale={[1, GOLDENRATIO, 0.05]}
                position={[0, GOLDENRATIO / 2, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
                <mesh raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
            </mesh>
        </group>
    )
}

function App() {
    return (
        <>
            <VRButton />
            <Canvas>
                <XR >
                    <Controllers />
                    <Hands />
                    <ambientLight intensity={0.9} />
                    <pointLight position={[10, 10, 10]} />
                    <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                        <meshStandardMaterial attach="material" color="lightblue" />
                    </Plane>
                    <group position={[0, -0.5, 0]}>
                        <Frames />
                    </group>
                    <SmoothLocomotion />
                    <SnapRotation />
                </XR>
            </Canvas>
        </>
    )

}
export default App;
