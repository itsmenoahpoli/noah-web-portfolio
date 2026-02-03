export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          @itsmenoahpoli | © {currentYear}
        </p>
      </div>
    </footer>
  );
}
