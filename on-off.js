function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
           .toggle-label {
            position: relative;
            display: inline-flex;
            width: 100px;
            height: 30px;
            margin-top: 8px;
            align-items: center;
            justify-content: center; 
          }
          .toggle-label input[type=checkbox] { 
            opacity: 0;
            position: absolute;
            width: 100%;
            height: 100%;
          }
          .toggle-label input[type=checkbox]+.back {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #ed1c24;
            transition: background 150ms linear;  
          }
          .toggle-label input[type=checkbox]:checked+.back {
            background: #00a651; /*green*/
          }

          .toggle-label input[type=checkbox]+.back .toggle {
            display: block;
            position: absolute;
            content: ' ';
            background: #fff;
            width: 50%; 
            height: 100%;
            transition: margin 150ms linear;
            border: 1px solid #808080;
            border-radius: 0;
          }
          .toggle-label input[type=checkbox]:checked+.back .toggle {
            margin-left: 50%;
          }
          .toggle-label .label {
            display: flex;
            position: absolute;
            width: 50%;
            height: 100%;
            color: #ddd;
            text-align: center;
            font-size: 1em;
            align-items: center;
            justify-content: center; 
          }
          .toggle-label .label.on { left: 0px; }
          .toggle-label .label.off { right: 0px; }

          .toggle-label input[type=checkbox]:checked+.back .label.on {
            color: #fff;
          }
          .toggle-label input[type=checkbox]+.back .label.off {
            color: #fff;
          }
          .toggle-label input[type=checkbox]:checked+.back .label.off {
            color: #bbb;
          }
        </style>
        <label class='toggle-label'>
        <input type='checkbox'/>
            <span class='back'>
                <span class='toggle'></span>
                <span class='label on'>ON</span>
                <span class='label off'>OFF</span>  
           </span>
       </label>
    `;
    return template;
}

class OnOff extends HTMLElement {

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
        this.dispatchEvent(new CustomEvent('on-off-change', { detail: this.input.checked }))
    }

}

window.customElements.define('on-off', OnOff)