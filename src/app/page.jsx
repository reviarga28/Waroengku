import { SpaAbout } from "@/components/spa/about";
import { SpaContact } from "@/components/spa/contact";
import { SpaFooter } from "@/components/spa/footer";
import { SpaHeader } from "@/components/spa/headers";
import { SpaMenu } from "@/components/spa/menu";

export default function HomePage() {
  return (
    <div className="pt-6 scroll-smooth">
        <SpaHeader/>
        <SpaMenu/>
        <SpaAbout/>
        <SpaContact/>
        <SpaFooter/>
    </div>
  )
}
