module.exports = {
  maxWorkers: 4,
  takeScreenshot: true,
  fileIgnore: ['**/api-response--**', 'index.html'],
  // For more documentation on usage check
  // https://www.npmjs.com/package/pa11y#configuration
  pa11yConfig: {
    runners: ['axe'],
    standard: 'WCAG2AA',
    includeNotices: true,
    includeWarnings: true,
    viewport: {
      width: 1280,
      height: 1024, // Height will be overridden to always match the document height
    },
  },
}
