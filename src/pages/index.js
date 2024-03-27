import Header from "@/components/template/Header";
import MainAboutUs from "@/components/template/MainAboutUs";
import Skills from "@/components/template/Skills";
import Projects from "@/components/template/Projects";
import TeamMember from "@/components/template/TeamMember";
export default function Home() {
  return (
    <section>
      <Header />
      <MainAboutUs />
      <Projects />
      <Skills />
      <TeamMember/>
    </section>
  );
}
