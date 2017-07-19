/**
 * Created by toni on 19.7.2017.
 */

define(["../graphUtils"], function (graphUtils) {
    function testAddClassToEdge() {
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


        QUnit.test("createNewEdge()", function (assert) {
            assert.ok(edgeExists(edge.id(), cy), "Returned edge can be found from cy");
            assert.ok(edgeExists(edgeId, cy), "New edge can be found with getElementById");
            assert.deepEqual(edge.id(), edgeId, "Returned edgeId() matches with with intended Id");
        });
    }

    function testCreateNodesAndEdgeBetween() {
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
        createNodesAndEdgeBetween(idSource, idTarget, edgeClass, cy);
        createNodesAndEdgeBetween(idSource, idOne, edgeClass, cy);
        createNodesAndEdgeBetween(idTwo, idTarget, edgeClass, cy);
        createNodesAndEdgeBetween(idThree, idFour, edgeClass, cy);


        var edgeOne = cy.getElementById(createEdgeId(idSource, idTarget));
        var edgeTwo = cy.getElementById(createEdgeId(idSource, idOne));
        var edgeThree = cy.getElementById(createEdgeId(idTwo, idTarget));
        var edgeFour = cy.getElementById(createEdgeId(idThree, idFour));

        var nodeOne = cy.getElementById(idOne);
        var nodeTwo = cy.getElementById(idTwo);
        var nodeThree = cy.getElementById(idThree);
        var nodeFour = cy.getElementById(idFour);

        QUnit.test("createNodesAndEdgeBetween()", function (assert) {
            assert.ok(edgeOne.isEdge(), "returns edge and is edge for existing nodes");
            assert.ok(edgeTwo.isEdge(), "returns edge and is edge for existing source and created target");
            assert.ok(edgeThree.isEdge(), "returns edge and is edge for existing target and created source");
            assert.ok(edgeFour.isEdge(), "returns edge and is edge for created source and target");
            assert.ok(nodeOne.isNode(), "creates the target node if not exist");
            assert.ok(nodeTwo.isNode(), "creates the source node if not exist");
            assert.ok(nodeThree.isNode() && nodeFour.isNode(), "creates the source node and target if not exist");

        });
    }

    function testCreateEdgesToNodes() {
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

        createEdgesToNodes(idSource, targetIds, category, cy);

        var edgeOne = cy.getElementById(createEdgeId(idSource, idOne));
        var edgeTwo = cy.getElementById(createEdgeId(idSource, idTwo));
        var edgeThree = cy.getElementById(createEdgeId(idSource, idThree));

        var nodeOne = cy.getElementById(idOne);
        var nodeTwo = cy.getElementById(idTwo);
        var nodeThree = cy.getElementById(idThree);

        var allEdgesCreatedIfNotExisting = edgeOne.isEdge() && edgeTwo.isEdge() && edgeThree.isEdge();
        var allNodesCreatedIfNotExisting = nodeOne.isNode() && nodeTwo.isNode() && nodeThree.isNode();

        QUnit.test("createEdgesToNodes()", function (assert) {
            assert.ok(allEdgesCreatedIfNotExisting, "creates all the edges if does not exist");
            assert.ok(allNodesCreatedIfNotExisting, "creates all the nodes if does not exist");
        });
    }

    function testCreateEdgesFromNodes() {
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

        createEdgesFromNodes(idTarget, sourceIds, category, cy);

        var edgeOne = cy.getElementById(createEdgeId(idOne, idTarget));
        var edgeTwo = cy.getElementById(createEdgeId(idTwo, idTarget));
        var edgeThree = cy.getElementById(createEdgeId(idThree, idTarget));

        console.debug(edgeOne.isEdge());
        console.debug(edgeTwo.isEdge());
        console.debug(edgeThree.isEdge());

        var nodeOne = cy.getElementById(idOne);
        var nodeTwo = cy.getElementById(idTwo);
        var nodeThree = cy.getElementById(idThree);

        var allEdgesCreatedIfNotExisting = edgeOne.isEdge() && edgeTwo.isEdge() && edgeThree.isEdge();
        var allNodesCreatedIfNotExisting = nodeOne.isNode() && nodeTwo.isNode() && nodeThree.isNode();

        QUnit.test("createEdgesFromNodes()", function (assert) {
            assert.ok(allEdgesCreatedIfNotExisting, "creates all the edges if does not exist");
            assert.ok(allNodesCreatedIfNotExisting, "creates all the nodes if does not exist");
        });
    }

    function testCreateNewNode() {
        var cy = cytoscape({elements: [{group: 'nodes', data: {id: 'existingNode'}}]})
        var existingNodeId = 'existingNode';
        var newNodeId = 'newNode';
        QUnit.test("Create new node.", function (assert) {
            assert.ok(createNewNode(newNodeId, cy), "Return true upon creating new node");
            assert.notOk(createNewNode(existingNodeId, cy), "Return false if trying to create node with an existing id.");
        })
    }

    function testNodeIdAvailable() {
        var cy = cytoscape({elements: [{group: 'nodes', data: {id: 'existingNode'}}]});
        var existingNodeId = 'existingNode';
        var nonExistingNodeId = 'nonExistingNode';
        QUnit.test("nodeIdAvailable()", function (assert) {
            assert.notOk(nodeIdAvailable(existingNodeId, cy), "Returns false, when id already in use.");
            assert.ok(nodeIdAvailable(nonExistingNodeId, cy), "Returns true, when nodeId is available for use.");
        })
    }

    function testEdgeExists() {
        var cy = cytoscape({
            elements: [
                {group: 'nodes', data: {id: 'source'}},
                {group: 'nodes', data: {id: 'target'}},
                {group: 'edges', data: {id: 'source_to_target', source: 'source', target: 'target'}},
            ]
        });

        var existingEdgeId = 'source_to_target';
        var nonExistingEdgeId = 'b_to_a';
        QUnit.test("nodeIdAvailable()", function (assert) {
            assert.ok(edgeExists(existingEdgeId, cy), "Returns true, when edge exists.");
            assert.notOk(edgeExists(nonExistingEdgeId, cy), "Returns false, when edge does not exist yet.");
        });
    }

    );
}

function testCreateNewEdge() {
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
    var edge = createNewEdge(sourceId, targetId, categoryClass, cy);
    console.debug(edge);

    QUnit.test("createNewEdge()", function (assert) {
        assert.ok(edgeExists(edge.id(), cy), "Returned edge can be found from cy");
        assert.ok(edgeExists(edgeId, cy), "New edge can be found with getElementById");
        assert.deepEqual(edge.id(), edgeId, "Returned edgeId() matches with with intended Id");
    });
}


}
)
;
