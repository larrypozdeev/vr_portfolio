import { Hands, VRButton, XR, Controllers } from '@react-three/xr'

import { Canvas } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import Player from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { Physics, RigidBody } from '@react-three/rapier'
import { Suspense, useEffect, useMemo } from 'react';
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
                            castShadow
                            receiveShadow>
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
                    <Terminal videos={props.videos} descriptions={props.descriptions} receiveShadow castShadow />
                </Suspense>
            </group>
        </>
    )
}

function WebScene() {
    const videos = ['/web1.mp4'];
    const descriptions = [
        "(work in progress)"
    ];
    return (
        <>
            <group position={[-15, 0, 6]} rotation-y={Math.PI/2}>
                <DefaultTerminal
                    descriptions={descriptions}
                    videos={videos}
                    position={[0, 0, 0]} />
                <DefaultText text="Web Dev" position={[0, -0.2, 1]} />
            </group>
        </>
    )
}

function GameDevScene() {
    const videos = ['/gamedev1.mp4', '/gamedev2.mp4', '/gamedev3.mp4'];
    const descriptions = [
        "[UE5]Sci-fi FPS game in which you play as a survivor of a crashed spaceship...",
        "[UE5]Fast-paced VR FPS game where one must survive rounds of enemies in a Colosseum style ring",
        "[UE5]Labyrinth game which involves getting through obstacles and killing hordes of enemies"
    ]

    return (
        <>
            <group position={[5, 0.2, -15]}>
                <DefaultTerminal
                    descriptions={descriptions}
                    videos={videos}
                    position={[0, 0, 0]} />
                <DefaultText text="Game Dev" position={[0, -0.2, 1]} />
            </group>
        </>
    )
}

function DataWorkScene() {
    const videos = ['/data1.mp4'];
    const descriptions = [
        "[JS]Calculates number of pipes of different diameters per container based on the given length. Includes calculation of pipes that fit inside each other",
    ]
    return (
        <>
            <group position={[6, 0.1, 20]} rotation-y={Math.PI} >
                <DefaultTerminal
                    videos={videos}
                    position={[0, 0, 0]}
                    descriptions={descriptions}
                />
                <DefaultText text="Data  Work" position={[0, 0, 1]} />
            </group>
        </>
    )
}
function LowLevelLanguageScene() {
    const videos = ['/default.mp4'];
    const descriptions = ["[C++, group project] PPM image editor. Implements image filters(blur, sharpening, emboss, edge detection), scaling, rotation, translation and grayscale"]

    return (
        <>
            <group position={[22, 0, 6]} rotation-y={-Math.PI / 2} >
                <DefaultTerminal
                    videos={videos}
                    position={[0, 0, 0]}
                    descriptions={descriptions}
                />
                <DefaultText text="Low Level" position={[0, 0, 1]} />
            </group>

        </>
    )
}

function MainScene() {
    return (
        <>
            <GameDevScene />
            <WebScene />
            <LowLevelLanguageScene />
            <DataWorkScene />
            <MoonSurface receiveShadows name='terrain' position={[0, 0, 0]} />
        </>
    )
}
function EnvSettings() {
    return (
        <>
            <drei.Stars radius={200} depth={100} count={1000} factor={5} />
            <drei.SoftShadows />
            <ambientLight intensity={0.3} />
            <directionalLight position={[0, 100, 100]} intensity={1} castShadow shadow-mapSize={2048} />
        </>
    );
}
function XRSettings() {
    return (
        <>
            <Hands />
            <Controllers />
            <SnapRotation />
            <Player position={[0, 5, 2]} />
        </>
    )
}
function Loader() {
    const { progress } = drei.useProgress();
    useEffect(() => {
        drei.useGLTF.preload('/gamedev1.mp4');
        drei.useGLTF.preload('/gamedev2.mp4');
        drei.useGLTF.preload('/gamedev3.mp4');
        drei.useGLTF.preload('/data1.mp4');
        drei.useGLTF.preload('/web1.mp4');
        drei.useGLTF.preload('/default.mp4');
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
                    <XR>
                        <Suspense fallback={<Loader />}>
                            <Earth position={[500, 450, 0]} rotate={[1, 1, 1]} scale={[25, 25, 25]} />
                            <Physics gravity={[0, -1.62, 0]} >
                                <XRSettings />
                                <EnvSettings />
                                <MainScene />
                            </Physics>
                            <drei.Preload all />
                            <PointerLockControls />
                        </Suspense>
                    </XR>
                </Canvas >
            </KeyboardControls>
        </>
    )

}
export default App;
