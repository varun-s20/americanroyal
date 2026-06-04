import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { Connect } from "@/components/site/connect";
import { ModernWay } from "@/components/site/modern-way";
import { Reviews } from "@/components/site/reviews";
import { Footer } from "@/components/site/footer";
import { Chatbot } from "@/components/site/chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Connect />
        <ModernWay />
        <Reviews />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
