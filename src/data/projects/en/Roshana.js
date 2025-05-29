import RohanaImage1 from "@/assets/images/projects/Roshana/image1.jpg";
import RohanaImage2 from "@/assets/images/projects/Roshana/image2.jpg";
import RohanaImage3 from "@/assets/images/projects/Roshana/image3.jpg";
import RoshanaIcon from "../../../../public/images/projects/Roshana/Roshana.png";
// import RohanaVideo from "@/assets/images/projects/Roshana/Roshana.mp4";
export default {
  id: 1,
  title: "Roshana",
  icon: RoshanaIcon,
  type: "public",
  status: "Production",
  tech: "Web App",
  description:
    //charity
    "Roshana is a comprehensive charity management platform designed to streamline the operations of charitable organizations. It provides tools for service tracking, duplicate prevention, and impact measurement, ensuring efficient management of resources and activities. The platform aims to enhance the effectiveness of charitable initiatives by providing a user-friendly interface and robust features.",
  images: [
    { size: "mobile", src: RohanaImage1 },
    { size: "mobile", src: RohanaImage2 },
    { size: "mobile", src: RohanaImage3 },
  ],
  link: "https://roshanaa.com/welcome",
  tech_stack: [
    "Html5",
    "React",
    "Tailwind",
    "Css3",
    "Next Js",
    "JavaScript",
    "Github",
    "Figma",
    "Git",
  ],
  features: [
    "Charity management",
    "Service tracking",
    "Duplicate prevention",
    "Impact measurement",
  ],
};
