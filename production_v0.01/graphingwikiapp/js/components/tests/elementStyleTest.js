/**
 * Created by toni on 21.7.2017.
 */

define([
    "components/elementStyles",
    "configuration/configs"
], function (elementStyles, configs) {

    var es = elementStyles;

    QUnit.module("Unit Tests - components.elementStyles: ");

    QUnit.test("addCategory()", function (assert) {
        var newCategoryName = 'newCategory';
        var categoryExistsBefore = es.categoryExists(newCategoryName);
        es.addCategory({name: newCategoryName});
        var categoryExistsAfter = es.categoryExists(newCategoryName);
        assert.notOk(categoryExistsBefore, "category do not exist before addition");
        assert.ok(categoryExistsAfter, "category after addition");
    });

    QUnit.test("categoryExists()", function (assert) {
        // by default there is category 'generic'
        var newCategoryName = "newCategory";
        es.addCategory(newCategoryName);
        var categoryGenericExists = es.categoryExists('generic');
        var categoryNewExists = es.categoryExists(newCategoryName);
        assert.ok(categoryGenericExists, "returns existing default category");
        assert.ok(categoryNewExists, "returns existing new category");
    });

    QUnit.test("getDefaultStyle()", function (assert) {
        var defaultCategory = es.getDefaultStyle();
        assert.equal(defaultCategory, configs.style.generic, "generic style returns correctly");
    });

    QUnit.test("getStyle()", function (assert) {
        var style = es.getStyle('generic');
        assert.ok(style, configs.style.generic, "returns style");
    });

    QUnit.test("getStyleObject()", function (assert) {
        var style = es.getStyleObject('generic');
        assert.equal(style, configs.style.generic, "returns style");
    });

    QUnit.test("setStyle()", function (assert) {
        var style = {
                name: "newStyle",
                style: {
                    lineColor: 'line-color-black',
                    lineWidth: 'line-width-12',
                    arrowShape: 'arrow-shape-triangle'
                }
        };
        var expected = Object.values(style.style);
        var returnedStyle = es.setStyle(style);
        assert.deepEqual(returnedStyle, expected, "style is set and returned");
    });

});