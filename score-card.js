/*
 * <score-card></score-card>
 * <script src="score-card.element.js"></script>
 */
function generateTemplate() {

    const template = document.createElement('template');

    template.innerHTML = `
        <style>
            :host h1 {
              font-size: 2.5rem;
              color: var(--on-surface, red);
            }
        </style>
        <article>
            <h1>ScoreCard</h1>                
        </article>
    `;
    return template;
}

class ScoreCard extends HTMLElement {

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      shadowRoot.appendChild(generateTemplate().content.cloneNode(true));
      this.scoredisplay = this.shadowRoot.querySelector('h1')
    }

    connectedCallback() {
        this.render()
    }

    static get observedAttributes() {
      return ['data-score'];
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if ( oldValue !== newValue) {
            this.render()
        }
    }

    render() {
        this.scoredisplay.innerText = this.dataset.score
    }

}

window.customElements.define('score-card', ScoreCard)