function ServiceWorkerInit() {

    if ('serviceWorker' in navigator) {

        window.addEventListener('load', function () {

            try {

                navigator.serviceWorker.register('/sw.js');

            } catch (e) {

                console.warn('Serviceworker - Could not find the serviceworker', e);

            }

        });

    }

}

export default ServiceWorkerInit();