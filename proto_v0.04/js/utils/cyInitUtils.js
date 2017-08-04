/**
 * Created by toni on 24.7.2017.
 */

define([
    "require",
    "components/contextMenuItems",
    "lib/cola",
    "configuration/configs",
    "lib/cytoscape-context-menus",
    "lib/cytoscape",
    "lib/cytoscape-cola"
], function (require,
             contextMenuItems,
             cola,
             configs,
             contextMenus,
             cytoscape,
             cycola) {

    function init(props) {
        try {

            // var instance = cy.contextMenus();

            // register extensions
            contextMenus(cytoscape, $);
            cycola(cytoscape, cola);

            // initialize new cy instance
            cy = cytoscape({
                    container: document.getElementById(configs.graphContainerId),
                    elements: props.data.elements,
                    style: props.data.style,
                    layout: {
                        name: "preset"
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

    return {
        init: init
    }
});

