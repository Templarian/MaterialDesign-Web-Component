import Component from "./Component";

@Component({
  selector: 'mdi-icon',
  template: `<svg viewBox="0 0 24 24">
      <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z"/>
    </svg>`,
  style: `:host svg {
      width: 1.5rem;
      height: 1.5rem;
    }`,
  useShadow: true
})
class MdiIcon extends HTMLElement {
  connectedCallback() {
    const elm = document.createElement('h3');
    elm.textContent = 'Component will destroy in 10seconds';
    this.shadowRoot.appendChild(elm);
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
