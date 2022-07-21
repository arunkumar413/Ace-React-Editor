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

export const fileSystemTree = atom({
  key: "fileSystem", // unique ID (with respect to other atoms/selectors)
  default: function () {
    let res = fetch("http://localhost:5000/getdirtree");
    let data = res.json();

    setFileSystem(data);
  },
});

export function ACEeditor() {
  const [fileSystem, setFileSystem] = useRecoilState(fileSystemTree);

  // useEffect(function () {
  //   async function getFileSystem() {
  //     let res = await fetch("http://localhost:5000/getdirtree");
  //     let data = await res.json();

  //     setFileSystem(data);
  //   }

  //   getFileSystem();
  // }, []);

  function handleChange() {}

  return (
    <div className="ace-editor">
      <AceEditor
        value=""
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
