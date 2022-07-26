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

  async function handleSave() {
    //save file content here

    let res = await fetch("http://localhost:5000/rename-file", {
      method: "PUT",
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

  return (
    <div
      className="ReNameModal"
      style={{ display: props.isModalOpen === true ? "block" : "none" }}>
      <div className="modal-header">
        <span style={{ fontWeight: "bold" }}> Rename:</span>{" "}
        <span> File path: {props.selectedItem.path} </span>
      </div>
      <div className="modal-content">
        <input
          value={newFileName}
          onChange={handleChange}
          placeholder="New file name"
          name="rename"
          type="text"
        />
      </div>

      <div className="modal-footer">
        <button className="btn secondary" onClick={handleCloseModal}>
          {" "}
          Cancel
        </button>
        <button className="btn primary" onClick={handleSave}>
          {" "}
          Save{" "}
        </button>{" "}
      </div>
    </div>
  );
}
