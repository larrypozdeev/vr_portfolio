import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { useController, useXR } from '@react-three/xr'
import { useRef } from 'react';
import { useFrame } from 'react-three-fiber'
import { Vector3 } from 'three'

const direction = new Vector3();

export default function SmoothLocomotion({ hand = 'left' }) {
  const { player } = useXR();
  const controller = useController(hand === 'left' ? 'left' : 'right');
  const ref = useRef() as any;
  // const rapier = useRapier();
  const speed = 5;

  useFrame((_) => {
    if (controller?.inputSource?.gamepad) {
      // update camera
      let refT = ref.current?.translation();
      player.position.set(refT.x, refT.y, refT.z);

      const [, , ax, ay] = controller.inputSource.gamepad.axes;
      let frontVector = new Vector3(0, 0, ay);
      let sideVector = new Vector3(-ax, 0, 0);

      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(speed).applyEuler(player.rotation);

      const velocity = ref.current?.linvel();
      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
    }
  })
  return (
    <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]} >
      <CapsuleCollider args={[0.75, 0.5]} />
    </RigidBody>
  )
}

