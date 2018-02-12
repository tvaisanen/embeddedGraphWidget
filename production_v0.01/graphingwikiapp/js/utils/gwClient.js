/**
 * Created by toni on 7.6.2017.
 */


define(["configuration/configs"], function (configs) {
    'use strict';
    /*
     * Client for requesting and posting data to graphingwiki
     * */

    /**
     * Graphingwiki client module. Contains fetch calls for Graphingwiki actions.
     * @module gwClient
     */

        // private methods
    var name = "GraphingWiki client";
    var user;
    var dispatch;

    function getUser(){
        return user;
    }

    function setUser(newUser){
        user = newUser;
    }

    function getUserForm() {
        return {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
    }

    function getAuthString(){
        return "Basic " + btoa(user.user + ":" + user.password);
    }


    /** @function
     *  @name fetchNode
     *  @description Query node data from Graphingwiki.
     *  @param {String} pagename MoinMoin wikipage name
     *  @return {Promise} Promise of a JSON object containing the node data.
     *  @example
     *  -- response --
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
     *                        "[[bar]]",
     *                        "thisIsNotALink"
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
     */

    function fetchNode(pagename) {

        console.group('fetchNode('+pagename+');')
        console.debug("pagename: " + pagename);

        var requestUrl = '?action=getGraphJSON&pagename=' + pagename;
        // var requestUrl = configs.API_PATH + '?action=getGraphJSON&pagename=' + pagename;
        // '{moinpath}?action=getGraphJSON&pagename={pagename}'

        var headerContent = {
                'Content-Type': 'application/json',
		        'Authorization': "Basic " + btoa(user.username + ':' + user.password)
        };

        var header = new Headers(headerContent);


        console.debug(requestUrl);
        console.debug(headerContent);

        console.debug(user);
        console.debug(header.getAll('Authorization'));


        var nodeRequest = new Request(requestUrl, {
            headers: header,
            method: 'GET'
        });

        console.debug(nodeRequest);

        console.groupEnd();

        var authString = "Basic " + btoa(user.user + ":" + user.password);

        // return fetch(nodeRequest);
        return fetch(requestUrl, {
            headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': authString
                }),
                method: 'GET'
            });
    }

    /** @function
     *  @name fetchGraphList
     *  @description Get list of stored graphs from Graphingwiki.
     *  @return {Promise} Promise of a list containing stored graphs
     */
    function fetchGraphList() {
        try {
            var requestUrl = configs.API_PATH + "graphs";
            // console.log("Loading graphs");
            var loadGraphsRequest = new Request(requestUrl, {
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                method: 'get'
            });
            return fetch(loadGraphsRequest);
        } catch (error){
            return error;
        }
    }

    /** @function
     *  @name fetchPageText
     *  @description Get MoinMoin wikipage content as raw text.
     *  @param {String} pagename MoinMoin wikipage name
     *  @return {Promise} Promise of a MoinMoin wikipage content.
     */
    function fetchPageText(pagename) {
        var requestUrl = configs.API_PATH + pagename + "/text";
        var authString = "Basic " + btoa(user.user + ":" + user.password);

        console.debug("fetchPageText");

        var promise = fetch(configs.API_PATH + '?action=jsonapi&resource=page&id=' + pagename ,{
            headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': authString
                }),
                method: 'GET'
            });
        console.group('Debug fetchPageText('+pagename+');');
        console.debug(promise);
        console.groupEnd();
        return promise;
    }

    /** @function
     *  @name fetchGraph
     *  @description Get stored graph from Graphingwiki DB.
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
     *  @name postGraph
     *  @description Save new graph to Graphingwiki DB.
     *  @param {Object} props
     *  @param {Object} props.graph Cytoscape.json() representation
     *  @param {Object} props.gwClient gwClient reference.
     *  @param {String} props.graphId Id for the graph.
     *  @param {Object} props.styles elementStyles.styles() to be loaded when graph is loaded.
     *  @return {Promise} Promise response of given action.
     */
    function postGraph(props) {
        var developmentPath = configs.API_PATH + 'save/';
        var payload = {
            id: props.graphId,
            data: {
                graph: props.graph,
                styles: props.styles
            }
        };
        console.debug("id: " + props.graphId);
        console.debug(props);
        console.debug(payload);
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

    function setUser(userdata){
        user = userdata;
    }

    /** @function
     *  @name postNode
     *  @description Create new MoinMoin page via Graphingwiki.
     *  @param {String} nodeId Id for new node. Create new MoinMoin wikipage for this node.
     *  @param {String} content content for the new page
     *  @return {Promise} Promise response of given action.
     */
    function postNode(props) {
        console.debug(props.props);
        var payload = {
            pagename: props.name,
            content: props,
            info: "Created with Graphingwiki 2.0",
            //parameters: props
        };
        var developmentPath = configs.API_CREATE_NEW_NODE;
        var postNodeRequest = new Request(developmentPath, {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'post',
            body: JSON.stringify(payload)
        });
        console.debug(postNodeRequest);
        return fetch(props.name + '/?action=putPageJSON', {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': getAuthString()
            }),
            method: 'POST',
            body: JSON.stringify(payload),
            content: JSON.stringify(payload)
        });
    }

    var dispatchActions = {
        TEST_DISPATCH: function (props) {
            console.debug("test dispatch");
            console.log(props);
            return {response: "test response from gwClient"};
        },
        GET_NODE_DATA: function (props) {
            console.info("GET_NODE_DATA dispatch received");
            console.info(props);
            console.debug(props.nodeId);
            var pagename = props.props.nodeId;
            var promise = fetchNode(pagename);
            console.log(promise);
            return {data: promise, info: "response from GET_NODE_DATA"};
        },
        POST_NODE: function (props) {
            console.info("POST_NODE dispatch received");
            console.info(props);
            return postNode(props.data);
        },
        SET_USER: function (props){
            setUser(props.data)
        },
        trigger: function (props) {
            return this[props.action](props);
        }
    };


    // public methods
    return {

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
        getUser: getUser,
        name: function () {
            return name;
        },
        postGraph: function (graphId, graphData) {
            return postGraph(graphId, graphData);
        },
        postNode: function (nodeId, content) {
            return postNode(nodeId, content);
        },
        setUser: setUser,

        triggerEvent: function (props) {
            console.log(props);
            return dispatchActions.trigger(props);
        },

        setDispatch: function (fn) {
            dispatch = fn;
            dispatch({
                action: "CONFIRM_SUBSCRIPTION",
                ctx: this,
                target: "eventProxy",
                source: "gwClient",
                fn: null,
                info: "dev test"
            });
        }
    }

});
