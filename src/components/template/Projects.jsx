import React from "react";
import Glass from "../modules/Glass";
import projects from "@/data/projects";

function Projects() {
  return (
    <section
      id="skills"
      className="w-full flex flex-col gap-36 py-10 px-8 lg:px-16"
    >
      <h4 className="text-white w-full text-center text-3xl">Projects</h4>
      <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center gap-8">
        {projects.map((project) => (
          <div className="max-w-sm w-full" key={project.id}>
            <Glass
              title={project.title}
              tech={project.tech}
              image={project.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
