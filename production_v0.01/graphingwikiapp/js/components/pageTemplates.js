/**
 * Created by tvaisanen on 12/22/17.
 */

/**
 * Created by toni on 19.7.2017.
 */

define(["configuration/classNames",],
    function (classNames) {
        "use strict";

        /**
         * Form for creating node post request
         *
         * @exports pageTemplates
         */

        var templates = [
            {
                name: "default",
                data: [
                    {
                        label: 'Author',
                        name: 'author',
                        type: 'text'
                    },
                    {
                        label: 'Organization',
                        name: 'organization',
                        type: 'text'
                    },
                    {
                        label: 'Department',
                        name: 'department',
                        type: 'text'
                    },
                    {
                        label: 'Date',
                        name: 'date',
                        type: 'text'
                    }
                ]
            },
            {
                name: "Asset",
                data: [
                    {
                        label: 'Dependendent',
                        name: 'dependent',
                        type: 'text'
                    },
                    {
                        label: 'Supports',
                        name: 'suppports',
                        type: 'text'
                    }
                ]
            },
            {
                name: "Threat",
                data: [
                    {
                        label: 'Threads',
                        name: 'threads',
                        type: 'text'
                    },
                    {
                        label: 'Requirements',
                        name: 'requirements',
                        type: 'text'
                    }
                ]
            }
        ];

        function getTemplateForm(index) {
            var form = document.createElement('form');
            var template = getTemplate(index);
            form.setAttribute('name', template.name);
            template.data.forEach(function (item) {
                var label = document.createElement('label');
                label.className = classNames.tab.nodeForm.label;
                label.setAttribute('for', item.name);
                label.innerHTML = item.label + ":";
                var input = document.createElement('input');
                input.className = classNames.tab.nodeForm.input;
                input.setAttribute('type', item.type);
                input.setAttribute('id', item.name);
                input.setAttribute('name', item.name);
                form.appendChild(label);
                form.appendChild(input);
            });
            return form;
        }

        function getTemplate(index) {
            return templates[index];
        }

        function getTemplateList() {
            return templates.map(function (template) {
                return template.name;
            })
        }


        return {
            list: getTemplateList,
            get: getTemplate,
            getForm: getTemplateForm
        }


    }
);