import { Component, Prop, Part } from "./WebComponent";

import template from "./mdiIcon.html";
import style from './mdiIcon.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-icon',
  style,
  template
})
export default class MdiIcon extends HTMLElement {
  @Prop() color: string | null;
  @Prop() path: string = noIcon;

  @Part() $path: SVGPathElement;

  // @Bind(this.$path, 'd', this.path)
  render() {
    this.$path.setAttribute('d', this.path);
    if (this.color) {
      this.$path.setAttribute('fill', this.color);
    } else {
      this.$path.removeAttribute('fill');
    }
  }

  connectedCallback() {
    // console.log('connected callback');
  }

  disconnectedCallback() {
    //console.log('disconnected callback');
  }

  componentWillMount() {
    // console.log('component will mount');
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