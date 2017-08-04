/**
 * Created by toni on 20.7.2017.
 */

(function () {

    // A list of all QUnit test Modules.  Make sure you include the `.js`
    // extension so RequireJS resolves them as relative paths rather than using
    // the `baseUrl` value supplied above.



    var testModules = [
        "js/utils/tests/graphUtilsTest.js",
        "js/components/tests/uiTest.js",
        "js/components/tests/elementStyleTest.js"
    ];

    // Resolve all testModules and then start the Test Runner.
	require(testModules, function(){
     QUnit.load();
     QUnit.start();
	});
}());