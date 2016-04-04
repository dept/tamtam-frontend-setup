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
6.  [HTML Templating - Nunjucks](#markdown-header-html-templating-nunjucks)
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
It enables you to quickly & easily setup your project and get it running in no time.
Many things are already predefined, added and sorted out for you to take away some hassle.
The pro users can dive into settings an tasks, but that's not required to work with it.


You're always welcome to change settings and reorder things around the project,
as long as you keep the folder structure as is. 
This way other developers can get their head around your code and your folder won't become a maze.


The setup is always in progress so if you're having an idea or thought, please share it.
[See the current list of open tickets and add your own on Jira](https://tamtam.atlassian.net/secure/RapidBoard.jspa?rapidView=187&view=planning). 
When you're in to optimising code, add a feature or any code whatsoever, please do so and get a pull request.

We're in this together, as a group of frontend developers.
So let's make this setup as best as we can so every project is setup in no time !


**Team responsible for this setup:**

* Simon Colijn ( [simon@tamtam.nl](mailto:simon@tamtam.nl) )
* Adrian Klingen ( [adrian@tamtam.nl](mailto:adrian@tamtam.nl) )
* Geert Fokke ( [geert@tamtam.nl](mailto:geert@tamtam.nl) )
* All frontend developers within TamTam ( [frontend@tamtam.nl](mailto:frontend@tamtam.nl) )

------

# Install #
Use the setup following these commands.

__1. Install all the npm modules__

`npm install`

__2. Optional: Install bower modules you need__

(though this will usually be picked up automatically by the `npm postinstall` script)

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
> (builds and pushes the files to the backend environment)

only necessary if the project is not setup with bamboo.

__gulp__ server 
> (build including live server)



**Available process arguments**

__--clean__
> (when running the build task, it will remove all content of the build folder first)

__--debug__
> (will log a lot information about processes, very useful for when debugging gulp issues)



## Config ##
The gulpfile.js has two main files: `config.js` and `index.js`.

The `config.js` contains all the paths the tasks rely on. You can change them to suit your needs.

The `index.js` file is where all the tasks are defined. Here you can enable certain config variables individually for each task.

For example, turn minifying on when running the bamboo task.

In the `index.js` you will also find 2 other important settings at the top.

- First the `config.copy` setting, here you can define assets that need to be copied to a specific build folder

- Second: the `config.libs` setting, here you can list JavaScript libraries that will be concatted to a simple libs.js. This is useful for dependencies that are incompatible with commonJS.



------

# Folder Structure #

>## Source ##

>>### Assets ###
>>Contains all your project assets such as fonts, images and SVG files.
>>
>>Which ones will be copied to the build folder, and where eactly, you can define in the `config.copy` settings.

>>### Data ###
>>JSON data which is available for your Nunjucks templating.

>>### HTML ###
>>Modular setup of the HTML files.
>>
>>In the root of the folder, the pages are set.
>>
>>Folders are used for **elements**, **layout** and **modules**.

>>The **_dev** folder is used for development / debug purpose and there's no real need to edit this. These files are not used in the real project, but only during local development.


>>### Javascript ###
>>CommonJS setup with various examples to explain how to use, export and reuse the modules.
>>
>>### SASS ###
>>Folder which contains all SASS and related files, e.g. configs, mixins and extends.
>>
>>Files can be rearranged as needed, as long as the main folder structure stays intact.
>>
>>The **_dev** folder is - *again* - just being used in local development. All other folders and files are split and sorted into elements, layout, modules and utils.

>## Build and Dist ##
>There is no difference anymore, just a single build folder for the output. You can use the `gulp dist` task to specify a specific output to push the files into the BackEnd folder. However if your project is setup with Bamboo, this will not be necessary.
>If you want to test something that for example is minified, just change your settings in the `index.js` and restart gulp.

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

JSON data is a good way to make your life easier whilst developing with Nunjucks. This way you can create complete forms just by reading a json object. 

The JSON [folder](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/data/) can be found in the `source` folder.


All of the JSON data found in that folder will be merged into the context of the templates. If you are unsure which data is available inside your template you can use the `debug` tag to print out all of the available data.

#### Debug ####
```
{% debug %}
```
This will inject an HTML formatted string containing all of the available data inside the current template.


#### JSON Data example ####

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

Following are the default breakpoints. You can add or change them to suit your needs. When adding them to your grid config the grid will be automatically generated.

Breakpoint    | Viewport width
------------- | -------------
`small`       | `480px`
`medium`      | `768px`
`large`       | `1024px`
`extra-large` | `1200px`


__Grid__

The grid [config](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/_grid.scss) can be found in the [vars](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/) folder. Here you can configure the breakpoints, gutters and max-width for the container and grid.

You can also add extra breakpoints or change the prefix in the `$grid-breakpoints` var.

__note:__ The difference between mobile first true and false is that when it is true it will use `min-width` if it's false it will use `max-width`.


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

The grid, whilst the naming conventions are bootstrap like, is a bit different in use. 

It can be used as 100% fluid, or within a container. The container's max width is set in the global sass [config](https://bitbucket.org/tamtam-nl/tamtam-frontend-setup/src/develop/source/sass/utils/vars/_grid_.scss) `$container-config(max-width)`.

__Note that when you change the number of columns, the class name of the grid changes as well. `grid-12` means this is a grid of 12 columns. So when you change the number of columns to f.e. 5, the grid's class name becomes: `grid-5`.
It is also possible to create multiple grids, instead of a single map assigned to the `$grid-config`, simply assign a list of multiple maps.__

__columns__
 
Use column classes to define the columns width. There is a default class you can use such as `col-12` or `col-6`. This will set the width to 12 -or- 6 columns wide.

You can override this at breakpoints by using the modifier classes such as `col-md-6`, here the column will switch to 6 columns width when this breakpoint is reached.

How wide a `col-6` actually is depends on the grid. If the `col-6` is inside of a `grid-12` it will be 50% wide. But if it were inside of a `grid-6` it would be 100% wide.


### Grid example ###

This example uses the mobile first grid. Meaning that everything is based off `min-width`.

__100% width__
```
<div class="grid-12">
    <div class="col-6 col-md-12">
        6 columns as the default
        12 columns on tablet and up
    </div>
</div>
```


__with container__
```
<div class="container">
    <div class="grid-12">
        <div class="col-6 col-md-12">
            6 columns as the default
            12 columns on tablet and up
        </div>
    </div>
</div>
```


### Column modifiers ###

Below are the modifier classes you can use to change the columns.

Option                                      | Description
--------------                              | -------------
`col-{breakpoint}-*`                        | Creates x amount of columns according to the given `breakpoint`
`push-*` -or-<br/> `push-{breakpoint}-*`    | Pushes element x amount of columns using `right`
`pull-*` -or-<br/> `pull-{breakpoint}-*`    | Pulls element x amount of columns using `left`
`pre-*`  -or-<br/> `pre-{breakpoint}-*`     | Adds `margin-left` to element x amount of columns
`post-*`  -or-<br/> `post-{breakpoint}-*`   | Adds `margin-right` to element x amount of columns

_* - amount of columns_

------
