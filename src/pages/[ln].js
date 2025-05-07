import Header from "@/components/template/Header";
import MainAboutUs from "@/components/template/MainAboutUs";
import Skills from "@/components/template/Skills";
import Projects from "@/components/template/Projects";
import TeamMember from "@/components/template/TeamMember";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fs from "fs";
import path from "path"
export default function Home({dataLang}) {
  return (
    <section className={`flex flex-col items-center gap-8 pb-8 w-screen px-4`} style={dataLang.lang === "fa" ? {direction: "rtl"} : {direction: "ltr"}}>
      <Header content={dataLang.header} langState={dataLang.lang}/>
      <MainAboutUs content={dataLang.main_about_us} langState={dataLang.lang}/>
      <Projects content={dataLang.projects} langState={dataLang.lang}/>
      <Skills content={dataLang.skills} langState={dataLang.lang}/>
      <TeamMember content={dataLang.team_members} langState={dataLang.lang}/>
      <Footer content={dataLang.footer} langState={dataLang.lang}/>
      <BackToTopButton />
    </section>
  );
}
export async function getStaticPaths() {
  const dataPath = path.join(process.cwd(), "data", "db.json");
  const data = fs.readFileSync(dataPath);
  const dataParsed = JSON.parse(data);
  return {
    paths: dataParsed.lns.map((ln) => {
      return {
        params: {
          ln: ln.lang,
        },
      };
    }),
    fallback: false,
  };
}
export async function getStaticProps(context) {
  let lang = context.params.ln
  const dataPath = path.join(process.cwd(), "data", "db.json");
  const data = fs.readFileSync(dataPath);
  const dataParsed = JSON.parse(data);
  const dataLang = dataParsed.lns.find((ln) => ln.lang === lang);
  
  return {
    props: {
      dataLang
    },
  }
}
