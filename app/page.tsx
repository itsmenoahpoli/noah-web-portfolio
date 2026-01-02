import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans dark:bg-black">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
