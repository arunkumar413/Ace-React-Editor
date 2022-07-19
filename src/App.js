import React, { useEffect, useInsertionEffect, useState } from "react";
import "./style.css";
import AceEditor from "react-ace";
// import FolderTree, { testData } from "react-folder-tree";
// "react-folder-tree": "^5.0.3"
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "react-complex-tree/lib/style.css";
import { ReactComponent as DeleteIcon } from "./icons/deleteIcon.svg";
import { ReactComponent as EditIcon } from "./icons/editIcon.svg";

import { ReNameModal } from "./components/ReNameModal";
import { ACEeditor } from "./components/AceEditor";

export default function App() {
  const [files, setFiles] = useState([
    { fileName: "firstFile.js", content: "first file content" },
    { fileName: "secondFile.js", content: "second file content" },
  ]);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [fileIndex, setFileIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});
  const { fileSystem } = useRecoilValue(fileSystemTree);

  function handleChange(newCode) {
    const newState = files.map(function (item, index) {
      if (item.fileName === selectedFile) {
        return { ...item, content: newCode };
      } else {
        return item;
      }
    });
    setFiles(newState);
  }

  function handleFileClick(item, index, evt) {
    setFileIndex(index);
  }

  function onTreeStateChange(state) {}

  const asideElements = files.map(function (item, index) {
    return (
      <span
        name={item.fileName}
        onClick={(evt) => handleFileClick(item, index, evt)}
        key={index.toString()}>
        {" "}
        {item.fileName}{" "}
      </span>
    );
  });

  var elements = [];
  var count = 0;

  function handleFileHover(evt, tree) {
    console.log(tree.id);
    let editIcon = document.querySelector("#" + "edit" + tree.id);
    let delIcon = document.querySelector("#" + "del" + tree.id);
    editIcon.style.display = "inline";
    delIcon.style.display = "inline";
    // let editClass = ".edit-icon".concat(".", tree.id);
    // let delClass = ".delete-icon".concat(".", tree.id);
    // let editIcon = document.querySelector(editClass);

    // let delIcon = document.querySelector(delClass);

    // editIcon.style.display = "inline";
    // delIcon.style.display = "inline";
  }

  function handleMouseOut(evt, tree) {
    console.log("mouse out");
    evt.stopPropagation(); // Prevent the event from propagating to other elements

    let editIcon = document.querySelector("#" + "edit" + tree.id);
    let delIcon = document.querySelector("#" + "del" + tree.id);
    editIcon.style.display = "none";
    delIcon.style.display = "none";

    let inp = document.querySelector("#" + "input" + tree.id);
    inp.style.display = "none";
    let nameSpan = document.querySelector("#" + "name" + tree.id);
    nameSpan.style.display = "inline";
    evt.stopPropagation(); // Prevent the event from propagating to other elements
  }

  function handleEditFileName(evt, tree) {
    console.log("clicked");
    evt.stopPropagation();
    evt.preventDefault();

    setSelectedNode(tree);
    console.log(tree.type);
    setModalOpen(true);
    // let inp = document.querySelector("#" + "input" + tree.id);
    // inp.style.display = "inline";
    // let nameSpan = document.querySelector("#" + "name" + tree.id);
    // nameSpan.style.display = "none";
  }

  function stopPropagation(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  function parse(tree) {
    count = +1;

    if (tree.type === "file") {
      elements.push(
        <div
          onMouseOver={(evt) => handleFileHover(evt, tree)}
          onMouseOut={(evt) => handleMouseOut(evt, tree)}
          className={`file ${tree.id}`}
          key={tree.id}
          style={{
            paddingLeft: count * 5 + 5,
          }}>
          <span className={`file-actions ${tree.id}`}>
            <span id={"name" + tree.id} className={`file-name ${tree.id}`}>
              {" "}
              {tree.name}{" "}
            </span>
            <input
              type="text"
              id={"input" + tree.id}
              className="input-rename"
            />

            <EditIcon
              id={"edit" + tree.id}
              style={{ display: "none" }}
              className={`edit-icon ${tree.id}`}
              onClick={(evt) => handleEditFileName(evt, tree)}
            />
            <DeleteIcon
              id={"del" + tree.id}
              style={{ display: "none" }}
              className={`delete-icon ${tree.id}`}
              onClick={(evt) => deleteItem(evt, tree)}
            />
          </span>
        </div>
      );
    } else if (tree.type === "directory") {
      elements.push(
        <div
          onMouseOver={(evt) => handleFileHover(evt, tree)}
          onMouseOut={(evt) => handleMouseOut(evt, tree)}
          className={`dir ${tree.id}`}
          key={tree.id}
          style={{ paddingLeft: count * 5 }}>
          {" "}
          <span className={`file-actions ${tree.id}`}>
            <span id={"name" + tree.id} className={`dir-name ${tree.id}`}>
              {" "}
              {tree.name}{" "}
            </span>

            <input
              id={"input" + tree.id}
              onKeyDown={(evt) => handleKeyEvent(evt, tree)}
              className={`input-rename ${tree.id} rename-input`}
            />

            <EditIcon
              id={"edit" + tree.id}
              style={{ display: "none" }}
              onClick={(evt) => handleEditFileName(evt, tree)}
              className={`edit-icon ${tree.id}`}
            />
            <DeleteIcon
              id={"del" + tree.id}
              style={{ display: "none" }}
              onClick={(evt) => deleteItem(evt, tree)}
              className={`delete-icon ${tree.id}`}
            />
          </span>
        </div>
      );
    }

    if (tree.children && tree.children.length) {
      tree.children.forEach(function (item) {
        parse(item);
      });
    }
  }

  parse(fileSystem);

  return (
    <div className="grid-container">
      <aside className="sidebar-container">{elements}</aside>
      <ACEeditor />
      <ReNameModal
        isModalOpen={isModalOpen}
        setModalState={setModalOpen}
        selectedItem={selectedNode}
      />
    </div>
  );
}
