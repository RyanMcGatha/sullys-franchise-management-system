import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar } from "react-icons/fi";

export const SlideInAuth = () => {
  return (
    <section
      className="grid max-h-screen grid-cols-1 md:grid-cols-[1fr,_400px] lg:grid-cols-[1fr,_600px] text-white"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1200 800'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='600' y1='25' x2='600' y2='777'%3E%3Cstop offset='0' stop-color='%23ff0000'/%3E%3Cstop offset='1' stop-color='%23E0F'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='650' y1='25' x2='650' y2='777'%3E%3Cstop offset='0' stop-color='%23ff0019'/%3E%3Cstop offset='1' stop-color='%23ce00f3'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='700' y1='25' x2='700' y2='777'%3E%3Cstop offset='0' stop-color='%23ff0031'/%3E%3Cstop offset='1' stop-color='%23b000e6'/%3E%3C/linearGradient%3E%3ClinearGradient id='d' gradientUnits='userSpaceOnUse' x1='750' y1='25' x2='750' y2='777'%3E%3Cstop offset='0' stop-color='%23ff004a'/%3E%3Cstop offset='1' stop-color='%239400da'/%3E%3C/linearGradient%3E%3ClinearGradient id='e' gradientUnits='userSpaceOnUse' x1='800' y1='25' x2='800' y2='777'%3E%3Cstop offset='0' stop-color='%23ff0063'/%3E%3Cstop offset='1' stop-color='%237a00ce'/%3E%3C/linearGradient%3E%3ClinearGradient id='f' gradientUnits='userSpaceOnUse' x1='850' y1='25' x2='850' y2='777'%3E%3Cstop offset='0' stop-color='%23ff007c'/%3E%3Cstop offset='1' stop-color='%236200c1'/%3E%3C/linearGradient%3E%3ClinearGradient id='g' gradientUnits='userSpaceOnUse' x1='900' y1='25' x2='900' y2='777'%3E%3Cstop offset='0' stop-color='%23ff0094'/%3E%3Cstop offset='1' stop-color='%234d00b5'/%3E%3C/linearGradient%3E%3ClinearGradient id='h' gradientUnits='userSpaceOnUse' x1='950' y1='25' x2='950' y2='777'%3E%3Cstop offset='0' stop-color='%23ff00ad'/%3E%3Cstop offset='1' stop-color='%233900a8'/%3E%3C/linearGradient%3E%3ClinearGradient id='i' gradientUnits='userSpaceOnUse' x1='1000' y1='25' x2='1000' y2='777'%3E%3Cstop offset='0' stop-color='%23ff00c6'/%3E%3Cstop offset='1' stop-color='%2328009c'/%3E%3C/linearGradient%3E%3ClinearGradient id='j' gradientUnits='userSpaceOnUse' x1='1050' y1='25' x2='1050' y2='777'%3E%3Cstop offset='0' stop-color='%23ff00df'/%3E%3Cstop offset='1' stop-color='%23180090'/%3E%3C/linearGradient%3E%3ClinearGradient id='k' gradientUnits='userSpaceOnUse' x1='1100' y1='25' x2='1100' y2='777'%3E%3Cstop offset='0' stop-color='%23ff00f7'/%3E%3Cstop offset='1' stop-color='%230b0083'/%3E%3C/linearGradient%3E%3ClinearGradient id='l' gradientUnits='userSpaceOnUse' x1='1150' y1='25' x2='1150' y2='777'%3E%3Cstop offset='0' stop-color='%23E0F'/%3E%3Cstop offset='1' stop-color='%23007'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg %3E%3Crect fill='url(%23a)' width='1200' height='800'/%3E%3Crect fill='url(%23b)' x='100' width='1100' height='800'/%3E%3Crect fill='url(%23c)' x='200' width='1000' height='800'/%3E%3Crect fill='url(%23d)' x='300' width='900' height='800'/%3E%3Crect fill='url(%23e)' x='400' width='800' height='800'/%3E%3Crect fill='url(%23f)' x='500' width='700' height='800'/%3E%3Crect fill='url(%23g)' x='600' width='600' height='800'/%3E%3Crect fill='url(%23h)' x='700' width='500' height='800'/%3E%3Crect fill='url(%23i)' x='800' width='400' height='800'/%3E%3Crect fill='url(%23j)' x='900' width='300' height='800'/%3E%3Crect fill='url(%23k)' x='1000' width='200' height='800'/%3E%3Crect fill='url(%23l)' x='1100' width='100' height='800'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <Logo />
      <Form />
      <SupplementalContent />
    </section>
  );
};

const Form = () => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center pb-4 pt-20 md:py-20"
    >
      <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-4xl font-semibold"
        >
          Sign In
        </motion.h1>
        <motion.p variants={primaryVariants} className="mb-8 text-center">
          Sign in with your eamil below and steam away!
        </motion.p>

        <form onSubmit={(e) => e.preventDefault()} className="w-full">
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
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-4 w-full">
            <label
              htmlFor="rt-password-input"
              className="mb-1 inline-block text-sm font-medium"
            >
              Re-type Password<span className="text-red-600">*</span>
            </label>
            <input
              id="rt-password-input"
              type="password"
              placeholder="Re-type your password"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              required
            />
          </motion.div>

          <motion.div
            variants={primaryVariants}
            className="mb-4 flex w-full items-start gap-1.5"
          >
            <input
              type="checkbox"
              id="terms-checkbox"
              className="h-4 w-4 accent-indigo-600"
              required
            />
            <label htmlFor="terms-checkbox" className="text-xs">
              By signing up, I agree to the terms and conditions, privacy
              policy, and cookie policy
            </label>
          </motion.div>

          <motion.button
            variants={primaryVariants}
            whileTap={{
              scale: 0.985,
            }}
            type="submit"
            className="mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Sign up
          </motion.button>
          <motion.p variants={primaryVariants} className="text-xs">
            Already have an account?{" "}
            <a className="text-indigo-600 underline" href="#">
              Sign in
            </a>
          </motion.p>
        </form>
      </div>
    </motion.div>
  );
};

const SupplementalContent = () => {
  return (
    <div className="group sticky top-4 m-4 h-80 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-slate-950 md:h-[calc(100vh_-_2rem)]">
      <img
        alt="An example image"
        src="/imgs/abstract/18.jpg"
        className="h-full w-full bg-white object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
      />

      <div className="absolute right-2 top-4 z-10">
        <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-slate-950/90 to-slate-950/0 p-8"
      >
        <motion.h2
          className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl"
          variants={primaryVariants}
        >
          Sign in and,
          <br />
          Steam away!
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="mb-6 max-w-md text-sm text-slate-300"
        ></motion.p>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <motion.img
              variants={avatarVariants}
              className="h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="/imgs/head-shots/1.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="/imgs/head-shots/2.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="/imgs/head-shots/3.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="/imgs/head-shots/4.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="/imgs/head-shots/6.jpg"
            />
          </div>
          <div>
            <motion.div variants={primaryVariants} className="flex gap-0.5">
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <span className="ml-2 text-sm text-white">5.0</span>
            </motion.div>
            <motion.p
              variants={primaryVariants}
              className="text-xs text-slate-300"
            >
              from over 100,000 reviews
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <svg
      width="50"
      height="39"
      viewBox="0 0 50 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-[50%] top-4 -translate-x-[50%] fill-slate-950 md:left-4 md:-translate-x-0"
    >
      <path
        d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
        stopColor="#000000"
      ></path>
      <path
        d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
        stopColor="#000000"
      ></path>
    </svg>
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

const avatarVariants = {
  initial: {
    x: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
};
