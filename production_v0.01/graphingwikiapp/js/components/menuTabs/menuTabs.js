/**
 * Created by tvaisanen on 29/1/18.
 */


define([],
    function () {
        "use strict";

        /**
         * Component for controlling the preview box.
         * Responsible of rendering the page content and
         * graph data for previewing.
         * @exports previewController
         */

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
        var dispatchActions = {
            SET_CONTENT: setContent,
            trigger: function (props) {
                this[props.action](props.data);
            }
        };

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

        return {

        }
    });