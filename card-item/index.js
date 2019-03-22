class CardItem extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
    }
  
    connectedCallback() {
      this.className = "kp-card-item-root";
      this.innerHTML = `Koplio`;
    }
  }
  
  customElements.define("card-item", CardItem);
  