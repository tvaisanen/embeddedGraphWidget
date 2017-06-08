/**
 * Created by toni on 31.5.2017.
 */
console.info('Initializing cytoscape element..');


var cy = cytoscape({
    container: document.getElementById('cy'),
    elements: [{group: 'nodes', data: {id: 'personA'}}],
    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'size': '40',
                'label': 'data(id)'
            }
        },

        {
            selector: 'node.highlight',
            style: {
                'background-color': '#c6c6c6',
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'overlay-padding': 1
            }
        },

        {
            selector: 'edge.foo',
            style: {
                'width': 3,
                'line-color': '#cc1244',
                'line-style': 'dashed',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }
        },

        {
            selector: 'edge._notype',
            style: {
                'width': 3,
                'line-color': '#002fcc',
                'line-style': 'dotted',
                'target-arrow-color': '#ffffff',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }
        },

        {
            selector: 'edge.gwikicategory',
            style: {
                'width': 3,
                'line-color': '#0fcc12',
                'line-style': 'dotted',
                'target-arrow-color': '#ffffff',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }
        }
    ],
});

cy.on('tap', 'node', function (evt) {

    var node = evt.target;

    var posX = node.position().x;
    var posY = node.position().y;

    var nodeId = node.id();
    var newNodes = [];

    // var nodePromise = fetchNode('', nodeId);
    console.debug('Clicked: ' + nodeId);
    var nodePromise = gwClient.getNodeData(nodeId);
    console.debug("Got the node!");
    console.debug(nodePromise);

    nodePromise.then(function (node) {

        console.info('Inside promises THEN');
        console.info(nodePromise);
        console.info(node);


        try {

            console.debug('node.data: ' + JSON.stringify(node.data.out));
            console.debug(node.data.out);
            // update existing categories with new ones
            var newCategoriesIn = [];



            for (var k in node.data.out) newCategoriesIn.push(k);
            updateCategories(newCategoriesIn);


            newCategoriesIn.forEach(function (category) {
                /*
                 *  Iterate the outgoing connections for each category
                 *
                 * */
                var nodesConnectedTo = node.data.out[category];
                console.groupCollapsed('Iterating outgoing edges');
                console.info('category: ' + category);
                console.info('connected to: ' + nodesConnectedTo);
                console.groupEnd();
                nodesConnectedTo.forEach(function (node) {
                    console.groupCollapsed('Creating new node with connection');
                    try {
                        var exists = cy.getElementById(node).isNode();
                        console.info(node + " is already in the graph: " + exists);
                    } catch (error) {
                        console.error(error);
                    }

                    console.groupEnd();
                    // Create new node if the node does not exist yet
                    if (!cy.getElementById(node).isNode()) {
                        console.info()
                        var newNode = {
                            group: 'nodes',
                            data: {
                                id: node,
                                position: {
                                    x: posX + Math.floor((Math.random() * 100) + 1) - 50,
                                    y: posY + Math.floor((Math.random() * 100) + 1) - 50
                                }
                            }
                        };
                        cy.add(newNode);
                    }
                    var edgeId = nodeId + "_to_" + node;
                    var newEdge = {
                        group: 'edges',
                        data: {
                            id: nodeId + "_to_" + node,
                            category: category,
                            source: nodeId,
                            target: node
                        }
                    };

                    cy.add(newEdge);
                    var e = cy.getElementById(edgeId);
                    console.group("Debugging edge classes");
                    console.info(e.id() + " gets class: " + category);
                    console.info("classes: ");
                    console.info(e.classes());
                    e.addClass(category);
                    console.info(e.id() + "HAS CLASS " + category + ": " + e.hasClass(category));
                    console.groupEnd();
                })
            });

            var newCategoriesOut = [];
            for (var k in node.data.in) newCategoriesOut.push(k);
            updateCategories(newCategoriesOut);

            newCategoriesOut.forEach(function (category) {

                var nodesConnectedInto = node.data.in[category];
                console.groupCollapsed('Iterating outgoing edges');
                console.info('category: ' + category);
                console.info('connected to: ' + nodesConnectedInto);
                console.groupEnd();
                nodesConnectedInto.forEach(function (node) {
                    console.groupCollapsed('Creating new node with connection');
                    console.info(node + " is already in the graph: " + cy.getElementById(node).isNode());
                    console.groupEnd();
                    // Create new node if the node does not exist yet
                    if (!cy.getElementById(node).isNode()) {
                        console.info()
                        var newNode = {
                            group: 'nodes',
                            data: {
                                id: node,
                                position: {
                                    x: posX + Math.floor((Math.random() * 100) + 1) - 50,
                                    y: posY + Math.floor((Math.random() * 100) + 1) - 50
                                }
                            }
                        };
                        cy.add(newNode);
                    }
                    var edgeId = node + "_to_" + nodeId;
                    var newEdge = {
                        group: 'edges',
                        data: {
                            id: node + "_to_" + nodeId,
                            category: category,
                            source: node,
                            target: nodeId
                        }
                    };

                    cy.add(newEdge);
                    var e = cy.getElementById(edgeId);

                    console.info(e.id() + " gets class: " + category);
                    console.info("classes: ");
                    console.info(e.classes());
                    e.addClass(category);
                    console.info(e.id() + "HAS CLASS " + category + ": " + e.hasClass(category));
                })
            });


            setAndRunLayout();
        } catch (error) {
            console.error(error);
            console.info('no outgoing edges');
        }


    });
});

var state = {
    containerId: "panel",
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
            label: "Elements",
            active: false,
            data: "Data for elements"
        },
        styles: {
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

var lineStyleOptions = {
    'width': 'integer',
    'line-color': 'rgb',
    'line-style': [],
    'target-arrow-color': 'rgb',
    'target-arrow-shape': [],
    'curve-style': []
};


/*
 store link categories
 update when new nodes are added
 */
var categories = [];


function arrayContains(array, value) {
    return array.indexOf(value) !== -1;
}




function categoryList(categories, styles) {

}



function updateCategories(newCategories) {
    /*
     when: A new node is loaded.
     why: To add new possible categories.
     how: [( the category is already listed ) ? do nothing : add new category to list]
     CategoryStyles is the function, which handles the updating.
     */

    // this is what is passed to renderStyles -function.
    var newUniqueCategories = [];

    // this could be written with reducer Todo ?
    newCategories.forEach(function (category) {
        if (categories.indexOf(category) === -1) {
            newUniqueCategories.push(category);
            categories.push(category);
        }
    });

    panel.updateStylesContent(newUniqueCategories, cy.style().json());

}


/* If graph_json hasn't been initialized correctly
 *  Initialize it by loading the nodes
 */
if (typeof graph_json === 'undefined') {
    // window.alert("This feature is still under development. Unfortunately this page isn't yet supported.");
}


// initialize download image link

function downloadGraphPNG() {
    console.info('running downloadGraphPNG() -function')
    var png = cy.png();
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

function handleLoadGraph() {
    var graphId = document.getElementById('graph-query').value;
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
        var newGraphData = response.data;
    });
}

var loadGraphButton = document.querySelector('#load-graph-button');
loadGraphButton.addEventListener('click', handleLoadGraph);

// Dynamic CSS: cy.style().selector('edge.foo').style('line-color', 'magenta').update()


function loadNewGraph(initData) {
    cy.destroy();
    cy = cytoscape(initData);
}


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
        var newGraphData = response.data;
    });
}

var loadGraphsButton = document.querySelector('#load-graphs-button');
loadGraphsButton.addEventListener('click', loadGraphList);

console.log(panel);
console.log(typeof state);
console.log(state);
panel.render(state);













