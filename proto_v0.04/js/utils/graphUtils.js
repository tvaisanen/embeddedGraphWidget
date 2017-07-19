/**
 * Created by toni on 19.7.2017.
 */

define([], function () {

        /** @function setAndRunLayout
     *  Description
     *  @param {Object} variable - Desc.
     *  @return {Type} desc.
     */
    function setAndRunLayout(cy) {
        var layout = cy.makeLayout({name: "circle"});
        //var layout = cy.makeLayout({name: "cola"});
        layout.run();
    }

    /** @function expandNode
     *  Description
     *  @param {String} nodeId - Id of the node to expand.
     *  @param {Object} cy - Cytoscape instance.
     *
     */
    function expandNode(props) {

        try {
            var gw = props.gwClient;
            var cy = props.cy;
            var nodeId = props.nodeId

            //Get data for the clicked node.
            var nodePromise = gw.getNodeData(nodeId);

            nodePromise.then(function (response) {
                return response.json();
            }).then(function (json) {
                    /*
                     *  node = {
                     *      in: Object,
                     *      out: Object,
                     *      meta: Object
                     *  }
                     * */
                    var node = json.data;

                    console.debug(node);

                    try {
                        // If node has outgoing edges refresh the categories
                        var nodeHasOutgoingEdges = (node.out != 'undefined');
                        var newCategoriesOut = [];

                        if (nodeHasOutgoingEdges) {
                            try {
                                newCategoriesOut = Object.keys(node.out);
                                var categoriesToUpdate = props.getEdgeCategories();
                                updateCategories(newCategoriesOut, categoriesToUpdate);
                            } catch (e) {
                                console.groupCollapsed("Exception raised while updating categories in expandNode()");
                                console.warn(e);
                                console.info("%cNode", "color:red;");
                                console.info(node);
                                console.groupEnd();
                            }
                        }

                        // Iterate the outgoing edge categories.
                        try {
                            newCategoriesOut.forEach(function (category) {

                                console.debug(category);

                                // get list of nodes where the clicked node is connected t
                                var nodesConnectedTo = node.out[category];

                                // for each connected node create a new edge
                                createEdgesToNodes({
                                    sourceNodeId:nodeId,
                                    nodesToCreateEdges:nodesConnectedTo,
                                    category:category,
                                    cy:cy
                                });

                            });
                        } catch (e) {
                            console.warn("Exception raised by graphUtilsExpandNode()");
                            console.warn(e);
                        }
                        var newCategoriesIn = Object.keys(node.in);
                        categoriesToUpdate = props.getEdgeCategories();
                        updateCategories(newCategoriesIn, categoriesToUpdate);

                        // Iterate the incoming edge categories.
                        newCategoriesIn.forEach(function (category) {
                            var nodesConnectedTo = node.in[category];
                            createEdgesFromNodes(nodeId, nodesConnectedTo, category, cy);
                        });
                    } catch (e) {
                        console.groupCollapsed("Exception raised by expandNode()");
                        console.warn(e);
                        console.groupEnd();
                    }
                    setAndRunLayout(props.cy);


                }
            );
        } catch (e) {
            console.group("Exception raised by graphUtils.expandNode()");
            console.warn(e);
            console.groupEnd();
            console.groupEnd();
        }
    }

    /** @function createNodesAndEdgeBetween
     *  Description
     *  @param {String} sourceNodeId- Id of the source node.
     *  @param {Array} nodesToCreateEdges - Array of nodes?.
     *  @param {String} category - Category for edges.
     *  @param {Object} cy - Cytoscape instance.
     */
    function createEdgesToNodes(props) {

        /*
         * Iterate through the nodesToCreateEdges array and add
         * edges between the source node and target nodes.
         * If nodes do not exist, create them and add to cy.elements.
         */


        console.debug(props.category);

        props.nodesToCreateEdges.forEach(function (targetNodeId) {
            try {
                createNodesAndEdgeBetween({
                    sourceNodeId: props.sourceNodeId,
                    targetNodeId: targetNodeId,
                    category: props.category,
                    cy: props.cy
                });
            } catch (e) {
                console.groupCollapsed("Exception with createEdgesToNodes()");
                console.info("Parameters passed:");
                console.info("sourceNodeId: " + props.sourceNodeId);
                console.info("nodesToCreateEdges: " + props.nodesToCreateEdges);
                console.info("category: " + props.category);
                console.warn(e);
                console.groupEnd();
            }
        });
    }

        function createEdgeId(sourceNodeId, targetNodeId) {
        return sourceNodeId + "_to_" + targetNodeId;
    }

    /** @function createNodesAndEdgeBetween
     *  Creates edge between two nodes and if the nodes do not
     *  exist, these are also created.
     *  @param {String} sourceNodeId - Id of the source node.
     *  @param {String} targetNodeId - Id of the target node.
     *  @param {String} classForEdge - Style category for the edge.
     *  @param {Object} cy - Cytoscape instance.
     */
    function createNodesAndEdgeBetween(sourceNodeId, targetNodeId, category, cy) {
        try {

            // If nodes do not exist, create them.
            // nodeIdAvailable: true === node do not exist.
            nodeIdAvailable(props.sourceNodeId, props.cy) ?
                createNewNode(props.sourceNodeId, props.cy) : null;
            nodeIdAvailable(props.targetNodeId, props.cy) ?
                createNewNode(props.targetNodeId, props.cy) : null;

            // createNewEdge checks if the edge already exists.
            createNewEdge(sourceNodeId, targetNodeId, category, cy);

            var edgeId = createEdgeId(sourceNodeId, targetNodeId);
            addClassToEdge(edgeId, category, cy);

        } catch (e) {
            console.groupCollapsed("Exception with createNodesAndEdgeBetween()");
            console.info("Parameters passed:");
            console.info("sourceNodeId: " + sourceNodeId);
            console.info("targetNodeId: " + targetNodeId);
            console.info("classForEdge: " + classForEdge);
            console.warn(e);
            console.groupEnd();
        }

    }


    return {
        expandNode: expandNode
    }

});