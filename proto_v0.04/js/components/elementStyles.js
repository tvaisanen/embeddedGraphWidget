/**
 * Created by toni on 19.7.2017.
 */

define(["../configuration/configs"], function (configs) {

    var styles = {
        generic: configs.style.generic
    };

    function addCategory(props) {
        // init new category with generic style
        styles[props.name] = getDefaultStyle();
        if (typeof props.style !== 'undefined'){
            Object.keys(props.style).forEach(function (key){
                styles[props.name][key] = props.style[key];
            });
        }
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

    function setStyle(props) {
        try {

            console.debug(props);
            addCategory(props);
            console.debug('after defaults setStyle()');
            console.debug(getStyle(props.name));
            console.debug(styles[props.name]);
            styles[props.name] = props.style;
            console.debug('after assignment setStyle()');
            console.debug(getStyle(props.name));
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
        setStyle: setStyle
    };
});