import Header from "@/components/template/Header";
import MainAboutUs from "@/components/template/MainAboutUs";
import Skills from "@/components/template/Skills";
import Projects from "@/components/template/Projects";
import TeamMember from "@/components/template/TeamMember";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
export default function Home() {
  return (
    <section className="flex flex-col gap-8 pb-8 w-screen">
      <Header />
      <MainAboutUs />
      <Projects />
      <Skills />
      <TeamMember/>
      <Footer />
      <BackToTopButton />
    </section>
  );
}
