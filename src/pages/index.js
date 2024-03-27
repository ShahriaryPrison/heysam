import Header from "@/components/template/Header";
import MainAboutUs from "@/components/template/MainAboutUs";
import Skills from "@/components/template/Skills";
import Projects from "@/components/template/Projects";
import TeamMember from "@/components/template/TeamMember";
import Footer from "@/components/template/Footer";
export default function Home() {
  return (
    <section className="flex flex-col gap-8 pb-8">
      <Header />
      <MainAboutUs />
      <Projects />
      <Skills />
      <TeamMember/>
      <Footer />
    </section>
  );
}
