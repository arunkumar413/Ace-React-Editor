import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFileSystem } from "../stateManagement/counterSlice";

export function ReNameModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const dispatch = useDispatch();

  function handleCloseModal() {
    setNewFileName("");

    props.setModalState(false);
  }

  async function addNewFile() {
    let res = await fetch("http://localhost:5000/add-new-file", {
      method: props.modalMethod,
      body: JSON.stringify({
        path: props.selectedItem.path,
        newName: newFileName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
    dispatch(setFileSystem(data));
    setNewFileName("");
    props.setModalState(false);
  }

  async function editFileName() {
    debugger;
    let res = await fetch("http://localhost:5000/rename-file", {
      method: props.modalMethod,
      body: JSON.stringify({
        path: props.selectedItem.path,
        newName: newFileName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
    dispatch(setFileSystem(data));

    // props.setModalState(false);
    setNewFileName("");
    props.setModalState(false);
  }

  async function addNewDir() {
    let res = await fetch("http://localhost:5000/add-new-dir", {
      method: props.modalMethod,
      body: JSON.stringify({
        path: props.selectedItem.path,
        newName: newFileName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
    dispatch(setFileSystem(data));

    // props.setModalState(false);
    setNewFileName("");
  }

  async function editDirName() {
    debugger;
    let res = await fetch("http://localhost:5000/edit-dir-name", {
      method: props.modalMethod,
      body: JSON.stringify({
        path: props.selectedItem.path,
        newName: newFileName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
    dispatch(setFileSystem(data));

    // props.setModalState(false);
    setNewFileName("");
    props.setModalState(false);
  }

  async function handleSave() {
    //save file content here

    let res = await fetch("http://localhost:5000/rename-file", {
      method: props.modalMethod,
      body: JSON.stringify({
        path: props.selectedItem.path,
        newName: newFileName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
    dispatch(setFileSystem(data));

    // props.setModalState(false);
    setNewFileName("");
  }

  function handleChange(evt) {
    setNewFileName(evt.target.value);
  }

  useEffect(function () {
    setNewFileName("");
  }, []);

  function getSaveButton() {
    if (props.modalMethod === "PUT" && props.nodeType === "dir") {
      return (
        <button className="btn primary" onClick={editDirName}>
          {" "}
          Save{" "}
        </button>
      );
    } else if (props.modalMethod === "PUT" && props.nodeType === "file") {
      return (
        <button className="btn primary" onClick={editFileName}>
          {" "}
          Save{" "}
        </button>
      );
    } else if (props.modalMethod === "POST" && props.nodeType === "dir") {
      return (
        <button className="btn primary" onClick={addNewDir}>
          {" "}
          Save
        </button>
      );
    } else if (props.modalMethod === "POST" && props.nodeType === "file") {
      return (
        <button className="btn primary" onClick={addNewFile}>
          {" "}
          Save
        </button>
      );
    }
  }

  return (
    <div
      className="ReNameModal"
      style={{ display: props.isModalOpen === true ? "block" : "none" }}
    >
      <div className="modal-header">
        <span style={{ fontWeight: "bold" }}> {props.modalHeading}:</span>{" "}
        <span> path: {props.selectedItem.path} </span>
      </div>
      <div className="modal-content">
        <input
          value={newFileName}
          onChange={handleChange}
          placeholder="New name"
          name="rename"
          type="text"
        />
      </div>

      <div className="modal-footer">
        <button className="btn secondary" onClick={handleCloseModal}>
          {" "}
          Cancel
        </button>
        {getSaveButton()}
      </div>
    </div>
  );
}
