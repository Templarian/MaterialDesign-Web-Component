import Component from "./Component";

import template from "./mdi-icon.html";
import style from './mdi-icon.css';

const pathProp = Symbol('path');
const viewProp = Symbol('view');

@Component({
  selector: 'mdi-icon',
  style,
  template,
})
class MdiIcon extends HTMLElement {
  constructor() {
    super();

  }

  static get observedAttributes() { return ['path']; }

  [viewProp]: {
    path: SVGPathElement
  }

  // @Prop() path: string = 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z'

  [pathProp] = 'M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z'
  set path(value: string) {
    this[pathProp] = value;
    this.render();
  }
  get path() {
    return this[pathProp];
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
    this[viewProp] = {
      path: this.shadowRoot.querySelector('path') as SVGPathElement
    }
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