class CardContainer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
  }

  createAddColumnButton() {
    const button = document.createElement('button');
    button.innerText = "Add a column"

    return button;
  }

  createInitialColumn() {
    const column = document.createElement('container-column');
    const addColumnButton = this.createAddColumnButton();

    column.appendChild(addColumnButton);
    this.appendChild(column);
  }

  createColumn() {
  }

  connectedCallback() {
    this.className = "kp-card-container-root";
    this.createInitialColumn();
  }
}

customElements.define("card-container", CardContainer);
