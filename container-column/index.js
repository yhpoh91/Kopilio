class ContainerColumn extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
    }
  
    connectedCallback() {
      this.className = "kp-container-column-root";
    }
  }
  
  customElements.define("container-column", ContainerColumn);
  