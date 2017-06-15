/**
 * Created by toni on 6.6.2017.
 */
var d = document;

var configs = {
// This is a proxy server for development
    API_PATH: 'http://127.0.0.1:5000/'
};

gwClient.setConfigs(configs);

var testState = {
    containerId: "panel-container",
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

console.log("%cTodo:", "color: green; font-size:15px;");
console.log("%cLoad graphs from the server to the view", "color: blue; font-size:13px;");

// initialize download image link
function downloadGraphPNG() {
    console.info('running downloadGraphPNG() -function')
    var png = cy.png({bg: 'white'});
    var a = document.createElement('a');

    a.href = png;
    a.download = 'graph.png';
    console.debug(a);
    a.click()
}


function unorderedListFromArray(array, mouseOver, mouseOut, toggleVisibility, doubleClick) {
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

        ul.appendChild(li);
    });
    return ul;
}

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

function debugAlert(message) {
    alert(message);
}

function generateContent() {
    "use strict";
    var div = d.createElement('div');
    div.innerHTML = this.content + "Generated content!";
    return div;
}

function saveMenuForm(){
    "use strict";
    var div = d.createElement('div');
    var inName = d.createElement('input');
    inName.setAttribute('type', 'text');
    div.appendChild(inName);
    div.innerHTML = this.content + "Generated content!";
    return div;
}

var menuItems = {
    download: {
        label: "Download",
        content: "Click to download image.",
        onClick: downloadGraphPNG,
        generateContent: generateContent
    },
    layout: {
        label: "Layout",
        content: "here you can change the layout",
        onClick: debugAlert,
        generateContent: generateContent
    },
    save: {
        label: "Save",
        content: "form to input graph name",
        onClick: debugAlert,
        generateContent: saveMenuForm
    },
    settings: {
        label: "Settings",
        content: "here might be some options to choose from",
        onClick: debugAlert,
        generateContent: generateContent
    },
    moin: {
        label: "Moin pages",
        content: "list moin pages here",
        onClick: debugAlert,
        generateContent: generateContent
    }
};

var panel = (function (gwClient, cy) {

    var props;

    var statusMessage = d.getElementById("status-message");

    var classNames = {
        container: 'panel',
        tab: {
            menu: {
                container: 'tab-menu',
                item: {
                    active: 'tab-menu__menu-item--active',
                    inactive: 'tab-menu__menu-item--inactive'
                }
            },
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

    function renderMenu() {

        // Create the div which contains panel navigation tabs.
        var tabs = props.tabs;

        // css classes
        var classes = classNames.tab.menu;

        var divMenu = document.createElement('div');
        divMenu.classList.add(classes.container);
        divMenu.id = "panel-menu";
        divMenu.classList.add(classes.container);
        var divToggleMenu = d.createElement('div');
        divToggleMenu.innerHTML = '#'
        //divMenu.appendChild(divToggleMenu);
        var menus = Object.keys(menuItems);
        console.log(menus);

        function createPopup(buttonLabel) {
            var divPopup = d.createElement('div');
            divPopup.classList.add("popup");

            var btnMenu = d.createElement('button');
            btnMenu.classList.add("btn-menu-item");
            //btnMenu.setAttribute('id', buttonLabel);
            btnMenu.innerHTML = buttonLabel;
            btnMenu.addEventListener('click', function () {
                document.getElementById(buttonLabel).classList.toggle("show");
                console.log('clicked toggle menu popup');
            });
            var divPopupContent = d.createElement('div');
            divPopupContent.setAttribute('id', buttonLabel);
            divPopupContent.classList.add("popup-content");

            var mockContent = d.createElement('div');
            mockContent.innerHTML = "hidden";

            divPopupContent.appendChild(mockContent);
            divPopup.appendChild(btnMenu);
            divPopup.appendChild(divPopupContent);
            return divPopup;

        }

        menus.forEach(function (itemKey) {
            var item = menuItems[itemKey];
            var div = d.createElement('div');
            var divContent = d.createElement('div');
            divContent.setAttribute('id', 'panel-menu-content-' + item.label.toLowerCase());

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
            console.log(item);
            divContent.appendChild(item.generateContent());
            div.appendChild(divContent);
            // divMenu.appendChild(createPopup(item.label));
            divMenu.appendChild(div);
        });
        var divSpacer = d.createElement('div');
        divSpacer.innerHTML = '---------';

        //divMenu.appendChild(divSpacer);

        return divMenu;
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
        console.group('Debug GraphsContent()');
        var content = props.tabs.graphs;
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
        handleNavClick('styles');
        var graphsContent = renderGraphsContent();
        var firstChild = graphsContent.childNodes[0];
        assert(graphsContent.id == "graphs-content", "renderGraphsContent() returns div with proper id");
        assert(firstChild.tagName == "UL", "renderGraphsContent() returns with correct html element");
        console.groupEnd();
    }

    function testGraphingWikiClientInit(testState) {
        setProps(testState, 'all');
        console.group("test that the graphingwiki reference is included in props");
        var moduleName = props.gw.getModuleName();
        assert(moduleName == "GraphingWiki client", "GraphingWiki client is callable");
        console.groupEnd();
    }

    function testCytoscapeIntegrationInit(testState) {
        setProps(testState, 'all');
        console.group("test that the cytoscape is integrated correctly");
        console.log("props.cy: ");
        console.log(props.cy.id);
        cyId = props.cy.id;
        assert(cyId == "cy", "Cytoscape initialized correctly?");
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

// which are meant to be used with
        function getElementIDsToArray(selector) {
            /*
             * param eles: cy.elements
             * return: array of element id strings
             */

            var idArray = [];
            try {
                console.log("Applying filter: " + props.tabs.elements.filter);
                cy.elements(selector).forEach(function (el) {
                    var id = el.id();
                    var filterIncludes = id.toLowerCase().includes(content.filter.toLowerCase());

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

        var ulNodes = unorderedListFromArray(nodes, mouseOver, mouseOut, toggleVisibility, doubleClick);
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
        handleNavClick('styles');
        var stylesContent = renderElementsContent();
        assert(stylesContent.id == "elements-content", "renderElementsContent() returns div with proper id");
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
                console.groupCollapsed("StyleSelection log");
                console.log("props.elementStyles[" + category + "][" + selector + "] = " + value);
                console.log(props.elementStyles[category][selector]);
                console.log("Category: " + category);
                console.log("Parameter: " + parameter);
                console.log("State!");
                console.log(props);
                console.groupEnd();
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
        return div;
    }

    function testRenderStylesContent(testState) {
// set context for tests
        console.group("testRenderStylesContent()");
        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesContent = renderStylesContent();
        assert(stylesContent.id === "styles-content", "renderStylesContent() returns div with proper id");
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
        var result = handleNavClick('elements');
        console.group('testHandleNavClick()');
        var conditionA = assert(props.tabs.elements.active == true, 'handleNavClick(key) activates the tab correctly');
        var conditionB = assert(props.tabs.graphs.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var conditionC = assert(props.tabs.styles.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var firstTestsNotPassed = !(conditionA && conditionB && conditionC);

        var result = handleNavClick('styles');
        var conditionA = assert(props.tabs.elements.active == false, 'handleNavClick(key) activates the tab correctly');
        var conditionB = assert(props.tabs.graphs.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var conditionC = assert(props.tabs.styles.active == true, 'handleNavClick(key) deactivates the tab correctly');
        console.groupEnd();
        var secondTestsNotPassed = !(conditionA && conditionB && conditionC);

        if (firstTestsNotPassed && secondTestsNotPassed) {
            alert("Virhe korjaa bugi ennen ko jatkat");
            throw Error('testHandleNavClick() failed');
        }
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
        console.group("Panel tests!");
// todo return true/false -> push to array -> check if all passed!
        testCytoscapeIntegrationInit(stateForTests);
        testGraphingWikiClientInit(stateForTests);
        testHandleNavClick(stateForTests);
        testRenderElementsContent(stateForTests);
        testRenderGraphsContent(stateForTests);
        testRenderStylesContent(stateForTests);


        console.groupEnd();
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
            if (categories == 'undefined') {
                return []
            } else {
                return categories;
            }
        },

        elementHasOneOfCategories: function (element) {
            var values = [];
            props.styles.categories.forEach(function (category) {
                values.push(element.hasClass(category))
            });
            return values;
        },

        refreshPanel: function () {
            updatePanel();
        },

        toggleEditMode: function () {
            toggleMode();
        },

        updateStatusMessage: function (text) {
            setStatusMessage(text);
            toggleStatusActivity();
        },

        props: function () {
            return props;
        },

        runTests: function (containerId) {
            tests(containerId);
        }
    }

})(gwClient, cy);






