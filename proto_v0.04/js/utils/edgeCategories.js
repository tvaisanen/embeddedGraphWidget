/**
 * Created by toni on 19.7.2017.
 */


define([], function () {

    var categories = [];

    function add() {
        try {
            // functionality
        } catch (e) {
            console.group("Exception raised by utils.edgeCategories.add()");
            console.warn(e);
            console.group();
        }
    }

    function get() {
        try {
            return categories;
        } catch (e) {
            console.group("Exception raised by utils.edgeCategories.get()");
            console.warn(e);
            console.group();
        }
    }

    function remove() {
        try {
            // functionality
        } catch (e) {
            console.group("Exception raised by utils.edgeCategories.remove()");
            console.warn(e);
            console.group();
        }
    }

    function update(props) {
        try {
            console.debug(props);

            console.debug(typeof props.newCategories);
            if (typeof props.newCategories === 'undefined'){
                console.debug("undefined categories return old ones");
                return categories;
            }

            props.newCategories.forEach(function (category) {
                if (categories.indexOf(category) === -1) {
                    categories.push(category);
                }
            });

            return categories;

        } catch (e) {
            console.group("Exception raised by utils.edgeCategories.update()");
            console.warn(e);
            console.groupEnd();

            return categories;
        }
    }

    return {
        add: add,
        get: get,
        remove: remove,
        update: update
    }
});