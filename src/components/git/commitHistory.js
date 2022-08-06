import React, { useEffect } from "react";

export function CommitHistory() {
  useEffect(function () {
    async function getCommitHistory() {
      let res = await fetch("http://localhost:5000/get-commit-history", {
        method: "GET",
        headers: {},
        body: JSON.stringify({}),
      });
    }
  }, []);

  return (
    <div className="CommitHistory">
      <h2> Commit History </h2>
    </div>
  );
}
