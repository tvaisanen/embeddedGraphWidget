/**
 * Created by tvaisanen on 12/22/17.
 */


define([
        "utils/eventListeners",
        "configuration/classNames",
        "components/pageTemplates",
        "components/templateRenderer",
        "components/dynamicListInput/DynamicListInput"
    ],
    function (eventListeners, classNames, pageTemplates, templateRenderer, DynamicListInput) {
        "use strict";

        /**
         * Form for creating node post request
         *
         * @exports nodeForm
         */

        // instantiate metas as a dynamic
        var metas;
        var templateForm;

        var div = document.createElement('div');
        var inputNameBlock = document.createElement('div');
        var nameLabel = document.createElement('label');

        var templateLabel = document.createElement('label');
        var templateBlock = document.createElement('div');
        var nameInput = document.createElement("input");


        var addButton = document.createElement("button");

        var createButton = document.createElement("button");
        var selectTemplate = document.createElement("select");


        function setElementParameters() {

            div.setAttribute('id', "node-form");
            div.className = classNames.tab.nodeForm.container;

            inputNameBlock.className = classNames.tab.nodeForm.inputBlock;

            nameLabel.innerHTML = "Name:";
            templateLabel.innerHTML = "Template";
            nameLabel.className = classNames.tab.nodeForm.label;

            templateLabel.className = classNames.tab.nodeForm.label;

            nameInput.setAttribute('type', 'text');
            nameInput.className = classNames.tab.nodeForm.input;

            addButton.innerHTML = "+";
            addButton.className = classNames.tab.nodeForm.button;


            selectTemplate.setAttribute('placeholder', 'select template');
            populateTemplateSelection();
            // set default form
            templateForm = pageTemplates.getForm(0);
            setTemplateForm(templateForm);

            createButton.setAttribute('id', 'create-node-button');
            createButton.className = classNames.tab.nodeForm.button;
            createButton.innerHTML = "Save";

        }

        function populateTemplateSelection() {
            // todo: modularize templates..
            var options = pageTemplates.list();
            options.forEach(function (template, index) {
                var templateOption = document.createElement('option');
                var templateId = template.replace(" ", "-");
                templateOption.setAttribute('id', templateId);
                templateOption.setAttribute('value', index.toString());
                templateOption.innerHTML = template;
                selectTemplate.appendChild(templateOption);
            });
        }

        function setTemplateForm(form) {
            templateBlock.innerHTML = "";
            templateBlock.appendChild(form);
        }

        function selectTemplateHandler(option) {
            var templateId = option.value;
            templateForm = pageTemplates.getForm(templateId);
            setTemplateForm(templateForm)
        }

        function getTemplateParameters() {
            var templateParameters = {};
            for (var i = 0; i < templateForm.elements.length; i++) {
                var el = templateForm.elements[i];
                templateParameters[el.name] = el.value;
            }
            return templateParameters;
        }

        function createBtnHandler() {
            console.info('createButton.click() -> dispatch -> gwAPI.createNode()')

            var newNodeData = {
                name: getName(),
                metas: metas.getItems(),
                metastring: getMetasString(),
                parameters: getTemplateParameters()
            };

            console.info(newNodeData);
            var preview = document.getElementById(classNames.text.container);
            // for development and debugging
            var renderedTemplate = templateRenderer.render(newNodeData);
            preview.innerHTML = "";
            preview.appendChild(renderedTemplate);
        }

        function getName() {
            return nameInput.value;
        }

        function getMetasString() {
            // metas are passed as single string with space separated valued
            return metas.getItems().join(" ");
        }

        function render() {
            "use strict";
            try {

                setElementParameters();
                metas  = new DynamicListInput('metas', 'Metas');
                inputNameBlock.appendChild(nameLabel);
                inputNameBlock.appendChild(nameInput);
                div.appendChild(inputNameBlock);

                div.appendChild(metas.render());


                div.appendChild(templateLabel);
                div.appendChild(selectTemplate);
                div.appendChild(templateBlock);

                div.appendChild(createButton);

                selectTemplate.onchange = function (event) {
                    selectTemplateHandler(event.target);
                };

                createButton.addEventListener('click', createBtnHandler);

                return div;
            } catch (error) {
                console.group('nodeForm.render()');
                console.debug(error);
                console.groupEnd();
            }
        }


        return {
            render: render
        }


    });