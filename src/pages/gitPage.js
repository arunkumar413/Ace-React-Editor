import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GitChanges } from "../components/git/gitChanges";
import { GitInit } from "../components/git/gitInit";
import {
  setDirLocation,
  setGitCloneLink,
  setGitDirLocation,
} from "../stateManagement/gitSlice";

export function GitPage() {
  const [selected, setSelected] = useState("");

  const pageComponents = [
    { name: "initGit", component: <GitInit /> },
    { name: "commit", component: <GitChanges /> },
  ];

  function handleSelect(evt, item) {
    setSelected(item.name);
  }

  const sidebarItems = [
    { name: "initGit", value: "Initialize git" },
    { value: "Commit history", name: "commit" },
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
