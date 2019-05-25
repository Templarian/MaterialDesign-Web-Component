import './mdiIcon';

describe('mdi-icon', () => {

  const defaultIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

  beforeEach(() => {
    var c = document.createElement('mdi-icon');
    document.body.appendChild(c);
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should be registered', () => {
    expect(customElements.get('mdi-icon')).toBeDefined();
  });

  it('path should default', () => {
    var c = document.querySelector('mdi-icon');
    var path = c.shadowRoot.querySelector('path');
    expect(path.getAttribute('d')).toBe(defaultIcon);
  });

  it('path should be set 2', async () => {
    var c = document.querySelector('mdi-icon');
    await c.setAttribute('path', 'M12,4C14.21,4 16,5.79 16,8C16,10.21 14.21,12 12,12C9.79,12 8,10.21 8,8C8,5.79 9.79,4 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z');
    var path = c.shadowRoot.querySelector('path');
    expect(path.getAttribute('d')).not.toBe(defaultIcon);
  });

});
