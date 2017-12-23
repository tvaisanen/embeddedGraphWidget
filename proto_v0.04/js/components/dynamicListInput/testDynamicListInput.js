/**
 * Created by toni on 19.7.2017.
 */

define(["components/dynamicListInput/DynamicListInput", "configuration/classNames"],
    function (DynamicListInput, classNames) {

    QUnit.module("Unit Test - components/dynamicListInput/dynamiclListInput.js");

    QUnit.test("Initialization", function (assert) {
        var dynamicInput = new DynamicListInput('id', 'labelText');
        console.debug(dynamicInput);

        var renderedDynamicInputList = dynamicInput.render();

        console.debug(renderedDynamicInputList.childNodes);

        var containerHasCorrectAmountOfChildElements = renderedDynamicInputList.childElementCount == 3;
        var children = renderedDynamicInputList.childNodes;

        var containerHasCorrectId = renderedDynamicInputList.id == "dynamic-list-input__id-container";
        var firstChildHasCorrectId = children[0].id == "dynamic-list-input__id-label";
        var secondChildHasCorrectId = children[1].id == "dynamic-list-input__id-inputBlock";
        var thirdChildHasCorrectId = children[2].id == "dynamic-list-input__id-list";

        var containerHasCorrectClassName = renderedDynamicInputList.className == classNames.components.dynamiceListInput.container;
        var firstChildHasCorrectClassName = children[0].className == classNames.components.dynamiceListInput.label;
        var secondChildHasCorrectClassName = children[1].className == classNames.components.dynamiceListInput.inputBlock;
        var thirdChildHasCorrectClassName = children[2].className == classNames.components.dynamiceListInput.list;

        assert.ok(containerHasCorrectId, "dynamicInputList.render() returns container with proper ID.");
        assert.ok(containerHasCorrectAmountOfChildElements, "dynamicInputList.container should have 3 child elements.");
        assert.ok(firstChildHasCorrectId, "first child has correct id.");
        assert.ok(secondChildHasCorrectId, "second child has correct id.");
        assert.ok(thirdChildHasCorrectId, "third child has correct id.");
        assert.ok(containerHasCorrectClassName, "container has correct class name.");
        assert.ok(firstChildHasCorrectClassName, "first child has correct class name.");
        assert.ok(secondChildHasCorrectClassName, "second child has correct class name.");
        assert.ok(thirdChildHasCorrectClassName, "third child has correct class name.");

        var inputBlock = children[1];
        var inputBockHasTwoChildren = inputBlock.childElementCount == 2;
        assert.ok(inputBockHasTwoChildren, "dynamicInputList.inputBlock has two child should have two child elements.");
        console.debug(inputBlock.childNodes);

    });

    QUnit.test("List items are added correctly", function (assert) {});
    QUnit.test("List items can be returned correctly", function (assert) {});
    QUnit.test("List item can be removed correctly", function (assert) {});


});
/*
[input#dynamic-list-input__id-input.dynamic-list-input__input-text, button#dynamic-list-input__id-btnAddItem.dynamic-list-input__button]
    */