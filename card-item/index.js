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
        columnId: 1,
      };
    }

    handleOnExpandChange() {
      // Changing of state will is done somewhere else
      // This is merely to reflect the state
      if (this.expand) {
        console.log('card item - expand');
        this.handleOnExpand();
      } else {
        console.log('card item - collapse');
        this.handleOnCollapse();
      }
    }

    handleOnExpand() {
      const card = this.card;
      const cardItem = this;
      this.innerHTML = '';
      
      // TextBox (title)
      const titleTextbox = document.createElement('input');
      titleTextbox.className = "kp-column-adder-textbox";
      titleTextbox.type = "text";
      titleTextbox.value = card.title;
      titleTextbox.id = `card-item-title-${card.id}`;

      // TextBox (description)
      const descriptionTextbox = document.createElement('input');
      descriptionTextbox.className = "kp-column-adder-textbox";
      descriptionTextbox.type = "text";
      descriptionTextbox.value = card.description || '';
      descriptionTextbox.id = `card-item-description-${card.id}`;

      // Save Button
      const saveButton = document.createElement('button');
      saveButton.className = "kp-column-adder-save-button";
      saveButton.innerText = "Save";
      saveButton.onclick = (e) => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        
        cardItem.card.title = titleTextbox.value;
        cardItem.card.description = descriptionTextbox.value;
        
        cardItem.expand = false;
        cardItem.handleOnExpandChange();
        console.log(cardItem.card)
        
        if (cardItem.onsave) {
          cardItem.onsave(cardItem.card);
        }
      };

      this.onclick = null;
      
      this.appendChild(titleTextbox);
      this.appendChild(descriptionTextbox)
      this.appendChild(saveButton);
    }

    handleOnCollapse() {
      const card = this.card;
      this.innerHTML = `<span class="kp-card-item-label">${card.title || 'Untitled Card'}</span>`;

      this.onclick = () => {
        this.expand = true;
        this.handleOnExpandChange();
      }
    }
  
    connectedCallback() {
      this.className = "kp-card-item-root";
      this.expand = false;
      this.handleOnExpandChange();
    }
  }
  
  customElements.define("card-item", CardItem);
  