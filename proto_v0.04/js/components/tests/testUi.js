/**
 * Created by toni on 19.7.2017.
 */
function testRenderTextPreview() {
    setProps(testState, 'all');
    var textPreview = renderTextPreview();
    console.debug(textPreview.classList.contains('text-preview'));
    QUnit.test("renderTextPreview()", function (assert) {
        assert.ok(textPreview, "returns");
        assert.deepEqual(textPreview.id, classNames.text.container, "Text preview returns div with an correct ID");
        assert.deepEqual(textPreview.childElementCount, 2, "Text preview returns with correct amount of childs");
        assert.deepEqual(textPreview.childNodes[0].id, classNames.text.header, "Text preview returns with correct header div as first child");
        assert.deepEqual(textPreview.childNodes[1].id, classNames.text.content, "Text preview returns with correct content div as second child");
        assert.deepEqual(textPreview.childNodes[0].classList[0], classNames.text.header,
            "First child has correct class initialized");
        assert.deepEqual(textPreview.childNodes[1].classList[0], classNames.text.content,
            "Second child has correct class initialized");

    });
}

function testRenderTabs() {
    setProps(testState, 'all');
    var tabs = renderTabs();
    QUnit.test("RenderTabs()", function (assert) {
        assert.ok(tabs, "happening");
    });
}

function testRenderStylesContent(testState) {
// set context for tests

    setProps(testState, 'all');
    handleNavClick('styles');
    var stylesContent = renderStylesContent();
    QUnit.test("Rendering the graphs tab", function (assert) {
        assert.equal(stylesContent.id, "styles-content", "renderStylesContent() returns div with proper id");
    });
}

function testRenderMenu(testState) {
    setProps(testState, 'all');
    var classes = classNames.menu;
    var menuContainer = renderMenu();
    var childs = menuContainer.childNodes;
    var childsHaveCorrectIds = true;


    childs.forEach(function (element) {
        var starts = element.id.startsWith("panel-menu__item__");
        childsHaveCorrectIds = childsHaveCorrectIds && starts;
    });

    QUnit.test("renderMenu() tests", function (assert) {
        assert.ok(true, "Executes");
        assert.equal(
            menuContainer.id, classes.container,
            "Returns div container with correct id.");
        assert.ok(childsHaveCorrectIds, "Container childs have correct ids.");
    });
}

function testRenderGraphListItem() {
    // set context for tests
    console.group("testRenderGraphListItem()");


    var ul = document.createElement('ul');
    var listProps = {
        graphName: "foo",
        gw: props.gw,
        listElement: ul,
        listItemClass: classNames.tab.graph.listItem.inactive
    }
    var listItem = renderGraphListItem(listProps);

    QUnit.test("renderGraphListItem()", function (assert) {
        assert.ok(listItem, "renderListItem() returns a value");
        assert.ok(listItem.classList.contains(listProps.listItemClass), "list item has correct class assigned");
    });
    console.groupEnd();
}


function testRenderGraphsContent(testState) {
    // set context for tests
    console.group("testRenderGraphsContent()");
    setProps(testState, 'all');

    var ul = document.createElement('ul');
    var listProps = {
        graphName: "foo",
        gw: props.gw,
        listElement: ul
    };

    var classes = classNames.tab.graph;
    var graphsContent = renderGraphsContent();

    var firstChild = graphsContent.childNodes[0];
    QUnit.test("Rendering the graphs tab", function (assert) {
        assert.equal(graphsContent.id, classes.container, "renderGraphsContent() returns div with proper id");
        assert.equal(firstChild.tagName, "UL", "renderGraphsContent() first child is a list element");
    });
    console.groupEnd();
}

function testRenderElementsContent(testState) {
// set context for tests
    console.group("testRenderStylesContent()");
    setProps(testState, 'all');
    var elementsContent = renderElementsContent();
    QUnit.test("Rendering the elements tab", function (assert) {
        assert.equal(elementsContent.id, "elements-content", "renderElementsContent() returns div with proper id");
    });

    console.groupEnd();
}

