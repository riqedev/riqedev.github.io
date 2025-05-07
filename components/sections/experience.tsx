"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PaddingContainer from "../layouts/paddingContainer";
import ExperienceItem from "../experienceItem";

const EXPERIENCE = [
  {
    date: "Agosto 2023 — Actualidad",
    title: "Ingeniero de Software",
    company: "CTR",
    description:
      "Desarrollo de soluciones IoT, interfaces web con React y apps móviles con React Native. Implementación de dashboards en tiempo real, APIs RESTful y automatización de procesos industriales mediante backend en Python, Node.js y PHP.",
  },
  {
    date: "Enero 2023 — Abril 2023",
    title: "Desarrollador Jr",
    company: "Kimval Ingeniería SPA",
    description:
      "Participación en el desarrollo de plataforma para teleconsultas médicas. Desarrollo full-stack con Java, SQL y ZK Framework, enfocado en funcionalidades seguras y eficientes.",
  },
  {
    date: "Octubre 2022 — Diciembre 2022",
    title: "Monitor y Consultor",
    company: "DIRITT UCT",
    description:
      "Facilitador en talleres de innovación tecnológica para estudiantes de enseñanza media. Diseño de prototipos de apps móviles con enfoque educativo y social.",
  },
];

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["center end", "end end"],
  });

  const fadeIn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const slideIn = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const scaleUp = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section id="experience" className="relative mt-8 scroll-m-20">
      <PaddingContainer>
        <motion.div
          ref={containerRef}
          style={{
            opacity: fadeIn,
            y: slideIn,
            scale: scaleUp,
          }}
          className="px-8 py-20 rounded-lg borderBW sm:py-32"
        >
          <h2 className="text-4xl font-bold mb-16">Experiencia Profesional</h2>
          <ol className="relative">
            {EXPERIENCE.map((exp, index) => (
              <li key={index}>
                <ExperienceItem {...exp} />
              </li>
            ))}
          </ol>
        </motion.div>
      </PaddingContainer>
    </section>
  );
};

export default Experience;
