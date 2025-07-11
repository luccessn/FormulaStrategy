"use client";
import { cn } from "../../Lib/utils";
import React, { useState, useEffect, useRef, useCallback } from "react";

export const StarsBackground = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const [stars, setStars] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastRenderTimeRef = useRef(0);
  const renderInterval = 1000 / 30; // Target 30 FPS

  const generateStars = useCallback(
    (width, height) => {
      const area = width * height;
      const numStars = Math.min(Math.floor(area * starDensity), 1000); // Limit max stars
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          allStarsTwinkle || Math.random() < twinkleProbability;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.3 + 0.7,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          initialPhase: Math.random() * Math.PI * 2, // Random starting phase
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
    ]
  );

  useEffect(() => {
    const updateStars = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const { width, height } = canvas.getBoundingClientRect();

        // Only update if size actually changed
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          setStars(generateStars(width, height));
        }
      }
    };

    updateStars();

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateStars);
    });

    if (canvasRef.current) {
      resizeObserver.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        resizeObserver.unobserve(canvasRef.current);
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [generateStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = (timestamp) => {
      // Throttle rendering to ~30fps
      if (timestamp - lastRenderTimeRef.current >= renderInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Use a single path for all stars to reduce draw calls
        ctx.beginPath();

        stars.forEach((star) => {
          ctx.moveTo(star.x + star.radius, star.y);
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);

          if (star.twinkleSpeed !== null) {
            // Use pre-calculated opacity based on time and initial phase
            const now = Date.now() * 0.001;
            star.opacity =
              0.5 +
              Math.abs(
                Math.sin(now / star.twinkleSpeed + star.initialPhase) * 0.5
              );
          }
        });

        ctx.fillStyle = "white";
        ctx.fill();

        lastRenderTimeRef.current = timestamp;
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [stars, renderInterval]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "h-full w-full absolute inset-0 pointer-events-none z-[-1]", // VERY IMPORTANT
        className
      )}
    />
  );
};
