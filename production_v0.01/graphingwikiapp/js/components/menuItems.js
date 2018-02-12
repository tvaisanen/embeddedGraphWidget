/**
 * Created by toni on 19.7.2017.
 */

define(["utils/eventListeners", "components/elementStyles", "configuration/configs"],
    function (eventListeners, elementStyles, configs) {
        "use strict";

        /**
         * MenuItems lists the components in the side bar menu.
         *
         * @exports menuItems
         */

        var dispatch;

        /** @function generateContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function generateContent() {
            "use strict";
            var div = document.createElement('div');
            return div;
        }


        return {
            setDispatch: function (fn) {
                dispatch = fn;
                dispatch({
                    action: "CONFIRM_SET_DISPATCH",
                    ctx: this,
                    target: "eventProxy",
                    source: "menuItems",
                    fn: null,
                    info: "dev test"
                });
            },
            items: {
                user: {
                    label: "Set User",
                    onClick: function (){
                        var username = prompt("Username");
                        var password = prompt("Password");
                        dispatch({
                            action: "SET_USER",
                            ctx: this,
                            data: {
                                username: username,
                                password: password
                            },
                            target: "gwClient",
                            source: "menuItems",
                            fn: null,
                            info: "dev test"
                        });

                    },
                    generateContent: function(){
                        var div = document.createElement('div');
                        return div;
                    }
                },
                frontpage: {
                    label: "FrontPage",
                    onClick: function setRootToFrontPage() {
                        var newNodeData = {
                            nodeId: "FrontPage"
                        };
                        var nodePromise = dispatch({
                            action: "GET_NODE_DATA",
                            ctx: this,
                            props: newNodeData,
                            target: "gwClient",
                            source: "nodeForm",
                            fn: null,
                            info: "dev test"
                        });

                        console.debug("NodePromise");
                        console.debug(nodePromise);

                        nodePromise.data.then(function(response){
                            return response.json();
                        }).then(function(json){
                            json.nodeId = 'FrontPage';
                            dispatch({
                            action: "CREATE_NEW_NODE",
                            ctx: this,
                            props: json.data,
                                data: {
                                nodeId: 'FrontPage',
                                pagename: 'FrontPage',
                                content: "hello"
                            },
                            target: "graphUtils",
                            source: "nodeForm",
                            fn: null,
                            info: "dev test"
                        });
                        });
                        var a = document.createElement('a');
                    },
                    generateContent: generateContent
                },
                download: {

                    label: "Download",
                    content: "Click to download image.",
                    onClick: /** @function downloadGraphPNG
                     *  Description
                     *  @param {Object} variable - Desc.
                     *  @return {Type} desc.
                     */
                        function downloadGraphPNG() {
                        //var pngGraph = graphUtils.cy().png({bg: 'white'});
                        var pngGraph = dispatch({
                            action: "GET_PNG",
                            ctx: this,
                            target: "graphUtils",
                            source: "menuItems",
                            fn: null,
                            info: "dev test"
                        });
                        var a = document.createElement('a');
                        a.href = pngGraph;
                        a.download = 'graph.png';
                        console.debug(a);
                        a.click();
                    },
                    generateContent: generateContent
                },
                save: {
                    label: "Save",

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
        }
    });