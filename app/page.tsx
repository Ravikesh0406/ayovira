import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Camps } from "@/components/Camps";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Goal } from "@/components/Goal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JoinSection } from "@/components/JoinSection";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { ServicesStrip } from "@/components/ServicesStrip";
import { FAQ_ITEMS } from "@/lib/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <ServicesStrip />
        <HowItWorks />
        <Camps />
        <Goal />
        <JoinSection />
        <Faq />
      </main>
      <Footer />
      <MobileCtaBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
