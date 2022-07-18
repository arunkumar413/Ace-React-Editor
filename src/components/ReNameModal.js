import React, { useState, useEffect } from "react";

export function ReNameModal(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCloseModal() {
    props.setModalState(false);
  }

  function handleSave() {
    //save file content here
    props.setModalState(false);
  }

  return (
    <div
      className="ReNameModal"
      style={{ display: props.isModalOpen === true ? "block" : "none" }}>
      <div> Modal Header</div>
      <div>
        <label htmlFor="rename"> New file name</label>
        <input name="rename" type="text" />
      </div>

      <div className="modal-footer">
        <button onClick={handleCloseModal}> Cancel</button>
        <button onClick={handleSave}> Save </button>{" "}
      </div>
    </div>
  );
}
