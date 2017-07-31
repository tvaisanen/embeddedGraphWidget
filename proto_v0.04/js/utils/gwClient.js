/**
 * Created by toni on 7.6.2017.
 */

define(["../configuration/configs"], function (configs) {
    /*
     * Client for requesting and posting data to graphingwiki
     * */

    /**
     * Graphingwiki client module. Contains fetch calls for Graphingwiki actions.
     * @exports gwClient
     */

        // private methods
    var moduleName = "GraphingWiki client";


    /** @function
     *  fetchNode
     *  @param {String} pagename MoinMoin wikipage name
     *  @return {Promise} Promise of a JSON object containing the node data.
     */
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
        return fetch(nodeRequest);
    }


    /** @function
     *  fetchGraphList
     *  @return {Promise} Promise of a list containing stored graphs
     */
    function fetchGraphList() {
        var requestUrl = configs.API_PATH + "graphs";
        // console.log("Loading graphs");
        var loadGraphsRequest = new Request(requestUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'get'
        });
        return fetch(loadGraphsRequest);
    }

    /** @function
     *  fetchPageText
     *  @param {String} pagename MoinMoin wikipage name
     *  @return {Promise} Promise of a MoinMoin wikipage content.
     */
    function fetchPageText(pagename) {
        var requestUrl = configs.API_PATH + pagename + "/text";
        console.log(requestUrl);
        var loadGraphsRequest = new Request(requestUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'get'
        });
        return fetch(loadGraphsRequest);
    }

    /** @function
     *  fetchPageText
     *  @param {String} graphId of a stored graph
     *  @return {Promise} Promise of a JSON cytoscape representation of graphId graph.
     */
    function fetchGraph(graphId) {
        var requestUrl = configs.API_PATH + graphId;
        console.log("GRAPHID: " + graphId);
        var loadGraphRequest = new Request(requestUrl, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'get'
        });

        console.debug(loadGraphRequest);
        return fetch(loadGraphRequest);

    }

    /** @function
     *  fetchPageText
     *  @param {String} graphId Id for the graph.
     *  @param {String} graphToSave cytoscape.json() graph element to save.
     *  @return {Promise} Promise response of given action.
     */
    function postGraph(graphId, graphToSave) {
        var developmentPath = configs.API_PATH + 'save/';
        var payload = {
            id: graphId,
            data: graphToSave
        };
        console.log("GRAPHID: " + graphId);
        console.debug(graphToSave);
        var saveGraphRequest = new Request(developmentPath, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify(payload)
        });
        console.debug(saveGraphRequest);
        return fetch(saveGraphRequest);
    }

    /** @function
     *  fetchPageText
     *  @param {String} nodeId Id for new node. Create new MoinMoin wikipage for this node.
     *  @param {String} content content for the new page
     *  @return {Promise} Promise response of given action.
     */
    function postNode(nodeId, content) {
        var payload = {
            pagename: nodeId,
            content: "This is page is created by GraphingWikiBrowser" + content
        };
        console.log(configs);
        var developmentPath = configs.API_CREATE_NEW_NODE;
        var postNodeRequest = new Request(developmentPath, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify(payload)
        });
        console.debug(postNodeRequest);
        return fetch(postNodeRequest);
    }


    // public methods
    return {

        setConfigs: function (configs) {
            setConfiguration(configs);
        },

        getGraph: function (graphId) {
            return fetchGraph(graphId);
        },

        getNodeData: function (pagename) {
            // remember to use getNodeData(pagename).then( ... do stuff )
            return fetchNode(pagename);
        },

        getGraphList: function () {
            return fetchGraphList();
        },

        getModuleName: function () {
            return moduleName;
        },

        getPageText: function (pagename) {
            return fetchPageText(pagename);
        },

        postGraph: function (graphId, graphData) {
            return postGraph(graphId, graphData);
        },

        savePageToMoin: function (nodeId, content) {
            return postNode(nodeId, content);
        }
    }

});
