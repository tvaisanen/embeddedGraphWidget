/**
 * Created by tvaisanen on 12/22/17.
 */


define(["configuration/configs",
    "configuration/classNames",
    "utils/graphUtils",
    "components/elementStyles"],
    function (configs, classNames, graphUtils, elementStyles) {
        "use strict";

        /**
         * Form for creating node post request.
         * @exports header
         */

/**
         * @function
         * @name stylesContent
         * @description Create styles tab of the panel. Lists style categories and the parameters with options.
         * @param {Object} props
         * @param {Object} props.Variable
         * @return {HTMLDivElement} styles tab content.
         */
        function stylesContent(props) {
            /*
             * Implement style tab rendering here
             *
             *  styles: {
             label: "Styles",
             active: false,
             styles: [
             {


             categoryName: "category 1",
             data: "data for 1"
             },
             {
             categoryName: "category 2",
             data: "data for 2"
             }
             ]
             }
             * */

            var styles = elementStyles.styles();
            var div = document.createElement('div');
            div.setAttribute('id', "styles-content");
            div.classList.add("styles-content");
            var ul = document.createElement('ul');
            var cy = graphUtils.cy();

            // Todo: make this generic version to work for all of the following use cases
            function styleSelection(props) {
                try {
                    var div = document.createElement('div');
                    var selection = document.createElement('select');

                    selection.classList.add('style-selection');
                    selection.setAttribute('id', props.selectionId);

                    // generate options for selection
                    props.options.forEach(function (option) {
                        var opt = document.createElement('option');
                        opt.setAttribute(
                            'id',
                            props.attributeId + "-" + option.label
                        );
                        var current = elementStyles.getStyleObject(props.category)[props.parameter];
                        opt.innerHTML = option.label;
                        opt.value = option.styleClass;

                        // set selected option to same which is selected for the category
                        if (current === option.styleClass) {
                            opt.selected = true;
                        }
                        selection.appendChild(opt);
                    });


                    // event listener for selection
                    selection.addEventListener('change', function () {
                        eventListeners.styleList.styleSelection({
                            baseClass: 'edge',
                            category: props.category,
                            parameter: props.parameter,
                            value: selection.value
                        });
                    });
                    div.appendChild(selection);
                    return div;
                } catch (e) {
                    console.group('Exception raised by styleSelection()');
                    console.debug("props:");
                    console.debug(props);
                    console.warn(e);
                    console.groupEnd();
                }

            }

            /**
             * @function
             * @name styleList
             * @description TELL ABOUT IT
             * @param props
             * @returns {HTMLDivElement}
             */

            // Fixme: Too long function!
            function styleList(props) {
                var divStyleTable = document.createElement('div');

                var tableHeader = document.createElement('span');
                tableHeader.innerHTML = props.category;
                divStyleTable.appendChild(tableHeader);

                var table = document.createElement('table');
                table.classList.add(classNames.tab.styles.selectionTable);

                var parameters = ["arrowShape", "lineColor", "lineStyle", "lineWidth"];

                parameters.forEach(function (parameter) {
                    var row = document.createElement('tr');
                    var tdLabel = document.createElement('td');
                    var tdSelection = document.createElement('td');
                    var paramLabel = document.createElement('label');

                    paramLabel.innerHTML = parameter;
                    tdLabel.appendChild(paramLabel);


                    var options = configs.styleOptions[parameter];
                    var values = [];
                    if (typeof options != 'undefined') {
                        values = options.map(function (option) {
                            return option.styleClass;
                        });
                    }

                    try {
                        var selection = styleSelection({
                            attributeId: 'select-line-style',
                            category: props.category,
                            selectionId: 'option-line-style',
                            options: options,
                            parameter: parameter
                        });
                    } catch (e) {
                        console.warn("parameter not found");
                    }
                    tdSelection.appendChild(selection);
                    row.appendChild(tdLabel);
                    row.appendChild(tdSelection);
                    table.appendChild(row);
                    //divCategory.appendChild(selection);

                });

                divStyleTable.appendChild(table);


                return divStyleTable;
            }

            try {
                var keys = Object.keys(styles);
                keys.forEach(function (category) {
                    if (category != 'generic') {
                        var divCategory = styleList({
                            category: category,
                            style: styles[category]
                        });

                        div.appendChild(divCategory);
                    }
                });
            } catch (e) {
                console.group("Exception Styles");
                console.warn(e);
            }

            console.groupEnd();
            return div;
        }

        return {
            render: stylesContent
        }


    });