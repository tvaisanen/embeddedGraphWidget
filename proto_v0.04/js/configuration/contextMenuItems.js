/**
 * Created by toni on 4.8.2017.
 */

define([
    "components/popup",
    "utils/eventListeners",
    "utils/graphUtils"
], function (popup, eventListeners, graphUtils) {

    console.log("debugging contextMenu");
    try {
        console.log(eventListeners);
    } catch (e) {
        console.log(e);
        console.log("eventListener load fail");
    }

    var dispatch;

    return {
        setDispatch: function (fn) {
            dispatch = fn;
            dispatch({
                action: "TEST_DISPATCH",
                ctx: this,
                target: "eventProxy",
                source: "contextMenuItems",
                fn: null,
                info: "dev test"
            });
        },
        menuItems: [
            {
                id: 'debug',
                content: 'debug',
                tooltipText: 'debug',
                selector: '*',
                onClickFunction: function (event) {
                    console.log(event);
                    var test = prompt('debug');
                    eval(test);
                }
            },
            {
                id: 'element-class',
                content: 'has class?',
                tooltipText: 'prompt has class query',
                selector: 'edge',
                onClickFunction: function (event) {
                    var source = event.target || event.cyTarget;
                    var elClass = prompt("Has class:");
                    var hasIt = source.hasClass(elClass);
                    console.info(source.id() + " has class " + elClass + " : " + hasIt);
                    console.info("classes:");
                    console.info(source.renderedStyle());
                    console.info(source.hasClass('arrow-shape-triangle'));
                }
            },
            {
                id: 'edge-details',
                content: 'details',
                tooltipText: 'node details for debugging',
                selector: 'edge',
                onClickFunction: function (event) {
                    var source = event.target || event.cyTarget;
                    console.info("Id: " + source.id());
                    console.info("classes:");
                    console.info(source.hasClass('line-width-8'));
                    console.info(source.hasClass('arrow-shape-triangle'));
                }
            },
            {
                id: 'add-edge',
                content: 'connect',
                tooltipText: 'add edge between this node and the chosen node',
                selector: 'node',
                onClickFunction: function (event) {
                    console.debug("context menu connect props");
                    console.debug(event);
                    var source = event.target || event.cyTarget;
                    console.info('I am ' + source.id() + ' and I want to connect!');
                    // todo: finish!
                    console.log(parent);

                    dispatch({
                        action: "CREATE",
                        ctx: this,
                        data: {
                            context: "createEdge",
                            sourceNode: source
                        },
                        fn: null,
                        info: "dev test",
                        source: "contextMenuItems",
                        target: "popup"
                    });

                    /*
                    props.popup.create({
                        context: 'createEdge',
                        graphUtils: graphUtils,
                        sourceNode: source,
                        cy: event.cy
                    });*/
                }
            },
            {
                id: 'hide',
                content: 'hide',
                tooltipText: 'hide',
                selector: '*',
                onClickFunction: function (event) {
                    var target = event.target || event.cyTarget;
                    target.hide();
                },
                disabled: false
            },
            {
                id: 'add-node',
                content: 'add node',
                tooltipText: 'add node',
                coreAsWell: true,
                onClickFunction: function (event) {
                    try {
                        var targetId = prompt('Provide id for the new node.');
                        var data = {
                            group: 'nodes',
                            id: targetId
                        };

                        var pos = event.position || event.cyPosition;
                        // todo: refactor to be standalone function
                        //var promise = props.gw.savePageToMoin(targetId, 'hello');

                        var promise = dispatch({
                            action: "POST_NODE",
                            ctx: this,
                            data: {
                                nodeId: targetId,
                                content: "hello"
                            },
                            fn: null,
                            info: "dev test",
                            source: "contextMenuItems",
                            target: "gwClient"
                        });

                        promise.then(function (response) {
                            var j = response.json();
                            console.log(j);
                            return j;
                        }).then(function (obj) {
                            console.log(obj);
                            createNewNode(targetId, cy);
                        });
                        /*
                         cy.add({
                         data: data,
                         position: {
                         x: pos.x,
                         y: pos.y
                         }
                         });*/
                    }
                    catch (e) {
                        console.group("Exceptino raised by ctxMenuItems.addNode.onClickFunction()");
                        console.warn(e);
                        console.groupEnd();
                    }
                }
            },
            {
                id: 'remove-selected',
                content: 'remove selected',
                tooltipText: 'remove selected',
                coreAsWell: true,
                onClickFunction: function (event) {
                    cy.$(':selected').remove();
                }
            }
        ]
    };


});
