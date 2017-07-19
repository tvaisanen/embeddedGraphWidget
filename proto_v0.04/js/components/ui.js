/**
 * Created by toni on 19.7.2017.
 */


define([
        "../utils/eventListeners",
        "../configuration/classNames"],
    function (eventListeners, classNames) {


        /** @function renderGraphsContent
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function graphsContent(props) {
            /*
             * Implement graphs tab rendering here
             *
             * */

            try {
                console.debug(props);
                var cy = props.cy;
                var gwClient = props.gwClient;
                var classes = classNames.tab.graph;

                var div = document.createElement('div');
                var ul = document.createElement('ul');

                div.setAttribute('id', classes.container);

                var graphListPromise = gwClient.getGraphList();

                graphListPromise.then(function (response) {
                    return response.json();

                }).then(function (json) {
                    var graphs = json.data;

                    /* loop array of graphName strings and generate
                     * the list items for the panel */
                    graphs.forEach(function (graph) {
                        graphListItem({
                            graphName: graph,
                            gwClient: gwClient,
                            listElement: ul});
                    });
                });

                div.appendChild(ul);
                console.groupEnd();
                return div;
            } catch (e) {
                console.group("Exception raised by ui.graphsContent()");
                console.warn(e);
                console.groupEnd();
            }
        }

        /** @function renderGraphListItem
         *  Description
         *  @param {Object} variable - Desc.
         *  @return {Type} desc.
         */
        function graphListItem(listItemProps) {
            var graphName = listItemProps.graphName;
            var gwClient = listItemProps.gwClient;
            var list = listItemProps.listElement;
            var listItemClass = listItemProps.listItemClass;

            var li = document.createElement('li');
            li.classList.add(listItemClass);
            li.innerHTML = graphName;

            li.addEventListener('click', function (event) {
                eventListeners.graphsList.listItem.onClick({
                    graphName: graphName,
                    gw: gw
                });
            });
            list.appendChild(li);
            return li;
        }

        return {
            graphsContent: graphsContent
        }
    });