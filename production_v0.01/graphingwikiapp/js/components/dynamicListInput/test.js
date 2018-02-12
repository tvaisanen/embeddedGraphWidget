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

    QUnit.test("List item is added correctly", function (assert) {

        // add item to input field and click the add button
        // then return the items list to check if the arary
        // has been updated correctly

        var itemToAdd = "Add me to the itemsList";

        var dynamicInput = new DynamicListInput('id', 'labelText');
        var renderedComponent = dynamicInput.render();
        var inputBlock = renderedComponent.childNodes[1];
        var textInput = inputBlock.childNodes[0];
        var addButton = inputBlock.childNodes[1];
        console.debug(textInput);
        console.debug(addButton);
        textInput.value = itemToAdd;
        addButton.click();

        // items should have array = ["Add me to the itemList"]
        var items = dynamicInput.getItems();

        assert.equal(items[0], itemToAdd, "no test assertions done");
    });

        QUnit.test("List items are added correctly", function (assert) {

        // add item to input field and click the add button
        // then return the items list to check if the array
        // has been updated correctly

        var firstItemToAdd = "first item";
        var secondItemToAdd = "second item";

        var dynamicInput = new DynamicListInput('id', 'labelText');
        var renderedComponent = dynamicInput.render();
        var inputBlock = renderedComponent.childNodes[1];
        var textInput = inputBlock.childNodes[0];
        var addButton = inputBlock.childNodes[1];

        textInput.value = firstItemToAdd;
        addButton.click();

        textInput.value = secondItemToAdd;
        addButton.click();

        // items should have array = ["first item", "second item"]
        var items = dynamicInput.getItems();

        var firstItemCorrect = items[0] == firstItemToAdd;
        var secondItemCorrect = items[1] == secondItemToAdd;
        var bothItemsCorrect = firstItemCorrect && secondItemCorrect;

        assert.ok(bothItemsCorrect, "Items are added correctly");

    });


    QUnit.test("List items can be returned correctly", function (assert) {});
    QUnit.test("remove list item function works correctly", function (assert) {});
    QUnit.test("delete list item button works correctly", function (assert) {});


});
/*
[input#dynamic-list-input__id-input.dynamic-list-input__input-text, button#dynamic-list-input__id-btnAddItem.dynamic-list-input__button]
    */