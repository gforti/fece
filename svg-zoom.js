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
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(generateTemplate().content.cloneNode(true))
        this.slott = this.shadowRoot.querySelector('slot')
        this.foreignObject = this.shadowRoot.querySelector('svg foreignObject')
        this.svg = this.shadowRoot.querySelector('svg')
           
        this.scale = 1
        this.MIN_SCALE = 1
        this.MAX_SCALE = 5
        this.x = 0
        this.y = 0
        this.dragging = false
    }
    
    connectedCallback() {
        
        this.svg.addEventListener('wheel', (e)=>{
            e.preventDefault()
            this.scale = Math.min(this.MAX_SCALE, Math.max(this.MIN_SCALE, this.scale - e.wheelDelta / 100))
            this.updateZoomPan()       
        })
         
         
         this.svg.addEventListener('mousemove', (e)=>{
            e.preventDefault()    
            
            if (!this.dragging) return
            let ClientRect = e.target.getBoundingClientRect();

            
            
            this.x += e.clientX * (this.scale /500) * e.movementX
            this.x = e.movementX > 0 ? Math.min(this.x, ClientRect.width * this.scale) : Math.max(this.x, (ClientRect.width * this.scale) * -1)
            
            
            this.y += e.clientY * (this.scale /500) * e.movementY
            this.y = e.movementY > 0 ? Math.min(this.y, ClientRect.height * this.scale) : Math.max(this.y, (ClientRect.height * this.scale) * -1)
            
                 //y += Math.round(e.clientY * direction)
                 
            let screenCTM = this.svg.getScreenCTM()
            console.clear()
            console.log(e)
            console.log(e.clientX)
            console.log(ClientRect)
                  
            this.updateZoomPan()
                                   
                
        })
         
        this.svg.addEventListener('mousedown', (e)=>{
            this.dragging = true
            e.target.style.cursor = 'grabbing'
        })
         
        this.svg.addEventListener('mouseup', (e)=>{
            this.dragging = false
            e.target.style.cursor = 'default'
        })
         
    }
    
    updateZoomPan(){
        this.foreignObject.setAttribute("transform", `translate(${this.x}, ${this.y}) scale(${this.scale})`) 
    }

    static get observedAttributes() {
      return []
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {            
        }
    }
     

});
