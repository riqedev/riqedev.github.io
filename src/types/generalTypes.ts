// src/types/generalTypes.ts
export interface OnlyChildrenProps {
  children: React.ReactNode;
}

export enum Tech {
  Python = "Python",
  JavaScript = "JavaScript",
  React = "React",
  Next = "Next.js",
  PHP = "PHP",
  Java = "Java",
  HTML = "HTML",
  CSS = "CSS",
  NodeJS = "Node.js",
  GitHub = "GitHub",
  Tailwind = "TailwindCSS",
  MongoDB = "MongoDB",
  MySQL = "MySQL",
  Framer = "Framer Motion",
  AntDesign = "Ant Design",
  MaterialUI = "Material UI",
  Figma = "Figma",
  Typescript = "TypeScript",
  Vercel = "Vercel",
  Astro = "Astro",
  Firebase = "Firebase",
  ReactNative = "React Native",
  Vite = "Vite",
  FastAPI = "FastAPI",
  Flask = "Flask",
  PM2 = "PM2",
  Expo = "Expo",
  Express = "Express",
}

export const certifications = [
  {
    name: "English Certificate 61/100 (C1 Advance)",
    certificationLink: "https://www.efset.org/cert/KiPNRP",
  },

  {
    name: "Machine Learning: Aplicado a Python y Data Science",
    certificationLink: "https://www.udemy.com/certificate/UC-3c086afe-f3f0-4b57-af7a-4438c0ca8a9b/",
  },
  {
    name: "Data Manipulation in Python: Master Python, Numpy & Pandas",
    certificationLink: "https://www.udemy.com/certificate/UC-022b89ef-8d05-40fc-88b9-84d7a1960108/",
  },
  {
    name: "Complete JavaScript, jQuery and React Bootcamp - Hands-On",
    certificationLink: "https://www.udemy.com/certificate/UC-4143e1a3-32a8-42b3-9184-2468e6a3655b/",
  },
  {
    name: "UI/UX Design With Figma : 5+ Real World Projects",
    certificationLink: "https://www.udemy.com/certificate/UC-1cd5e9be-4ba4-418b-9b1c-db0b56a2ab21/",
  },

  {
    name: "Complete Bootstrap & React Bootcamp with Hands-On Projects",
    certificationLink: "https://www.udemy.com/certificate/UC-ee05b7c4-0612-4e15-b33d-8e584e7ee2fe/",
  },
  {
    name: "HTML, CSS, React - Certification Course for Beginners",
    certificationLink: "https://www.udemy.com/certificate/UC-f7044a75-1d64-439d-a0ee-8553cfa05a5e/",
  },
  {
    name: "TailwindCSS from A to Z: Master TailwindCSS Quickly",
    certificationLink: "https://www.udemy.com/certificate/UC-75dbafcf-2eee-4cd4-b824-31e39ccff409/",
  },
] as const;

export const projectsData = [
  {
    title: "Enerlytics",
    description:
      "Dashboard de consumo energético simulado que analiza patrones horarios, muestra tendencias, horas críticas y ventanas óptimas para agendar tareas durante horas de menor carga energética.",
    tags: ["ReactJS", "Vite", "TailwindCSS", "ShadCN/UI", "Recharts"],
    // CAMBIO: Usa el string directo de la ruta en la carpeta public
    imageUrl: "/projects/Enerlytics.png",
    projectLink: "https://github.com/riqedev/Enerlytics",
  },
  {
    title: "DMA",
    description:
      "Plataforma educativa para docentes. Permite diseñar clases, visualizar gráficos y generar PDF, utilizando la taxonomía de aprendizaje SOLO como base.",
    tags: ["ReactJS", "AntDesign", "TailwindCSS", "MongoDB", "Redux"],
    imageUrl: "/projects/DMA.png",
    projectLink: "http://dma2.uct.cl/",
  },
  {
    title: "Weather App",
    description:
      "Aplicación que proporciona información del clima en tiempo real, permite buscar y visualizar informacion de diferentes locaciones del mundo.",
    tags: ["ReactJS", "TailwindCSS", "OpenWeatherMap"],
    imageUrl: "/projects/Weather.png",
    projectLink: "https://github.com/riqedev/Weather-App-ReactJS-TailwindCSS",
  },
  {
    title: "Teleprocesos",
    description:
      "Plataforma que ofrece servicios para realizar consultas telemáticas de manera eficiente y segura a las instituciones de salud.",
    tags: ["Java", "ZK", "SQL Server"],
    imageUrl: "/projects/TelC.png",
    projectLink: "",
  },
  {
    title: "MACD",
    description:
      "Aplicación que permite incorporar dinámicamente nuevos campos en formularios sin alterar la estructura base de una BD.",
    tags: ["PHP", "Laravel", "Bootstrap", "SQL Server"],
    imageUrl: "/projects/MACD.png",
    projectLink: "https://github.com/riqedev/Modulo-Administrador-De-Campos-Dinamicos",
  },
  {
    title: "Detector de células",
    description:
      "Sistema embebido que mediante técnicas de Machine Learning detecta y categoriza células mediante sus diferentes tamaños y tipos.",
    tags: ["Python", "OpenCV", "Numpy"],
    imageUrl: "/projects/Cell.png",
    projectLink: "https://github.com/riqedev/Cells",
  },
  {
    title: "Todo App",
    description:
      "Todo App con funcionalidad CRUD que permite gestionar y organizar tareas dinámicamente con almacenamiento y persistencia en tiempo real.",
    tags: ["ReactJS", "TailwindCSS", "Firebase"],
    imageUrl: "/projects/Todolist.png",
    projectLink: "https://github.com/riqedev/Todo-App-ReactJS-TailwindCSS-Firebase",
  },
] as const;

export interface Project {
  title: string;
  description: string;
  // Usamos 'readonly string[]' porque tu projectsData usa 'as const'
  tags: readonly string[];
  imageUrl: string;
  projectLink: string;
}
