function ServiceWorkerInit() {

    if ('serviceWorker' in navigator) {

        window.addEventListener('load', function () {

            navigator.serviceWorker.register('/sw.js').then(function(reg){
                console.log(`Serviceworker - Registration succeeded. Scope is ${reg.scope}`);
            }).catch(function(err){
                console.error(`Serviceworker - Registration failed with error ${err}`);
            });

        });

    }

}

export default ServiceWorkerInit();
