import Image from "next/image";
import Link from "next/link";
import AboutUsImage from "../../../public/images/heysam-logo.png";

function MainAboutUs() {
  return (
    <section className="w-full flex justify-center items-center py-12 gap-10">
      <div className="flex flex-col gap-6">
        <h2 className="max-w-lg text-4xl text-white font-[Poppins]">
          Empowering your vision with our tech expertise – let's create
          something extraordinary together.
        </h2>
        <p className="max-w-lg font-[Poppins] text-[#E2E2E2]">
          Versatile expertise across a wide range of programming languages and
          frameworks, ensuring flexibility and adaptability to your project's
          unique needs.
        </p>
        <Link
          href="#"
          className="w-full max-w-40 flex justify-center items-center button-gradient p-2 text-white rounded-lg"
        >
          What can we do
        </Link>
      </div>

      <div className="glass relative p-5 rounded-3xl w-full max-w-md flex flex-col justify-start items-center gap-8">
        <Image
          src={AboutUsImage}
          className="w-full h-fit"
          width="1000"
          height="1000"
          alt="Logo"
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
