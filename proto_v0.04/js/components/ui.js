/**
 * Created by toni on 19.7.2017.
 */


define(["../utils/eventListeners"], function (eventListeners) {
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
        graphListItem: graphListItem
    }
});