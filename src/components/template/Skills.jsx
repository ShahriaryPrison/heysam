import SkillsTag from "@/components/modules/SkillsTag";
import skillsData from "@/data/skillData";

function Skills() {
  return (
    <section id="skills" className="w-full flex flex-col gap-36 py-10 px-8 lg:px-16">
      <h4 className="text-white w-full text-center text-3xl">Skills</h4>
      <div className="relative w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 justify-center items-center gap-8 place-content-center place-items-center">
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
