import React, { forwardRef, useRef } from 'react';
import * as drei from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import { warn } from 'console';

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

    useEffect(() => {
        if (ref.current) {
        }
    }, [ref]);

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

