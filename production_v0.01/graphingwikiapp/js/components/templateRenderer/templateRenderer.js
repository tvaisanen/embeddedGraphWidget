/**
 * Created by tvaisanen on 12/22/17.
 */

define(["../../configuration/classNames"],
    function (classNames) {
        "use strict";

        /**
         *
         * @exports templateRenderer
         */

        var styleClass = {
            container: "preview",
            header: "preview__header",
            table: "preview__table",
            tableRow: "preview__table-row",
            tableLabel: "preview__table-label",
            tableRowKey: "preview__table-row-key",
            tableRowValue: "preview__table-row-value"
        };

        var renderedTemplate = document.createElement('div');
        renderedTemplate.className = styleClass.container;

        function renderHeader(title) {
            var header = document.createElement('h1');
            header.className = styleClass.header;
            header.innerHTML = title;
            return header;
        }

        function renderMetasRow(metas) {
            // create table row containing the meta string
            var trMetas = document.createElement('tr');
            trMetas.className = styleClass.tableRow;
            var tdLabel = document.createElement('td');
            tdLabel.className = styleClass.tableRowKey;
            var tdMetas = document.createElement('td');
            tdMetas.className = styleClass.tableRowValue;

            tdLabel.innerHTML = "metas";
            tdMetas.innerHTML = metas.join(", ");
            trMetas.appendChild(tdLabel);
            trMetas.appendChild(tdMetas);
            return trMetas;
        }

        /**
         * @name renderTemplates()
         * @description render array of template objects to HTML
         * for viewing the stored data in the UI
         * @author Toni Väisänen
         * @date 26.12.2017
         * @param templates Array of objects [{name: templateName, key: value, .. }]
         * @returns {Element}
         */
        function renderTemplates(templates) {

            // key value parameters are viewed in table
            var table = document.createElement('table');
            table.className = styleClass.table;

            // create table row with two columns
            var captionRow = document.createElement('tr');
            captionRow.className = styleClass.tableRow;
            table.appendChild(captionRow);


            // for each template in the array
            if (templates) {
                templates.forEach(function (template) {

                    // loop through the items and create table row
                    // for each key value pair
                    Object.keys(template).forEach(function (key) {

                        // create table row with two columns
                        var tr = document.createElement('tr');
                        tr.className = styleClass.tableRow;
                        var tdKey = document.createElement('td');
                        tdKey.className = styleClass.tableRowKey;
                        var tdValue = document.createElement('td');
                        tdValue.className = styleClass.tableRowValue;

                        tr.appendChild(tdKey);
                        tr.appendChild(tdValue);

                        // assign the values to columns
                        tdKey.innerHTML = key;
                        tdValue.innerHTML = template[key];

                        // add the elements to the table
                        table.appendChild(tr);
                    });
                });
            }

            return table;
        }

        function render(nodeData) {
            "use strict";
            try {
                renderedTemplate.innerHTML = "";

                // add node name as a header to the container
                console.debug(nodeData);
                var pagename = nodeData.content.name;
                renderedTemplate.appendChild(renderHeader(pagename));

                // get table with template values
                var table = renderTemplates(nodeData.templates);

                // add the meta row to the table
                table.appendChild(renderMetasRow(nodeData.metas));

                // add the table to the container
                renderedTemplate.appendChild(table);

                return renderedTemplate;

            } catch (error) {
                console.group('templateRenderer.render()');
                console.warn(error);
                console.debug(nodeData);
                console.groupEnd();

                // If template rendering raises error.
                // Return plain text content.
                renderedTemplate.innerHTML += JSON.stringify(nodeData);
                return renderedTemplate
            }
        }

        return {
            render: render
        }
    });