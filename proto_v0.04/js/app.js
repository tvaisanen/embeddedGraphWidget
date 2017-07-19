/**
 * Created by toni on 19.7.2017.
 */

define([
        "./configuration/configs",
        "./graphingwikiBrowser"
        ], function (configs, graphingwikiBrowser) {


    return {
        start: function () {
            console.debug("starting the app!");
            graphingwikiBrowser.start(configs);
        }
    }
});