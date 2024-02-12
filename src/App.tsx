import { useRef } from 'react'
import { Hands, VRButton, XR, Controllers } from '@react-three/xr'
import { useFrame, Canvas } from '@react-three/fiber'
import { Mesh } from 'three';
import { Physics } from '@react-three/cannon';
import { Plane } from '@react-three/drei';
import SmoothLocomotion from './SmoothLocomotion';
import SnapRotation from './SnapRotation';


function Box(props: any) {
  const mesh = useRef<Mesh>();

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh {...props} ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}

function App() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR >
          <Controllers />
          <Hands />
          <ambientLight intensity={0.9} />
          <pointLight position={[10, 10, 10]} />
          <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <meshStandardMaterial attach="material" color="lightblue" />
          </Plane>
          <Physics>
            <Box position={[3, 1, 0]} />
          </Physics>
          <SmoothLocomotion />
          <SnapRotation />
        </XR>
      </Canvas>
    </>
  )

}
export default App;
