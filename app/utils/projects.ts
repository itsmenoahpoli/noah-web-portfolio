export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React and Node.js",
    image: "https://picsum.photos/800/600?random=1",
    technologies: "React - Node.js - MongoDB",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    image: "https://picsum.photos/800/600?random=2",
    technologies: "Vue.js - NestJS - PostgreSQL",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Data visualization and analytics platform",
    image: "https://picsum.photos/800/600?random=3",
    technologies: "React - TypeScript - AWS",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "Mobile Banking App",
    description: "Secure mobile banking application",
    image: "https://picsum.photos/800/600?random=4",
    technologies: "React Native - Node.js - Docker",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "Social networking platform with real-time features",
    image: "https://picsum.photos/800/600?random=5",
    technologies: "Vue.js - Laravel - Redis",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 6,
    title: "Cloud Storage Service",
    description: "File storage and sharing platform",
    image: "https://picsum.photos/800/600?random=6",
    technologies: "Next.js - AWS S3 - Serverless",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 7,
    title: "Healthcare Management",
    description: "Patient management and scheduling system",
    image: "https://picsum.photos/800/600?random=7",
    technologies: "React - NestJS - PostgreSQL",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 8,
    title: "Learning Management System",
    description: "Online education platform",
    image: "https://picsum.photos/800/600?random=8",
    technologies: "Vue.js - Laravel - MongoDB",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 9,
    title: "Real Estate Platform",
    description: "Property listing and management system",
    image: "https://picsum.photos/800/600?random=9",
    technologies: "Next.js - Node.js - AWS",
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 10,
    title: "Food Delivery App",
    description: "Restaurant ordering and delivery platform",
    image: "https://picsum.photos/800/600?random=10",
    technologies: "React Native - Node.js - MongoDB",
    githubUrl: "#",
    liveUrl: "#",
  },
];

export const getTagColor = (tech: string): string => {
  const techLower = tech.toLowerCase();
  const colorMap: Record<string, string> = {
    react: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "react.js":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "react native":
      "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    vue: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    "vue.js":
      "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    nuxt: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    "node.js":
      "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-700",
    nestjs: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    laravel:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    typescript:
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    javascript:
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    "next.js": "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    mongodb:
      "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    postgresql:
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    redis: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    aws: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    "aws s3":
      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    docker: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    serverless:
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    bootstrap:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    "styled components":
      "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    tailwindcss:
      "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    "context api":
      "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300",
    redux:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    vuex: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    firebase:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    "github api":
      "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    "themoviedb api":
      "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "theaudiodb api":
      "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    netlify: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300",
  };

  return (
    colorMap[techLower] ||
    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  );
};

