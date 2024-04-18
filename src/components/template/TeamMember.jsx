import React from "react";
import MemberBox from "../modules/MemberBox";
import syImage from "../../../public/images/members/sy.jpg";
import mhImage from "../../../public/images/members/mh.jpg";
import psImage from "../../../public/images/members/ps.jpg";
import amImage from "../../../public/images/members/am.jpg";
function TeamMember({content , langState}) {
const teamMembers = [
  {
    id: 1,
    name: content.team_member[0].name,
    tech: content.team_member[0].tech,
    gitHubLink: "https://github.com/sybigdeli",
    image: syImage,
  },
  {
    id: 2,
    name: content.team_member[1].name,
    tech: content.team_member[1].tech,
    gitHubLink: "https://github.com/ammomen",
    image: amImage,
  },
  {
    id: 3,
    name: content.team_member[2].name,
    tech: content.team_member[2].tech,
    gitHubLink: "https://github.com/MShJSTM",
    image: mhImage,
  },
  {
    id: 4,
    name: content.team_member[3].name,
    tech: content.team_member[3].tech,
    gitHubLink: "https://github.com/parsahvi",
    image: psImage,
  },
];
  return (
    <section id="team-member" className="w-full max-w-7xl mx-auto flex flex-col gap-36 py-10 px-8 lg:px-16">
      <h4 className="text-white w-full text-center text-3xl">{content.title}</h4>
      <div className="relative w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 items-center justify-center place-items-center gap-8">
        {teamMembers.map((member) => (
          <MemberBox
            key={member.id}
            name={member.name}
            tech={member.tech}
            gitHubLink={member.gitHubLink}
            image={member.image}
            langState={langState}
          />
        ))}
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#18B2DE] opacity-[0.34] blur-[100px] absolute bottom-[-100px] right-[-100px]" />
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#FB37FF] opacity-[0.34] blur-[100px] absolute top-[-100px] left-[-100px]" />
      </div>
    </section>
  );
}

export default TeamMember;
