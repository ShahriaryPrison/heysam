import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <section id="footer" className="text-white flex flex-col justify-center items-center gap-4 w-full max-w-7xl mx-auto pt-10">
      <div className="w-full flex justify-between items-center gap-2 py-6">
        <h5 className="max-w-4xl text-3xl">
          Our team tirelessly strives and offers creative solutions to assist
          you in bringing your web application's superior features to life. From
          detailed needs analysis to design and execution, our team will be by
          your side every step of the way, ensuring your vision becomes a
          reality. Trusting us paves the way to your success. Thank you for
          choosing to collaborate with us.
        </h5>
        <div className="h-full flex flex-col justify-between items-start gap-8">
          <h6 className="text-4xl">Contact</h6>
          <ul className="flex flex-col h-full justify-between items-start gap-4 font-[Poppins]">
            <li>
              <a href="#" className="opacity-80">Telegram</a>
            </li>
            <li>
              <a href="#" className="opacity-80">Instagram</a>
            </li>
            <li>
              <a href="#" className="opacity-80">Email</a>
            </li>
            <li>
              <a href="#" className="opacity-80">Github</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full bg-white h-0.5 bg-opacity-70 rounded-full" />

      <div className="flex justify-between w-full items-center">
        <ul className="flex items-center gap-4">
          <li>
            <FaTelegramPlane className="w-6 h-6 opacity-60" />
          </li>
          <li>
            <FaInstagram className="w-6 h-6 opacity-60" />
          </li>
          <li>
            <MdOutlineEmail className="w-6 h-6 opacity-60" />
          </li>
          <li>
            <FaGithub className="w-6 h-6 opacity-60" />
          </li>
        </ul>
        <p className="opacity-40">Copyright 2021 Heysam</p>
      </div>
    </section>
  );
}

export default Footer;
