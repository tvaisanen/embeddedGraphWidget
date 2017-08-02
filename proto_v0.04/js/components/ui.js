/**
 * Created by toni on 19.7.2017.
 */


define([
        "../components/elementStyles",
        "../utils/eventListeners",
        "../configuration/classNames",
        "../configuration/configs",
        "../utils/graphUtils",
        "../utils/gwClient",
        "../components/menuItems"
    ],
    function (elementStyles, eventListeners, classNames, configs, graphUtils, gwClient, menuItems) {


        /**
         * User interface components. Collection of functions to    create UI components.
         * @exports ui
         */

        var d = document;

        /** @function
         *  @name contentContainer
         *  @description Returns the root div container element where to append the rest of the application.
         *  @return {HTMLDivElement} HTML div element.
         */
        function contentContainer(props) {
            var container = d.createElement('div');
            //props.cy = graphUtils.cy();
            container.setAttribute('id', configs.containerId);
            container.classList.add("content-container");
            container.appendChild(panel(props));
            container.appendChild(graphColumn(props));
            return container;
        }

        /**
         * @function
         * @name elementsContent
         * @description Describing
         * @param {Object} variable - Desc.
         * @return {Type} desc.
         */
        function elementsContent(props) {
            console.debug("elementsContent props!");
            console.debug(props);
            var content = props.content;

            var div = d.createElement('div');
            div.setAttribute('id', "elements-content");

            div.appendChild(elementsFilter(props));
            div.appendChild(elementsList(props));

            return div;
        }

        /** @function graphColumn
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function graphColumn() {
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

                var graphListPromise = gwClient.getGraphList();

                graphListPromise.then(function (response) {
                    return response.json();

                }).then(function (json) {
                    var graphs = json.data;

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
        function graphListItem(listItemProps) {
            var graphName = listItemProps.graphName;
            var gwClient = listItemProps.gwClient;
            var list = listItemProps.listElement;
            var listItemClass = listItemProps.listItemClass;

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

            // Create the div which contains graphingwikiBrowser navigation tabs.
            var gw = props.gwClient;

            // css classes
            var classes = props.classNames.menu;

            var divMenu = document.createElement('div');
            divMenu.classList.add(classes.container);
            divMenu.id = classes.container;
            divMenu.classList.add(classes.container);
            var divToggleMenu = d.createElement('div');
            divToggleMenu.innerHTML = '#';
            //divMenu.appendChild(divToggleMenu);
            console.log(menuItems);
            var menus = Object.keys(menuItems);

            var itemKeys = Object.keys(props.menuItems);
            itemKeys.forEach(function (key) {
                var item = props.menuItems[key];
                var div = d.createElement('div');
                div.setAttribute('id', "panel-menu__item__" + key);
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


        /** @function renderElementsfilter
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function elementsFilter(props) {
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
                renderNewContent: elementsList,
                spanFilter: spanFilter
            };

            btnClearFilter.addEventListener('click', function () {
                listenerFunctions.elementsFilter.btnClearFilter.onClick(updateTabs);
            });
            inFilter.addEventListener('keypress', function (event) {
                console.debug(filtProps.elesContent);
                eventListeners.elementsFilter.inFilter.keypress(filtProps);
            });

            div.appendChild(inFilter);
            div.appendChild(btnClearFilter);
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

            // var content = props.content;
            var filter = "";
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
                onClick: eventListeners.elementsList.onClick,
                onMouseOver: eventListeners.elementsList.onMouseOver,
                onMouseOut: eventListeners.elementsList.onMouseOut,
                toggleVisibility: graphUtils.toggleVisibility
            });

            var ulEdges = unorderedListFromArray({
                cy: cy,
                array: edges,
                onClick: eventListeners.elementsList.onClick,
                onMouseOver: eventListeners.elementsList.onMouseOver,
                onMouseOut: eventListeners.elementsList.onMouseOut,
                toggleVisibility: graphUtils.toggleVisibility
            });

            div.setAttribute('id', "elements-list");
            div.appendChild(hdNodes);
            div.appendChild(ulNodes);
            div.appendChild(hdEdges);
            div.appendChild(ulEdges);
            return div;
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
            var ul = document.createElement('ul');
            var cy = graphUtils.cy();

            // Todo: make this generic version to work for all of the following use cases
            function styleSelection(props) {
                try {
                    var div = d.createElement('div');
                    var selection = d.createElement('select');
                    selection.setAttribute('id', props.selectionId);

                    // generate options for selection
                    props.options.forEach(function (option) {
                        var opt = d.createElement('option');
                        opt.setAttribute(
                            'id',
                            props.attributeId + option.label
                        );
                        opt.innerHTML = option.label;
                        opt.value = option.styleClass;
                        selection.appendChild(opt);
                    });

                    console.debug("Here we should have the new style to replace the old one!");
                    console.debug(props);

                    var style = {update: "this"};

                    // event listener for selection
                    selection.addEventListener('change', function () {
                        eventListeners.styleList.styleSelection({
                            baseClass: 'edge',
                            category: props.category,
                            parameter: props.parameter,
                            style: style,
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
            function styleList(props) {
                var divCategory = d.createElement('div');

                var hCategory = d.createElement('h4');
                hCategory.classList.add('list-header');
                hCategory.innerHTML = props.category;

                // Fixme: configs.styleOptions.lineWidth needs to be implemented with generator?
                var parameters = ["arrowShape", "lineColor", "lineWidth"];
                //var parameters = ["arrowShape", "lineColor"];

                divCategory.appendChild(hCategory);

                console.debug(configs.styleOptions);

                parameters.forEach(function (parameter) {
                    var p = document.createElement('p');
                    p.innerHTML = parameter;
                    divCategory.appendChild(p);

                    var options = configs.styleOptions[parameter];
                    var values = [];
                    if (typeof options != 'undefined'){
                        values = options.map(function(option){
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
                    } catch (e){
                        console.warn("parameter not found");
                    }
                    divCategory.appendChild(selection);

                });

                // this is populated with options
                var ulCategory = document.createElement('ul');

                var liParam = document.createElement('li');
                var div = d.createElement('div');
                var spanLabel = d.createElement('span');
                div.classList.add('style-selection-div');

                parameters.forEach(function (parameter) {
                    spanLabel.innerHTML = parameter;
                    div.appendChild(spanLabel);

                    liParam.appendChild(div);

                    /*
                     if (parameter === 'line-style') {
                     var lineStyleSelection = styleSelection({
                     attributeId: 'select-line-style',
                     category: props.category,
                     selectionId: 'option-line-style',
                     options: configs.lines,
                     parameter: 'lineStyle'
                     });
                     liParam.appendChild(lineStyleSelection);
                     }*/
                });


                divCategory.appendChild(ulCategory);

                return divCategory;
            }

            try {
                console.group("Inside Styles.");
                var keys = Object.keys(styles);
                keys.forEach(function (category) {
                    console.debug("These needs to be rendered!");
                    console.debug(styles[category]);

                    var divCategory = styleList({
                        category: category,
                        style: styles[category]
                    });

                    div.appendChild(divCategory);
                });
            } catch (e) {
                console.group("Exception Styles");
                console.warn(e);
            }

            console.groupEnd();

            // Create the style option selection list
            /*
             try {
             elementStyles.styles().forEach(function (category) {

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
             var lineColorSelection = styleSelection({
             attributeId: 'select-line-color',
             category: category,
             selectionId: 'option-line-color',
             options: configs.colors,
             parameter: 'lineColor'
             });
             liParam.appendChild(lineColorSelection);
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

             ulCategory.appendChild(liParam);

             });
             divCategory.appendChild(ulCategory);
             div.appendChild(divCategory);
             });
             } catch (e) {
             console.group("Exception raised by stylesContent()");
             console.debug("props:");
             console.debug(props);
             console.warn(e);
             console.groupEnd();

             // return something
             div.innerHTML = "no edge categories";
             }*/
            return div;
        }

        /** @function renderTextPreview
         *  renderTextPreview()
         *  @return {Object} Div element with two child divs
         */
        function textPreview() {
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

        /** @function renderNavigation
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function navigation(props) {

            console.debug("navigation()");
            console.debug(props);

            // Create the div which contains graphingwikiBrowser navigation tabs

            var tabs = props.configs.tabs;

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
                divLink.setAttribute('id', "nav-item-" + link.label.toLowerCase());
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

            var divPanel = d.createElement('div');

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
            console.debug("NavProps!");
            console.debug(navProps);
            var tabNavDiv = navigation(navProps);

            console.debug("TabProps:");
            console.debug(props);
            props.tabs = props.configs.tabs;
            var tabsDiv = tabs(props);

            divPanel.appendChild(menuDiv);
            divPanel.appendChild(tabNavDiv);
            divPanel.appendChild(tabsDiv);

            return divPanel;
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

                var divContent = d.createElement('div');
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
                        setCurrentDetail: function () {
                            console.log("stub set detail")
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

            var divTabContainer = d.getElementById(classNames.tab.container);
            var panelContainer = d.getElementById(classNames.panel.container);
            var childsToRemove = divTabContainer.childNodes;

            childsToRemove.forEach(function (child) {
                divTabContainer.remove(child);
            });

            var tabsContent = tabs({
                cy: props.cy,
                tabs: configs.tabs
            });
            panelContainer.appendChild(tabsContent);
        }

        return {
            contentContainer: contentContainer,
            elementsContent: elementsContent,
            elementsFilter: elementsFilter,
            graphsContent: graphsContent,
            graphListItem: graphListItem,
            menu: menu,
            navigation: navigation,
            setMenuItems: setMenuItems,
            stylesContent: stylesContent,
            tabs: tabs,
            textPreview: textPreview,
            updateTabs: updateTabs,
            info: function () {
                return {
                    name: "UI",
                    description: "userinterface components."
                }
            }
        }
    }
);