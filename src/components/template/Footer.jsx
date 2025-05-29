import {
  FaTelegramPlane,
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineEmail, MdLocationOn } from "react-icons/md";
import { useState } from "react";
import { motion } from "framer-motion";
import { AuroraText } from "../magicui/aurora-text";

const footerContent = {
  fa: {
    contact: {
      title: "تماس با من",
      email: "ایمیل",
      phone: "تلفن",
      location: "موقعیت",
      address: "قم، ایران",
    },
    quickLinks: {
      title: "لینک‌های سریع",
      about: "درباره من",
      skills: "مهارت‌ها",
      projects: "پروژه‌ها",
      contact: "تماس با من",
    },
    social: {
      title: "شبکه‌های اجتماعی",
      newsletter: "برای دریافت آخرین آپدیت‌ها",
      emailPlaceholder: "آدرس ایمیل شما",
      subscribe: "عضویت",
    },
    copyright: "تمام حقوق محفوظ است",
    terms: "قوانین و مقررات",
    privacy: "حریم خصوصی",
  },
  en: {
    contact: {
      title: "Contact Me",
      email: "Email",
      phone: "Phone",
      location: "Location",
      address: "Qom, Iran",
    },
    quickLinks: {
      title: "Quick Links",
      about: "About Me",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
    },
    social: {
      title: "Social Media",
      newsletter: "Subscribe to newsletter",
      emailPlaceholder: "Your email address",
      subscribe: "Subscribe",
    },
    copyright: "All rights reserved",
    terms: "Terms & Conditions",
    privacy: "Privacy Policy",
  },
};

function Footer({ langState = "fa" }) {
  const [emailCopied, setEmailCopied] = useState(false);
  const content = footerContent[langState];
  const isRTL = langState === "fa";

  const copyEmail = () => {
    navigator.clipboard.writeText("m.shirvani1173@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer
      className="w-full bg-[#1f1d2b] py-12 px-4 sm:px-8 relative overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Gradient Background Elements - Fixed positioning */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#C77DFF] opacity-10 blur-[100px]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#5E7AFF] opacity-10 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {/* Contact Information */}
        <div className="space-y-6">
          <AuroraText className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C77DFF] to-[#5E7AFF]">
            {content.contact.title}
          </AuroraText>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <MdOutlineEmail className="text-[#C77DFF] mt-1 text-xl" />
              <div>
                <p className="text-gray-300">{content.contact.email}</p>
                <div className="flex items-center gap-2 group">
                  <a
                    href="mailto:m.shirvani1173@gmail.com"
                    className="text-white hover:text-[#C77DFF] transition-colors"
                  >
                    m.shirvani1173@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="text-xs bg-[#1f1d2b] border border-[#5E7AFF] px-2 py-1 text-white glass-container rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {emailCopied
                      ? isRTL
                        ? "کپی شد!"
                        : "Copied!"
                      : isRTL
                      ? "کپی"
                      : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-[#C77DFF] mt-1 text-lg" />
              <div>
                <p className="text-gray-300">{content.contact.phone}</p>
                <a
                  href="tel:+989123456789"
                  className="text-white hover:text-[#C77DFF] transition-colors"
                >
                  +98 912 345 6789
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MdLocationOn className="text-[#C77DFF] mt-1 text-xl" />
              <div>
                <p className="text-gray-300">{content.contact.location}</p>
                <p className="text-white">{content.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <AuroraText className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C77DFF] to-[#5E7AFF]">
            {content.quickLinks.title}
          </AuroraText>
          <ul className="space-y-3">
            <li>
              <a
                href="#about"
                className="text-gray-300 hover:text-[#C77DFF] transition-colors"
              >
                {content.quickLinks.about}
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="text-gray-300 hover:text-[#9B51E0] transition-colors"
              >
                {content.quickLinks.skills}
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="text-gray-300 hover:text-[#7F5AFF] transition-colors"
              >
                {content.quickLinks.projects}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-300 hover:text-[#5E7AFF] transition-colors"
              >
                {content.quickLinks.contact}
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div className="space-y-6">
          <AuroraText className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#C77DFF] to-[#5E7AFF]">
            {content.social.title}
          </AuroraText>

          <div className="flex gap-4">
            <motion.a
              href="https://t.me/MoShirv"
              whileHover={{ y: -3 }}
              className="bg-gray-800 p-3 rounded-full hover:bg-cyan-600 transition-colors"
            >
              <FaTelegramPlane className="text-white text-xl" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/heysam.build"
              whileHover={{ y: -3 }}
              className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-colors"
            >
              <FaInstagram className="text-white text-xl" />
            </motion.a>

            <motion.a
              href="https://github.com/ShahriaryPrison"
              whileHover={{ y: -3 }}
              className="bg-gray-800 p-3 rounded-full hover:bg-gray-600 transition-colors"
            >
              <FaGithub className="text-white text-xl" />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <FaLinkedin className="text-white text-xl" />
            </motion.a>
          </div>

          <div className="pt-4">
            <h4 className="text-white mb-3">{content.social.newsletter}</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={content.social.emailPlaceholder}
                className="flex-1 bg-[#2d2b3a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#C77DFF]"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#C77DFF] to-[#5E7AFF] text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                {content.social.subscribe}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-12 mt-8 border-t border-[#2d2b3a] relative z-10">
        <div
          className={`flex flex-col md:flex-row justify-between items-center ${
            isRTL ? "md:flex-row-reverse" : ""
          }`}
        >
          <p className="text-gray-400 text-sm">
            {content.copyright} &copy; {new Date().getFullYear()}{" "}
            <AuroraText>Heysam</AuroraText>
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#C77DFF] text-sm">
              {content.terms}
            </a>
            <a href="#" className="text-gray-400 hover:text-[#9B51E0] text-sm">
              {content.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
