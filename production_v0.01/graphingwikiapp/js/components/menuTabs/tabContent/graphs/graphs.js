

define([],
    function () {
        "use strict";

        /**
         * Component for controlling the preview box.
         * Responsible of rendering the page content and
         * graph data for previewing.
         * @exports previewController
         */

        /** @function renderGraphsContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function graphsContent(props) {
            /*
             * Implement graphs tab rendering here
             *
             * */
            try {

                var gwClient = props.gwClient;
                var classes = classNames.tab.graph;

                var div = document.createElement('div');
                var ul = document.createElement('ul');

                div.setAttribute('id', classes.container);

                // todo: implement via eventbus for loose coupling
                try {
                    var graphListPromise = gwClient.getGraphList();
                    graphListPromise.then(function (response) {
                        return response.json();

                    }).then(function (json) {
                        var graphs = json.data;
                        graphs.sort();

                        /* loop array of graphName strings and generate
                         * the list items for the panel */
                        graphs.forEach(function (graph) {
                            graphListItem({
                                cy: props.cy,
                                graphName: graph,
                                gwClient: gwClient,
                                listElement: ul
                            });
                        });
                    });
                } catch (error) {
                    console.warn(error);
                }


                div.appendChild(ul);
                console.groupEnd();
                return div;
            } catch (e) {
                console.group("Exception raised by ui.graphsContent()");
                console.warn(e);
                console.groupEnd();
                return document.createElement('div');
            }
        }

        return {
            render: graphsContent
        }
    });