# Changelog
All notable changes to this project will be documented in this file.

## [1.3.0] - 2017-08-03
### Added
#### General
- Added SonarQube properties to overwrite global JS vars.
- Added Babel transpiler for ES6 browser support.
- Added SASS linting for code consistency.
- Added JS linting for code consistency.
- Added [.nvmrc](https://github.com/creationix/nvm) for easy node switching.
- Added gulp to scripts in package.json to run gulp locally
#### SASS changes
- Added responsive spacing utility.
- Added fluid type tool
- Added media query mixins 🙌
- Added current viewport indicator to see what viewport you're looking at.


### Changed
#### General
- Upgraded to Nunjucks 2.0.
- Converted SASS [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) naming convention
- Converted HTML to [BEMIT](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) naming convention
- Converted JS to ES6
- Updated deprecated cleanCSS package
- Updated gulp SASS
- Fixed BrowserSync reload issue in Node 6+
- Updated readme with new contributors
#### SASS changes
- Fixed some grid issues with mobile first toggling
- Moved heading styles to mixins and implemented them in heading elements and heading utilities.
- Grid classes use BEMIT naming convention, please check the [readme](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/overview#markdown-header-usage)


### Removed
- Removed Angular folder because it was redundant
- Removed a lot of example modules (common question by FE team)
- Old gulp tasks (Modernizr, Zip, SvgSprite, Readme)
