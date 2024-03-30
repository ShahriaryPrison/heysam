import React from "react";
import MemberBox from "../modules/MemberBox";
import teamMembers from "@/data/teamMembers";

function TeamMember() {
  return (
    <section id="team-member" className="w-full max-w-7xl mx-auto flex flex-col gap-36 py-10 px-8 lg:px-16">
      <h4 className="text-white w-full text-center text-3xl">Team Members</h4>
      <div className="relative w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8">
        {teamMembers.map((member) => (
          <MemberBox
            key={member.id}
            name={member.name}
            tech={member.tech}
            gitHubLink={member.gitHubLink}
            image={member.image}
          />
        ))}
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#18B2DE] opacity-[0.34] blur-[100px] absolute bottom-[-100px] right-[-100px]" />
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#FB37FF] opacity-[0.34] blur-[100px] absolute top-[-100px] left-[-100px]" />
      </div>
    </section>
  );
}

export default TeamMember;
