class CardContainer extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    this.columns = [];

    this.handleOnAddColumn = this.handleOnAddColumn.bind(this);
  }

  handleOnAddColumn(columnName, currentColumn, container) {
    const newAdderColumn = this.createAdderColumn(container);

    const data = {
      title: columnName,
      cards: [],
    };
    columnService.createColumn(data)
      .then(column => {
        console.log(column)
        const dataColumn = this.createDataColumn(column, container);
        this.removeChild(currentColumn);
        this.appendChild(dataColumn);
        this.appendChild(newAdderColumn);
      })
      .catch(console.error);
  }

  createAdderColumn(container) {
    const column = document.createElement('container-column');
    const columnAdder = document.createElement('column-adder');
    columnAdder.onAddColumn = columnName => this.handleOnAddColumn(columnName, column, container);

    column.appendChild(columnAdder);
    return column;
  }

  createDataColumn(data, container) {
    const column = document.createElement('container-column');
    const columnData = document.createElement('column-data');
    columnData.title = data.title;
    columnData.columnId = data.id;
    columnData.cards = data.cards;
    columnData.ondelete = () => {
      columnService.removeColumn(columnData.columnId)
        .then(() => {
          console.log('Column deleted');
          container.removeChild(column);
        })
        .catch(console.error);
    }
    column.appendChild(columnData);
    return column;
  }

  search(text) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].search) {
        this.children[i].search(text);
      }
    }
  }

  connectedCallback() {
    this.className = "kp-card-container-root";
    const container = this;

    columnService.listColumns()
      .then(columns => {
        console.log(columns)
        // Data Column
        this.columns = columns;
        for (let i = 0; i < this.columns.length; i++) {
          const dataColumn = this.createDataColumn(this.columns[i], container);
          this.appendChild(dataColumn);
        }

        // Adder Column
        const adderColumn = this.createAdderColumn(container);
        this.appendChild(adderColumn);
      })
      .catch(console.error);
  }
}

customElements.define("card-container", CardContainer);
