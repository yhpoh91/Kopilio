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

