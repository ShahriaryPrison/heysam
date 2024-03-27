import React from "react";
import MemberBox from "../modules/MemberBox";
import syImage from "../../../public/images/members/sy.jpg";
import mhImage from "../../../public/images/members/mh.jpg";
import psImage from "../../../public/images/members/ps.jpg";

function TeamMember() {
  const teamMembers = [
    {
      id: 1,
      name: "Seyyed Sadrodin Bigdeli",
      tech: "Front End",
      gitHubLink: "https://github.com/sybigdeli",
      image: syImage,
    },
    {
      id: 2,
      name: "Amir Hosseyn Momen",
      tech: "Front End",
      gitHubLink: "https://github.com/ammomen",
    },
    {
      id: 3,
      name: "Mohammad Shirvani",
      tech: "Back End",
      gitHubLink: "https://github.com/MShJSTM",
      image: mhImage,
    },
    {
      id: 4,
      name: "Parsa Khosravi",
      tech: "Back End",
      gitHubLink: "https://github.com/parsahvi",
      image: psImage,
    },
  ];
  return (
    <section id="team-member" className="w-full flex flex-col gap-36 py-10">
      <h4 className="text-white w-full text-center text-3xl">Team Members</h4>
      <div className="relative w-full max-w-7xl grid grid-cols-4 justify-center items-center mx-auto gap-4">
        {teamMembers.map((member) => (
          <MemberBox
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
