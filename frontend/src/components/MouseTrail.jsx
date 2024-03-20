// import "./auth.css";

// import { useAnimate } from "framer-motion";
// import React, { useRef } from "react";
// import { FiMousePointer } from "react-icons/fi";

// import { Link, Navigate } from "react-router-dom";
// import { useAuth } from "../../../AuthContext";

// import { useState } from "react";
// import { useEffect } from "react";
// import { supabase } from "../../../config/supabaseConfig";

// export default function MouseTrail({ url }) {
//   const { session } = useAuth();
//   const [loading, setLoading] = useState(false);

//   const [logoUrl, setLogoUrl] = useState(null);

//   useEffect(() => {
//     downloadImage(url);
//   }, [url]);

//   async function downloadImage() {
//     try {
//       const { data, error } = await supabase.storage
//         .from("logos")
//         .download("sullysLogo.png");
//       if (error) {
//         throw error;
//       }
//       const url = URL.createObjectURL(data);
//       setLogoUrl(url);
//       console.log(url);
//     } catch (error) {
//       console.log("Error downloading image: ", error.message);
//     }
//   }

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     setLoading(true);
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       alert(error.error_description || error.message);
//     } else {
//       return <Navigate to={"/dashboard"} />;
//     }
//     setLoading(false);
//   };

//   const MouseImageTrail = ({
//     children,
//     // List of image sources
//     images,
//     // Will render a new image every X pixels between mouse moves
//     renderImageBuffer,
//     // images will be rotated at a random number between zero and rotationRange,
//     // alternating between a positive and negative rotation
//     rotationRange,
//   }) => {
//     const [scope, animate] = useAnimate();

//     const lastRenderPosition = useRef({ x: 0, y: 0 });
//     const imageRenderCount = useRef(0);

//     const handleMouseMove = (e) => {
//       const { clientX, clientY } = e;

//       const distance = calculateDistance(
//         clientX,
//         clientY,
//         lastRenderPosition.current.x,
//         lastRenderPosition.current.y
//       );

//       if (distance >= renderImageBuffer) {
//         lastRenderPosition.current.x = clientX;
//         lastRenderPosition.current.y = clientY;

//         renderNextImage();
//       }
//     };

//     const calculateDistance = (x1, y1, x2, y2) => {
//       const deltaX = x2 - x1;
//       const deltaY = y2 - y1;

//       // Using the Pythagorean theorem to calculate the distance
//       const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//       return distance;
//     };

//     const renderNextImage = () => {
//       const imageIndex = imageRenderCount.current % images.length;
//       const selector = `[data-mouse-move-index="${imageIndex}"]`;

//       const el = document.querySelector(selector);

//       el.style.top = `${lastRenderPosition.current.y}px`;
//       el.style.left = `${lastRenderPosition.current.x}px`;
//       el.style.zIndex = imageRenderCount.current.toString();

//       const rotation = Math.random() * rotationRange;

//       animate(
//         selector,
//         {
//           opacity: [0, 1],
//           transform: [
//             `translate(-50%, -25%) scale(0.5) ${
//               imageIndex % 2
//                 ? `rotate(${rotation}deg)`
//                 : `rotate(-${rotation}deg)`
//             }`,
//             `translate(-50%, -50%) scale(1) ${
//               imageIndex % 2
//                 ? `rotate(-${rotation}deg)`
//                 : `rotate(${rotation}deg)`
//             }`,
//           ],
//         },
//         { type: "spring", damping: 15, stiffness: 200 }
//       );

//       animate(
//         selector,
//         {
//           opacity: [1, 0],
//         },
//         { ease: "linear", duration: 0.5, delay: 5 }
//       );

//       imageRenderCount.current = imageRenderCount.current + 1;
//     };

//     return (
//       <div
//         ref={scope}
//         className="relative overflow-hidden"
//         onMouseMove={handleMouseMove}
//       >
//         {children}

//         {images.map((img, index) => (
//           <img
//             className="mouseImgs"
//             src={img}
//             alt={`Mouse move image ${index}`}
//             key={index}
//             data-mouse-move-index={index}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="bg">
//       <MouseImageTrail
//         renderImageBuffer={50}
//         rotationRange={25}
//         images={[
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//           logoUrl,
//         ]}
//       ></MouseImageTrail>
//     </div>
//   );
// }
