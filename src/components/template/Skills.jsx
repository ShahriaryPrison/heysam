import SkillsTag from "@/components/modules/SkillsTag";
import skillsData from "@/data/skillData";

function Skills({content}) {
  return (
    <section id="skills" className="w-full max-w-7xl flex flex-col">
      <h4 className="text-white px-4 pb-4 w-full text-5xl">{content.title}</h4>
      <div className="relative w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 justify-center items-center gap-4 place-content-center place-items-center">
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
