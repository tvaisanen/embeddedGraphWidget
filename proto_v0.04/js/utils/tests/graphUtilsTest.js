/**
 * Created by toni on 19.7.2017.
 */

define([
    "utils/graphUtils",
    "dependencies/cytoscape",
    "components/elementStyles"
], function (graphUtils, cytoscape, elementStyles) {

    var gu = graphUtils;

    QUnit.module("Unit Tests - utils.graphUtils: ");

    QUnit.test("addClassToEdge()", function (assert) {
        assert.ok(false, "NOT IMPLEMENTED");
    });

    QUnit.test("bindExpandNode", function (assert) {
        assert.ok(false, "NOT IMPLEMENTED");

    });

    QUnit.test("createEdgeId()", function (assert) {

        var sourceId = 'source';
        var targetId = 'target';
        var edgeId = sourceId + '_to_' + targetId;
        assert.deepEqual(gu.createEdgeId(sourceId, targetId), edgeId, "returns id in correct format");
    });

    QUnit.test("createNewEdge()", function (assert) {
        var sourceId = 'source';
        var targetId = 'target';
        var edgeId = sourceId + '_to_' + targetId;
        var categoryClass = 'foo';
        var cy = cytoscape({
            elements: [
                {group: 'nodes', data: {id: sourceId}},
                {group: 'nodes', data: {id: targetId}},
                {group: 'edges', data: {id: edgeId, source: sourceId, target: targetId}}
            ]
        });
        var edge = cy.getElementById(edgeId);
        assert.ok(gu.edgeExists(edge.id(), cy), "Returned edge can be found from cy");
        assert.ok(gu.edgeExists(edgeId, cy), "New edge can be found with getElementById");
        assert.deepEqual(edge.id(), edgeId, "Returned edgeId() matches with with intended Id");
    });

    QUnit.test("createNodesAndEdgeBetween()", function (assert) {
        var idSource = 'source';
        var idTarget = 'target';
        var idOne = 'one';
        var idTwo = 'two';
        var idThree = 'three';
        var idFour = 'four';
        var edgeClass = 'foo';

        var cy = cytoscape({
            elements: [
                {group: 'nodes', data: {id: idSource}},
                {group: 'nodes', data: {id: idTarget}}
            ]
        });

        gu.createNodesAndEdgeBetween({
            sourceNodeId: idSource,
            targetNodeId: idTarget,
            category: edgeClass,
            cy: cy
        });

        gu.createNodesAndEdgeBetween({
            sourceNodeId: idSource,
            targetNodeId: idOne,
            category: edgeClass,
            cy: cy
        });

        gu.createNodesAndEdgeBetween({
            sourceNodeId: idTwo,
            targetNodeId: idTarget,
            category: edgeClass,
            cy: cy
        });

        gu.createNodesAndEdgeBetween({
            sourceNodeId: idThree,
            targetNodeId: idFour,
            category: edgeClass,
            cy: cy
        });


        var edgeOne = cy.getElementById(gu.createEdgeId(idSource, idTarget));
        var edgeTwo = cy.getElementById(gu.createEdgeId(idSource, idOne));
        var edgeThree = cy.getElementById(gu.createEdgeId(idTwo, idTarget));
        var edgeFour = cy.getElementById(gu.createEdgeId(idThree, idFour));

        var nodeOne = cy.getElementById(idOne);
        var nodeTwo = cy.getElementById(idTwo);
        var nodeThree = cy.getElementById(idThree);
        var nodeFour = cy.getElementById(idFour);

        console.debug("Debugging!");
        console.debug(edgeOne);
        console.debug(edgeOne.isEdge());

        assert.ok(edgeOne.isEdge(), "returns edge and is edge for existing nodes");
        assert.ok(edgeTwo.isEdge(), "returns edge and is edge for existing source and created target");
        assert.ok(edgeThree.isEdge(), "returns edge and is edge for existing target and created source");
        assert.ok(edgeFour.isEdge(), "returns edge and is edge for created source and target");
        assert.ok(nodeOne.isNode(), "creates the target node if not exist");
        assert.ok(nodeTwo.isNode(), "creates the source node if not exist");
        assert.ok(nodeThree.isNode() && nodeFour.isNode(), "creates the source node and target if not exist");

    });

    QUnit.test("createEdgesToNodes()", function (assert) {
        var idSource = 'source';
        var idOne = 'foo';
        var idTwo = 'bar';
        var idThree = 'hello';
        var targetIds = [idOne, idTwo, idThree];
        var category = 'foo';

        var cy = cytoscape({
            elements: [
                {group: 'nodes', data: {id: idSource}}
            ]
        });

        gu.createEdgesToNodes({
            sourceNodeId: idSource,
            targetNodeId: targetIds,
            nodesToCreateEdges: targetIds,
            category: category,
            cy: cy
        });

        var edgeOne = cy.getElementById(gu.createEdgeId(idSource, idOne));
        var edgeTwo = cy.getElementById(gu.createEdgeId(idSource, idTwo));
        var edgeThree = cy.getElementById(gu.createEdgeId(idSource, idThree));

        var nodeOne = cy.getElementById(idOne);
        var nodeTwo = cy.getElementById(idTwo);
        var nodeThree = cy.getElementById(idThree);

        var allEdgesCreatedIfNotExisting = edgeOne.isEdge() && edgeTwo.isEdge() && edgeThree.isEdge();
        var allNodesCreatedIfNotExisting = nodeOne.isNode() && nodeTwo.isNode() && nodeThree.isNode();

        assert.ok(allEdgesCreatedIfNotExisting, "creates all the edges if does not exist");
        assert.ok(allNodesCreatedIfNotExisting, "creates all the nodes if does not exist");
    });

    QUnit.test("createEdgesFromNodes()", function (assert) {
        var idTarget = 'target';
        var idOne = 'foo';
        var idTwo = 'bar';
        var idThree = 'hello';
        var sourceIds = [idOne, idTwo, idThree];
        var category = 'foo';

        var cy = cytoscape({
            elements: [
                {group: 'nodes', data: {id: idTarget}}
            ]
        });

        gu.createEdgesFromNodes({
            targetNodeId: idTarget,
            nodesFromCreateEdges: sourceIds,
            category: category,
            cy: cy
        });

        var edgeOne = cy.getElementById(gu.createEdgeId(idOne, idTarget));
        var edgeTwo = cy.getElementById(gu.createEdgeId(idTwo, idTarget));
        var edgeThree = cy.getElementById(gu.createEdgeId(idThree, idTarget));


        var nodeOne = cy.getElementById(idOne);
        var nodeTwo = cy.getElementById(idTwo);
        var nodeThree = cy.getElementById(idThree);

        var allEdgesCreatedIfNotExisting = edgeOne.isEdge() && edgeTwo.isEdge() && edgeThree.isEdge();
        var allNodesCreatedIfNotExisting = nodeOne.isNode() && nodeTwo.isNode() && nodeThree.isNode();
        assert.ok(allEdgesCreatedIfNotExisting, "creates all the edges if does not exist");
        assert.ok(allNodesCreatedIfNotExisting, "creates all the nodes if does not exist");
    });

    QUnit.test("createNewNode()", function (assert) {
        var cy = cytoscape({elements: [{group: 'nodes', data: {id: 'existingNode'}}]})
        var existingNodeId = 'existingNode';
        var newNodeId = 'newNode';

        assert.ok(gu.createNewNode(newNodeId, cy), "Return true upon creating new node");
        assert.notOk(gu.createNewNode(existingNodeId, cy), "Return false if trying to create node with an existing id.");
    });

    QUnit.test("elementHasCategoryClass()", function (assert) {

        var cy = cytoscape({elements: [{group: 'nodes', data: {id: 'existingNode'}}]})
        var existingNodeId = 'existingNode';
        var node = cy.getElementById(existingNodeId);
        var fooClass = 'foo';
        var barClass = 'bar';
        var categories = [fooClass, barClass];

        assert.notOk(gu.elementHasCategoryClass({
                element: node,
                categories: categories
            }),
            "Returns false when there is no category assigned."
        );

        node.addClass(fooClass);
        console.debug("has class 'foo': " + node.hasClass(fooClass));

        assert.ok(gu.elementHasCategoryClass({
                element: node,
                categories: categories
            }),
            "Returns true when there are category assigned."
        );
    });

    QUnit.test("expandNode", function (assert) {
        assert.ok(initCytoscape, "cytoscape returns");
    });

    QUnit.test("initCytoscape", function (assert) {
        var container = document.createElement('div');
        container.setAttribute('id', 'cy');
        document.body.appendChild(container);
        assert.ok(gu.initCy(container), "NOT IMPLEMENTED");
        document.body.removeChild(container);

    });

    QUnit.test("nodeIdAvailable()", function (assert) {

        var cy = cytoscape({elements: [{group: 'nodes', data: {id: 'existingNode'}}]});
        var existingNodeId = 'existingNode';
        var nonExistingNodeId = 'nonExistingNode';

        assert.notOk(
            gu.nodeIdAvailable({
                nodeId: existingNodeId,
                cy: cy
            }),
            "Returns false, when id already in use.");

        assert.ok(
            gu.nodeIdAvailable({
                nodeId: nonExistingNodeId,
                cy: cy
            }),
            "Returns true, when nodeId is available for use.");
    });

    QUnit.test("edgeExists()", function (assert) {
        var cy = cytoscape({
            elements: [
                {group: 'nodes', data: {id: 'source'}},
                {group: 'nodes', data: {id: 'target'}},
                {group: 'edges', data: {id: 'source_to_target', source: 'source', target: 'target'}},
            ]
        });

        var existingEdgeId = 'source_to_target';
        var nonExistingEdgeId = 'b_to_a';
        assert.ok(gu.edgeExists(existingEdgeId, cy), "Returns true, when edge exists.");
        assert.notOk(gu.edgeExists(nonExistingEdgeId, cy), "Returns false, when edge does not exist yet.");
    });

    QUnit.test("createNewEdge()", function (assert) {

        var sourceId = 'source';
        var targetId = 'target';
        var edgeId = sourceId + '_to_' + targetId;
        var categoryClass = 'foo';

        var cy = cytoscape({
            elements: [
                {group: 'nodes', data: {id: sourceId}},
                {group: 'nodes', data: {id: targetId}}
            ]
        });
        var edge = gu.createNewEdge({
            sourceNodeId: sourceId,
            targetNodeId: targetId,
            category: categoryClass,
            cy: cy,
            elementStyles: elementStyles
        });

        console.debug("Debug edgeID");
        console.debug(edge);
        console.debug(edge.id());

        assert.ok(gu.edgeExists(edge.id(), cy), "Returned edge can be found from cy");
        assert.ok(gu.edgeExists(edgeId, cy), "New edge can be found with getElementById");
        assert.deepEqual(edge.id(), edgeId, "Returned edgeId() matches with with intended Id");
    });

    QUnit.test("setAndRunLayout()", function (assert) {
        assert.ok(false, "NOT IMPLEMENTED");

    })

});
