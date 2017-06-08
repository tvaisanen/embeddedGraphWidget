/**
 * Created by toni on 6.6.2017.
 */
var d = document;

var configs = {
    // This is a proxy server for development
    API_PATH: 'http://127.0.0.1:5000/'
};

console.log("%cTEST CY INIT OK BIBY?", "color:red;");

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

function unorderedListFromArray(array, mouseOver, mouseOut, toggleVisibility){
    /*
    * Todo: add support for the array containing evenListener -methods
    * array: array of string items
    * return: unordered html element with list items
    * from the array
    * */

    var ul = d.createElement('ul');
    array.forEach(function (item){
        var li = d.createElement('li');

        var checkBox = d.createElement('input');
        checkBox.setAttribute('id', 'visibility_' + item);
        checkBox.setAttribute('type', 'checkbox');
        checkBox.setAttribute('checked', 'true');
        checkBox.checked = true;
        console.log(checkBox);
        checkBox.addEventListener('change', function(event){
            console.log(event.target);
            toggleVisibility(event.target);
            console.log(event.target.id);
        });
        console.log(checkBox);

        li.appendChild(checkBox);

        li.innerHTML += item;

        li.setAttribute('id', item);

        li.addEventListener('mouseover', function(evt){
           mouseOver(evt.target.id);
        });

        li.addEventListener('mouseout', function(evt){
           mouseOut(evt.target.id);
        });

        ul.appendChild(li);
    });
    return ul;
}


var panel = (function (gwClient, cy) {


    var props;

    var classNames = {
        container: 'panel',
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

    function renderGraphsContent() {
        /*
         * Implement graphs tab rendering here
         *
         * */

        var content = props.tabs.graphs;
        var classes = classNames.tab.graph;

        var div = document.createElement('div');
        var ul = document.createElement('ul');

        div.setAttribute('id', classNames.tab.graph.container);

        graphListPromise = props.gw.getGraphList();
        graphListPromise.then(function (response) {
            return response.json();

        }).then(function (json) {
            var graphs = json.data;
            graphs.forEach(function (graph) {
                var li = document.createElement('li');
                li.classList.add(classes.listItem.inactive);
                li.innerHTML = graph;

                ul.appendChild(li);

            });

        });


        div.appendChild(ul);
        return div;
    }

    function testRenderGraphsContent(testState) {
        // set context for tests
        console.group("testRenderGraphsContent()");
        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesGraphs = renderGraphsContent();
        var firstChild = stylesGraphs.childNodes[0];
        assert(stylesGraphs.id == "graphs-content", "renderGraphsContent() returns div with proper id");
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
        console.debug(props.cy.elements());
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

        // which are meant to be used with
        function getElementIDsToArray(selector){
            /*
             * param eles: cy.elements
             * return: array of element id strings
             */

            var idArray = [];
            try {
                cy.elements(selector).forEach(function (el) {
                    var id = el.id();
                    idArray.push(id);
                });
            } catch (e) {
                console.error(e);
            }
            return idArray;
        }

        function mouseOver(param){
            cy.getElementById(param).toggleClass('highlight');
        }

        function mouseOut(param) {
            cy.getElementById(param).toggleClass('highlight');
        }

        function toggleVisibility(param){
            console.log("toggleVisibility()");
            console.log(param);
            cy.getElementById(param).hidden();
        }

        // extract the ids from aforementioned elements
        var nodes = getElementIDsToArray("node");
        var edges = getElementIDsToArray("edge");

        var mockFilter = d.createElement("input");
        mockFilter.type = "text";

        var div = document.createElement('div');

        var hdNodes = d.createElement('h2');
        hdNodes.innerHTML = "Nodes";

        var pNodeNotes = d.createElement('p');
        pNodeNotes.innerHTML = "order by degree?";

        var hdEdges = d.createElement('h2');
        hdEdges.innerHTML = "Edges";

        var ulNodes = unorderedListFromArray(nodes, mouseOver, mouseOut, toggleVisibility);
        var ulEdges = unorderedListFromArray(edges, mouseOver, mouseOut, toggleVisibility);

        div.setAttribute('id', "elements-content");
        div.appendChild(mockFilter);
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

        var styles = props.tabs.styles.styles;
        var div = document.createElement('div');
        div.setAttribute('id', "styles-content");
        var ul = document.createElement('ul');

        styles.forEach(function (style) {
            var li = document.createElement('li');
            li.innerHTML = style.name + " : " + style.data;
            ul.appendChild(li);

        });
        div.appendChild(ul);


        return div;
    }

    function testRenderStylesContent(testState) {
        // set context for tests
        console.group("testRenderStylesContent()");
        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesContent = renderStylesContent();
        assert(stylesContent.id == "styles-content", "renderStylesContent() returns div with proper id");
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

        var divNav = d.getElementById('panel-nav');
        var divContent = d.getElementById('panel-content');
        var childsToRemove = divNav.childNodes;

        /*
         console.log(childsToRemove);
         console.log(typeof childsToRemove);
         */

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
        container.appendChild(renderNavigation(content));
        container.appendChild(renderContent(content));
    }

    function tests() {
        var stateForTests = testState;
        console.group("Panel tests!");
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
            renderStylesContent(newCategories, styles);
        },

        updateElementsContent: function (elementsProps, styles) {
            setProps(elementProps, 'elements');
            renderElementsContent()
        },

        changeView: function () {

        },

        updateProps: function () {

        },

        runTests: function (containerId) {
            tests(containerId);
        }
    }

})(gwClient, cy);






