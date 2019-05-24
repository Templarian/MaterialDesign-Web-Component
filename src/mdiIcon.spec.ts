import MdiIcon from './mdiIcon';

const defaultIcon = 'M0 0h24v24H0V0zm2 2v20h20V2H2z';

describe('mdi-icon', () => {
  it('should be registered', () => {
    expect(customElements.get('mdi-icon')).toBeDefined();
  });

  it('path should default', () => {
    var cc = new MdiIcon();
    expect(cc.path).toBe(defaultIcon);
  });
});