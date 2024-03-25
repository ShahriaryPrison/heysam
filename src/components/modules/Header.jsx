import Image from "next/image";
import Logo from "../../../public/images/heysam-logo-no-back.png";
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
        <li className="text-gradient-header">HOME</li>
        <li className="text-[#BCBCBC] list-item-hover">ABOUT US</li>
        <li className="text-[#BCBCBC] list-item-hover">TECHNOLOGIES</li>
        <li className="text-[#BCBCBC] list-item-hover">CONTACT US</li>
      </ul>
      <div>
        <button className="px-6 py-3 border border-[#D7D7D7] rounded-lg text-[#BCBCBC]">English</button>
        <button className="px-6 py-3  text-[#BCBCBC]">فارسی</button>
      </div>
    </header>
  );
}

export default Header;