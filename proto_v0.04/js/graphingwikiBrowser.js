/**
 * Created by Toni Väisänen on 6.6.2017.
 *
 */

define([
        "./configuration/classNames",
        "./components/elementStyles",
        "./components/menuItems",
        "./components/ui",
        "./configuration/configs",
        "./dependencies/cytoscape",
        "./utils/edgeCategories",
        "./utils/graphUtils",
        "./utils/gwClient"],
    function (classNames, elementStyles, menuItems, ui, configs, cytoscape, edgeCategories, graphUtils, gwClient) {
        var d = document;
        var cy;
        var props;


        /** @function toggleVisibility
         *  toggleVisibility: toggle visibility of cy element.
         *  parameter is a object, which contains string:elementId
         *  and object:cy (cytoscape instance).
         *  @param {Object} funcProps {elementId, cy}
         */
        function toggleVisibility(funcProps) {
            try {
                var el = funcProps.cy.getElementById(funcProps.elementId);
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


        /** @function
         *  Utils
         * @param {Object} funcProps
         */
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
                console.warn("Something went wrong with 'toggleNeighbourhood()'");
                console.warn(e);
            }
        }


        /** @function cy context menu init
         * initCyContextMenu
         * @param cy
         * @return {Object}
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
                                createNewNode(targetId, cy);
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

        /** @function cy context menu init
         * Todo: separate ul rendering and eventListener binding
         * @param cy
         * @return {Object}
         */
        function unorderedListFromArray(funcProps) {
            /*
             * Todo: add support for the array containing evenListener -methods
             * array: array of string items
             * return: unordered html element with list items
             * from the array
             * */

            var cy = funcProps.cy;
            var array = funcProps.array;
            var toggleVisibility = funcProps.toggleVisibility;


            var ul = d.createElement('ul');

            array.forEach(function (listElementId) {
                var li = d.createElement('li');

                var checkBox = d.createElement('input');
                checkBox.setAttribute('id', 'visibility_' + listElementId);
                checkBox.setAttribute('type', 'checkbox');

                var elementHidden = cy.getElementById(listElementId).hidden()
                checkBox.setAttribute('checked', elementHidden);


                checkBox.checked = true;
                //console.log(checkBox);
                checkBox.addEventListener('click', function (event) {
                    console.log(event.target);
                    toggleVisibility(event.target);
                    console.log(event.target.id);
                });


                li.appendChild(checkBox);

                li.innerHTML += listElementId;

                li.setAttribute('id', listElementId);

                li.addEventListener('mouseover', function (evt) {
                    funcProps.onMouseOver({
                        cy: cy,
                        listItemId: evt.target.id
                    });
                });


                li.addEventListener('mouseout', function (evt) {
                    funcProps.onMouseOut({
                        cy: cy,
                        listItemId: evt.target.id
                    });
                });

                li.addEventListener('click', function (evt) {
                    funcProps.onClick({
                        evt: evt,
                        elementId: listElementId,
                        currentDetail: props.currentDetail,
                        classToToggle: classNames.tab.elements.listItem.selected,
                        setCurrentDetail: function () {
                            console.log("stub set detail")
                        }
                    })
                });

                ul.appendChild(li);
            });
            return ul;
        }


        // Todo: write tests when the datastructures are stable
        /** @function getEdgeCategories
         *   Return an array of edge categories used in current graph.
         */
        function getEdgeCategories() {
            try {
                var categories = edgeCategories.get();
                if (categories === 'undefined') {
                    return []
                } else {
                    return categories;
                }
            } catch (e) {
                console.groupCollapsed("Exception raised by graphingwikiBrowser.getEdgeCategories()");
                console.warn(e);
                console.groupEnd();
            }
        }

        /** @function elementHasCategoryClass
         *  Check if the given element has been assigned with existing
         *  category style classes.
         *  @param {Object} element - Cytoscape element
         *  @param {Array} categories - Array of category names.
         *  @return {Boolean} True if element have assigned classes.
         */
        function elementHasCategoryClass(element, categories) {
            try {
                var categoryClassFound = categories.some(function (c) {
                    return element.hasClass(c);
                });
                return categoryClassFound;

            } catch (e) {
                console.groupCollapsed("Exception raised by graphingwikiBrowser.elementHasCategoryClass()");
                console.warn(e);
                console.info("Parameters passed:");
                console.info("element:");
                console.info(element);
                console.groupEnd();
            }
        }


        /** @function edgeExists
         *  Check if a node of given id is already defined in the graph.
         *  @param {String} edgeId - Id of edge.
         *  @return {Boolean} True if edge already defined, else False.
         */
        function edgeExists(edgeId, cy) {
            return cy.getElementById(edgeId).isEdge();
        }


        /** @function updateCategories
         *  Takes an array of categorynames as strings and updates the state of app
         *  @param {Array} newCategories - array of strings.
         *  @return {Array} updated categories.
         */
        function updateCategories(newCategories, categoriesToUpdate) {
            /*
             when: A new node is loaded.
             why: To add new possible categories.
             how: [( the category is already listed ) ? do nothing : add new category to graphingwikiBrowser props list]
             CategoryStyles is the function, which handles the updating.
             */

            // get current categories from the graphingwikiBrowser

            try {
                // this could be written with reducer Todo ?
                if (typeof category === 'undefined') {
                    newCategories.forEach(function (category) {
                        if (categoriesToUpdate.indexOf(category) === -1) {
                            categoriesToUpdate.push(category);
                        }
                    });
                }

                return setEdgeCategories(categoriesToUpdate);

            } catch (e) {
                console.warn("Exception raised by updateCategories()");
                console.warn(e);
            }

            updateTabs();
        }


        /** @function setEdgeCategories
         *  Description
         *  Todo: Fix the bug! ( run tests to see what's happening )
         *  @param {String} nodeId - Id of the node to expand.
         *  @return {Array} categories.
         */
        function setEdgeCategories(newCategories) {
            props.tabs.styles.categories = newCategories;
            updateStyleCategories();
            return getEdgeCategories();
        }

        function updateStyleCategories() {
            getEdgeCategories().forEach(function (category) {
                var categoryHasNoStyle = !elementStyles.categoryExists(category);
                if (categoryHasNoStyle) {
                    elementStyles.addCategory(category);
                }
            })
        }


// Todo: tests and docs for remaining!


        /** @function expandNode
         *  Description
         *  @param {String} nodeId - Id of the node to expand.
         *  @param {Object} cy - Cytoscape instance.
         *
         */


        /** @function initNewGraph
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function initNewGraph(data) {
            cy = cytoscape({
                container: document.getElementById('cy'),
                elements: data.elements,
                style: data.style,
                layout: {name: 'preset'}
            });
            cy.on('tap', 'node', function (evt) {
                var node = evt.target;
                var nodeId = node.id();
                var cy = this;
                expandNode(nodeId, cy);
            });
            cy.contextMenus(initCyContextMenu(cy));
            return cy;
        }

        function testInitNewGraph() {
            var data = {
                elements: {
                    nodes: [
                        {
                            data: {id: "personA"},
                            position: {"x": 420.97222900390625, "y": 243.05557250976562},
                            group: "nodes",
                            removed: false,
                            selected: true,
                            selectable: true,
                            locked: false,
                            grabbable: true,
                            classes: ""
                        }
                    ]
                },
                style: [{
                    selector: "node",
                    style: {
                        "background-color": "#6490af",
                        "label": "data(id)"
                    }
                }]
            };

            // init should return element like this
            var cyExpect = cytoscape({
                container: document.getElementById('cy'),
                elements: data.elements,
                style: data.style,
                layout: {name: 'preset'}
            });
            cyExpect.on('tap', 'node', function (evt) {
                var node = evt.target;
                var nodeId = node.id();
                var cy = this;
                expandNode(nodeId, cy);
            });
            /*----------------------------------------*/

            var cy = initNewGraph(data);

            var cyExEles = JSON.stringify(cyExpect.json().elements);
            var cyEles = JSON.stringify(cy.json().elements);
            var cyExStyle = JSON.stringify(cyExpect.json().style);
            var cyStyle = JSON.stringify(cy.json().style);

            console.debug(JSON.stringify(cyExEles));
            console.debug(JSON.stringify(cyEles));
            console.debug(JSON.stringify(cyExEles) === JSON.stringify(cyEles));
            QUnit.test("initNewGraph()", function (assert) {
                assert.ok(cy, "Function returns");
                assert.deepEqual(cyEles, cyExEles, "Returns cytoscape instance with expected elements.");
                assert.deepEqual(cyStyle, cyExStyle, "Returns cytoscape instance with expected style.");
            });
        }


        /*
         When behaviour of the following functions are defined,
         write the unit tests.
         */

        /** @function generateContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function generateContent() {
            "use strict";
            var div = d.createElement('div');
            div.innerHTML = this.content;
            return div;
        }

        /** @function menuItemCreate
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function menuItemCreate() {
            "use strict";
            var cy = props.cy;
            var onClick = listenerFunctions.menuItemCreate.btnSave.onClick;
            var div = d.createElement('div');
            var inName = d.createElement('input');
            inName.setAttribute('id', 'input-graph-name');
            inName.setAttribute('type', 'text');
            var btnSave = d.createElement('button');
            btnSave.addEventListener('click', function (event) {
                onClick(event);
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

        /** @function menuItemSave
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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

        /** @function menuItemLayout
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */


        /** @function downloadGraphPNG
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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

        /**
         *
         * @param evt
         */
        function bindExpandNode(evt) {
            var node = evt.target;
            var nodeId = node.id();
            graphUtils.expandNode({
                nodeId: nodeId,
                cy: cy,
                gwClient: gwClient,
                edgeCategories: edgeCategories,
                elementStyles: elementStyles
            });
            updateTabs();
        }

        /** @function initCytoscape
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function initCytoscape() {
            /*
             *   Return <div id="cy">
             *   Initialize empty Cytoscape graph
             *
             * */
            var cyContainer = d.getElementById('cy');
            cy = testCy(cyContainer);
            cy.on('tap', 'node', bindExpandNode);

            // initialize the context menu plugin
            // cy.contextMenus(initCyContextMenu(cy));

            cy = cy;
        }

        /*
         function initWindowListeners(){
         // to close opened popup
         window.addEventListener('click', function(event){
         listenerFunctions.window.onClick(event);
         })
         }*/

        /** @function handleNavClick
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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


        /** @function updateTabs
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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

        /** @function setProps
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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

        /** @function renderContentContainer
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderContentContainer() {
            var contentContainer = d.createElement('div');
            contentContainer.setAttribute('id', configs.contentContainerId);
            contentContainer.classList.add("content-container");
            contentContainer.appendChild(renderPanel());
            contentContainer.appendChild(renderGraphColumn());
            return contentContainer;
        }

        /** @function renderHeaderContainer
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderHeaderContainer() {
            var headerContainer = d.createElement('div');
            headerContainer.setAttribute('id', "header-container");
            headerContainer.classList.add("header-container");
            headerContainer.appendChild(renderHeader());
            return headerContainer;
        }

        /** @function render
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function render() {

            var appContainer = d.getElementById(configs.appContainerId);
            appContainer.appendChild(renderHeaderContainer());
            appContainer.appendChild(renderContentContainer());
        }

        function setMessageText(funcProps) {
            var spText = d.getElementById('message-text');
            spText.innerHTML = funcProps.messageText;
        }

        function clearMessageText() {
            var spText = d.getElementById('message-text');
            spText.innerHTML = '';
        }

        /** @function renderGraphColumn
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderGraphColumn() {
            var graphColumnContainer = d.createElement('div');
            graphColumnContainer.setAttribute('id', 'graph-column-container');
            graphColumnContainer.classList.add("graph-column");

            var messageContainer = d.createElement('div');
            messageContainer.setAttribute('id', 'message-container');
            messageContainer.classList.add('message-container');

            var messageText = d.createElement('span');
            messageText.setAttribute('id', 'message-text');
            messageContainer.appendChild(messageText);

            var graphContainer = d.createElement('div');
            graphContainer.setAttribute('id', configs.graphContainerId);
            graphContainer.classList.add("graph-container");

            var textPrevievContainer = renderTextPreview();

            graphColumnContainer.appendChild(messageContainer);
            graphColumnContainer.appendChild(graphContainer);
            graphColumnContainer.appendChild(textPrevievContainer);

            return graphColumnContainer;
        }

        /** @function renderElementsContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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


        /** @function renderElementsfilter
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderElementsFilter() {
            var div = d.createElement('div');
            var spanFilter = d.createElement('span');
            var btnClearFilter = d.createElement("button");

            div.classList.add("element-filter");

            btnClearFilter.innerHTML = "ClearFilter";

            var inFilter = d.createElement("input");
            inFilter.type = "text";
            inFilter.placeholder = "Filter...";
            inFilter.setAttribute('id', 'filter');
            inFilter.classList.add(classNames.tab.elements.filterInput);

            var filtProps = {
                divList: d.getElementById('elements-list'),
                inFilter: inFilter,
                renderNewContent: renderElementsList,
                spanFilter: spanFilter
            };

            btnClearFilter.addEventListener('click', function () {
                listenerFunctions.elementsFilter.btnClearFilter.onClick(updateTabs)
            });
            inFilter.addEventListener('keypress', function (event) {
                console.debug(filtProps.elesContent);
                listenerFunctions.elementsFilter.inFilter.keypress(filtProps);
            });

            div.appendChild(inFilter);
            div.appendChild(btnClearFilter);
            div.appendChild(spanFilter);

            return div;
        }

        /** @function setTextPreviewHeader
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function setTextPreviewHeader(headerText) {
            var spHeader = d.getElementById('header-text');
            spHeader.innerHTML = headerText;
        }

        /** @function setTextPreviewContent
         *  Description
         *  Todo: TEST!
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function setTextPreviewContent(param) {
            // set header to reflect the content
            setTextPreviewHeader(param);

            // get paget text promise
            var gw = props.gw;
            var textPromise = gw.getPageText(param);

            var textPreviewContent = d.getElementById(classNames.text.content);
            var linkToSite = d.createElement('a');

            linkToSite.innerHTML = param;

            // Todo: use URL from config and use a function to generate the complete path
            linkToSite.setAttribute('href', "http://localhost/" + param);
            textPromise.then(function (response) {
                return response.json();
            }).then(function (json) {
                textPreviewContent.innerHTML = json.data;
                return json.data;
            });
        }

        /** @function renderElementsList
         *  Description
         *  Todo: Refactor
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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

            var ulNodes = unorderedListFromArray({
                array: nodes,
                cy: cy,
                gw: gw,
                onClick: listenerFunctions.elementsList.onClick,
                onMouseOver: listenerFunctions.elementsList.onMouseOver,
                onMouseOut: listenerFunctions.elementsList.onMouseOut,
                toggleVisibility: toggleVisibility
            });

            var ulEdges = unorderedListFromArray({
                cy: cy,
                array: edges,
                onClick: listenerFunctions.elementsList.onClick,
                onMouseOver: listenerFunctions.elementsList.onMouseOver,
                onMouseOut: listenerFunctions.elementsList.onMouseOut,
                toggleVisibility: toggleVisibility
            });

            div.setAttribute('id', "elements-list");
            div.appendChild(hdNodes);
            div.appendChild(ulNodes);
            div.appendChild(hdEdges);
            div.appendChild(ulEdges);
            return div;
        }

        /** @function renderGraphsContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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

            var graphListPromise = gwClient.getGraphList();

            graphListPromise.then(function (response) {
                return response.json();

            }).then(function (json) {
                var graphs = json.data;

                /* loop array of graphName strings and generate
                 * the list items for the panel */
                graphs.forEach(function (graph) {
                    ui.graphListItem({graphName: graph, gwClient: gw, listElement: ul});
                });
            });

            div.appendChild(ul);
            console.groupEnd();
            return div;
        }


        /** @function renderGraphListItem
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderGraphListItem(listItemProps) {

            var graphName = listItemProps.graphName;
            var gw = listItemProps.gw;
            var list = listItemProps.listElement;
            var listItemClass = listItemProps.listItemClass;

            var li = document.createElement('li');
            li.classList.add(listItemClass);
            li.innerHTML = graphName;

            li.addEventListener('click', function (event) {
                listenerFunctions.graphsList.listItem.onClick({
                    graphName: graphName,
                    gw: gw
                });
            });

            list.appendChild(li);
            return li;
        }


        /** @function renderHeader
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderHeader() {
            var header = d.createElement('h2');
            header.innerHTML = configs.header;
            return header;
        }

        /** @function renderMenu
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Element} desc.
         */
        function renderMenu() {

            // Create the div which contains graphingwikiBrowser navigation tabs.
            var gw = gwClient;

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
                    item.onClick({
                        cy: cy,
                        gw: gw,
                        msg: item.label + " clicked"
                    });
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


        /** @function renderNavigation
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderNavigation() {

            // Create the div which contains graphingwikiBrowser navigation tabs.

            var tabs = configs.tabs;

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

        /** @function renderPanel
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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

        /** @function renderStylesContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
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


            function styleSelectionEventListener(funcProps, value) {
                try {
                    console.group('styleSelectionEventListener()');
                    console.debug('1. try - catch block.');
                    var selector = funcProps.baseClass + '.' + funcProps.category;
                    var categoryElements = cy.elements(funcProps.baseClass + '.' + funcProps.category);
                    console.debug(selector);
                    console.debug('CategoryElements');
                    console.debug(categoryElements);
                    // defaults
                    var classesToRemove = elementStyles.getStyle();

                    // do only if the value is not all ready in the category styles
                    try {
                        console.debug('2. try - catch block.');
                        var categoryNotListed =
                            elementStyles.categoryExists(funcProps.category);
                        if (categoryNotListed) {
                            console.debug('condition: categoryNotListed');
                            // if category is not listed, the defaults are in use
                            console.debug('setting value');
                            console.debug(funcProps);
                            elementStyles.setStyle({
                                category: funcProps.category,
                                cy: cy,
                                style: funcProps.parameter,
                                value: funcProps.value,
                                baseClass: funcProps.baseClass
                            });
                            var addThese = elementStyles.getStyle(funcProps.category);
                            console.debug(addThese);
                            element.addClass(addThese);
                            console.debug("Updated category to elementStyles");
                            console.debug(funcProps);
                            console.debug(elementStyles.getStyle(funcProps.category));
                        }
                    } catch (e) {
                        console.debug('2. catch.');
                        // if category not listed add it
                        elementStyles.setStyle({
                            category: funcProps.category,
                            cy: cy,
                            style: funcProps.parameter,
                            value: funcProps.value,
                            baseClass: funcProps.baseClass
                        });
                        console.debug("Add category to elementStyles");
                        console.debug(funcProps);
                        console.debug(elementStyles.getStyle(funcProps.category));
                    }

                    var classesToAdd = elementStyles.getStyle(funcProps.category);
                    /*
                     console.debug('reached categoryElements.forEach()');
                     categoryElements.forEach(function (element) {
                     var addThese = classesToAdd.join().replace(',', ' ');
                     var removeThese = classesToRemove.join().replace(',', ' ');

                     classesToRemove.forEach(function(item){
                     console.debug(element.id()+".removeClass('"+item+"')");
                     element.removeClass(item);
                     });

                     classesToAdd.forEach(function(item){
                     console.debug(element.id()+".addClass('"+item+"')");
                     element.toggleClass(item);
                     });

                     // element.removeClass(removeThese);
                     // element.addClass(addThese);
                     console.debug("Element classes!");
                     console.debug(element.classes());
                     //element.toggleClass(funcProps.value);
                     });*/
                } catch (e) {
                    console.debug('1. catch.');
                    console.groupCollapsed("Exception raised by styleSelectionEventListener().");
                    console.warn(e);
                    console.warn("props:");
                    console.debug(funcProps);
                }

                console.debug(elementStyles);
                console.groupEnd();


            }

            // Todo: make this generic version to work for all of the following use cases
            function styleSelection(funcProps) {
                try {
                    var div = d.createElement('div');
                    var selection = d.createElement('select');
                    selection.setAttribute('id', funcProps.selectionId);

                    // generate options for selection
                    funcProps.options.forEach(function (option) {
                        var opt = d.createElement('option');
                        opt.setAttribute('id', funcProps.attributeId + option.label);
                        opt.innerHTML = option.label;
                        opt.value = option.styleClass;
                        selection.appendChild(opt);
                    });


                    // event listener for selection
                    selection.addEventListener('change', function () {
                        styleSelectionEventListener({
                            baseClass: 'edge',
                            category: funcProps.category,
                            parameter: funcProps.parameter,
                            value: selection.value
                        });
                    });
                    div.appendChild(selection);
                    return div;
                } catch (e) {
                    console.groupCollapsed('Exception raised by styleSelection()');
                    console.warn(e);
                    console.debug(funcPropS);
                    console.groupEnd();
                }

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
                    configs.params.forEach(function (parameter) {
                        var liParam = document.createElement('li');
                        var div = d.createElement('div');
                        var spanLabel = d.createElement('span');
                        div.classList.add('style-selection-div');

                        spanLabel.innerHTML = parameter;
                        div.appendChild(spanLabel);

                        liParam.appendChild(div);

                        // generate line style selection

                        if (parameter === 'line-style') {
                            var lineStyleSelection = styleSelection({
                                attributeId: 'select-line-style',
                                category: category,
                                selectionId: 'option-line-style',
                                options: configs.lines,
                                parameter: 'lineStyle'
                            });
                            liParam.appendChild(lineStyleSelection);
                        }

                        ulCategory.appendChild(liParam);

                        // generate arrow selection
                        if (parameter === 'arrow-shape') {
                            var arrowStyleSelection = styleSelection({
                                attributeId: 'select-arrow-shape',
                                category: category,
                                selectionId: 'option-arrow-shape',
                                options: configs.arrows,
                                parameter: 'arrowShape'
                            });
                            liParam.appendChild(arrowStyleSelection);
                        }

                        ulCategory.appendChild(liParam);

                        // generate color selection
                        if (parameter === 'line-color') {
                            var arrowStyleSelection = styleSelection({
                                attributeId: 'select-line-color',
                                category: category,
                                selectionId: 'option-line-color',
                                options: configs.colors,
                                parameter: 'lineColor'
                            });
                            liParam.appendChild(arrowStyleSelection);
                        }

                        ulCategory.appendChild(liParam);

                        // generate linewidth selection
                        if (parameter === 'line-width') {
                            var lineWidthSelection = styleSelection({
                                attributeId: 'select-line-width',
                                category: category,
                                selectionId: 'option-line-width',
                                options: configs.widths(),
                                parameter: 'lineWidth'
                            });
                            liParam.appendChild(lineWidthSelection);
                        }

                        ulCategory.appendChild(liParam);
                        /*
                         if (parameter === 'line-width') {
                         var selLineWidth = d.createElement('select');
                         selLineWidth.setAttribute('id', 'select-line-width');

                         selLineWidth.addEventListener('change', function () {
                         styleSelectionEventListener({
                         baseClass: 'edge',
                         category: category,
                         parameter: "line-width",
                         selector: 'line-width',
                         value: selLineWidth.value
                         });
                         });


                         Array.from(Array(31).keys()).forEach(function (lineWidth) {
                         var optLineWidth = d.createElement('option');
                         optLineWidth.setAttribute('id', 'option-line-width');
                         optLineWidth.innerHTML = lineWidth;
                         selLineWidth.appendChild(optLineWidth);
                         });

                         liParam.appendChild(selLineWidth);

                         }*/
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


        /*
         console.log(targetId);
         if (nodeIdAvailable(targetId, cy)) {
         var confirmation = confirm("The node do not exist. Do you want to create it?");
         console.log(confirmation);
         if (confirmation) {
         createNewNode(targetId, cy);
         } else {
         console.info('User replied no');
         return null;
         }
         }
         var edge = {
         group: 'edges',
         data: {
         id: source.id() + "_to_" + targetId,
         source: source.id(),
         target: targetId
         }
         };
         cy.add(edge);
         * */


        var popup = {
            createEdge: {
                // todo: refactor
                title: "Connect",
                connectButton: function (funcProps) {
                    var btnConnect = d.createElement('button');
                    btnConnect.innerHTML = "connect";
                    btnConnect.addEventListener('click', function () {
                        listenerFunctions.popupConnect.btnConnect.onClick(funcProps);
                    });
                    return btnConnect;
                },
                selectButton: function (funcProps) {
                    var btnSelect = d.createElement('button');
                    btnSelect.innerHTML = "select";
                    btnSelect.addEventListener('click', function () {
                        listenerFunctions.popupConnect.btnSelect.onClick(funcProps);
                    });
                    return btnSelect;
                },
                render: function (funcProps) {
                    console.debug(funcProps);
                    var div = d.createElement('div');
                    var input = d.createElement('input');
                    input.setAttribute('type', 'text');
                    // pass target node input field
                    funcProps.inTargetNodeId = input;

                    div.appendChild(input);
                    div.appendChild(this.connectButton(funcProps));
                    div.appendChild(this.selectButton(funcProps));

                    return div;
                }
            },
            download: {
                title: "Download the graph!",
                render: function () {
                    var div = d.createElement('div');
                    div.innerHTML = "Download the graph!";
                    return div;
                }
            },
            save: {
                title: "Save the graph",
                saveButton: function (funcProps) {
                    var btnSave = d.createElement('button');
                    btnSave.innerHTML = "save";
                    btnSave.addEventListener('click', function () {
                        listenerFunctions.popupSave.btnSave.onClick({
                            gw: funcProps.gw,
                            name: input.value
                        });
                    });
                    return btnSave;
                },

                render: function (funcProps) {

                    console.debug(funcProps);

                    var div = d.createElement('div');
                    var input = d.createElement('input');

                    input.setAttribute('type', 'text');

                    div.appendChild(input);
                    div.appendChild(this.saveButton(funcProps));

                    return div;
                }
            },

            popupItem: {
                title: "Your title",
                render: function () {
                    console.log('create popup with this!')
                }
            },

            render: function (funcProps) {

                console.debug("popup render");
                console.debug(funcProps);


                var container = d.createElement('div');
                var header = d.createElement('div');

                container.classList.add('popup');
                header.classList.add('popup-header');


                var spHeader = d.createElement('span');
                spHeader.innerHTML = this[funcProps.context].title;
                spHeader.classList.add(classNames.popup.header.text);


                var btnClose = d.createElement('button');
                btnClose.innerHTML = "close";
                btnClose.classList.add(classNames.popup.header.btnClose);
                btnClose.addEventListener('click', destroyPopUp);

                header.appendChild(spHeader);
                header.appendChild(btnClose);

                var content = this[funcProps.context].render(funcProps);
                container.appendChild(header);
                container.appendChild(content);

                return container;
            }
        };

        var menuExtension = {
            items: {
                createEdge: {
                    // todo: refactor
                    title: "Connect",
                    connectButton: function (funcProps) {
                        var btnConnect = d.createElement('button');
                        btnConnect.innerHTML = "connect";
                        btnConnect.addEventListener('click', function () {
                            listenerFunctions.popupConnect.btnConnect.onClick(funcProps);
                        });
                        return btnConnect;
                    },
                    selectButton: function (funcProps) {
                        var btnSelect = d.createElement('button');
                        btnSelect.innerHTML = "select";
                        btnSelect.addEventListener('click', function () {
                            listenerFunctions.popupConnect.btnSelect.onClick(funcProps);
                        });
                        return btnSelect;
                    },
                    render: function (funcProps) {
                        console.debug(funcProps);
                        var div = d.createElement('div');
                        var input = d.createElement('input');
                        input.setAttribute('type', 'text');
                        // pass target node input field
                        funcProps.inTargetNodeId = input;

                        div.appendChild(input);
                        div.appendChild(this.connectButton(funcProps));
                        div.appendChild(this.selectButton(funcProps));

                        return div;
                    }
                },
                save: {
                    title: "Save the graph",
                    saveButton: function (funcProps) {
                        var btnSave = d.createElement('button');
                        btnSave.innerHTML = "save";
                        btnSave.addEventListener('click', function () {
                            listenerFunctions.popupSave.btnSave.onClick({
                                gw: funcProps.gw,
                                name: input.value
                            });
                        });
                        return btnSave;
                    },

                    render: function (funcProps) {

                        console.debug(funcProps);

                        var div = d.createElement('div');
                        var input = d.createElement('input');

                        input.setAttribute('type', 'text');

                        div.appendChild(input);
                        div.appendChild(this.saveButton(funcProps));

                        return div;
                    }
                },

                popupItem: {
                    title: "Your title",
                    render: function () {
                        console.log('create popup with this!')
                    }
                }
            },

            render: function (funcProps) {
                try {
                    console.debug("menuExtension render");
                    console.debug(funcProps);


                    var container = d.createElement('div');
                    var header = d.createElement('div');

                    //container.classList.add('popup');
                    //header.classList.add('popup-header');

                    var btnClose = d.createElement('button');
                    btnClose.innerHTML = "close";
                    //btnClose.classList.add(classNames.popup.header.btnClose);
                    btnClose.addEventListener('click', destroyPopUp);

                    header.appendChild(btnClose);

                    var content = this.items[funcProps.context].render(funcProps);
                    container.appendChild(header);
                    container.appendChild(content);

                    return container;
                } catch (e) {
                    console.warn("Exception raised by menuExtension.render()");
                    console.warn(e);
                    console.warn("props:");
                    console.warn(funcProps);
                }
            }
        };

        /** @function createPopUp
         *  popup for saving the graphs
         */
        function createPopUp(funcProps) {

            // naming should be more declarative
            // the funcProps act as a panelProps
            // and funcProps.props as funcProps
            // for the next function

            var container = d.getElementById('message-container');
            var content = menuExtension.render(funcProps);
            container.appendChild(content);


            /*
             console.debug("createPopup()");
             console.debug(funcProps);

             if (!funcProps.cy){
             // todo: refactor this to eventlistener
             funcProps.cy = props.cy;
             }

             console.log(funcProps.context);

             var divPopup = d.createElement('div');
             divPopup.classList.add('popup');
             divPopup.setAttribute('id', 'popup');
             var content = popup.render(funcProps);
             divPopup.appendChild(content);
             d.body.appendChild(divPopup);
             //var infoBox = d.getElementById('message-container');
             //infoBox.appendChild(divPopup);

             console.debug('popup');*/
        }

        function destroyPopUp() {
            var p = d.getElementById('popup');
            document.body.removeChild(p);
            console.debug("closed popup!");
        }

        /** @function renderTabs
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function renderTabs() {
            /*
             * Returns the container for tabs in the side panel
             */

            var tabs = configs.tabs;

            var divContent = d.createElement('div');
            divContent.classList.add(classNames.tab.container);
            divContent.id = classNames.tab.container;

            // render content
            if (tabs.graphs.active) {
                divContent.appendChild(
                    ui.graphsContent({
                        cy: cy,
                        gwClient: gwClient
                    }));

            } else if (tabs.elements.active) {
                divContent.appendChild(renderElementsContent());

            } else if (tabs.styles.active) {
                divContent.appendChild(renderStylesContent());
            }

            return divContent;
        }


        /** @function renderTextPreview
         *  renderTextPreview()
         *  @return {Object} Div element with two child divs
         */
        function renderTextPreview() {
            var divTextPreviewContainer = d.createElement('div');
            divTextPreviewContainer.classList.add(classNames.text.container);
            divTextPreviewContainer.setAttribute('id', classNames.text.container);

            var textPreviewHeader = d.createElement('div');
            textPreviewHeader.classList.add(classNames.text.header);
            textPreviewHeader.setAttribute('id', classNames.text.header);
            var spHeader = d.createElement('span');
            spHeader.setAttribute('id', 'header-text');
            textPreviewHeader.appendChild(spHeader);

            var textPreviewContent = d.createElement('div');
            textPreviewContent.classList.add(classNames.text.content);
            textPreviewContent.setAttribute('id', classNames.text.content);

            divTextPreviewContainer.appendChild(textPreviewHeader);
            divTextPreviewContainer.appendChild(textPreviewContent);

            return divTextPreviewContainer;
        }


        return {
            start: function (props) {
                render();
                initCytoscape();
            },

            state: function () {
                // return app state for debugging in console
                return props;
            },

            runTests: function () {
                tests();
            },

            popup: function (form) {
                createPopUp(form);
            },

            styles: function () {
                return elementStyles;
            },

            closePopup: function () {
                destroyPopUp();
            }
        }
    })
;








