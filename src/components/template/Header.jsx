import Image from "next/image";
import Logo from "../../../public/images/heysam-logo-no-back.png";
import Link from "next/link";
function Header({content , langState}) {
  return (
    <header className="flex justify-between items-center w-full px-2 py-2 sm:py-4 sm:px-6 custom-header-dir">
      <a href="" className="flex justify-center sm:w-full sm:max-w-40 lg:w-min  items-center px-6 sm:px-8 cursor-pointer">
        <Image
          src={Logo}
          className="w-8 h-8 sm:w-11 sm:h-11"
          width="80"
          height="80"
          alt="Logo"
        />
        <p className="text-gradient font-[Poppins] font-bold text-lg sm:text-3xl">EYSAM</p>
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
      <div className="py-4">
        <Link href={"/en"} className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-[#BCBCBC] ${langState === "en" && "border border-[#D7D7D7] rounded-lg"}`}>
          English
        </Link>
        <Link href={"/fa"} className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-[#BCBCBC] ${langState === "fa" && "border border-[#D7D7D7] rounded-lg"}`}>فارسی</Link>
      </div>
    </header>
  );
}

export default Header;
