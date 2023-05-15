// For more documentation on usage check
// https://www.npmjs.com/package/pa11y#configuration

module.exports = {
  runners: ['axe'],
  standard: 'WCAG2AA',
  includeNotices: true,
  includeWarnings: true,
  viewport: {
    width: 1280,
    height: 99999,
  },
}
