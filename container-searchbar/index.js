class ContainerSearchbar extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
    }
  
    connectedCallback() {
      this.className = "kp-container-searchbar-root";
      const container = this;

      // Search TextBox
      const searchBar = document.createElement("input");
      searchBar.className = "kp-container-searchbar-input";
      searchBar.type = "text";
      searchBar.placeholder = "Search cards..."
      searchBar.oninput = e => {
          if (container.onSearchText) {
            container.onSearchText(e.target.value);
          }
      }

      this.appendChild(searchBar);
    }
  }
  
  customElements.define("container-searchbar", ContainerSearchbar);
  