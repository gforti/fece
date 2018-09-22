function generateTemplate() {

    const template = document.createElement('template')

    template.innerHTML = `
    
       <svg viewbox="0 0 250 250"  xmlns="http://www.w3.org/2000/svg">
            <foreignObject width="100%" height="100%">
            <slot></slot>
            </foreignObject> 
        </svg>
        
    `
    return template
}

window.customElements.define('svg-zoom', class extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(generateTemplate().content.cloneNode(true))
      //this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
       //this.svg = document.createElement('svg')
      this.slott = this.shadowRoot.querySelector('slot')
      this.foreignObject = this.shadowRoot.querySelector('svg foreignObject')
      this.svg = this.shadowRoot.querySelector('svg')
      
       //this.svg.setAttribute("viewbox","0 0 550 450")
       //this.svg.setAttribute("xmls","http://www.w3.org/2000/svg")
      
      // console.log(this.slott.assignedNodes())
     // this.shadowRoot.appendChild(this.svg)
      //this.svg.appendChild(this.g)
      //this.foreignObject.appendChild(this.slott) //.assignedNodes()[1]
      //this.slott.remove()
      //
      
       this.scale = 1
       this.MIN_SCALE = 1;
       this.MAX_SCALE = 5;
    }
    
    connectedCallback() {
        
        this.svg.addEventListener('wheel', (e)=>{
             e.preventDefault();
             //console.log(e)
             this.scale = Math.min(this.MAX_SCALE, Math.max(this.MIN_SCALE, this.scale - e.wheelDelta / 100));
             
             this.foreignObject.setAttribute("transform", `translate(0, 0) scale(${this.scale})`);
             
         })
         
         
    }

    static get observedAttributes() {
      return [];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            //this.settings.set('percentageInnerCutout', newValue)
        }
    }
     

});
