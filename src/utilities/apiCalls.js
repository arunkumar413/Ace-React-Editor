export async function getFileSystem() {
  let project = localStorage.getItem("currentProject");
  let res = await fetch(
    "http://localhost:5000/getdirtree?" +
      new URLSearchParams({ project: project }),
    {
      method: "GET",
    }
  );
  let data = await res.json();
  return data;
}

export async function getGitStatus() {
  let project = localStorage.getItem("currentProject");
  let res = await fetch(
    "http://localhost:5000/git/git-status?" +
      new URLSearchParams({ project: project }),
    {
      method: "GET",
    }
  );
  let data = await res.json();
  return data;
}
