module.exports = {
  process(src, filename, config, options) {
    // Ignore CSS Entirely
    return `module.exports = ""`;
  }
}