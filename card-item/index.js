class CardItem extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // write element functionality in here
    this.expand = false;

    this.card = {
      id: 1,
      title: "Card 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      columnId: 1
    };
  }

  searchOk(text) {
    // Check for empty (default behaviour: show all)
    if (text == null || text === '') {
      return true;
    }

    // Check with lower case (case-insensitive)
    const lowerText = text ? text.toLowerCase() : '';
    const lowerTitle = this.card.title ? this.card.title.toLowerCase() : '';
    const lowerDescription = this.card.description ? this.card.description.toLowerCase() : '';

    // Check title
    if (lowerTitle.indexOf(lowerText) > -1) {
      return true;
    }

    // Check description
    if (lowerDescription.indexOf(lowerText) > -1) {
      return true;
    }

    // Unable to find
    return false;
  }

  handleOnExpandChange() {
    // Changing of state will is done somewhere else
    // This is merely to reflect the state
    if (this.expand) {
      console.log("card item - expand");
      this.handleOnExpand();
    } else {
      console.log("card item - collapse");
      this.handleOnCollapse();
    }
  }

  handleOnExpand() {
    const card = this.card;
    const cardItem = this;
    this.innerHTML = "";

    // TextBox (title)
    const titleTextbox = document.createElement("input");
    titleTextbox.className = "kp-card-item-adder-textbox-title";
    titleTextbox.type = "text";
    titleTextbox.value = card.title;
    titleTextbox.id = `card-item-title-${card.id}`;

    // TextBox (description)
    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.className = "kp-card-item-textarea-description";
    descriptionTextArea.value = card.description || "";
    descriptionTextArea.placeholder = "Card description";
    descriptionTextArea.id = `card-item-description-${card.id}`;

    // Save Button
    const saveButton = document.createElement("button");
    saveButton.className = "kp-card-item-save-button";
    saveButton.innerText = "Save";
    saveButton.onclick = e => {
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

      cardItem.card.title = titleTextbox.value;
      cardItem.card.description = descriptionTextArea.value;

      cardItem.expand = false;
      cardItem.handleOnExpandChange();

      if (cardItem.onsave) {
        cardItem.onsave(cardItem.card);
      }
    };

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.className = "kp-card-item-delete-button";
    deleteButton.innerText = "Delete this card";
    deleteButton.onclick = e => {
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();

      const confirmDelete = window.confirm("Are you sure you want to delete this card?");
      if (confirmDelete) {
        // Trigger OnDelete Callback
        if (cardItem.ondelete) {
          cardItem.ondelete(cardItem.card);
        }
      }
    }

    this.onclick = null;

    this.appendChild(titleTextbox);
    this.appendChild(descriptionTextArea);
    this.appendChild(saveButton);
    this.appendChild(deleteButton);
  }

  handleOnCollapse() {
    const card = this.card;
    this.innerHTML = `<span class="kp-card-item-label">${card.title ||
      "Untitled Card"}</span>`;

    this.onclick = () => {
      this.expand = true;
      this.handleOnExpandChange();
    };
  }

  connectedCallback() {
    this.className = "kp-card-item-root";
    this.expand = false;
    this.handleOnExpandChange();
  }
}

customElements.define("card-item", CardItem);
