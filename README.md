# Front End Custom Elements 

Why Web components, zero dependency's and all benifits of resuability.  Just drop it in the project and use it.  
These `Custom Elments` are now native to JavaScript. Read more about it 
[MDN - Web Components - Concepts and usage](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

### Including all

Might be be recommended but you can include all the elements with the following import

```js
import 'node_modules/fece/index.js'
```

### Include as needed

It's recommended to only include the one's needed

```js
import 'node_modules/fece/circular-percentage.js'
```

One included on the tag will be available.

```html
<circular-percentage data-percent="50"></circular-percentage>
```
