const socket = io();
const list = document.getElementById("list");

socket.on("GET_REQUEST", (obj) => {
  const { method, query } = obj;
  const listEl = document.createElement("li");
  listEl.textContent = `METHOD: ${method}, QUERY: ${JSON.stringify(query)}`;
  list.appendChild(listEl);
});
