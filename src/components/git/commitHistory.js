import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  commitHistory,
  setCommitHistory,
} from "../../stateManagement/gitSlice";

export function CommitHistory() {
  const dispatch = useDispatch();
  const history = useSelector(commitHistory);
  useEffect(function () {
    async function getCommitHistory() {
      let res = await fetch("http://localhost:5000/git/commit-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await res.json();
      dispatch(setCommitHistory(data));
    }
    getCommitHistory();
  }, []);

  function buildElements() {
    const historyElements = history.map(function (item, index) {
      return (
        <p key={index.toString()}>
          {item.commit.message} ({item.commit.author.name}){" "}
        </p>
      );
    });
    return historyElements;
  }

  console.log(history);

  return (
    <div className="CommitHistory">
      <h2> Commit History </h2>
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr",
          justifyContent: "center",
          textAlign: "left",
          gap: "10px",
        }}
      >
        {" "}
      </div>
      {history && history.length ? buildElements() : ""}
    </div>
  );
}
