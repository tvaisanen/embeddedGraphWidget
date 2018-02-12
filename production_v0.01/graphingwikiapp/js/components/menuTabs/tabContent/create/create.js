
define(["components/nodeForm/nodeForm"],
    function (nodeForm) {
        "use strict";

        /**
         * @function
         * @name createNodeContent
         * @description Create content for panel tab "Create node"
         * @param {Object} variable - Desc.
         * @return {HTMLElement} desc.
         */
        function nodeTabContent(props) {
            try {
                console.debug("createnodeContent props!");
                console.debug(props);
                // var content = props.content;

                return nodeForm.render(props.dispatch);

            } catch (e) {
                console.group("Exception raised by ui.createnodeContent()");
                console.info("props");
                console.info(props);
                console.warn(e);
                console.groupEnd();
            }
        }

        return {
            render: nodeTabContent
        }
    });