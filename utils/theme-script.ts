export const themeScript = `
(function() {
  document.documentElement.classList.add('dark');
  localStorage.setItem('theme', 'dark');
})();
`.trim();

