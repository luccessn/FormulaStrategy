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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import tunel from "./models/tunel.glb";
import f1senna from "./models/f1_senna.glb";
import vento from "./models/vento.glb";
import vento2 from "./models/vento2.glb";
import vento3 from "./models/vento3.glb";

// Loader (loading progress overlay)
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
    </Html>
  );
}

// Model loader with animation support
function Model({ url, scale, position, rotation }) {
  const gltf = useGLTF(url);
  const { scene, animations } = gltf;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions]);

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
      scale: [8, 8, 8],
      position: [0, -0.9, 15],
      rotation: [0, Math.PI, 0], // 180° შებრუნება Y ღერძზე
    },
    // სხვა მანქანებიც შეგიძლია დაამატო აქ
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column", // ყველაფერი ვერტიკალურად
      }}
      // className="bg-gray-500"
    >
      {/* 3D Canvas */}
      <div style={{ flex: 1 }}>
        <Canvas camera={{ position: [-40, 15, 0], fov: 90 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />

          <Suspense fallback={<Loader />}>
            {/* Tunnel */}
            <Model url={vento} scale={[1, 1, 1]} position={[0, -1.2, 10]} />

            {/* Selected Car */}
            <Model
              key={cars[carIndex].name}
              url={cars[carIndex].url}
              scale={cars[carIndex].scale}
              position={cars[carIndex].position}
              rotation={cars[carIndex].rotation}
            />

            <Environment preset="studio" />
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
          onSlideChange={(swiper) => setCarIndex(swiper.activeIndex)}
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
                }}
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
