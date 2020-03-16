import { Component, Prop, Part } from "./WebComponent";
import MdiIcon from './mdiIcon';

import style from './mdiIconTooltip.css';
import template from './mdiIconTooltip.html';

const noIcon = 'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z';

@Component({
  selector: 'mdi-icon-tooltip',
  style,
  template
})
export default class MdiIconTooltip extends MdiIcon {

  // Example: Override default
  @Prop() path: string = noIcon;
  @Prop() tooltip: string | null = null;

  @Part() $tooltip: HTMLSpanElement;

  // Example: Custom rendering
  render() {
    if (this.tooltip) {
      this.$tooltip.dataset.tooltip = this.tooltip;
      this.$tooltip.classList.add('tooltip');
    } else {
      this.$tooltip.dataset.tooltip = '';
      this.$tooltip.classList.remove('tooltip');
    }
  }
}