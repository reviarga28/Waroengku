import Navbar from "@/components/navbars";
import { SpaAbout } from "@/components/spa/about";
import { SpaContact } from "@/components/spa/contact";
import { SpaFooter } from "@/components/spa/footer";
import { SpaHeader } from "@/components/spa/headers";
import { SpaMenu } from "@/components/spa/menu";
import { SpaTestimonial } from "@/components/spa/testimonial";

export default function HomePage() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <SpaHeader />
      <SpaMenu />
      <SpaAbout />
      <SpaTestimonial />
      <SpaContact />
      <SpaFooter />
    </div>
  );
}
