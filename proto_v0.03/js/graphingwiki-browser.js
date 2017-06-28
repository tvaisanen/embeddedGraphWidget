/**
 * Created by toni on 6.6.2017.
 */
var d = document;

var configs = {
// This is a proxy server for development
    API_PATH: 'http://127.0.0.1:5000/',
    API_CREATE_NEW_NODE: this.API_PATH + 'add-to-wiki/'
};

gwClient.setConfigs(configs);

// Use these for tests

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

            // Todo: generate these from config!

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
            {selector: 'edge.arrow-shape-triangle-backcurve', style: {'target-arrow-shape': 'triangle-backcurve'}},
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
            },
        ],
    });
}

var testState = {
    header: "GraphingWikiBrowser Prototype v0.03",
    appContainerId: "app-container",
    contentContainerId: "content-container",
    graphContainerId: "cy",
    gw: gwClient,
    elementStyles: {
        generic: [
            'line-width-10',
            'arrow-shape-triangle',
            'line-color-grey'
        ]
    },
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

// initialize download image link


function initNewGraph(data) {
    cy = cytoscape({
        container: document.getElementById('cy'),
        elements: data.elements,
        style: data.style,
        layout: {name: 'preset'},
    });
    cy.on('tap', 'node', function (evt) {
        var node = evt.target;
        var nodeId = node.id();
        expandNode(cy, nodeId);
    });
    return cy;
}

function unorderedListFromArray(array, mouseOver, mouseOut, toggleVisibility, onClick, doubleClick) {
    /*
     * Todo: add support for the array containing evenListener -methods
     * array: array of string items
     * return: unordered html element with list items
     * from the array
     * */

    var ul = d.createElement('ul');
    array.forEach(function (item) {
        var li = d.createElement('li');

        var checkBox = d.createElement('input');
        checkBox.setAttribute('id', 'visibility_' + item);
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('checked', 'true');
        checkBox.checked = true;
        //console.log(checkBox);
        checkBox.addEventListener('change', function (event) {
            //console.log(event.target);
            toggleVisibility(event.target);
            //console.log(event.target.id);
        });
        //console.log(checkBox);

        li.appendChild(checkBox);

        li.innerHTML += item;

        li.setAttribute('id', item);

        li.addEventListener('mouseover', function (evt) {
            mouseOver(evt.target.id);
        });

        li.addEventListener('doubleclick', function (evt) {
            doubleClick(evt.target.id);
        });

        li.addEventListener('mouseout', function (evt) {
            mouseOut(evt.target.id);
        });

        li.addEventListener('click', function (evt) {
            onClick(evt.target.id);
        });

        ul.appendChild(li);
    });
    return ul;
}

// Todo: Make configs object for all of these
var layoutOptions = ['cola', 'breadthfirst', 'circle', 'concentric', 'cose', 'grid', 'random'];
var params = ['line-style', 'arrow-shape', 'line-color', 'line-width'];
var lineStyleOptions = {
    'width': Array.from(Array(20).keys()),
    'line-color': 'rgb',
    'line-style': [],
    'target-arrow-color': 'rgb',
    'target-arrow-shape': [],
    'curve-style': []
};
var lines = ['solid', 'dotted', 'dashed'];
var arrows = ['tee', 'triangle', 'triangle-tee', 'triangle-cross', 'triangle-backcurve', 'square', 'circle', 'diamond', 'none'];
var colors = ['red', 'green', 'orange', 'yellow', 'cyan', 'blue'];


var graphingwikiBrowser = (function (gwClient, cy) {

    // Every variable needs to be accessed through props
    // Todo: use redux pattern?

    var props;
    var classNames = {
        container: 'app-container',
        graph: {
            container: 'graph-container'
        },
        panel: {
            container: 'panel-container'
        },
        menu: {
            container: 'panel-menu',
            item: {

                active: 'panel-menu__menu-item--active',
                inactive: 'panel-menu__menu-item--inactive'
            }
        },
        tab: {
            container: 'panel-tabs',
            nav: {
                container: 'panel-tab-nav',
                item: {
                    item: 'panel-tab-nav__nav-item',
                    active: 'panel-tab-nav__nav-item--active',
                    inactive: 'panel-tab-nav__nav-item--inactive'
                }
            },
            graph: {
                container: 'tab-graph',
                listHeader: 'tab-graph__list-header',
                listItem: {
                    active: 'tab-graph__list-item--active',
                    inactive: 'tab-graph__list-item--inactive'
                },
                filter: "tab-graph__filter",
                filterClasses: {
                    input: "tab-elements__filter-input"
                }
            },
            elements: {
                container: 'tab-elements',
                listHeader: 'tab-elements__list-header',
                listItem: {
                    active: 'tab-elements__list-item--active',
                    inactive: 'tab-elements__list-item--inactive'
                },
                filter: "tab-elements__filter",
                filterClasses: {
                    input: "tab-elements__filter-input"
                }
            },
            styles: {
                container: 'tab-styles',
                listHeader: 'tab-styles__list-header',
                listItem: {
                    active: 'tab-styles__list-item--active',
                    inactive: 'tab-styles__list-item--inactive'
                }
            }
        },
        text: {
            container: "text-preview",
            header: "text-preview__header",
            content: "text-preview__content"
        }
    };
    var menuItems = {
        create: {
            label: "Create new node/edge",
            content: "Create new things here",
            onClick: function () {
                console.log('clicked: ' + this.label);
            },
            generateContent: menuItemCreate

        },
        download: {
            label: "Download",
            content: "Click to download image.",
            onClick: downloadGraphPNG,
            generateContent: generateContent
        },
        layout: {
            label: "Layout",
            content: "here you can change the layout",
            onClick: function () {
                console.log('clicked: ' + this.label);
            },
            generateContent: menuItemLayout
        },
        save: {
            label: "Save",
            content: "form to input graph name",
            onClick: function () {
                console.log('clicked: ' + this.label);
            },
            generateContent: menuItemSave
        },

        /*
        settings: {
            label: "Settings",
            content: "here might be some options to choose from",
            onClick: function () {
                console.log('clicked: ' + this.label);
            },
            generateContent: generateContent
        },
        moin: {
            label: "Moin pages",
            content: "list moin pages here",
            onClick: function () {
                console.log('clicked: ' + this.label);
            },
            generateContent: generateContent
        }*/
    };

    function createNewNode(id) {

        // Create new node.
        var newNode = {
            group: 'nodes',
            data: {
                id: id
            }
        };

        // Add the new node to cy.elements.
        props.cy.add(newNode);
    }

    function getEdgeCategories() {
        var categories = props.tabs.styles.categories;
        if (categories === 'undefined') {
            return []
        } else {
            return categories;
        }
    }

    function elementHasOneOfCategories(element) {
        /*
         *
         * */
        try {
            var values = [];
            var edgeDoesNotHaveAnyCategory = false;
            props.tabs.styles.categories.forEach(function (category) {
                values.push(element.hasClass(category))
            });

            values.forEach(function (b) {
                edgeDoesNotHaveAnyCategory = edgeDoesNotHaveAnyCategory || b;
            });
            return edgeDoesNotHaveAnyCategory;
        } catch (e) {
            console.groupCollapsed("Exception with elementHasOneOfCategories()");
            console.info("Parameters passed:");
            console.info("element: " + element);
            console.info(element);
            console.warn(e);
            console.groupEnd();
        }
    }

    function expandNode(nodeId) {

        cy = props.cy;
        gw = props.gw;


        function createNewNode(id) {

            var cy = props.cy;

            try {
                // Create new node.
                var newNode = {
                    group: 'nodes',
                    data: {
                        id: id
                    }
                };

                // Add the new node to cy.elements.
                cy.add(newNode);
            } catch (e) {
                console.groupCollapsed("Exception with createNewNode()");
                console.warn(e);
                console.info("Parameter passed:");
                console.info("id: " + id);
                console.groupEnd();
            }
        }

        function createNewEdge(sourceId, targetId, classForEdge) {

            var cy = props.cy;

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
                cy.add(newEdge);
                var e = cy.getElementById(edgeId);


                var classesToAdd = props.elementStyles[classForEdge];
                if (!classesToAdd) {
                    classesToAdd = props.elementStyles.generic;
                }

                // Add the new edge to cy.elements.

                classesToAdd.forEach(function (styleClass) {
                    e.addClass(styleClass);
                });
                /*
                 Object.keys(classesToAdd).forEach(function (key) {
                 e.addClass(classesToAdd[key]);
                 });*/

            } catch (e) {
                console.info(e.type);
                console.groupCollapsed("Exception with createNewEdge()");
                console.info("Parameters passed:");
                console.info("sourceId: " + sourceId);
                console.info("targetId: " + targetId);
                console.info("classForEdge: " + classForEdge);
                console.warn(e);
                console.groupEnd();
            }

        }

        function addClassToEdge(edgeId, classToAdd) {
            try {
                // Get element reference to the edge with edgeId.
                var edge = cy.getElementById(edgeId);

                // Check if the edge does not have a category set.
                var edgeDoesNotHaveAnyCategory = elementHasOneOfCategories(edge);


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
                    edge.addClass(classToAdd);
                } else if (!edgeDoesNotHaveAnyCategory) {
                    edge.addClass(classToAdd);
                }
                // Add the class for the edge.
            } catch (e) {
                console.groupCollapsed("Exception with addClassToEdge()");
                console.info("Parameters passed:");
                console.info("edgeId: " + edgeId);
                console.info("classToAdd: " + classToAdd);
                console.warn(e);
                console.groupEnd();
            }
        }

        function createNodesAndEdgesBetween(sourceNodeId, targetNodeId, classForEdge) {
            try {
                // Check if the source node already exists.
                // boolean
                var sourceNodeDoNotExist = !cy.getElementById(sourceNodeId).isNode();

                // Create new node if the node does not exist yet.
                if (sourceNodeDoNotExist) {
                    createNewNode(sourceNodeId);
                }

                // Check if the target node already exists.
                var targetNodeDoNotExist = !cy.getElementById(targetNodeId).isNode();

                // Create new node if the node does not exist yet.
                if (targetNodeDoNotExist) {
                    createNewNode(targetNodeId);
                }

                // Create edge id. Use format 'sourceId_to_targetId'.
                var edgeId = sourceNodeId + "_to_" + targetNodeId;

                // Check if the edge already exist.
                var edgeBetweenDoNotExist = !cy.getElementById(edgeId).isEdge();

                // Create new edge if the edge does not exist yet.
                if (edgeBetweenDoNotExist) {
                    createNewEdge(sourceNodeId, targetNodeId, classForEdge);
                }

                addClassToEdge(edgeId, classForEdge);
            } catch (e) {
                console.groupCollapsed("Exception with createNodesAndEdgesBetween()");
                console.info("Parameters passed:");
                console.info("sourceNodeId: " + sourceNodeId);
                console.info("targetNodeId: " + targetNodeId);
                console.info("classForEdge: " + classForEdge);
                console.warn(e);
                console.groupEnd();
            }

        }

        function createEdgesToNodes(sourceNodeId, nodesToCreateEdges, category) {

            /*
             * Iterate through the nodesToCreateEdges array and add
             * edges between the source node and target nodes.
             * If the target node does not exist yet, create and add
             * the node to cy.elements.
             */
            nodesToCreateEdges.forEach(function (targetNodeId) {
                try {
                    createNodesAndEdgesBetween(sourceNodeId, targetNodeId, category);
                } catch (e) {
                    console.groupCollapsed("Exception with createEdgesToNodes()");
                    console.info("Parameters passed:")
                    console.info("sourceNodeId: " + sourceNodeId);
                    console.info("nodesToCreateEdges: " + nodesToCreateEdges);
                    console.info("category: " + category);
                    console.warn(e);
                    console.groupEnd();
                }
            });
        }

        function createEdgesFromNodes(targetNodeId, nodesFromCreateEdges, category) {
            nodesFromCreateEdges.forEach(function (sourceNodeId) {
                createNodesAndEdgesBetween(sourceNodeId, targetNodeId, category);
            });
        }

        function updateCategories(newCategories) {
            /*
             when: A new node is loaded.
             why: To add new possible categories.
             how: [( the category is already listed ) ? do nothing : add new category to graphingwikiBrowser props list]
             CategoryStyles is the function, which handles the updating.
             */

            // get current categories from the graphingwikiBrowser
            var categoriesToUpdate = getEdgeCategories();

            try {
                // this could be written with reducer Todo ?
                newCategories.forEach(function (category) {
                    if (categoriesToUpdate.indexOf(category) === -1) {
                        categoriesToUpdate.push(category);
                    }
                });

                var tabStylesProps = props.tabs.styles;
                tabStylesProps.categories = categoriesToUpdate;

            } catch (e) {
                console.warn("Problem while updating categories!");
                console.warn(e);
            }

            updateTabs();
        }

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

                try {
                    // If node has outgoing edges refresh the categories
                    var nodeHasOutgoingEdges = (node.out != 'undefined');
                    var newCategoriesOut = [];

                    if (nodeHasOutgoingEdges) {
                        newCategoriesOut = Object.keys(node.out);
                        updateCategories(newCategoriesOut);
                    }

                    // Iterate the outgoing edge categories.

                    try {
                        newCategoriesOut.forEach(function (category) {
                            // get list of nodes where the clicked node is connected t
                            var nodesConnectedTo = node.out[category];

                            // for each connected node create a new edge
                            createEdgesToNodes(nodeId, nodesConnectedTo, category);

                        });
                    } catch (e) {
                        console.warn("Something went wrong while creating outgoing edges.");
                        console.warn(e);
                    }
                    var newCategoriesIn = Object.keys(node.in);
                    updateCategories(newCategoriesIn);

                    // Iterate the incoming edge categories.
                    newCategoriesIn.forEach(function (category) {
                        var nodesConnectedTo = node.in[category];
                        createEdgesFromNodes(nodeId, nodesConnectedTo, category);
                    });
                } catch (e) {
                    console.groupCollapsed("Expanding node raised exception");
                    console.warn(e);
                    console.groupEnd();
                }
                setAndRunLayout();
                updateTabs();

            }
        );
    }

    function setAndRunLayout() {
        var layout = cy.makeLayout({name: "cola"});
        layout.run();
    }

    function generateContent() {
        "use strict";
        var div = d.createElement('div');
        div.innerHTML = this.content;
        return div;
    }

    function menuItemCreate() {
        "use strict";
        var div = d.createElement('div');
        var inName = d.createElement('input');
        inName.setAttribute('id', 'input-graph-name');
        inName.setAttribute('type', 'text');
        var btnSave = d.createElement('button');
        btnSave.addEventListener('click', function (event) {
            console.log("Clicked create node button.");
            console.log("Current value: " + inName.value);
            var promise = gwClient.savePageToMoin(inName.value, 'hello');
            promise.then(function (response) {
                var j = response.json();
                console.log(j);
                return j;
            }).then(function (obj) {
                console.log(obj);
                createNewNode(inName.value);
            });
        });
        var label = d.createElement('span');
        label.innerHTML = 'Node ID:';
        btnSave.innerHTML = 'create';
        div.appendChild(label);
        div.appendChild(inName);
        div.appendChild(btnSave);
        //div.innerHTML = this.content + "Generated content!";
        return div;
    }

    function menuItemSave() {
        "use strict";
        var cy = props.cy;
        var div = d.createElement('div');
        var inName = d.createElement('input');
        inName.setAttribute('id', 'input-graph-name');
        inName.setAttribute('type', 'text');
        var btnSave = d.createElement('button');
        btnSave.addEventListener('click', function (event) {
            console.log("Clicked save graph button.");
            console.log("Current value: " + inName.value);
            gwClient.postGraph(inName.value, cy.json());
        });
        var label = d.createElement('span');
        label.innerHTML = 'Graph ID:';
        btnSave.innerHTML = 'save';
        div.appendChild(label);
        div.appendChild(inName);
        div.appendChild(btnSave);
        //div.innerHTML = this.content + "Generated content!";
        return div;
    }

    function menuItemLayout() {
        "use strict";
        var div = d.createElement('div');
        var selLayout = d.createElement('select');
        selLayout.setAttribute('id', 'layout-options');

        layoutOptions.forEach(function (option) {
            var opt = d.createElement('option');
            opt.setAttribute('value', option);
            opt.innerHTML = option;
            selLayout.appendChild(opt);
        });

        var btnResetLayout = d.createElement('button');
        btnResetLayout.addEventListener('click', function (event) {
            console.log("Clicked reset layout.");
            console.log("Current value: " + selLayout.value);
            setAndRunLayout();
        });
        var label = d.createElement('span');
        label.innerHTML = 'selected:';
        btnResetLayout.innerHTML = 'reset';
        div.appendChild(label);
        div.appendChild(selLayout);
        div.appendChild(btnResetLayout);
        //div.innerHTML = this.content + "Generated content!";
        return div;
    }

    function downloadGraphPNG() {
        var cy = props.cy;
        console.info('running downloadGraphPNG() -function');
        console.debug(cy);
        console.debug(cy.json());
        console.debug(cy.png);
        var pngGraph = cy.png({bg: 'white'});
        var a = document.createElement('a');

        a.href = pngGraph;
        a.download = 'graph.png';
        console.debug(a);
        a.click()
    }

    function initCytoscape() {
        /*
         *   Return <div id="cy">
         *   Initialize empty Cytoscape graph
         *
         * */
        var cyContainer = d.getElementById('cy');
        cy = testCy(cyContainer);
        cy.on('tap', 'node', function (evt) {
            var node = evt.target;
            var nodeId = node.id();
            expandNode(nodeId);
        });

        props.cy = cy;
    }

    function handleNavClick(keyToActivate) {

        var tabs = props.tabs;
        var navItemClasses = classNames.tab.nav.item;
        // toggle all navlink classes to inactive
        var links = Object.keys(tabs);
        links.forEach(function (key) {
            tabs[key].active = false;
            d.getElementById("nav-item-" + key).classList.remove(navItemClasses.active);
        });

        // activate clicked navlink
        tabs[keyToActivate].active = true;
        d.getElementById("nav-item-" + keyToActivate).classList.add(navItemClasses.active);
        var divTabContainer = d.getElementById(classNames.tab.container);
        console.log(divTabContainer);
        updateTabs();
    }

    function updateTabs() {

        /*
         *   Clear the tabs container and re-render content.
         *   Append the content to panelContainer.
         */
        var divTabContainer = d.getElementById(classNames.tab.container);

        var panelContainer = d.getElementById(classNames.panel.container);

        var childsToRemove = divTabContainer.childNodes;

        childsToRemove.forEach(function (child) {
            divTabContainer.remove(child);
        });

        var tabsContent = renderTabs();
        panelContainer.appendChild(tabsContent);
    }

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

    function renderContentContainer() {
        var contentContainer = d.createElement('div');
        contentContainer.setAttribute('id', props.contentContainerId);
        contentContainer.classList.add("content-container");
        contentContainer.appendChild(renderPanel());
        contentContainer.appendChild(renderGraphColumn());
        return contentContainer;
    }

    function renderHeaderContainer() {
        var headerContainer = d.createElement('div');
        headerContainer.setAttribute('id', "header-container");
        headerContainer.classList.add("header-container");
        headerContainer.appendChild(renderHeader());
        return headerContainer;
    }

    function render() {

        var appContainer = d.getElementById(props.appContainerId);
        console.log(props.appContainerId);
        console.log(props);
        console.log(window);
        appContainer.appendChild(renderHeaderContainer());
        appContainer.appendChild(renderContentContainer());

    }


    function renderGraphColumn() {
        var graphColumnContainer = d.createElement('div');
        graphColumnContainer.setAttribute('id', 'graph-column-container');
        graphColumnContainer.classList.add("graph-column");

        var graphContainer = d.createElement('div');

        graphContainer.setAttribute('id', props.graphContainerId);
        graphContainer.classList.add("graph-container");

        var textPrevievContainer = renderTextPreview();

        graphColumnContainer.appendChild(graphContainer);
        graphColumnContainer.appendChild(textPrevievContainer);

        return graphColumnContainer;
    }

    function renderElementsContent() {
        /*
         * Implement elements tab rendering here
         *
         * */
        var content = props.tabs.elements;
        var cy = props.cy;

        var div = d.createElement('div');
        div.setAttribute('id', "elements-content");

        div.appendChild(renderElementsFilter());
        div.appendChild(renderElementsList());

        return div;
    }

    function renderElementsFilter() {
        var div = d.createElement('div');
        var spanFilter = d.createElement('span');
        var btnClearFilter = d.createElement("button");

        div.classList.add("element-filter");

        btnClearFilter.innerHTML = "ClearFilter";
        btnClearFilter.addEventListener('click', function () {
            props.tabs.elements.filter = '';
            updateTabs();
        });
        var mockFilter = d.createElement("input");


        mockFilter.type = "text";
        mockFilter.setAttribute('id', 'filter');
        // mockFilter.setAttribute('placeholder', 'Filter Elements');


        mockFilter.addEventListener('keypress', function (event) {
            var divList = d.getElementById('elements-list');
            props.tabs.elements.filter = mockFilter.value;
            spanFilter.innerHTML = ": filter :" + mockFilter.value;
            console.log("prop.filter: " + props.tabs.elements.filter);
            var elesContent = d.getElementById('elements-content');
            var oldContent = elesContent.childNodes[1];
            var newContent = renderElementsList();
            elesContent.replaceChild(newContent, oldContent);
        });

        div.appendChild(mockFilter);
        div.appendChild(btnClearFilter);
        div.appendChild(spanFilter);
        return div;
    }

    function renderElementsList() {
        var content = props.tabs.elements;
        var cy = props.cy;
        var gw = props.gw;

// which are meant to be used with
        function getElementIDsToArray(selector) {
            /*
             * param eles: cy.elements
             * return: array of element id strings
             */

            var idArray = [];
            try {
                cy.elements(selector).forEach(function (el) {
                    var id = el.id();
                    var filter = content.filter.toLowerCase();
                    var filterIncludes = id.toLowerCase().includes(filter);

                    if (content.filter == '' || content.filter == 'undefined') {
                        idArray.push(id);
                    } else {
                        if (filterIncludes) {
                            idArray.push(id);
                        }
                    }
                });
            } catch (e) {
                console.error(e);
            }
            return idArray;
        }

        function toggleNeighbourhood(node) {
            var neighborhood = node.neighborhood('node');
            var edges = node.neighborhood('edge');

            try {
                neighborhood.forEach(function (e) {
                    e.toggleClass('highlight');
                });
                edges.forEach(function (e) {
                    e.toggleClass('highlight');
                });
            } catch (e) {
                console.error("Something went wrong with 'toggleNeighbourhood()'");
            }
        }

        function doubleClick(param) {
            if (cy.getElementById(param).isNode()) {
                expandNode(param);
            }
        }

        function loadPageText(param) {
            console.log("load page text");
            var textPromise = gw.getPageText(param);
            var textPrevievContainer = d.getElementById("text-preview");
            var textContainerHeader = d.getElementById("text-preview__header");
            var textContent = d.getElementById("text-preview__content");
            var linkToSite = d.createElement('a');
            linkToSite.innerHTML = param;
            linkToSite.setAttribute('href', "http://localhost/" + param);
            textPromise.then(function (response) {
                return response.json();
            }).then(function (json) {
                var text = json.data;
                textContent.innerHTML = text;
            });
            textContainerHeader.appendChild(linkToSite);
            textContent.innerHTML = param;
        }

        function mouseOver(param) {
            var node = cy.getElementById(param);
            node.toggleClass('hover-on');
            toggleNeighbourhood(node);
        }

        function mouseOut(param) {
            var node = cy.getElementById(param);
            node.toggleClass('hover-on');
            toggleNeighbourhood(node);
        }

        function toggleVisibility(param) {
            cy.getElementById(param).hidden();
        }


// extract the ids from aforementioned elements

        var nodes = getElementIDsToArray("node");
        var edges = getElementIDsToArray("edge");


        var div = document.createElement('div');

        var hdNodes = d.createElement('h2');
        hdNodes.innerHTML = "Pages";

        var pNodeNotes = d.createElement('p');
        pNodeNotes.innerHTML = "order by degree?";

        var hdEdges = d.createElement('h2');
        hdEdges.innerHTML = "Links";

        var ulNodes = unorderedListFromArray(nodes, mouseOver, mouseOut, toggleVisibility, loadPageText, doubleClick);
        var ulEdges = unorderedListFromArray(edges, mouseOver, mouseOut, toggleVisibility);

        div.setAttribute('id', "elements-list");
        div.appendChild(hdNodes);
        div.appendChild(ulNodes);
        div.appendChild(hdEdges);
        div.appendChild(ulEdges);
        return div;
    }

    function renderGraphsContent() {
        /*
         * Implement graphs tab rendering here
         *
         * */
        var cy = props.cy;
        var gw = props.gw;
        var classes = classNames.tab.graph;

        var div = document.createElement('div');
        var ul = document.createElement('ul');

        div.setAttribute('id', classes.container);

        var graphListPromise = props.gw.getGraphList();

        graphListPromise.then(function (response) {
            return response.json();

        }).then(function (json) {
            var graphs = json.data;

            graphs.forEach(function (graph) {
                var li = document.createElement('li');
                li.classList.add(classes.listItem.inactive);
                li.innerHTML = graph;

                li.addEventListener('click', function () {
                    console.log("clicked: " + graph);
                    if (true /*confirm('Are you sure that you want to change the graph?')*/) {
                        var graphPromise = gw.getGraph('graph/' + graph);
                        graphPromise.then(function (response) {
                            var json = response.json();
                            return json;
                        }).then(function (json) {
                            props.cy.destroy();
                            props.cy = initNewGraph(json.data);
                        });
                    } else {
                        // Do nothing!
                    }
                });
                ul.appendChild(li);
            });
        });


        div.appendChild(ul);
        console.groupEnd();
        return div;
    }

    function renderHeader() {
        var header = d.createElement('h2');
        header.innerHTML = props.header;
        return header;
    }

    function renderMenu() {

        // Create the div which contains graphingwikiBrowser navigation tabs.
        var tabs = props.tabs;

        // css classes
        var classes = classNames.menu;

        var divMenu = document.createElement('div');
        divMenu.classList.add(classes.container);
        divMenu.id = classes.container;
        divMenu.classList.add(classes.container);
        var divToggleMenu = d.createElement('div');
        divToggleMenu.innerHTML = '#';
        //divMenu.appendChild(divToggleMenu);
        var menus = Object.keys(menuItems);
        // console.log(menus);

        menus.forEach(function (itemKey) {
            var item = menuItems[itemKey];
            var div = d.createElement('div');
            div.setAttribute('id', "panel-menu__item__" + itemKey);
            var divContent = d.createElement('div');
            divContent.setAttribute('id', 'panel-menu__item__' + item.label.toLowerCase() + '-content');

            // Bind an action to the click of the label.
            div.addEventListener('click', function () {
                item.onClick(item.label + " clicked");
            });

            // Show the content.
            div.addEventListener('mouseover', function () {
                divContent.classList.add('show');
            });

            // Hide the content.
            div.addEventListener('mouseout', function () {
                divContent.classList.remove('show');
            });
            div.classList.add('panel-menu-item');
            divContent.classList.add('panel-menu-content');
            div.innerHTML = item.label;

            // Put the item content in to the html element.
            // console.log(item);
            divContent.appendChild(item.generateContent());
            div.appendChild(divContent);
            // divMenu.appendChild(createPopup(item.label));
            divMenu.appendChild(div);
        });

        return divMenu;
    }

    function renderNavigation() {

        // Create the div which contains graphingwikiBrowser navigation tabs.

        var tabs = props.tabs;

        // css classes
        var classes = classNames.tab.nav;

        var divNav = document.createElement('div');
        divNav.classList.add(classes.container);

        divNav.id = classes.container;

        var links = Object.keys(tabs);

        links.forEach(function (key) {

            var link = tabs[key];
            var divLink = d.createElement('div');
            divLink.addEventListener('click', function (event) {
                handleNavClick(key);
            });

            if (link.active) {
                divLink.classList.add(classes.item.item);
                divLink.classList.add(classes.item.active);

            } else {
                divLink.classList.add(classes.item.item);

            }

            divLink.innerHTML = link.label;

            // Fixme: clean the implementation!
            divLink.setAttribute('id', "nav-item-" + link.label.toLowerCase());
            divNav.appendChild(divLink);
        });


        return divNav;
    }

    function renderPanel() {
        var divTabContainer = d.getElementById(classNames.tab.container);

        var divPanel = d.createElement('div');

        divPanel.setAttribute('id', classNames.panel.container);
        divPanel.classList.add(classNames.panel.container);

        var menu = renderMenu();
        var tabNav = renderNavigation();
        var tabs = renderTabs();

        divPanel.appendChild(menu);
        divPanel.appendChild(tabNav);
        divPanel.appendChild(tabs);

        return divPanel;
    }

    function renderStylesContent() {
        /*
         * Implement style tab rendering here
         *
         *  styles: {
         label: "Styles",
         active: false,
         styles: [
         {


         categoryName: "category 1",
         data: "data for 1"
         },
         {
         categoryName: "category 2",
         data: "data for 2"
         }
         ]
         }
         * */

        var styles = props.tabs.styles;
        var div = document.createElement('div');
        div.setAttribute('id', "styles-content");
        var ul = document.createElement('ul');
        var cy = props.cy;

        // Todo: create configs object where to store the following..


        function styleSelectionEventListener(baseClass, category, parameter, selector, value) {

            var categoryElements = cy.elements(baseClass + '.' + category);
            categoryElements.forEach(function (e) {
                e.toggleClass(parameter + '-' + value);
                console.debug(e);

                try {
                    console.log(props.elementStyles[category]);
                    props.elementStyles[category][selector] = value;
                    console.log(props.elementStyles[category]);

                } catch (e) {
                    props.elementStyles[category] = {};
                    props.elementStyles[category][selector] = value;
                }
                /*
                 console.groupCollapsed("StyleSelection log");
                 console.log("props.elementStyles[" + category + "][" + selector + "] = " + value);
                 console.log(props.elementStyles[category][selector]);
                 console.log("Category: " + category);
                 console.log("Parameter: " + parameter);
                 console.log("State!");
                 console.log(props);
                 console.groupEnd();
                 */
            });
        }

        // Todo: make this generic version to work for all of the following use cases
        function styleSelectionDropdown(attributeId, selectionId, values) {
            var selection = d.createElement('select');
            selection.setAttribute('id', selectionId);

            selection.addEventListener('change', function () {
                var categoryElements = cy.elements('edge.' + category);
                categoryElements.forEach(function (e) {
                    console.debug(e);
                    e.toggleClass('line-style-' + selection.value);
                    console.debug(e);
                });
            });


            values.forEach(function (lineStyle) {
                var option = d.createElement('option');
                option.setAttribute('id', attributeId + "-" + lineStyle);
                option.innerHTML = lineStyle;
                selLineStyle.appendChild(option);
            });

            liParam.appendChild(selLineStyle);
            return liParam;
        }

        // Create the style option selection list
        try {
            styles.categories.forEach(function (category) {

                var divCategory = d.createElement('div');
                var hCategory = d.createElement('h4');
                hCategory.classList.add('list-header');
                hCategory.innerHTML = category;

                divCategory.appendChild(hCategory);


                var ulCategory = document.createElement('ul');
                params.forEach(function (parameter) {
                    var liParam = document.createElement('li');
                    var div = d.createElement('div');
                    var spanLabel = d.createElement('span');
                    div.classList.add('style-selection-div');

                    spanLabel.innerHTML = parameter;
                    div.appendChild(spanLabel);

                    liParam.appendChild(div);

                    // generate line style selection
                    if (parameter === 'line-style') {
                        var div = d.createElement('div');
                        var selLineStyle = d.createElement('select');
                        selLineStyle.setAttribute('id', 'select-line-style');

                        selLineStyle.addEventListener('change', function () {
                            styleSelectionEventListener(
                                'edge', category, "line-style", 'line-style', selLineStyle.value);
                        });


                        lines.forEach(function (lineStyle) {
                            var optLine = d.createElement('option');
                            optLine.setAttribute('id', 'option-line-style' + lineStyle);
                            optLine.innerHTML = lineStyle;
                            selLineStyle.appendChild(optLine);
                        });
                        div.appendChild(selLineStyle);
                        liParam.appendChild(div);
                    }
                    ulCategory.appendChild(liParam);

                    // generate arrow selection
                    if (parameter === 'arrow-shape') {
                        var selArrow = d.createElement('select');
                        selArrow.setAttribute('id', 'select-arrow-shape');
                        selArrow.addEventListener('change', function () {
                            styleSelectionEventListener(
                                'edge', category, 'arrow-shape', 'arrow-shape', selArrow.value);
                        });
                        arrows.forEach(function (arrowShape) {
                            var optArrow = d.createElement('option');
                            optArrow.setAttribute('id', 'option-arrow-shape' + arrowShape);
                            optArrow.innerHTML = arrowShape;
                            selArrow.appendChild(optArrow);
                        });
                        liParam.appendChild(selArrow);
                    }
                    ulCategory.appendChild(liParam);

                    // generate color selection
                    if (parameter === 'line-color') {
                        var selColor = d.createElement('select');
                        selColor.setAttribute('id', 'select-line-color');

                        selColor.addEventListener('change', function () {
                            styleSelectionEventListener(
                                'edge', category, "line-color", 'line-color', selColor.value);
                        });

                        colors.forEach(function (color) {
                            var optColor = d.createElement('option');
                            optColor.setAttribute('id', 'option-line-color');
                            optColor.innerHTML = color;
                            selColor.appendChild(optColor);
                        });
                        liParam.appendChild(selColor);
                    }
                    ulCategory.appendChild(liParam);

                    // generate linewidth selection
                    if (parameter === 'line-width') {
                        var selLineWidth = d.createElement('select');
                        selLineWidth.setAttribute('id', 'select-line-width');

                        selLineWidth.addEventListener('change', function () {
                            styleSelectionEventListener(
                                'edge', category, 'width', 'line-width', selLineWidth.value);
                        });


                        Array.from(Array(31).keys()).forEach(function (lineWidth) {
                            var optLineWidth = d.createElement('option');
                            optLineWidth.setAttribute('id', 'option-line-width');
                            optLineWidth.innerHTML = lineWidth;
                            selLineWidth.appendChild(optLineWidth);
                        });

                        liParam.appendChild(selLineWidth);

                    }
                    ulCategory.appendChild(liParam);

                });
                divCategory.appendChild(ulCategory);
                div.appendChild(divCategory);
            });
        } catch (e) {
            div.innerHTML = "no edge categories";
        }
        return div;
    }

    function renderTabs() {
        /*
         * Returns the container for tabs in the side panel
         */

        var tabs = props.tabs;

        var divContent = d.createElement('div');
        divContent.classList.add(classNames.tab.container);
        divContent.id = classNames.tab.container;

        // render content
        if (tabs.graphs.active) {
            divContent.appendChild(renderGraphsContent());

        } else if (tabs.elements.active) {
            divContent.appendChild(renderElementsContent());

        } else if (tabs.styles.active) {
            divContent.appendChild(renderStylesContent());
        }

        return divContent;
    }

    function renderTextPreview() {
        var divTextPreviewContainer = d.createElement('div');
        divTextPreviewContainer.classList.add(classNames.text.container);
        divTextPreviewContainer.setAttribute('id', classNames.text.container);

        var textPreviewHeader = d.createElement('div');
        textPreviewHeader.classList.add(classNames.text.header);
        textPreviewHeader.setAttribute('id', classNames.text.header);

        var textPreviewContent = d.createElement('div');
        textPreviewContent.classList.add(classNames.text.content);
        textPreviewContent.setAttribute('id', classNames.text.content);

        divTextPreviewContainer.appendChild(textPreviewHeader);
        divTextPreviewContainer.appendChild(textPreviewContent);

        return divTextPreviewContainer;
    }

    /* ---------- Tests ---------- */

    function tests() {
        var stateForTests = testState;
        console.log(stateForTests);
        console.groupCollapsed("Panel tests!");
        testAppContainerInit(stateForTests);
        testCytoscapeIntegrationInit(stateForTests);
        testGraphingWikiClientInit(stateForTests);
        testHandleNavClick(stateForTests);
        testRenderElementsContent(stateForTests);
        testRenderGraphsContent(stateForTests);
        testRenderStylesContent(stateForTests);
        testRenderTabs(stateForTests);
        testRenderMenu(stateForTests);
        console.groupEnd();
    }

    function testAppContainerInit(testState) {
        setProps(testState, 'all');
        var container = d.getElementById(props.appContainerId);
        console.log("container: " + container);
        QUnit.test("App container initialized correctly", function (assert) {
            var notUndefined = (container != 'undefined' && container != null);
            assert.ok(notUndefined, "App container is defined");
        })
    }

    function testCytoscapeIntegrationInit(testState) {
        setProps(testState, 'all');
        QUnit.test("Cytoscape container initialised", function (assert) {
            assert.deepEqual(props.cy.container().id, "cy", "cy container id = 'cy'");
            assert.ok(props.cy.container().classList.contains("graph-container"), "cy container has class 'graph-container'");
        });
    }

    function testGraphingWikiClientInit(testState) {
        setProps(testState, 'all');
        var moduleName = props.gw.getModuleName();
        QUnit.test("Test GraphingWikiClientInit", function (assert) {
            assert.equal(moduleName, "GraphingWiki client", "gwClient is initialized correctly.");
        });
    }

    function testHandleNavClick(testState) {
        setProps(testState, 'all');

        function printTabs() {
            var elements = props.tabs.elements.active;
            var graphs = props.tabs.graphs.active;
            var styles = props.tabs.styles.active;
            console.log("Activity status");
            console.log("Elements: " + elements);
            console.log("Elements: " + elements);
            console.log("Graphs: " + graphs);
            console.log("Styles: " + styles);
        }

        printTabs();

        QUnit.test("Initial states of graphingwikiBrowser activity is ok.", function (assert) {
            assert.deepEqual(props.tabs.elements.active, false);
            assert.deepEqual(props.tabs.graphs.active, false);
            assert.deepEqual(props.tabs.styles.active, true);
        });
    }

    function testRenderElementsContent(testState) {
// set context for tests
        console.group("testRenderStylesContent()");
        setProps(testState, 'all');
        var elementsContent = renderElementsContent();
        QUnit.test("Rendering the elements tab", function (assert) {
            assert.equal(elementsContent.id, "elements-content", "renderElementsContent() returns div with proper id");
        });

        console.groupEnd();
    }

    function testRenderMenu(testState) {
        setProps(testState, 'all');
        var classes = classNames.menu;
        var menuContainer = renderMenu();
        var childs = menuContainer.childNodes;
        var childsHaveCorrectIds = true;


        childs.forEach(function (element) {
            var starts = element.id.startsWith("panel-menu__item__");
            childsHaveCorrectIds = childsHaveCorrectIds && starts;
        });

        QUnit.test("renderMenu() tests", function (assert) {
            assert.ok(true, "Executes");
            assert.equal(
                menuContainer.id, classes.container,
                "Returns div container with correct id.");
            assert.ok(childsHaveCorrectIds, "Container childs have correct ids.");
        });
    }

    function testRenderGraphsContent(testState) {
// set context for tests
        console.group("testRenderGraphsContent()");
        setProps(testState, 'all');
        var classes = classNames.tab.graph;
        var graphsContent = renderGraphsContent();
        var firstChild = graphsContent.childNodes[0];
        QUnit.test("Rendering the graphs tab", function (assert) {
            assert.equal(graphsContent.id, classes.container, "renderGraphsContent() returns div with proper id");
            assert.equal(firstChild.tagName, "UL", "renderGraphsContent() first child is a list element");
        });


        console.groupEnd();
    }

    function testRenderStylesContent(testState) {
// set context for tests

        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesContent = renderStylesContent();
        QUnit.test("Rendering the graphs tab", function (assert) {
            assert.equal(stylesContent.id, "styles-content", "renderStylesContent() returns div with proper id");
        });
    }

    function testRenderTabs() {
        setProps(testState, 'all');
        var tabs = renderTabs();
        QUnit.test("RenderTabs()", function (assert) {
            assert.ok(tabs, "happening");
        });
    }


    /* ---------- Public methods ---------- */

    /*
     *   Todo: do just start method?
     */

    return {

        start: function (props) {
            setProps(props, "all");
            render();
            initCytoscape();
        },

        updateStylesContent: function (newCategories, styles) {
            setProps(styleProps, 'styles');
            renderStylesContent(newCategories, styles);
        },

        updateElementsContent: function (elementsProps, styles) {
            setProps(elementProps, 'elements');
            renderElementsContent()
        },

        updateProps: function (newProps, selector) {
            setProps(newProps, selector);
            console.debug(props);
        },

        getEdgeCategories: function () {
            var categories = props.tabs.styles.categories;
            if (categories === 'undefined') {
                return []
            } else {
                return categories;
            }
        },

        state: function () {
            // for debugging purposes in the console
            return props;
        },

        runTests: function () {
            tests();
        }
    }

})();

graphingwikiBrowser.start(testState);






