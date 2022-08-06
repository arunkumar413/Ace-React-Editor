import React, { useState, useEffect } from "react";

export function GitPage() {
  const [initConfig, setInitConfig] = useState({});

  async function handleInitialize() {
    let res = await fetch("http://localhost:5000/git/init-git", {
      method: "POST",
      headers: {},
      body: JSON.stringify(setInitConfig),
    });
  }

  return (
    <div className="GitPage">
      <h2> Git Operations</h2>

      <p>
        No git found. Initialize git{" "}
        <button
          onClick={handleInitialize}
          className="GitPage btn primary round"
        >
          {" "}
          Initialize git{" "}
        </button>{" "}
      </p>

      <h5> Files changed:</h5>
    </div>
  );
}
