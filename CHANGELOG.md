# Changelog
All notable changes to this project will be documented in this file.

## [1.2.2] - 2017-07-30
### Added
- Added SonarQube properties to overwrite global JS vars
- Added Babel transpiler for ES6 browser support
- Added SASS linting for code consistency
- Added JS linting for code consistency
- Added [.nvmrc](https://github.com/creationix/nvm) for easy node switching
- Added responsive spacing


### Changed
- Upgraded to Nunjucks 2.0
- Converted SASS [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) naming convention
- Converted HTML to [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) naming convention
- Converted JS to ES6
- Updated deprecated cleanCSS package
- Updated gulp SASS
- Fixed some grid issues with mobile first toggling
- Fixed BrowserSync reload issue in Node 6+
- Updated readme with new contributors
- Moved heading styles to mixins and implemented them in heading elements and heading utilities.


### Removed
- Removed Angular folder because it was redundant
- Removed a lot of example modules (common question by FE team)
