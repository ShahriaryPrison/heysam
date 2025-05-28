import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { Dock } from "../magicui/dock";
import { DockIcon } from "lucide-react";

function Footer({ content, langState }) {
  const [isShowModal, setIsShowModal] = useState(false);
  return (
    <>
      {isShowModal && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen flex justify-center items-center px-4 z-50 bg-neutral-900 bg-opacity-60">
          <div className="glass-modal relative text-white max-w-96 max-h-60 w-full h-full profile-shadow px-4 sm:px-8 py-4 flex flex-col justify-center items-center rounded-xl gap-8">
            <span>heysam.402@gmail.com</span>
            <button
              className="button-gradient px-4 py-2 rounded-lg"
              onClick={() => setIsShowModal(false)}
            >
              close
            </button>
          </div>
        </div>
      )}
      <section
        id="footer"
        className="text-white flex flex-col justify-center items-center gap-4 w-full max-w-7xl mx-auto pt-10 px-8 lg:px-16  "
      >
        <div className="w-full flex flex-col lg:flex-row lg:justify-between  gap-4 py-6">
          <h5 className="max-w-4xl text-balance text-lg lg:text-3xl">
            {content.main}
          </h5>
          <div className="h-full flex flex-col justify-between items-start gap-8">
            <h6 className="text-2xl lg:text-4xl">{content.sidebar.title}</h6>
            <ul className="flex flex-col h-full justify-between items-start gap-4 font-[Poppins]">
              <li>
                <a
                  href="https://t.me/MoShirv"
                  target="_blank"
                  className={`opacity-80 ${
                    langState === "fa" && "text-lg font-[Vazir]"
                  }`}
                >
                  {content.sidebar.social[0]}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/heysam.build"
                  target="_blank"
                  className={`opacity-80 ${
                    langState === "fa" && "text-lg font-[Vazir]"
                  }`}
                >
                  {content.sidebar.social[1]}
                </a>
              </li>
              <li>
                <button
                  className={`opacity-80 ${
                    langState === "fa" && "text-lg font-[Vazir]"
                  }`}
                  onClick={() => setIsShowModal(true)}
                >
                  {content.sidebar.social[2]}
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/ShahriaryPrison"
                  target="_blank"
                  className={`opacity-80 ${
                    langState === "fa" && "text-lg font-[Vazir]"
                  }`}
                >
                  {content.sidebar.social[3]}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Dock direction="middle">
          <DockIcon>
            <FaGithub />
          </DockIcon>
          <DockIcon>
            <MdOutlineEmail />
          </DockIcon>
          <DockIcon>
            <FaInstagram />
          </DockIcon>
          <DockIcon>
            <FaTelegramPlane />
          </DockIcon>
        </Dock>
        <div className="w-full bg-white h-0.5 bg-opacity-70 rounded-full" />
        <div className="flex justify-between w-full items-center">
          <ul className="flex items-center gap-2 sm:gap-4">
            <li>
              <FaTelegramPlane className="w-4 h-4 sm:w-6 sm:h-6 opacity-60" />
            </li>
            <li>
              <FaInstagram className="w-4 h-4 sm:w-6 sm:h-6 opacity-60" />
            </li>
            <li>
              <MdOutlineEmail className="w-4 h-4 sm:w-6 sm:h-6 opacity-60" />
            </li>
            <li>
              <FaGithub className="w-4 h-4 sm:w-6 sm:h-6 opacity-60" />
            </li>
          </ul>
          <p className="opacity-40 text-xs sm:text-sm">Copyright 2021 Heysam</p>
        </div>
      </section>
    </>
  );
}

export default Footer;
