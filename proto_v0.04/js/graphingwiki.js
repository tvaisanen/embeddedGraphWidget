/**
 * Created by Toni Väisänen on 6.6.2017.
 *
 */

define([
        "components/elementStyles",
        "components/ui",
        "configuration/configs",
        "utils/graphUtils",
        "utils/gwClient",
        "components/popup",
        "utils/eventListeners",
    "components/menuItems",
    "components/contextMenuItems"],
    function (elementStyles, ui, configs, graphUtils, gwClient, popup, eventListeners, menuItems, contextMenuItems) {
        /**
         * Graphingwikibrowser module.
         * @exports graphingwiki
         */

            // mediator pattern
        var EventProxy = function () {

                /*
                 {
                 id: "first",
                 obj: {
                 fn: function(){
                 console.log("i was here first");
                 }
                 }
                 },*/
                observers = [
                    {id: "eventProxy"}
                ];

                var dispatchActions = {
                    CONFIRM_SUBSCRIPTION: function (props) {
                        console.log('Confirm observer subscription.');
                        var index = observers.findIndex(function (observer) {
                            return observer.id == props.source;
                        });
                        if (index == -1) {
                            throw {name: "SubscriptionError", message: "EventProxy subscription failed"};
                        } else {
                            console.info("Subscription of " + observers[index].id + " confirmed.");
                        }

                    },
                    CONFIRM_SET_DISPATCH: function (props) {
                        console.info("Confirm setting dispatch for %s", props.source);
                    },
                    TEST_DISPATCH: function (props) {
                        console.log("EventProxy received dispatched action.");
                    },
                    trigger: function (props) {
                        dispatchActions[props.action](props);
                    },

                };

                return {
                    subscribe: function (observer) {
                        observers.push(observer);
                        observer.observer.setDispatch(eventProxy.dispatch);
                    },

                    /**
                     * @param {Object} props
                     * @param props.action Action to dispatch
                     * @param props.ctx Parent context
                     * @param props.id Id of the observer to notify
                     * @param props.info Additional information for debugging
                     * @param props.fn Function to trigger
                     */
                    dispatch: function (props) {
                        console.log(props);
                        if (props.target === "eventProxy") {
                            return dispatchActions.trigger(props);
                        }
                        try {
                            var index = observers.findIndex(function (observer) {
                                return observer.id == props.target;
                            });
                            if (index > -1) {
                                var dispatchResponse = observers[index].observer.triggerEvent(props);
                                console.log("EvenProxy returns dispatch response.");
                                console.log(dispatchResponse);
                                return dispatchResponse;
                            }

                        } catch (e) {
                            console.group("Exception raised by EventProxy.dispatch()");
                            console.info(props);
                            console.warn(e);
                            console.groupEnd();
                        }
                    }
                };
            };

        var eventProxy = new EventProxy();

        function subscribeComponents() {
            console.group("Subscribe event proxy modules.");
            eventProxy.subscribe({id: "ui", observer: ui});
            eventProxy.subscribe({id: "graphUtils", observer: graphUtils});
            eventProxy.subscribe({id: "gwClient", observer: gwClient});
            eventProxy.subscribe({id: "popup", observer: popup});
            eventProxy.subscribe({id: "elementStyles", observer: elementStyles});
            console.groupEnd();
        }

        function setConfigs() {
            // dependency injection
            ui.setConfigs({configs: configs});
            graphUtils.setConfigs({configs: configs});
            gwClient.setConfigs({configs: configs});
        }

        /**
         * @description eventListeners are injected to code
         * and these need to have access to dispatch
         */
        function setDispatch() {
            console.group("Set dispatch for modules modules.");
            eventListeners.setDispatch(eventProxy.dispatch);
            menuItems.setDispatch(eventProxy.dispatch);
            contextMenuItems.setDispatch(eventProxy.dispatch);
            console.groupEnd();
        }


        /**
         * @function
         * @name loadAppState
         * @description Load the state of the previous session, which
         * includes graphUtils.cy and elementStyles.styles.
         * */
        function loadAppState() {
            /* If browser provides storage, check if there are
             * session in storage.
             */
            if (typeof(Storage) !== "undefined") {

                // var loadState = confirm('Load previous state?');
                if (true) {
                    var appState = JSON.parse(localStorage.graphingwikiState);

                    var loadThisState = {
                        data: {
                            elements: appState.cy.elements,
                            style: appState.cy.style
                        }
                    };
                    elementStyles.setStyles({
                        styles: appState.styles
                    });
                } else {
                    cy
                    var loadThisState = {
                        data: {
                            elements: [{group: 'nodes', data: {id: 'OuluInfoSec'}}]
                        }
                    };
                }
                graphUtils.createNewCy(loadThisState);
            } else {
                // Sorry! No Web Storage support..
                console.debug("no local storage");
                graphUtils.initCy({
                    gwClient: gwClient,
                    container: document.getElementById('cy')
                });
            }

        }

        function loadFromFile() {
            // Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                console.log("filesupport gogo");// Great success! All the File APIs are supported.
            } else {
                alert('The File APIs are not fully supported in this browser.');
            }
        }

        // App state needs to be stored on exit!
        window.onbeforeunload = function (e) {
            try {
                var message = "Your confirmation message goes here.";
                var e = e || window.event;

                /*
                 // For IE and Firefox
                 if (e) {
                 //e.returnValue = message;
                 console.log('IE and Firefox - exit?');
                 return null;
                 }*/

                // For Safari

                var appState = {
                    cy: graphUtils.cy().json(),
                    styles: elementStyles.styles()
                };

                localStorage.setItem(
                    "graphingwikiState",
                    JSON.stringify(appState)
                );
            } catch (e) {
                alert(e);
            }


            return null;
        };


        /** @function renderHeaderContainer
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
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
         *  @return {Type} desc.
         */
        function renderHeader() {
            var header = document.createElement('h2');
            header.innerHTML = configs.header;
            return header;
        }

        /** @function
         *  render
         *  @param {Object} props
         *  @param props.variable description
         *  @return {Element} html div element containing the UI.
         */
        function render(props) {
            var appContainer = document.getElementById(configs.appContainerId);
            appContainer.appendChild(renderHeaderContainer(props));
            appContainer.appendChild(ui.contentContainer(props));
        }


        return {
            start: function (props) {
                setConfigs();
                subscribeComponents();
                setDispatch();
                render({gwClient: gwClient});
                loadAppState();
            }
        }
    });








