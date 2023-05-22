module.exports = {
  maxWorkers: 4,
  takeScreenshot: true,
  fileIgnore: [
    // Ignore the automatically generated pages list "index.html" by default
    '**/index.html',
  ],
  // For more documentation on usage check
  // https://www.npmjs.com/package/pa11y#configuration
  pa11yConfig: {
    runners: ['axe'],
    standard: 'WCAG2AA',
    includeNotices: true,
    includeWarnings: true,
    // For possible options see: https://squizlabs.github.io/HTML_CodeSniffer/Standards/WCAG2/
    // Example: "Principle4.Guideline4_1.4_1_1.F77" for ignoring duplicate IDs
    ignore: [],
    viewport: {
      width: 1280,
      height: 1024, // Height will be overridden to always match the document height
    },
  },
}
