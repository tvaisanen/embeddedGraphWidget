/**
 * Created by toni on 19.7.2017.
 */

define(["./gwClient"], function (gwClient) {

    var initialState = {
        header: "GraphingWikiBrowser Prototype v0.03",
        appContainerId: "app-container",
        contentContainerId: "content-container",
        graphContainerId: "cy",
        gw: gwClient,

        tabs: {
            graphs: {
                label: "Graphs",
                active: true,
                graphs: [
                    'graph1',
                    'graph2'
                ]
            },
            elements: {
                filter: "",
                label: "Elements",
                active: false,
                data: "Data for elements"
            },
            styles: {
                label: "Styles",
                active: false,
                categories: []
            }
        }
    };

    var props;

    /** @function setProps
     *  Description
     *  @param {Object} variable - Desc.
     *  @return {Type} desc.
     */
    function setProps(updatedProps, selector) {
        /**
         * Update props
         *
         */

        if (selector === "all") {
            props = updatedProps;
        } else {
            props[selector] = updatedProps;
        }
    }

    return {
        start: function () {
            console.debug("starting the app!");
            setProps(initialState, "all");
            console.debug(props);
        }
    }
});