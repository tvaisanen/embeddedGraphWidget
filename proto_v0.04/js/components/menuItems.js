/**
 * Created by toni on 19.7.2017.
 */

define(["../utils/eventListeners"], function (eventListeners) {
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
            save: {
                label: "Save",
                content: "form to input graph name",
                onClick: function (funcProps) {
                    console.log("save.onClick()");
                    console.log(funcProps);
                    // funcProps.context = 'save';
                    // createPopUp(funcProps);
                },
                generateContent: generateContent
            }
        }
});