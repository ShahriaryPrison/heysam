import Image from "next/image";
import React from "react";

function SkillsTag({ skill, image }) {
  return (
    <div className={`w-44 h-16 rounded-full tag-shadow flex ${image ? "justify-start px-6" : "justify-center"}`}>
      <div className={` ${!image && "hidden"} flex justify-center items-center p-3`}>
        {image && (
          <Image
            src={image}
            className="w-10 h-10 absolute"
            width="100"
            height="100"
            alt="skill image"
          />

        )}
      </div>
      <div className={`w-full text-white text-center flex items-center justify-end ${image && "ml-4"}`}>
        <span className="w-full">{skill}</span>
      </div>
    </div>
  );
}

export default SkillsTag;
