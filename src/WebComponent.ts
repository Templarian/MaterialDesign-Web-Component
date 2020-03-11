interface CustomElementConfig {
  selector: string;
  template: string;
  style?: string;
  useShadow?: boolean;
}

interface Constructor {
  symbols: object,
  observedAttributes: string[]
}

const init = Symbol('init');

export function Component(config: CustomElementConfig) {
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
        this[init] = true;
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

export function Prop(): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const { constructor } = target;
    const { observedAttributes } = constructor as Constructor;
    if (!constructor.symbols) {
      constructor.symbols = {};
    }
    const { symbols } = constructor as Constructor;
    observedAttributes.push(propertyKey);
    const symbol = Symbol(propertyKey);
    symbols[propertyKey] = symbol;
    Object.defineProperty(target, propertyKey, {
      get() {
        return this[symbol];
      },
      set(value: string) {
        this[symbol] = value;
        if (this[init]) {
          this.render();
        }
      }
    });
  }
}