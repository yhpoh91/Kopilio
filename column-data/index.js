class ColumnData extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
      this.expanded = false;
    }

    handleOnAddNewColumn(value) {
      if (this.onAddColumn) {
        this.onAddColumn(value);
      }
    }
  
    connectedCallback() {
      this.className = "kp-column-adder-root";
      this.innerHTML = `<span class="kp-column-adder-label">${this.title}</span>`;
    }
  }
  
  customElements.define("column-data", ColumnData);
  