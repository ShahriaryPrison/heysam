import Icon from "@/assets/images/projects/KetabYar/logo.png";
import Image1 from "@/assets/images/projects/KetabYar/image1.jpg";
import Image2 from "@/assets/images/projects/KetabYar/image2.jpg";
import Image3 from "@/assets/images/projects/KetabYar/image3.jpg";
import Image4 from "@/assets/images/projects/KetabYar/image4.jpg";
import Image5 from "@/assets/images/projects/KetabYar/image5.jpg";

export default {
  id: 6,
  title: "KetabYar",
  tech: "WebSite",
  type: "private",
  status: "Finished",
  icon: Icon,
  description:
    //a project for an export company that specializes in exporting stones and minerals, providing a platform for showcasing products, managing orders, and facilitating international trade.
    "A prototype of an online library built to showcase web design and development capabilities. This project is private and created for educational purposes.",
  images: [
    { size: "desktop", src: Image1 },
    { size: "desktop", src: Image2 },
    { size: "desktop", src: Image3 },
    { size: "desktop", src: Image4 },
    { size: "desktop", src: Image5 },
  ],
  link: "",
  tech_stack: ["react", "Next Js", "Tailwind", "typescript"],
  features: [
    // "Product showcase",
    // "International trade facilitation",
    "User-friendly interface",
  ],
};
