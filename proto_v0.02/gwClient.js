/**
 * Created by toni on 7.6.2017.
 */

var gwClient = (function () {
    /*
    * Client for requesting and posting data to graphingwiki
    *
    *
    * */

    // private methods
    var moduleName = "GraphingWiki client";
    var configs = {};

    function setConfiguration(configuration) {
        configs = configuration;
    }

    function validateResponse(response) {
        console.groupCollapsed('Debugging gwClient.handlePromise()');
        console.debug(response);
        if (response.status >= 200 && response.status < 300) {
            console.debug("response status [200, 300[");
            var json = response.json(); // there's always a body
            var responseData = json.data;
            console.debug('Json:');
            console.debug(json);
            console.debug(responseData);
            console.groupEnd();
            return json;
        }
    }

    function fetchNode(pagename) {
        /*
     *        Example response
     *
     *        GET http://localhost/?action=getGraphJSON&pagename=personA
     *
     *        -- response --
     *        200 OK
     *        Date:  Wed, 31 May 2017 09:39:36 GMT
     *        Server:  Apache/2.4.18 (Ubuntu)
     *        Vary:  Cookie,User-Agent,Accept-Language
     *        Set-Cookie:  MOIN_SESSION_80_ROOT=9b96593c92f886182f30993f6657a1c5f05c94f4; Expires=Sat, 29-May-2027 09:39:00 GMT; Max-Age=315360000; Path=/
     *        Content-Length:  780
     *        Keep-Alive:  timeout=5, max=100
     *        Connection:  Keep-Alive
     *        Content-Type:  application/json
     *
     *        {
     *            "debug": "<AllContext ['AllContext']>",
     *            "data": {
     *                "in": {
     *                    "_notype": [
     *                        "TestUser",
     *                        "organizationA",
     *                        "personB"
     *                    ]
     *                },
     *                "acl": "",
     *                "meta": {
     *                    "foo": [
     *                        "[[bar]]"
     *                    ]
     *                },
     *                "mtime": 1496140265.359017,
     *                "saved": true,
     *                "out": {
     *                    "_notype": [
     *                        "organizationA",
     *                        "CategoryCategory",
     *                        "CategoryAsd"
     *                    ],
     *                    "gwikicategory": [
     *                        "CategoryCategory",
     *                        "CategoryAsd"
     *                    ],
     *                    "foo": [
     *                        "bar"
     *                    ]
     *                }
     *            },
     *            "response_time": 0.000621795654296875
     *        }
     *
     * */

        var requestUrl = configs.API_PATH + pagename;

        var nodeRequest = new Request(requestUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'GET'
        });
        console.groupCollapsed('Debugging gwClient.fetchNode()');
        console.debug(requestUrl);
        console.debug(nodeRequest);
        console.groupEnd();
        return fetch(nodeRequest).then(function (response) { return validateResponse(response); });
    }

    function loadGraphList() {
        var requestUrl = configs.API_PATH + "graphs";
        console.log("Loading graphs");
        var loadGraphsRequest = new Request(requestUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'get'
        });
        var promise = fetch(loadGraphsRequest);
        promise.then(function (response) {
            return validateResponse(response);
        });
    }

    function getGraph(graphId) {
        var requestUrl = configs.API_PATH + "graph/" + graphId;
        console.log("GRAPHID: " + graphId);
        var loadGraphRequest = new Request(requestUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'get'
        });
        console.debug(loadGraphRequest);
        var promise = fetch(loadGraphRequest);
        promise.then(function (response) { return validateResponse(response); });
    }


    // public methods
    return {

        setConfigs: function(configs){
            setConfiguration(configs);
        },

        getNodeData: function (pagename) {
            // remember to use getNodeData(pagename).then( ... do stuff )
            return fetchNode(pagename);
        },

        getGraphList: function(){
            return loadGraphList();
        },

        getModuleName: function () {
            return moduleName;
        }
    }

})();
