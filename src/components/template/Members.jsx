import React from "react";
import MemberBox from "../modules/MemberBox";
import Title from "../modules/Title";

function Members() {
  return (
    <div className="flex flex-col gap-8 py-16 px-14 ">
      <Title title={"TEAM MEMBERZS"} />
      <div className="grid justify-items-center gap-3 grid-cols-1 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
        <MemberBox />
        <MemberBox />
        <MemberBox />
        <MemberBox />
      </div>
    </div>
  );
}

export default Members;
