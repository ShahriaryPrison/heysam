import Image from "next/image";
import React from "react";

function MemberBox({ name, tech, gitHubLink, image }) {
  return (
    <div className="glass member-animation flex flex-col justify-between p-8 w-full max-w-sm min-h-96 rounded-[40px] gap-14 text-white">
      <div className="w-full flex justify-center items-center">
        {image ? (
          <div className="member-shadow rounded-full bg-slate-600 w-36 h-36 overflow-hidden">
            <Image
              src={image}
              className="w-full h-full"
              width="1000"
              height="1000"
              alt="user image"
            />
          </div>
        ) : (
          <div className="member-shadow rounded-full bg-[#E8E8E8] bg-opacity-5 w-36 h-36"></div>
        )}
      </div>
      <div className="flex gap-6 flex-col">
        <div className="flex flex-col sm:flex-row justify-between border-b py-2 gap-2">
          <span className="text-nowrap text-xs flex items-end">{name}</span>
          <span className="text-nowrap text-sm flex items-end">{tech}</span>
        </div>
        <div className="flex justify-center ">
          <a
            href={gitHubLink}
            className=" px-4 py-1.5 rounded-xl border border-white flex items-center hover:opacity-40 transition"
            target="_blank"
          >
            <span className="text-nowrap flex items-center pt-0.5">

            Visit GitHub
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default MemberBox;
