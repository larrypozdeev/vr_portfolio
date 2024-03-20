import { Hands, VRButton, XR, Controllers } from '@react-three/xr'

import { Canvas } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { FrameVideo } from './Frame';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'

import { Suspense } from 'react';
import React from 'react';

function DefaultScene(props: any) {
    let turnedRotation = [props.rotation[0], props.rotation[1] + Math.PI / 6, props.rotation[2]] as [number, number, number];
    let textPosition = [props.position[0], -0.25, props.position[2]] as [number, number, number];

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
                <FrameVideo url={props.url} position={props.position} rotation={turnedRotation} />
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

function MoonSurface(props: any) {
    const { nodes, materials } = drei.useGLTF('/scene.glb') as any;

    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={60}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Petavius_ZB_LP_1_0.geometry}
                    material={materials.material}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Petavius_ZB_LP_2_0.geometry}
                    material={materials.material_1}
                />
            </group>
        </group>
    )
}
drei.useGLTF.preload('/scene.glb');

function MainScene({ children }: { children: React.ReactNode }) {
    let i = 0;
    let radius = 20;
    return (
        <>
            <RigidBody name='world' colliders="trimesh" position={[0, 0, 0]}>
                <MoonSurface position={[0, 0, 0]} />
            </RigidBody>

            {'Portfolio'.split('').map((letter, index) => {
                return (
                    <RigidBody key={index} colliders='cuboid' position={[index * 0.5, 3, 0]}>
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
                if (React.isValidElement(child)) {
                    let position = [
                        Math.sin(i * Math.PI / 2) * radius,
                        1,
                        Math.cos(i * Math.PI / 2) * radius
                    ];
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
            <fog attach="fog" args={['#202025', 0, 60]} />
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
                    <Physics>
                        <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
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
