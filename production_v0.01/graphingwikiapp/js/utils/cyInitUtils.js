/**
 * Created by toni on 24.7.2017.
 */

define([
    "require",
    "lib/cola",
    "configuration/configs",
    "configuration/cyStyles",
    "lib/cytoscape-context-menus",
    "lib/cytoscape",
    "lib/cytoscape-cola",
    "utils/eventListeners"
], function (require,
             cola,
             configs,
             cyStyles,
             contextMenus,
             cytoscape,
             cycola) {

    function init(props) {
        console.group('cyInitUtils.init(props');
        console.debug(props);
        console.groupEnd();
        try {
            // initialize new cy instance
            // props.data.elements =  [{group: 'nodes', data: {id: 'FrontPage'}}];

            // use 'FrontPage' as default starting page if not provided.
            var pagename = props.pagename || "FrontPage";

            var cy = cytoscape({
                container: document.getElementById(configs.graphContainerId),
                elements: [{group: 'nodes', data: {id: pagename}}],
                style: cyStyles,
                layout: {
                    name: "cola"
                }
            });

            // initialize context menu items
            cy.contextMenus(props.contextMenuItems);

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

