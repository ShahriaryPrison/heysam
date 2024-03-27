import SkillsTag from "@/components/modules/SkillsTag";
import skillsData from "@/data/skillData";

function Skills() {
  return (
    <section id="skills" className="w-full flex flex-col gap-36 py-10">
      <h4 className="text-white w-full text-center text-3xl">Skills</h4>
      <div className="relative w-full max-w-7xl grid grid-cols-6 justify-center items-center mx-auto grid-rows-3 gap-8">
        {skillsData.map((skill) => (
          <SkillsTag
            key={skill.id}
            skill={skill.skill}
            image={skill.skillImage}
          />
        ))}
        <div className="w-full h-52 shrink-0 rounded-[448px] bg-gradient-to-r from-cyan-500 to-fuchsia-500  opacity-[0.34] blur-[100px] absolute right-0" />
      </div>
    </section>
  );
}

export default Skills;
