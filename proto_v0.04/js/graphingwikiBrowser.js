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

        "./utils/edgeCategories",
        "./utils/graphUtils",
        "./utils/gwClient"],
    function (classNames, elementStyles, menuItems, ui, configs, edgeCategories, graphUtils, gwClient) {
        /**
         * Graphingwikibrowser module.
         * @exports graphingwikiBrowser
         */

        var d = document;
        var cy;
        var props;


        /** @function toggleVisibility
         *  toggleVisibility: toggle visibility of cy element.
         *  parameter is a object, which contains string:elementId
         *  and object:cy (cytoscape instance).
         *  @param {Object} funcProps {elementId, cy}
         *  @param funcProps.elementId Id of the element, which visibility to toggle.
         *  @param funcProps.cy Cytoscape instance.
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


        /*
         function initWindowListeners(){
         // to close opened popup
         window.addEventListener('click', function(event){
         listenerFunctions.window.onClick(event);
         })
         }*/


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

        /** @function
         *  render
         *  @param {Object} props
         *  @param props.variable description
         *  @return {Element} html div element containing the UI.
         */
        function render(props) {


            var appContainer = d.getElementById(configs.appContainerId);
            appContainer.appendChild(renderHeaderContainer(props));
            appContainer.appendChild(ui.contentContainer(props));
        }

        function setMessageText(funcProps) {
            var spText = d.getElementById('message-text');
            spText.innerHTML = funcProps.messageText;
        }

        function clearMessageText() {
            var spText = d.getElementById('message-text');
            spText.innerHTML = '';
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

                console.debug(ui.info());

                render({
                    gwClient: gwClient
                });

                graphUtils.initCy({
                    gwClient: gwClient,
                    container: document.getElementById('cy')
                });
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








