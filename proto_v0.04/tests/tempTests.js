/**
 * Created by toni on 19.7.2017.
 */

function testCytoscapeIntegrationInit(testState) {
    setProps(testState, 'all');
    QUnit.test("Cytoscape container initialised", function (assert) {
        assert.deepEqual(props.cy.container().id, "cy", "cy container id = 'cy'");
        assert.ok(props.cy.container().classList.contains("graph-container"), "cy container has class 'graph-container'");
    });
}

function testGraphingWikiClientInit(testState) {
    setProps(testState, 'all');
    var moduleName = props.gw.getModuleName();
    QUnit.test("Test GraphingWikiClientInit", function (assert) {
        assert.equal(moduleName, "GraphingWiki client", "gwClient is initialized correctly.");
    });
}

function testAppContainerInit(testState) {
    setProps(testState, 'all');
    var container = d.getElementById(props.appContainerId);
    console.log("container: " + container);
    QUnit.test("App container initialized correctly", function (assert) {
        var notUndefined = (container != 'undefined' && container != null);
        assert.ok(notUndefined, "App container is defined");
    })
}



function testToggleVisibility() {

    var idVisible = 'visibleNode';
    var idHidden = 'hiddenNode';

    var cy = cytoscape({
        container: d.getElementById('cy'),
        elements: [
            {group: 'nodes', data: {id: idVisible}},
            {group: 'nodes', data: {id: idHidden}}
        ]
    });

    var nodeVisible = cy.getElementById(idVisible);
    var nodeHidden = cy.getElementById(idHidden);

    // hide the nodeHidden to test toggling from hidden.
    nodeHidden.hide();

    console.debug("before toggling - visible is hidden: " + nodeVisible.hidden());
    console.debug("before toggling - hidden is hidden: " + nodeHidden.hidden());

    toggleVisibility({
        elementId: idVisible,
        cy: cy
    });
    toggleVisibility({
        elementId: idHidden,
        cy: cy
    });

    console.debug("after toggling - visible is hidden: " + nodeVisible.hidden());
    console.debug("after toggling - hidden is hidden: " + nodeHidden.hidden());

    QUnit.test("toggleVisibility() - cytoscape visibility toggling", function (assert) {
        assert.ok(nodeVisible.hidden(), "toggleVisibility hides node if not hidden");
        assert.notOk(nodeHidden.hidden(), "toggleVisibility shows node if hidden");
    })
}


function testElementHasCategoryClass() {
    var idFoo = 'foo';
    var idBar = 'bar';
    var classname = 'class';
    var categories = ['class', 'foo'];
    var cy = cytoscape({
        elements: [
            {group: 'nodes', data: {id: idFoo}},
            {group: 'nodes', data: {id: idBar}}
        ]
    });
    var elementFoo = cy.getElementById(idFoo);
    var elementBar = cy.getElementById(idBar);

    // add category class to foo
    elementFoo.addClass(classname);

    var fooHasCategoryClass = elementHasCategoryClass(elementFoo, categories);
    var barHasCategoryClass = elementHasCategoryClass(elementBar, categories);

    QUnit.test("testElementHasOneOfCategories()", function (assert) {
        assert.ok(fooHasCategoryClass, "Return true when element has one of defined categories");
        assert.notOk(barHasCategoryClass, "Return false when element does not have category defined.");
    })
}


function testUpdateCategories(testState) {
    setProps(testState, 'all');

    var categories = ['hello', 'world'];
    var newCategories = ['foo', 'bar'];
    var expectedCategories = ['hello', 'world', 'foo', 'bar'];

    setEdgeCategories(categories);

    var currentCategories = getEdgeCategories();
    console.debug(currentCategories);
    var updatedCategories = updateCategories(newCategories, currentCategories);
    console.debug(getEdgeCategories());

    QUnit.test("updateEdgeCategories()", function (assert) {
        assert.deepEqual(updatedCategories, expectedCategories, "updates categories correctly");
    });
}
function testSetEdgeCategories(testState) {
    setProps(testState, 'all');
    var categories = ['hello', 'world'];
    var categoriesSet = setEdgeCategories(categories);
    console.debug('?');
    console.debug(getEdgeCategories());
    QUnit.test("setEdgeCategories()", function (assert) {
        assert.equal(getEdgeCategories(), categories, "sets categories");
        assert.deepEqual(categoriesSet, categories, "returns categories");
    });
}

function testHandleNavClick(testState) {
    setProps(testState, 'all');

    function printTabs() {
        var elements = props.tabs.elements.active;
        var graphs = props.tabs.graphs.active;
        var styles = props.tabs.styles.active;
        console.log("Activity status");
        console.log("Elements: " + elements);
        console.log("Elements: " + elements);
        console.log("Graphs: " + graphs);
        console.log("Styles: " + styles);
    }

    QUnit.test("Initial states of graphingwikiBrowser activity is ok.", function (assert) {
        assert.deepEqual(props.tabs.elements.active, false);
        assert.deepEqual(props.tabs.graphs.active, false);
        assert.deepEqual(props.tabs.styles.active, true);
    });
}

        function testInitNewGraph() {
            var data = {
                elements: {
                    nodes: [
                        {
                            data: {id: "personA"},
                            position: {"x": 420.97222900390625, "y": 243.05557250976562},
                            group: "nodes",
                            removed: false,
                            selected: true,
                            selectable: true,
                            locked: false,
                            grabbable: true,
                            classes: ""
                        }
                    ]
                },
                style: [{
                    selector: "node",
                    style: {
                        "background-color": "#6490af",
                        "label": "data(id)"
                    }
                }]
            };

            // init should return element like this
            var cyExpect = cytoscape({
                container: document.getElementById('cy'),
                elements: data.elements,
                style: data.style,
                layout: {name: 'preset'}
            });
            cyExpect.on('tap', 'node', function (evt) {
                var node = evt.target;
                var nodeId = node.id();
                var cy = this;
                expandNode(nodeId, cy);
            });
            /*----------------------------------------*/

            var cy = initNewGraph(data);

            var cyExEles = JSON.stringify(cyExpect.json().elements);
            var cyEles = JSON.stringify(cy.json().elements);
            var cyExStyle = JSON.stringify(cyExpect.json().style);
            var cyStyle = JSON.stringify(cy.json().style);

            console.debug(JSON.stringify(cyExEles));
            console.debug(JSON.stringify(cyEles));
            console.debug(JSON.stringify(cyExEles) === JSON.stringify(cyEles));
            QUnit.test("initNewGraph()", function (assert) {
                assert.ok(cy, "Function returns");
                assert.deepEqual(cyEles, cyExEles, "Returns cytoscape instance with expected elements.");
                assert.deepEqual(cyStyle, cyExStyle, "Returns cytoscape instance with expected style.");
            });
        }