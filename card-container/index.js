class CardContainer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    this.columns = [];

    this.handleOnAddColumn = this.handleOnAddColumn.bind(this);
  }

  handleOnAddColumn(columnName, currentColumn) {
    const newAdderColumn = this.createAdderColumn();

    const data = {
      title: columnName,
      cards: [],
    };
    columnService.create(data)
      .then(column => {
        const dataColumn = this.createDataColumn(column);
        this.removeChild(currentColumn);
        this.appendChild(dataColumn);
        this.appendChild(newAdderColumn);
      })
      .catch(console.error);
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
    columnData.title = data.title;
    columnData.cards = data.cards;
    column.appendChild(columnData);
    return column;
  }

  connectedCallback() {
    this.className = "kp-card-container-root";

    columnService.list()
      .then(columns => {
        console.log(columns)
        // Data Column
        this.columns = columns;
        for (let i = 0; i < this.columns.length; i++) {
          const dataColumn = this.createDataColumn(this.columns[i]);
          this.appendChild(dataColumn);
        }

        // Adder Column
        const adderColumn = this.createAdderColumn();
        this.appendChild(adderColumn);
      })
      .catch(console.error);
    
    
  }
}

customElements.define("card-container", CardContainer);
