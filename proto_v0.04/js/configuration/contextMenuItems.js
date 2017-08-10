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

    return {
        menuItems: [
            {
                id: 'debug',
                content: 'debug',
                tooltipText: 'debug',
                selector: '*',
                onClickFunction: function (event) {
                    console.log(event);
                    console.log(parent);
                    console.log(graphUtils.info());
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
                    popup.create({
                        context: 'createEdge',
                        graphUtils: graphUtils,
                        sourceNode: source,
                        cy: event.cy
                    });
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
                    var targetId = prompt('Provide id for the new node.');
                    var data = {
                        group: 'nodes',
                        id: targetId
                    };

                    var pos = event.position || event.cyPosition;
                    // todo: refactor to be standalone function
                    var promise = props.gw.savePageToMoin(targetId, 'hello');
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
            },
            {
                id: 'remove-selected',
                content: 'remove selected',
                tooltipText: 'remove selected',
                coreAsWell: true,
                onClickFunction: function (event) {
                    cy.$(':selected').remove();
                }
            },
            /*{
             id: 'select-all-nodes',
             content: 'select all nodes',
             tooltipText: 'select all nodes',
             selector: 'node',
             onClickFunction: function (event) {
             selectAllOfTheSameType(event.target || event.cyTarget);
             }
             },
             {
             id: 'select-all-edges',
             content: 'select all edges',
             tooltipText: 'select all edges',
             selector: 'edge',
             onClickFunction: function (event) {
             selectAllOfTheSameType(event.target || event.cyTarget);
             }
             }*/
        ]
    };
})