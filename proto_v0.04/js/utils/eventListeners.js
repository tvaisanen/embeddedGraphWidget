/**
 * Created by toni on 19.7.2017.
 */

define([
    "utils/graphUtils",
    "configuration/classNames",
    "components/elementStyles",
], function (graphUtils, classNames, elementStyles) {
    "use strict";
    /**h
     * @description Event listeners description here
     * @exports eventListeners
     */

    var dispatch;

    return {
        setDispatch: function (fn) {
            dispatch = fn;
            dispatch({
                action: "CONFIRM_SET_DISPATCH",
                ctx: this,
                target: "eventProxy",
                source: "eventListeners",
                fn: null,
                info: "dev test"
            });
        },
        contextMenu: {
            debug: function (event) {
                console.log(event);
                console.log(parent);
                var test = prompt('debug');
                eval(test);
            }
        },
        graph: {
            clickNode: function (props) {
                console.debug("graph.clickNode()");
                console.debug(props);

                /*graphUtils.expandNode({
                 nodeId: props.nodeId,
                 cy: props.cy,
                 gwClient: props.gwClient,
                 edgeCategories: props.edgeCategories,
                 elementStyles: props.elementStyles
                 });*/
                console.debug("UI:");
            }
        },
        popupSave: {
            btnSave: {
                onClick: function (funcProps) {
                    console.group("menuItemCreate.btnSave.onClick()");
                    console.info("Clicked create node button.");
                    console.info("Current value: " + funcProps.name);

                    var promise = funcProps.gw.savePageToMoin(funcProps.name, 'hello');
                    promise.then(function (response) {
                        var j = response.json();
                        console.info(j);
                        return j;
                    }).then(function (obj) {
                        console.info(obj);
                        console.groupEnd();
                    }).catch(function (error) {
                        console.warn(error);
                        console.groupEnd();
                    });
                }
            }
        },
        popupConnect: {
            btnConnect: {
                /** @function popupConnect.btnConnect.onClick()
                 *  popupConnect.btnConnect.onClick()
                 *  @param {Object} funcProps {targetNodeId, cy}
                 */
                onClick: function (funcProps) {
                    console.log(funcProps);
                    console.log("btnConnect.onClick() connecting node: " + funcProps.sourceNode.id() + " to " + funcProps.inTargetNodeId.value);
                }
            },
            btnSelect: {
                /** @function popupConnect.btnSelect.onClick()
                 *  popupConnect.btnSelect.onClick()
                 *  @param funcProps {}
                 */
                onClick: function (funcProps) {

                    function bindNodeSelection(funcProps) {
                        console.log('here!');
                        console.log(funcProps);
                        return function (event) {
                            console.log(event.target.id());
                            console.log(funcProps);
                            console.log("Select the node, which to connect!");

                            createNewEdge(
                                funcProps.sourceNode.id(),
                                event.target.id(),
                                'category',
                                funcProps.cy
                            );
                            funcProps.cy.off('tap');
                            clearMessageText();
                            funcProps.cy.on('tap', bindExpandNode);
                        };
                    }

                    console.log("btnSelect");
                    console.log(funcProps);
                    console.log("now you need to bind listener for cy.select");
                    funcProps.cy.off('tap');
                    funcProps.cy.on('tap', 'node', bindNodeSelection(funcProps));
                    destroyPopUp();
                    setMessageText({messageText: "Select node to connect!"});
                    //alert("now there should be somekind of notification that the user may select a node");
                }
            }
        },
        elementsFilter: {
            inFilter: {
                keypress: function (props) {

                    try {
                        var filterValue = props.inFilter.value;

                        props.spanFilter.innerHTML = filterValue;

                        /* elesContent has to be declared here
                         *  it is created dynamically and therefore can not
                         *  be passed as prop
                         */
                        var elesContent = document.getElementById('elements-content');
                        var newContent = props.renderNewContent({filter: filterValue});
                        var oldContent = elesContent.childNodes[1];
                        elesContent.replaceChild(newContent, oldContent);
                        dispatch({
                            action: "ELEMENTS_LIST",
                            ctx: this,
                            data: {
                                filter: filterValue
                            },
                            target: "ui",
                            source: "eventListeners",
                            fn: null,
                            info: "dev test"
                        });
                    } catch (e) {
                        console.groupCollapsed("elementsFilter.inFilter.keypress()");
                        console.warn("elementsFilter.inFilter.keypress()");
                        console.warn(e);
                        console.groupEnd();

                    }
                }
            },
            btnClearFilter: {
                onClick: function (updateTabs) {
                    try {
                        console.group("btnClearFilter.onClick()")
                        props.tabs.elements.filter = '';
                        updateTabs();
                    } catch (e) {
                        console.warn("Exception raised by btnClearFilter.onClick()");
                        console.warn(e);
                    }
                }
            }
        },
        elementsList: {
            /**
             * @function
             * @name elementsList.onClick
             * elementsList.onClick()
             * @param {Object} props
             */
            onClick: function (props) {
                var evt = props.evt;

                if (evt.target.type === 'checkbox') {
                    graphUtils.toggleVisibility({
                        elementId: props.elementId,
                        cy: cy
                    });

                } else {
                    try {
                        if (props.currentDetail) {
                            props.currentDetail.classList.remove(
                                classNames.tab.elements.listItem.selected);
                        }

                        props.currentDetail = evt.target;
                        props.currentDetail.classList.add(classNames.tab.elements.listItem.selected);
                        // console.debug(props.currentDetail);

                    } catch (e) {
                        console.warn("Exception raised by unorderedList -> li.addEventListener()");
                        console.warn(e);
                    }
                    props.setTextPreview(evt.target.id);
                }
            },

            /**
             * @function
             * @name onMouseover
             * @description event listener on mouse cytoscape element
             * @param {Object} props
             */
            onMouseOver: function mouseOver(props) {
                try {
                    var node = props.cy.getElementById(props.listItemId);
                    node.toggleClass('hover-on');
                    graphUtils.toggleNeighborhood({node: node});
                } catch (e) {
                    console.group("Exception raised by elementsList.onMouseOver()");
                    console.debug("props");
                    console.debug(props);
                    console.warn(e);
                }
            },
            /**
             * @function
             * @name onMouseout()
             * @description Action to be triggered when mouse hovers out of list item element.
             * @param {Object} props
             * @param {Object} props.cy Cytoscape instance
             * @param {Object} props.listItemId Element id shown by the list item.
             */
            onMouseOut: function mouseOut(props) {
                try {
                    var node = props.cy.getElementById(props.listItemId);
                    node.toggleClass('hover-on');
                    graphUtils.toggleNeighborhood({node: node});
                } catch (e) {
                    console.group("Exception raised by elementsList.onMouseOut()");
                    console.debug("props");
                    console.debug(props);
                    console.warn(e);
                    console.groupEnd();
                }
            }
        },
        graphsList: {
            listItem: {
                /** @function graphList.listItem.onClick()
                 *  graphList.listItem.onClick()
                 *  Load new graph to canvas with gwClient.
                 *  todo: the gw action.
                 *  Graphingwiki action is the interface for this action.
                 *  @param {Object} listItemProps
                 */
                onClick: function (props) {
                    console.debug("listItem.onClick(props)");
                    console.debug(props);
                    try {
                        var graphName = props.graphName;
                        var gwClient = props.gwClient;

                        console.log("clicked: " + graphName);

                        // Todo: precautions!
                        var confirmChange = true;
                        if (confirmChange) {
                            var graphPromise = gwClient.getGraph('graph/' + graphName);
                            graphPromise.then(function (response) {
                                var json = response.json();
                                return json;
                            }).then(function (json) {
                                // todo: make function out of this!
                                try {
                                    graphUtils.cy().destroy();
                                } catch (e) {
                                    if (e.type === typeof TypeError) {
                                        console.log("TYPEERRRO=R");
                                    }
                                }
                                graphUtils.createNewCy({
                                    data: json.data.graph
                                });
                                console.debug("just before setstyles");
                                console.debug(elementStyles);
                                elementStyles.setStyles({
                                    styles: json.data.styles
                                });
                            });
                        }
                    } catch (e) {
                        console.group("eventListeners.graphList.listItem.onClick()");
                        console.debug("props:");
                        console.debug(props);
                        console.warn(e);
                        console.groupEnd();
                    }
                }
            }
        },
        styleList: {
            styleSelection: function (props) {
                try {
                    var styleParameterToUpdate = {};
                    styleParameterToUpdate[props.parameter] = props.value;

                    console.debug("this will be passed on");
                    console.debug(styleParameterToUpdate);
                    console.debug()
                    console.debug("styleSelection(props)");
                    console.debug(props);

                    elementStyles.updateStyleParameter({
                        category: props.category,
                        style: styleParameterToUpdate,
                        info: "Update style values to elementsStyle.category."
                    });

                    graphUtils.updateCategoryElementStyle({
                        category: props.category,
                        info: "Update style classes of the elements in the category."
                    });

                } catch (e) {
                    console.groupCollapsed("Exception raised by styleSelectionEventListener().");
                    console.debug("props:");
                    console.debug(props);
                    console.warn(e);
                    console.groupEnd();
                }
            }
        },
        ui: {
            /** @function handleNavClick
             *  Description
             *  @param {Object} variable - Desc.
             *  @return {Type} desc.
             */
            navClick: function (props) {
                console.debug("debugging navClick()");
                console.debug(props);

                var keyToActivate = props.keyToActivate;
                var tabs = props.configs.tabs;
                var navItemClasses = props.classNames.tab.nav.item;

                // remove active class from every link
                var links = Object.keys(tabs);
                links.forEach(function (key) {
                    tabs[key].active = false;
                    document.getElementById("nav-item-" + key)
                        .classList.remove(navItemClasses.active);
                });

                // activate clicked link
                tabs[keyToActivate].active = true;
                document.getElementById("nav-item-" + keyToActivate)
                    .classList.add(navItemClasses.active);

                props.updateTabs({
                    cy: props.cy,
                    tabs: props.configs.tabs
                });
            },
            menu: {
                /**
                 * @function
                 * @name menu.save()
                 * @description Description
                 * @param {Object} props
                 * @param {String} props.graphId
                 * @param {Object} props.graph
                 * @param {Object} props.styles
                 * @return {Type} desc.
                 */
                save: function (props) {
                    try {
                        console.debug("menu.save(props)");
                        console.debug(props);
                        console.debug(Object.values(props));
                        var containsUndefined = Object.values(props).some(function (value) {
                            return typeof value === 'undefined';
                        });

                        if (containsUndefined) {
                            throw {
                                name: "InvalidPropsError",
                                message: "Invalid props!",
                                props: props
                            };
                        }

                        console.debug("Props passed the check!");


                        var promise = props.gwClient.postGraph({
                            graphId: props.graphId,
                            graph: props.graph,
                            styles: props.styles
                        });

                        promise.then(function (response) {
                            var j = response.json();
                            console.info(j);
                            return j;
                        }).then(function (obj) {
                            console.info(obj);
                            console.groupEnd();
                        }).catch(function (error) {
                            console.warn(error);
                            console.groupEnd();
                        });

                    } catch (e) {
                        console.group("Exception raised by eventListeners.ui.menu.save()");
                        console.debug("props:");
                        console.debug(props);
                        console.warn(e);
                        console.groupEnd();
                    }
                }
            }
        },
        window: {
            onClick: function (event) {

                // todo: remove hardcoding
                var popupId = 'popup';

                var popup = d.getElementById(popupId);
                // if popup is null do nothing, if not then close popup
                // if the clicked target is not the popup
                if (popupId) {
                    console.debug('popup is active');
                    console.debug(event.target.id);
                    if (event.target.id !== popupId) {
                        // todo:
                        // set guard that the popup does not
                        // get destroyed with the same click as it were created
                        console.debug("destroy");
                    }
                }
            }
        }
    };

});