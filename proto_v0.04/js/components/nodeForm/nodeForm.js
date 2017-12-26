/**
 * Created by tvaisanen on 12/22/17.
 */


define([
        "../../utils/eventListeners",
        "configuration/classNames",
        "components/pageTemplates",
        "components/templateRenderer",
        "components/dynamicListInput/DynamicListInput",
        "../templateFormManager/TemplateFormManager"
    ],
    function (eventListeners, classNames, pageTemplates, templateRenderer, DynamicListInput, TemplateFormManager) {
        "use strict";

        /**
         * Form for creating node post request
         *
         * @exports nodeForm
         */

        // instantiate metas as a dynamic
        var metas = new DynamicListInput('metas', 'Metas');
        var templateManager = new TemplateFormManager();
        var templateForm;

        var styleClasses = classNames.components.nodeForm;

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
            div.className = styleClasses.container;

            inputNameBlock.className = styleClasses.inputBlock;

            nameLabel.innerHTML = "Name:";
            templateLabel.innerHTML = "Template";
            nameLabel.className = styleClasses.label;

            templateLabel.className = styleClasses.label;

            nameInput.setAttribute('type', 'text');
            nameInput.className = styleClasses.input;

            addButton.innerHTML = "+";
            addButton.className = styleClasses.button;


            selectTemplate.setAttribute('placeholder', 'select template');
            populateTemplateSelection();
            // set default form
            templateForm = pageTemplates.getForm(0);
            setTemplateForm(templateForm);

            createButton.setAttribute('id', 'create-node-button');
            createButton.className = styleClasses.button;
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
                parameters: getTemplateParameters(),
                templates: templateManager.getForms()
            };
            metas.clearList();
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

                inputNameBlock.appendChild(nameLabel);
                inputNameBlock.appendChild(nameInput);
                div.appendChild(inputNameBlock);

                div.appendChild(metas.render());
                div.appendChild(templateManager.render());

                div.appendChild(createButton);


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