/**
 * Created by toni on 19.7.2017.
 */

require(["test", "app", "gwClient"], function (test, app, gwClient) {
    'use strict';
    console.log(test.someValue);
    console.log(test.myMethod(2));
    test.start();
    app.start(gwClient);
});