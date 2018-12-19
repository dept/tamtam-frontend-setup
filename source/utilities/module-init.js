class ModuleInit {

    async(selector, moduleName, opt_arguments) {

        return new Promise(resolve => {

            const elements = this.findElements(selector);

            if (elements.length) {

                moduleName()
                    .then(constructor => {

                        const constructors = this.findElements(selector)
                            .map(element => this.loadConstructor(element, constructor.default, opt_arguments));

                        resolve(constructors);

                    });

            } else {

                resolve([]);

            }

        });

    }

    sync(selector, constructor, opt_arguments) {

        this.findElements(selector)
            .forEach(element => this.loadConstructor(element, constructor, opt_arguments));

    }

    loadConstructor(element, constructor, opt_arguments) {

        element._initializedModules = element._initializedModules || [];

        if (element._initializedModules.indexOf(constructor.name) === -1) {

            element._initializedModules.push(constructor.name);

            if (!opt_arguments) {
                if (typeof constructor === 'object') return constructor;
                return new constructor(element);
            }

            const constructorArguments = [null, element];
            Array.prototype.push.apply(constructorArguments, opt_arguments);

            return new (constructor.bind.apply(constructor, constructorArguments))();

        }
    }

    findElements(selector) {

        return [...document.querySelectorAll(selector)];

    }

}

// IE polyfill for constructor.name
(function () {
    if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
        Object.defineProperty(Function.prototype, 'name', {
            get() {
                const funcNameRegex = /function\s([^(]{1,})\(/;
                const results = (funcNameRegex).exec((this).toString());
                return (results && results.length > 1) ? results[1].trim() : '';
            },
            set() {
                // Empty function to prevent set is not a function
            }
        });
    }
})();

// Export the module init function
export default new ModuleInit();
