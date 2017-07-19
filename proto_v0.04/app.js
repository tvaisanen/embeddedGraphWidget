/**
 * Created by toni on 19.7.2017.
 */

define([
        "./js/configuration/configs",
        "./utils/gwClient",
        "./graphingwikiBrowser"
        ], function (configs, gwClient, graphingwikiBrowser) {


    return {
        start: function () {
            console.debug("starting the app!");
            graphingwikiBrowser.start(configs);
        }
    }
});