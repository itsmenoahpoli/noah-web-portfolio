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
    html: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
    css: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    php: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    python: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    c: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    "c++": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    java: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    ios: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
    android: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    flutter: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
    electron: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
  };

  return (
    colorMap[techLower] ||
    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
  );
};

