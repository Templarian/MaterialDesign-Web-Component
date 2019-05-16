interface CustomElementConfig {
  selector: string;
  template: string;
  style?: string;
  useShadow?: boolean;
}

export default (config: CustomElementConfig) => (cls) => {
  if (!config.template) {
    throw new Error('You need to pass a template for the element');
  }
  const template = document.createElement('template');
  if (config.style) {
    config.template = `<style>${config.style}</style> ${config.template}`;
  }
  template.innerHTML = config.template;

  const connectedCallback = cls.prototype.connectedCallback || (() => { });
  const disconnectedCallback = cls.prototype.disconnectedCallback || (() => { });

  cls.prototype.connectedCallback = function () {
    const clone = document.importNode(template.content, true);
    if (config.useShadow) {
      this.attachShadow({ mode: 'open' }).appendChild(clone);
    } else {
      this.appendChild(clone);
    }

    if (this.componentWillMount) {
      this.componentWillMount();
    }
    connectedCallback.call(this);
    if (this.componentDidMount) {
      this.componentDidMount();
    }
  };

  cls.prototype.disconnectedCallback = function () {
    if (this.componentWillUnmount) {
      this.componentWillUnmount();
    }
    disconnectedCallback.call(this);
    if (this.componentDidUnmount) {
      this.componentDidUnmount();
    }
  };

  cls.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
    this[name] = newValue;
  }

  window.customElements.define(config.selector, cls);
};