/**
 * Created by toni on 19.7.2017.
 */

define([], function () {

    var styles = {
        generic: {
            lineColor: 'line-color-grey',
            lineWidth: 'line-width-10',
            arrowShape: 'arrow-shape-triangle'
        }
    };

    function addCategory(category) {
        // init new category with generic style
        styles[category] = getDefaultStyle();
    }

    function categoryExists(category) {
        return (typeof styles[category] !== 'undefined');
    }

    function getDefaultStyle() {
        return styles.generic;
    }

    function getStyle(style) {
        // return styles as array
        /*
         * if no style get generic
         * */
        if (!style) {
            return Object.values(styles.generic);
        }
        return Object.values(styles.generic);
    }

    function setStyle(funcProps) {
        try {
            var fp = funcProps;
            console.debug("setStyle()");
            console.debug(funcProps);
            var selector = funcProps.baseClass + '.' + funcProps.category;
            console.debug(funcProps.cy);
            var elementsToUpdate = funcProps.cy.elements(selector);
            console.debug('setStyle() - elementsToUpdate.forEach()');
            this[fp.category][fp.style] = fp.value;
            elementsToUpdate.forEach(function (el) {
                console.debug(el.id());
                console.debug("these classes has to be assigned");
                console.debug(elementStyles[fp.category]);
            });
        } catch (e) {
            console.group("Exception raised by elementStyles.setStyle()");
            console.warn(e);
            console.groupEnd();
        }
    }

    return {
        addCategory: addCategory,
        categoryExists: categoryExists,
        getDefaultStyle: getDefaultStyle,
        getStyle: getStyle,
        setStyle: setStyle
    };
});