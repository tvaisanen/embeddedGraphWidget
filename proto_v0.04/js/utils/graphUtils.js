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

    /** @function nodeIdAvailable
     *  Check if a node of given id is already defined in the graph.
     *  @param {String} nodeId- Id of node.
     *  @return {Boolean} True if id is available for use, else False.
     */
    function nodeIdAvailable(nodeId, cy) {
        return !cy.getElementById(nodeId).isNode();
    }

    /** @function edgeExists
     *  Check if a node of given id is already defined in the graph.
     *  @param {String} edgeId - Id of edge.
     *  @return {Boolean} True if edge already defined, else False.
     */
    function edgeExists(edgeId, cy) {
        return cy.getElementById(edgeId).isEdge();
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
            var nodeId = props.nodeId;

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
                                var categoriesToUpdate = props.edgeCategories.get();
                                props.edgeCategories.update({
                                    newCategories: newCategoriesOut
                                });
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
                                    sourceNodeId: nodeId,
                                    nodesToCreateEdges: nodesConnectedTo,
                                    category: category,
                                    cy: cy,
                                    elementStyles: props.elementStyles,
                                });

                            });
                        } catch (e) {
                            console.group("Exception raised by graphUtilsExpandNode()");
                            console.warn(e);
                            console.groupEnd();
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
                    cy: props.cy,
                    elementStyles: props.elementStyles
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

    /** @function createNewEdge
     *  Description
     *  @param {String} sourceId - Id of the source node.
     *  @param {String} targetId - Id of the target node.
     *  @param {String} classForEdge - Selector for assigning style.
     *  @param {Object} cy - Cytoscape instance.
     *  @return {Object} The new edge element.
     */
    function createNewEdge(sourceId, targetId, classForEdge, cy, elementStyles) {

        try {
            var edgeId = sourceId + "_to_" + targetId;
            // Create new edge.
            var newEdge = {
                group: 'edges',
                data: {
                    id: edgeId,
                    source: sourceId,
                    target: targetId
                }
            };

            // If edge is already defined, return the existing one.
            if (edgeExists(edgeId, cy)) {
                return cy.getElementById(edgeId);

            } else {

                cy.add(newEdge);
                var edge = cy.getElementById(edgeId);
                var categoryExists = elementStyles.categoryExists(classForEdge);

                console.debug(elementStyles);
                console.debug(categoryExists);
                var classesToAdd = elementStyles.getStyle(classForEdge);
                if (!classesToAdd) {
                    console.debug('Add generic styles');
                    classesToAdd = elementStyles.getStyle();
                } else {
                    console.debug('Add ' + classForEdge + ' styles.');
                }

                // Add the new edge to cy.elements.

                console.debug(classesToAdd);

                classesToAdd.forEach(function (styleClass) {
                    console.debug('add style: ' + styleClass);
                    edge.addClass(styleClass);
                });
                return edge;
            }

        } catch (e) {
            console.groupCollapsed("Exception with createNewEdge()");
            console.info("Parameters passed:");
            console.info("sourceId: " + sourceId);
            console.info("targetId: " + targetId);
            console.info("classForEdge: " + classForEdge);
            console.info("styleClasses: " + JSON.stringify(elementStyles));
            console.warn(e);
            console.groupEnd();
        }

    }

    /** @function createNewNode
     *  Create new node and add it to the given cytoscape instance.
     *  @param {string} id - ID for the node.
     *  @param {Object} cy - Cytoscape instance
     * */
    function createNewNode(id, cy) {
        try {
            var newNode = {
                group: 'nodes',
                data: {
                    id: id
                }
            };

            // after saving page to moin
            // Can not create element with invalid string ID ``
            if (nodeIdAvailable(id, cy)) {
                cy.add(newNode);
                return true;
            } else {
                return false;
            }

        } catch (e) {
            console.groupCollapsed("Exception raised by graphingwikiBrowser.createNewNode(id)");
            console.warn(e);
            console.debug("Parameters passed:");
            console.debug("id:");
            console.debug(id);
            console.groupEnd();
            console.debug('returning false from second catch');

            return false;
        }
    }

    /** @function createNodesAndEdgeBetween
     *  Creates edge between two nodes and if the nodes do not
     *  exist, these are also created.
     *  @param {String} sourceNodeId - Id of the source node.
     *  @param {String} targetNodeId - Id of the target node.
     *  @param {String} classForEdge - Style category for the edge.
     *  @param {Object} cy - Cytoscape instance.
     */
    function createNodesAndEdgeBetween(props) {
        try {
            console.debug(props);
            // If nodes do not exist, create them.
            // nodeIdAvailable: true === node do not exist.
            nodeIdAvailable(props.sourceNodeId, props.cy) ?
                createNewNode(props.sourceNodeId, props.cy) : null;
            nodeIdAvailable(props.targetNodeId, props.cy) ?
                createNewNode(props.targetNodeId, props.cy) : null;

            // createNewEdge checks if the edge already exists.
            createNewEdge(
                props.sourceNodeId,
                props.targetNodeId,
                props.category,
                props.cy,
                props.elementStyles
            );

            var edgeId = createEdgeId(props.sourceNodeId, props.targetNodeId);
            addClassToEdge(edgeId, props.category, props.cy);

        } catch (e) {
            console.groupCollapsed("Exception with createNodesAndEdgeBetween()");
            console.info("Parameters passed:");
            console.debug(props);
            console.info("sourceNodeId: " + props.sourceNodeId);
            console.info("targetNodeId: " + props.targetNodeId);
            console.info("classForEdge: " + props.classForEdge);
            console.warn(e);
            console.groupEnd();
        }

    }


    return {
        expandNode: expandNode
    }


});