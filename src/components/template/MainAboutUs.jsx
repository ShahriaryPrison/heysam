import Image from "next/image";
import Link from "next/link";
import AboutUsImage from "../../../public/images/heysam-logo.png";
import { TypeAnimation } from "react-type-animation";

function MainAboutUs({ content, langState }) {
  return (
    <section
      id="#about_us"
      className="w-full max-w-7xl mx-auto flex flex-col items-center lg:flex-row lg:justify-center lg:items-center py-12 gap-10 px-8 lg:px-16"
    >
      <div className="text-center lg:text-left w-full flex flex-col items-center lg:items-start gap-6">
        <h2
          className={`max-w-lg text-xl md:text-2xl  lg:text-4xl text-white ${
            langState === "en" ? "font-[Poppins] text-left" : "text-right"
          }`}
        >
          {langState === "fa" ? (
            <>
              <span className="md:text-2xl  lg:text-4xl">
                {" "}
                {content.header.first}{" "}
              </span>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  `${content.header.mid[0]}`,
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  `${content.header.mid[1]}`,
                  1000,
                  `${content.header.mid[2]}`,
                  1000,
                ]}
                wrapper="span"
                speed={10}
                deletionSpeed={10}
                style={{ fontSize: "1em", display: "inline-block" }}
                repeat={Infinity}
                cursor={true}
                className=" text-gradient font-black"
              />
              <span className="md:text-2xl  lg:text-4xl">
                {content.header.last}
              </span>
            </>
          ) : (
            content.header
          )}
        </h2>
        <p
          className={`max-w-lg text-[#E2E2E2] ${
            langState === "fa" ? "text-base text-right" : "text-left"
          }`}
        >
          {content.body}
        </p>
        <Link
          href="#skills"
          className="w-full max-w-40 flex justify-center items-center button-gradient p-2 text-white rounded-lg"
        >
          {content.button}
        </Link>
      </div>

      <div className="glass text-lg  lg:text-xl about-us-animation relative p-5 rounded-3xl w-full    max-w-sm flex flex-col justify-start items-center gap-8">
        <Image
          src={AboutUsImage}
          className="w-full h-fit"
          width="1000"
          height="1000"
          alt="Logo"
          priority
        />
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div className="text-white flex justify-between items-center">
            <h4>Software</h4>
            <h4>Development</h4>
          </div>
          <div className="w-full bg-white h-0.5 bg-opacity-70 rounded-full" />
          <div className="text-[#D7D7D7] flex justify-between items-center">
            <h4>created at</h4>
            <h4>12/23/2023</h4>
          </div>
        </div>
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#18B2DE] opacity-[0.34] blur-[100px] absolute bottom-[-100px] right-[-150px]" />
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#FB37FF] opacity-[0.34] blur-[100px] absolute top-[-100px] left-[-100px]" />
      </div>
    </section>
  );
}

export default MainAboutUs;
