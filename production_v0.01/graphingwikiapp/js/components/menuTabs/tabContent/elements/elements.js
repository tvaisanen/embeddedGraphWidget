
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

        return {
            render: elementsContent
        }
    });