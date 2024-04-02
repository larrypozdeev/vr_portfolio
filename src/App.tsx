import { Hands, VRButton, XR, Controllers } from '@react-three/xr'

import { Canvas, useThree } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three';
import { Suspense, useState } from 'react';
import React, { useRef, useMemo, useEffect } from 'react';
import { MoonSurface, Earth, Terminal } from './Objects';


function useTerrainHeight(terrainRef: any, position: [number, number, number]) {
    console.log(terrainRef.current);
    return useMemo(() => {
        if (!terrainRef.current) return 0;
        console.log('hi');
        const [x, , z] = position;
        const raycaster = new THREE.Raycaster(new THREE.Vector3(x, 1000, z), new THREE.Vector3(0, -1, 0));
        const intersects = raycaster.intersectObject(terrainRef.current);

        return intersects.length > 0 ? intersects[0].point.y : 0;
    }, [terrainRef, position]);
}
function DefaultScene(props: any) {
    let turnedRotation = [props.rotation[0], props.rotation[1] + Math.PI / 6, props.rotation[2]] as [number, number, number];
    let textPosition = [props.position[0] + 5, -0.25, props.position[2]] as [number, number, number];

    return (
        <>
            <drei.Center right position={textPosition} rotation={props.rotation}>
                <RigidBody>
                    <drei.Text3D
                        position={[0, 0, 0]}
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
                        {props.name}
                        <meshStandardMaterial color={"#eb7734"} />
                    </drei.Text3D>
                </RigidBody>
            </drei.Center>
            <Suspense fallback={"10.mp4"}>

                <Terminal position={[props.position[0], props.position[1] - 0.75, props.position[2]]} rotation={props.rotation} />
                <drei.Preload all />
            </Suspense>
        </>
    )
}
function WebScene(props: any) {
    return (
        <>
            <DefaultScene name="Web" url="/10.mp4" {...props} />
        </>
    )
}

function GameDevScene(props: any) {
    return (
        <>
            <DefaultScene name="Game Dev" url="/10.mp4" {...props} />
        </>
    )
}

function DataWorkScene(props: any) {
    return (
        <>
            <DefaultScene name="Data Work" url="/10.mp4" {...props} />
        </>
    )
}
function LowLevelLanguageScene(props: any) {
    return (
        <>
            <DefaultScene name="Low Level Language" url="/10.mp4" {...props} />
        </>
    )
}

function MainScene({ children }: { children: React.ReactNode }) {
    let i = 0;
    let radius = 22;
    // moon surface is the terrain mesh

    const [position, setPosition] = useState([0, 0, 0] as [number, number, number]);

    const terrainRef = useRef(null); // ref to the terrain mesh

    const terrainHeight = useTerrainHeight(terrainRef, position);

    useEffect(() => {
        console.log(terrainHeight);
    }, [terrainHeight]);

    return (
        <>
            <MoonSurface name='terrain' ref={terrainRef} setPosition={setPosition} position={[0, 0, 0]} />

            {'Portfolio'.split('').map((letter, index) => {
                return (
                    <RigidBody key={index} colliders='cuboid' position={[index * 0.5, 3, 5]}>
                        <drei.Text3D
                            position={[0, 0, 0]}
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
                            {letter}
                            <meshStandardMaterial color={"#eb7734"} />
                        </drei.Text3D>
                    </RigidBody>
                )
            })}

            {React.Children.map(children, (child) => {
                let position = [
                    Math.sin(i * Math.PI / 2) * radius,
                    1,
                    Math.cos(i * Math.PI / 2) * radius
                ];

                if (React.isValidElement(child)) {
                    let rotation = [0, i * Math.PI / 2 + Math.PI, 0];
                    i += 1;
                    return React.cloneElement(child, {
                        ...child.props,
                        position: position,
                        rotation: rotation
                    })
                }
            })}
        </>
    )
}
function EnvSettings() {
    return (
        <>
            <drei.OrbitControls />
            <drei.Stars radius={200} depth={100} count={1000} factor={5} />
            <drei.SoftShadows />
            <drei.ShadowAlpha />
            <drei.Environment preset="night" shadow-mapSize={2048} />
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

            <Canvas shadows camera={{ position: [0, 5, 0] }}>
                <Suspense fallback={<Loader />}>
                    <Earth position={[200, 250, 0]} scale={[10, 10, 10]} />
                    <Physics gravity={[0, -1.62, 0]} debug >
                        <EnvSettings />

                        <MainScene>
                            <WebScene />
                            <GameDevScene />
                            <DataWorkScene />
                            <LowLevelLanguageScene />
                        </MainScene>

                        <XRSettings />
                    </Physics>
                </Suspense>
                <drei.Preload all />
            </Canvas >
        </>
    )

}
export default App;
