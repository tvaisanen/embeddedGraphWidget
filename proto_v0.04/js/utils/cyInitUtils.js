/**
 * Created by toni on 24.7.2017.
 */

define([
        "require",
        "../dependencies/jquery-3.2.1.min",
        "../dependencies/cytoscape",
        "../dependencies/cytoscape-context-menus",
        "../dependencies/cola",
        "../dependencies/cytoscape-cola"
], function (require, cytoscape) {

        function init(props) {
            try {

                var jquery = require("../dependencies/jquery-3.2.1.min");
                var contextMenus = require("../dependencies/cytoscape-context-menus");

                // contextMenus( cytoscape, jquery);
                // var instance = cy.contextMenus();

                // console.log("CyInitUtils!");
                // console.log(require);
                // console.log(jquery);
                // console.log(cytoscape);






            } catch (e) {
                console.group("Exception raised by utils.cyInitUtils.init()");
                console.warn(e);
                console.group();
            }
        }

        return {
            init: init
        }
    });

/*
*         "../dependencies/jquery-3.2.1.min",
        "../dependencies/cytoscape",
        "../dependencies/cytoscape-context-menus",
        "../dependencies/cola",
        "../dependencies/cytoscape-cola"*/