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
        "components/nodeForm/nodeForm"
    ],
    function (elementStyles, eventListeners, classNames, graphUtils, gwClient, menuItems, nodeForm) {
        'use strict';

        var name = "ui";
        var dispatch;
        var configs;

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
            container.classList.add("content-container");
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

                return nodeForm.render();

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

        /**
         *
         */
        function setMenuItems(props) {
            menuItems = props.menuItems;

        }

        // Todo: refactor - too big function!
        /**
         * @function
         * @name stylesContent
         * @description Create styles tab of the panel. Lists style categories and the parameters with options.
         * @param {Object} props
         * @param {Object} props.Variable
         * @return {HTMLDivElement} styles tab content.
         */
        function stylesContent(props) {
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

            var styles = elementStyles.styles();
            var div = document.createElement('div');
            div.setAttribute('id', "styles-content");
            div.classList.add("styles-content");
            var ul = document.createElement('ul');
            var cy = graphUtils.cy();

            // Todo: make this generic version to work for all of the following use cases
            function styleSelection(props) {
                try {
                    var div = document.createElement('div');
                    var selection = document.createElement('select');

                    selection.classList.add('style-selection');
                    selection.setAttribute('id', props.selectionId);

                    // generate options for selection
                    props.options.forEach(function (option) {
                        var opt = document.createElement('option');
                        opt.setAttribute(
                            'id',
                            props.attributeId + "-" + option.label
                        );
                        var current = elementStyles.getStyleObject(props.category)[props.parameter];
                        opt.innerHTML = option.label;
                        opt.value = option.styleClass;

                        // set selected option to same which is selected for the category
                        if (current === option.styleClass) {
                            opt.selected = true;
                        }
                        selection.appendChild(opt);
                    });


                    // event listener for selection
                    selection.addEventListener('change', function () {
                        eventListeners.styleList.styleSelection({
                            baseClass: 'edge',
                            category: props.category,
                            parameter: props.parameter,
                            value: selection.value
                        });
                    });
                    div.appendChild(selection);
                    return div;
                } catch (e) {
                    console.group('Exception raised by styleSelection()');
                    console.debug("props:");
                    console.debug(props);
                    console.warn(e);
                    console.groupEnd();
                }

            }

            /**
             * @function
             * @name styleList
             * @description TELL ABOUT IT
             * @param props
             * @returns {HTMLDivElement}
             */

            // Fixme: Too long function!
            function styleList(props) {
                var divStyleTable = document.createElement('div');

                var tableHeader = document.createElement('span');
                tableHeader.innerHTML = props.category;
                divStyleTable.appendChild(tableHeader);

                var table = document.createElement('table');
                table.classList.add(classNames.tab.styles.selectionTable);

                var parameters = ["arrowShape", "lineColor", "lineStyle", "lineWidth"];

                parameters.forEach(function (parameter) {
                    var row = document.createElement('tr');
                    var tdLabel = document.createElement('td');
                    var tdSelection = document.createElement('td');
                    var paramLabel = document.createElement('label');

                    paramLabel.innerHTML = parameter;
                    tdLabel.appendChild(paramLabel);


                    var options = configs.styleOptions[parameter];
                    var values = [];
                    if (typeof options != 'undefined') {
                        values = options.map(function (option) {
                            return option.styleClass;
                        });
                    }

                    try {
                        var selection = styleSelection({
                            attributeId: 'select-line-style',
                            category: props.category,
                            selectionId: 'option-line-style',
                            options: options,
                            parameter: parameter
                        });
                    } catch (e) {
                        console.warn("parameter not found");
                    }
                    tdSelection.appendChild(selection);
                    row.appendChild(tdLabel);
                    row.appendChild(tdSelection);
                    table.appendChild(row);
                    //divCategory.appendChild(selection);

                });

                divStyleTable.appendChild(table);


                return divStyleTable;
            }

            try {
                var keys = Object.keys(styles);
                keys.forEach(function (category) {
                    if (category != 'generic') {
                        var divCategory = styleList({
                            category: category,
                            style: styles[category]
                        });

                        div.appendChild(divCategory);
                    }
                });
            } catch (e) {
                console.group("Exception Styles");
                console.warn(e);
            }

            console.groupEnd();
            return div;
        }

        /** @function renderTextPreview
         *  renderTextPreview()
         *  @return {Object} Div element with two child divs
         */
        function textPreview() {
            var divTextPreviewContainer = document.createElement('div');
            divTextPreviewContainer.classList.add(classNames.text.container);
            divTextPreviewContainer.setAttribute('id', classNames.text.container);

            var textPreviewHeader = document.createElement('div');
            textPreviewHeader.classList.add(classNames.text.header);
            textPreviewHeader.setAttribute('id', classNames.text.header);
            var spHeader = document.createElement('span');
            spHeader.setAttribute('id', 'header-text');
            textPreviewHeader.appendChild(spHeader);

            var textPreviewContent = document.createElement('div');
            textPreviewContent.classList.add(classNames.text.content);
            textPreviewContent.setAttribute('id', classNames.text.content);

            divTextPreviewContainer.appendChild(textPreviewHeader);
            divTextPreviewContainer.appendChild(textPreviewContent);
            return divTextPreviewContainer;

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
                textPreviewContent.innerHTML = json.data;
                document.body.appendChild(textPreviewContent);
                dispatch()
                return json.data;
            });
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
                    divContent.appendChild(stylesContent());
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
            stylesContent: stylesContent,
            tabs: tabs,
            textPreview: textPreview,
            updateTabs: updateTabs,
            info: function () {
                return {
                    name: "UI",
                    description: "user interface components."
                };
            },
            setConfigs: function (props) {
                configs = props.configs;
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