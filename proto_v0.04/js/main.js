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
    "./configuration/configs",
    "./graphingwiki",
    "utils/cyInitUtils"
], function (configs, graphingwiki, cyInitUtils) {
    'use strict';
    console.info("Starting the graphingwikiBrowser!");
    var defined = ["configs", "graphingwikiBrowser", "jquery"];
    console.groupCollapsed("App.defined:");
    console.debug("configs: " + typeof configs);
    console.debug("cytoscape: " + typeof cytoscape);
    console.debug("graphingwikiBrowser: " + typeof graphingwikiBrowser);
    console.info("%cjQuery is loadeed in index.html", "color:blue;");
    console.debug("jquery: " + typeof $);
    console.info("defined:" + defined.join(", "));
    console.groupEnd();
    cyInitUtils.registerExtensions();
    graphingwiki.start(configs);
});