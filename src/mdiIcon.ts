import Component from "./Component";

import template from "./mdiIcon.html";
import style from './mdiIcon.css';

const pathProp = Symbol('path');
const viewProp = Symbol('view');
const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-icon',
  style,
  template,
})
export default class MdiIcon extends HTMLElement {

  static get observedAttributes() { return ['path']; }

  [viewProp]: {
    path: SVGPathElement
  }

  // @Prop() path: string = 'M0 0h24v24H0V0zm2 2v20h20V2H2z'

  [pathProp] = noIcon
  set path(value: string) {
    this[pathProp] = value || noIcon;
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