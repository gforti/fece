function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            .chart-number {
                text-anchor: middle;
              }

            .chart-label {
              text-transform: uppercase;
              text-anchor: middle;
            }
            
            .chartSummary {
                position: absolute;
                top: 50%;
                left: 50%;
                color: #d5d5d5;
                text-align: center;
                text-shadow: 0 -1px 0 #fff;
                cursor: default;
                font-size: 100vw;
            }
        </style>
         <div class='chartSummary'>
            <span>All Briaders</span>
            Briader Status Live
        </div>
        <svg viewbox="0 0 250 250"  id="doughnut-chart" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">

            <g> </g>

            <defs>
                <filter id="goo" >
                 <feFlood flood-color="#000" flood-opacity="0.7" result="flood" />                      
                 <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <text id="infoinfo" filter="url(#goo)" x="0" y="0" dx="-10" dy="-20" fill="#efe" font-size="14" text-anchor="middle" alignment-baseline="middle">                    
                It was the best of times                    
            </text>
        </svg>
    `;
    return template;
}

window.customElements.define('dounut-chart', class extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true))
      this.svg = this.shadowRoot.querySelector('svg')
      this.svgPT = svg.createSVGPoint()
      this.sum = this.shadowRoot.querySelector('.chartSummary')
      this.sumHeader = this.shadowRoot.querySelector('.chartSummary span')
      this.group = g = this.shadowRoot.querySelector('svg g')
                
      this.settings = new Map([
                ['height', 250],
                ['width', 250],
                ['edgeOffset', 10],
                ['percentageInnerCutout', 65],
            ]);
              
        this.settings.set('centerX', this.settings.get('width')/2)
        this.settings.set('centerY', this.settings.get('height')/2)
        this.settings.set('doughnutRadius', Math.min(this.settings.get('height') / 2, this.settings.get('width') / 2) - this.settings.get('edgeOffset'))
        this.settings.set('cutoutRadius', this.settings.get('doughnutRadius') * (this.settings.get('percentageInnerCutout') / 100))
          
          
      this.setSelectors()
      this.scrollCheck = this.checkViewPort.bind(this)
    }
    
    setSelectors(){
        this.svg = this.div.querySelector('svg')
        this.svgPath = this.div.querySelector('path.circle')
        this.svgText = this.div.querySelector('text.percentage')
    }

    connectedCallback() {        
        window.addEventListener('scroll', this.scrollCheck)
        this.checkViewPort()
        this.render()       
    }

    static get observedAttributes() {
      return ['data-percent'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
    }

    render() {        
        this.svgText.innerHTML = `${this.dataset.percent}%`        
        if ( this.svgPath.classList.contains('fill-in') ) {    
            this.svgPath.setAttribute('stroke-dasharray', `${this.dataset.percent}, 100`)
            const clone = this.svg.cloneNode(true);            
            this.div.replaceChild(clone, this.svg);
            this.setSelectors()            
        }        
        
    }
    
    //set 
    
    checkViewPort() {
        if ( this.svgPath.getBoundingClientRect().top <= window.innerHeight * 0.75 
             && this.svgPath.getBoundingClientRect().top > 0) {
          this.svgPath.classList.add('fill-in')
          this.render()
          window.removeEventListener('scroll', this.scrollCheck)
        }
    }
    
    
    cursorPoint(evt){
          pt.x = evt.clientX; pt.y = evt.clientY;
          return pt.matrixTransform(svg.getScreenCTM().inverse());
        }

});
