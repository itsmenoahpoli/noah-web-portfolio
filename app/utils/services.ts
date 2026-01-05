export interface Service {
  id: number;
  title: string;
  description: string;
  category: "development" | "tutorial";
  technologies?: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Building modern, responsive, and scalable web applications using the latest technologies and best practices.",
    category: "development",
    technologies: ["React", "Next.js", "Vue.js", "Node.js", "Laravel", "TypeScript"],
  },
  {
    id: 2,
    title: "Mobile Development",
    description: "Creating native and cross-platform mobile applications for iOS and Android platforms.",
    category: "development",
    technologies: ["React Native", "iOS", "Android", "Flutter"],
  },
  {
    id: 3,
    title: "Desktop App Development",
    description: "Developing robust desktop applications for Windows, macOS, and Linux operating systems.",
    category: "development",
    technologies: ["Electron", "Python", "C++", "Java"],
  },
  {
    id: 4,
    title: "Basic Programming Tutorial - Web (HTML, CSS, JavaScript)",
    description: "Teaching fundamentals of web development including HTML structure, CSS styling, and JavaScript programming.",
    category: "tutorial",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 5,
    title: "Basic Programming Tutorial - PHP",
    description: "Introduction to PHP programming, covering syntax, functions, and server-side web development concepts.",
    category: "tutorial",
    technologies: ["PHP"],
  },
  {
    id: 6,
    title: "Basic Programming Tutorial - Python",
    description: "Learning Python programming from basics to intermediate level, including data structures and common libraries.",
    category: "tutorial",
    technologies: ["Python"],
  },
  {
    id: 7,
    title: "Basic Programming Tutorial - C",
    description: "Fundamentals of C programming language, covering basic syntax, pointers, memory management, and algorithms.",
    category: "tutorial",
    technologies: ["C"],
  },
];

export const getCategoryLabel = (category: Service["category"]): string => {
  const labels: Record<Service["category"], string> = {
    development: "Software Development",
    tutorial: "Programming Tutorials",
  };
  return labels[category];
};

export const getServicesByCategory = (category: Service["category"]): Service[] => {
  return services.filter((service) => service.category === category);
};

