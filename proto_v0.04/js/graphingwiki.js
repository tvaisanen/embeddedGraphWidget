/**
 * Created by Toni Väisänen on 6.6.2017.
 *
 */

define([
        "./configuration/classNames",
        "./components/elementStyles",
        "./components/ui",
        "./configuration/configs",
        "./utils/edgeCategories",
        "./utils/graphUtils",
        "./utils/gwClient"],
    function (classNames, elementStyles, ui, configs, edgeCategories, graphUtils, gwClient) {
        /**
         * Graphingwikibrowser module.
         * @exports graphingwiki
         */

        var d = document;
        var cy;
        var props;

        /**
         * @function
         * @name loadAppState
         * @description Load the state of the previous session, which
         * includes graphUtils.cy and elementStyles.styles.
         * */
        function loadAppState() {
            /* If browser provides storage, check if there are
             * session in storage.
             */
            if (typeof(Storage) !== "undefined") {

                var loadState = confirm('Load previous state?');
                if (loadState) {
                    var appState = JSON.parse(localStorage.graphingwikiState);

                    var loadThisState = {
                        data: {
                            elements: appState.cy.elements,
                            style: appState.cy.style
                        }
                    };
                    elementStyles.setStyles({
                        styles: appState.styles
                    });
                } else {
                    cy
                    var loadThisState = {
                        data: {
                            elements: [{group: 'nodes', data:{id: 'OuluInfoSec'}}]
                        }
                    };
                }
                graphUtils.createNewCy(loadThisState);
            } else {
                // Sorry! No Web Storage support..
                console.debug("no local storage");
                graphUtils.initCy({
                    gwClient: gwClient,
                    container: document.getElementById('cy')
                });
            }

        }

        function loadFromFile(){
            // Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
              console.log("filesupport gogo");// Great success! All the File APIs are supported.
            } else {
              alert('The File APIs are not fully supported in this browser.');
            }
        }


        // App state needs to be stored on exit!
        window.onbeforeunload = function (e) {
            try {
                var message = "Your confirmation message goes here.";
                var e = e || window.event;

                /*
                 // For IE and Firefox
                 if (e) {
                 //e.returnValue = message;
                 console.log('IE and Firefox - exit?');
                 return null;
                 }*/

                // For Safari

                var appState = {
                    cy: graphUtils.cy().json(),
                    styles: elementStyles.styles()
                };

                localStorage.setItem(
                    "graphingwikiState",
                    JSON.stringify(appState)
                );
            } catch (e) {
                alert(e);
            }


            return null;
        };

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
            });
        }


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

        /** @function downloadGraphPNG
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function downloadGraphPNG() {
            var pngGraph = graphUtils.cy().png({bg: 'white'});
            var a = document.createElement('a');
            a.href = pngGraph;
            a.download = 'graph.png';
            console.debug(a);
            a.click();
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
                render({gwClient: gwClient});
                graphUtils.setUpdateUI(ui.updateTabs);
                loadAppState();
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








