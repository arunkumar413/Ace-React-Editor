import React, { useEffect, useState } from "react";
import { projectsList } from "../../settingsConfig";

export function Projects() {
  const [projectPath, setProjectPath] = useState("");
  const [project, setProject] = useState(
    localStorage.getItem("currentProject")
  );

  function handleChange(evt) {
    setProjectPath(evt.target.value);
  }

  function handleProjectClick(evt, project) {
    localStorage.setItem("currentProject", project);
    setProject(project);
  }

  const projectElements = projectsList.map(function (item, index) {
    return (
      <div
        style={{ padding: 10 }}
        onClick={(evt) => handleProjectClick(evt, item)}
        key={index.toString()}
      >
        {item}
      </div>
    );
  });

  return (
    <div
      className="Projects"
      style={{ textAlign: "left", width: "100%", gridColumn: "3/12" }}
    >
      <h3>Projects</h3>
      <h5> Current Project:</h5>
      <span> {localStorage.getItem("currentProject")}</span>
      <h5> All Projects:</h5>

      {projectElements}
    </div>
  );
}
