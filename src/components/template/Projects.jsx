import React from "react";
import Glass from "../modules/Glass";
import projects from "@/data/projects";

function Projects() {
  return (
    <section
      id="skills"
      className="relative w-full max-w-7xl mx-auto flex flex-col gap-36 py-10 px-8 lg:px-16"
    >
      <h4 className="text-white w-full text-center text-3xl">Projects</h4>
      <div className="w-full max-w-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-4">
        {projects.map((project) => (
          <Glass
            key={project.id}
            title={project.title}
            tech={project.tech}
            image={project.image}
            description={project.dsecription}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
