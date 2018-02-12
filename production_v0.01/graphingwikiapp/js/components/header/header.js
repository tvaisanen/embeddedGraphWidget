    /**
     * Created by tvaisanen on 12/22/17.
     */


    define(["configuration/configs",],
        function (configs) {
            "use strict";

            /**
             * Form for creating node post request.
             * @exports header
             */

            /** @function renderHeaderContainer
             *  Description
             *  @param {Object} variable - Desc.
             *  @return {HTMLElement} desc.
             */
            function renderHeaderContainer() {
                var headerContainer = document.createElement('div');
                headerContainer.setAttribute('id', "header-container");
                headerContainer.classList.add("header-container");
                headerContainer.appendChild(renderHeader());
                return headerContainer;
            }

            /** @function renderHeader
             *  Description
             *  @param {Object} variable - Desc.
             *  @return {HTMLElement} desc.
             */
            function renderHeader() {
                var header = document.createElement('span');
                header.className = 'header-title';
                header.innerHTML = configs.header;
                return header;
            }

            return {
                render: renderHeaderContainer
            }


        });