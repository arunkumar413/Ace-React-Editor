import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CommitHistory } from "../components/git/commitHistory";
import { GitChanges } from "../components/git/gitChanges";
import { GitInit } from "../components/git/gitInit";
import { Projects } from "../components/git/projects";
import {
  setDirLocation,
  setGitCloneLink,
  setGitDirLocation,
} from "../stateManagement/gitSlice";

export function GitPage() {
  const [selected, setSelected] = useState("commit");

  const pageComponents = [
    { name: "initGit", component: <GitInit /> },
    { name: "commit", component: <CommitHistory /> },
    { name: "projects", component: <Projects /> },
  ];

  function handleSelect(evt, item) {
    setSelected(item.name);
  }

  const sidebarItems = [
    { name: "initGit", value: "Initialize git" },
    { value: "Commit history", name: "commit" },
    { name: "projects", value: "Projects" },
  ];

  const sidebarElements = sidebarItems.map(function (item, index) {
    return (
      <span key={index.toString()} onClick={(evt) => handleSelect(evt, item)}>
        {item.value}{" "}
      </span>
    );
  });

  const selectedItem = pageComponents.filter(function (item) {
    return item.name === selected;
  });

  return (
    <div className="GitPage">
      <aside className="git-page-side-bar">{sidebarElements}</aside>
      {/* <GitInit className="git-init" /> */}
      {selectedItem.length && selectedItem[0].component}
    </div>
  );
}
