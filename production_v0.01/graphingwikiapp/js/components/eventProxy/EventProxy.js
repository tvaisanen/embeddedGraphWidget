/**
 * Created by tvaisanen on 12/22/17.
 */


define([],
    function () {
        "use strict";

        /**
         * Form for creating node post request
         *
         * @exports EventProxy
         *
         */

        function EventProxy() {

            this.name = "eventProxy";

            // Registered proxy modules
            // {id: module.name(), observer: module}
            this.observers = [
                {id: "eventProxy", observer: this}
            ];

            var dispatchActions = {
                CONFIRM_SUBSCRIPTION: function (props) {
                    console.log('Confirm observer subscription.');
                    var index = this.observers.findIndex(function (observer) {
                        return observer.id == props.source;
                    });
                    if (index == -1) {
                        throw {name: "SubscriptionError", message: "EventProxy subscription failed"};
                    } else {
                        console.info("Subscription of " + this.observers[index].id + " confirmed.");
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
                }
            };

            /**
             * @param {Object} props
             * @param props.action Action to dispatch
             * @param props.ctx Parent context
             * @param props.id Id of the observer to notify
             * @param props.info Additional information for debugging
             * @param props.fn Function to trigger
             */
            this.dispatch = function (props) {
                console.log(props);
                if (props.target === "eventProxy") {
                    return dispatchActions.trigger(props);
                }
                try {
                    var index = this.observers.findIndex(function (observer) {
                        return observer.id == props.target;
                    });
                    if (index > -1) {
                        var dispatchResponse = this.observers[index].observer.triggerEvent(props);
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

            this.subscribe = function (observer) {
                try {
                    this.observers.push(observer);
                    //observer.setDispatch(this.dispatch);
                } catch (error){
                    console.warn(error);
                    console.warn(observer);
                }
            }
        }

        return EventProxy;
    });