import Image from "next/image";
import React from "react";

function SkillsTag({ img, text }) {
  return (
    <div className="w-40 h-14 rounded-3xl tag-shadow flex justify-between">
      <div className="text-white w-2/3 flex items-center justify-end ">
        <span>{text}</span>
      </div>
      <div className="w-1/3 flex justify-center items-center p-3">
        <Image
          src={img}
          className="w-full"
          width="100"
          height="100"
          alt="user image"
        />
      </div>
    </div>
  );
}

export default SkillsTag;
