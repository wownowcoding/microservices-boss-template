import config from "../../../config";
const { mapKey } = config;
const loadJs = (setSrc) => {
    return new Promise((resolve, reject) => {
        if (!!window.google) {
            resolve();
            return;
        }
        let script = document.createElement("script");
        const callbackFnName = "googleMapCallback";
        script.type = "text/javascript";
        script.onerror = () => {
            console.log("error");
            reject();
        };
        window[callbackFnName] = () => {
            console.log("map loaded");
            resolve();
        };
        let scriptSrc;
        if (setSrc && typeof setSrc === 'function') {
            scriptSrc = setSrc(mapKey, callbackFnName);
        }
        if (!scriptSrc) {
            scriptSrc = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places,geometry&callback=${callbackFnName}`;
        }
        script.src = scriptSrc;
        document.body.appendChild(script);
    });
};

export default loadJs;
