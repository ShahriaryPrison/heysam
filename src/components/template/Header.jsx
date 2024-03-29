import Image from "next/image";
import Logo from "../../../public/images/heysam-logo-no-back.png";
import Link from "next/link";
import { Trans } from "next-i18next";

function Header() {
  
  return (
    <header className="flex justify-between items-center w-full py-4 px-6">
      <div className="flex items-center">
        <Image
          src={Logo}
          className="w-11 h-11"
          width="80"
          height="80"
          alt="Logo"
        />
        <p className="text-gradient font-[Poppins] font-bold text-3xl">EYSAM</p>
      </div>
      <ul className="flex gap-6">
        <a href="#about_us">
          <li className="text-[#BCBCBC] list-item-hover">ABOUT US</li>
        </a>
        <a href="#skills">
          <li className="text-[#BCBCBC] list-item-hover">
            <Trans i18nKey="skills">
              SKILLSl
            </Trans>
          </li>
        </a>
        <a href="#team-member">
          <li className="text-[#BCBCBC] list-item-hover">TEAM MEMBERS</li>
        </a>
        <a href="#footer">
          <li className="text-[#BCBCBC] list-item-hover">CONTACT US</li>
        </a>
      </ul>
      <div>
        <Link href="" locale="en" className="px-6 py-3 border border-[#D7D7D7] rounded-lg text-[#BCBCBC]">
          English
        </Link>
        <Link href="" locale="fa" className="px-6 py-3  text-[#BCBCBC]">فارسی</Link>
      </div>
    </header>
  );
}

export default Header;
