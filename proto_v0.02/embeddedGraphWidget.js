/**
 * Created by toni on 31.5.2017.
 */

// <button class="btn-toggle-edit" id="toggle-edit-button">Edit!</button>
console.info('Initializing cytoscape element..');


var cy = cytoscape({
    container: document.getElementById('cy'),
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
                'background-color': '#02a6ff',
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

        {selector: 'edge.width-0', style: {'width': 0}},
        {selector: 'edge.width-1', style: {'width': 1}},
        {selector: 'edge.width-2', style: {'width': 2}},
        {selector: 'edge.width-3', style: {'width': 3}},
        {selector: 'edge.width-4', style: {'width': 4}},
        {selector: 'edge.width-5', style: {'width': 5}},
        {selector: 'edge.width-6', style: {'width': 6}},
        {selector: 'edge.width-7', style: {'width': 7}},
        {selector: 'edge.width-8', style: {'width': 8}},
        {selector: 'edge.width-9', style: {'width': 9}},
        {selector: 'edge.width-9', style: {'width': 10}},
        {selector: 'edge.width-10', style: {'width': 11}},
        {selector: 'edge.width-12', style: {'width': 12}},
        {selector: 'edge.width-13', style: {'width': 13}},
        {selector: 'edge.width-14', style: {'width': 14}},
        {selector: 'edge.width-15', style: {'width': 15}},
        {selector: 'edge.width-16', style: {'width': 16}},
        {selector: 'edge.width-17', style: {'width': 17}},
        {selector: 'edge.width-18', style: {'width': 18}},
        {selector: 'edge.width-19', style: {'width': 19}},
        {selector: 'edge.width-20', style: {'width': 20}},
        {selector: 'edge.width-21', style: {'width': 21}},
        {selector: 'edge.width-22', style: {'width': 22}},
        {selector: 'edge.width-23', style: {'width': 23}},
        {selector: 'edge.width-24', style: {'width': 24}},
        {selector: 'edge.width-25', style: {'width': 25}},
        {selector: 'edge.width-26', style: {'width': 26}},
        {selector: 'edge.width-27', style: {'width': 27}},
        {selector: 'edge.width-28', style: {'width': 28}},
        {selector: 'edge.width-29', style: {'width': 29}},
        {selector: 'edge.width-30', style: {'width': 30}},

        {selector: 'edge.arrow-shape-tee', style: {'target-arrow-shape': 'tee'}},
        {selector: 'edge.arrow-shape-triangle', style: {'target-arrow-shape': 'triangle'}},
        {selector: 'edge.arrow-shape-triangle-tee', style: {'target-arrow-shape': 'triangle-tee'}},
        {selector: 'edge.arrow-shape-triangle-cross', style: {'target-arrow-shape': 'triangle-cross'}},
        {selector: 'edge.arrow-shape-triangle-backcurve', style: {'target-arrow-shape': 'triangle-backcurve'}},
        {selector: 'edge.arrow-shape-square', style: {'target-arrow-shape': 'square'}},
        {selector: 'edge.arrow-shape-circle', style: {'target-arrow-shape': 'circle'}},
        {selector: 'edge.arrow-shape-diamond', style: {'target-arrow-shape': 'diamond'}},
        {selector: 'edge.arrow-shape-none', style: {'target-arrow-shape': 'none'}},

        {selector: 'edge.line-color-red', style: {'line-color': 'red', 'arrow-color': 'red'}},
        {selector: 'edge.line-color-green', style: {'line-color': 'green', 'arrow-color': 'green'}},
        {selector: 'edge.line-color-orange', style: {'line-color': 'orange', 'arrow-color': 'orange'}},
        {selector: 'edge.line-color-yellow', style: {'line-color': 'yellow', 'arrow-color': 'yellow'}},
        {selector: 'edge.line-color-cyan', style: {'line-color': 'cyan', 'arrow-color': 'cyan'}},
        {selector: 'edge.line-color-blue', style: {'line-color': 'blue', 'arrow-color': 'blue'}},


        {
            selector: 'edge.foo',
            style: {
                'curve-style': 'bezier',
            }
        },

        {
            selector: 'edge._notype',
            style: {
                'curve-style': 'bezier',
            }
        },

        {
            selector: 'edge.gwikicategory',
            style: {
                'curve-style': 'bezier',
            }
        },

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

cy.on('tap', 'node', function (evt) {

    var node = evt.target;
    var nodeId = node.id();

    function createNewNode(id) {

        // Create new node.
        var newNode = {
            group: 'nodes',
            data: {
                id: id
            }
        };

        // Add the new node to cy.elements.
        cy.add(newNode);
    }

    function createNewEdge(sourceId, targetId) {

        // Create new edge.
        var newEdge = {
            group: 'edges',
            data: {
                id: sourceId + "_to_" + targetId,
                source: sourceId,
                target: targetId
            }
        };

        // Add the new edge to cy.elements.
        cy.add(newEdge);
    }

    function addClassToEdge(edgeId, classToAdd) {

        // Get element reference to the edge with edgeId.
        var edge = cy.getElementById(edgeId);

        // Check if the edge does not have a category set.
        var edgeDoesNotHaveAnyCategory = false;
        var vals = panel.elementHasOneOfCategories(edge);

        // Todo: Learn to use reducers!
        vals.forEach(function(b){
            edgeDoesNotHaveAnyCategory = edgeDoesNotHaveAnyCategory || b;
        });



        /* If element edgeId has class '_notype' (= edgeDoesNotHaveCategory)
         * and current class classToAdd is not '_notype'. Remove the '_notype'
         * and replace it with the classToAdd. If the edge does not have class
         * defined yet, set class as classToAdd. Even if it is '_notype'
         */

        // Todo: simplify


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
    }

    function createNodesAndEdgesBetween(sourceNodeId, targetNodeId, classForEdge) {

        // Check if the source node already exists.
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
            createNewEdge(sourceNodeId, targetNodeId);
        }

        addClassToEdge(edgeId, classForEdge);

    }

    function createEdgesToNodes(sourceNodeId, nodesToCreateEdges, category) {

        /*
         * Iterate through the nodesToCreateEdges array and add
         * edges between the source node and target nodes.
         * If the target node does not exist yet, create and add
         * the node to cy.elements.
         */
        nodesToCreateEdges.forEach(function (targetNodeId) {

            createNodesAndEdgesBetween(sourceNodeId, targetNodeId, category);

        });
    }

    function createEdgesFromNodes(targetNodeId, nodesFromCreateEdges, category) {
        nodesFromCreateEdges.forEach(function (sourceNodeId) {
            createNodesAndEdgesBetween(sourceNodeId, targetNodeId, category);
        });
    }

    // set panel status message
    panel.updateStatusMessage("");

    // Get data for the clicked node.
    var nodePromise = gwClient.getNodeData(nodeId);

    // When the requested data is ready to be used.
    nodePromise.then(function (node) {

            try {
                // If node has outgoing edges refresh the categories
                var nodeHasOutgoingEdges = (node.data.out != 'undefined');
                var newCategoriesOut = [];

                if (nodeHasOutgoingEdges) {
                    newCategoriesOut = Object.keys(node.data.out);
                    updateCategories(newCategoriesOut);
                }

                // Iterate the outgoing edge categories.
                newCategoriesOut.forEach(function (category) {

                    // get list of nodes where the clicked node is connected to
                    var nodesConnectedTo = node.data.out[category];

                    // for each connected node create a new edge
                    createEdgesToNodes(nodeId, nodesConnectedTo, category);

                });

                var newCategoriesIn = Object.keys(node.data.in);
                updateCategories(newCategoriesIn);

                // Iterate the incoming edge categories.
                newCategoriesIn.forEach(function (category) {
                    var nodesConnectedTo = node.data.in[category];
                    createEdgesFromNodes(nodeId, nodesConnectedTo, category);
                });
            } catch (e) {

            }
            setAndRunLayout();
            panel.refreshPanel();
            panel.updateStatusMessage("");
        }
    );
});

/*
 cy.on('mouseover', 'node', function (evt) {
 var node = evt.target;
 var nodeId = node.id();
 console.log("mouseover " + nodeId);

 var neighborhood = node.neighborhood('node');
 var edges = node.neighborhood('edge');
 node.toggleClass('hover-on');
 try {
 neighborhood.forEach(function (e) {
 e.toggleClass('highlight');
 });
 edges.forEach(function(e){
 e.toggleClass('highlight');
 });
 }
 catch (e) {
 console.info("there is no neighbourhood");
 }
 });

 cy.on('mouseout', 'node', function (evt) {
 var node = evt.target;
 var nodeId = node.id();
 console.log("mouseover " + nodeId);

 var neighborhood = node.neighborhood('node');
 var edges = node.neighborhood('edge');
 node.toggleClass('hover-on');
 try {
 neighborhood.forEach(function (e) {
 e.toggleClass('highlight');
 });
 edges.forEach(function(e){
 e.toggleClass('highlight');
 });
 }
 catch (e) {
 console.info("there is no neighbourhood");
 }
 });
 */


var state = {
    containerId: "panel",
    editMode: false,
    gw: gwClient,
    cy: cy,
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
            categories: [],
            label: "Styles",
            active: false,
            styles: [
                {
                    name: "category 1",
                    data: "data for 1"
                },
                {
                    name: "category 2",
                    data: "data for 2"
                }
            ]
        }
    }
};


var configs = {
// This is a proxy server for development
    API_PATH: 'http://127.0.0.1:5000/'
};


gwClient.setConfigs(configs);

function categoryList(categories, styles) {

}

function updateCategories(newCategories) {
    /*
     when: A new node is loaded.
     why: To add new possible categories.
     how: [( the category is already listed ) ? do nothing : add new category to panel props list]
     CategoryStyles is the function, which handles the updating.
     */

// get current categories from the panel
    var categoriesToUpdate = panel.getEdgeCategories();

// this could be written with reducer Todo ?
    newCategories.forEach(function (category) {
        if (categoriesToUpdate.indexOf(category) === -1) {
            categoriesToUpdate.push(category);
        }
    });

    var styleProps = state.tabs.styles;
    styleProps.categories = categoriesToUpdate;

    panel.updateProps(styleProps, 'styles');
}


// initialize download image link
function downloadGraphPNG() {
    console.info('running downloadGraphPNG() -function')
    var png = cy.png({bg: 'white'});
    var a = document.createElement('a');

    a.href = png;
    a.download = 'image.png';
    console.debug(a);
    a.click()
}

var downloadGraphButton = document.querySelector('#download-graph-button');
downloadGraphButton.addEventListener('click', downloadGraphPNG);


// initialize run layout button action

function setAndRunLayout() {
    console.info("running 'setAndRunLayout()'-function")
    var layoutOption = document.querySelector('#layout-options').value;
    var layout = cy.makeLayout({name: layoutOption})
    layout.run();
}

var runLayoutButton = document.querySelector('#run-layout-button');
runLayoutButton.addEventListener('click', setAndRunLayout);

function addNode(node) {
    cy.add(node);
}


function handleSaveGraph() {
    var developmentPath = 'http://127.0.0.1:5000/save/';
    var graphToSave = cy.json();
    var graphId = document.getElementById('graph-name').value;
    var payload = {
        id: graphId,
        data: graphToSave
    };
    console.log("GRAPHID: " + graphId);
    console.debug(graphToSave);
    var saveGraphRequest = new Request(developmentPath, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'post',
        body: JSON.stringify(payload)
    });
    console.debug(saveGraphRequest);
    var promise = fetch(saveGraphRequest);
    promise.then(function (response) {
        console.log(response);
    })
}

var saveGraphButton = document.querySelector('#save-graph-button');
saveGraphButton.addEventListener('click', handleSaveGraph);

function handleLoadGraph(graphId) {
    var developmentPath = 'http://127.0.0.1:5000/graph/' + graphId;
    console.log("GRAPHID: " + graphId);
    var loadGraphRequest = new Request(developmentPath, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'get'
    });
    console.debug(loadGraphRequest);
    var promise = fetch(loadGraphRequest);
    promise.then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            var json = response.json(); // there's always a body
            console.debug(json);
            console.debug(response.ok);
            return json;
        } else {
            return json.then(Promise.reject.bind(Promise));
        }
    }).then(function (response) {
        console.log(response);
        panel.cy = response.data;
    });
}

// Dynamic CSS: cy.style().selector('edge.foo').style('line-color', 'magenta').update()


function loadNewGraph(graphId) {
    var graphPromise = gwClient.getGraph(graphId);
    var graph = graphPromise.then(function (response) {
        var json = response.json;
        console.log("response ok biby: " + JSON.stringify(json));
        return json;
    }).then(function (json) {
        console.log('ok biby ' + JSON.stringify(json));
        return json;
    });
}

var newGraphData

function loadGraphList() {
    var developmentPath = 'http://127.0.0.1:5000/graphs';
    console.log("Loading graphs");
    var loadGraphsRequest = new Request(developmentPath, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'get'
    });
    var promise = fetch(loadGraphsRequest);
    promise.then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            var json = response.json(); // there's always a body
            console.debug(json);
            console.debug(response.ok);
            return json;
        } else {
            return json.then(Promise.reject.bind(Promise));
        }
    }).then(function (response) {
        console.log(response);
        newGraphData = response.data;
    });
}

var loadGraphsButton = document.querySelector('#load-graphs-button');
loadGraphsButton.addEventListener('click', loadGraphList);

var loadGraphsButton = document.querySelector('#toggle-edit-button');
loadGraphsButton.addEventListener('click', panel.toggleEditMode);

var divSearch = document.getElementById('header-search');
var inSearch = document.createElement('input');

inSearch.setAttribute('type', 'input');

panel.render(state);













