"use client";
import { useRef, useMemo } from "react";
import { useTheme } from "next-themes";
import DottedMap from "dotted-map";

export function WorldMap({ dots = [], lineColor = "#0ea5e9" }) {
  const svgRef = useRef(null);
  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );
  // ff5733
  const { theme } = useTheme();

  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.25,
      color: theme === "dark" ? "#FFFFFF40" : "white",
      shape: "circle",
      // backgroundColor: theme === "dark" ? "black" : "black",
    });
  }, [theme, map]);

  const projectPoint = (lat, lng) => {
    const width = 1056;
    const height = 495;

    const x = (lng + 180) * (width / 360);

    const latRad = (lat * Math.PI) / 180;
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = height / 2 - (width * mercN) / (2 * Math.PI);

    return { x, y };
  };

  return (
    <div className="w-full aspect-[2/1]  rounded-lg relative font-sans">
      {/* dark:bg-black bg-white */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 1056 495"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        <defs>
          <filter
            id="point-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="-1"
              stdDeviation="1"
              floodColor={lineColor}
              floodOpacity="0.6"
            />
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1"
              floodColor={lineColor}
              floodOpacity="0.6"
            />
          </filter>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          return (
            <g key={`point-group-${i}`}>
              <circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="3"
                fill={lineColor}
                filter="url(#point-shadow)"
              />
              <circle
                cx={startPoint.x}
                cy={startPoint.y}
                r="3"
                fill={lineColor}
                opacity="0.5"
                filter="url(#point-shadow)"
              >
                <animate
                  attributeName="r"
                  from="3"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
