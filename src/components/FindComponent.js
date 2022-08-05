import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFindTerm } from "../stateManagement/findSlice";

export function FindComponent(props) {
  const dispatch = useDispatch();
  const findTerm = useSelector((state) => state.findSlice.findTerm);

  const isShowSearchOn = useSelector(
    (state) => state.findSlice.showSearchInput
  );

  function handleChange(evt) {
    dispatch(setFindTerm(evt.target.value));
  }

  useEffect(
    function () {
      console.log(findTerm);
    },
    [findTerm]
  );

  return (
    <div
      className="FindComponent"
      style={{
        display: isShowSearchOn === true ? "block" : "none",
        position: "fixed",
        right: "4%",
        top: "1%",
        zIndex: 99999,
      }}
    >
      <input value={findTerm} onChange={handleChange} />
    </div>
  );
}
