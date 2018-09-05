
function customElementSandbox() {
    let el;

    beforeEach(function () {
        el = document.createElement('score-card');       
        document.body.appendChild(el);
    });

    afterEach(function () {
        document.body.removeChild(el);
        el = null;
    });
}


describe('score-card', () => {
    customElementSandbox()
   
  describe('interface', () => {
     
    it('should be defined', async () => { 
      let elem = document.querySelector('score-card');
      expect(elem).toBeDefined()
      expect(window.customElements.get('score-card')).not.toBeUndefined()
    });
    
    it('should be an Element node ', async () => {
      let elem = document.querySelector('score-card');
      expect(elem.nodeType).toEqual(Node.ELEMENT_NODE);
    });
    
    
    
     
    
    
    it('should apply color theme', () => {
        let component = document.querySelector('score-card')        
        let h1 = component.shadowRoot.querySelector('h1');
        h1.style.setProperty('--on-surface', 'rgb(155, 155, 155)')
        let h1Color = window.getComputedStyle(h1).getPropertyValue('color');
        expect(h1Color).toEqual('rgb(155, 155, 155)');  
      });
    
    
  });
  
  
  
  it('should update the text', async () => { 
      let elem = document.querySelector('score-card');
      elem.dataset.score = '50'
      console.log(elem)
      expect(elem.shadowRoot.querySelector('h1')).toBeDefined()      
      expect(elem.shadowRoot.querySelector('h1').innerText).toEqual('50')
    });
    
  it('should be defined', async () => { 
      //expect(CustomElementRegistry.get('score-card')).toBeDefined()
      // console.log(customElements.get('score-card'))
      expect(window.customElements.get('score-card')).not.toBeUndefined()
    });
  
  //this.scoredisplay.innerText
  
});