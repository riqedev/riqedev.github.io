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
    title: "RIQE Virtual Lens Lab",
    description: {
      es: "Simulador de óptica de cámara en tiempo real. Sin fotos de fondo, todo se genera proceduralmente. Ajusta focal length, apertura, distancia de foco y número de láminas del diafragma para ver bokeh, profundidad de campo, distorsión y viñeteo renderizados con física real.",
      en: "Real-time camera optics simulator. No background photos: everything is generated procedurally. Adjust focal length, aperture, focus distance and the number of aperture blades to see bokeh, depth of field, distortion and vignetting rendered with real physics.",
    },
    tags: ["React Three Fiber", "TypeScript", "Vite", "drei", "postprocessing", "ShadCN/UI", "TailwindCSS"],
    imageUrl: "/projects/RIQE-LAB.webp",
    projectLink: "https://riqe-lab.vercel.app/",
    repoLink: "https://github.com/riqedev/riqe-lab",
  },
  {
    title: "RIQE Exif Frame",
    description: {
      es: "Lee los datos de toma de una foto (cámara, lente y exposición), avisa si trae la ubicación GPS o el número de serie de la cámara y exporta una versión con marco y sin metadatos. Todo corre en el navegador: la foto no se sube a ningún servidor.",
      en: "Reads a photo's shot data (camera, lens and exposure), warns you if it carries GPS location or the camera's serial number, and exports a framed copy without metadata. Everything runs in the browser: the photo is never uploaded.",
    },
    tags: ["React", "TypeScript", "Vite", "Canvas API", "exifr", "TailwindCSS"],
    imageUrl: "/projects/RIQE-EXIF.webp",
    repoLink: "https://github.com/riqedev/riqe-exif",
    projectLink: "https://riqe-exif.vercel.app/",
  },
  {
    title: "Enerlytics",
    description: {
      es: "Dashboard de consumo energético simulado que analiza patrones horarios, muestra tendencias, horas críticas y ventanas óptimas para agendar tareas durante horas de menor carga energética.",
      en: "Simulated energy consumption dashboard that analyzes hourly patterns and shows trends, peak hours and the best windows to schedule tasks during off-peak periods.",
    },
    tags: ["ReactJS", "Vite", "TailwindCSS", "ShadCN/UI", "Recharts"],
    imageUrl: "/projects/Enerlytics.webp",
    projectLink: "https://github.com/riqedev/Enerlytics",
  },
  {
    title: "DMA",
    description: {
      es: "Plataforma educativa para docentes. Permite diseñar clases, visualizar gráficos y generar PDF, utilizando la taxonomía de aprendizaje SOLO como base.",
      en: "Educational platform for teachers. Design lessons, view charts and generate PDFs, built on the SOLO learning taxonomy.",
    },
    tags: ["ReactJS", "AntDesign", "TailwindCSS", "MongoDB", "Redux"],
    imageUrl: "/projects/DMA.webp",
    projectLink: "http://dma2.uct.cl/",
  },
  {
    title: "Weather App",
    description: {
      es: "Aplicación que proporciona información del clima en tiempo real, permite buscar y visualizar informacion de diferentes locaciones del mundo.",
      en: "Real-time weather app to search and view conditions for locations around the world.",
    },
    tags: ["ReactJS", "TailwindCSS", "OpenWeatherMap"],
    imageUrl: "/projects/Weather.webp",
    projectLink: "https://github.com/riqedev/Weather-App-ReactJS-TailwindCSS",
  },
  {
    title: "Teleprocesos",
    description: {
      es: "Plataforma que ofrece servicios para realizar consultas telemáticas de manera eficiente y segura a las instituciones de salud.",
      en: "Platform for efficient and secure telemedicine consultations for healthcare institutions.",
    },
    tags: ["Java", "ZK", "SQL Server"],
    imageUrl: "/projects/TelC.webp",
    projectLink: "",
  },
  {
    title: "MACD",
    description: {
      es: "Aplicación que permite incorporar dinámicamente nuevos campos en formularios sin alterar la estructura base de una BD.",
      en: "App that dynamically adds new fields to forms without changing the base database structure.",
    },
    tags: ["PHP", "Laravel", "Bootstrap", "SQL Server"],
    imageUrl: "/projects/MACD.webp",
    projectLink: "https://github.com/riqedev/Modulo-Administrador-De-Campos-Dinamicos",
  },
  {
    title: "Detector de células",
    description: {
      es: "Sistema embebido que mediante técnicas de Machine Learning detecta y categoriza células mediante sus diferentes tamaños y tipos.",
      en: "Embedded system that uses Machine Learning techniques to detect and classify cells by size and type.",
    },
    tags: ["Python", "OpenCV", "Numpy"],
    imageUrl: "/projects/Cell.webp",
    projectLink: "https://github.com/riqedev/Cells",
  },
] as const;

export type Project = (typeof projectsData)[number];
