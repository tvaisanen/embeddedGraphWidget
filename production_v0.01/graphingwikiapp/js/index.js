requirejs.config({
    //By default load any module IDs from js/lib

    /* development */
    /*
    baseUrl: 'graphingwikiapp/js/',
    paths: {
        components: "components/",
        configuration: "configuration/",
        lib: "lib/",
        utils: "utils/"
    }
*/
    /* production */

    paths: {
        components: "graphingwikiapp/js/components/",
        configuration: "graphingwikiapp/js/configuration/",
        lib: "graphingwikiapp/js/lib/",
        utils: "graphingwikiapp/js/utils/",
    }

});


require([
    "lib/jquery",
    "graphingwiki",
    "utils/cyInitUtils"
], function ($, graphingwiki, cyInitUtils) {
    'use strict';
    console.info("Starting the graphingwikiBrowser!");

    // jQuery is loadeed in index.html
    console.log('built');


    console.info(requirejs.config({}));

    cyInitUtils.registerExtensions();
    graphingwiki.start();
});