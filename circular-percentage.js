function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            .single-chart {
                justify-content: space-around ;
            }

            .circular-chart {
              display: inline;
            }

            .circle-bg {
              fill: none;
              stroke: var(--surface, #eee);
              stroke-width: 3.8;
            }

            .circle {
               fill: none;
               stroke: var(--accent, #3c9ee5);
               stroke-width: 2.8;
            }

            .fill-in {
              animation: progress 1s ease-out forwards;
            }

            @keyframes progress {
              0% {
                stroke-dasharray: 0 100;
              }
            }

            .percentage {
              fill: #666;
              font-family: sans-serif;
              font-size: 0.5em;
              text-anchor: middle;
            }
        </style>
        <div class="single-chart">
            <svg viewbox="0 0 36 36" class="circular-chart">
              <path class="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path class="circle"
                stroke-dasharray="0, 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" class="percentage">0%</text>
            </svg>
          </div>
    `;
    return template;
}

class circularPercentage extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.div = this.shadowRoot.querySelector('div')
      this.setSelectors()
      this.scrollCheck = this.checkViewPort.bind(this)
    }
    
    setSelectors(){
        this.svg = this.div.querySelector('svg')
        this.svgPath = this.div.querySelector('path.circle')
        this.svgText = this.div.querySelector('text.percentage')
    }

    connectedCallback() {
        this.render()
        window.addEventListener('scroll', this.scrollCheck)
        this.svgPath.addEventListener('animationiteration', ()=>{
            this.svgPath.style.webkitAnimationPlayState="paused";
        })
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
        this.svgPath.setAttribute('stroke-dasharray', `${this.dataset.percent}, 100`)
        if ( this.svgPath.classList.contains('fill-in') ) {
            const clone = this.svg.cloneNode(true);
            this.div.replaceChild(clone, this.svg);
            this.setSelectors()
        }        
        
    }
    
    checkViewPort() {
        if ( this.svgPath.getBoundingClientRect().top <= window.innerHeight * 0.75 
             && this.svgPath.getBoundingClientRect().top > 0) {
          this.svgPath.classList.add('fill-in','blue')
          window.removeEventListener('scroll', this.scrollCheck)
        }
    }

}

window.customElements.define('circular-percentage', circularPercentage);
