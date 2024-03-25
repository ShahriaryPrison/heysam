import SkillsTag from "@/components/modules/SkillsTag";
import Glass from "@/components/modules/Glass";
import Header from "@/components/modules/Header";
import MainAboutUs from "@/components/modules/MainAboutUs";
import MemberBox from "@/components/modules/MemberBox";
export default function Home() {
  return (
    <section>
      <Header />
      <MainAboutUs />
      <SkillsTag />
      <MemberBox/>
    </section>
  );
}
