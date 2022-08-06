import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { GitInit } from "../components/git/gitInit";
import {
  setDirLocation,
  setGitCloneLink,
  setGitDirLocation,
} from "../stateManagement/gitSlice";

export function GitPage() {
  return <GitInit />;
}
