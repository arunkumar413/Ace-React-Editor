import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gitStatus, setGitStatus } from "../../stateManagement/gitSlice";
import { getGitStatus } from "../../utilities/apiCalls";

export function GitStatus() {
  const dispatch = useDispatch();
  const status = useSelector(gitStatus);

  useEffect(function () {
    getGitStatus().then(function (data) {
      dispatch(setGitStatus(data));
    });
  }, []);

  function buildElements() {
    let res = status.map(function (item, index1) {
      return item.map(function (item2, index2) {
        if (index2 === 0) {
          return <div key={index1.toString()}> {item2} </div>;
        }
      });
    });

    return res;
  }

  return (
    <div className="GitStatus">
      <h2> Git status </h2>
      <div style={{ textAlign: "left" }}>
        {status && status.length && buildElements()}
      </div>
    </div>
  );
}
