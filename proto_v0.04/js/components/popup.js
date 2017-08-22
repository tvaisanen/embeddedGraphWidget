/**
 * Created by toni on 9.8.2017.
 */

define([
    "utils/eventListeners",
    "configuration/classNames",
    "components/elementStyles"
], function (eventListeners, classNames, elementStyles) {
    "use strict";
    var dispatch;
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
                    var targetNodeId = target.options[target.selectedIndex].text;

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


                    // Todo: Dispatch me via eventproxy to graphUtils
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
            header: function (props) {
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
            selection: function (props) {
                var selection = document.createElement('select');
                selection.setAttribute('id', props.id);
                props.options.forEach(function (option) {
                    var o = document.createElement('option');
                    o.innerHTML = option;
                    selection.appendChild(o);
                });
                return selection;
            },
            selectOrCreate: function (props) {
                var div = document.createElement('div');
                div.classList.add("popup__select-or-create");
                div.appendChild(this.header({label: props.label}));

                var active = "select"; // or "new"

                var selection = this.selection({
                    id: props.selectionId,
                    options: props.options
                });

                var divChoices = document.createElement('div');
                divChoices.setAttribute('id', props.selectionId + "Choices");
                divChoices.classList.add("popup__select-or-create__choices");

                function clickEvent(event) {
                    console.debug("click choice");
                    console.debug(event.target);
                    var childs = document.getElementById(props.selectionId + "Choices").childNodes;
                    console.log(typeof event.target.id);
                    console.log("select = " + event.target.id.endsWith("select"));
                    console.log("new = " + event.target.id.endsWith("new"));
                    childs.forEach(function (child) {
                        console.debug(child);
                        child.classList.remove("popup__select-or-create__choice-active");
                    });
                    event.target.classList.add("popup__select-or-create__choice-active");


                    if (event.target.id.endsWith("select")) {
                        // render selection
                        div.replaceChild(selection, div.childNodes[2]);
                        console.log(div.childNodes);
                    } else if (event.target.id.endsWith("new")) {
                        var input = document.createElement('input', 'text');
                        div.replaceChild(input, div.childNodes[2]);
                        console.log(div.childElementCount);
                        // render input
                    }
                }

                var spnSelect = document.createElement('span');
                spnSelect.setAttribute('id', "selectOrCreate__choice-select");
                spnSelect.classList.add("popup__select-or-create__choice-active");
                spnSelect.innerHTML = "select";
                spnSelect.addEventListener('click', clickEvent);

                var spnNew = document.createElement('span');
                spnNew.setAttribute('id', "selectOrCreate__choice-new");
                spnNew.innerHTML = "new";
                spnNew.classList.add("popup__select-or-create__choice-inactive");
                spnNew.addEventListener('click', clickEvent);

                divChoices.appendChild(spnSelect);
                divChoices.appendChild(spnNew);
                div.appendChild(divChoices);
                div.appendChild(selection);
                return div;
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
                // var elements = props.cy.elements('node');
                var elements = dispatch({
                    action: "GET_ELEMENTS",
                    ctx: this,
                    data: {
                        selector: "node"
                    },
                    target: "graphUtils",
                    source: "popup",
                    fn: null,
                    info: "dev test"
                });
                console.debug(elements);
                Object.keys(elements).forEach(function (el) {
                    try {
                        nodeOptions.push(elements[el].id());
                    } catch (e) {
                        console.log(elements[el]);
                    }
                });

                console.info("Option count: " + nodeOptions.length);

                input.setAttribute('type', 'text');
                input.placeholder = "node name..";
                // div.appendChild(newNodeInput);

                var selectOrCreateNode = this.selectOrCreate({
                    options: nodeOptions,
                    label: "Connect to node",
                    selectionId: "createEdgeTargetNode"
                });

                var selectOrCreateCategory = this.selectOrCreate({
                    options: elementStyles.getCategories(),
                    label: "Add category",
                    selectionId: "createEdgeCategory"
                });

                div.appendChild(selectOrCreateNode);
                div.appendChild(selectOrCreateCategory);

                // div.appendChild(this.header({label: "create new"}));

                // div.appendChild(input);

                div.appendChild(this.connectButton({
                    sourceNodeId: props.sourceNode.id(),
                    selectionNodeId: "createEdgeTargetNode",
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
        preview: {
            title: "Text preview",
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
                console.log('create popup with this!');
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

    var dispatchActions = {
        TEST_DISPATCH: function (props) {
            console.log('test');
            console.log(props);
        },
        CREATE: function (props){
            create(props.data);
        },
        trigger: function (props) {
            this[props.action](props);
        }
    };

    return {
        create: create,
        setDispatch: function (fn) {
            dispatch = fn;
            dispatch({
                action: "CONFIRM_SUBSCRIPTION",
                ctx: this,
                target: "eventProxy",
                source: "popup",
                fn: null,
                info: "dev test"
            });
        },
        triggerEvent: function (props) {
            console.log(props);
            return dispatchActions.trigger(props);
        }
    }
});