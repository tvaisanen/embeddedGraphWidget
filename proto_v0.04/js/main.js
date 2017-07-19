/**
 * Created by toni on 19.7.2017.
 */

require(["js/test", "js/app"], function (test, app) {
    'use strict';
    console.log(test.someValue);
    console.log(test.myMethod(2));
    test.start();
    app.start();
});