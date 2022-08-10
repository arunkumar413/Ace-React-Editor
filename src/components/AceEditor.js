import React, { useState, useEffect, useRef } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import AceEditor from "react-ace";

// import prettier from "prettier/esm/standalone.mjs";
// import parserBabel from "prettier/esm/parser-babel.mjs";
// import parserHtml from "prettier/esm/parser-html.mjs";

import prettier from "prettier";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
// import "ace-builds/src-noconflict/ext-searchbox";
// import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/ext-searchbox";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNode, setFileContent } from "../stateManagement/nodeSlice";
import { getFileSystem } from "../utilities/apiCalls";
import { selectedTheme } from "../settingsConfig";

export const fileSystemTree = atom({
  key: "fileSystem", // unique ID (with respect to other atoms/selectors)
  default: function () {
    let res = fetch("http://localhost:5000/getdirtree");
    let data = res.json();

    setFileSystem(data);
  },
});

export function ACEeditor(props) {
  const [fileSystem, setFileSystem] = useRecoilState(fileSystemTree);
  const selectedNode = useSelector((state) => state.nodeSlice.currentNode);
  const dispatch = useDispatch();
  const fileContent = useSelector((state) => state.nodeSlice.fileContent);
  const findSlice = useSelector((state) => state.findSlice);
  const aceEditorRef = useRef();
  const formattedCode = useSelector(
    (state) => state.nodeSlice.formattedContent
  );

  const extensionList = {
    css: "css",
    js: "javascript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
    jsx: "jsx",
  };

  function handleChange(editor) {}

  function handleKeypress(evt) {
    if (evt.ctrlKey && e.which === 83) {
      console.log(true);
      e.preventDefault();
      return false;
    }
  }

  function handleAceLoad(editor) {
    editor.commands.addCommand({
      name: "save changes",
      exec: async function (editor) {
        let content = editor.getValue();
        // let formattedCode = prettier.format(content, {
        //   filepath: selectedNode.path,
        // });
        dispatch(setFileContent(content));
        let res = await fetch("http://localhost:5000/save-file", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileContent: content,
            node: JSON.parse(localStorage.getItem("selectedNode")),
          }),
        });
        let data = await res.json();
      },

      bindKey: { win: "ctrl-s" },
    });
  }

  // useEffect(
  //   function () {
  //     async function saveFile() {
  //       let res = await fetch("http://localhost:5000/save-file", {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           fileContent: fileContent,
  //           node: selectedNode,
  //         }),
  //       });
  //       let data = await res.json();
  //     }

  //     saveFile();
  //   },
  //   [fileContent]
  // );

  useEffect(
    function () {
      console.log(selectedNode);
      selectedNode &&
        localStorage.setItem("selectedNode", JSON.stringify(selectedNode));
    },

    [selectedNode]
  );

  return (
    <div className="ace-editor">
      <AceEditor
        ref={aceEditorRef}
        showPrintMargin={false}
        onLoad={handleAceLoad}
        value={fileContent}
        width="100%"
        height="90vh"
        mode={extensionList[props.mode]}
        fontSize={18}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        highlightActiveLine={true}
        enableSnippets={true}
        theme={selectedTheme}
        onChange={handleChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
        }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          tabSize: 2,
        }}
      />
    </div>
  );
}
