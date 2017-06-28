/**
 * Created by toni on 27.6.2017.
 */

var testMe = (function (instance_) {

    var instance = instance_;
    var ok = 'ok';

    function giveMeTests(tests){
        var testThis = tests.bind(this);
        testThis();
    }

    function printInstance(){
        console.log(instance);
    }

    function setAndRunTests(testCases){
        console.log(ok);
        console.log(this);
        testCases();
    }
    var test;

    return {

        printThis: function(){
            console.log(this.parent);
            printInstance();
        },

        setTest: function(tests){
            test = tests;
            setAndRunTests(tests);
        }
    }

})();

function hello(msg){
    console.log('hello ' + msg);
}

function test(ctx) {
    QUnit.test("Test", function (assert) {
        assert.ok(true, "I'm running okey?!");
        assert.equal(ctx.ok, 'ok', "Ok means ok?");
    });
}

testMe.setTest(test);
testMe();
