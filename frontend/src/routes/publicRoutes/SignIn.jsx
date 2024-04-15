import { useAnimate } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useAuth } from "../../AuthContext";
import { supabase } from "../../../supabaseConfig";
import { Navigate, redirect } from "react-router-dom";

const SignIn = () => {
  const { session } = useAuth();
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
        "https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png",
      ]}
    >
      <section className="h-screen bg-slate-200">
        <Copy />

        <WatermarkWrapper />
      </section>
    </MouseImageTrail>
  );
};

const Copy = () => {
  return (
    <section className="z-[999999] fixed flex flex-col w-screen h-screen items-center justify-center">
      <Logo />
      <Form />
    </section>
  );
};

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.error_description || error.message);
    } else {
    }
    setLoading(false);
  };

  return (
    <>
      <style>
        {`
        @media (min-width: 1024px) {
          .scale-on-large {
            transform: scale(1.5);
          }
        }
      `}
      </style>
      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className=" scale-90 w-auto max-h-fit p-10 rounded-xl md:scale-100 xl:scale-125 2xl:scale-150"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backgroundAttachment: "fixed",
          backdropFilter: "blur(15px)",
          border: "solid 2px white",
        }}
      >
        <div className="mx-auto my-auto max-w-lg px-4 pr-0 text-gray-500">
          <motion.h1
            variants={primaryVariants}
            className="mb-2 text-center text-4xl font-semibold"
          >
            Sign In
          </motion.h1>
          <motion.p variants={primaryVariants} className="mb-8 text-center">
            Sign in with your email and stream away!
          </motion.p>

          <form onSubmit={handleLogin} className="w-full">
            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="email-input"
                className="mb-1 inline-block text-sm font-medium"
              >
                Email<span className="text-red-600">*</span>
              </label>
              <input
                id="email-input"
                type="email"
                placeholder="Enter your email"
                className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </motion.div>

            <motion.div variants={primaryVariants} className="mb-2 w-full">
              <label
                htmlFor="password-input"
                className="mb-1 inline-block text-sm font-medium"
              >
                Password<span className="text-red-600">*</span>
              </label>
              <input
                id="password-input"
                type="password"
                placeholder="Enter your password"
                className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
                required
                value={password}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </motion.div>

            <motion.button
              variants={primaryVariants}
              whileTap={{ scale: 0.985 }}
              type="submit"
              className="mb-1.5 w-full rounded bg-red-500 px-4 py-2 mt-1 text-center font-medium text-white transition-colors hover:bg-red-600"
            >
              Sign In
            </motion.button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

const Logo = () => {
  return (
    <img
      src="https://wnplbeoyxtitkkuaaaua.supabase.co/storage/v1/object/public/logos/sullysLogo.png"
      className="absolute left-[50%] top-4 -translate-x-[50%] lg:left-4 lg:-translate-x-0 w-40 h-fit 2xl:w-64"
      alt="Sully's Logo"
    />
  );
};

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const WatermarkWrapper = () => {
  return (
    <>
      <Watermark text="Good Food" />
      <Watermark text="Nice People" reverse />
      <Watermark text="Community" />
      <Watermark text="Servants Heart" reverse />
      <Watermark text="Lots Of Napkins" />
      <Watermark text="Good Food" reverse />
      <Watermark text="Nice People" />
      <Watermark text="Lots Of Napkins" reverse />
    </>
  );
};

const Watermark = ({ reverse, text }) => (
  <div className="flex -translate-y-12 select-none overflow-hidden">
    <TranslateWrapper reverse={reverse}>
      <span className="w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
    <TranslateWrapper reverse={reverse}>
      <span className="ml-48 w-fit whitespace-nowrap text-[20vmax] font-black uppercase leading-[0.75] text-slate-300">
        {text}
      </span>
    </TranslateWrapper>
  </div>
);

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
      className="flex"
    >
      {children}
    </motion.div>
  );
};

const MouseImageTrail = ({
  children,

  images,

  renderImageBuffer,

  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 1 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-36 w-auto object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default SignIn;
