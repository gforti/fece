
function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>   
            .modal {
                align-items: center;
                display: none;
                flex-direction: column;
                justify-content: center;
                overflow: hidden;
                position: fixed;
                z-index: 40;
                bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
            }

            .modal.is-active {
                display: flex;
            }
            .modal-background {
                background-color: rgba(10,10,10,.86);
    bottom: 0;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                
            }
            .modal-content {
                margin: 0 20px;
                max-height: calc(100vh - 160px);
                overflow: auto;
                position: relative;
                width: 100%;
            }

            @media screen and (min-width:769px),print{
                .modal-content {
                    margin: 0 auto;
                    max-height: calc(100vh - 40px);
                    width: 640px;
                    overflow: auto;
                    position: relative;
                }
            }

            .is-large.modal-close {
                height: 32px;
                max-height: 32px;
                max-width: 32px;
                min-height: 32px;
                min-width: 32px;
                width: 32px;
            }

            .modal-close {
                background: 0 0;
                height: 40px;
                position: fixed;
                right: 20px;
                top: 20px;
                width: 40px;
                cursor: pointer;
            }


        </style>
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
              <slot></slot>
            </div>
            <button class="modal-close is-large" aria-label="close">X</button>
          </div>
    `;
    return template;
}

class ModalContent extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.btnDelete = this.shadowRoot.querySelector('button')
      this.modal = this.shadowRoot.querySelector('div.modal')
    }

    connectedCallback() {
        this.btnDelete.addEventListener('click', this.btnClick.bind(this))
        this.render()
    }

    static get observedAttributes() {
      return ['data-show'];
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
        if (this.dataset.show.toLowerCase() === 'true')
            this.modal.classList.add('is-active')
        else 
            this.modal.classList.remove('is-active')
    }

    btnClick() {
        this.dataset.show = false
        this.dispatchEvent(new CustomEvent('delete-clicked'))
    }


}

window.customElements.define('modal-content', ModalContent);
