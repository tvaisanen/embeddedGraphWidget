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

function testCy(containerElement) {
    return cytoscape({
        container: containerElement,
        elements: [{group: 'nodes', data: {id: 'personA'}}],
        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#6490af',
                    'size': '40',
                    'label': 'data(id)',
                    'content': 'data(id)',
                    'text-valign': 'center',
                    'color': 'white',
                    'text-outline-width': 1,
                    'text-outline-color': '#000000',
                    'background-color': '#9a9a9a'
                }
            },


            {
                selector: 'node.highlight',
                style: {
                    'background-color': '#c50004',
                }
            },

            {
                selector: 'node.hover-on',
                style: {
                    'background-color': '#00ff14',
                }
            },

            {
                selector: 'edge',
                style: {
                    'line-color': '#ccc',
                    'target-arrow-color': '#000000',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                    'overlay-padding': 1
                }
            },
            {
                selector: 'edge.mouse-over',
                style: {label: 'category'}
            },

            // Todo: generate these from config! priority: low

            {selector: 'edge.line-style-solid', style: {'line-style': 'solid'}},
            {selector: 'edge.line-style-dotted', style: {'line-style': 'dotted'}},
            {selector: 'edge.line-style-dashed', style: {'line-style': 'dashed'}},

            {selector: 'edge.line-width-0', style: {'line-width': 0}},
            {selector: 'edge.line-width-1', style: {'line-width': 1}},
            {selector: 'edge.line-width-2', style: {'line-width': 2}},
            {selector: 'edge.line-width-3', style: {'line-width': 3}},
            {selector: 'edge.line-width-4', style: {'line-width': 4}},
            {selector: 'edge.line-width-5', style: {'line-width': 5}},
            {selector: 'edge.line-width-6', style: {'line-width': 6}},
            {selector: 'edge.line-width-7', style: {'line-width': 7}},
            {selector: 'edge.line-width-8', style: {'line-width': 8}},
            {selector: 'edge.line-width-9', style: {'line-width': 9}},
            {selector: 'edge.line-width-10', style: {'line-width': 10}},
            {selector: 'edge.line-width-11', style: {'line-width': 11}},
            {selector: 'edge.line-width-12', style: {'line-width': 12}},
            {selector: 'edge.line-width-13', style: {'line-width': 13}},
            {selector: 'edge.line-width-14', style: {'line-width': 14}},
            {selector: 'edge.line-width-15', style: {'line-width': 15}},
            {selector: 'edge.line-width-16', style: {'line-width': 16}},
            {selector: 'edge.line-width-17', style: {'line-width': 17}},
            {selector: 'edge.line-width-18', style: {'line-width': 18}},
            {selector: 'edge.line-width-19', style: {'line-width': 19}},
            {selector: 'edge.line-width-20', style: {'line-width': 20}},
            {selector: 'edge.line-width-21', style: {'line-width': 21}},
            {selector: 'edge.line-width-22', style: {'line-width': 22}},
            {selector: 'edge.line-width-23', style: {'line-width': 23}},
            {selector: 'edge.line-width-24', style: {'line-width': 24}},
            {selector: 'edge.line-width-25', style: {'line-width': 25}},
            {selector: 'edge.line-width-26', style: {'line-width': 26}},
            {selector: 'edge.line-width-27', style: {'line-width': 27}},
            {selector: 'edge.line-width-28', style: {'line-width': 28}},
            {selector: 'edge.line-width-29', style: {'line-width': 29}},
            {selector: 'edge.line-width-30', style: {'width': 30}},

            {selector: 'edge.arrow-shape-tee', style: {'target-arrow-shape': 'tee'}},
            {selector: 'edge.arrow-shape-triangle', style: {'target-arrow-shape': 'triangle'}},
            {selector: 'edge.arrow-shape-triangle-tee', style: {'target-arrow-shape': 'triangle-tee'}},
            {selector: 'edge.arrow-shape-triangle-cross', style: {'target-arrow-shape': 'triangle-cross'}},
            {
                selector: 'edge.arrow-shape-triangle-backcurve',
                style: {'target-arrow-shape': 'triangle-backcurve'}
            },
            {selector: 'edge.arrow-shape-square', style: {'target-arrow-shape': 'square'}},
            {selector: 'edge.arrow-shape-circle', style: {'target-arrow-shape': 'circle'}},
            {selector: 'edge.arrow-shape-diamond', style: {'target-arrow-shape': 'diamond'}},
            {selector: 'edge.arrow-shape-none', style: {'target-arrow-shape': 'none'}},

            {selector: 'edge.line-color-grey', style: {'line-color': 'grey', 'arrow-color': 'grey'}},
            {selector: 'edge.line-color-black', style: {'line-color': 'black', 'arrow-color': 'black'}},
            {selector: 'edge.line-color-red', style: {'line-color': 'red', 'arrow-color': 'red'}},
            {selector: 'edge.line-color-green', style: {'line-color': 'green', 'arrow-color': 'green'}},
            {selector: 'edge.line-color-orange', style: {'line-color': 'orange', 'arrow-color': 'orange'}},
            {selector: 'edge.line-color-yellow', style: {'line-color': 'yellow', 'arrow-color': 'yellow'}},
            {selector: 'edge.line-color-cyan', style: {'line-color': 'cyan', 'arrow-color': 'cyan'}},
            {selector: 'edge.line-color-blue', style: {'line-color': 'blue', 'arrow-color': 'blue'}},


            {
                selector: 'edge.hover-on',
                style: {
                    'width': 5,
                    'line-color': '#cc7500',
                    'line-style': 'dashed',
                    'target-arrow-color': '#000000',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                }
            },

            {
                selector: 'edge.highlight',
                style: {
                    'width': 5,
                    'line-color': '#cc7500',
                    'line-style': 'dashed',
                    'target-arrow-color': '#000000',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier',
                }
            },
        ],
    });
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

