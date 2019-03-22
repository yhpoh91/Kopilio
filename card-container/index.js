class CardContainer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
  }

  connectedCallback() {
    this.className = "kp-card-container-root";
    this.innerHTML = `Test Test`;
  }
}

customElements.define("card-container", CardContainer);
