import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDirLocation,
  setGitCloneLink,
  setGitDirLocation,
  setValue,
  val,
} from "../../stateManagement/gitSlice";

export function GitInit() {
  const [initConfig, setInitConfig] = useState({});
  const gitDirLocation = useSelector((state) => state.gitSlice.dirLocation);
  const dispatch = useDispatch();

  async function handleInitialize() {
    let res = await fetch("http://localhost:5000/git/init-git", {
      method: "POST",
      headers: {},
      body: JSON.stringify({ location: gitDirLocation }),
    });
  }

  function handleDirChange(evt) {
    dispatch(setGitDirLocation(evt.target.value));
    dispatch(setValue);
  }

  useEffect(
    function () {
      console.log(val);
    },
    [gitDirLocation, val]
  );

  return (
    <div className="GitPage">
      <h2> Git Operations</h2>
      <p>No git found </p>
      <h6> {val}</h6>
      <div
        style={{
          width: "50%",
          display: "grid",
          gridTemplateColumns: "1fr",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "1rem",
          textAlign: "left",
          boxShadow: "5px 5px 5px 5px lightgrey",
          padding: "0.5rem",
        }}
      >
        <h4> Initialize Git</h4>
        <label htmlFor="dir-location"> Enter location </label>
        <input
          style={{ padding: "0.5rem" }}
          name="dir-location"
          placeholder="/home/projects/my-project"
          type="text"
          onChange={handleDirChange}
        />
        <button
          onClick={handleInitialize}
          className="GitPage btn primary round"
        >
          {" "}
          Initialize and open
        </button>{" "}
      </div>
    </div>
  );
}
