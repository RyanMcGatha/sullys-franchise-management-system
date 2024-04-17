import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";

const Card = ({ name, del, folders, locations }) => {
  return (
    <TiltCard name={name} del={del} folders={folders} locations={locations} />
  );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ name, del, folders }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="h-96 min-w-96 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300"
    >
      <div
        style={{
          transform: "translateZ(90px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl shadow-lg p-2 pt-4"
      >
        <div className="text-black flex flex-col items-center">
          <img
            className="mb-1 min-w-[200px] min-h-auto rounded-lg "
            src="https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/imgs/store.jpg"
          />
          <div className="text-sm text-neutral-500 mb-2">{name}</div>
          <div className="text-sm ">{folders}</div>
          <div className="text-sm  my-5">{del}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
