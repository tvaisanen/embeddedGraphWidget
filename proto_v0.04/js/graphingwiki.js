/**
 * Created by Toni Väisänen on 6.6.2017.
 *
 */

define([
        "./configuration/classNames",
        "./components/elementStyles",
        "./components/ui",
        "./configuration/configs",
        "./utils/edgeCategories",
        "./utils/graphUtils",
        "./utils/gwClient"],
    function (classNames, elementStyles, ui, configs, edgeCategories, graphUtils, gwClient) {
        /**
         * Graphingwikibrowser module.
         * @exports graphingwiki
         */

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
            observers = [];

            return {
                subscribe: function (observer) {
                    observers.push(observer);
                    console.log(observer + " subscribed");
                },

                /**
                 * @param {Object} props
                 * @param props.ctx Parent context
                 * @param props.observer Observer to notify
                 * @param props.fn Function to trigger
                 */
                dispatch: function (props) {
                    console.log(props);
                    try {
                        var index = observers.findIndex(function(observer){
                          return observer.id == props.id;
                        });
                        if (index > -1) {
                            observers[index].observer.triggerEvent({message: props.message});
                        }

                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }

        var eventProxy = new EventProxy();

        function subscribeComponents() {
            eventProxy.subscribe({id: "ui", observer: ui});
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

                var loadState = confirm('Load previous state?');
                if (loadState) {
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


        /** @function downloadGraphPNG
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function downloadGraphPNG() {
            var pngGraph = graphUtils.cy().png({bg: 'white'});
            var a = document.createElement('a');
            a.href = pngGraph;
            a.download = 'graph.png';
            console.debug(a);
            a.click();
        }

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
                subscribeComponents();
                render({gwClient: gwClient});
                graphUtils.setDispatch(eventProxy.dispatch);
                loadAppState();
            }
        }
    });








