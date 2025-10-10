import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
  useProgress,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import tunel from "./models/tunel.glb";
import f1senna from "./models/f1_senna.glb";
import nissan from "./models/nissan.glb";
import pors from "./models/pors.glb";

import vento from "./models/vento.glb";
import vento2 from "./models/vento2.glb";
import vento3 from "./models/vento3.glb";
import main from "./models/vnt1.glb";

// Loader (loading progress overlay)
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
    </Html>
  );
}

// Model loader with material + animation support
function Model({ url, scale, position, rotation }) {
  const gltf = useGLTF(url);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          // სწორად გამოჩნდეს ფერები
          if (child.material.map) {
            child.material.map.colorSpace = THREE.SRGBColorSpace;
          }
          if (child.material.emissiveMap) {
            child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          }
          // მეტალიკი უკეთ გამოჩნდეს
          child.material.envMapIntensity = 1.5;
        }
      }
    });
  }, [actions, scene]);

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

export function WindTunnelDemo() {
  const [carIndex, setCarIndex] = useState(0);

  const cars = [
    {
      name: "Formula 1 - Senna",
      url: f1senna,
      scale: [4, 3, 3],
      position: [0, -0.9, -2],
      rotation: [0, Math.PI, 0],
    },
    {
      name: "pors",
      url: pors,
      scale: [8, 6, 6],
      position: [0, -0.9, 15],
      rotation: [0, Math.PI, 0],
    },

    // აქ შეგიძლია დაამატო სხვა მანქანები
  ];

  return (
    <div
      style={{
        width: "1500px",
        height: "1000px",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
      // className="bg-red-500"
    >
      {/* 3D Canvas */}
      <div style={{ flex: 1 }}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            physicallyCorrectLights: true,
            outputColorSpace: THREE.SRGBColorSpace, // toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
          }}
          camera={{ position: [-55, 20, 0], fov: 45 }}
        >
          <Suspense fallback={<Loader />}>
            {/* Tunnel */}
            <Model
              url={main}
              scale={[0.35, 0.35, 0.35]}
              position={[0, -1.2, -5]}
            />

            {/* Selected Car */}
            <Model
              key={cars[carIndex].name}
              url={cars[carIndex].url}
              scale={cars[carIndex].scale}
              position={cars[carIndex].position}
              rotation={cars[carIndex].rotation}
            />

            {/* Lights */}
            <ambientLight intensity={0.3} />
            <directionalLight
              castShadow
              position={[5, 10, 5]}
              intensity={1.2}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <spotLight
              castShadow
              position={[-5, 8, -5]}
              intensity={0.8}
              angle={0.3}
            />

            {/* HDRI Env */}
            <Environment preset="sunset" background={false} />
          </Suspense>

          {/* Static Camera Controls */}
          <OrbitControls
            target={[0, -0.6, 0]}
            enableRotate={false}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </div>

      {/* Sidebar as bottom bar */}
      <div
        style={{
          height: 140,
          padding: 12,
          boxSizing: "border-box",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <Swiper
          direction="horizontal"
          spaceBetween={12}
          slidesPerView={2}
          style={{ height: "100%" }}
        >
          {cars.map((car, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  padding: 12,
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  textAlign: "center",
                  cursor: "pointer", // ხელის კურსორი
                }}
                onClick={() => setCarIndex(i)} // 👈 აი აქ ხდება მანქანის შეცვლა
              >
                <h3 style={{ margin: 0, fontSize: 14 }}>{car.name}</h3>
                <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
                  Select this car
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
