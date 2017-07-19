/**
 * Created by toni on 19.7.2017.
 */

define(function () {

    function method(x) {
        return x + x;
    }

    return {
        someValue: 'foobar',
        myMethod: method,
        start: function () {
            console.debug("starting!");
        }
    }
});