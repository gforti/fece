

function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>   
           .content {
                position: relative; 
                background-color: var(--background, transparent);
                color: var(--on-background, initial);
           }          
        </style>
        <div class="content">
            <slot></slot>
        </div>
    `;
    return template;
}

class contentBox extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true))
    }
}

window.customElements.define('content-box', contentBox)


