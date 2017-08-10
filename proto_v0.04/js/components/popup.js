/**
 * Created by toni on 9.8.2017.
 */

define([
    "utils/eventListeners",
    "configuration/classNames",
    "components/elementStyles",
    "utils/graphUtils"
], function (eventListeners, classNames, elementStyles, graphUtils) {
    "use strict";

    var popup = {
        createEdge: {
            // todo: refactor
            title: "Connect",
            connectButton: function (props) {
                var btnConnect = document.createElement('button');
                btnConnect.innerHTML = "connect";
                btnConnect.addEventListener('click', function () {
                    console.debug(props);
                    var target = document.getElementById(props.selectionNodeId);
                    var targetNodeId = target.textContent;
                    console.log("source: " + props.sourceNodeId);
                    console.log("target: " + targetNodeId);
                    console.log(target);
                    /* Todo: Fix this!
                    * {
                    *   sourceNodeId: "object",
                    *   selectionNodeId: "targetNodeSelection",
                    *   selectionCategoryId: "categorySelection",
                    *   cy: Core
                    * }
                    *   source: object
                    *   target: personA
                    *   <option id=​"targetNodeSelection">​personA​</option>​
                    *   Can not create second element with ID `undefined_to_personA`
                    **/

                    cy.add({
                        group: 'edges',
                        data: {
                            id: props.sourceNodeId + "_to_" + targetNodeId,
                            source: props.sourceNodeId,
                            target: targetNodeId
                        }
                    });

                    //eventListeners.popupConnect.btnConnect.onClick(props);
                });
                return btnConnect;
            },
            header: function (props){
                var header = document.createElement('span');
                header.innerHTML = props.label;
                return header;
            },
            selectButton: function (props) {
                var btnSelect = document.createElement('button');
                btnSelect.innerHTML = "select";
                btnSelect.addEventListener('click', function () {
                    eventListeners.popupConnect.btnSelect.onClick(props);
                });
                return btnSelect;
            },
            selection: function (props) {
                var selection = document.createElement('select');
                props.options.forEach(function (option) {
                    var o = document.createElement('option');
                    o.setAttribute('id', props.id);
                    o.innerHTML = option;
                    selection.appendChild(o);
                });
                return selection;
            },
            render: function (props) {
                console.debug(props);
                console.debug(props.sourceNode.id());
                var div = document.createElement('div');
                var input = document.createElement('input');
                input.setAttribute('type', 'text');
                // pass target node input field
                props.inTargetNodeId = input;

                var nodeOptions = [];
                var cy = props.cy;
                var elements = props.cy.elements('node');
                Object.keys(elements).forEach(function(el){
                    try {
                        nodeOptions.push(elements[el].id());
                    } catch (e){
                        console.log(elements[el]);
                    }
                });

                console.info("Option count: " + nodeOptions.length);

                div.appendChild(this.header({label: "Connect to"}));
                div.appendChild(this.header({label: "select"}));
                div.appendChild(this.selection({
                    id: "targetNodeSelection",
                    options: nodeOptions
                }));
                div.appendChild(this.header({label: "create new"}));

                var newNodeInput = document.createElement('input');
                input.setAttribute('type', 'text');
                input.placeholder = "node name..";
                div.appendChild(newNodeInput);
                div.appendChild(this.header({label: "Add category"}));
                div.appendChild(this.header({label: "select"}));

                var categoryOptions = elementStyles.getCategories();
                div.appendChild(this.selection({
                    id: "categorySelection",
                    options: categoryOptions
                }));
                div.appendChild(this.header({label: "create new"}));

                div.appendChild(input);

                div.appendChild(this.connectButton({
                    sourceNodeId: props.sourceNode.id(),
                    selectionNodeId: 'targetNodeSelection',
                    selectionCategoryId: 'categorySelection',
                    cy: cy
                }));
                div.appendChild(this.selectButton(props));

                return div;
            }
        },
        download: {
            title: "Download the graph!",
            render: function () {
                var div = document.createElement('div');
                div.innerHTML = "Download the graph!";
                return div;
            }
        },
        save: {
            title: "Save the graph",
            saveButton: function (props) {
                var btnSave = document.createElement('button');
                btnSave.innerHTML = "save";
                btnSave.addEventListener('click', function () {
                    eventListeners.popupSave.btnSave.onClick({
                        gw: props.gw,
                        name: input.value
                    });
                });
                return btnSave;
            },

            render: function (props) {

                console.debug(props);

                var div = document.createElement('div');
                var input = document.createElement('input');

                input.setAttribute('type', 'text');

                div.appendChild(input);
                div.appendChild(this.saveButton(props));

                return div;
            }
        },

        popupItem: {
            title: "Your title",
            render: function () {
                console.log('create popup with this!')
            }
        },

        render: function (props) {

            console.debug("popup render");
            console.debug(props);

            var container = document.createElement('div');

            container.classList.add('popup');

            var btnClose = document.createElement('button');
            btnClose.innerHTML = "close";
            btnClose.classList.add(classNames.popup.header.btnClose);
            btnClose.addEventListener('click', destroyPopUp);

            var content = this[props.context].render(props);

            container.appendChild(btnClose);
            container.appendChild(content);

            return container;
        }
    };

    var menuExtension = {
        items: {
            createEdge: {
                // todo: refactor
                title: "Connect",
                connectButton: function (props) {
                    var btnConnect = document.createElement('button');
                    btnConnect.innerHTML = "connect";
                    btnConnect.addEventListener('click', function () {
                        eventListeners.popupConnect.btnConnect.onClick(props);
                    });
                    return btnConnect;
                },
                selectButton: function (props) {
                    var btnSelect = document.createElement('button');
                    btnSelect.innerHTML = "select";
                    btnSelect.addEventListener('click', function () {
                        eventListeners.popupConnect.btnSelect.onClick(props);
                    });
                    return btnSelect;
                },
                render: function (props) {
                    console.debug(props);
                    var div = document.createElement('div');
                    var input = document.createElement('input');
                    input.setAttribute('type', 'text');
                    // pass target node input field
                    props.inTargetNodeId = input;

                    div.appendChild(input);
                    div.appendChild(this.connectButton(props));
                    div.appendChild(this.selectButton(props));

                    return div;
                }
            },
            save: {
                title: "Save the graph",
                saveButton: function (props) {
                    var btnSave = document.createElement('button');
                    btnSave.innerHTML = "save";
                    btnSave.addEventListener('click', function () {
                        eventListeners.popupSave.btnSave.onClick({
                            gw: props.gw,
                            name: input.value
                        });
                    });
                    return btnSave;
                },

                render: function (props) {

                    console.debug(props);

                    var div = document.createElement('div');
                    var input = document.createElement('input');

                    input.setAttribute('type', 'text');

                    div.appendChild(input);
                    div.appendChild(this.saveButton(props));

                    return div;
                }
            },

            popupItem: {
                title: "Your title",
                render: function () {
                    console.log('create popup with this!')
                }
            }
        },

        render: function (props) {
            try {
                console.debug("menuExtension render");
                console.debug(props);


                var container = document.createElement('div');
                var header = document.createElement('div');

                //container.classList.add('popup');
                //header.classList.add('popup-header');

                var btnClose = document.createElement('button');
                btnClose.innerHTML = "close";
                //btnClose.classList.add(classNames.popup.header.btnClose);
                btnClose.addEventListener('click', destroyPopUp);

                header.appendChild(btnClose);

                var content = this.items[props.context].render(props);
                container.appendChild(header);
                container.appendChild(content);

                return container;
            } catch (e) {
                console.warn("Exception raised by menuExtension.render()");
                console.warn(e);
                console.warn("props:");
                console.warn(props);
            }
        }
    };

    /** @function createPopUp
     *  popup for saving the graphs
     */
    function create(props) {

        // naming should be more declarative
        // the props act as a panelProps
        // and props.props as props
        // for the next function

        //var container = document.getElementById('message-container');
        //var content = menuExtension.render(props);
        //container.appendChild(content);


        console.debug("createPopup()");
        console.debug(props);
        console.log(props.context);

        var divPopup = document.createElement('div');
        divPopup.classList.add('popup');
        divPopup.setAttribute('id', 'popup');
        var content = popup.render(props);
        divPopup.appendChild(content);
        document.body.appendChild(divPopup);
        //var infoBox = document.getElementById('message-container');
        //infoBox.appendChild(divPopup);

        console.debug('popup');
    }

    function destroyPopUp() {
        var p = document.getElementById('popup');
        document.body.removeChild(p);
        console.debug("closed popup!");
    }

    return {
        create: create
    }
});