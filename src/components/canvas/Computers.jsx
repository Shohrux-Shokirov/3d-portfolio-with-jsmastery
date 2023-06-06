import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';


const Computers = ({isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight intensity={1} />
      <spotLight 
       position={[-20, 50, 10]}
       angle={0.12}
       panumbra={1}
       intensity={1}
       castShadow
       shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.75}
        position={isMobile ? [0, -2, -1.5] :[0, -3.25, -1.5]}
        rotataion={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  // useEffect for check screen size
  useEffect(()=>{

    //set screen size for mobile
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    //callback function to check if screen siz matches with mobile
    const handleMediaQueryChange = (e)=>{
      setIsMobile(e.matches);
    }

    //set callback function to event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    //remove event listener when component unmounted
    return ()=>{
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
         enableZoom={false}
         maxPolarAngle={Math.PI / 2}
         minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />

    </Canvas>
  )
}

export default ComputersCanvas