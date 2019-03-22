class CardContainer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    this.columns = ['test1', 'good morning'];

    this.handleOnAddColumn = this.handleOnAddColumn.bind(this);
  }

  handleOnAddColumn(columnName, currentColumn) {
    const dataColumn = this.createDataColumn(columnName);
    const newAdderColumn = this.createAdderColumn();

    this.removeChild(currentColumn);
    this.appendChild(dataColumn);
    this.appendChild(newAdderColumn);
  }

  createAdderColumn() {
    const column = document.createElement('container-column');
    const columnAdder = document.createElement('column-adder');
    columnAdder.onAddColumn = columnName => this.handleOnAddColumn(columnName, column);

    column.appendChild(columnAdder);
    return column;
  }

  createDataColumn(data) {
    const column = document.createElement('container-column');
    const columnData = document.createElement('column-data');
    columnData.title = data
    column.appendChild(columnData);
    return column;
  }

  connectedCallback() {
    this.className = "kp-card-container-root";
    
    // Data Column
    for (let i = 0; i < this.columns.length; i++) {
      const dataColumn = this.createDataColumn(this.columns[i]);
      this.appendChild(dataColumn);
    }

    // Adder Column
    const adderColumn = this.createAdderColumn();
    this.appendChild(adderColumn);
  }
}

customElements.define("card-container", CardContainer);
