const createAliasObject = require('tamtam-frontend-builder/gulpfile.js/tasks/script/create-alias-object')

module.exports = {
  verbose: true,
  moduleNameMapper: createAliasObject(),
  transform: {
    '^.+\\.(j|t)sx?$': '<rootDir>/node_modules/tamtam-frontend-builder/utils/jest-transformer.js',
  },
}
