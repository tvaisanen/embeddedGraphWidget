/**
 * Created by tvaisanen on 12/22/17.
 */


define([],
    function () {
        "use strict";

        /**
         * @exports dispatchMessages
         */


        var dispatch;

        var actions = {
            confirmSubscription: "CONFIRM_SUBSCRIPTION"
        };

        /**
         *
         * @param data
         */
        function confirmSubscription(data) {
            dispatch({
                action: actions.confirmSubscription,
                ctx: this,
                target: "eventProxy",
                source: data.source,
                fn: null,
                info: "dev test"
            });
        };

        var ui = {
            elementIdsToArray : function () {
                dispatch({
                    action: "ELEMENT_IDS_TO_ARRAY",
                    ctx: this,
                    fn: null,
                    info: "dev test",
                    data: {selector: "node", filter: ""},
                    target: "graphUtils",
                    source: "ui"
                });
            }
        };

        return {
            setDispatch: function (fn) {
                dispatch = fn;
                confirmSubscription({source: "dispatchMessages"});
            },
            confirmSubscription: confirmSubscription,
            ui: ui,
        }


    });