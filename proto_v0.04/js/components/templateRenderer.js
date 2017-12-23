/**
 * Created by tvaisanen on 12/22/17.
 */

define(["configuration/classNames"],
    function (classNames) {
        "use strict";

        /**
         * Form for creating node post request
         *
         * @exports templateRenderer
         */

        var renderedTemplate = document.createElement('div');
        renderedTemplate.className = 'rendered-template';

        function renderHeader(title){
            var header = document.createElement('h1');
            header.style.background = 'blue';
            //header.style.padding = '0';
            header.style.margin = '0';
            header.innerHTML = title;
            return header;
        }

        function renderMetas(metas){
            var div = document.createElement('div');
            var metasList = document.createElement('ul');
            /*var metasLabel = document.createElement('label');
            metasLabel.innerHTML = "metas:";
            metas.forEach(function(meta){
                var spanMeta = document.createElement('li');
                spanMeta.innerHTML = meta;
                metasList.appendChild(spanMeta);
            });
            div.appendChild(metasLabel);
            div.appendChild(metasList);*/
            div.innerHTML = "metas: " + metas.join(", ");
            return div;
        }

        function renderTemplate(parameters){
            var div = document.createElement('div');
            var table = document.createElement('table');
            Object.keys(parameters).forEach(function(key){
                var tr = document.createElement('tr');
                var tdKey = document.createElement('td');
                tdKey.innerHTML = key;
                var tdValue = document.createElement('td');
                tdValue.innerHTML = parameters[key];
                tr.appendChild(tdKey);
                tr.appendChild(tdValue);
                table.appendChild(tr);
            });
            div.appendChild(table);
            return div;
        }

        function render(nodeData) {
            "use strict";
            try {
                renderedTemplate.style.border = "solid 1px red";
                renderedTemplate.appendChild(renderHeader(nodeData.name));
                renderedTemplate.appendChild(renderMetas(nodeData.metas));
                renderedTemplate.appendChild(renderTemplate(nodeData.parameters));
                //renderedTemplate.innerHTML += JSON.stringify(nodeData);

                return renderedTemplate;
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