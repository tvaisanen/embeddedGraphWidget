requirejs.config({
    //By default load any module IDs from js/lib

    /* development */

    baseUrl: 'graphingwikiapp/js/',
    paths: {
        components: "components/",
        configuration: "configuration/",
        lib: "lib/",
        utils: "utils/"
    }


});


require([
    "lib/jquery",
    "graphingwiki",
    "utils/cyInitUtils",
    "configuration/configs"
], function ($, graphingwiki, cyInitUtils, configs) {
    'use strict';
    console.info("Starting the graphingwikiBrowser!");
    configs.API_PATH = "http://localhost/collab:8443/";
    cyInitUtils.registerExtensions();
    graphingwiki.start();
});