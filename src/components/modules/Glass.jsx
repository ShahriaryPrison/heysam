import Image from "next/image";
import React from "react";

function Glass({ title, tech, image }) {
  return (
    <div className="glass w-full p-6 flex flex-col justify-between items-center gap-8 rounded-3xl ">
      <div className="h-36 relative flex justify-center items-center pt-10">
        <Image
          src={image}
          className="w-4/5 max-w-44"
          width="1000"
          heigh t="1000"
          alt="Logo"
        />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <div className="text-white flex justify-between items-center">
          <h4>{title}</h4>
          <h4>{tech}</h4>
        </div>
        <div className="w-full bg-white h-0.5 bg-opacity-70 rounded-full" />
        <div className="text-[#D7D7D7] flex justify-between items-center">
          <button className="button-gradient w-full px-4 py-2 rounded-xl font-[Poppins]">INFORMATION</button>
        </div>
      </div>
    </div>
  );
}

export default Glass;
