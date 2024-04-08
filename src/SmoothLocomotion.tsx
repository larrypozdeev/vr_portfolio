import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useController, useXR } from '@react-three/xr'
import { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber'
import { Vector3 } from 'three'

const speed = 3.5;

export default function Player({ position, hand = 'left' }: any) {
  const ref = useRef() as any;

  const { player } = useXR();
  const { camera } = useThree();
  const [, get] = useKeyboardControls();

  const controller = useController(hand === 'left' ? 'left' : 'right');
  const direction = new Vector3() as any;

  useFrame((_) => {
    let frontVector, sideVector = new Vector3(0, 0, 0);
    const velY = ref.current.linvel().y;
    let refT = ref.current.translation();

    camera.position.set(refT.x, refT.y + 1.1, refT.z);
    if (controller?.inputSource?.gamepad) {
      player.position.set(refT.x, refT.y, refT.z);
      const [, , ax, ay] = controller.inputSource.gamepad.axes;
      frontVector = new Vector3(0, 0, ay);
      sideVector = new Vector3(-ax, 0, 0);
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(player.rotation);

    } else {
      const { forward, back, left, right } = get() as any;
      frontVector = new Vector3(0, 0, back - forward);
      sideVector = new Vector3(left - right, 0, 0);
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(camera.rotation);
    }

    if (direction[0] !== 0 && direction[1] !== 0 && direction[2] !== 0) {
      ref.current.wakeUp();
    }

    ref.current.setLinvel({ x: direction.x, y: velY, z: direction.z })
  })

  return (
    <RigidBody ref={ref} friction={1} name={'player'} mass={10} type="dynamic" position={position} enabledRotations={[false, false, false]} >
      <CapsuleCollider args={[0.75, 0.5]} />
    </RigidBody>
  )
}


