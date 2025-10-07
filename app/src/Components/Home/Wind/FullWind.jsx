import React, { Suspense, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./styles.css";

// Loader component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: "white" }}>{Math.floor(progress)} %</div>
    </Html>
  );
}

// Model loader
function Model({ url, scale, position, rotation }) {
  const { scene } = useGLTF(url);
  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

function WindTunnelDemo() {
  const [carIndex, setCarIndex] = useState(0);

  const cars = [
    {
      name: "Formula 1",
      url: "/models/f1_car.glb",
      scale: [0.8, 0.8, 0.8],
      position: [0, -0.9, 0],
    },
    {
      name: "GT3 Car",
      url: "/models/gt3_car.glb",
      scale: [0.8, 0.8, 0.8],
      position: [0, -0.9, 0],
    },
    {
      name: "Lamborghini",
      url: "/models/lamborghini.glb",
      scale: [0.8, 0.8, 0.8],
      position: [0, -0.9, 0],
    },
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
        {/* Left Panel - Swiper */}
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
                    Click or swipe to select this car in the tunnel.
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right Panel - 3D Canvas */}
        <div style={{ flex: 1 }}>
          <Canvas camera={{ position: [0, 1.8, 6], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            <Suspense fallback={<Loader />}>
              <Model
                url="/models/wind_tunnel.glb"
                scale={[1, 1, 1]}
                position={[0, -1.2, 0]}
              />

              <Model
                key={cars[carIndex].name}
                url={cars[carIndex].url}
                scale={cars[carIndex].scale}
                position={cars[carIndex].position}
              />

              <Environment preset="studio" />
            </Suspense>

            <OrbitControls target={[0, -0.6, 0]} />
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
        Models: place your .glb files under <code>/public/models/</code>
      </footer>
    </div>
  );
}

// Mount app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<WindTunnelDemo />);
}
