export async function getFileSystem() {
  debugger;
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
