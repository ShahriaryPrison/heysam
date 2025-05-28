import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

import { Dock, DockIcon } from "../magicui/dock";

function Footer({ content, langState }) {
  return (
    <>
      <section
        id="footer"
        className="w-full max-w-7xl flex flex-col text-white"
      >
        <div className="w-full flex flex-col gap-1">
          <h4 className="text-white px-4 pb-4 w-full font-bold text-5xl">
            {content.sidebar.title}
          </h4>
          <div className="flex pb-10 px-6 gap-2 flex-col sm:flex-row">
            <Dock direction="middle">
              <DockIcon>
                <a href="https://t.me/MoShirv">
                  <FaTelegramPlane className="w-6 h-6" />
                </a>
              </DockIcon>
              <DockIcon>
                <a href="https://www.instagram.com/heysam.build">
                  <FaInstagram className="w-6 h-6" />
                </a>
              </DockIcon>
              <DockIcon>
                <a href="mailto:m.shirvani1173@gmail.com">
                  <MdOutlineEmail className="w-6 h-6" />
                </a>
              </DockIcon>
              <DockIcon>
                <a href="https://github.com/ShahriaryPrison">
                  <FaGithub className="w-6 h-6" />
                </a>
              </DockIcon>
            </Dock>
            <h5 className="flex items-end">{content.main}</h5>
          </div>
        </div>
        <div className="w-full bg-white h-0.5 bg-opacity-70 rounded-full" />
        <div className="mt-8">
          <p className="text-sm text-center">
            {content.copyright} &copy; {new Date().getFullYear()}{" "}
            <span className="text-gradient">Heysam</span>
          </p>
        </div>
      </section>
    </>
  );
}

export default Footer;
