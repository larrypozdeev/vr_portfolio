import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useController, useXR } from '@react-three/xr'
import { useRef } from 'react';
import { useFrame } from 'react-three-fiber'
import { Vector3 } from 'three'

const direction = new Vector3() as any;

export default function SmoothLocomotion({ hand = 'left' }) {
  const { player } = useXR();
  const controller = useController(hand === 'left' ? 'left' : 'right');
  const ref = useRef() as any;
  const speed = 5;

  useFrame((_) => {
    const refT = ref.current?.translation();
    player.position.set(refT.x, refT.y, refT.z);

    // wake up the body
    if (controller?.inputSource?.gamepad) {
      ref.current?.wakeUp();
      const [, , ax, ay] = controller.inputSource.gamepad.axes;
      let frontVector = new Vector3(0, 0, ay);
      let sideVector = new Vector3(-ax, 0, 0);

      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(player.rotation);

      if (direction[0] !== 0 && direction[1] !== 0 && direction[2] !== 0) {
        ref.current?.wakeUp();
      }
    }

    const velY = ref.current?.linvel().y;
    ref.current.setLinvel({ x: direction.x, y: velY, z: direction.z })
  })
  return (
    <RigidBody ref={ref} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]} >
      <CapsuleCollider args={[0.75, 0.5]} />
    </RigidBody>
  )
}

