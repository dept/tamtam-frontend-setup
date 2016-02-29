[frontend-setup](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup)
==============

A basic setup for creating (static) html templates. Filled with automated tasks and configuration options.


# Install #
1. npm install
1. bower install
1. gulp

# Gulp #
We're using Gulp by default for our project setup.
All settings are stored in the **gulpfile.js** folder, where **config.js** contains the global Gulp config.
Pro-users could dive deeper into the Gulp setup, but it's not required.

Some default Gulp tasks:

* gulp 
> (default - will run gulp server)
* gulp bamboo 
> (build specific for Bamboo)
* gulp build 
> (default build for development)
* gulp dist 
> (build for distribution for backend)
* gulp server 
> (build including live server)

# Source #
## Assets ##
Contains fonts, images and SVG files.

## Data ##
JSON data which is available for your Nunjucks templating.
The files are sorted per page.

## HTML ##
Modular setup of the HTML files.

In the root of the folder, the pages are set.

Folders are used for **elements**, **layout** and **modules**.

The **_dev** folder is used for development / debug purpose and there's no real need to edit this. These files are not used in the real project, but during local development.


## Javascript ##
CommonJS setup with various sample images to explain how to use, export and reuse the modules.


## SASS ##
Folder which contains all SASS and related files, e.g. configs, mixins and extends.

The **_dev** folder is - again - just being used in local development. All other folders and files are split and sorted into elements, layout, modules and utils.

Files can be rearranges as wished, as long as the main folder structure stays intact.


# Build and Dist #
Both folders will be created by the corresponding Gulp task and will include all final files.