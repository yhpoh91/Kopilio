class CardContainer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
  }

  handleOnAddColumn(columnName) {
    alert(columnName);
  }

  createInitialColumn() {
    const column = document.createElement('container-column');
    const columnAdder = document.createElement('column-adder');
    columnAdder.onAddColumn = columnName => this.handleOnAddColumn(columnName);

    column.appendChild(columnAdder);
    this.appendChild(column);
  }

  createDataColumn() {
    const column = document.createElement('container-column');
  }

  connectedCallback() {
    this.className = "kp-card-container-root";
    this.createInitialColumn();
    this.createInitialColumn();
    this.createInitialColumn();
    this.createInitialColumn();
    this.createInitialColumn();
    this.createInitialColumn();
  }
}

customElements.define("card-container", CardContainer);
