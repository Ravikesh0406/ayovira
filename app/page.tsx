import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Camps } from "@/components/Camps";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Goal } from "@/components/Goal";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { JoinSection } from "@/components/JoinSection";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { ServicesStrip } from "@/components/ServicesStrip";
import { FAQ_ITEMS } from "@/lib/faq";
import {
  SITE_DESCRIPTION,
  faqSchema,
  jsonLdGraph,
  webPageSchema,
} from "@/lib/seo";

const pageJsonLd = jsonLdGraph([
  webPageSchema({
    path: "/",
    name: "Ayovira | Yoga, Fitness & Wellness Camps in Faridabad",
    description: SITE_DESCRIPTION,
  }),
  faqSchema(FAQ_ITEMS),
]);

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
      <JsonLd data={pageJsonLd} />
    </>
  );
}
