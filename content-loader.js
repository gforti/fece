function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>   
            .content {
                position: relative; 
                background-color: var(--background, transparent);
                color: var(--on-background, initial);
                display: inline-flex;
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                margin: 1rem;
                padding: 1rem;
           }      
    
           .content:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }
           .loader {
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
            .dual-ring {
                display: inline-block;
                width: 64px;
                height: 64px;
                transition: transform .2s ease-out;
            }
            .dual-ring:after {
                content: " ";
                display: block;
                width: 46px;
                height: 46px;
                margin: 1px;
                border-radius: 50%;
                border: 5px solid var(--on-background, #000);;
                border-left-color: transparent;
                border-right-color: transparent;
                animation: dual-ring 1.2s linear infinite;                
    
            }
            @keyframes dual-ring {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
            }

           .dual-ring:hover {
                transform: scale(1.2);
            }
            
           .loader.is-active {
               display: inline-flex;
           }
       </style>
        <div class="content">
            <div class="loader">
                <div class="dual-ring"></div>
              </div>
            <slot></slot>
        </div>
         
    `;
    return template;
}

class contentLoader extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.loader = this.shadowRoot.querySelector('div.loader')
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
            this.loader.classList.add('is-active')
        else 
            this.loader.classList.remove('is-active')
    }

}

window.customElements.define('content-loader', contentLoader)


