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
var initialCy = cytoscape({
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
var testState = {
    containerId: "panel",
    gw: gwClient,
    cy: initialCy,
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
            categories: [
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
var categoryStyles = {
    default: {
        'line-style': 'solid',
        'line-color': 'black',
        'line-width': '8px',
        'arrow-shape': 'triangle'
    }

};

var panel = (function (gwClient, cy) {

    var props;

    var statusMessage = d.getElementById("status-message");

    var classNames = {
        container: 'panel',
        menu: {
            container: 'panel-menu',
            item: {
                active: 'panel-menu__menu-item--active',
                inactive: 'panel-menu__menu-item--inactive'
            }
        },
        tab: {
            nav: {
                container: 'tab-nav',
                item: {
                    active: 'tab-nav__nav-item--active',
                    inactive: 'tab-nav__nav-item--inactive'
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
        }
    };

    /*
    *   Functions for generating the content for
    *   menu items inside the panel.
    *
    * */

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
        }
    };

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
            promise.then(function (response){
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

    function renderMenu() {

        // Create the div which contains panel navigation tabs.
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

    function testRenderMenu(testState){
        setProps(testState, 'all');
        var classes = classNames.menu;
        var menuContainer = renderMenu();
        var childs = menuContainer.childNodes;
        var childsHaveCorrectIds = true;
        console.group("writing renderMenu() tests");
        console.log(childs);
        console.groupEnd();
        childs.forEach(function(element){
           var starts = element.id.startsWith("panel-menu__item__");
           childsHaveCorrectIds = childsHaveCorrectIds && starts;
           console.log(element.id);
           console.log(starts);
        });
        QUnit.test("renderMenu() tests", function(assert){
            assert.ok(true, "Executes");
            assert.equal(menuContainer.id, classes.container, "Returns div container with correct id.");
            assert.ok(childsHaveCorrectIds, "Container childs have correct ids.");
        });
    }

    /* ########################################### */

    function downloadGraphPNG() {
    console.info('running downloadGraphPNG() -function')
    var png = props.cy.png({bg: 'white'});
    var a = document.createElement('a');

    a.href = png;
    a.download = 'graph.png';
    console.debug(a);
    a.click()
}

    function setStatusMessage(text) {
        var statusMessage = d.getElementById("status-message");
        statusMessage.innerHTML = text;
    }

    function toggleStatusActivity() {
        var infoPanel = d.getElementById("info-panel");
        var active = infoPanel.classList.contains('info-messages__ready');

        if (active) {
            infoPanel.classList.remove('info-messages__ready');
            infoPanel.classList.add('info-messages__loading');
        } else {
            infoPanel.classList.add('info-messages__ready');
            infoPanel.classList.remove('info-messages__loading');
        }


    }

    function renderGraphsContent() {
        /*
         * Implement graphs tab rendering here
         *
         * */
        console.groupCollapsed('Debug GraphsContent()');
        var content = props.tabs.graphs;
        var cy = props.cy;
        var classes = classNames.tab.graph;

        var div = document.createElement('div');
        var ul = document.createElement('ul');

        div.setAttribute('id', classes.container);

        var graphListPromise = props.gw.getGraphList();
        console.debug(graphListPromise);
        graphListPromise.then(function (response) {
            console.debug(response);
            return response.json();

        }).then(function (json) {
            var graphs = json.data;
            console.debug(json);
            graphs.forEach(function (graph) {
                var li = document.createElement('li');
                li.classList.add(classes.listItem.inactive);
                li.innerHTML = graph;

                li.addEventListener('click', function () {
                    console.log("clicked: " + graph);
                    if (true /*confirm('Are you sure that you want to change the graph?')*/) {
                        var graphPromise = gwClient.getGraph('graph/' + graph);
                        graphPromise.then(function (response) {
                            var json = response.json();
                            console.log(json);
                            return json;
                        }).then(function (json) {
                            console.log(json.data);
                            cy.destroy();
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

    function testRenderGraphsContent(testState) {
// set context for tests
        console.group("testRenderGraphsContent()");
        setProps(testState, 'all');
        var classes = classNames.tab.graph;
        var graphsContent = renderGraphsContent();
        var firstChild = graphsContent.childNodes[0];
        QUnit.test("Rendering the graphs tab", function(assert){
            assert.equal(graphsContent.id, classes.container, "renderGraphsContent() returns div with proper id");
            assert.equal(firstChild.tagName, "UL", "renderGraphsContent() first child is a list element");
        });


        console.groupEnd();
    }

    function testGraphingWikiClientInit(testState) {
        setProps(testState, 'all');
        var moduleName = props.gw.getModuleName();
        QUnit.test("Test GraphingWikiClientInit", function (assert){
            assert.equal(moduleName, "GraphingWiki client", "gwClient is initialized correctly.");
        });

    }

    function testCytoscapeIntegrationInit(testState) {
        setProps(testState, 'all');
        console.group("test that the cytoscape is integrated correctly");
        console.log(props);
        console.log("props.cy: " + props.cy.id);
        cyContainer = props.cy.container();

        QUnit.test("Cytoscape container initialised", function(assert){
            assert.deepEqual(cyContainer.id, "cy", "cy container id = 'cy'");
            assert.ok(cyContainer.classList.contains("graph"), "cy container has class 'graph'");
        });


        // assert(cyId == "cy", "Cytoscape initialized correctly?");
        console.groupEnd();
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
            updatePanel();
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

        function loadPageText(param){
            console.log("load page text");
            var textPromise = gw.getPageText(param);
            var textPrevievContainer = d.getElementById("text-preview");
            var textContainerHeader = d.getElementById("text-preview__header");
            var textContent = d.getElementById("text-preview__content");
            textPromise.then(function(response){
                return response.json();
            }).then(function(json){
                var text = json.data;
                textContent.innerHTML = text;
            });
            textContainerHeader.innerHTML = param;
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

    function testRenderElementsContent(testState) {
// set context for tests
        console.group("testRenderStylesContent()");
        setProps(testState, 'all');
        var elementsContent = renderElementsContent();
        QUnit.test("Rendering the elements tab", function(assert){
            assert.equal(elementsContent.id, "elements-content", "renderElementsContent() returns div with proper id");
        });

        console.groupEnd();
    }

    // Todo: Refactor!
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
                console.debug(e);
                e.toggleClass(parameter + '-' + value);
                console.debug(e);

                try {
                    props.elementStyles[category][selector] = value;

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
                console.log(category);

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
        } catch (e){
            div.innerHTML = "no edge categories";
        }
        return div;
    }

    function testRenderStylesContent(testState) {
// set context for tests
        console.group("testRenderStylesContent()");
        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesContent = renderStylesContent();
        QUnit.test("Rendering the graphs tab", function(assert){
            assert.equal(stylesContent.id, "styles-content", "renderStylesContent() returns div with proper id");
        });
        console.groupEnd();
    }

    function handleNavClick(keyToActivate) {

        var tabs = props.tabs;
// toggle all navlink classes to inactive
        var links = Object.keys(tabs);
        links.forEach(function (key) {
            tabs[key].active = false;
        });

// activate clicked navlink
        tabs[keyToActivate].active = true;

        updatePanel();
    }

    function testHandleNavClick(testState) {
        setProps(testState, 'all');

        function printTabs(){
            var elements = props.tabs.elements.active;
            var graphs = props.tabs.graphs.active;
            var styles = props.tabs.styles.active;
            console.log("Activity status");
            console.log("Elements: " + elements);
            console.log("Graphs: " + graphs);
            console.log("Styles: " + styles);
        }

        printTabs();

        QUnit.test("Initial states of panel activity is ok.", function(assert){
            assert.deepEqual(props.tabs.elements.active, false);
            assert.deepEqual(props.tabs.graphs.active, false);
            assert.deepEqual(props.tabs.styles.active, true);
        });

    }

    function renderNavigation() {

        // Create the div which contains panel navigation tabs.


        var tabs = props.tabs;

        // css classes
        var classes = classNames.tab.nav;

        var divNav = document.createElement('div');
        divNav.classList.add(classes.container);

        divNav.id = "panel-nav";

        var links = Object.keys(tabs);

        links.forEach(function (key) {

            var link = tabs[key];
            var divLink = d.createElement('div');

            if (link.active) {
                divLink.classList.add(classes.item.active);

            } else {
                divLink.classList.add(classes.item.inactive);
                divLink.addEventListener('click', function (event) {
                    handleNavClick(key);
                });
            }

            divLink.innerHTML = link.label;
            divNav.appendChild(divLink);
        });


        return divNav;
    }

    function updatePanel() {

        var divMenu = d.getElementById('panel-menu');
        var divNav = d.getElementById('panel-nav');
        var divContent = d.getElementById('panel-content');
        var childsToRemove = divMenu.childNodes;

        /*
         console.log(childsToRemove);
         console.log(typeof childsToRemove);
         */
        childsToRemove.forEach(function (child) {
            divMenu.remove(child);
        });

        childsToRemove = divNav.childNodes;
        childsToRemove.forEach(function (child) {
            divNav.remove(child);
        });

        childsToRemove = divContent.childNodes;
        childsToRemove.forEach(function (child) {
            divContent.remove(child);
        });


        renderPanel();
        renderContent();
    }

    function changeContentView() {

    }

    function renderContent() {

        var tabs = props.tabs;

        var divContent = d.createElement('div');
        divContent.id = "panel-content";

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

    function renderPanel() {
        var content = props.tabs;
        var container = document.getElementById(props.containerId);
        container.appendChild(renderMenu(content));
        container.appendChild(renderNavigation(content));
        container.appendChild(renderContent(content));
    }

    function toggleMode() {
        props.editMode = !props.editMode;
        var cyContainer = d.getElementById('cy');
        var panelContainer = d.getElementById('panel');
        if (props.editMode) {
            panelContainer.classList.remove('panel-hidden');
            cyContainer.classList.remove('graph-view-full');
        } else {
            panelContainer.classList.add('panel-hidden');
            cyContainer.classList.add('graph-view-full');
        }
    }

    function tests() {
        var stateForTests = testState;
        console.log(stateForTests);
        console.group("Panel tests!");
        testAppContainerInit(stateForTests);
        testCytoscapeIntegrationInit(stateForTests);
        testGraphingWikiClientInit(stateForTests);
        testHandleNavClick(stateForTests);
        testRenderElementsContent(stateForTests);
        testRenderGraphsContent(stateForTests);
        testRenderStylesContent(stateForTests);
        testRenderMenu(stateForTests);
        console.groupEnd();
    }

    function testAppContainerInit(testState){
        setProps(testState, 'all');
        var container = d.getElementById(props.containerId);
        console.log("container: " + container);
        QUnit.test("App container initialized correctly", function(assert){
            var notUndefined = (container != 'undefined' && container != null);
            assert.equal(notUndefined, true, "App container is defined");
        })
    }


    return {

        render: function (props) {
            setProps(props, "all");
            renderPanel();
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

        elementHasOneOfCategories: function (element) {
            /*
            *
            * */
            var values = [];
            props.styles.categories.forEach(function (category) {
                values.push(element.hasClass(category))
            });
            return values;
        },

        refreshPanel: function () {
            updatePanel();
        },

        updateStatusMessage: function (text) {
            setStatusMessage(text);
            toggleStatusActivity();
        },

        props: function () {
            return props;
        },

        runTests: function (assert) {
            // pass QUnit.assert
            tests(assert);
        }
    }

})(gwClient, cy);






