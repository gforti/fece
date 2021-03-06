function generateTemplate() {

    const template = document.createElement('template')

    template.innerHTML = `
        <svg viewbox="0 0 250 250"  xmlns="http://www.w3.org/2000/svg">
            <g></g>
            <defs>
                <filter id="hoverBG">
                    <feFlood flood-color="#000" flood-opacity="0.7" result="flood" />                      
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <text id="infoinfo" filter="url(#hoverBG)" x="0" y="0" dx="0" dy="-15" fill="#efe" text-anchor="middle" alignment-baseline="middle"></text>    
            <text id="SummaryTitle" text-anchor="middle" alignment-baseline="middle"></text>
            <text id="SummaryTagline" text-anchor="middle" alignment-baseline="middle"></text>    
        </svg>
    `
    return template
}

window.customElements.define('donut-chart', class extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true))
      this.svg = this.shadowRoot.querySelector('svg')
      this.svgPT = this.svg.createSVGPoint()
      this.sum = this.svg.querySelector('#chartSummary')
      this.sumTitle = this.svg.querySelector('#SummaryTitle')
      this.sumTagline = this.svg.querySelector('#SummaryTagline')
      this.group = this.shadowRoot.querySelector('svg g')
      this._data = []          
      this.settings = new Map([
                ['height', 250],
                ['width', 250],
                ['edgeOffset', 10],
                ['percentageInnerCutout', this.dataset.percentageinnercutout],
            ]);
        this.settings.set('centerX', this.settings.get('width')/2)
        this.settings.set('centerY', this.settings.get('height')/2)
        this.settings.set('doughnutRadius', Math.min(this.settings.get('height') / 2, this.settings.get('width') / 2) - this.settings.get('edgeOffset'))
        this.settings.set('cutoutRadius', this.settings.get('doughnutRadius') * (this.settings.get('percentageInnerCutout') / 100))
        
        this.sumTitle.textContent = this.dataset.title
        this.sumTagline.textContent = this.dataset.subtitle
    }
    
   

    connectedCallback() {
    }

    static get observedAttributes() {
      return ['data-percentageInnerCutout', 'data-title', 'data-subTitle'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            //this.settings.set('percentageInnerCutout', newValue)
        }
    }
    
    get data() {
        return this._data
    }

    set data(data) {
        this._data = data;   // validation could be checked here such as only allowing non numerical values
        if (Array.isArray(this._data) && this._data.length)  this.render()
    }

    render() {        
        let startRadius = -Math.PI / 2; //-90 degree
        
        let data = this._data
        let $paths = []
        let textPaths = []
        let textXY = []
        let frag = document.createDocumentFragment()
        let fontSize = 1        
        let segmentTotal = this._data.reduce((a, b) => a + b.value, 0)

        let centerX = this.settings.get('centerX')
        let centerY = this.settings.get('centerY')
        let doughnutRadius = this.settings.get('doughnutRadius')
        let cutoutRadius = this.settings.get('cutoutRadius')
        let edgeOffset = this.settings.get('edgeOffset')
        let percentageInnerCutout = this.settings.get('percentageInnerCutout')
        
        for (let i = 0, len = data.length; i < len; i++) {
            const cos = Math.cos,
                  sin = Math.sin;
          
            let segmentAngle = (data[i].value / segmentTotal * (Math.PI * 2)),
                endRadius = startRadius + segmentAngle,
                halfRadius = startRadius + (segmentAngle/2),
                largeArc = (endRadius - startRadius) % (Math.PI * 2) > Math.PI ? 1 : 0,
                startX = centerX + cos(startRadius) * doughnutRadius,
                startY = centerY + sin(startRadius) * doughnutRadius,
                endX2 = centerX + cos(startRadius) * cutoutRadius,
                endY2 = centerY + sin(startRadius) * cutoutRadius,
                endX = centerX + cos(endRadius) * doughnutRadius,
                endY = centerY + sin(endRadius) * doughnutRadius,

                dRad = cutoutRadius + ((doughnutRadius-cutoutRadius)/2),
                startXD = centerX + cos(halfRadius) * dRad,
                startYD = centerY + sin(halfRadius) * dRad,

                startXC = centerX + cos(halfRadius) * cutoutRadius,
                startYC = centerY + sin(halfRadius) * cutoutRadius,

                startX2 = centerX + cos(endRadius) * cutoutRadius,
                startY2 = centerY + sin(endRadius) * cutoutRadius;
            
            
            let cmd = [
            'M', startX, startY, //Move pointer
            'A', doughnutRadius, doughnutRadius, 0, largeArc, 1, endX, endY, //Draw outer arc path
            'L', startX2, startY2, //Draw line path(this line connects outer and innner arc paths)
            'A', cutoutRadius, cutoutRadius, 0, largeArc, 0, endX2, endY2, //Draw inner arc path
            'Z' //Close path
            ];
            let cmd2 = [
                'M', Math.min(startXC,startXD), startYC, //Move pointer
                'L', Math.max(startXC,startXD), startYC
            ];
            textXY.push({startX: `${startXD}`, startY: `${startYD}`})
            textPaths[i] = cmd2.join(' ');
            $paths[i] = cmd.join(' '); 
         
           
            startRadius += segmentAngle;
        
            let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            path.setAttribute('stroke-width', '2')
            path.setAttribute('stroke', '#fff')
            path.setAttribute('fill', data[i].color)
            path.setAttribute('d', $paths[i])
            path.classList.add('hov')
            
            path.dataset.value = data[i].value
            path.dataset.display = data[i].display
            frag.appendChild(path)
            
        }
        
        
        let summarySize = (doughnutRadius - (doughnutRadius - cutoutRadius)),
            fontSizeCenter = ( centerX - cutoutRadius ),
                sum = this.sum,
                sumHeader = this.sumTitle
                
            sumHeader.setAttribute('fill', `#fff`)
            sumHeader.setAttribute('x', `${centerX}`)
            sumHeader.setAttribute('y', `${centerY - summarySize/3}`)
            sumHeader.setAttribute('font-size', `${summarySize * .3}`)
            
           fontSize = (doughnutRadius - cutoutRadius/2) * .01;
           
        
        
        
        for (let i = 0, len = data.length; i < len; i++) {
            
            let defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
            let pathClone = document.createElementNS('http://www.w3.org/2000/svg', 'path')
            let uuid = performance.now()
                pathClone.setAttribute('d', textPaths[i])
                pathClone.setAttribute('id', `p${uuid}-${i}`)
              
                defs.appendChild(pathClone)
            
            let textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath')
                textPath.setAttribute('href', `#p${uuid}-${i}`)
           
                textPath.textContent = data[i].value
            
            let textStyle = document.createElementNS('http://www.w3.org/2000/svg', 'text')
                textStyle.setAttribute('fill', `#fff`)
                textStyle.setAttribute('x', `${textXY[i].startX}`)
                textStyle.setAttribute('y', `${textXY[i].startY}`)
                textStyle.setAttribute('text-anchor', `middle`)
                textStyle.setAttribute('alignment-baseline', `middle`)
             
                textStyle.textContent = `${data[i].value}%`
                textStyle.classList.add('hov')
                textStyle.dataset.value = data[i].value
                textStyle.dataset.display = data[i].display
                textStyle.style.cursor = 'default'
                textStyle.style.fontSize = `${fontSize}rem`
          
                frag.appendChild(defs)
                frag.appendChild(textStyle)
      }
      
      
       
        this.wrapTextRect()
        
        
        
        frag.querySelectorAll('.hov').forEach((elem)=>{
             elem.addEventListener('mousemove', (e)=>{
                  // console.log('clicked on', e)
                  
                  let loc = this.cursorPoint(e);
                // Use loc.x and loc.y here
                 this.svg.querySelector('#infoinfo').setAttribute('x', loc.x ) 
                 this.svg.querySelector('#infoinfo').setAttribute('y', loc.y ) 
                 this.svg.querySelector('#infoinfo').textContent = `${e.target.dataset.display}`
                 
             })
             
             elem.addEventListener('mouseout', (e)=>{                 
                 this.svg.querySelector('#infoinfo').textContent = ''                 
             })
         })
         
         
          
           let cNode = this.group.cloneNode(false);
           this.group.parentNode.replaceChild(cNode ,this.group);
           this.group = cNode
           this.group.insertBefore(frag, this.group.firstChild)
        
        
    }
    
    
    
    cursorPoint(evt){
          this.svgPT.x = evt.clientX; this.svgPT.y = evt.clientY;
          return this.svgPT.matrixTransform(this.svg.getScreenCTM().inverse());
        }
        
        
        
        
   wrapTextRect() {
       
       let doughnutRadius = this.settings.get('doughnutRadius')
        let cutoutRadius = this.settings.get('cutoutRadius')
        let summarySize = (doughnutRadius - (doughnutRadius - cutoutRadius))
       let maxWidth = cutoutRadius * 2
       let centerX = this.settings.get('centerX')
        let centerY = this.settings.get('centerY')
        let centerYtop = centerY - summarySize/18
      
       console.log('maxWidth', maxWidth)
       console.log('cutoutRadius * 2', (maxWidth ) + (centerYtop - centerY)*2 )
       
       let text = this.dataset.subtitle
       
      
       let words = text.toString().trim().split(' ')
       
       // console.log('----------height', height)
       
       this.sumTagline.textContent = ''
       
       
        
    this.sumTagline.setAttribute("x", centerX);
    this.sumTagline.setAttribute("y", centerYtop);
    this.sumTagline.setAttribute("font-size", (summarySize * .24));
    this.sumTagline.setAttribute("fill", '#FFF');
       
       
        
       
       let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
       
       tspan.appendChild( document.createTextNode(words.shift()))
       tspan.setAttribute("x", centerX);
       tspan.setAttribute("y", centerYtop);
       this.sumTagline.appendChild(tspan);  
       
       
        let height = ~~this.sumTagline.getBBox().height
      
       let y = ~~centerYtop+height
       
       // console.log('this.sumTagline.getBBox()()', this.sumTagline.getBBox())
               
        /*       sumTag = this.sumTagline
                
            sum.setAttribute('fill', `#fff`)
            sum.setAttribute('x', `${centerX}`)
            sum.setAttribute('y', `${centerY}`)
            sum.setAttribute('font-size', `${summarySize * .2}`)
            
            console.log(sumTag.getComputedTextLength())
            console.log(sumTag.textContent)
            console.log(sumTag.getBBox().height)
            console.log(sumTag.getBBox())
       */
    
    let line = 1;
    words.forEach( (word, index) => {
        
       // let text_node = document.createTextNode(word);
        //    tspan.appendChild(text_node);
         let len = tspan.firstChild.data.length            // Find number of letters in string
        // tspan.firstChild.data += ` ${word}`;
         tspan.firstChild.data += " " + word;  
         
         
         // console.log(tspan.firstChild.data.length )
        // console.log('word', word)
        /* console.log('tspan', tspan)
         console.log('tspan.firstChild', tspan.firstChild)
         console.log('tspan.firstChild.data', tspan.firstChild.data)
         console.log('getComputedTextLength', tspan.getComputedTextLength())
         console.log('maxWidth', maxWidth, maxWidth/index * .100) */
        // console.log('tspan', tspan.textContent )
        //(centerYtop*2 ) -maxWidth
        
        let dy = centerYtop + (height * line)
        
        let checkWidth = maxWidth - (dy/2 - centerY/2)
        //console.log('checkWidth', checkWidth)
        
        if (tspan.getComputedTextLength() > checkWidth)
        {
            
            tspan.firstChild.data = tspan.firstChild.data.slice(0, len);
            
            line++
            console.log('checkWidth --------->', checkWidth)
            tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
            tspan.appendChild( document.createTextNode(word))
            tspan.setAttribute("y", dy);
            tspan.setAttribute("x", centerX);
            tspan.setAttribute("width", checkWidth);
                        
            this.sumTagline.appendChild(tspan)
      

        }
            
    })
    

    
}      
        
        
        

});
