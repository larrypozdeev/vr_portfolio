import { Hands, VRButton, XR, Controllers } from '@react-three/xr'

import { Canvas } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useState } from 'react';
import React, { useRef } from 'react';
import { MoonSurface, Earth, Terminal } from './Objects';
import { Button } from './Button';


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
                <Terminal position={[0, 0, 0]} videos={props.videos} />
            </group>
        </>
    )
}

function WebScene(props: any) {
    return (
        <>
        </>
    )
}

function GameDevScene(props: any) {
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

function DataWorkScene(props: any) {
    return (
        <>
        </>
    )
}
function LowLevelLanguageScene(props: any) {
    return (
        <>
        </>
    )
}

function MainScene() {
    // moon surface is the terrain mesh

    const [position, setPosition] = useState([0, 0, 0] as [number, number, number]);
    const terrainRef = useRef(null); // ref to the terrain mesh
    return (
        <>
            <MoonSurface name='terrain' ref={terrainRef} setPosition={setPosition} position={[0, 0, 0]} />
            <GameDevScene />
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
            <drei.OrbitControls enableRotate enableZoom={true} />
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
                <SmoothLocomotion />
                <SnapRotation />
            </XR>
        </>
    )
}
function Loader() {
    const { progress } = drei.useProgress();
    return (
        <drei.Html center>
            <h1 style={{ color: 'white' }}>
                {Math.round(progress)}%&nbsp;loaded
            </h1>
        </drei.Html>
    )
}

function App() {
    return (
        <>
            <VRButton />
            <Canvas shadows>
                <Suspense fallback={<Loader />}>
                    <Earth position={[500, 550, 0]} rotate={[1, 1, 1]} scale={[25, 25, 25]} />
                    <Physics gravity={[0, -1.62, 0]} >
                        <EnvSettings />
                        <MainScene />
                        <XRSettings />
                    </Physics>
                </Suspense>
                <drei.Preload all />
            </Canvas >
        </>
    )

}
export default App;
