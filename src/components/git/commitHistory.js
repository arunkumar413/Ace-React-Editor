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
      let project = localStorage.getItem("currentProject");
      let res = await fetch(
        "http://localhost:5000/git/commit-history?" +
          new URLSearchParams({ project: project }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let data = await res.json();
      dispatch(setCommitHistory(data));
    }
    getCommitHistory();
  }, []);

  function buildElements() {
    const historyElements = history.map(function (item, index) {
      return (
        <React.Fragment key={index.toString()}>
          <span>{item.commit.message} </span>
          <span>{item.commit.author.name}</span>
          <span>{item.commit.author.email}</span>
          <span>
            {new Date(item.commit.author.timestamp * 1000).toString()}
          </span>
        </React.Fragment>
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
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontSize: "0.8rem",
        }}
      >
        {" "}
        <span className="commit-heading">Message</span>
        <span className="commit-heading">Author</span>
        <span className="commit-heading">Email</span>
        <span className="commit-heading">Date</span>
        {history && history.length ? buildElements() : ""}
      </div>
    </div>
  );
}
