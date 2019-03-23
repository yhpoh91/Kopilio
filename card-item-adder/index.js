class CardItemAdder extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    this.expand = false;
  }

  handleOnExpandChange() {
    // Changing of state will is done somewhere else
    // This is merely to reflect the state
    if (this.expand) {
      console.log("card item adder - expand");
      this.handleOnExpand();
    } else {
      console.log("card item adder - expand");
      this.handleOnCollapse();
    }
  }

  handleOnExpand() {
    const cardItemAdder = this;
    this.innerHTML = "";

    // TextBox (title)
    const titleTextbox = document.createElement("input");
    titleTextbox.className = "kp-card-item-adder-textbox";
    titleTextbox.type = "text";
    titleTextbox.placeholder="Add card title"
    titleTextbox.id = `card-item-adder-title`;

    // Save Button
    const saveButton = document.createElement("button");
    saveButton.className = "kp-card-item-adder-save-button";
    saveButton.innerText = "Save";
    saveButton.onclick = (e) => {
      // Stop propagating to parent
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

      const card = {
        title: titleTextbox.value,
      };
      cardItemAdder.expand = false;
      cardItemAdder.handleOnExpandChange();

      titleTextbox.value = '';
      
      if (cardItemAdder.onadd) {
        cardItemAdder.onadd(card);
      }
    };

    this.onclick = null;
    this.appendChild(titleTextbox);
    this.appendChild(saveButton);
    titleTextbox.focus();
  }

  handleOnCollapse() {
    this.innerHTML = `<span class="kp-card-item-adder-label">Add a card...</span>`;

    this.onclick = (e) => {
        this.expand = true;
        this.handleOnExpandChange();
    };
  }

  connectedCallback() {
    this.className = "kp-card-item-adder-root";
    this.expand = false;
    this.handleOnExpandChange();
  }
}

customElements.define("card-item-adder", CardItemAdder);
