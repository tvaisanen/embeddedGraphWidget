/**
 * Created by toni on 20.7.2017.
 */

(function () {

    // Configure RequireJS so it resolves relative module paths from the `src`
    // folder.
    require.config({
        baseUrl: "./js",
    });

    // A list of all QUnit test Modules.  Make sure you include the `.js`
    // extension so RequireJS resolves them as relative paths rather than using
    // the `baseUrl` value supplied above.
    var testModules = [
        "js/utils/tests/graphUtilsTest.js"
    ];

    // Resolve all testModules and then start the Test Runner.
	require(testModules, function(){
     QUnit.load();
     QUnit.start();
	});
}());