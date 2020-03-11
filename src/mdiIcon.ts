import { Component, Prop } from "./WebComponent";

import template from "./mdiIcon.html";
import style from './mdiIcon.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-icon',
  style,
  template
})
class MdiIcon extends HTMLElement {

  static observedAttributes = [];

  @Prop() color: string | null;
  @Prop() path: string = noIcon;

  get $path(): SVGPathElement {
    return this.shadowRoot?.querySelector('path') as any;
  }

  render() {
    this.$path.setAttribute('d', this.path);
    if (this.color) {
      this.$path.setAttribute('fill', this.color);
    } else {
      this.$path.removeAttribute('fill');
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
    console.log('component will mount');
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