class ColumnData extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
      this.cards = [];
    }

    createCardItem(card) {
      const cardItem = document.createElement('card-item');
      cardItem.card = card;
      cardItem.onsave = card => {
        console.log(card);
      }

      return cardItem;
    }

    createCardItemAdder(column) {
      const cardItemAdder = document.createElement('card-item-adder');
      cardItemAdder.onadd = card => {

        // TODO: save to database, get real id and description
        const newCardItem = column.createCardItem(card);
        column.insertBefore(newCardItem, cardItemAdder);
      }

      return cardItemAdder;
    }
  
    connectedCallback() {
      this.className = "kp-column-adder-root";
      this.innerHTML = `<span class="kp-column-data-label">${this.title || 'Untitled Column'}</span>`;

      for (let i = 0; i < this.cards.length; i++) {
        const cardItem = this.createCardItem(this.cards[i]);
        this.appendChild(cardItem);
      }

      const cardItemAdder = this.createCardItemAdder(this);
      this.appendChild(cardItemAdder);
    }
  }
  
  customElements.define("column-data", ColumnData);
  