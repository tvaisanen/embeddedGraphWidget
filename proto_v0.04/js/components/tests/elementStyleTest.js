/**
 * Created by toni on 21.7.2017.
 */

define([
    "components/elementStyles"
], function (elementStyles) {

    var es = elementStyles;

    QUnit.module("Unit Tests - components.elementStyles: ");

    QUnit.test("addCategory()", function (assert) {
        var newCategoryName = 'newCategory';
        var categoryExistsBefore = es.categoryExists(newCategoryName);
        es.addCategory(newCategoryName);
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
        assert.ok(true, "helo ok foobar?");
    });
    QUnit.test("getStyle()", function (assert) {
        assert.ok(true, "helo ok foobar?");
    });
    QUnit.test("setStyle()", function (assert) {
        assert.ok(true, "helo ok foobar?");
    });
});