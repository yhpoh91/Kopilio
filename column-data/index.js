class ColumnData extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
      this.columnId = null;
    }

    createCardItem(card) {
      const cardItem = document.createElement('card-item');
      cardItem.card = card;
      cardItem.onsave = card => {
        const data = {
          title: card.title,
          description: card.description,
        };
        cardService.updateCard(card.columnId, card.id, data)
          .then(() => console.log('card saved'))
          .catch(console.error);
      }

      return cardItem;
    }

    createCardItemAdder(column) {
      const cardItemAdder = document.createElement('card-item-adder');
      cardItemAdder.onadd = card => {
        const data = {
          title: card.title,
        };
        cardService.createCard(column.columnId, data)
          .then(createdCard => {
            const newCardItem = column.createCardItem(createdCard);
            column.insertBefore(newCardItem, cardItemAdder);
            console.log('card added');
          })
          .catch(console.error);
      }

      return cardItemAdder;
    }
  
    connectedCallback() {
      this.className = "kp-column-adder-root";
      this.innerHTML = `<span class="kp-column-data-label">${this.title || 'Untitled Column'}</span>`;

      cardService.listCards(this.columnId)
        .then(cards => {
          for (let i = 0; i < cards.length; i++) {
            const cardItem = this.createCardItem(cards[i]);
            this.appendChild(cardItem);
          }
    
          const cardItemAdder = this.createCardItemAdder(this);
          this.appendChild(cardItemAdder);
        })
        .catch(console.error);


      
    }
  }
  
  customElements.define("column-data", ColumnData);
  