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

export function ACEeditor() {
  const fileSystemTree = atom({
    key: "fileSystem", // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
  });

  const [fileSystem, setFileSystem] = useRecoilState(fileSystemTree);

  useEffect(function () {
    async function getFileSystem() {
      let res = await fetch("http://localhost:5000/getdirtree");
      let data = await res.json();

      setFileSystem(data);
    }

    getFileSystem();
  }, []);

  return (
    <div className="ace-editor">
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
