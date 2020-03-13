interface CustomElementConfig {
  selector: string;
  template?: string;
  style?: string;
  useShadow?: boolean;
}

interface Constructor {
  symbols: object,
  observedAttributes: string[]
}

const init = Symbol('init');
const template = Symbol('template');
const style = Symbol('style');

export function Component(config: CustomElementConfig) {
  return function (cls) {
    var parentCls = Object.getPrototypeOf(cls.prototype);
    if (cls[style]) {
      config.style = `${cls[style]}${config.style || ''}`;
    }
    if (cls[template]) {
      if (config.template?.match(/<parent\/>/)) {
        config.template = config.template.replace(/<parent\/>/, cls[template]);
      } else {
        config.template = `${cls[template]}${config.template || ''}`;
      }
    }
    if (config.style) {
      cls[style] = config.style;
    }
    if (config.template) {
      cls[template] = config.template;
    }
    const connectedCallback = cls.prototype.connectedCallback || (() => { });
    const disconnectedCallback = cls.prototype.disconnectedCallback || (() => { });

    cls.prototype.connectedCallback = function () {
      console.log('config', config.selector);
      if (!this[init] && config.template) {
        const $template = document.createElement('template');
        if (config.style) {
          config.template = `${config.template}<style>${config.style}</style>`;
        }
        $template.innerHTML = config.template;
        const $node = document.importNode($template.content, true);
        if (config.useShadow === false) {
          this.appendChild($node);
        } else {
          this.attachShadow({ mode: 'open' }).appendChild($node);
        }
      } else if (this[init] && config.style) {
        /*if (this.shadowRoot) {
          const style = document.createElement('style');
          style.appendChild(document.createTextNode(config.style));
          this.appendChild(style);
        }*/
        //console.log(config);
      } else if (this[init] && config.template) {
        throw new Error('template from base class cannot be overriden. Fix: remove template from @Component');
      } else if (config.template) {
        throw new Error('You need to pass a template for the element');
      }

      if (this.componentWillMount) {
        this.componentWillMount();
      }
      if (parentCls.render) {
        parentCls.render.call(this);
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

    if (!window.customElements.get(config.selector)) {
      window.customElements.define(config.selector, cls);
    }
  };
}

export function Prop(): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const { constructor } = target;
    if (!constructor.observedAttributes) {
      console.log('define static')
      constructor.observedAttributes = [];
    }
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
          if (target.render) {
            target.render.call(this);
          }
          if (this.render) {
            this.render();
          }
        }
      }
    });
  }
}