/**
 * Created by toni on 19.7.2017.
 */

define([
    "components/ui",
    "configuration/classNames",
    "utils/eventListeners",
    "utils/gwClient",
    "components/menuItems",

], function (ui, classNames, eventListeners, gwClient, menuItems) {

    var el = eventListeners;

    QUnit.module("Unit Tests - components.ui: ");

    QUnit.test("textPreview()", function (assert) {
        var textPreview = ui.textPreview();
        console.debug(textPreview.classList.contains('text-preview'));

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

    /*
     QUnit.test("RenderTabs()", function (assert) {
     setProps(testState, 'all');
     var tabs = renderTabs();
     assert.ok(tabs, "happening");
     });
     */

    QUnit.test("stylesContent()", function (assert) {
        var content = {
            label: "Styles",
            active: false,
            categories: []
        };

        var stylesContent = ui.stylesContent({
            content: content,
            classNames: classNames,
            styleSelectionListener: el.styleList.styleSelection
        });
        assert.equal(
            stylesContent.id, "styles-content",
            "renderStylesContent() returns div with proper id");
    });


    QUnit.test("renderMenu()", function (assert) {
        var classes = classNames.menu;
        var menuContainer = ui.menu({
            gwClient: gwClient,
            classNames: classNames,
            menuItems: menuItems
        });
        var childs = menuContainer.childNodes;
        var childsHaveCorrectIds = true;


        childs.forEach(function (element) {
            var starts = element.id.startsWith("panel-menu__item__");
            childsHaveCorrectIds = childsHaveCorrectIds && starts;
        });
        assert.ok(true, "Executes");
        assert.equal(
            menuContainer.id, classes.container,
            "Returns div container with correct id.");
        assert.ok(childsHaveCorrectIds, "Container childs have correct ids.");
    });

    QUnit.test("graphListItem()", function (assert) {
        var ul = document.createElement('ul');
        var listProps = {
            graphName: "foo",
            gw: gwClient,
            listElement: ul,
            listItemClass: classNames.tab.graph.listItem.inactive
        }
        var listItem = ui.graphListItem(listProps);
        assert.ok(listItem, "renderListItem() returns a value");
        assert.ok(listItem.classList.contains(listProps.listItemClass), "list item has correct class assigned");
    });


    QUnit.test("Rendering the graphs tab", function (assert) {

        var ul = document.createElement('ul');

        var classes = classNames.tab.graph;
        var graphsContent = ui.graphsContent({
            graphName: "foo",
            gwClient: gwClient,
            listElement: ul,

        });

        var firstChild = graphsContent.childNodes[0];
        assert.equal(graphsContent.id, classes.container, "renderGraphsContent() returns div with proper id");
        assert.equal(firstChild.tagName, "UL", "renderGraphsContent() first child is a list element");
    });

    QUnit.test("Rendering the elements tab", function (assert) {
        var content = {
            filter: "",
            label: "Elements",
            active: false,
            data: "Data for elements"
        };

        var elementsContent = ui.elementsContent({
            content: content
        });
        assert.equal(elementsContent.id, "elements-content", "renderElementsContent() returns div with proper id");
    });

});
