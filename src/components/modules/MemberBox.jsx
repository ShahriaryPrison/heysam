import Image from "next/image";
import React from "react";

function MemberBox({ img }) {
  return (
    <div className="flex flex-col p-8 glass w-full max-w-72 rounded-[40px] gap-14 text-white">
      <div className="w-full flex justify-center items-center">
        <div className="rounded-full bg-slate-600 w-36 h-36">
          {/* <Image
          src={img}
          className="w-full"
          width="100"
          height="100"
          alt="user image"
        /> */}
        </div>
      </div>
      <div className="flex gap-4 flex-col">
        <div className="flex justify-between border-b py-1">
          <span>name</span>
          <span>side</span>
        </div>
        <div className="flex justify-center ">
            <div className=" px-4 py-1 rounded-xl border border-white">show in GitHub</div>
        </div>
      </div>
    </div>
  );
}

export default MemberBox;
