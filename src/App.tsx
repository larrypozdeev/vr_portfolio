import { Hands, VRButton, XR, Controllers } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { Suspense } from 'react';
import { Frame, FrameImage, FrameVideo } from './Frame';
import React from 'react';
import { Text3D } from '@react-three/drei';

function DefaultScene(props: any) {
    let turnedRotation = [props.rotation[0], props.rotation[1] + Math.PI / 6, props.rotation[2]] as [number, number, number];
    let textPosition = [props.position[0], -0.25, props.position[2]] as [number, number, number];
    return (
        <>
            <drei.Center right position={textPosition} rotation={props.rotation}>
                <drei.Text3D
                    position={props.position}
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

function MainScene({ children }: { children: React.ReactNode }) {
    let i = 0;
    let radius = 20;
    return (
        <>
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

            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    // position in a circle
                    // there's no children props to be accessed
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
            <fog attach="fog" args={['#202025', 0, 80]} />

            <drei.Plane receiveShadow args={[200, 200]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                <meshStandardMaterial attach="material" color="lightblue" />
            </drei.Plane>

            <drei.SoftShadows />
            <drei.BakeShadows />
            <drei.ShadowAlpha />
            <drei.Environment preset="night" shadow-mapSize={2048} />
            <directionalLight position={[0, 10, 10]} intensity={0.5} castShadow shadow-mapSize={2048} />
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
function App() {
    return (
        <>
            <VRButton />
            <Canvas shadows camera={{ position: [0, 3, 0] }}>
                <EnvSettings />

                <MainScene>
                    <WebScene />
                    <GameDevScene />
                    <DataWorkScene />
                    <LowLevelLanguageScene />
                </MainScene>

                <XRSettings />
            </Canvas >
            <drei.Loader />
        </>
    )

}
export default App;
