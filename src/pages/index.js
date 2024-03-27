import Header from "@/components/template/Header";
import MainAboutUs from "@/components/template/MainAboutUs";
import MemberBox from "@/components/modules/MemberBox";
import Skills from "@/components/template/Skills";
import Projects from "@/components/template/Projects";
export default function Home() {
  return (
    <section>
      <Header />
      <MainAboutUs />
      <Projects />
      <Skills />
      <MemberBox/>
    </section>
  );
}
