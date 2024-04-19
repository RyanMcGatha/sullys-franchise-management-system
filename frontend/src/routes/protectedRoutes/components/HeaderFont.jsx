import React, { useEffect, useRef } from "react";

export const HeaderFont = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    resizeText();

    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  const resizeText = () => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) {
      return;
    }

    const containerWidth = container.offsetWidth;
    let min = 1;
    let max = 2500;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = mid + "px";

      if (text.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 40;
      }
    }

    text.style.fontSize = max + "px";
  };

  return (
    <div className="flex flex-col -mt-20" ref={containerRef}>
      <span
        className="mx-auto whitespace-nowrap font-bold uppercase text-slate-400"
        ref={textRef}
      >
        Locations
      </span>
    </div>
  );
};
