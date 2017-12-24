/**
 * Created by tvaisanen on 12/23/17.
 */


define(["../../configuration/classNames",],
    function (classNames) {
        "use strict";

        /**
         * Form for creating node post request
         *
         * @exports pageTemplates
         */

        var styleClass = classNames.components.dynamiceListInput;


        function DynamicListInput(componentId, labelText) {
            console.info('DynamicListInput()');
            console.info(componentId);
            console.info(labelText);

            var ctx = this;

            /**
             * clears text input
             */
            this.clearInput = function () {
                this.input.value = "";
            };

            /**
             * returns the array of items
             * @returns {Array}
             */
            this.getItems = function () {
                return this.listItems;
            };

            /**
             * takes care of addBtn click event -> adds value from input to the list
             */
            this.addItemBtnHandler = function () {
                console.debug('clicked add item');
                if (this.input.value != "") {
                    var newItem = this.input.value;
                    this.listItems.push(newItem);
                    var liItem = document.createElement('li');

                    var liItemName = document.createElement('span');
                    liItemName.className = styleClass.listItemText;
                    liItemName.innerHTML = newItem;

                    var btnDeleteItem = document.createElement('btn');
                    btnDeleteItem.className = styleClass.listItemDeleteBtn;
                    btnDeleteItem.innerHTML = 'x';
                    btnDeleteItem.onclick = function () {
                        ctx.removeItem(newItem);
                    };

                    liItem.className = styleClass.listItem;
                    liItem.appendChild(liItemName);
                    liItem.appendChild(btnDeleteItem);
                    this.list.appendChild(liItem);
                    this.clearInput();
                }
            };

            this.refreshList = function () {
                this.list.innerHTML = "";
                this.listItems.forEach(function (item) {
                    var liItem = document.createElement('li');

                    var liItemName = document.createElement('span');
                    liItemName.className = styleClass.listItemText;
                    liItemName.innerHTML = item;

                    var btnDeleteItem = document.createElement('btn');
                    btnDeleteItem.className = styleClass.listItemDeleteBtn;
                    btnDeleteItem.innerHTML = 'x';
                    btnDeleteItem.onclick = function () {
                        console.debug('delete click');
                        ctx.removeItem(item);
                    };

                    liItem.className = styleClass.listItem;
                    liItem.appendChild(liItemName);
                    liItem.appendChild(btnDeleteItem);
                    ctx.list.appendChild(liItem);
                })
            };

            this.removeItem = function (itemToDelete) {
                var removeIndex = ctx.listItems.indexOf(itemToDelete);
                ctx.listItems.splice(removeIndex, 1);
                ctx.refreshList();
            };

            this.listItems = [];

            this.getComponentId = function (element) {
                return "dynamic-list-input__" + componentId + "-" + element;
            };

            // Contains the whole component.
            this.container = document.createElement('div');
            this.container.className = styleClass.container;
            this.container.setAttribute('id', this.getComponentId('container'));

            // Label element for the component.
            this.label = document.createElement('label');
            this.label.className = styleClass.label;
            this.label.innerHTML = labelText;
            this.label.setAttribute('id', this.getComponentId('label'));
            this.label.setAttribute('for', this.getComponentId('input'));

            // Wraps input and add btn to single unit
            this.inputBlock = document.createElement('div');
            this.inputBlock.className = styleClass.inputBlock;
            this.inputBlock.setAttribute('id', this.getComponentId('inputBlock'));

            // text input for adding list items
            this.input = document.createElement('input');
            this.input.className = styleClass.input;
            this.input.setAttribute('id', this.getComponentId('input'));

            // List element for viewing added items.
            this.list = document.createElement('ul');
            this.list.className = styleClass.list;
            this.list.setAttribute('id', this.getComponentId('list'));

            // Button for adding items to the list
            this.btnAddItem = document.createElement('button');
            this.btnAddItem.className = styleClass.button;
            this.btnAddItem.setAttribute('id', this.getComponentId('btnAddItem'));
            this.btnAddItem.innerHTML = '+';


            console.debug(ctx);

            this.btnAddItem.addEventListener('click', function () {
                console.debug('btn');
                ctx.addItemBtnHandler()
            });

            this.input.value = 'compose';
            this.btnAddItem.click();

            /**
             * Renders components inside the container and returns the container div
             * @returns {Element|*}
             */
            this.render = function () {
                try {
                    this.container.appendChild(this.label);
                    this.inputBlock.appendChild(this.input);
                    this.inputBlock.appendChild(this.btnAddItem);
                    this.container.appendChild(this.inputBlock);
                    this.container.appendChild(this.list);
                    return this.container;
                } catch (error) {
                    console.group("DynamicListInput.render()");
                    console.warn(error);
                    console.groupEnd();
                }
            };


        }

        return DynamicListInput;
    }
);