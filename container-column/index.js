class ContainerColumn extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
    }

    search(text) {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].search) {
          this.children[i].search(text);
        }
      }
    }
  
    connectedCallback() {
      this.className = "kp-container-column-root";
    }
  }
  
  customElements.define("container-column", ContainerColumn);
  