/**
 * Created by toni on 19.7.2017.
 */


define([
        "components/elementStyles",
        "utils/eventListeners",
        "configuration/classNames",
        "utils/graphUtils",
        "utils/gwClient",
        "components/menuItems",
        "components/nodeForm/nodeForm",
        "utils/dispatchMessages",
        "components/header/header",
        "configuration/configs",
        "components/graphStyleEditor/graphStyleEditor"
    ],
    function (elementStyles, eventListeners, classNames, graphUtils, gwClient, menuItems, nodeForm, dispatchMessages, header, configs, graphStyleEditor) {
        'use strict';

        var name = "ui";
        var container;
        var dispatch;


        /**
         * User interface components. Collection of functions to    create UI components.
         * @exports ui
         */

        /** @function
         *  @name contentContainer
         *  @description Returns the root div container element where to append the rest of the application.
         *  @return {HTMLDivElement} HTML div element.
         */
        function contentContainer(props) {
            var container = document.createElement('div');
            //props.cy = graphUtils.cy();
            container.setAttribute('id', configs.containerId);
            container.classList.add("app-row");
            container.appendChild(panel(props));
            container.appendChild(graphColumn(props));
            return container;
        }

        /** @function createPopUp
         *  popup for saving the graphs
         */
        function createPopUp(props) {

            // naming should be more declarative
            // the props act as a panelProps
            // and props.props as props
            // for the next function

            var container = d.getElementById('message-container');
            var content = menuExtension.render(props);
            container.appendChild(content);


            console.debug("createPopup()");
            console.debug(props);

            if (!funcProps.cy) {
                // todo: refactor this to eventlistener
                funcProps.cy = props.cy;
            }

            console.log(funcProps.context);

            var divPopup = d.createElement('div');
            divPopup.classList.add('popup');
            divPopup.setAttribute('id', 'popup');
            var content = popup.render(props);
            divPopup.appendChild(content);
            document.body.appendChild(divPopup);
            //var infoBox = d.getElementById('message-container');
            //infoBox.appendChild(divPopup);

            console.debug('popup');
        }

        function destroyPopUp() {
            var p = d.getElementById('popup');
            document.body.removeChild(p);
            console.debug("closed popup!");
        }

        /**
         * @function
         * @name elementsContent
         * @description Describing
         * @param {Object} variable - Desc.
         * @return {Type} desc.
         */
        function elementsContent(props) {
            try {
                console.debug("elementsContent props!");
                console.debug(props);
                var content = props.content;

                var div = document.createElement('div');
                div.setAttribute('id', "elements-content");

                div.appendChild(elementsFilter(props));
                div.appendChild(elementsList(props));

                console.debug("returning");
                console.debug(div);

                return div;
            } catch (e) {
                console.group("Exception raised by ui.elementsContent()");
                console.info("props");
                console.info(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        /**
         * @function
         * @name createNodeContent
         * @description Create content for panel tab "Create node"
         * @param {Object} variable - Desc.
         * @return {HTMLElement} desc.
         */
        function createNodeContent(props) {
            try {
                console.debug("createnodeContent props!");
                console.debug(props);
                // var content = props.content;

                return nodeForm.render(dispatch);

            } catch (e) {
                console.group("Exception raised by ui.createnodeContent()");
                console.info("props");
                console.info(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        /** @function graphColumn
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function graphColumn() {
            var graphColumnContainer = document.createElement('div');
            graphColumnContainer.setAttribute('id', 'graph-column-container');
            graphColumnContainer.classList.add("graph-column");

            var messageContainer = document.createElement('div');
            messageContainer.setAttribute('id', 'message-container');
            messageContainer.classList.add('message-container');

            var messageText = document.createElement('span');
            messageText.setAttribute('id', 'message-text');
            messageContainer.appendChild(messageText);

            var graphContainer = document.createElement('div');
            graphContainer.setAttribute('id', configs.graphContainerId);
            graphContainer.classList.add("graph-container");


            var textPrevievContainer = textPreview();

            graphColumnContainer.appendChild(messageContainer);
            graphColumnContainer.appendChild(graphContainer);
            graphColumnContainer.appendChild(textPrevievContainer);

            return graphColumnContainer;
        }

        /** @function renderGraphsContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function graphsContent(props) {
            /*
             * Implement graphs tab rendering here
             *
             * */
            try {

                var gwClient = props.gwClient;
                var classes = classNames.tab.graph;

                var div = document.createElement('div');
                var ul = document.createElement('ul');

                div.setAttribute('id', classes.container);

                // todo: implement via eventbus for loose coupling
                try {
                    var graphListPromise = gwClient.getGraphList();
                    graphListPromise.then(function (response) {
                        return response.json();

                    }).then(function (json) {
                        var graphs = json.data;
                        graphs.sort();

                        /* loop array of graphName strings and generate
                         * the list items for the panel */
                        graphs.forEach(function (graph) {
                            graphListItem({
                                cy: props.cy,
                                graphName: graph,
                                gwClient: gwClient,
                                listElement: ul
                            });
                        });
                    });
                } catch (error) {
                    console.warn(error);
                }


                div.appendChild(ul);
                console.groupEnd();
                return div;
            } catch (e) {
                console.group("Exception raised by ui.graphsContent()");
                console.warn(e);
                console.groupEnd();
                return document.createElement('div');
            }
        }

        /** @function renderGraphListItem
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function graphListItem(props) {
            var graphName = props.graphName;
            var gwClient = props.gwClient;
            var list = props.listElement;
            var listItemClass = props.listItemClass;

            var li = document.createElement('li');
            li.classList.add(listItemClass);
            li.innerHTML = graphName;

            li.addEventListener('click', function (event) {
                eventListeners.graphsList.listItem.onClick({
                    graphName: graphName,
                    gwClient: gwClient,
                    cy: cy
                });
            });
            list.appendChild(li);
            return li;
        }

        /** @function renderMenu
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Element} desc.
         */
        function menu(props) {

            // setDispatch fn for menuItem interaction with eventProxy
            // menuItems.setDispatch(dispatch);

            // Create the div which contains graphingwikiBrowser navigation tabs.
            var gw = props.gwClient;

            // css classes
            var classes = props.classNames.menu;

            var divMenu = document.createElement('div');
            divMenu.classList.add(classes.container);
            divMenu.id = classes.container;
            divMenu.classList.add(classes.container);
            var divToggleMenu = document.createElement('div');
            divToggleMenu.innerHTML = '#';
            //divMenu.appendChild(divToggleMenu);
            // console.log(menuItems);
            var menus = Object.keys(menuItems);
            console.debug(props);
            var itemKeys = Object.keys(props.menuItems.items);
            itemKeys.forEach(function (key) {
                console.log(key);
                var item = props.menuItems.items[key];
                var div = document.createElement('div');
                div.setAttribute('id', "panel-menu__item__" + key);
                var divContent = document.createElement('div');
                divContent.setAttribute('id', 'panel-menu__item__' + item.label.toLowerCase() + '-content');

                // Bind an action to the click of the label.
                div.addEventListener('click', function () {
                    item.onClick({
                        cy: graphUtils.cy(),
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

        /** @function renderElementsfilter
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function elementsFilter(props) {
            var div = document.createElement('div');
            var spanFilter = document.createElement('span');
            var btnClearFilter = document.createElement("button");

            div.classList.add("element-filter");

            btnClearFilter.innerHTML = "ClearFilter";

            var inFilter = document.createElement("input");
            inFilter.type = "text";
            inFilter.placeholder = "Filter...";
            inFilter.setAttribute('id', 'filter');
            inFilter.classList.add(classNames.tab.elements.filterInput);

            var filtProps = {
                divList: document.getElementById('elements-list'),
                inFilter: inFilter,
                renderNewContent: elementsList,
                spanFilter: spanFilter
            };

            btnClearFilter.addEventListener('click', function () {
                eventListeners.elementsFilter.btnClearFilter.onClick(updateTabs);
            });
            inFilter.addEventListener('keypress', function (event) {
                console.debug(filtProps);
                eventListeners.elementsFilter.inFilter.keypress(filtProps);
            });

            div.appendChild(inFilter);
            //div.appendChild(btnClearFilter);
            div.appendChild(spanFilter);

            return div;
        }

        /** @function renderElementsList
         *  Description
         *  Todo: Refactor
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function elementsList(props) {
            try {
                console.debug("elementList(props)");
                console.debug(props);
                // var content = props.content;
                var filter = props.filter || "";
                var cy = graphUtils.cy();
                var gw = gwClient;

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
                            // var filter = content.filter.toLowerCase();
                            var filterIncludes = id.toLowerCase().includes(filter);

                            if (filter == '' || filter == 'undefined') {
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

                var response = dispatch({
                    action: "ELEMENT_IDS_TO_ARRAY",
                    ctx: this,
                    fn: null,
                    info: "dev test",
                    data: {selector: "node", filter: ""},
                    target: "graphUtils",
                    source: "ui"
                });

                var nodes = getElementIDsToArray("node");
                var edges = getElementIDsToArray("edge");

                var div = document.createElement('div');
                div.classList.add(classNames.tab.elements.listContainer);

                var hdNodes = document.createElement('span');
                hdNodes.innerHTML = "Pages";

                var pNodeNotes = document.createElement('p');
                pNodeNotes.innerHTML = "order by degree?";

                var hdEdges = document.createElement('span');
                hdEdges.innerHTML = "Links";

                var ulNodes = unorderedListFromArray({
                    array: nodes,
                    cy: cy,
                    gw: gw,
                    onClick: eventListeners.elementsList.onClick,
                    onMouseOver: eventListeners.elementsList.onMouseOver,
                    onMouseOut: eventListeners.elementsList.onMouseOut,
                    toggleVisibility: graphUtils.toggleVisibility
                });

                ulNodes.classList.add(classNames.tab.elements.list);

                var ulEdges = unorderedListFromArray({
                    cy: cy,
                    array: edges,
                    onClick: eventListeners.elementsList.onClick,
                    onMouseOver: eventListeners.elementsList.onMouseOver,
                    onMouseOut: eventListeners.elementsList.onMouseOut,
                    toggleVisibility: graphUtils.toggleVisibility
                });

                ulEdges.classList.add(classNames.tab.elements.list);

                div.setAttribute('id', "elements-list");
                div.appendChild(hdNodes);
                div.appendChild(ulNodes);
                div.appendChild(hdEdges);
                div.appendChild(ulEdges);
                return div;
            } catch (e) {
                console.group("Exception raised by ui.elementsList()");
                console.info("props");
                console.info(props);
                console.warn(e);
                console.groupEnd();
            }
        }


        /**
         *
         */
        function setMenuItems(props) {
            menuItems = props.menuItems;

        }


        /** @function renderTextPreview
         *  renderTextPreview()
         *  @return {Object} Div element with two child divs
         */
        function textPreview() {
            var previewContainer = document.createElement('div');
            previewContainer.classList.add(classNames.text.container);
            previewContainer.setAttribute('id', classNames.text.container);

            return previewContainer;

        }

        /** @function renderNavigation
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function navigation(props) {
            var tabs = props.configs.tabs;

            // css classes
            var classes = classNames.tab.nav;

            var divNav = document.createElement('div');
            divNav.classList.add(classes.container);

            divNav.id = classes.container;

            var links = Object.keys(tabs);

            links.forEach(function (key) {

                var link = tabs[key];
                var divLink = document.createElement('div');
                divLink.addEventListener('click', function (event) {
                    eventListeners.ui.navClick({
                        cy: props.cy,
                        configs: props.configs,
                        keyToActivate: key,
                        classNames: props.classNames,
                        updateTabs: updateTabs
                    });
                });

                if (link.active) {
                    divLink.classList.add(classes.item.item);
                    divLink.classList.add(classes.item.active);

                } else {
                    divLink.classList.add(classes.item.item);

                }

                divLink.innerHTML = link.label;

                // Fixme: clean the implementation!
                divLink.setAttribute('id', "nav-item-" + link.key.toLowerCase());
                divNav.appendChild(divLink);
            });


            return divNav;
        }

        /** @function renderPanel
         *  renderPanel : returns ui panel, wich contain <DESCRIBE>
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function panel(props) {

            var divPanel = document.createElement('div');

            divPanel.setAttribute('id', classNames.panel.container);
            divPanel.classList.add(classNames.panel.container);

            var menuDiv = menu({
                gwClient: gwClient,
                classNames: classNames,
                menuItems: menuItems
            });

            // Todo: clean up temporary refactoring aux.

            var navProps = props;
            navProps.configs = configs;
            navProps.classNames = classNames;
            navProps.cy = graphUtils.cy();
            // console.debug("NavProps!");
            // console.debug(navProps);
            var tabNavDiv = navigation(navProps);

            // console.debug("TabProps:");
            // console.debug(props);
            props.tabs = props.configs.tabs;
            var tabsDiv = tabs(props);

            divPanel.appendChild(menuDiv);
            divPanel.appendChild(tabNavDiv);
            divPanel.appendChild(tabsDiv);

            return divPanel;
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


            var textPromise = gwClient.getPageText(param);

            var textPreviewContent = document.getElementById(classNames.text.content);
            console.debug(textPreviewContent);
            var linkToSite = document.createElement('a');

            linkToSite.innerHTML = param;

            // Todo: use URL from config and use a function to generate the complete path
            linkToSite.setAttribute('href', "http://localhost/" + param);
            textPromise.then(function (response) {
                return response.json();
            }).then(function (json) {
                console.debug('setTextPreviewContent');
                console.debug(json.data);
                dispatch({
                    action: "SET_CONTENT",
                    ctx: this,
                    data: {
                        type: "PAGE",
                        content: json.data
                    },
                    target: "previewController",
                    source: "ui",
                    fn: null,
                    info: "Clicked node element. Load preview."
                });
                // document.body.appendChild(textPreviewContent);

                return json.data;
            }).catch(function(error){
                console.warn(error);
            })
        }

        /** @function setTextPreviewHeader
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function setTextPreviewHeader(headerText) {
            var spHeader = $('#header-text');
            spHeader.innerHTML = headerText;
        }


        /**
         * @function
         * @name tabs
         * @description Tab content rendering logic.
         * Returns the div object to be appended to the sidebar menu.
         * Implements the navigation between tabs.
         * @param {Object} prosp
         * @return {Type} desc.
         */
        function tabs(props) {
            try {
                props.cy = graphUtils.cy();

                var divContent = document.createElement('div');
                divContent.classList.add(classNames.tab.container);
                divContent.id = classNames.tab.container;

                props.gwClient = gwClient;

                if (props.tabs.graphs.active) {
                    divContent.appendChild(
                        graphsContent({
                            cy: props.cy,
                            gwClient: props.gwClient
                        })
                    );

                } else if (props.tabs.elements.active) {
                    divContent.appendChild(elementsContent(props));
                } else if (props.tabs.styles.active) {
                    divContent.appendChild(graphStyleEditor.render())
                } else if (props.tabs.createnode.active) {
                    divContent.appendChild(createNodeContent());
                }

                return divContent;
            } catch (e) {
                console.group("Exception raised by tabs()");
                console.debug("props");
                console.debug(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        /**
         * @function
         * @name unorderedListFromArray
         * @description Create unordered list of Cytoscape elements and bind event listeners to list elements.
         * @param {Object} props
         * @param {Type} props.PROP
         * @return {HTMLUListElement} list of elements with event listeners
         */
        function unorderedListFromArray(props) {
            /*
             * Todo: get event listeners from eventListeners
             * array: array of string items
             * return: unordered html element with list items
             * from the array
             * */

            var cy = props.cy;
            var array = props.array;

            array.sort();

            var ul = document.createElement('ul');

            array.forEach(function (listElementId) {
                var li = document.createElement('li');

                var checkBox = document.createElement('input');
                checkBox.setAttribute('id', 'visibility_' + listElementId);
                checkBox.setAttribute('type', 'checkbox');

                var elementHidden = cy.getElementById(listElementId).hidden()
                checkBox.setAttribute('checked', elementHidden);


                checkBox.checked = true;
                //console.log(checkBox);
                checkBox.addEventListener('click', function (event) {
                    console.log(event.target);
                    graphUtils.toggleVisibility(event.target);
                    console.log(event.target.id);
                });


                li.appendChild(checkBox);

                li.innerHTML += listElementId;

                li.setAttribute('id', listElementId);

                li.addEventListener('mouseover', function (evt) {
                    props.onMouseOver({
                        cy: cy,
                        listItemId: evt.target.id
                    });
                });


                li.addEventListener('mouseout', function (evt) {
                    props.onMouseOut({
                        cy: cy,
                        listItemId: evt.target.id
                    });
                });

                li.addEventListener('click', function (evt) {
                    props.onClick({
                        evt: evt,
                        elementId: listElementId,
                        currentDetail: props.currentDetail,
                        classToToggle: classNames.tab.elements.listItem.selected,
                        setTextPreview: function () {
                            setTextPreviewContent(evt.target.id);
                        }
                    });
                });

                ul.appendChild(li);
            });
            return ul;
        }

        /**
         * @function
         * @name updateTabs
         * @description Called when tab links are clicked. Removes content to make room for the tab clicked.
         * Updates tab content by calling tabs().
         * @param {Object} props
         * @return {Type} to be refactored.
         */
        function updateTabs(props) {
            try {
                console.log('updateTabs()');
                var divTabContainer = document.getElementById(classNames.tab.container);
                var panelContainer = document.getElementById(classNames.panel.container);
                var childsToRemove = divTabContainer.childNodes;


                childsToRemove.forEach(function (child) {
                    divTabContainer.remove(child);
                });

                var tabsContent = tabs({
                    cy: props.cy,
                    tabs: configs.tabs
                });
                panelContainer.appendChild(tabsContent);
            } catch (e) {
                console.group("Exception raised by ui.updateTabs()");
                console.info(props);
                console.warn(e);
                console.groupEnd();
            }
        }


        /**
         *
         * @param props
         */
        function render(props){
            container = document.getElementById(configs.appContainerId);
            //container.appendChild(header.render());
            container.appendChild(panel(props));
            container.appendChild(graphColumn(props));
        }

        var dispatchActions = {
            ELEMENTS_LIST: elementsList,
            UPDATE_TABS: updateTabs,
            trigger: function (props) {
                this[props.action](props.data);
            }
        };

        return {
            contentContainer: contentContainer,
            elementsContent: elementsContent,
            elementsFilter: elementsFilter,
            graphsContent: graphsContent,
            graphListItem: graphListItem,
            menu: menu,
            name: function () {
                return name;
            },
            navigation: navigation,
            setMenuItems: setMenuItems,
            tabs: tabs,
            textPreview: textPreview,
            render: render,
            updateTabs: updateTabs,
            info: function () {
                return {
                    name: "UI",
                    description: "user interface components."
                };
            },
            setDispatch: function (fn) {
                dispatch = fn;
                dispatch({
                    action: "CONFIRM_SUBSCRIPTION",
                    ctx: this,
                    target: "eventProxy",
                    source: "ui",
                    fn: null,
                    info: "dev test"
                });
            },
            triggerEvent: function (props) {
                console.log(props);
                return dispatchActions.trigger(props);
            }
        }
    }
);