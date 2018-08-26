function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>   
           .content {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: none;
                background-color: var(--background, #eee);
                align-items: center;
                justify-content: center; 
                z-index: 9999;
            }
            svg{
             display: flex;
             height: 100%;
             transition: transform .2s ease-out;
            }
           svg:hover {
                transform: scale(1.2);
            }
            svg circle {
                fill: var(--on-background, #000);
            }
           .content.is-active {
               display: flex;
           }
       </style>
        <div class="content">
            <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                <circle  stroke="none" cx="6" cy="50" r="6">
                  <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite"
                    begin="0.1"/>    
                </circle>
                <circle  stroke="none" cx="26" cy="50" r="6">
                  <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite" 
                    begin="0.2"/>       
                </circle>
                <circle  stroke="none" cx="46" cy="50" r="6">
                  <animate
                    attributeName="opacity"
                    dur="1s"
                    values="0;1;0"
                    repeatCount="indefinite" 
                    begin="0.3"/>     
                </circle>
              </svg>

        </div>
         
    `;
    return template;
}

class contentLoader extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.content = this.shadowRoot.querySelector('div.content')
    }

    connectedCallback() {
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

    render() {
        if (this.dataset.show.toLowerCase() === 'true')
            this.content.classList.add('is-active')
        else 
            this.content.classList.remove('is-active')
    }

}

window.customElements.define('content-loader', contentLoader)


