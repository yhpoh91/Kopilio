class ContainerLabel extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
    }
  
    connectedCallback() {
      this.className = "kp-container-label-root";
      this.innerHTML = `Add column`;
    }
  }
  
  customElements.define("container-label", ContainerLabel);
  