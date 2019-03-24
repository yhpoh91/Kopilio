class ColumnAdder extends HTMLElement {
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

    handleOnExpand() {
      if (this.expanded) {
        // Already expanded, nothing else to expand
        return;
      }

      // Expand to show also a TextBox
      this.expanded = true;

      // TextBox
      const textbox = document.createElement('input');
      textbox.className = "kp-column-adder-textbox";
      textbox.type = "text";
      textbox.id = "new-column-name";
      textbox.hidden = true;

      // Save Button
      const saveButton = document.createElement('button');
      saveButton.className = "kp-column-adder-save-button";
      saveButton.innerText = "Save";
      saveButton.onclick = () => this.handleOnAddNewColumn(textbox.value);

      this.appendChild(textbox);
      this.appendChild(saveButton)
    }
  
    connectedCallback() {
      this.className = "kp-column-adder-root";
      this.innerHTML = `<span class="kp-column-adder-label">Add column...</span>`;
      this.onclick = () => this.handleOnExpand();
    }
  }
  
  customElements.define("column-adder", ColumnAdder);
  