import React, { Suspense, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
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
import tunel from "./models/tunel.glb"; import f1senna from "./models/f1_senna.glb"
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
      scale: [2, 2, 2], // გაძლიერებული ზომა
      position: [0, -0.9, 0],
    },
    // მეტი მანქანა შეგიძლია დაამატო
  ];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#0b1220",
        color: "#fff",
      }}
    >
      <header style={{ padding: 16 }}>
        <h1 style={{ margin: 0 }}>Wind Tunnel — React Demo</h1>
      </header>

      <div style={{ display: "flex", height: "calc(100% - 64px)" }}>
        {/* Sidebar with car options */}
        <div
          style={{
            width: 320,
            padding: 12,
            boxSizing: "border-box",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <Swiper
            direction="vertical"
            spaceBetween={12}
            slidesPerView={1}
            onSlideChange={(swiper) => setCarIndex(swiper.activeIndex)}
            style={{ height: "100%" }}
          >
            {cars.map((car, i) => (
              <SwiperSlide key={i}>
                <div style={{ padding: 12 }}>
                  <h3 style={{ marginTop: 0 }}>{car.name}</h3>
                  <p style={{ marginBottom: 8 }}>
                    Select this car to place it inside the wind tunnel.
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 3D Canvas */}
        <div style={{ flex: 1 }}>
<Canvas camera={{ position: [-30, 20, 10], fov: 90 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Suspense fallback={<Loader />}>
              {/* Tunnel */}
              <Model
                url={tunel}
                scale={[1, 1, 1]}
                position={[0, -1.2, 0]}
              />

              {/* Selected Car */}
              <Model
                key={cars[carIndex].name}
                url={cars[carIndex].url}
                scale={cars[carIndex].scale}
                position={cars[carIndex].position}
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
      </div>

      <footer
        style={{
          position: "absolute",
          left: 16,
          bottom: 16,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        Place your .glb files in <code>/public/models/</code>
      </footer>
    </div>
  );
}
