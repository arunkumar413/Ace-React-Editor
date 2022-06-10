import React, { useEffect, useState } from "react";
import "./style.css";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function App() {
  const [files, setFiles] = useState([
    { fileName: "firstFile.js", content: "first file content" },
    { fileName: "secondFile.js", content: "second file content" },
  ]);

  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [fileIndex, setFileIndex] = useState(0);

  function handleChange(newCode) {
    console.log(newCode);

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
    debugger;
    setFileIndex(index);

    console.log(item.fileName);
  }

  useEffect(
    function () {
      console.log(files);
    },
    [files]
  );

  const asideElements = files.map(function (item, index) {
    return (
      <span
        name={item.fileName}
        onClick={(evt) => handleFileClick(item, index, evt)}
        key={index.toString()}
      >
        {" "}
        {item.fileName}{" "}
      </span>
    );
  });

  return (
    <div className="grid-container">
      <aside className="sidebar-container">{asideElements}</aside>

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
