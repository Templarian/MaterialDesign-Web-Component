import { Component, Prop, Part } from '@mdi/element';

import template from './icon.html';
import style from './icon.css';

const noIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

@Component({
  selector: 'mdi-icon',
  style,
  template
})
export default class MdiIcon extends HTMLElement {
  @Prop() path: string = noIcon;
  @Prop() size: number | null = null;
  @Prop() horizontal: boolean | null = null;
  @Prop() vertical: boolean | null = null;
  @Prop() rotate: number = 0;
  @Prop() color: string | null = null;
  @Prop() spin: number | null = null;
  @Prop() label: string | null = null;
  @Prop() description: string | null = null;
  @Prop() inStack: boolean = false;

  @Part() $path: SVGPathElement;

  // @Conditional('path', 'path')
  render() {
    if (this.label) {
      this.setAttribute('role', 'presentation');
    } else {
      this.removeAttribute('role');
    }
    this.$path.setAttribute('d', this.path);
    if (this.color) {
      this.$path.setAttribute('fill', this.color);
    } else {
      this.$path.removeAttribute('fill');
    }
  }
}