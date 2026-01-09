export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
}

// export const projects: Project[] = [
//   {
//     id: 1,
//     title: "E-Commerce Platform",
//     description: "Full-stack e-commerce solution with React and Node.js",
//     image: "https://picsum.photos/800/600?random=1",
//     technologies: "React - Node.js - MongoDB",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 2,
//     title: "Task Management App",
//     description: "Collaborative task management with real-time updates",
//     image: "https://picsum.photos/800/600?random=2",
//     technologies: "Vue.js - NestJS - PostgreSQL",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 3,
//     title: "Analytics Dashboard",
//     description: "Data visualization and analytics platform",
//     image: "https://picsum.photos/800/600?random=3",
//     technologies: "React - TypeScript - AWS",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 4,
//     title: "Mobile Banking App",
//     description: "Secure mobile banking application",
//     image: "https://picsum.photos/800/600?random=4",
//     technologies: "React Native - Node.js - Docker",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 5,
//     title: "Social Media Platform",
//     description: "Social networking platform with real-time features",
//     image: "https://picsum.photos/800/600?random=5",
//     technologies: "Vue.js - Laravel - Redis",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 6,
//     title: "Cloud Storage Service",
//     description: "File storage and sharing platform",
//     image: "https://picsum.photos/800/600?random=6",
//     technologies: "Next.js - AWS S3 - Serverless",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 7,
//     title: "Healthcare Management",
//     description: "Patient management and scheduling system",
//     image: "https://picsum.photos/800/600?random=7",
//     technologies: "React - NestJS - PostgreSQL",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 8,
//     title: "Learning Management System",
//     description: "Online education platform",
//     image: "https://picsum.photos/800/600?random=8",
//     technologies: "Vue.js - Laravel - MongoDB",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 9,
//     title: "Real Estate Platform",
//     description: "Property listing and management system",
//     image: "https://picsum.photos/800/600?random=9",
//     technologies: "Next.js - Node.js - AWS",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
//   {
//     id: 10,
//     title: "Food Delivery App",
//     description: "Restaurant ordering and delivery platform",
//     image: "https://picsum.photos/800/600?random=10",
//     technologies: "React Native - Node.js - MongoDB",
//     githubUrl: "#",
//     liveUrl: "#",
//   },
// ];

export const projects: Project[] = [];

export { getTagColor } from "./techColors";
