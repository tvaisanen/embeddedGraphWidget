/**
 * Created by toni on 24.7.2017.
 */

define([
    "require",
    "lib/cola",
    "configuration/configs",
    "lib/cytoscape-context-menus",
    "lib/cytoscape",
    "lib/cytoscape-cola"
], function (require,
             cola,
             configs,
             contextMenus,
             cytoscape,
             cycola) {

    function init(props) {
        try {

            // var instance = cy.contextMenus();

            console.group("CyInitUtils!");

            console.debug('contextMenus');
            console.log(contextMenus);

            contextMenus(cytoscape, $);
            cycola(cytoscape, cola);


            console.debug("cola");
            console.log(cola);
            console.debug("cyto-cola");
            console.log(cycola);
            console.groupEnd();
            cy = cytoscape({
                    container: document.getElementById(configs.graphContainerId),
                    elements: props.data.elements,
                    style: props.data.style
                });

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

/*
 *         "../lib/jquery-3.2.1.min",
 "../lib/cytoscape",
 "../lib/cytoscape-context-menus",
 "../lib/cola",
 "../lib/cytoscape-cola"*/