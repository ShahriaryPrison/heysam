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
import vsImage from "../../public/images/skills/vsc.png";

const skillsData = [
  {
    skill: "Html5",
    skillImage: HtmlImage,
    description: {
      en: "Standard markup language for creating web pages and web applications.",
      fa: "زبان نشانه‌گذاری استاندارد برای ایجاد صفحات وب و برنامه‌های تحت وب.",
    },
  },
  {
    skill: "React",
    skillImage: ReactImage,
    description: {
      en: "A JavaScript library for building user interfaces, primarily single-page applications.",
      fa: "یک کتابخانه جاوااسکریپت برای ساخت رابط‌های کاربری، عمدتاً برنامه‌های تک‌صفحه‌ای.",
    },
  },
  {
    skill: "Tailwind",
    skillImage: tailwindImage,
    description: {
      en: "A utility-first CSS framework for rapidly building custom user interfaces.",
      fa: "یک فریم‌ورک CSS مبتنی بر ابزار برای ساخت سریع رابط‌های کاربری سفارشی.",
    },
  },
  {
    skill: "PHP",
    skillImage: PHPImage,
    description: {
      en: "A popular general-purpose scripting language especially suited to web development.",
      fa: "یک زبان برنامه‌نویسی پرکاربرد و عمومی که به ویژه برای توسعه وب مناسب است.",
    },
  },
  {
    skill: "Pyton", // Typo: should be Python
    skillImage: PytonImage,
    description: {
      en: "A high-level, general-purpose programming language known for its readability.",
      fa: "یک زبان برنامه‌نویسی سطح بالا و عمومی که به دلیل خوانایی بالا شناخته می‌شود.",
    },
  },
  {
    skill: "IOT",
    skillImage: IOTImage,
    description: {
      en: "Expertise in developing and integrating Internet of Things solutions.",
      fa: "تخصص در توسعه و یکپارچه‌سازی راه‌حل‌های اینترنت اشیا (IoT).",
    },
  },
  {
    skill: "Css3",
    skillImage: CssImage,
    description: {
      en: "Cascading Style Sheets Level 3, used for styling web pages.",
      fa: "نسخه ۳ زبان شیوه نامه آبشاری (CSS)، برای استایل‌دهی صفحات وب استفاده می‌شود.",
    },
  },
  {
    skill: "Next Js",
    skillImage: NextImage,
    description: {
      en: "A React framework for production-ready web applications, offering server-side rendering and static site generation.",
      fa: "یک فریم‌ورک React برای برنامه‌های وب آماده تولید، با قابلیت رندر سمت سرور و تولید سایت استاتیک.",
    },
  },
  {
    skill: "Laravel",
    skillImage: LaravelImage,
    description: {
      en: "A popular PHP web application framework with expressive, elegant syntax.",
      fa: "یک فریم‌ورک محبوب برنامه‌های وب PHP با سینتکس بیان‌گرا و زیبا.",
    },
  },
  {
    skill: "Git",
    skillImage: GitImage,
    description: {
      en: "A distributed version control system for tracking changes in source code during software development.",
      fa: "یک سیستم کنترل نسخه توزیع شده برای ردیابی تغییرات در کد منبع در طول توسعه نرم‌افزار.",
    },
  },
  {
    skill: "JavaScript",
    skillImage: JsImage,
    description: {
      en: "A programming language that enables interactive web pages.",
      fa: "یک زبان برنامه‌نویسی که امکان ایجاد صفحات وب تعاملی را فراهم می‌کند.",
    },
  },
  {
    skill: "Node Js",
    skillImage: NodeImage,
    description: {
      en: "A JavaScript runtime built on Chrome's V8 JavaScript engine for server-side applications.",
      fa: "یک محیط اجرایی جاوااسکریپت مبتنی بر موتور V8 کروم برای برنامه‌های سمت سرور.",
    },
  },
  {
    skill: "Sass",
    skillImage: SassImage,
    description: {
      en: "A professional grade CSS extension language for more efficient styling.",
      fa: "یک زبان پیش‌پردازنده CSS حرفه‌ای برای استایل‌دهی کارآمدتر.",
    },
  },
  {
    skill: "LiveWire",
    skillImage: LiveWireImage,
    description: {
      en: "A full-stack framework for Laravel that allows building dynamic interfaces with PHP.",
      fa: "یک فریم‌ورک کامل برای لاراول که امکان ساخت رابط‌های کاربری پویا با PHP را فراهم می‌کند.",
    },
  },
  {
    skill: "Github",
    skillImage: GitHubImage,
    description: {
      en: "A web-based platform for version control and collaboration using Git.",
      fa: "یک پلتفرم مبتنی بر وب برای کنترل نسخه و همکاری با استفاده از گیت.",
    },
  },
  {
    skill: "Docker",
    skillImage: DockerImage,
    description: {
      en: "A platform for developing, shipping, and running applications in containers.",
      fa: "یک پلتفرم برای توسعه، ارسال و اجرای برنامه‌ها در کانتینرها.",
    },
  },
  {
    skill: "Figma",
    skillImage: FigmaImage,
    description: {
      en: "A collaborative web application for interface design and prototyping.",
      fa: "یک برنامه وب مشارکتی برای طراحی و نمونه‌سازی رابط کاربری.",
    },
  },
  {
    skill: "jest",
    skillImage: { src: "https://cdn.simpleicons.org/jest/jest" },
    description: {
      en: "A delightful JavaScript testing framework with a focus on simplicity.",
      fa: "یک فریم‌ورک تست جاوااسکریپت با تمرکز بر سادگی.",
    },
  },
  {
    skill: "flutter",
    skillImage: { src: "https://cdn.simpleicons.org/flutter/fluuter" },
    description: {
      en: "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
      fa: "ابزار رابط کاربری گوگل برای ساخت برنامه‌های بومی کامپایل‌شده برای موبایل، وب و دسکتاپ از یک کدبیس واحد.",
    },
  },
  {
    skill: "linux",
    skillImage: { src: "https://cdn.simpleicons.org/linux" },
    description: {
      en: "Proficiency in using and managing Linux-based operating systems.",
      fa: "تسلط در استفاده و مدیریت سیستم‌عامل‌های مبتنی بر لینوکس.",
    },
  },
  {
    skill: "mongodb",
    skillImage: { src: "https://cdn.simpleicons.org/mongodb" },
    description: {
      en: "A popular NoSQL database program that uses JSON-like documents with optional schemas.",
      fa: "یک برنامه پایگاه داده NoSQL محبوب که از اسناد شبیه JSON با طرح‌های اختیاری استفاده می‌کند.",
    },
  },
  {
    skill: "mysql",
    skillImage: { src: "https://cdn.simpleicons.org/mysql" },
    description: {
      en: "An open-source relational database management system.",
      fa: "یک سیستم مدیریت پایگاه داده رابطه‌ای متن‌باز.",
    },
  },
  {
    skill: "redis",
    skillImage: { src: "https://cdn.simpleicons.org/redis" },
    description: {
      en: "An open-source, in-memory data structure store, used as a database, cache, and message broker.",
      fa: "یک ذخیره‌ساز ساختار داده در حافظه (in-memory) متن‌باز، که به عنوان پایگاه داده، کش و پیام‌رسان استفاده می‌شود.",
    },
  },
  {
    skill: "typescript",
    skillImage: { src: "https://cdn.simpleicons.org/typescript" },
    description: {
      en: "A superset of JavaScript that adds optional static typing to the language.",
      fa: "یک سوپراست از جاوااسکریپت که قابلیت تایپ استاتیک اختیاری را به زبان اضافه می‌کند.",
    },
  },
  {
    skill: "dart",
    skillImage: { src: "https://cdn.simpleicons.org/dart" },
    description: {
      en: "A client-optimized programming language for fast apps on any platform.",
      fa: "یک زبان برنامه‌نویسی بهینه‌سازی شده برای سمت کلاینت برای ساخت برنامه‌های سریع در هر پلتفرمی.",
    },
  },
  {
    skill: "visualstudiocode",
    skillImage: vsImage ,
    description: {
      en: "A free, powerful code editor redefined and optimized for building and debugging modern web and cloud applications.",
      fa: "یک ویرایشگر کد رایگان و قدرتمند که برای ساخت و دیباگ برنامه‌های وب و ابری مدرن بهینه شده است.",
    },
  },
  {
    skill: "gitlab",
    skillImage: { src: "https://cdn.simpleicons.org/gitlab" },
    description: {
      en: "A single application for the entire software development lifecycle.",
      fa: "یک برنامه واحد برای کل چرخه عمر توسعه نرم‌افزار.",
    },
  },
];

// تبدیل به آرایه‌ای از { src, alt, description }
const simplifiedSkills = skillsData.map(
  ({ skill, skillImage, description }) => ({
    src: skillImage.src,
    alt: skill,
    description: description, // اضافه کردن description به simplifiedSkills
  })
);

export default simplifiedSkills;
