import { Hands, VRButton, XR, Controllers } from '@react-three/xr'

import { Canvas } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import Player from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useEffect, useMemo } from 'react';
import { useRef } from 'react';
import { MoonSurface, Earth, Terminal } from './Objects';
import { KeyboardControls, PointerLockControls } from '@react-three/drei';


function DefaultText(props: any) {
    return (
        <>
            {props.text.split('').map((letter: string, idx: any) => {
                return (
                    <RigidBody colliders={"cuboid"} key={idx}>
                        <drei.Text3D
                            position={[props.position[0] + idx * 0.45, props.position[1], props.position[2]]}
                            font="/Inter_Bold.json"
                            curveSegments={32}
                            bevelEnabled
                            bevelSize={0.02}
                            bevelThickness={0.1}
                            height={0.5}
                            scale={[1, 1, 0.55]}
                            size={0.4}
                            lineHeight={0.5}
                            castShadow>
                            {letter}
                            <meshStandardMaterial color={"#eb7734"} />
                        </drei.Text3D>
                    </RigidBody>
                )
            })}
        </>
    )
}
function DefaultTerminal(props: any) {
    return (
        <>
            <group position={props.position || [0, 0, 0]}>
                <Suspense fallback={null}>
                    <Terminal videos={props.videos}/>
                </Suspense>
            </group>
        </>
    )
}

function WebScene() {
    return (
        <>
        </>
    )
}

function GameDevScene() {
    const videos = ['/gamedev1.mp4', '/gamedev2.mp4', '/gamedev3.mp4'];


    return (
        <>
            <DefaultTerminal
                videos={videos}
                position={[5, 0.2, -15]} />
            <DefaultText text="Game Development" position={[5, -0.1, -14]} />
        </>
    )
}

function DataWorkScene() {
    return (
        <>

        </>
    )
}
function LowLevelLanguageScene() {
    return (
        <>
        </>
    )
}

function MainScene() {
    // moon surface is the terrain mesh

    const terrainRef = useRef(null); // ref to the terrain mesh
    return (
        <>
            <GameDevScene />
            <WebScene />
            <LowLevelLanguageScene />
            <DataWorkScene />
            <MoonSurface name='terrain' ref={terrainRef} position={[0, 0, 0]} />
        </>
    )
}
function EnvSettings() {
    return (
        <>
            <drei.Stats />
            <drei.Stars radius={200} depth={100} count={1000} factor={5} />
            <drei.SoftShadows />
            <drei.ShadowAlpha />
            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 10, 10]} intensity={1.5} castShadow shadow-mapSize={2048} />
        </>
    );
}
function XRSettings() {
    return (
        <>
            <XR>
                <Hands />
                <Controllers />
                <SnapRotation />
                <Player position={[0, 5, 2]} />
            </XR>
        </>
    )
}
function Loader() {
    const { progress } = drei.useProgress();
    useEffect(() => {
        drei.useGLTF.preload('/gamedev1.mp4');
        drei.useGLTF.preload('/gamedev2.mp4');
        drei.useGLTF.preload('/gamedev3.mp4');
    }, []);


    return (

        <drei.Html center>
            <h1 style={{ color: 'white' }}>
                {Math.round(progress)}%&nbsp;loaded
            </h1>
        </drei.Html>
    )
}

function App() {
    enum Controls {
        forward = 'forward',
        back = 'back',
        left = 'left',
        right = 'right',
        jump = 'jump',
    }

    const map = useMemo<any>(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    ], [Controls.forward, Controls.back, Controls.left, Controls.right]) as any

    return (
        <>
            <VRButton />

            <KeyboardControls map={map}>
                <Canvas shadows >
                    <Suspense fallback={<Loader />}>
                        <Earth position={[500, 550, 0]} rotate={[1, 1, 1]} scale={[25, 25, 25]} />
                        <Physics gravity={[0, -1.62, 0]} >
                            <EnvSettings />
                            <MainScene />
                            <XRSettings />
                        </Physics>
                        <drei.Preload all />
                    </Suspense>
                    <PointerLockControls />
                </Canvas >
            </KeyboardControls>
        </>
    )

}
export default App;
