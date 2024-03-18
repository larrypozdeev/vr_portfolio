import { Hands, VRButton, XR, Controllers } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { Suspense } from 'react';
import { Frame, FrameImage, FrameVideo } from './Frame';


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

                <Canvas shadows>
                    <drei.Stars radius={500} depth={100} count={1000} factor={5} />
                    <directionalLight position={[0, 10, 10]} intensity={0.5} castShadow shadow-mapSize={1024} />
                    <fog attach="fog" args={['#202025', 0, 80]} />
                    <Frame position={[10, 2, 0.5]} />
                    <Suspense fallback={null}>
                        <FrameVideo url="/10.mp4" position={[-3, 2, 1]} rotation={[0, 0.9, 0]} />
                    </Suspense>
                    <Suspense fallback={null}>
                        <FrameVideo url="/10.mp4" position={[3, 2, 1]} rotation={[0, -0.9, 0]} />
                    </Suspense>
                    <Suspense fallback={null}>
                        <FrameVideo url="/10.mp4" position={[0, 2, 5]} rotation={[0, Math.PI, 0]} />
                    </Suspense>
                    <Suspense fallback={null}>
                        <FrameImage url="/10.jpg" position={[-3, 2, -3]} rotation={[0, 0.9, 0]} />
                    </Suspense>
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
                        lineHeight={0.5}
                        castShadow>
                        {`Larry's Portfolio`}
                        <meshStandardMaterial color={"#eb7734"} />
                    </drei.Text3D>

                    <drei.Plane receiveShadow args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                        <meshStandardMaterial attach="material" color="lightblue" />
                    </drei.Plane>

                    <ambientLight intensity={0.2} />

                    <XR>
                        <SmoothLocomotion />
                        <SnapRotation />
                        <Controllers />
                        <Hands />
                    </XR>
                    <drei.SoftShadows />
                </Canvas >
            </drei.KeyboardControls>
            <drei.Loader />
        </>
    )

}
export default App;
