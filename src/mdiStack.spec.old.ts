import './mdiStack'
import './mdiIcon'

describe('mdi-stack', () => {
  it('should be registered', () => {
    expect(customElements.get('mdi-stack')).toBeDefined();
  });

  it('requires mdi-icon also be registered', () => {
    expect(customElements.get('mdi-icon')).toBeDefined();
  });
});