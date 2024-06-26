import { useThree, useFrame } from "@react-three/fiber";
import { Interactive } from "@react-three/xr";
import { useState, useRef, Suspense } from "react";
import { RoundedBox, Text} from "@react-three/drei";
import { useXR } from "@react-three/xr";

export const Button = ({
    label,
    onClick,
    fontColor = "white",
    fontColorHovered = "lightblue",
    fontColorClicked = "grey",
    bgColor = "#000",
    bgColorHovered = "grey",
    bgColorClicked = "#777",
    height = 0.25,
    width = label.length * 0.21,
    position = [0, 0, 0],
    follow = false,
    frameDelay = 200
}) => {
    const { camera } = useThree();
    const { player, isPresenting } = useXR();
    const cam = isPresenting ? player : camera;
    const buttonRef = useRef(null);

    const cDelta = useRef(0); //optional frame rate reduction

    useFrame((state, delta) => {
        if (follow) {
            cDelta.current += Math.floor(delta * 1000); //optional frame rate reduction
            if (cDelta.current > frameDelay) {
                //optional frame rate reduction
                cDelta.current = cDelta.current % frameDelay; //optional frame rate reduction

                if (buttonRef.current?.quaternion) {
                    buttonRef.current.quaternion.copy(cam.quaternion);
                }
            }
        }
    });
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const clicked = () => {
        setIsClicked(true);
        onClick();
        setTimeout(() => {
            setIsClicked(false);
        }, 125);
    };
    return (
        <Suspense fallback={null}>
            <Interactive
                onSelect={() => clicked()}
                onHover={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
            >
                <group
                    ref={buttonRef}
                    position={position}
                    onClick={() => clicked()}
                    onPointerOver={() => setIsHovered(true)}
                    onPointerOut={() => setIsHovered(false)}
                >
                    <RoundedBox
                        args={[width, height, 1]}
                        radius={height / 2}
                        scale={[1, 1, height / 32]}

                    >
                        <meshLambertMaterial
                            attach="material"
                            color={
                                isClicked
                                    ? bgColorClicked
                                    : isHovered
                                        ? bgColorHovered
                                        : bgColor
                            }
                        />
                    </RoundedBox>
                    <Text
                        color={
                            isClicked
                                ? fontColorClicked
                                : isHovered
                                    ? fontColorHovered
                                    : fontColor
                        }
                        scale={[height*1.1, height*1.1, 1]}
                        position={[0, 0, height / 16]}
                    >
                        {label}
                    </Text>
                </group>
            </Interactive>
        </Suspense>
    );
};
