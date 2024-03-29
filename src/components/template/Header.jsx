import Image from "next/image";
import Logo from "../../../public/images/heysam-logo-no-back.png";
function Header() {
  return (
    <header className="flex justify-between items-center w-full py-4 px-6">
      <div className="flex justify-center w-full lg:w-min  items-center">
        <Image
          src={Logo}
          className="w-11 h-11"
          width="80"
          height="80"
          alt="Logo"
        />
        <p className="text-gradient font-[Poppins] font-bold text-3xl">EYSAM</p>
      </div>
      <ul className="hidden lg:flex gap-6 ">
        <a href="#about_us">
          <li className="text-[#BCBCBC] list-item-hover">ABOUT US</li>
        </a>
        <a href="#skills">
          <li className="text-[#BCBCBC] list-item-hover">
            BACKGROUND
          </li>
        </a>
        <a href="#team-member">
          <li className="text-[#BCBCBC] list-item-hover">TEAM MEMBERS</li>
        </a>
        <a href="#footer">
          <li className="text-[#BCBCBC] list-item-hover">CONTACT US</li>
        </a>
      </ul>
      <div className="hidden lg:block">
        <button className="px-6 py-3 border border-[#D7D7D7] rounded-lg text-[#BCBCBC]">
          English
        </button>
        <button className="px-6 py-3  text-[#BCBCBC]">فارسی</button>
      </div>
    </header>
  );
}

export default Header;
