/**
 * Created by toni on 19.7.2017.
 */

define(function () {

    return {
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
                keypress: function (filtProps) {
                    console.groupCollapsed("elementsFilter.inFilter.keypress()");
                    try {
                        var filterValue = filtProps.inFilter.value;

                        props.tabs.elements.filter = filterValue;
                        filtProps.spanFilter.innerHTML = ": filter :" + filterValue;

                        /* elesContent has to be declared here
                         *  it is created dynamically and therefore can not
                         *  be passed as prop
                         */
                        var elesContent = d.getElementById('elements-content');
                        var newContent = filtProps.renderNewContent();
                        var oldContent = elesContent.childNodes[1];
                        elesContent.replaceChild(newContent, oldContent);
                    } catch (e) {
                        console.warn("elementsFilter.inFilter.keypress()");
                        console.warn(e);
                    }
                    console.groupEnd();
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

            /** @function elementsList.onClick()
             *  elementsList.onClick()
             * @param {Object} funcProps
             */
            onClick: function (funcProps) {
                var evt = funcProps.evt;

                if (evt.target.type === 'checkbox') {
                    toggleVisibility({
                        elementId: funcProps.elementId,
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
                    setTextPreviewContent(evt.target.id);
                }
            },

            /** @function elementsList.onMouseover()
             *  elementsList.onMouseover()
             * @param {Object} funcProps
             */
            onMouseOver: function mouseOver(funcProps) {
                try {
                    var node = funcProps.cy.getElementById(funcProps.listItemId);
                    node.toggleClass('hover-on');
                    toggleNeighbourhood(node);
                } catch (e) {
                    console.warn("Exception raised by elementsList.onMouseOver()");
                    console.warn(e);
                }
            },
            /** @function elementsList.onMouseout()
             *  elementsList.onMouseout()
             * @param {Object} funcProps
             */
            onMouseOut: function mouseOut(funcProps) {
                try {
                    var node = funcProps.cy.getElementById(funcProps.listItemId);
                    node.toggleClass('hover-on');
                    toggleNeighbourhood(node);
                } catch (e) {
                    console.warn("Exception raised by elementsList.onMouseOut()");
                    console.warn(e);
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
                    console.group("graphList.listItem.onClick()");
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
                                props.cy.destroy();
                                props.cy = initNewGraph(json.data);
                            });
                        }

                    } catch (e) {
                        console.warn("graphList.listItem.onClick()");
                        console.warn(e);
                    }
                }
            }
        },
        styleList: {
            styleSelection: function (funcProps, value) {
                try {
                    console.group('styleSelectionEventListener()');
                    console.debug('1. try - catch block.');
                    var selector = funcProps.baseClass + '.' + funcProps.category;
                    var categoryElements = cy.elements(funcProps.baseClass + '.' + funcProps.category);
                    console.debug(selector);
                    console.debug('CategoryElements');
                    console.debug(categoryElements);
                    // defaults
                    var classesToRemove = elementStyles.getStyle();

                    // do only if the value is not all ready in the category styles
                    try {
                        console.debug('2. try - catch block.');
                        var categoryNotListed =
                            elementStyles.categoryExists(funcProps.category);
                        if (categoryNotListed) {
                            console.debug('condition: categoryNotListed');
                            // if category is not listed, the defaults are in use
                            console.debug('setting value');
                            console.debug(funcProps);
                            elementStyles.setStyle({
                                category: funcProps.category,
                                cy: cy,
                                style: funcProps.parameter,
                                value: funcProps.value,
                                baseClass: funcProps.baseClass
                            });
                            var addThese = elementStyles.getStyle(funcProps.category);
                            console.debug(addThese);
                            element.addClass(addThese);
                            console.debug("Updated category to elementStyles");
                            console.debug(funcProps);
                            console.debug(elementStyles.getStyle(funcProps.category));
                        }
                    } catch (e) {
                        console.debug('2. catch.');
                        // if category not listed add it
                        elementStyles.setStyle({
                            category: funcProps.category,
                            cy: cy,
                            style: funcProps.parameter,
                            value: funcProps.value,
                            baseClass: funcProps.baseClass
                        });
                        console.debug("Add category to elementStyles");
                        console.debug(funcProps);
                        console.debug(elementStyles.getStyle(funcProps.category));
                    }

                    var classesToAdd = elementStyles.getStyle(funcProps.category);
                    /*
                     console.debug('reached categoryElements.forEach()');
                     categoryElements.forEach(function (element) {
                     var addThese = classesToAdd.join().replace(',', ' ');
                     var removeThese = classesToRemove.join().replace(',', ' ');

                     classesToRemove.forEach(function(item){
                     console.debug(element.id()+".removeClass('"+item+"')");
                     element.removeClass(item);
                     });

                     classesToAdd.forEach(function(item){
                     console.debug(element.id()+".addClass('"+item+"')");
                     element.toggleClass(item);
                     });

                     // element.removeClass(removeThese);
                     // element.addClass(addThese);
                     console.debug("Element classes!");
                     console.debug(element.classes());
                     //element.toggleClass(funcProps.value);
                     });*/
                } catch (e) {
                    console.debug('1. catch.');
                    console.groupCollapsed("Exception raised by styleSelectionEventListener().");
                    console.warn(e);
                    console.warn("props:");
                    console.debug(funcProps);
                }

                console.debug(elementStyles);
                console.groupEnd();


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