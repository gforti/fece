function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
           label {
            display: inline-flex;            
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }
          label:focus, label:active {
            outline: none;
          }
          label input {
            display: none;
          }
          label span {
            display: block;
            width: 100px;
            height: 100px;
            background: #ddd;
            border-radius: 50%;
            position: relative;
            box-shadow: 0 0 0 2px #000, inset 0 0 0 3px rgba(0, 0, 0, 0.2), inset 0 0 20px 0 white;
            transition: .2s;
          }
          label span:before, label span:after {
            transition: .2s;
          }
          label span:before {
            content: "";
            display: block;
            position: absolute;
            width: 50px;
            height: 50px;
            border: 5px solid #aaa;
            border-radius: 50%;
            left: 50%;
            top: 50%;
                    transform: translate(-50%, -50%);
          }
          label span:after {
            content: "";
            display: block;
            width: 5px;
            background: #aaa;
            position: absolute;
            height: 30px;
            left: 50%;
            top: 25%;
                    transform: translateX(-50%);
            box-shadow: 0 0 0 6px #ddd;
          }
          label input:checked + span {
            box-shadow: 0 0 0 2px #000, inset 0 0 0 2px rgba(0, 0, 0, 0.2), inset 0 0 20px 0 rgba(0, 0, 0, 0.5);
          }
          label input:checked + span:before {
            border-color: #00a651;
          }
          label input:checked + span:after {
            background: #00a651;
          }
          label:hover {
            cursor: pointer;
          }

        </style>
        <label>
            <input type="checkbox" />
            <span></span>
        </label>
    `;
    return template;
}

class PowerButton extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.input = this.shadowRoot.querySelector('input')
      this.inputChangedBind = this.inputChanged.bind(this)
    }

    connectedCallback() {
        this.input.addEventListener('change', this.inputChangedBind)
    }

    disconnectedCallback() {
      // remove event listeners
        this.input.removeEventListener('change', this.inputChangedBind)
    }   

    inputChanged() {
        this.dispatchEvent(new CustomEvent('power-button-change', { detail: this.input.checked }))
    }

}

window.customElements.define('power-button', PowerButton)