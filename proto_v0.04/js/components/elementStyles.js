/**
 * Created by toni on 19.7.2017.
 */

define(["../configuration/configs"], function (configs) {
    "use strict";
    /**
     * @description Store current style categories of a graph. Provides utils to manage the styles.
     * @example
     *     var styles = {
     *          // generic is defined in configs.style.generic
     *          generic: {
     *              lineColor: 'line-color-grey',
     *              lineWidth: 'line-width-10',
     *              arrowShape: 'arrow-shape-triangle'
     *          }
     *     };
     * @exports elementStyles
     */

    var styles = {
        generic: configs.style.generic
    };

    /**
     * @function
     * @name addCategory
     * @description Add new category to styles.
     * @param {Object} props
     * @param {String} props.name name for the new category.
     * @param {Object} props.style Key value pairs for styles.
     */
    function addCategory(props) {
        // init new category with generic style
        styles[props.name] = getDefaultStyle();
        if (typeof props.style !== 'undefined'){
            Object.keys(props.style).forEach(function (key){
                styles[props.name][key] = props.style[key];
            });
        }
    }

    /**
     * @function
     * @name categoryExists
     * @description Check if category exists.
     * @param {String} category
     * @return {Boolean} True if category exists as key of styles object.
     */
    function categoryExists(category) {
        return (typeof styles[category] !== 'undefined');
    }

    /**
     * @function
     * @name getDefaultStyle
     * @description Returns the default style.
     * @return {Object} Default style. Defined in configuration.
     */
    function getDefaultStyle() {
        return styles.generic;
    }

    /**
     * @function
     * @name getStyle
     * @description Get specific style.
     * @param {String} style Style category name.
     * @return {Object} Return the style. If do not exist return default style.
     */
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

    /**
     * @function
     * @name setStyle
     * @description Add new style category to styles.
     * @param {Object} props
     * @param {String} props.name Name for the new style.
     * @param {Object} props.style Style object for the new style category.
     * @return {Object} The style defined.
     */
    function setStyle(props) {
        try {
            addCategory(props);
            styles[props.name] = props.style;
            return getStyle(props.name);
            // use graphUtils.updateElementStyles() here!
            // var elementsToUpdate = funcProps.cy.elements(selector);
            // console.debug('setStyle() - elementsToUpdate.forEach()');
            // this[fp.category][fp.style] = fp.value;
            // console.debug(funcProps.cy);
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
        setStyle: setStyle,
        styles: function () {
            return styles;
        }
    };
});