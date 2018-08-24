# Front End Custom Elements 

Why Web components, zero dependency's and all benefits of reusability.  Just drop it in the project and use it.  
These `Custom Elements` are now native to JavaScript. Read more about it [MDN - Web Components - Concepts and usage](https://developer.mozilla.org/en-US/docs/Web/Web_Components)


For an example on how to use this module vist [FECE - Demo](https://github.com/gforti/fece-demos)

I also recommend to see some demos on how you can use custom elements natively.  There is also a wiki with more information

- [Custom Element Demos](https://github.com/gforti/custom-element-demo)
- [Custom Element Wiki](https://github.com/gforti/custom-element-demo/wiki)


### Getting Started

if you will be packaging your app you can save it has a dev dependency

```sh
$ npm install fece --save-dev
```

To check for updates you can use the following command

```sh
$ npm outdated
```

If you want to upgrade, I did not find an easier way than to 
- delete the `package-lock.json` file
- update package.json and ensure the package `fece` is at the version you want
- run npm install again, the package.lock file will be generated again(unless disabled)

### Including all

Might not be recommended but you can include all the elements with the following import

```js
import 'node_modules/fece/index.js'
```

### Include as needed

It's recommended to only include the one's needed

```js
import 'node_modules/fece/circular-percentage.js'
```

Once included on the tag will be available.

```html
<circular-percentage data-percent="50"></circular-percentage>
```

> Note that you can also just download the files from the git repo and include them in your project

### IE support

With the pollyfill [IE and browser support](https://github.com/gforti/custom-element-demo/wiki/IE-and-browser-support)
the `:host` selector in the css must be removed. At some point in the future IE will have full support.


### Themes and custom styling

This is a work in progress but the idea will support CSS variables but have a default theme color in place.