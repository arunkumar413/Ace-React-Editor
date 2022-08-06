export async function getFileSystem() {
  let res = await fetch("http://localhost:5000/getdirtree");
  let data = await res.json();
  return data;
}
