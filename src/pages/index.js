import Header from "@/components/modules/Header";
import MainAboutUs from "@/components/modules/MainAboutUs";
import MemberBox from "@/components/modules/MemberBox";
import Skills from "@/components/template/Skills";
export default function Home() {
  return (
    <section>
      <Header />
      <MainAboutUs />
      <Skills />
      <MemberBox/>
    </section>
  );
}
