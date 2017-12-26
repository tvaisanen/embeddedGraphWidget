/**
 * Created by tvaisanen on 12/24/17.
 */

define(["../../configuration/classNames",
        "components/pageTemplates"],
    function (classNames, pageTemplates) {
        "use strict";

        /**
         * Form for creating node post request
         *
         * @exports TemplateFormManager
         */

        var styleClass = classNames.components.templateFormManager;

        function TemplateFormManager(componentId, labelText) {

            var self = this;
            var idPrefix = "template-form-manager__";

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

                // get selected template value from options
                var selected = self.selectTemplate.value;

                // use helper function to retrieve the html form for template
                var newTemplate = self.selectTemplateHandler(selected);

                // push the new form to the list of used templates
                self.listItems.push(newTemplate);
                console.debug(this.listItems);
                self.refreshList();
            };

            this.populateTemplateSelection = function () {
                // todo: modularize templates..
                var options = pageTemplates.list();
                options.forEach(function (template, index) {
                    var templateOption = document.createElement('option');
                    var templateId = template.replace(" ", "-");
                    templateOption.setAttribute('id', templateId);
                    templateOption.setAttribute('value', index.toString());
                    templateOption.innerHTML = template;
                    self.selectTemplate.appendChild(templateOption);
                });
            };

            this.removeItem = function (itemToDelete) {
                console.debug("remove: " + itemToDelete);
                var removeIndex = self.listItems.indexOf(itemToDelete);
                self.listItems.splice(removeIndex, 1);
                self.refreshList();
            };

            this.refreshList = function () {
                self.templateForms.innerHTML = "";

                self.listItems.forEach(function (form) {

                    // create container for the form
                    var templateBlock = document.createElement('div');
                    templateBlock.className = styleClass.form;

                    var btnDeleteItem = document.createElement('btn');
                    btnDeleteItem.className = styleClass.listItemDeleteBtn;
                    btnDeleteItem.innerHTML = 'x';
                    btnDeleteItem.onclick = function () {
                        self.removeItem(form);
                    };

                    // add delete button to the container
                    var templateHeaderBlock = document.createElement('div');
                    templateHeaderBlock.className = styleClass.listItem;
                    templateHeaderBlock.appendChild(btnDeleteItem);
                    templateBlock.appendChild(templateHeaderBlock);

                    // use helper function to retrieve the html form for template
                    templateBlock.appendChild(form);

                    self.templateForms.appendChild(templateBlock);
                    console.debug(self.list);
                })
            };



            this.clearList = function () {
                self.listItems = [];
                self.refreshList();
            };

            this.selectTemplateHandler = function (templateId) {
                var templateForm = pageTemplates.getForm(templateId);
                templateForm.className = styleClass.form;
                return templateForm;
            };

            this.listItems = [];

            this.getComponentId = function (element) {
                return idPrefix + componentId + "-" + element;
            };

            // Contains the whole component.
            this.container = document.createElement('div');
            this.container.className = styleClass.container;
            this.container.setAttribute('id', this.getComponentId('container'));

            this.templateForms = document.createElement('div');
            this.templateForms.className = styleClass.formsContainer;
            this.templateForms.setAttribute('id', this.getComponentId('template-container'));

            // Wraps input and add btn to single unit
            this.selectionBlock = document.createElement('div');
            this.selectionBlock.className = styleClass.inputBlock;
            this.selectionBlock.setAttribute('id', this.getComponentId('inputBlock'));

            // Label element for the component.
            this.label = document.createElement('label');
            this.label.className = styleClass.label;
            this.label.innerHTML = "Templates";
            this.label.setAttribute('id', this.getComponentId('label'));
            this.label.setAttribute('for', this.getComponentId('input'));

            // Wraps input and add btn to single unit
            this.inputBlock = document.createElement('div');
            this.inputBlock.className = styleClass.inputBlock;
            this.inputBlock.setAttribute('id', this.getComponentId('inputBlock'));

            // text input for adding list items
            this.selectTemplate = document.createElement('select');
            this.selectTemplate.className = styleClass.input;
            this.selectTemplate.setAttribute('id', this.getComponentId('select'));

            // List element for viewing added items.
            this.list = document.createElement('ul');
            this.list.className = styleClass.list;
            this.list.setAttribute('id', this.getComponentId('list'));

            // Button for adding items to the list
            this.btnAddItem = document.createElement('button');
            this.btnAddItem.className = styleClass.button;
            this.btnAddItem.setAttribute('id', this.getComponentId('btnAddItem'));
            this.btnAddItem.innerHTML = '+';


            console.debug(self);

            this.btnAddItem.addEventListener('click', function () {
                console.debug('btn');
                self.addItemBtnHandler()
            });

            // render one item for development
            // this.input.value = 'compose';
            // this.btnAddItem.click();

            /**
             * Renders components inside the container and returns the container div
             * @returns {Element|*}
             */
            this.render = function () {
                try {
                    this.container.appendChild(this.label);
                    this.container.appendChild(this.selectionBlock);
                    this.selectionBlock.appendChild(this.selectTemplate);
                    this.selectionBlock.appendChild(this.btnAddItem);
                    this.populateTemplateSelection();
                    this.container.appendChild(this.inputBlock);
                    this.container.appendChild(this.templateForms);
                    return this.container;
                } catch (error) {
                    console.group("TemplateFormManager.render()");
                    console.warn(error);
                    console.groupEnd();
                }
            };
        }

        return TemplateFormManager;
    }
);