"use client";

import { useEffect, useRef, useState } from "react";

export default function AppPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth =
          containerRef.current.parentElement?.offsetWidth || 0;
        const contentWidth = 1280; // Set this to your intended content width
        setScale(parentWidth / contentWidth);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="mx-auto px-10">
      <div
        className="h-auto origin-top-left"
        style={{ transform: `scale(${scale})`, width: "1280px" }}
      >
        <h1 className="text-9xl">hello</h1>

        <p className="text-4xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
          similique quisquam numquam sint, doloremque explicabo sapiente facere
          dolorum aut. Delectus nisi autem rem provident, sit necessitatibus
          dolores praesentium placeat quo.
        </p>

        <div className="flex items-center gap-3">
          <div className="size-96 bg-amber-500"></div>
          <div className="size-96 bg-cyan-500"></div>
          <div className="size-96 bg-orange-500"></div>
        </div>
      </div>
    </div>
  );
}
