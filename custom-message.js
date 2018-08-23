function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host .message {
                background-color: var(--surface, #f5f5f5);
                color: var(--on-surface, #f5f5f5);
                border-radius: 4px;
                font-size: 1rem;
            }
            :host .message-header {
                align-items: center;
                background-color: var(--primary, #f5f5f5);
                color: var(--on-primary, #fff);
                border-radius: 4px 4px 0 0;
                display: flex;
                font-weight: 700;
                justify-content: space-between;
                line-height: 1.25;
                padding: .75em 1em;
                position: relative;
            }
            :host .message-header+.message-body {
                border-width: 0;
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        :host .message-body {
            border-color: #dbdbdb;
            border-radius: 4px;
            border-style: solid;
            border-width: 0 0 0 4px;
            color: #4a4a4a;
            padding: 1.25em 1.5em;
        }
        :host .delete, .modal-close {
            -moz-appearance: none;
            -webkit-appearance: none;
            background-color: rgba(10,10,10,.2);
            border: none;
            border-radius: 290486px;
            cursor: pointer;
            pointer-events: auto;
            display: inline-block;
            flex-grow: 0;
            flex-shrink: 0;
            height: 20px;
            max-height: 20px;
            max-width: 20px;
            min-height: 20px;
            min-width: 20px;
            outline: 0;
            position: relative;
            vertical-align: top;
            width: 20px;
        }
        :host .message-header .delete {
            flex-grow: 0;
            flex-shrink: 0;
            margin-left: .75em;
        }
        :host .delete::before, .modal-close::before {

        }
        :host .delete::after {

            width: 50%;
            color: #fff;
            content: "X";
            display: block;
            font-weight: bold;
            left: 50%;
            top: 50%;

        }
        </style>
        <article class="message">
            <div class="message-header">
              <slot name="header"></slot>
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
              <slot name="message"></slot>
            </div>
        </article>
    `;
    return template;
}

class CustomMessage extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.btnDelete = this.shadowRoot.querySelector('button.delete')
    }

    connectedCallback() {
        this.btnDelete.addEventListener('click', this.btnClick.bind(this))
        this.render()
    }

    adoptedCallback() {
        console.log('Custom element moved to new page.');
    }

    static get observedAttributes() {
      return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
    }

    disconnectedCallback() {
      // remove event listeners
        this.btnDelete.removeEventListener('click', this.btnClick.bind(this))
    }

    render() {
    }

    btnClick() {
        this.dispatchEvent(new CustomEvent('delete-clicked'))
    }


}

window.customElements.define('custom-message', CustomMessage);
