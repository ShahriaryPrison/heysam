import HtmlImage from "../../public/images/skills/Html.png";
import CssImage from "../../public/images/skills/Css.png";
import JsImage from "../../public/images/skills/Js.png";
import ReactImage from "../../public/images/skills/React.png";
import NextImage from "../../public/images/skills/Next.png";
import NodeImage from "../../public/images/skills/Node.png";
import tailwindImage from "../../public/images/skills/Tailwind.png";
import ReactBootstrapImage from "../../public/images/skills/ReactBootstrap.png";
import SassImage from "../../public/images/skills/Sass.png";
import PHPImage from "../../public/images/skills/PHP.png";
import LaravelImage from "../../public/images/skills/Laravel.png";
import LiveWireImage from "../../public/images/skills/LiveWire.png";
import PytonImage from "../../public/images/skills/Pyton.png";
import GitImage from "../../public/images/skills/Git.png";
import GitHubImage from "../../public/images/skills/Github.png";
import IOTImage from "../../public/images/skills/Iot.png";
import DockerImage from "../../public/images/skills/docker.png";
import FigmaImage from "../../public/images/skills/figma.png";

const skillsData = [
  { skill: "Html5", skillImage: HtmlImage },
  { skill: "React", skillImage: ReactImage },
  { skill: "Tailwind", skillImage: tailwindImage },
  { skill: "PHP", skillImage: PHPImage },
  { skill: "Pyton", skillImage: PytonImage },
  { skill: "IOT", skillImage: IOTImage },
  { skill: "Css3", skillImage: CssImage },
  { skill: "Next Js", skillImage: NextImage },
  { skill: "React Bootstrap", skillImage: ReactBootstrapImage },
  { skill: "Laravel", skillImage: LaravelImage },
  { skill: "Git", skillImage: GitImage },
  { skill: "JavaScript", skillImage: JsImage },
  { skill: "Node Js", skillImage: NodeImage },
  { skill: "Sass", skillImage: SassImage },
  { skill: "LiveWire", skillImage: LiveWireImage },
  { skill: "Github", skillImage: GitHubImage },
  { skill: "Docker", skillImage: DockerImage },
  { skill: "Figma", skillImage: FigmaImage },
  { skill: "jest", skillImage: { src: "https://cdn.simpleicons.org/jest" } },
  {
    skill: "flutter",
    skillImage: { src: "https://cdn.simpleicons.org/flutter" },
  },
  {
    skill: "typescript",
    skillImage: { src: "https://cdn.simpleicons.org/typescript" },
  },
  {
    skill: "dart",
    skillImage: { src: "https://cdn.simpleicons.org/dart" },
  },
  {
    skill: "visualstudiocode",
    skillImage: { src: "https://cdn.simpleicons.org/visualstudiocode" },
  },
  {
    skill: "gitlab",
    skillImage: { src: "https://cdn.simpleicons.org/gitlab" },
  },
];

// تبدیل به آرایه‌ای از { src, alt }
const simplifiedSkills = skillsData.map(({ skill, skillImage }) => ({
  src: skillImage.src,
  alt: skill,
}));

export default simplifiedSkills;
