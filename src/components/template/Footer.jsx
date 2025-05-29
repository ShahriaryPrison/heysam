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
      title: "تماس با ما",
      email: "ایمیل",
      phone: "تلفن",
    },
    social: {
      title: "شبکه‌های اجتماعی",
    },
    quickLinks: {
      title: "لینک‌های سریع",
      about: "درباره ما",
      skills: "مهارت‌ها",
      projects: "پروژه‌ها",
      contact: "تماس با ما",
    },
    copyright: "تمام حقوق محفوظ است",
    terms: "قوانین و مقررات",
    privacy: "حریم خصوصی",
  },
  en: {
    contact: {
      title: "Contact Us",
      email: "Email",
      phone: "Phone",
    },
    quickLinks: {
      title: "Quick Links",
      about: "About Us",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact Us",
    },
    social: {
      title: "Social Media",
    },
    copyright: "All rights reserved",
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
      id="footer"
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
                  className="text-white hover:text-[#C77DFF] transition-colors text-left"
                >
                  +98 994 421 5832
                </a>
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
                href={`/${langState}#hero`}
                className="text-gray-300 hover:text-[#C77DFF] transition-colors"
              >
                {content.quickLinks.about}
              </a>
            </li>
            <li>
              <a
                href={`/${langState}#skills`}
                className="text-gray-300 hover:text-[#9B51E0] transition-colors"
              >
                {content.quickLinks.skills}
              </a>
            </li>
            <li>
              <a
                href={`/${langState}#projects`}
                className="text-gray-300 hover:text-[#7F5AFF] transition-colors"
              >
                {content.quickLinks.projects}
              </a>
            </li>
            <li>
              <a
                href={`/${langState}#footer`}
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
