import React, { useEffect, useInsertionEffect, useState } from "react";
import "./style.css";
import AceEditor from "react-ace";
// import FolderTree, { testData } from "react-folder-tree";
// "react-folder-tree": "^5.0.3"
import { useSelector, useDispatch } from "react-redux";
import { getFileSystem } from "./utilities/apiCalls";
import uuid from "react-uuid";

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
// import { store } from "./app/store";
import { Provider } from "react-redux";
// import { ReactComponent as EditIcon } from "./icons/editIcon.svg";
import {
  EditIcon,
  DeleteIcon,
  FolderIcon,
  FolderNormalIcon,
} from "./components/icons";

import { ReNameModal } from "./components/ReNameModal";
import { ACEeditor } from "./components/AceEditor";
import { fileSystemTree } from "./components/AceEditor";
import { setFileSystem } from "./stateManagement/counterSlice";

export default function App() {
  const dispatch = useDispatch();
  const fileSystem = useSelector((state) => state.fileSystem.fileSystem);

  const [files, setFiles] = useState([
    { fileName: "firstFile.js", content: "first file content" },
    { fileName: "secondFile.js", content: "second file content" },
  ]);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [fileIndex, setFileIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState({});

  function handleFileClick(item, index, evt) {
    setFileIndex(index);
  }

  function onTreeStateChange(state) {}

  var elements = [];
  var count = 0;

  function handleEditFileName(evt, tree) {
    console.log("clicked");
    evt.stopPropagation();
    evt.preventDefault();

    setSelectedNode(tree);
    console.log(tree.type);
    setModalOpen(true);
  }

  function expandNode(evt, node) {
    console.log(evt.target.children);
    var visibility = evt.target.parentElement.nextElementSibling.style.display;
    var chidlren = evt.target.parentElement.nextElementSibling;

    switch (visibility) {
      case "none":
        chidlren.style.display = "block";
        evt.target.innerText = " - ";
        break;
      case "block":
        chidlren.style.display = "none";
        evt.target.innerText = " + ";

        break;
      case "":
        chidlren.style.display = "none";
        evt.target.innerText = " + ";

        break;
      default:
        break;
    }
  }

  function handleDirHover(evt, node) {
    if (evt.target == evt.currentTarget) {
      evt.target.children[1].style.display = "inline";
    }
  }

  function handleKeydown(evt) {
    if (evt.key === "Escape") {
      console.log("press escape");
    }
  }

  function hideIconContainer(evt) {
    let containers = document.querySelectorAll(".icon-container");
    containers.forEach(function (item) {
      item.style.display = "none";
    });
  }

  function handleDisplayFileIcons(evt) {
    evt.target.children[0].style.display = "inline";
  }

  function hideFileIcons(evt) {
    let iconsboxes = document.querySelectorAll(".file-icon-container");
    iconsboxes.forEach(function (item) {
      item.style.display = "none";
    });
  }

  function buildTree(node, level = 1) {
    if (node.type === "directory") {
      const children = node.children.map((x) => buildTree(x, level + 1));
      // let id = uuid();

      return (
        <div
          id={node.id}
          key={node.id}
          style={{ paddingLeft: level * 10, width: "100%" }}
          className="dir">
          <span
            onMouseOver={(evt) => handleDirHover(evt, node)}
            onMouseLeave={(evt) => hideIconContainer(evt, node)}
            className="dir-heading">
            <span onClick={(evt) => expandNode(evt, node)}>{"+"}</span>
            {node.name}
            <span className="icon-container">
              <svg
                // onClick={(evt) => insertNodeIntoTree(tree, node.id, node.type)}
                onClick={(evt) => insertNewNode(node.id, node.type)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-folder-plus icon"
                viewBox="0 0 16 16">
                <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
                <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
              </svg>
              <EditIcon />
              <DeleteIcon />
            </span>
          </span>
          <div className="children">{children}</div>
        </div>
      );
    } else if (node.type === "file") {
      return (
        <div
          key={uuid()}
          style={{ paddingLeft: level * 10 + 5 }}
          onMouseEnter={handleDisplayFileIcons}
          onMouseLeave={hideFileIcons}
          className="file">
          {node.name}
          <span className="file-icon-container">
            <svg
              // onClick={(evt) => insertNodeIntoTree(tree, node.id, node.type)}
              onClick={(evt) => insertNewNode(node.id, node.type)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-folder-plus icon"
              viewBox="0 0 16 16">
              <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z" />
              <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z" />
            </svg>
            <EditIcon />
            <DeleteIcon />
          </span>
        </div>
      );
    }
  }

  useEffect(function () {
    getFileSystem().then(function (data) {
      dispatch(setFileSystem(data));
    });
  }, []);

  useEffect(
    function () {
      console.log("$$$$$$$$$$app-state");
      console.log(fileSystem);
    },
    [fileSystem]
  );

  return (
    <div className="grid-container">
      <aside className="sidebar-container">
        {" "}
        {fileSystem && buildTree(fileSystem)}
      </aside>
      <ACEeditor />
      <ReNameModal
        isModalOpen={isModalOpen}
        setModalState={setModalOpen}
        selectedItem={selectedNode}
      />
    </div>
  );
}
