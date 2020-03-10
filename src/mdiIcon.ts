import { Component, Prop } from "./WebComponent";

import template from "./mdiIcon.html";
import style from './mdiIcon.css';

const viewProp = Symbol('view');
const pathProp = Symbol('path');
const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-icon',
  style,
  template,
})
class MdiIcon extends HTMLElement {

  static observedAttributes = ['path']

  @Prop() color: string | null;

  [pathProp] = noIcon

  //@Prop() path: string
  get path() {
    return this[pathProp];
  }
  set path(value: string) {
    this[pathProp] = value || noIcon;
    this.render();
  }

  [viewProp]: {
    path: SVGPathElement
  }

  render() {
    this[viewProp].path.setAttribute('d', this.path);
    if (this.color) {
      this[viewProp].path.setAttribute('fill', this.color);
    } else {
      this[viewProp].path.removeAttribute('fill');
    }
  }

  connectedCallback() {
    // const elm = document.createElement('h3');
    // elm.textContent = 'Stuff';
    // this.shadowRoot.appendChild(elm);
    // console.log(this.path);
    // console.log('connected callback');
  }

  disconnectedCallback() {
    //console.log('disconnected callback');
  }

  componentWillMount() {
    this[viewProp] = {
      path: this!.shadowRoot!.querySelector('path') as SVGPathElement
    }
  }

  componentDidMount() {
    //console.log('component did mount');
  }

  componentWillUnmount() {
    //console.log('component will unmount');
  }

  componentDidUnmount() {
    //console.log('component did unmount');
  }
}