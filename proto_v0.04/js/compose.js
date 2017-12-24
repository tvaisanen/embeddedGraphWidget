/**
 * Created by tvaisanen on 12/24/17.
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
    "components/dynamicListInput/nodeForm",
    "components/dynamicListInput/DynamicListInput",

], function (DynamicListInput) {
    'use strict';
    console.info("compose!");
    var c = document.querySelector('#container');
    var list = new DynamicListInput('id', 'label');
    c.appendChild(list.render());

});