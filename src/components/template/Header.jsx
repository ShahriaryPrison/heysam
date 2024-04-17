import Image from "next/image";
import Logo from "../../../public/images/heysam-logo-no-back.png";
import Link from "next/link";
function Header({content , langState}) {
  return (
    <header className="flex justify-between items-center w-full py-4 px-6 custom-header-dir">
      <a href="" className="flex justify-center w-full lg:w-min  items-center px-8 cursor-pointer">
        <Image
          src={Logo}
          className="w-11 h-11"
          width="80"
          height="80"
          alt="Logo"
        />
        <p className="text-gradient font-[Poppins] font-bold text-3xl">EYSAM</p>
      </a>
      <ul className="hidden lg:flex gap-6 ">
        <a href="#about_us">
          <li className={`text-[#BCBCBC] list-item-hover ${langState === "fa" && "text-lg font-bold"}`}>{content.about_us}</li>
        </a>
        <a href="#skills">
          <li className={`text-[#BCBCBC] list-item-hover ${langState === "fa" && "text-lg font-bold"}`}>
            {content.projects}
          </li>
        </a>
        <a href="#team-member">
          <li className={`text-[#BCBCBC] list-item-hover ${langState === "fa" && "text-lg font-bold"}`}>{content.team_members}</li>
        </a>
        <a href="#footer">
          <li className={`text-[#BCBCBC] list-item-hover ${langState === "fa" && "text-lg font-bold"}`}>{content.contact_us}</li>
        </a>
      </ul>
      <div className="hidden lg:block">
        <Link href={"/en"} className={`px-6 py-3 text-[#BCBCBC] ${langState === "en" && "border border-[#D7D7D7] rounded-lg"}`}>
          English
        </Link>
        <Link href={"/fa"} className={`px-6 py-3 text-[#BCBCBC] ${langState === "fa" && "border border-[#D7D7D7] rounded-lg"}`}>فارسی</Link>
      </div>
    </header>
  );
}

export default Header;
