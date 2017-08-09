/**
 * Created by toni on 24.7.2017.
 */

define([
    "require",
    "configuration/contextMenuItems",
    "lib/cola",
    "configuration/configs",
    "configuration/cyStyles",
    "lib/cytoscape-context-menus",
    "lib/cytoscape",
    "lib/cytoscape-cola",
    "utils/eventListeners"
], function (require,
             contextMenuItems,
             cola,
             configs,
             cyStyles,
             contextMenus,
             cytoscape,
             cycola) {

    function init(props) {
        try {
            // initialize new cy instance
            cy = cytoscape({
                container: document.getElementById(configs.graphContainerId),
                elements: props.data.elements,
                style: cyStyles,
                layout: {
                    name: "cola"
                }
            });

            // initialize context menu items
            cy.contextMenus(contextMenuItems);

            return cy;

        } catch (e) {
            console.group("Exception raised by utils.cyInitUtils.init()");
            console.warn(e);
            console.group();
        }
    }

    /**
     * @function
     * @name registerExtensions
     * @description Registers cytoscape extensions.
     * Used in main.js where the app is loaded.
     */
    function registerExtensions() {
        // register extensions
        contextMenus(cytoscape, $);
        cycola(cytoscape, cola);
    }

    return {
        init: init,
        registerExtensions: registerExtensions
    }
});

