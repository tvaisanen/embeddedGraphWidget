/**
 * Created by toni on 19.7.2017.
 */

define([
        "../dependencies/cytoscape",
        "../configuration/configs",
        "../components/elementStyles",
        "../utils/gwClient",
        "../utils/edgeCategories",
        "../components/ui",
        "../utils/cyInitUtils"
    ],
    function (
        cytoscape,
        configs,
        elementStyles,
        gwClient,
        edgeCategories,
        ui,
        cyInitUtils) {
        /**
         * Wrapper for cytoscape.
         * @exports graphUtils
         */

        // active graph instance
        var cy;


        /**
         *  @function
         *  @name elementHasCategoryClass
         *  @description Check if the given element has bee assigned with existing category style classes.
         *  @param {Object} props
         *  @param {Element} props.element Cytoscape element.
         *  @param {Array} props.categories Array of category names.
         *  @return {Boolean} True if element have assigned classes.
         */
        function elementHasCategoryClass(props) {
            try {
                var found = props.categories.some(function (c) {
                    return props.element.hasClass(c);
                });
                return found;


            } catch (e) {
                console.groupCollapsed("Exception raised by graphingwikiBrowser.elementHasCategoryClass()");
                console.warn(e);
                console.info("Parameters passed:");
                console.info("element:");
                console.info(element);
                console.groupEnd();
            }
        }

        /** @function addClassToEdge
         *  Todo: Decide what to do with this.
         *  @param {String} edgeId- Id of the edge.
         *  @param {String} classForEdge - Style category for the edge.
         */
        function addClassToEdge(props, edgeId, classToAdd) {
            /**
             * Is this really necessary? Seems like
             * unnecessary complexity...
             *
             * */


                // todo: refactor to props
            var categories = configs.tabs.styles.categories;

            try {
                // Get element reference to the edge with edgeId.
                var edge = props.cy.getElementById(props.edgeId);

                // Check if the edge does not have a category set.
                var edgeDoesNotHaveAnyCategory = elementHasCategoryClass(edge, categories);


                /*
                 * If element edgeId has class '_notype' (= edgeDoesNotHaveCategory)
                 * and current class classToAdd is not '_notype'. Remove the '_notype'
                 * and replace it with the classToAdd. If the edge does not have class
                 * defined yet, set class as classToAdd. Even if it is '_notype'
                 *
                 * Get classes from graphingwikiBrowser.props.categoryStyles.
                 * -> assign each appropriate style for edge
                 */


                if (classToAdd != '_notype') {
                    // Therefore, the '_notype' class is removed.
                    if (edge.hasClass('_notype')) {
                        edge.removeClass('_notype');
                    }
                    edge.addClass(props.category);
                } else if (!edgeDoesNotHaveAnyCategory) {
                    edge.addClass(props.category);
                }
                // Add the class for the edge.
            } catch (e) {
                console.groupCollapsed("Exception raised by addClassToEdge()");
                console.info("Parameters passed:");
                console.info(props);
                console.warn(e);
                console.groupEnd();
            }
        }

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
            console.log(props);
            try {
                var gw = props.gwClient;
                var nodeId = props.nodeId;
                cy = props.cy;

                console.debug("expandNode()");
                console.debug(props);

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

                        console.debug("expandNode().node");
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
                                    // get list of nodes where the clicked node is connected t
                                    var nodesConnectedTo = node.out[category];

                                    // for each connected node create a new edge
                                    createEdgesToNodes({
                                        sourceNodeId: nodeId,
                                        nodesToCreateEdges: nodesConnectedTo,
                                        category: category,
                                        cy: cy,
                                        configs: props.configs,
                                        elementStyles: props.elementStyles
                                    });
                                });
                            } catch (e) {
                                console.group("Exception raised by graphUtilsExpandNode()");
                                console.warn(e);
                                console.groupEnd();
                            }
                            var newCategoriesIn = Object.keys(node.in);
                            categoriesToUpdate = edgeCategories.get();
                            edgeCategories.update({
                                newCategories: newCategoriesIn
                            });

                            // Iterate the incoming edge categories.
                            newCategoriesIn.forEach(function (category) {
                                var nodesConnectedTo = node.in[category];
                                createEdgesFromNodes({
                                    targetNodeId: nodeId,
                                    nodesFromCreateEdges: nodesConnectedTo,
                                    category: category,
                                    cy: cy
                                });
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
            props.nodesToCreateEdges.forEach(function (targetNodeId) {
                try {
                    if (targetNodeId === 'undefined') {
                        console.warn("graphUtils.createEdgesToNodes() is trying to create edge to undefined node!");
                        console.debug(props);
                    } else {
                        createNodesAndEdgeBetween({
                            sourceNodeId: props.sourceNodeId,
                            targetNodeId: targetNodeId,
                            category: props.category,
                            cy: props.cy,
                            elementStyles: props.elementStyles
                        });
                    }

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
            var sourceType = typeof sourceNodeId;
            var targetType = typeof targetNodeId;

            if (sourceType === 'undefined' || targetType === 'undefined') {
                console.debug("Exception raised by createEdgeId()");
                console.debug("called by: " + arguments.callee.caller.name);
                throw TypeError('createEdgeId() called with undefined node id');
            } else {
                return sourceNodeId + "_to_" + targetNodeId;
            }
        }

        /** @function createNewEdge
         *  Description
         *  @param {String} sourceId - Id of the source node.
         *  @param {String} targetId - Id of the target node.
         *  @param {String} classForEdge - Selector for assigning style.
         *  @param {Object} cy - Cytoscape instance.
         *  @return {Object} The new edge element.
         */
        function createNewEdge(props) {

            try {
                var edgeId = createEdgeId(
                    props.sourceNodeId,
                    props.targetNodeId
                );
                // Create new edge.
                var newEdge = {
                    group: 'edges',
                    data: {
                        id: edgeId,
                        source: props.sourceNodeId,
                        target: props.targetNodeId
                    }
                };

                // If edge is already defined, return the existing one.
                if (edgeExists(edgeId, props.cy)) {
                    return props.cy.getElementById(edgeId);

                } else {

                    props.cy.add(newEdge);
                    var edge = props.cy.getElementById(edgeId);

                    var categoryExists = elementStyles.categoryExists(props.category);

                    // console.debug(elementStyles);
                    // console.debug(categoryExists);
                    var classesToAdd = elementStyles.getStyle(props.category);
                    if (!classesToAdd) {
                        console.debug('Add generic styles');
                        classesToAdd = elementStyles.getStyle();
                    } else {
                        // console.debug('Add ' + props.category + ' styles.');
                    }

                    // Add the new edge to cy.elements.

                    // console.debug(classesToAdd);

                    classesToAdd.forEach(function (styleClass) {
                        //console.debug('add style: ' + styleClass);
                        edge.addClass(styleClass);
                    });
                    return edge;
                }

            } catch (e) {
                console.groupCollapsed("Exception raised by createNewEdge()");
                console.debug("called by: " + arguments.callee.caller.name);
                console.info("Parameters passed:");
                console.info(props);
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

            if (typeof id === 'undefined') {
                console.debug("Exception raised by createNewNode()");
                throw TypeError("createNewNode() called with undefined id");
            }

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

                // If nodes do not exist, create them.
                // nodeIdAvailable: true === node do not exist.

                nodeIdAvailable(props.sourceNodeId, props.cy) ?
                    createNewNode(props.sourceNodeId, props.cy) : null;

                nodeIdAvailable(props.targetNodeId, props.cy) ?
                    createNewNode(props.targetNodeId, props.cy) : null;

                // createNewEdge checks if the edge already exists.
                createNewEdge(props);


                var edgeId = createEdgeId(
                    props.sourceNodeId,
                    props.targetNodeId
                );
                /*
                 console.group("Debugging edge creation!");
                 console.debug("sourceNodeId: " + props.sourceNodeId);
                 console.debug("sourceNodeId: " + props.targetNodeId);
                 if (typeof props.targetNodeId === 'undefined'){
                 console.log("%cHere's the problem", "color:red;");
                 console.debug(props);

                 }
                 console.debug(props);
                 console.debug(edgeId);
                 console.groupEnd();
                 */
                addClassToEdge({
                    edgeId: edgeId,
                    category: props.category,
                    cy: props.cy
                });

            } catch (e) {
                console.groupCollapsed("Exception with createNodesAndEdgeBetween()");
                console.info("Parameters passed:");
                console.debug(props);
                console.warn(e);
                console.groupEnd();
            }

        }

        /** @function createEdgesFromNodes
         *  Description
         *  @param {String} sourceNodeId- Id of the source node.
         *  @param {Array} nodesToCreateEdges - Array of nodes?.
         *  @param {String} category - Category for edges.
         */
        function createEdgesFromNodes(props) {
            /*
             * Iterate through the nodesFromCreateEdges array and add
             * edges between the source node and target nodes.
             * If nodes do not exist, create them and add to cy.elements.
             */

            props.nodesFromCreateEdges.forEach(function (sourceNodeId) {
                props.sourceNodeId = sourceNodeId;
                createNodesAndEdgeBetween(props);
            });
        }

        /**
         *
         * @param evt
         */
        function bindExpandNode(evt) {
            console.debug('debugging bindExpandNodE()');
            try {
                var node = evt.target;
                var nodeId = node.id();
                expandNode({
                    nodeId: nodeId,
                    cy: cy,
                    gwClient: gwClient,
                    edgeCategories: edgeCategories,
                    elementStyles: elementStyles
                });
                ui.updateTabs({
                    cy: cy
                });
            } catch (e) {
                console.group("Exception raised by graphUtils.bindExpandNode()");
                console.warn(e);
                console.debug("props:");
                console.debug(evt);
                console.groupEnd();
            }
        }

        function testCy(containerElement) {
            return cytoscape({
                container: containerElement,
                elements: [{group: 'nodes', data: {id: 'personA'}}],
                style: [ // the stylesheet for the graph
                    {
                        selector: 'node',
                        style: {
                            'background-color': '#6490af',
                            'size': '40',
                            'label': 'data(id)',
                            'content': 'data(id)',
                            'text-valign': 'center',
                            'color': 'white',
                            'text-outline-width': 1,
                            'text-outline-color': '#000000',
                            'background-color': '#9a9a9a'
                        }
                    },


                    {
                        selector: 'node.highlight',
                        style: {
                            'background-color': '#c50004',
                        }
                    },

                    {
                        selector: 'node.hover-on',
                        style: {
                            'background-color': '#00ff14',
                        }
                    },

                    {
                        selector: 'edge',
                        style: {
                            'line-color': '#ccc',
                            'target-arrow-color': '#000000',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                            'overlay-padding': 1
                        }
                    },
                    {
                        selector: 'edge.mouse-over',
                        style: {label: 'category'}
                    },

                    // Todo: generate these from config! priority: low

                    {selector: 'edge.line-style-solid', style: {'line-style': 'solid'}},
                    {selector: 'edge.line-style-dotted', style: {'line-style': 'dotted'}},
                    {selector: 'edge.line-style-dashed', style: {'line-style': 'dashed'}},

                    {selector: 'edge.line-width-0', style: {'line-width': 0}},
                    {selector: 'edge.line-width-1', style: {'line-width': 1}},
                    {selector: 'edge.line-width-2', style: {'line-width': 2}},
                    {selector: 'edge.line-width-3', style: {'line-width': 3}},
                    {selector: 'edge.line-width-4', style: {'line-width': 4}},
                    {selector: 'edge.line-width-5', style: {'line-width': 5}},
                    {selector: 'edge.line-width-6', style: {'line-width': 6}},
                    {selector: 'edge.line-width-7', style: {'line-width': 7}},
                    {selector: 'edge.line-width-8', style: {'line-width': 8}},
                    {selector: 'edge.line-width-9', style: {'line-width': 9}},
                    {selector: 'edge.line-width-10', style: {'line-width': 10}},
                    {selector: 'edge.line-width-11', style: {'line-width': 11}},
                    {selector: 'edge.line-width-12', style: {'line-width': 12}},
                    {selector: 'edge.line-width-13', style: {'line-width': 13}},
                    {selector: 'edge.line-width-14', style: {'line-width': 14}},
                    {selector: 'edge.line-width-15', style: {'line-width': 15}},
                    {selector: 'edge.line-width-16', style: {'line-width': 16}},
                    {selector: 'edge.line-width-17', style: {'line-width': 17}},
                    {selector: 'edge.line-width-18', style: {'line-width': 18}},
                    {selector: 'edge.line-width-19', style: {'line-width': 19}},
                    {selector: 'edge.line-width-20', style: {'line-width': 20}},
                    {selector: 'edge.line-width-21', style: {'line-width': 21}},
                    {selector: 'edge.line-width-22', style: {'line-width': 22}},
                    {selector: 'edge.line-width-23', style: {'line-width': 23}},
                    {selector: 'edge.line-width-24', style: {'line-width': 24}},
                    {selector: 'edge.line-width-25', style: {'line-width': 25}},
                    {selector: 'edge.line-width-26', style: {'line-width': 26}},
                    {selector: 'edge.line-width-27', style: {'line-width': 27}},
                    {selector: 'edge.line-width-28', style: {'line-width': 28}},
                    {selector: 'edge.line-width-29', style: {'line-width': 29}},
                    {selector: 'edge.line-width-30', style: {'width': 30}},

                    {selector: 'edge.arrow-shape-tee', style: {'target-arrow-shape': 'tee'}},
                    {selector: 'edge.arrow-shape-triangle', style: {'target-arrow-shape': 'triangle'}},
                    {selector: 'edge.arrow-shape-triangle-tee', style: {'target-arrow-shape': 'triangle-tee'}},
                    {selector: 'edge.arrow-shape-triangle-cross', style: {'target-arrow-shape': 'triangle-cross'}},
                    {
                        selector: 'edge.arrow-shape-triangle-backcurve',
                        style: {'target-arrow-shape': 'triangle-backcurve'}
                    },
                    {selector: 'edge.arrow-shape-square', style: {'target-arrow-shape': 'square'}},
                    {selector: 'edge.arrow-shape-circle', style: {'target-arrow-shape': 'circle'}},
                    {selector: 'edge.arrow-shape-diamond', style: {'target-arrow-shape': 'diamond'}},
                    {selector: 'edge.arrow-shape-none', style: {'target-arrow-shape': 'none'}},

                    {selector: 'edge.line-color-grey', style: {'line-color': 'grey', 'arrow-color': 'grey'}},
                    {selector: 'edge.line-color-black', style: {'line-color': 'black', 'arrow-color': 'black'}},
                    {selector: 'edge.line-color-red', style: {'line-color': 'red', 'arrow-color': 'red'}},
                    {selector: 'edge.line-color-green', style: {'line-color': 'green', 'arrow-color': 'green'}},
                    {selector: 'edge.line-color-orange', style: {'line-color': 'orange', 'arrow-color': 'orange'}},
                    {selector: 'edge.line-color-yellow', style: {'line-color': 'yellow', 'arrow-color': 'yellow'}},
                    {selector: 'edge.line-color-cyan', style: {'line-color': 'cyan', 'arrow-color': 'cyan'}},
                    {selector: 'edge.line-color-blue', style: {'line-color': 'blue', 'arrow-color': 'blue'}},


                    {
                        selector: 'edge.hover-on',
                        style: {
                            'width': 5,
                            'line-color': '#cc7500',
                            'line-style': 'dashed',
                            'target-arrow-color': '#000000',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                        }
                    },

                    {
                        selector: 'edge.highlight',
                        style: {
                            'width': 5,
                            'line-color': '#cc7500',
                            'line-style': 'dashed',
                            'target-arrow-color': '#000000',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                        }
                    }
                ]
            });
        }

        /** @function initCytoscape
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function initCytoscape(props) {
            /*
             *   Return <div id="cy">
             *   Initialize empty Cytoscape graph
             *
             * */
            cyInitUtils.init();
            _cy = testCy(props.container);
            _cy.on('tap', 'node', bindExpandNode);

            // initialize the context menu plugin
            // cy.contextMenus(initCyContextMenu(cy));
            cy = _cy;
            return cy;
        }

        return {
            createEdgesFromNodes: createEdgesFromNodes,
            createEdgesToNodes: createEdgesToNodes,
            createEdgeId: createEdgeId,
            createNewEdge: createNewEdge,
            createNewNode: createNewNode,
            createNodesAndEdgeBetween: createNodesAndEdgeBetween,
            edgeExists: edgeExists,
            elementHasCategoryClass: elementHasCategoryClass,
            expandNode: expandNode,
            cy: function () {
                return cy;
            },
            nodeIdAvailable: nodeIdAvailable,
            initCy: initCytoscape,
            testCy: testCy
        }


    });