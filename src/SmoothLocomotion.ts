import { useController, useXR } from '@react-three/xr'
import { useFrame } from 'react-three-fiber'
import { Vector2, Vector3 } from 'three'

const controllerDir = new Vector2();
const controllerDir3 = new Vector3();
const joystickDir = new Vector2();
const centerPoint = new Vector2(0, 0);
export default function SmoothLocomotion({ hand = 'left', maxDistanceFromCenter = 40}) {
  const { player } = useXR();
  const controller = useController(hand === 'left' ? 'left' : 'right');
  const speed = 5;
  useFrame((_, delta) => {
    if (controller?.inputSource?.gamepad) {
      const [, , ax, ay] = controller.inputSource.gamepad.axes;
      joystickDir.set(ax, ay);
      controller.controller.getWorldDirection(controllerDir3);
      controllerDir.set(controllerDir3.x, -controllerDir3.z).normalize();

      // Calculate potential new position
      const newX = player.position.x + controllerDir.cross(joystickDir) * delta * speed;
      const newZ = player.position.z - controllerDir.dot(joystickDir) * delta * speed;

      const distanceFromCenter = new Vector2(newX, newZ).distanceTo(centerPoint);
      if (distanceFromCenter > maxDistanceFromCenter) return;

      player.position.x += controllerDir.cross(joystickDir) * delta * speed;
      player.position.z -= controllerDir.dot(joystickDir) * delta * speed;
    }
  })
  return null
}

