import { LinksFunction } from "remix";
import { motion } from "framer-motion";
import stylesUrl from "../styles/index.css";
import imgA from "../images/A.svg";
import imgP from "../images/P.svg";
import imgL from "../images/L.svg";
import imgY from "../images/Y.svg";
import bg from "../images/bg.png";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="home">
      <motion.h2 initial="hidden" animate="visible" variants={textVariants}>
        Using digital intelligence to transform technology and <br /> customer
        experience for forward-thinking businesses
      </motion.h2>

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
