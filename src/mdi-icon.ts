import html from "./mdi-icon.html";
import style from './mdi-icon.css';

const pathProp = Symbol('path');
const viewProp = Symbol('view');

class MdiIcon extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = `<style>${style}</style>${html}`;
    const clone = document.importNode(template.content, true);
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(clone);
    this[viewProp] = {
      path: shadowRoot.querySelector('path') as SVGPathElement
    }
  }

  static get observedAttributes() { return ['path']; }

  [viewProp]: {
    path: SVGPathElement
  }

  [pathProp] = 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z'
  set path(value: string) {
    this[pathProp] = value
    this.render();
  }
  get path() {
    return this[pathProp]
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  render() {
    this[viewProp].path.setAttribute('d', this.path);
  }

  connectedCallback() {
    // const elm = document.createElement('h3');
    // elm.textContent = 'Stuff';
    // this.shadowRoot.appendChild(elm);
    console.log(this.path);
    console.log('connected callback');
  }

  disconnectedCallback() {
    console.log('disconnected callback');
  }

  componentWillMount() {
    console.log('component will mount');
  }

  componentDidMount() {
    console.log('component did mount');
  }

  componentWillUnmount() {
    console.log('component will unmount');
  }

  componentDidUnmount() {
    console.log('component did unmount');
  }
}

window.customElements.define('mdi-icon', MdiIcon);