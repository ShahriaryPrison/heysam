import React from "react";
import Glass from "../modules/Glass";
import projects from "@/data/projects";

function Projects() {
  return (
    <section
      id="skills"
      className="w-full flex flex-col gap-36 py-10"
    >
      <h4 className="text-white w-full text-center text-3xl">Projects</h4>
      <div className="w-full max-w-2xl grid grid-cols-2 justify-center items-center mx-auto gap-8">
        {projects.map((project) => (
          <div key={project.id}>
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
