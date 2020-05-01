console.log("Hi I'm live");
if (!('serviceWorker' in navigator)) {
    console.log(`Service Worker not supported!!`);
}

window.onload = () => {
    /**
     * 1. Registering SW.
     */
    navigator.serviceWorker.register('../serviceWorkerSite.js').then(res => {
        console.log(`Service Worker Registered...`, res);
    }).catch(error => {
        console.error(error);
    })
}
