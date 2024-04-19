import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { supabase } from "../../../../supabaseConfig";

const Nav = () => {
  return <SideStaggerNavigation />;
};

const NUM_LINES = 30;

const navItems = [
  {
    position: 2,
    title: "Home",
    onClick: () => (window.location.href = "/locations"),
  },

  { position: 20, title: "Sign Out", onClick: () => supabase.auth.signOut() },
];

const SideStaggerNavigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseY = useMotionValue(Infinity);

  return (
    <motion.nav
      onMouseMove={(e) => {
        mouseY.set(e.clientY);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        mouseY.set(Infinity);
        setIsHovered(false);
      }}
      className="fixed left-0 top-0 flex h-screen flex-col items-start justify-between py-4 pr-2 md:pr-8 bg-slate-100 md:bg-transparent"
    >
      {Array.from(Array(NUM_LINES).keys()).map((i) => {
        const linkContent = navItems.find((item) => item.position === i + 1);

        return (
          <LinkLine
            title={linkContent?.title}
            isHovered={isHovered}
            mouseY={mouseY}
            key={i}
            onClick={linkContent?.onClick}
          />
        );
      })}
    </motion.nav>
  );
};

const SPRING_OPTIONS = {
  mass: 1,
  stiffness: 200,
  damping: 15,
};

const LinkLine = ({ mouseY, isHovered, title, onClick, href }) => {
  const ref = useRef(null);
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect();

    return val - (bounds?.y || 0) - (bounds?.height || 0) / 2;
  });

  const lineWidthRaw = useTransform(distance, [-80, 0, 80], [25, 100, 25]);
  const lineWidth = useSpring(lineWidthRaw, SPRING_OPTIONS);

  const linkWidth = useSpring(25, SPRING_OPTIONS);

  useEffect(() => {
    if (isHovered) {
      linkWidth.set(200);
    } else {
      linkWidth.set(45);
    }
  }, [isHovered]);

  if (title) {
    return (
      <a>
        <motion.div
          ref={ref}
          className="group relative bg-neutral-500 transition-colors hover:bg-red-500"
          style={{ width: linkWidth, height: 3 }}
        >
          <AnimatePresence>
            {isHovered && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute text-right right-0 top-0 z-10 w-full pt-2 font-bold uppercase text-neutral-500 transition-colors group-hover:text-red-500"
                onClick={onClick}
              >
                {title}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </a>
    );
  } else {
    return (
      <motion.div
        ref={ref}
        className="relative bg-neutral-500"
        style={{ width: lineWidth, height: 3 }}
      />
    );
  }
};

export default Nav;
