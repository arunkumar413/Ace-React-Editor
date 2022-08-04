import React, { useState, useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useDispatch, useSelector } from "react-redux";
import { setFileContent } from "../stateManagement/nodeSlice";
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

  // useEffect(function () {
  //   async function getFileSystem() {
  //     let res = await fetch("http://localhost:5000/getdirtree");
  //     let data = await res.json();

  //     setFileSystem(data);
  //   }

  //   getFileSystem();
  // }, []);

  const extensionList = {
    css: "css",
    js: "javascript",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
  };

  function handleChange() {}

  function handleKeypress() {
    console.log("##### Key Press #####");
  }

  function handleAceLoad(editor) {
    console.log("######## Editor ########");
    editor.commands.addCommand({
      name: "save changes",
      exec: function () {
        let content = editor.getValue();
        dispatch(setFileContent(content));
      },

      bindKey: { win: "ctrl-s" },
    });
  }
  console.log("############## selected node ################");
  console.log(selectedNode);

  useEffect(
    function () {
      async function saveFile() {
        let res = await fetch("http://localhost:5000/save-file", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileContent: fileContent,
            node: selectedNode,
          }),
        });
        let data = await res.json();
      }

      saveFile();
    },
    [fileContent]
  );

  return (
    <div className="ace-editor">
      <AceEditor
        showPrintMargin={false}
        onLoad={handleAceLoad}
        onKeyPress={handleKeypress}
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
        }}
      />
    </div>
  );
}
