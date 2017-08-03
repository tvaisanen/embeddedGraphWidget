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
        if (!categoryExists(props.name)) {
            styles[props.name] = getDefaultStyle();
        } else {
            console.info("Category: " + props.name + " is already listed.");
        }
    }

    /**
     * @function
     * @name addCategories
     * @description Add multiple categores to styles.
     * @param {Object} props
     * @param {Array} props.categories category name array.
     */
    function addCategories(props) {
        try {
            // init new category with generic style
            props.categories.forEach(function (category) {
                addCategory({name: category});
            });
        } catch (e) {
            console.group("Exception raised by addCategories()");
            console.debug("props:");
            console.debug(props);
            console.warn(e);
            console.groupEnd();
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
     * @description Get specific style as string array.
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
        return Object.values(styles);
    }

    /**
     * @function
     * @name getStyleObject
     * @description Get specific style object.
     * @param {String} style Style category name.
     * @return {Object} Return the style. If do not exist return default style.
     */
    function getStyleObject(style) {
        console.debug("getStyleObject()");
        console.debug(style);
        if (!style) {
            console.debug("no style!");
            return styles.generic;
        }
        return styles[style]
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

    /**
     * @function
     * @name setStyles
     * @description Init styles. Used when new graph is loaded with predefined styles.
     * @param {Object} props
     * @param {String} props.styles New styles object.
     * @return {Object} The style defined.
     */
    function setStyles(props) {
        try {
            console.group("info: setStyle(props) called!");
            console.debug("before");
            console.debug(styles);
            styles = props.styles;
            console.debug("after:");
            console.debug(styles);
            console.groupEnd();
        } catch (e) {
            console.group("Exception raised by elementStyles.setStyles()");
            console.warn(e);
            console.groupEnd();
        }
    }

    /**
     * @function
     * @name updateStyle
     * @description Update category style
     * @param {Object} props
     * @param {String} props.category Category to update.
     * @param {Object} props.style Style object containing updated key value pairs.
     * @return {Object} The style defined.
     */
    function updateStyleParameter(props) {
        try {
            console.debug("%cupdateStyle(props)", "color:green;size:20px;");
            console.debug(props);
            var styleToUpdate = styles[props.category];
            console.debug("Before updating:");
            console.debug(styleToUpdate);
            Object.keys(props.style).forEach(function (styleKey) {
                styleToUpdate[styleKey] = props.style[styleKey];
            });
            console.debug("After updating:");
            console.debug(styleToUpdate);


            return getStyle(props.category);
            // use graphUtils.updateElementStyles() here!
            // var elementsToUpdate = funcProps.cy.elements(selector);
            // console.debug('setStyle() - elementsToUpdate.forEach()');
            // this[fp.category][fp.style] = fp.value;
            // console.debug(funcProps.cy);
        } catch (e) {
            console.group("Exception raised by elementStyles.updateStyle()");
            console.warn(e);
            console.groupEnd();
        }
    }

    return {
        addCategory: addCategory,
        addCategories: addCategories,
        categoryExists: categoryExists,
        getDefaultStyle: getDefaultStyle,
        getStyle: getStyle,
        getStyleObject: getStyleObject,
        setStyle: setStyle,
        setStyles: setStyles,
        styles: function () {
            return styles;
        },
        updateStyleParameter: updateStyleParameter
    };
});