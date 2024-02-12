import { useController, useXR } from '@react-three/xr'
import { useFrame } from 'react-three-fiber'
import { Vector2, Vector3 } from 'three'

const controllerDir = new Vector2()
const controllerDir3 = new Vector3()
const joystickDir = new Vector2()

export default function SmoothLocomotion({ hand = 'left' }) {
  const { player } = useXR();
  const controller = useController(hand === 'left' ? 'left' : 'right');
  const speed = 5;
  useFrame((_, delta) => {
    if (controller?.inputSource?.gamepad) {
      const [, , ax, ay] = controller.inputSource.gamepad.axes;
      joystickDir.set(ax, ay);
      controller.controller.getWorldDirection(controllerDir3);
      controllerDir.set(controllerDir3.x, -controllerDir3.z).normalize();

      player.position.x += controllerDir.cross(joystickDir) * delta * speed;
      player.position.z -= controllerDir.dot(joystickDir) * delta * speed;
    }
  })
  return null
}

