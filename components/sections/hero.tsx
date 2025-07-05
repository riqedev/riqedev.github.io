"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import PaddingContainer from "../layouts/paddingContainer";
import Particles from "../Particles";
import { FiArrowDownRight } from "react-icons/fi";
import Link from "next/link";

/* Content Animation */
const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const Hero = () => {
  return (
    <section id="hero" className="relative pt-56 sm:pt-60 pb-8 sm:text-center">
      <Particles className="absolute inset-0 -z-10 " />

      <div className="absolute inset-0 z-10  " />
      {/* Content */}
      <PaddingContainer>
        <motion.div variants={itemAnimation} initial="hidden" animate="visible" className="relative z-20">
          <p className="text-primary text-xs md:text-sm font-medium uppercase mb-2">
            Software Engineer · Full-Stack Developer
          </p>
          <h1 className="py-2 text-4xl font-extrabold leading-11 tracking-tight  sm:text-4xl sm:leading-10 md:text-6xl md:leading-14   sm:mx-auto md:max-w-2xl">
            {" "}
            Hola, soy Enrique 👋🏽
          </h1>

          <p className="max-w-xl mx-auto mt-4 text-lg leading-normal text-zinc-600 dark:text-zinc-300">
            <span className="font-medium">
              Apasionado por crear soluciones innovadoras que impulsen el mundo digital.{" "}
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-10 sm:justify-center">
            <Link href="#about">
              <div
                style={{
                  backgroundImage: "radial-gradient(100% 1338.07% at 4.85% 0%, #8B74F6 0%, #B4E5DC 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient 5s ease-out infinite",
                }}
                className=" p-[2px] rounded-lg shadow-md relative"
              >
                {/* Content */}
                <div className="group shadow-lg hover:scale-105 duration-150 transition-all ease-out flex items-center justify-center px-5 py-3 font-medium rounded-lg bg-zinc-800 hover:bg-zinc-900 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100">
                  Conoceme
                  <span className="ml-1 group-hover:rotate-45 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out">
                    <FiArrowDownRight />
                  </span>
                </div>
              </div>
            </Link>

            {/* Platform Icons */}
            <div className="flex items-center gap-4 ">
              <div
                style={{
                  backgroundImage: "radial-gradient(100% 1338.07% at 4.85% 0%, #8B74F6 0%, #B4E5DC 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient 5s ease-out infinite",
                }}
                className=" p-[2px] rounded-lg shadow-md relative"
              >
                <Link
                  target="_blank"
                  className="shadow-lg hover:scale-105 duration-150 transition-all ease-out flex items-center justify-center p-4 font-medium rounded-lg bg-zinc-800 hover:bg-zinc-900 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100 w-fit "
                  href="https://www.linkedin.com/in/enriquefcc/"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </Link>
              </div>
              <div
                style={{
                  backgroundImage: "radial-gradient(100% 1338.07% at 4.85% 0%, #8B74F6 0%, #B4E5DC 100%)",
                  backgroundSize: "200% 200%",
                  animation: "gradient 5s ease-out infinite",
                }}
                className=" p-[2px] rounded-lg shadow-md relative"
              >
                <Link
                  target="_blank"
                  className="shadow-lg hover:scale-105 duration-150 transition-all ease-out flex items-center justify-center p-4 font-medium rounded-lg bg-zinc-800 hover:bg-zinc-900 text-zinc-100 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-100 w-fit "
                  href="https://github.com/LILEnrique"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </PaddingContainer>
    </section>
  );
};

export default Hero;
