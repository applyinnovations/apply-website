import { useEffect, useState } from "react";
import { LinksFunction } from "remix";
import { motion } from "framer-motion";
import stylesUrl from "../styles/index.css";
import imgA from "../images/A.svg";
import imgP from "../images/P.svg";
import imgL from "../images/L.svg";
import imgY from "../images/Y.svg";
import bg from "../images/bg.png";

import Typewriter from "typewriter-effect";
import Canvas from "~/src/Canvas";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  const [burrow, setBurrow] = useState("");
  const [isOpenContact, setIsOpenContact] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const topTextVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const messageVariants = {
    open: {
      opacity: 1,
      width: "200px",
      height: "300px",
      transition: {
        delayChildren: 0.3,
      },
    },
    closed: { opacity: 0, width: 0, height: 0 },
  };
  const contactVariants = {
    open: {
      opacity: 1,
      width: "230px",
      height: "120px",
      transition: {
        delayChildren: 0.3,
      },
    },
    closed: { opacity: 0, width: 0, height: 0 },
  };
  const floatingBoxItemVariant = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const botText =
    "Hi, I'm DotBot. The App/y intern. What innovations do you want to see in your business or venture?";

  const [dimension, setDimension] = useState({ width: "100", height: "100" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimension({
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    }
  }, []);
  return (
    <div className="home">
      <Canvas {...dimension} />
      <motion.h2 initial="hidden" animate="visible" variants={topTextVariants}>
        Using digital intelligence to transform technology and <br /> customer
        experience for forward-thinking businesses
      </motion.h2>
      <div className="contact">
        <span
          className={`floatingBox ${burrow}`}
          onClick={() => {
            setIsOpenMessage(true);
            setIsOpenContact(false);
            setBurrow("burrow");
          }}
        >
          💬
        </span>

        <span
          className={`floatingBox ${burrow}`}
          onClick={() => {
            setIsOpenContact(true);
            setIsOpenMessage(false);
            setBurrow("burrow");
          }}
        >
          👋
        </span>
        <motion.div
          className="floatingBox floatingBoxExpanded floatingBoxMessage"
          initial={{ opacity: 0 }}
          animate={isOpenMessage ? "open" : "closed"}
          variants={messageVariants}
        >
          <motion.span
            className="close"
            onClick={() => {
              setIsOpenMessage(false);
              setBurrow("");
            }}
            variants={floatingBoxItemVariant}
          >
            X
          </motion.span>

          <motion.div className="typingArea" variants={floatingBoxItemVariant}>
            <Typewriter
              options={{
                strings: botText,
                autoStart: true,
                delay: 40,
              }}
            />
          </motion.div>

          <motion.input
            type="text"
            placeholder="Type your message"
            variants={floatingBoxItemVariant}
          />
        </motion.div>
        <motion.div
          className="floatingBox floatingBoxExpanded floatingBoxContact"
          initial={{ opacity: 0 }}
          animate={isOpenContact ? "open" : "closed"}
          variants={contactVariants}
        >
          <motion.span
            className="close"
            onClick={() => {
              setIsOpenContact(false);
              setBurrow("");
            }}
            variants={floatingBoxItemVariant}
          >
            X
          </motion.span>
          <motion.p variants={floatingBoxItemVariant}>
            Get in touch with Alexander Bunn to talk about your next digital
            project
          </motion.p>
          <motion.ul variants={floatingBoxItemVariant}>
            <li>
              <a href="mailto:alexander@applyinnovation.com?Subject=Contact Us">
                Email
              </a>
            </li>
            <li>
              <a href="https://instagram.com">Instagram</a>
            </li>
          </motion.ul>
        </motion.div>
      </div>
      <div className="logo">
        <img src={bg} alt="" className="logoBG" />
        <h1 className="flex">
          <motion.img
            src={imgA}
            alt="A"
            className="letterA"
            style={{ x: -150 }}
            animate={{ x: 0 }}
          />
          <motion.img
            src={imgP}
            alt="P"
            className="letterP"
            style={{ x: -150 }}
            animate={{ x: 0 }}
          />
          <motion.img
            src={imgP}
            alt="P"
            className="letterP2"
            style={{ x: -150 }}
            animate={{ x: 0 }}
          />
          <motion.img
            src={imgL}
            alt="L"
            className="letterL"
            animate={{
              x: [10, 0],
              rotate: [-15, 0],
            }}
            transition={{
              delay: 0.1,
              duration: 0.2,
              times: [0, 1],
            }}
          />
          <motion.img
            src={imgY}
            alt="Y"
            className="letterY"
            style={{ x: 50 }}
            animate={{ x: 0 }}
          />
        </h1>
      </div>
    </div>
  );
}
