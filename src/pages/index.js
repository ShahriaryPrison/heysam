import SkillsTag from "@/components/modules/SkillsTag";
import Glass from "@/components/modules/Glass";
import Header from "@/components/modules/Header";
import MainAboutUs from "@/components/modules/MainAboutUs";
import MemberBox from "@/components/modules/MemberBox";
import Members from "@/components/template/Members";
import Skills from "@/components/template/Skills";
export default function Home() {
  return (
    <section>
      <Header />
      <MainAboutUs />
      <Skills/>
      <Members />
    </section>
  );
}
