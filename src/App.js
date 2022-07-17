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
import "react-complex-tree/lib/style.css";
import { ReactComponent as DeleteIcon } from "./icons/deleteIcon.svg";
import { ReactComponent as EditIcon } from "./icons/editIcon.svg";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function App() {
  const [fileSystem, setFileSystem] = useState({});
  const [files, setFiles] = useState([
    { fileName: "firstFile.js", content: "first file content" },
    { fileName: "secondFile.js", content: "second file content" },
  ]);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [fileIndex, setFileIndex] = useState(0);

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

  useEffect(function () {
    async function getFileSystem() {
      let res = await fetch("http://localhost:5000/getdirtree");
      let data = await res.json();

      setFileSystem(data);
    }

    getFileSystem();
  }, []);

  var elements = [];
  var count = 0;

  function handleFileHover(evt, tree) {
    evt.currentTarget.children[0].children[1].style.display = "inline";
    evt.currentTarget.children[0].children[2].style.display = "inline";
  }

  function handleMouseOut(evt, tree) {
    evt.currentTarget.children[0].children[1].style.display = "none";
    evt.currentTarget.children[0].children[2].style.display = "none";
  }

  function handleEditFileName(evt, tree) {
    console.log(tree.path);
  }

  function parse(tree) {
    count = +1;
  
    if (tree.type === "file") {
      elements.push(
        <div
          onMouseOver={(evt) => handleFileHover(evt, tree)}
          onMouseOut={(evt) => handleMouseOut(evt, tree)}
          className="file"
          key={tree.name}
          style={{
            paddingLeft: count * 5 + 5,
          }}>
          <span className="file-actions">
            <span> {tree.name} </span>

            <EditIcon
              style={{ display: "none" }}
              className="edit-icon"
              onClick={(evt) => handleEditFileName(evt, tree)}
            />
            <DeleteIcon
              style={{ display: "none" }}
              className="delete-icon"
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
          className="dir"
          key={tree.name}
          style={{ paddingLeft: count * 5 }}>
          {" "}
          <span className="file-actions">
            <span> {tree.name} </span>

            <EditIcon
              style={{ display: "none" }}
              onClick={(evt) => handleEditFileName(evt, tree)}
            />
            <DeleteIcon
              style={{ display: "none" }}
              onClick={(evt) => deleteItem(evt, tree)}
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

      <AceEditor
        value={files[fileIndex].content}
        height="90vh"
        mode="javascript"
        fontSize={16}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        highlightActiveLine={true}
        enableSnippets={true}
        theme="github"
        onChange={handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
        }}
      />
    </div>
  );
}
