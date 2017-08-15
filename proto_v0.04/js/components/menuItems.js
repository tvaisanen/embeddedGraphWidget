/**
 * Created by toni on 19.7.2017.
 */

define(["utils/eventListeners", "components/elementStyles"],
    function (eventListeners, elementStyles) {
        "use strict";

        /**
         * menuItems
         * @exports menuItems
         */


        /** @function generateContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function generateContent() {
            "use strict";
            var div = document.createElement('div');
            div.innerHTML = this.content;
            return div;
        }

        function getItems() {

        }

        return {
            download: {
                label: "Download",
                content: "Click to download image.",
                onClick: function () {
                    alert("eventListeners.downloadGraphPNG");
                },
                generateContent: generateContent
            },
            loadFile: {
                label: "Load from file",
                content: "Load graph from file",
                onClick: function () {
                    if (window.File && window.FileReader && window.FileList && window.Blob) {
                        console.log("file support gogo");// Great success! All the File APIs are supported.
                        var fileInput = document.createElement('input');
                        fileInput.setAttribute('type', 'file');
                        fileInput.setAttribute('id', 'files');
                        fileInput.click
                        var reader = new FileReader();
                    } else {
                        alert('The File APIs are not fully supported in this browser.');
                    }
                },
                generateContent: generateContent
            },
            save: {
                label: "Save",
                content: "form to input graph name",
                onClick: function (props) {
                    console.log("save.onClick()");
                    console.log(props);
                    var graphId = prompt("Save graph\nId:");
                    eventListeners.ui.menu.save({
                        gwClient: props.gw,
                        graphId: graphId,
                        graph: props.cy.json(),
                        styles: elementStyles.styles()
                    });

                    // funcProps.context = 'save';
                    // createPopUp(funcProps);
                },
                generateContent: generateContent
            }
        }
    });