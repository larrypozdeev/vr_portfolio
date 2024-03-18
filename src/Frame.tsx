import * as drei from '@react-three/drei';

const GOLDENRATIO = 1.61803398875;

function Frame({ ...props }) {
  const scale = props.scale ? props.scale : [1, GOLDENRATIO, 0.05];
  return (
    <mesh
      castShadow
      receiveShadow
      {...props}
      scale={scale} >
      <boxGeometry />

      <meshStandardMaterial color="#4b3ead" metalness={0.5} roughness={0.5} envMapIntensity={2} />
      <mesh scale={[0.93, 0.93, 0.9]} position={[0, 0, 0.2]} >
        <boxGeometry />
        < meshBasicMaterial toneMapped={false} fog={false} />
      </mesh>
      <mesh castShadow position={[0, -1.3, 0]} > {/* leg stand */}
        <boxGeometry args={[0.05, 4, 0.5]} />
        <meshStandardMaterial color="#4b3ead" metalness={0.5} roughness={0.5} envMapIntensity={2} />
      </mesh>
    </mesh>
  )
}

function FrameVideo({ url, ...props }: { url: string, rotation?: any, position?: [number, number, number], scale?: [number, number, number] }) {
  const texture = drei.useVideoTexture(url);
  const videoPos: [number, number, number] | undefined = props.position
    ? [props.position[0] + Math.sin(props.rotation[1]) * 0.04, props.position[1], props.position[2] + Math.cos(props.rotation[1]) * 0.04]
    : undefined;
  const scale = props.scale ? props.scale : [GOLDENRATIO, 1, 0.05] as [number, number, number];
  return (
    <>
      <Frame scale={scale} {...props}>
      </Frame>
      <mesh {...props} position={videoPos} >
        <planeGeometry args={[scale[0] * 0.95, scale[1] * 0.95]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  )
}
function FrameImage({ url, ...props }: { url: string, rotation?: any, position?: [number, number, number], scale?: [number, number, number] }) {
  const texture = drei.useTexture(url);
  const scale = props.scale ? props.scale : [GOLDENRATIO, 1, 0.05] as [number, number, number];
  const imagePos: [number, number, number] | undefined = props.position
    ? [props.position[0] + Math.sin(props.rotation[1]) * 0.04, props.position[1], props.position[2] + Math.cos(props.rotation[1]) * 0.04]
    : undefined;
  return (
    <>
      <Frame scale={scale} {...props}>
      </Frame>
      <mesh {...props} position={imagePos} >
        <planeGeometry args={[scale[0] * 0.95, scale[1] * 0.95]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  )
}

export { Frame, FrameVideo, FrameImage };
