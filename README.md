[frontend-setup](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup)
==============
This setup is based on [Gulp starter](https://github.com/vigetlabs/gulp-starter) and has been modified to an ideal usecase.

# Table of Contents
1. [Intro](#markdown-header-setup)
2. [Install](#markdown-header-install)
3. [Gulp](#markdown-header-gulp)
    - [Config](#markdown-header-config)
4. [Folder structure](#markdown-header-folder-structure)
    - [Source](#markdown-header-source)
        - [Assets](#markdown-header-assets)
        - [Data](#markdown-header-data)
        - [HTML](#markdown-header-html)
        - [Javascript](#markdown-header-javascript)
        - [SASS](#markdown-header-sass)
    - [Build and Dist](#markdown-header-build-and-dist)
6.  [HTML Templating](#markdown-header-html-templating-nunjucks)
    - [Macro](#markdown-header-macro)
    - [JSON Data](#markdown-header-json-data)
7.  [Grid system](#markdown-header-grid-system)
    - [Config](#markdown-header-config)
    - [Usage](#markdown-header-usage)

------

# Setup #
Welcome to the readme of the TamTam frontend setup.

This is a basic setup for creating (static) html templates.
Filled with automated tasks and configuration options.
It enables you to quickly and easily setup your project and get in running in no time.
Many things are already predefined, added and sorted out for you to take away some hussle.
The pro users can dive into settings an tasks, but that's not required to work with it.


You're always welcome to change settings and reorder things around the project,
as long as you keep the folder strucute as is. 
This way other developers can get their head around your code and your folder won't become a maze.


The setup is always in progress so if you're having an idea or thought, please share it.
Send an email to simon@tamtam.nl and we'll take care of it.
When you're in to optimising code, add a feature or any code whatsoever, please do so and get a pull request.

We're in this together, as a group of frontend developers.
So let's make this setup as best as we can so every project is setup in no time !


**Team responsible for this setup:**

* Simon Colijn (simon@tamtam.nl)
* Adrian Klingen (adrian@tamtam.nl)
* Geert Fokke (geert@tamtam.nl)
* All frontend developers within TamTam (frontend@tamtam.nl)

------

# Install #
To use the setup use the following commands.

__1. Install all the npm modules__

`npm install`

__2. Optional: Install bower modules you need__

`bower install`

__3. Start the project__

`gulp`

------

# Gulp #
We're using Gulp by default for our project setup.
All settings are stored in the [__gulpfile.js__](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/gulpfile.js/config.js?fileviewer=file-view-default) folder, where [__config.js__](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/gulpfile.js/config.js?fileviewer=file-view-defaultconfig.js) contains the global Gulp config.
Pro-users could dive deeper into the Gulp setup, but it's not required.

> *Please don't use Grunt, it's outdated, not as supported as Gulp and we do not support it at TamTam anymore.**


**Available gulp tasks for building:**

__gulp__
> (default - will run gulp server)

__gulp__ bamboo 
> (build specific for Bamboo)

__gulp__ build 
> (default build for development)

__gulp__ dist 
> (build for distribution for backend)

__gulp__ server 
> (build including live server)

__gulp__ clean 
> (Remove and rebuild the build directory)

## Config ##
The gulpfile.js has two main files: `config.js` and `index.js`.

The `config.js` contains all the paths the tasks rely on. You can change them to suit your needs.

The `index.js` file is where all the tasks are defined. Here you can enable certain config variables for each task. For example, minifying when it is running the bamboo task.

The most important thing to know is that you can also include your `bower` or `npm` dependancies that are incompatible with commonJS. This can be found at `config.libs`.


------

# Folder Structure #

>## Source ##

>>### Assets ###
>>Contains fonts, images and SVG files.
>>
>>These will be automaticly copied to the right folders.

>>### Data ###
>>JSON data which is available for your Nunjucks templating. The `.json` files should be named by page or module

>>### HTML ###
>>Modular setup of the HTML files.
>>
>>In the root of the folder, the pages are set.
>>
>>Folders are used for **elements**, **layout** and **modules**.

>>The **_dev** folder is used for development / debug purpose and there's no real need to edit this. These files are not used in the real project, but during local development.


>>### Javascript ###
>>CommonJS setup with various sample images to explain how to use, export and reuse the modules.
>>
>>### SASS ###
>>Folder which contains all SASS and related files, e.g. configs, mixins and extends.
>>
>>The **_dev** folder is - *again* - just being used in local development. All other folders and files are split and sorted into elements, layout, modules and utils.
>>
>>Files can be rearranges as wished, as long as the main folder structure stays intact.

>## Build and Dist ##
>Both folders will be created by the corresponding Gulp task and will include all final files.

------

# HTML Templating - Nunjucks #
[What is nunjucks?](https://mozilla.github.io/nunjucks/) Nunjucks is a powerful templating engine, using Javascript. It allows you to create sophisticated [macros](https://mozilla.github.io/nunjucks/templating.html#macro) to render clean and easy-to-read html.

[Go to the Documentation](https://mozilla.github.io/nunjucks/templating.html)

### Macro ###

This is a simple example of how a macro can support you in coding for instance forms. You can also generate your html based off [json data](#markdown-header-json-data).

__Macro definition__
```
{% macro inputText(name, value='', type='text') %}
    <div class="input__holder">
        <label for="{{ name }}"></label>
        <input class="input--{{ type }}" type="{{ type }}" name="{{ name }}" id="{{ name }}" placeholder="{{ value | escape }}" />
    </div>
{% endmacro %}
```

__Usage__

```
{{ inputText('username', false, 'text') }}
```

__Result__
```
<div class="input__holder">
    <label for="username"></label>
    <input class="input--text" type="text" name="username" id="username" placeholder="" />
</div>
```

### JSON Data ###

JSON data is a good way to make your life easier whilst developing with Nunjucks. This way you can create complete forms just by reading a json object. The JSON [folder](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/data/) can be found in the `source` folder.

#### Example ####

__JSON object__

This JSON example has been created in `data/pages/contact.json`

```
{
    contactForm : {
        { 
            name: "emailaddress",
            value: "Your emailaddress",
            type: "email"
        },
        { 
            name: "subject",
            value: "Subject",
            type: "text"
        },
        { 
            name: "message",
            value: "Your message",
            type: "textarea"
        }
    }
}
```


__Using the JSON as data__

This object can be used as followed.

```
<form>
    {% for input in pages.contact.contactForm %}
        {{ input(input.name, input.value, input.type) }}
    {% endfor %}
</form>
```

> _The used macro_
```
{% macro input(name, value='', type='text') %}
    <div class="input__holder">
        {% if type != 'textarea' %}
            <label for="{{ name }}"></label>
            <input class="input--{{ type }}" type="{{ type }}" name="{{ name }}" id="{{ name }}" placeholder="{{ value | escape }}" />
        {% else %}
            <textarea class="input--{{ type }}" name="{{ name }}" id="{{ name }}" placeholder="{{ value | escape }}" />
        {% endif %}
    </div>
{% endmacro %}
```

__Final output__

```
<form>
    <div class="input__holder">
        <label for="emailaddress"></label>
        <input class="input--email" type="email" name="emailaddress" id="emailaddress" placeholder="Your emailaddress" />
    </div>
    <div class="input__holder">
        <label for="subject"></label>
        <input class="input--text" type="text" name="subject" id="subject" placeholder="Subject" />
    </div>
    <div class="input__holder">
        <textarea class="input--textarea" name="message" id="message" placeholder="Your message" />
    </div>
</form>
```

------

# Grid system #

## Config ##

__Breakpoints__

The media query [config](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/_media.scss) can be found in the [vars](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/) folder, called `_media.scss`. Here you can configure the breakpoints to fit your needs.

This are the default breakpoints. You can add or change them to suit your needs. When adding them to your grid config the grid will be automatically generated.

Breakpoint    | Viewport width
------------- | -------------
`small`       | `480px`
`medium`      | `768px`
`large`       | `1024px`
`extra-large` | `1200px`


__Grid__

The grid [config](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/_config.scss) can be found in the [vars](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/) folder. Here you can configure the breakpoints, gutters and max-width for the container and grid.

You can also add extra breakpoints or change the prefix in the `$grid-breakpoints` var.

__note__ The difference between mobile first true and false is that when it is true it will use `min-width` if it's false it will use `max-width`.


__Original__

```
$grid-breakpoints   : ( 'sm': $breakpoint-small,
                        'md': $breakpoint-medium,
                        'lg': $breakpoint-large );
```

__Added breakpoints__

This example will add a new breakpoint called extra large. By default the extra large breakpoint is `1200px`.

```
$grid-breakpoints   : ( 'sm': $breakpoint-small,
                        'md': $breakpoint-medium,
                        'lg': $breakpoint-large,
                        'xlg': $breakpoint-extra-large );
```


## Usage ##

The grid, whilst the naming conventions are bootstrap like, the usage is a bit different. It can be used as 100% fluid, or within a container. The container's max width is set in the global sass [config](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/_config.scss) `$container-config(max-width)`.


### Grid example ###

This example uses the mobile first grid. Meaning that everything is based off `min-width`.

__100% width__
```
<div class="grid-12">
    <div class="col-6 col-md-12">
        6 columns
        12 columns on tablet and up
    </div>
</div>
```


__with container__
```
<div class="container">
    <div class="grid-12">
        <div class="col-6 col-md-12">
            6 columns
            12 columns on tablet and up
        </div>
    </div>
</div>
```


### Column modifiers ###

Below are the modifier classes you can use to change the columns.

Option              | Description
-------------       | -------------
`col-{breakpoint}-*`  | Creates x amount of columns according to the given `breakpoint`
`push-*`             | Pushes element x amount of columns using `right`
`pull-*`              | Pulls element x amount of columns using `left`
`pre-*`              | Adds `margin-left` to element x amount of columns
`post-*`              | Adds `margin-right` to element x amount of columns

_* - amount of columns_

------
