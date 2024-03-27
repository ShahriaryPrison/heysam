import SkillsTag from "@/components/modules/SkillsTag";
import HtmlImage from "../../../public/images/skills/Html.png"
import CssImage from "../../../public/images/skills/Css.png"
import JsImage from "../../../public/images/skills/Js.png"
import ReactImage from "../../../public/images/skills/React.png"
import NextImage from "../../../public/images/skills/Next.png"
import NodeImage from "../../../public/images/skills/Node.png"
import tailwindImage from "../../../public/images/skills/Tailwind.png"
import ReactBootstrapImage from "../../../public/images/skills/ReactBootstrap.png"
import SassImage from "../../../public/images/skills/Sass.png"
import PHPImage from "../../../public/images/skills/PHP.png"
import LaravelImage from "../../../public/images/skills/Laravel.png"
import LiveWireImage from "../../../public/images/skills/LiveWire.png"
import PytonImage from "../../../public/images/skills/Pyton.png"
import GitImage from "../../../public/images/skills/Git.png"
import GitHubImage from "../../../public/images/skills/Github.png"
import IOTImage from "../../../public/images/skills/Iot.png"
function Skills() {
    const skillsData = [
        {
            id:1,
            skill : "Html5",
            skillImage : HtmlImage,
        },

        {
            id:2,
            skill : "React",
            skillImage : ReactImage,
        },
        {
            id:3,
            skill : "Tailwind",
            skillImage : tailwindImage,
        },
        {
            id:4,
            skill : "PHP",
            skillImage : PHPImage,
        },
        {
            id:5,
            skill : "Pyton",
            skillImage : PytonImage,
        },
        {
            id:6,
            skill : "IOT",
            skillImage : IOTImage,
        },
        {
            id:7,
            skill : "Css3",
            skillImage : CssImage,
        },
        {
            id:8,
            skill : "Next Js",
            skillImage : NextImage,
        },
        {
            id:9,
            skill : "React Bootstrap",
            skillImage : ReactBootstrapImage,
        },
        {
            id:10,
            skill : "Laravel",
            skillImage : LaravelImage,
        },
        {
            id:11,
            skill : "Git",
            skillImage : GitImage,
        },
        {
            id:12,
            skill : "what you need here",
        },
        {
            id:13,
            skill : "JavaScript",
            skillImage : JsImage,
        },
        {
            id:14,
            skill : "Node Js",
            skillImage : NodeImage,
        },
        {
            id:15,
            skill : "Sass",
            skillImage : SassImage,
        },
        {
            id:16,
            skill : "LiveWire",
            skillImage : LiveWireImage,
        },
        {
            id:17,
            skill : "Github",
            skillImage : GitHubImage,
        },
    ]
  return (
    <section id="skills" className="w-full flex flex-col gap-36 py-10">
      <h4 className="text-white w-full text-center text-3xl">Skills</h4>
      <div className="relative w-full max-w-7xl grid grid-cols-6 justify-center items-center mx-auto grid-rows-3 gap-8">
        {skillsData.map((skill) => (
            <SkillsTag key={skill.id} skill={skill.skill} image={skill.skillImage} />

        ))}
        <div className="w-full h-52 shrink-0 rounded-[448px] bg-gradient-to-r from-cyan-500 to-fuchsia-500  opacity-[0.34] blur-[100px] absolute right-0" />
      </div>
    </section>
  );
}

export default Skills;
