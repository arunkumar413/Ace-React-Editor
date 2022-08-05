import React, { useEffect, useInsertionEffect, useRef, useState } from "react";
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
// import {
//   EditIcon,

//   DeleteIcon,
//   FolderIcon,
//   FolderNormalIcon,
// } from "./components/icons";
import { ReactComponent as EditIcon } from "./icons/editIcon.svg";
import { ReactComponent as DeleteIcon } from "./icons/deleteIcon.svg";
import { ReactComponent as FolderPlusIcon } from "./icons/folderPlusIcon.svg";
import { ReactComponent as FilePlusIcon } from "./icons/filePlusIcon.svg";
import { ReactComponent as SettingsIcon } from "./icons/settingsIcon.svg";
import { ReactComponent as SearchIcon } from "./icons/searchIcon.svg";

import { ReNameModal } from "./components/ReNameModal";
import { ACEeditor } from "./components/AceEditor";
import { fileSystemTree } from "./components/AceEditor";
import { setFileSystem } from "./stateManagement/counterSlice";
import { setCurrentNode, setFileContent } from "./stateManagement/nodeSlice";
import { Link } from "react-router-dom";
import { FindComponent } from "./components/FindComponent";
import { setShowSearchInput } from "./stateManagement/findSlice";

export default function App() {
  const dispatch = useDispatch();
  const fileSystem = useSelector((state) => state.fileSystem.fileSystem);
  const isShowSearchOn = useSelector(
    (state) => state.findSlice.showSearchInput
  );

  const [files, setFiles] = useState([
    { fileName: "firstFile.js", content: "first file content" },
    { fileName: "secondFile.js", content: "second file content" },
  ]);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [fileIndex, setFileIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalMethod, setModalMethod] = useState("");
  const [nodeType, setNodeType] = useState("");
  const [fileExtension, setFileExtension] = useState("");

  const [selectedNode, setSelectedNode] = useState({});

  function handleFileClick(item, index, evt) {
    setFileIndex(index);
  }

  function onTreeStateChange(state) {}

  var elements = [];
  var count = 0;

  function handleEditFileName(evt, tree) {
    evt.stopPropagation();
    evt.preventDefault();

    setSelectedNode(tree);
    setModalOpen(true);
  }

  function expandNode(evt, node) {
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

  function addNewFile(node) {
    debugger;
  }

  function editNodeName(node, type) {
    debugger;
    setModalOpen(true);
    node.type === "directory"
      ? setModalHeading("Edit directory name")
      : setModalHeading("Edit file name");

    setSelectedNode(node);
    setModalMethod("PUT");
    setNodeType(type);
  }

  function addNewNode(node, type) {
    debugger;
    setModalOpen(true);
    type === "dir"
      ? setModalHeading("Add new directory")
      : setModalHeading("Add new File");
    setSelectedNode(node);
    setModalMethod("POST");
    setNodeType(type);
  }

  async function handleSelectFile(node) {
    debugger;
    let res = await fetch(
      "http://localhost:5000/get-file-content?path=" + node.path,
      {
        method: "GET",
        // body: JSON.stringify({
        //   path: node.path,
        // }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let fileContent = await res.json();
    // setSelectedFileContent(fileContent);
    dispatch(setFileContent(fileContent));
    let pathArr = node.path.split("/");
    let fileName = pathArr[pathArr.length - 1];
    let fileNameArr = fileName.split(".");
    let fileExt = fileNameArr[fileNameArr.length - 1];
    console.log("################# file name arr ################");
    console.log(fileExt);
    setFileExtension(fileExt);
    setSelectedNode(node);
    dispatch(setCurrentNode(node));
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
          className="dir"
        >
          <span
            onMouseOver={(evt) => handleDirHover(evt, node)}
            onMouseLeave={(evt) => hideIconContainer(evt, node)}
            className="dir-heading"
          >
            <span onClick={(evt) => expandNode(evt, node)}>{"+"}</span>
            {node.name}
            <span className="icon-container">
              <FolderPlusIcon onClick={(evt) => addNewNode(node, "dir")} />
              <FilePlusIcon onClick={(evt) => addNewNode(node, "file")} />

              <EditIcon onClick={(evt) => editNodeName(node, "dir")} />
              <DeleteIcon />
            </span>
          </span>
          <div className="children">{children}</div>
        </div>
      );
    } else if (node.type === "file") {
      return (
        <div
          onClick={(evt) => handleSelectFile(node)}
          key={uuid()}
          style={{ paddingLeft: level * 10 + 5 }}
          onMouseEnter={handleDisplayFileIcons}
          onMouseLeave={hideFileIcons}
          className="file"
        >
          {node.name}
          <span className="file-icon-container">
            {/* <FolderPlusIcon onClick={(evt) => addNewNode(node, "dir")} />
            <FilePlusIcon onClick={(evt) => addNewNode(node, "file")} /> */}

            <EditIcon onClick={(evt) => editNodeName(node, "file")} />
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

  function handleSearch() {
    dispatch(setShowSearchInput());
    console.log(isShowSearchOn);
  }

  return (
    <div className="grid-container">
      <aside className="sidebar-container">
        {" "}
        {fileSystem && buildTree(fileSystem)}
      </aside>
      <ACEeditor fileContent={selectedFileContent} mode={fileExtension} />
      <ReNameModal
        isModalOpen={isModalOpen}
        setModalState={setModalOpen}
        selectedItem={selectedNode}
        modalHeading={modalHeading}
        modalMethod={modalMethod}
        nodeType={nodeType}
      />
      <FindComponent />
      <aside className="right-aside">
        <Link to="/settings">
          <SettingsIcon />
        </Link>
        <SearchIcon onClick={handleSearch} />
      </aside>
    </div>
  );
}
