import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-transparent text-[var(--foreground)] font-sans">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
