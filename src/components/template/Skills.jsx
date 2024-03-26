import React from "react";
import Title from "../modules/Title";
import SkillsTag from "../modules/SkillsTag";

function Skills() {
  return (
    <div className="flex flex-col gap-8 py-16 px-24 ">
      <Title title={"Skills"} />
      <div className="flex flex-wrap gap-3">
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
        <SkillsTag />
      </div>
    </div>
  );
}

export default Skills;
