/**
 * Created by toni on 19.7.2017.
 */

define([

        "configuration/configs",
        "configuration/contextMenuItems",
        "components/elementStyles",
        "utils/gwClient",
        "utils/cyInitUtils"
    ],
    function (configs,
              contextMenuItems,
              elementStyles,
              gwClient,
              cyInitUtils) {
        /**
         * Wrapper for cytoscape.
         * @module graphUtils
         */

        // active graph instance
        var cy;
        var dispatch;

        /** @function
         *  @name addClassToEdge
         *  @description Add style class for edge.
         *  @param {Object} props
         *  @param {String} props.edgeId Id of the edge.
         *  @param {String} props.classForEdge Style category for the edge.
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
                return false;
            }
        }

        /**
         * @function
         * @name createEdgeId
         * @description Generate edge ID from source and target node IDs.
         * @param {Object} props
         * @param {String} props.sourceNodeId source node ID
         * @param {Array} props.nodesToCreateEdges target node IDs
         * @param {String} props.category category for edges
         * @param {Object} props.cy Cytoscape instance
         */
        function createEdgeId(props) {

            var sourceType = typeof props.sourceNodeId;
            var targetType = typeof props.targetNodeId;

            if (sourceType == 'undefined') {
                console.debug("source type undefined");
                //throw TypeError('createEdgeId() called with undefined node id');
            }

            if (targetType == 'undefined') {
                console.debug("source type undefined");
                //throw TypeError('createEdgeId() called with undefined node id');
            }

            return props.sourceNodeId + "_to_" + props.targetNodeId;

        }

        /**
         * @function
         * @name createEdgesFromNodes
         * @description Create edges to target node from every node of given array node. Todo: ATM cy is passed as a prop. Is this the way to go?
         * @param {Object} props
         * @param {Object} props.cy Cytoscape instance
         * @param {String} props.targetNodeId Id of the target node.
         * @param {Array} props.nodesFromCreateEdges Array of nodes to connect to the target node.
         * @param {String} props.category Category to add for edges. Edges are parsed in category batches. Hence, one category per array.
         * @example
         * createEdgesFromNodes({
         *          targetNodeId: "connectToThis",
         *          nodesFromCreateEdges: ["connect", "these", "to", "the", "target"],
         *          category: "categoryForTheEdges"
         * });
         */
        function createEdgesFromNodes(props) {
            props.nodesFromCreateEdges.forEach(function (sourceNodeId) {
                props.sourceNodeId = sourceNodeId;
                createNodesAndEdgeBetween(props);
            });
        }

        /**
         * @function
         * @name createEdgesToNodes
         * @description Create edges from source node from every node of given array node. Todo: ATM cy is passed as a prop. Is this the way to go?
         * @param {Object} props
         * @param {Object} props.cy Cytoscape instance
         * @param {String} props.sourceNodeId Id of the target node.
         * @param {Array} props.nodesToCreateEdges Array of nodes to connect the source node.
         * @param {String} props.category Category to add for edges. Edges are parsed in category batches. Hence, one category per array.
         * @example
         * createEdgesToNodes({
         *          sourceNodeId: "connectThis",
         *          nodesFromCreateEdges: ["connect", "source", "to", "these"],
         *          category: "categoryForTheEdges"
         * });
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

        /**
         * @function
         * @name createNewEdge
         * @description Create new edge to the cytoscapge graph instance.
         * @param {Object} props
         * @param {String} props.sourceNodeId Id of the source node.
         * @param {String} props.targetNodeId Id of the target node.
         * @param {String} props.classForEdge Selector for assigning style.
         * @param {Object} props.cy Cytoscape instance.
         * @return {Element} Edge element.
         */
        function createNewEdge(props) {
            try {
                var edgeId = createEdgeId({
                    sourceNodeId: props.sourceNodeId,
                    targetNodeId: props.targetNodeId
                });
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
                if (edgeExists({edgeId: edgeId, cy: props.cy})) {
                    return props.cy.getElementById(edgeId);

                } else {

                    props.cy.add(newEdge);
                    var edge = props.cy.getElementById(edgeId);

                    var categoryExists = elementStyles.categoryExists(props.category);

                    // console.debug(elementStyles);
                    // console.debug(categoryExists);
                    var classesToAdd = elementStyles.getStyle(props.category);
                    if (!classesToAdd) {
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

        /**
         * @function
         * @name createNewNode
         * @description Create new node and add it to the given cytoscape instance.
         * @param {Object} props
         * @param {String} props.id Id for the node.
         * @param {Object} props.cy Cytoscape instance
         * */
        function createNewNode(props) {

            try {

                if (typeof props.id === 'undefined') {
                    throw TypeError("createNewNode() called with undefined id");
                }

                var nodeIdOk = nodeIdAvailable({nodeId: props.id, cy: props.cy});
                if (nodeIdOk) {
                    props.cy.add({
                        group: 'nodes',
                        data: {
                            id: props.id
                        }
                    });
                    return true;
                } else {
                    return false;
                }

            } catch (e) {
                console.groupCollapsed("Exception raised by graphingwikiBrowser.createNewNode(id)");
                console.warn(e);
                console.debug("props:");
                console.debug(props);
                console.groupEnd();
                console.debug('returning false from second catch');

                return false;
            }
        }

        /**
         * @function
         * @name createNodesAndEdgeBetween
         * @description Creates edge between two nodes and if the nodes do not exist, these are also created.
         * @param {Object} props
         * @param {String} props.sourceNodeId Id of the source node.
         * @param {String} props.targetNodeId Id of the target node.
         * @param {String} props.classForEdge Style category for the edge.
         * @param {Object} props.cy Cytoscape instance.
         */
        function createNodesAndEdgeBetween(props) {
            try {

                // If nodes do not exist, create them.
                // nodeIdAvailable: true === node do not exist.

                nodeIdAvailable({nodeId: props.sourceNodeId, cy: props.cy}) ?
                    createNewNode({id: props.sourceNodeId, cy: props.cy}) : null;

                nodeIdAvailable({nodeId: props.targetNodeId, cy: props.cy}) ?
                    createNewNode({id: props.targetNodeId, cy: props.cy}) : null;

                // createNewEdge checks if the edge already exists.
                createNewEdge(props);


                var edgeId = createEdgeId({
                    sourceNodeId: props.sourceNodeId,
                    targetNodeId: props.targetNodeId
                });
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

        /** @function
         *  @name edgeExists
         *  @description Check if a node of given id is already defined in the graph.
         *  @param {Object} props
         *  @param {String} props.cy Cytoscape instance.
         *  @param {String} props.edgeId Id of edge element.
         *  @return {Boolean} True if edge already defined, else False.
         */
        function edgeExists(props) {
            return props.cy.getElementById(props.edgeId).isEdge();
        }

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
                if (typeof props.categories === 'undefined') {
                    return false;
                }

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

        /**
         *  @function
         *  @name expandNode
         *  @description Chain of events to trigger when node needs to be expanded
         *  @param {Object} props
         *  @param {String} props.nodeId Id of the node to expand.
         *  @param {Object} props.cy Cytoscape instance.
         *  @example
         *  node = {
         *      in: Object,
         *      out: Object,
         *      meta: Object
         *  }
         **/

        function expandNode(props) {
            try {
                var gw = props.gwClient;
                var nodeId = props.nodeId;

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

                    // 1. parse edges
                    var connectedNodes = parseEdgesFromResponseData({
                        nodeId: props.nodeId,
                        data: node
                    });

                    // 2. update elementStyle categories
                    elementStyles.addCategories({
                        categories: connectedNodes.categoriesIn
                    });
                    elementStyles.addCategories({
                        categories: connectedNodes.categoriesOut
                    });

                    try {
                        // Iterate the outgoing edge categories.
                        if (connectedNodes.categoriesOut !== "undefined"
                            && !$.isEmptyObject(connectedNodes.categoriesOut)) {
                            connectedNodes.categoriesOut.forEach(function (category) {
                                // get list of nodes where the clicked node is connected to
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
                        }
                    } catch (e) {
                        console.warn(e);
                        console.warn(connectedNodes.categoriesOut);

                    }

                    try {
                        // Iterate the incoming edge categories.
                        if (connectedNodes.categoriesIn !== "undefined"
                            && !$.isEmptyObject(connectedNodes.categoriesIn)) {
                            connectedNodes.categoriesIn.forEach(function (category) {
                                var nodesConnectedTo = node.in[category];
                                createEdgesFromNodes({
                                    targetNodeId: nodeId,
                                    nodesFromCreateEdges: nodesConnectedTo,
                                    category: category,
                                    cy: cy
                                });
                            });
                        }
                    } catch (e) {
                        console.warn(e);
                        console.warn(connectedNodes.categoriesIn);
                    }

                                    setAndRunLayout(props);

                dispatch({
                    action: "UPDATE_TABS",
                    ctx: this,
                    id: "ui",
                    fn: null,
                    info: "Dispatch from graphUtils.bindExpandNodeU(). Called after elements have been updated and the ui needs to be refreshed.",
                    cy: cy
                });
                });


            } catch (e) {
                console.group("Exception raised by graphUtils.expandNode()");
                console.warn(e);
                console.groupEnd();
                // run the layout even if error
                setAndRunLayout(props);
            }
        }


        /**
         * @function
         * @name initCyContextMenu
         * @description initCyContextMenus FIXME!
         * @param cy
         * @return {Object} cy
         */
        function initCyContextMenu(cy) {
            return {
                menuItems: [
                    {
                        id: 'edge-details',
                        content: 'details',
                        tooltipText: 'node details for debugging',
                        selector: 'edge',
                        onClickFunction: function (event) {
                            var source = event.target || event.cyTarget;
                            console.info("Id: " + source.id());
                            console.info("classes:");
                            console.info(source.classes());
                            console.info(source.style());
                        }
                    },
                    {
                        id: 'add-edge',
                        content: 'connect',
                        tooltipText: 'add edge between this node and the chosen node',
                        selector: 'node',
                        onClickFunction: function (event) {
                            var source = event.target || event.cyTarget;
                            console.info('I am ' + source.id() + ' and I want to connect!');
                            createPopUp({
                                context: 'createEdge',
                                sourceNode: source

                            });
                        }
                    },
                    {
                        id: 'hide',
                        content: 'hide',
                        tooltipText: 'hide',
                        selector: '*',
                        onClickFunction: function (event) {
                            var target = event.target || event.cyTarget;
                            target.hide();
                        },
                        disabled: false
                    },
                    {
                        id: 'add-node',
                        content: 'add node',
                        tooltipText: 'add node',
                        coreAsWell: true,
                        onClickFunction: function (event) {
                            var targetId = prompt('Provide id for the new node.');
                            var data = {
                                group: 'nodes',
                                id: targetId
                            };

                            var pos = event.position || event.cyPosition;
                            // todo: refactor to be standalone function
                            var promise = props.gw.savePageToMoin(targetId, 'hello');
                            promise.then(function (response) {
                                var j = response.json();
                                console.log(j);
                                return j;
                            }).then(function (obj) {
                                console.log(obj);
                                createNewNode({
                                    id: targetId,
                                    cy: cy
                                });
                            });
                            /*
                             cy.add({
                             data: data,
                             position: {
                             x: pos.x,
                             y: pos.y
                             }
                             });*/
                        }
                    },
                    {
                        id: 'remove-selected',
                        content: 'remove selected',
                        tooltipText: 'remove selected',
                        coreAsWell: true,
                        onClickFunction: function (event) {
                            cy.$(':selected').remove();
                        }
                    },
                    /*{
                     id: 'select-all-nodes',
                     content: 'select all nodes',
                     tooltipText: 'select all nodes',
                     selector: 'node',
                     onClickFunction: function (event) {
                     selectAllOfTheSameType(event.target || event.cyTarget);
                     }
                     },
                     {
                     id: 'select-all-edges',
                     content: 'select all edges',
                     tooltipText: 'select all edges',
                     selector: 'edge',
                     onClickFunction: function (event) {
                     selectAllOfTheSameType(event.target || event.cyTarget);
                     }
                     }*/
                ]
            };
        }

        /** @function initCytoscape
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function initCytoscape(props) {
            props.contextMenuItems = contextMenuItems;
            cy = cyInitUtils.init(props);
            cy.on('tap', 'node', bindExpandNode);
            return cy;
        }

        /** @function
         *  @name nodeIdAvailable
         *  @description Check if a node of given id is already defined in the graph.
         *  @param {String} nodeId- Id of node.
         *  @return {Boolean} True if id is available for use, else False.
         */
        function nodeIdAvailable(props, nodeId, cy) {
            return !props.cy.getElementById(props.nodeId).isNode();
        }

        /**
         * @function
         * @name parseEdgesFromResponseData
         * @description Parse edges and their categories from gwClient response.
         * @param {Object} props
         * @param {Object} props.data Node data in JSON format.
         * @return {Object} edgeData
         * @example
         *  node = {
         *      in: Object,
         *      out: Object,
         *      meta: Object
         *  }
         */
        function parseEdgesFromResponseData(props) {
            try {
                /*
                 * By default incoming edges are in "_notype" category.
                 * This is due the graphingwiki backend API. Hence,
                 * the incoming edge categories do not need to be iterated.
                 * But the same logic is going to be used for incoming and outgoing
                 * edges to enable changes in the API.
                 */

                // check if out/in nodes defined
                var hasEdgesOut = (props.data.out != 'undefined');
                var hasEdgesIn = (props.data.in != 'undefined');
                var newCategoriesOut = {};
                var newCategoriesIn = {};
                var edgeOut = {};
                var edgeIn = {};


                // if defined get the id's of connected nodes
                if (hasEdgesOut && !$.isEmptyObject(props.data.out)) {
                    try {
                        newCategoriesOut = Object.keys(props.data.out);
                        newCategoriesOut.forEach(function (category) {
                            edgeOut[category] = props.data.out[category];
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn(hasEdgesOut);
                        console.warn(props.data.out);
                    }
                }

                if (hasEdgesIn && !$.isEmptyObject(props.data.in)) {
                    try {
                        newCategoriesIn = Object.keys(props.data.in);
                        newCategoriesIn.forEach(function (category) {
                            edgeIn[category] = props.data.in[category];
                        });
                    } catch (e) {
                        console.warn(e);
                        console.warn(props.data.in);
                    }
                }

                return {
                    data: props.data,
                    hasEdgesIn: hasEdgesIn,
                    hasEdgesOut: hasEdgesOut,
                    categoriesIn: newCategoriesIn,
                    categoriesOut: newCategoriesOut,
                    edgesOut: edgeOut,
                    edgesIn: edgeIn
                };

            } catch (e) {
                console.group("Exception raised by parseEdgesFromResponseData()");
                console.debug("props:");
                console.debug(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        /** @function
         *  @name setAndRunLayout
         *  @description Update cytoscape graph layout.
         *  @param {Object} props
         *  @param {Object} props.cy cytoscape instance
         *  @param {String} props.layout layout name.
         *  @return {Boolean} True if no errors.
         */
        function setAndRunLayout(props) {
            try {
                var layoutStyle = props.layout || "circle";
                // var layout = props.cy.makeLayout({name: layoutStyle});
                console.group("setAndRunLayout()");
                console.debug(props);
                console.debug(cy);
                console.groupEnd();
                var layout = props.cy.makeLayout({name: "cola"});
                layout.run();
                return true;
            } catch (e) {
                console.group("Exception raised by graphUtils.setAndRunLayout()");
                console.debug("props:");
                console.debug(props);
                console.warn(e);
                console.groupEnd();
                return false;
            }
        }

        /**
         *
         * @param evt
         */
        function bindExpandNode(evt) {
            console.debug('debugging bindExpandNode()');
            try {
                var node = evt.target;
                var nodeId = node.id();


                /*
                 eventListeners.graph.clickNode({
                 nodeId: nodeId
                 });*/

                expandNode({
                    nodeId: nodeId,
                    cy: cy,
                    gwClient: gwClient,
                    elementStyles: elementStyles
                });

                /*
                console.debug("UI:");
                console.debug(ui);
                dispatch({
                    action: "UPDATE_TABS",
                    ctx: this,
                    id: "ui",
                    fn: null,
                    info: "Dispatch from graphUtils.bindExpandNodeU(). Called after elements have been updated and the ui needs to be refreshed.",
                    cy: cy
                });*/

            } catch (e) {
                console.group("Exception raised by graphUtils.bindExpandNode()");
                console.warn(e);
                console.debug("props:");
                console.debug(evt);
                console.groupEnd();
            }
        }

        /**
         * @function
         * @name testCy
         * @description generate cytoscape instance for development context.
         * @param {HTMLDivElement} containerElement div container for cytoscape graph
         * @param {Object} cytoscape instance
         */
        /*function testCy(containerElement) {
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
         }*/

        /**
         * @function
         * @name toggleNeighborhood
         * @description toggle highlight class of the neighborhood of given element.
         * @param {Object} props
         * @param {Object} props.node
         */
        function toggleNeighborhood(props) {
            var neighborhood = props.node.neighborhood('node');
            var edges = props.node.neighborhood('edge');

            try {
                neighborhood.forEach(function (e) {
                    e.toggleClass('highlight');
                });
                edges.forEach(function (e) {
                    e.toggleClass('highlight');
                });
            } catch (e) {
                console.group("Exception raised by toggleNeighbourhood()");
                console.debug("props");
                console.debug(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        /** @function
         *  @name toggleVisibility
         *  @description toggle visibility of cy element .parameter is a object, which contains string:elementId
         *  and object:cy (cytoscape instance).
         *  @param {Object} props
         *  @param {Object} props.elementId
         *  @param {Object} props.cy
         */
        function toggleVisibility(props) {
            try {
                var el = props.cy.getElementById(props.elementId);
                if (el.hidden()) {
                    el.show();
                } else {
                    el.hide();
                }
            } catch (e) {
                console.group("Exception raised by toggleVisibility()");
                console.warn(e);
                console.info("elementId: " + elementId);
                console.info("cy: ");
                console.info(cy);
                console.groupEnd();
            }
        }

        /**
         * @function
         * @name updateCategoryElementsStyle
         * @description update cytoscape elements style
         * @param {Object} props
         * @param {Object} props.category
         * @param {Object} props.style styles to assign
         * Todo: Impelmentation after updating the categories is functional!
         * */
        function updateCategoryElementsStyle(props) {
            try {
                var elementsToUpdate = cy.elements("edge." + props.category);
                var stylesArray = elementStyles.getStyle(props.category);

                // this overrides all classes so the category has to be kept manually
                elementsToUpdate.classes(props.category + " " + stylesArray.join(" "));
            } catch (e) {
                console.group("updateCategoryElementsStyle()");
                console.debug("props:");
                console.debug(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        /**
         * @function
         * @name createNewCy
         * @description Set applications cytoscape instance.
         * @param {Object} props
         * @param {Object} props.data
         * @param {Object} props.style styles to assign
         * */
        function createNewCy(props) {
            try {
                props.contextMenuItems = contextMenuItems;
                cy = cyInitUtils.init(props);
                cy.on('tap', 'node', bindExpandNode);
                return cy;
            } catch (e) {
                console.group("Exception raised by graphUtils.createNewCy()");
                console.debug("props:");
                console.debug(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        /**
         * @function
         * @name getNodes
         * @description Wrapper cy.elements('node')
         * @return {Array} Cytoscape elements
         */
        function getNodes() {
            return cy.elements('node');
        }

        return {
            addClassToEdge: addClassToEdge,
            createEdgesFromNodes: createEdgesFromNodes,
            createEdgesToNodes: createEdgesToNodes,
            createEdgeId: createEdgeId,
            createNewCy: createNewCy,
            createNewEdge: createNewEdge,
            createNewNode: createNewNode,
            createNodesAndEdgeBetween: createNodesAndEdgeBetween,
            edgeExists: edgeExists,
            elementHasCategoryClass: elementHasCategoryClass,
            expandNode: expandNode,
            info: function () {
                return {
                    name: "graphUtils",
                    description: "wrappers for managing cytoscape graph instance"
                }
            },
            cy: function () {
                return cy;
            },
            getNodes: getNodes,
            nodeIdAvailable: nodeIdAvailable,
            initCy: initCytoscape,
            toggleNeighborhood: toggleNeighborhood,
            toggleVisibility: toggleVisibility,
            updateCategoryElementStyle: updateCategoryElementsStyle,
            setDispatch: function (fn) {
                dispatch = fn;
                dispatch({
                    action: "TEST_DISPATCH",
                    ctx: this,
                    id: "ui",
                    fn: null,
                    info: "dev test"

                });
            }
        }
    })
;