class ColumnDataTitle extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
    }

    createTitleLabel(callback) {
      const titleLabel = document.createElement('span');
      titleLabel.className = 'kp-column-data-title-label';
      titleLabel.innerHTML = this.title || 'Untitled Column'

      return titleLabel;
    }

    createTitleEditable(callback) {
      const titleEditable = document.createElement('input');
      titleEditable.className = 'kp-column-data-title-editable'
      titleEditable.value = this.title || '';
      titleEditable.placeholder = 'Column Title';
      titleEditable.hidden = true;
      
      return titleEditable;
    }

    createTitleContainer() {
      const titleContainer = document.createElement('div');
      return titleContainer;
    }
  
    connectedCallback() {
      this.className = "kp-column-data-title-root";
      const dataTitle = this;

      const titleLabel = this.createTitleLabel();
      const titleEditable = this.createTitleEditable();

      // User Click on Label (span)
      titleLabel.onclick = () => {
        titleLabel.hidden = true;
        titleEditable.hidden = false;
        titleEditable.value = titleLabel.innerHTML;
        titleEditable.focus();
      };

      // User Select Anywhere Else (unfocus)
      titleEditable.onblur = () => {
        titleLabel.hidden = false;
        titleEditable.hidden = true;

        // Validate Data
        if (titleEditable.value === '') {
          // Do not save new value
          console.error('Empty Title, not saving');
          titleEditable.value = titleLabel.innerHTML;
          return;
        }
        
        // Notify Update
        titleLabel.innerHTML = titleEditable.value;
        if (dataTitle.onTitleChange) {
          dataTitle.onTitleChange(titleLabel.innerHTML);
        }
      };

      this.appendChild(titleLabel);
      this.appendChild(titleEditable);

      titleLabel.hidden = false;
      titleEditable.hidden = true;
    }
  }
  
  customElements.define("column-data-title", ColumnDataTitle);
  