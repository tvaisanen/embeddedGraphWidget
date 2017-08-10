/**
 * Created by toni on 19.7.2017.
 */

requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        components: "./components/",
        configuration: "./configuration/",
        lib: "./lib/",
        utils: "./utils/"
    }
});

require([
    "graphingwiki",
    "utils/cyInitUtils"
], function (graphingwiki, cyInitUtils) {
    'use strict';
    console.info("Starting the graphingwikiBrowser!");

    // jQuery is loadeed in index.html

    cyInitUtils.registerExtensions();
    graphingwiki.start();
});