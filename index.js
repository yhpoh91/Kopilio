window.addEventListener("load", () => {
  console.log("onLoad");
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("onDomLoad");

  const root = document.getElementById("root");

  // Add Label
  const label = document.createElement("container-label");
  root.appendChild(label);

  // Add Searchbar
  const searchbar = document.createElement("container-searchbar");
  root.appendChild(searchbar);

  // Add Container
  const container = document.createElement("card-container");
  root.appendChild(container);


  // Set Searchbar event
  searchbar.onSearchText = text => {
    container.search(text);
  }
});

kpDraggedCard = null;
kpApiHost = 'http://localhost:3000'