/**
 * Created by toni on 19.7.2017.
 */


define([
        "../utils/eventListeners",
        "../configuration/classNames"],
    function (eventListeners, classNames) {

        var d = document;



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
            console.debug('DEbug mE!');
            console.debug(props);

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
            var menus = Object.keys(props.menuItems);

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

        /** @function elementsContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function elementsContent(props) {
            /*
             * Implement elements tab rendering here
             *
             * */
            var content = props.content;

            console.debug("Debugging ui.elementsContent()");
            console.debug(props);

            var div = d.createElement('div');
            div.setAttribute('id', "elements-content");

            div.appendChild(elementsFilter(props));
            div.appendChild(elementsList(props));

            return div;
        }

        /** @function renderElementsfilter
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function elementsFilter() {
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
                listenerFunctions.elementsFilter.inFilter.keypress(filtProps);
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
            console.debug("Debugging ui.elementsList()");
            console.debug(props);
            var content = props.content;
            var cy = props.cy;
            var gw = props.gwClient;

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

        // Todo: refactor - too big function!
        /** @function renderStylesContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
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

            var styles = props.content;
            var div = document.createElement('div');
            div.setAttribute('id', "styles-content");
            var ul = document.createElement('ul');
            var cy = props.cy;

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
                        props.styleSelectionListener({
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

            // Create the div which contains graphingwikiBrowser navigation tabs.

            console.debug("Debugging ui.navigation()");
            console.debug(props);


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

                /** @function updateTabs
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function updateTabs(props) {

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

            var tabsContent = tabs({
                cy: props.cy,
                configs: props.configs
            });
            panelContainer.appendChild(tabsContent);
        }

                /** @function renderTabs
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function tabs(props) {
            /*
             * Returns the container for tabs in the side panel
             */

            var divContent = d.createElement('div');
            divContent.classList.add(classNames.tab.container);
            divContent.id = classNames.tab.container;

            console.debug("Debugging ui.tabs()");
            console.debug(props);

            // render content
            console.debug(props);
            if (props.configs.tabs.graphs.active) {
                divContent.appendChild(
                    graphsContent({
                        cy: props.cy,
                        gwClient: props.gwClient
                    }));

            } else if (props.configs.tabs.elements.active) {
                divContent.appendChild(elementsContent(props));

            } else if (props.configs.tabs.styles.active) {
                divContent.appendChild(stylesContent());
            }

            return divContent;
        }

        return {
            elementsContent: elementsContent,
            graphsContent: graphsContent,
            graphListItem: graphListItem,
            menu: menu,
            navigation: navigation,
            stylesContent: stylesContent,
            tabs: tabs,
            textPreview: textPreview
        }
    }
);