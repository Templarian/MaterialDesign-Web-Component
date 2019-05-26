interface CustomElementConfig {
  selector: string;
  template: string;
  style?: string;
  useShadow?: boolean;
}

export function Component (config: CustomElementConfig) {
  return function (cls) {
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
      if (config.useShadow === false) {
        this.appendChild(clone);
      } else {
        this.attachShadow({ mode: 'open' }).appendChild(clone);
      }
  
      if (this.componentWillMount) {
        this.componentWillMount();
      }
      if (this.render) {
        this.render();
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
    };
  
    window.customElements.define(config.selector, cls);
  };
}

export function Prop (defaultValue = null): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const observedAttributes = (target as any).constructor.observedAttributes as string[];
    observedAttributes.push(propertyKey);
    Object.defineProperty(target, propertyKey, {
      get () {
        return this[Symbol(propertyKey)];
      },
      set (value: string) {
        this[Symbol(propertyKey)] = value || defaultValue;
        this.render();
      }
    })
    console.log(observedAttributes, propertyKey, descriptor);
  }
}