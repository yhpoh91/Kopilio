class ColumnData extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
  
      // write element functionality in here
      this.columnId = null;
    }

    search(text) {
      for (let i = 0; i < this.children.length; i++) {
        if (this.children[i].searchOk) {
          const isItemOk = this.children[i].searchOk(text) || text === '';
          if (isItemOk) {
            this.children[i].hidden = false;
          } else {
            this.children[i].hidden = true;
          }
        }
      }
    }

    createCardItem(card, column) {
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
      cardItem.ondelete = card => {
        cardService.removeCard(card.columnId, card.id)
          .then(() => {
            console.log('card deleted');
            column.removeChild(cardItem);
          })
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
      const column = this;

      // Title
      const dataTitle = document.createElement('column-data-title');
      dataTitle.title = this.title || 'Untitled Column';
      dataTitle.onTitleChange = title => {
        columnService.updateColumn(column.columnId, {
          title,
        })
          .then(updatedColumn => console.log(updatedColumn))
          .catch(console.error);
      }
      this.appendChild(dataTitle);

      // Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.className = "kp-column-data-delete-button";
      deleteButton.innerText = "Delete this column";
      deleteButton.onclick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();

        const confirmDelete = window.confirm("Are you sure you want to delete this column?");
        if (confirmDelete) {
          // Trigger OnDelete Callback
          if (column.ondelete) {
            column.ondelete();
          }
        }
      }
      this.appendChild(deleteButton);

      // Cards
      cardService.listCards(this.columnId)
        .then(cards => {
          for (let i = 0; i < cards.length; i++) {
            const cardItem = this.createCardItem(cards[i], column);
            this.insertBefore(cardItem, deleteButton);
          }
    
          const cardItemAdder = this.createCardItemAdder(this);
          this.insertBefore(cardItemAdder, deleteButton);

          // Drag Drop
          this.ondragover = e => e.preventDefault();
          this.ondrop = e => {
            e.preventDefault();

            // Find the proper drop zone (data column), up the hierarchy
            let target = e.target;
            while (target != null && target.className !== "kp-column-adder-root") {
              target = target.parentNode;
            }

            // Remove from previous parent
            kpDraggedCard.parentNode.removeChild(kpDraggedCard);

            // Add to new parent
            target.insertBefore(kpDraggedCard, cardItemAdder);
          }
        })
        .catch(console.error);

    }
  }
  
  customElements.define("column-data", ColumnData);
  