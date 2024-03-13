import { Hands, VRButton, XR, Controllers } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { Suspense, useMemo } from 'react';
import { Vector3 } from '@dimforge/rapier3d-compat';



const GOLDENRATIO = 1.61803398875;


function Frame({ ...props }) {
    const scale = props.scale ? props.scale : [1, GOLDENRATIO, 0.05];
    return (
        <mesh
            {...props}
            scale={scale}>
            <boxGeometry />

            <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
            <mesh scale={[0.93, 0.93, 0.9]} position={[0, 0, 0.2]}>
                <boxGeometry />
                <meshBasicMaterial toneMapped={false} fog={false} />
            </mesh>
        </mesh>
    )
}

function FrameVideo({ url, ...props }: { url: string, rotation?: any, position?: [number, number, number], scale?: [number, number, number] }) {
    const texture = drei.useVideoTexture(url);
    const videoPos: [number, number, number] | undefined = props.position
        ? [props.position[0] + Math.sin(props.rotation[1] * Math.PI / 4) * 0.05, props.position[1], props.position[2] + Math.cos(props.rotation[1] * Math.PI / 4) * 0.05]
        : undefined;
    const scale = props.scale ? props.scale : [GOLDENRATIO, 1, 0.05] as [number, number, number];
    return (
        <>
            <Frame scale={scale} {...props}>
            </Frame>
            <mesh {...props} position={videoPos}>
                <planeGeometry args={[scale[0] * 0.95, scale[1] * 0.95]} />
                <meshBasicMaterial map={texture} />
            </mesh>
        </>
    )
}
function App() {
    return (
        <>
            <VRButton />
            <drei.KeyboardControls
                map={[
                    { name: "forward", keys: ["ArrowUp", "w", "W"] },
                    { name: "backward", keys: ["ArrowDown", "s", "S"] },
                    { name: "left", keys: ["ArrowLeft", "a", "A"] },
                    { name: "right", keys: ["ArrowRight", "d", "D"] },
                ]}>
                <Canvas>
                    <drei.Stars radius={500} depth={100} count={1000} factor={5} />
                    <fog attach="fog" args={['#202025', 0, 80]} />
                    <Frame position={[10, 0, 0.5]} />
                    <FrameVideo url="/10.mp4" position={[-3, 0, 1]} rotation={[0, 0.9, 0]} />
                    <drei.Text3D
                        position={[-2, 1, -1.5]}
                        font="/Inter_Bold.json"
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.02}
                        bevelThickness={0.1}
                        height={0.5}
                        scale={[1, 1, 0.25]}
                        size={0.4}
                        lineHeight={0.5}>
                        {`Larry's Portfolio`}
                        <meshNormalMaterial />
                    </drei.Text3D>

                    <drei.Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                        <meshStandardMaterial attach="material" color="lightblue" />
                    </drei.Plane>

                    <ambientLight intensity={0.25} />
                    <pointLight castShadow position={[0, 5, 10]} intensity={0.5} />

                    <XR>
                        <SmoothLocomotion />
                        <SnapRotation />
                        <Controllers />
                        <Hands />
                    </XR>
                </Canvas >
            </drei.KeyboardControls>
            <drei.Loader />
        </>
    )

}
export default App;
