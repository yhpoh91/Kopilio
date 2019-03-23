window.addEventListener("load", () => {
  console.log("onLoad");
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("onDomLoad");

  const root = document.getElementById("root");

  // Add Label
  const label = document.createElement("container-label");
  root.appendChild(label);

  // Add Container
  const container = document.createElement("card-container");
  root.appendChild(container);
});

api.request(api.GET, "http://localhost:3000/columns/1/cards")
  .then(xhrData => console.log(xhrData))
  .catch(error => console.error(error));
