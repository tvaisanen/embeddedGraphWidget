/**
 * Created by toni on 9.8.2017.
 */

define(["utils/eventListeners", "configuration/classNames"], function (eventListeners, classNames) {
    "use strict";

    var popup = {
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
                console.debug(props);
                var selection = document.createElement('select');
                props.options.forEach(function (option) {
                    var o = document.createElement('option');
                    o.innerHTML = option;
                    selection.appendChild(o);
                });
                return selection;
            },
            render: function (props) {
                console.debug(props);
                var div = document.createElement('div');
                var input = document.createElement('input');
                input.setAttribute('type', 'text');
                // pass target node input field
                props.inTargetNodeId = input;

                var options = [];
                var elements = props.cy.elements('node');
                Object.keys(elements).forEach(function(el){
                    try {
                        options.push(elements[el].id());
                    } catch (e){
                        console.log(elements[el]);
                    }
                });

                console.info("Option count: " + options.length);

                div.appendChild(this.header({label: "select"}));
                div.appendChild(this.selection({options: options}));
                div.appendChild(this.header({label: "new"}));

                div.appendChild(input);
                div.appendChild(this.connectButton(props));
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
            var header = document.createElement('div');

            container.classList.add('popup');
            header.classList.add('popup-header');


            var spHeader = document.createElement('span');
            spHeader.innerHTML = this[props.context].title;
            spHeader.classList.add(classNames.popup.header.text);


            var btnClose = document.createElement('button');
            btnClose.innerHTML = "close";
            btnClose.classList.add(classNames.popup.header.btnClose);
            btnClose.addEventListener('click', destroyPopUp);

            header.appendChild(spHeader);
            header.appendChild(btnClose);

            var content = this[props.context].render(props);
            container.appendChild(header);
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