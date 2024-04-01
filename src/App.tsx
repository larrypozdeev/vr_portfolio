import { Hands, VRButton, XR, Controllers } from '@react-three/xr'

import { Canvas, useThree } from '@react-three/fiber'
import * as drei from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier'
import * as THREE from 'three';
import { Suspense } from 'react';
import React, { useRef, useMemo } from 'react';

function useTerrainHeight(position:any, terrainMesh:any) {
  const { scene } = useThree();
  const [x, , z] = position;

  // useMemo to avoid recalculating unless dependencies change
  return useMemo(() => {
    // Create a raycaster pointing downwards
    const raycaster = new THREE.Raycaster(new THREE.Vector3(x, 1000, z), new THREE.Vector3(0, -1, 0));
    console.log(raycaster);
    const intersects = raycaster.intersectObject(terrainMesh);
    console.log(intersects);

    // Return the y-coordinate of the first intersection point, or a default value if no intersection
    return intersects.length > 0 ? intersects[0].point.y : 0;
  }, [position, terrainMesh, scene]);
}

function DefaultScene(props: any) {
    let turnedRotation = [props.rotation[0], props.rotation[1] + Math.PI / 6, props.rotation[2]] as [number, number, number];
    let textPosition = [props.position[0]+5, -0.25, props.position[2]] as [number, number, number];

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

                <Terminal position={[props.position[0], props.position[1]-0.75, props.position[2]]} rotation={props.rotation} />
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
function Earth(props: any) {
    const group = useRef();
    const { nodes, materials } = drei.useGLTF('/earth.glb') as any;
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group name="3f0d8c1a7c7c45138e5b99b56838fcb9fbx" rotation={[Math.PI / 2, 0, 0]}>
                        <group name="Object_2">
                            <group name="RootNode">
                                <group name="Earth" rotation={[-Math.PI / 2, 0, 0]}>
                                    <mesh
                                        name="Earth_Material_#50_0"
                                        geometry={nodes['Earth_Material_#50_0'].geometry}
                                        material={materials.Material_50}
                                    />
                                </group>
                                <group name="EarthClouds" rotation={[-Math.PI / 2, -Math.PI / 9, 0]} scale={1.01}>
                                    <mesh
                                        name="EarthClouds_Material_#62_0"
                                        geometry={nodes['EarthClouds_Material_#62_0'].geometry}
                                        material={materials.Material_62}
                                    />
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </group>
        </group>)
}
drei.useGLTF.preload('/earth.glb');

function MoonSurface(props: any) {
    const { nodes, materials } = drei.useGLTF('/scene.glb') as any;

    return (
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={70}>
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


export function Terminal(props: any) {
    const { nodes, materials } = drei.useGLTF('/terminal.glb') as any;

    return (
        <group {...props} dispose={null}>
            <group scale={0.01}>
                <group position={[0, 175.07, -6.003]} rotation={[Math.PI / 3, 0, 0]} scale={100}>
                    <RigidBody colliders="cuboid" type="fixed" >
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Monitor_Material001_0.geometry}
                            material={materials['Material.001']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Monitor_Material005_0.geometry}
                            material={materials['Material.005']}
                        />
                    </RigidBody>
                </group>
                <group position={[0, 168.692, -2.32]} rotation={[Math.PI / 3, 0, 0]} scale={100}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Monitor_Handle_Material001_0.geometry}
                        material={materials['Material.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Monitor_Handle_Material004_0.geometry}
                        material={materials['Material.004']}
                    />
                </group>
                <group
                    position={[0, -2.343, -2.082]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[100.737, 97.421, 97.421]}>

                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Back_Material_0.geometry}
                        material={materials.Material}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Back_Material001_0.geometry}
                        material={materials['Material.001']}
                    />
                </group>
                <RigidBody colliders="cuboid" type="fixed">
                    <group position={[0, -19.616, -45.996]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Air_vents_back_Material001_0.geometry}
                            material={materials['Material.001']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Air_vents_back_Material004_0.geometry}
                            material={materials['Material.004']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Air_vents_back_Material003_0.geometry}
                            material={materials['Material.003']}
                        />
                    </group>
                    <group position={[-24.315, 48.317, -7.466]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Inside_Material001_0.geometry}
                            material={materials['Material.001']}
                        />
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Inside_Material004_0.geometry}
                            material={materials['Material.004']}
                        />
                    </group>
                </RigidBody>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Front_Panel_Material003_0.geometry}
                        material={materials['Material.003']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Front_Panel_Material001_0.geometry}
                        material={materials['Material.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Front_Panel_Material004_0.geometry}
                        material={materials['Material.004']}
                    />
                </group>
                <group position={[0, -102.538, -45.498]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <RigidBody colliders="cuboid" type="fixed">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material002_0.geometry}
                        material={materials['Material.002']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material002_0_1.geometry}
                        material={materials['Material.002']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material002_0_2.geometry}
                        material={materials['Material.002']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material001_0.geometry}
                        material={materials['Material.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material009_0.geometry}
                        material={materials['Material.009']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material003_0.geometry}
                        material={materials['Material.003']}
                    />
                    </RigidBody>
                </group>
                <RigidBody colliders="cuboid" type="fixed">
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Body_Material004_0.geometry}
                        material={materials['Material.004']}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={100}
                    />
                </RigidBody>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Side_panels_Material001_0.geometry}
                    material={materials['Material.001']}
                    position={[0, 7.391, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={100}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Handles_Material002_0.geometry}
                    material={materials['Material.002']}
                    position={[-4.639, 0.262, 7.872]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={100}
                />
            </group>
        </group>
    )
}

drei.useGLTF.preload('/terminal.glb')

function MainScene({ children }: { children: React.ReactNode }) {
    let i = 0;
    let radius = 22;
    return (
        <>
            <RigidBody name='world' type='fixed' colliders="trimesh" position={[0, 0, 0]}>
                <MoonSurface position={[0, 0, 0]} />
            </RigidBody>

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
                    <Physics >
                        <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
                        <EnvSettings />

                        <Terminal position={[0, 2, 0]} />
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
