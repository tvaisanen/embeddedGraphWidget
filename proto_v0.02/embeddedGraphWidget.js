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
                'background-color': '#dd0013',
            }
        },

        {
            selector: 'node.hover-on',
            style: {
                'background-color': '#00dd10',
            }
        },

        {
            selector: 'edge',
            style: {
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
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

        {selector: 'edge.arrow-shape-tee', style: {'target-arrow-shape': 'tee'}},
        {selector: 'edge.arrow-shape-triangle', style: {'target-arrow-shape': 'triangle'}},
        {selector: 'edge.arrow-shape-triangle-tee', style: {'target-arrow-shape': 'triangle-tee'}},
        {selector: 'edge.arrow-shape-triangle-cross', style: {'target-arrow-shape': 'triangle-cross'}},
        {selector: 'edge.arrow-shape-triangle-backcurve', style: {'target-arrow-shape': 'triangle-backcurve'}},
        {selector: 'edge.arrow-shape-square', style: {'target-arrow-shape': 'square'}},
        {selector: 'edge.arrow-shape-circle', style: {'target-arrow-shape': 'circle'}},
        {selector: 'edge.arrow-shape-diamond', style: {'target-arrow-shape': 'diamond'}},
        {selector: 'edge.arrow-shape-none', style: {'target-arrow-shape': 'none'}},

        {selector: 'edge.line-color-red', style: {'line-color': 'red'}},
        {selector: 'edge.line-color-green', style: {'line-color': 'green'}},
        {selector: 'edge.line-color-orange', style: {'line-color': 'orange'}},
        {selector: 'edge.line-color-yellow', style: {'line-color': 'yellow'}},
        {selector: 'edge.line-color-cyan', style: {'line-color': 'cyan'}},
        {selector: 'edge.line-color-blue', style: {'line-color': 'blue'}},

        {selector: 'edge.arrow-color-red', style: {'arrow-color': 'red'}},
        {selector: 'edge.arrow-color-green', style: {'arrow-color': 'green'}},
        {selector: 'edge.arrow-color-orange', style: {'arrow-color': 'orange'}},
        {selector: 'edge.arrow-color-yellow', style: {'arrow-color': 'yellow'}},
        {selector: 'edge.arrow-color-cyan', style: {'arrow-color': 'cyan'}},
        {selector: 'edge.arrow-color-blue', style: {'arrow-color': 'blue'}},


        {
            selector: 'edge.foo',
            style: {

                'target-arrow-color': '#000000',
                'curve-style': 'bezier',
            }
        },

        {
            selector: 'edge._notype',
            style: {

                'target-arrow-color': '#ffffff',
                'curve-style': 'bezier',
            }
        },

        {
            selector: 'edge.gwikicategory',
            style: {

                'target-arrow-color': '#ffffff',

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

            console.group("%cCategory info!", "color:green;size:15px");

            // this is stupid.. todo: Do it better!
            console.info(node.data.out);
            console.info(Object.keys(node.data.out));

            var newCategoriesIn = Object.keys(node.data.out);
            updateCategories(newCategoriesIn);
            console.groupEnd();


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
                        //cy.getElementById(node).toggleClass('highlight');
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
                    //e.toggleClass('highlight');
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
                    if (!cy.getElementById(edgeId).isEdge()) {
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
                    }

                    // Todo: make it so that, edge will have only one category
                    var e = cy.getElementById(edgeId);

                    console.log(e.id() + " has class '_notype': " + e.hasClass('_notype'));

                    console.log(e.id() + " has class "+ category + ": " + e.hasClass('_notype'));
                    if (e.hasClass('_notype') && category != '_notype'){
                        e.removeClass('_notype');
                    }

                    e.addClass(category);

                    console.info(e.id() + " gets class: " + category);
                    console.info("classes: ");
                    console.info(e.classes());
                    console.info(e.id() + " has class " + category + ": " + e.hasClass(category));
                })
            });


            setAndRunLayout();
        } catch (error) {
            console.error(error);
            console.info('no outgoing edges');
        }


    });
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


function loadNewGraph(graphId) {
    var graphPromise = gwClient.getGraph(graphId);
    var graph = graphPromise.then(function(response){
        var json = response.json;
        console.log("response ok biby: " + JSON.stringify(json));
        return json;
    }).then(function (json){
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

console.log(panel);
console.log(typeof state);
console.log(state);
panel.render(state);













