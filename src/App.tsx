import React from 'react';
import { useRef, useState } from 'react'
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber'


function App() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}

export default App;
