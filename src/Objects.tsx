import React, { forwardRef, useRef, useState } from 'react';
import * as drei from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { Button } from './Button';
import { XR } from '@react-three/xr';

export function Earth(props: any) {
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

export const MoonSurface = forwardRef((props: any, ref: any) => {
    const { nodes, materials } = drei.useGLTF('/scene.glb') as any;

    return (
        <>
            <group {...props} ref={ref} dispose={null}>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={70}>

                    <RigidBody name='world' type='fixed' colliders="trimesh" position={[0, 0, 0]}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Petavius_ZB_LP_1_0.geometry}
                            material={materials.material}
                        />
                    </RigidBody>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Petavius_ZB_LP_2_0.geometry}
                        material={materials.material_1}
                    />
                </group>
            </group>
            {React.Children.map(props.children, (child) => {
                return React.cloneElement(child, {
                    ...child.props,
                    position: props.position,
                    rotation: props.rotation
                })
            })}
        </>
    )
})
drei.useGLTF.preload('/scene.glb');


export function Terminal(props: any) {
    function VideoScreen() {
        let material = new THREE.MeshBasicMaterial({ color: 0x000000 });

        if (!isOff && props.videos) {
            if (props.videos.length) {
                texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
                texture.flipY = false;
                texture.repeat.set(1, 1);
                material = new THREE.MeshBasicMaterial({ map: texture });
            }
        }

        return (
            <>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Monitor_Material005_0.geometry}
                    material={material}
                />
            </>
        )

    }

    function InfoScreen(props: any) {
        if (isOff) {
            return null;
        }
        return (
            <>
                <mesh
                    position={[0, 0.5, 1]}
                    scale={[1.5, 1, 0.1]}
                    castShadow
                    receiveShadow
                >
                    <planeGeometry args={[1.5, 1]} />
                    <meshStandardMaterial color={"#eb7734"} transparent opacity={0.5} />
                </mesh>
                <drei.Text
                    color="black"
                    fontSize={0.15}
                    maxWidth={2}
                    lineHeight={0.5}
                    textAlign="center"
                    castShadow
                    position={[0, 0.5, 1.05]}
                >
                    {props.info}
                    <meshStandardMaterial color={"#eb7734"} />
                </drei.Text>
            </>
        )
    }

    props.videos.forEach((video: any) => {
        let temp = drei.useVideoTexture(video, { start: false });
        temp.dispose();
    });

    const [isOff, setIsOff] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(0);
    let texture: any = null;

    texture = drei.useVideoTexture(props.videos[currentVideo]);



    function prevVideo() {
        if (props.videos.length) {
            texture.dispose();
        }
        setCurrentVideo(Math.abs(currentVideo - 1) % props.videos.length);
    }
    function nextVideo() {
        if (props.videos.length) {
            texture.dispose();
        }
        setCurrentVideo((currentVideo + 1) % props.videos.length);
    }


    const { nodes, materials } = drei.useGLTF('/terminal3.glb') as any;

    return (
        <group {...props} dispose={null}>
            <group scale={0.01}>
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
                        geometry={nodes.Air_vents_back_Material003_0.geometry}
                        material={materials['Material.003']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Air_vents_back_Material004_0.geometry}
                        material={materials['Material.004']}
                    />
                </group>
                <group
                    position={[0, -2.343, -2.082]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={[100.737, 97.42, 97.42]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Back_Material001_0.geometry}
                        material={materials['Material.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Back_Material_0.geometry}
                        material={materials['Material.002']}
                    />
                </group>
                <group position={[0, -102.538, -45.498]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <CuboidCollider
                        sensor
                        onIntersectionEnter={(payload) => payload.other?.rigidBodyObject?.name === 'player' ? setIsOff(false) : null}
                        onIntersectionExit={(payload) => payload.other?.rigidBodyObject?.name === 'player' ? setIsOff(true) : null}
                        position={[0, -2, 0]}
                        args={[3, 3, 3]}
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
                        geometry={nodes.Base_Material002_0.geometry}
                        material={materials['Material.006']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material002_0001.geometry}
                        material={materials['Material.006']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material002_0002.geometry}
                        material={materials['Material.006']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material003_0.geometry}
                        material={materials['Material.003']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Base_Material009_0.geometry}
                        material={materials['Material.009']}
                    />
                </group>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Front_Panel_Material001_0.geometry}
                        material={materials['Material.001']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Front_Panel_Material003_0.geometry}
                        material={materials['Material.003']}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Front_Panel_Material004_0.geometry}
                        material={materials['Material.004']}
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

                <RigidBody name='monitor' type='fixed' colliders="cuboid">
                    <group position={[0, 175.07, -6.003]} rotation={[Math.PI / 2.5, 0, 0]} scale={100}>
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Monitor_Material001_0.geometry}
                            material={materials['Material.001']}
                        />
                        <VideoScreen />
                    </group>
                </RigidBody>

                <group position={[0, 168.692, -2.32]} rotation={[Math.PI * 2 / 5, 0, 0]} scale={100}>
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
                <RigidBody name='body' type='fixed' colliders="cuboid">
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
                    geometry={nodes.Handles_Material002_0.geometry}
                    material={materials['Material.006']}
                    position={[-4.639, 0.262, 7.872]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={100}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Side_panels_Material001_0.geometry}
                    material={materials['Material.001']}
                    position={[0, 7.391, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={100}
                />
            </group>
            <Button
                label="prev"
                position={[-1.2, 1, 0]}
                onClick={() => prevVideo()} />
            <InfoScreen info={'hi'} />
            <Button
                label="next"
                position={[1.2, 1, 0]}
                onClick={() => nextVideo()} />

        </group>
    )
}

drei.useGLTF.preload('/terminal3.glb')

