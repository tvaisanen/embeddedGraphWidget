/**
 * Created by Toni Väisänen on 5.6.2017.
 */
var configs = {

    // This is a proxy server for development
    API_PATH: 'http://127.0.0.1:5000/'
};


var gwClient = (function () {
    /*
    * Client for requesting and posting data to graphing wiki
    *
    *
    * */

    // private methods
    var configs = {};

    function setConfiguration(configuration) {
        configs = configuration;
    }

    function validateResponse(response) {
        /*
         * Place to validate responses
         */
        if (response.status >= 200 && response.status < 300) {
            console.info("response status [200, 300]");
            return response.json();
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
        return fetch(nodeRequest).then(function (response) { return validateResponse(response); });
    }


    // public methods
    return {

        setConfigs: function(configs){
            setConfiguration(configs);
        },

        getNodeData: function (pagename) {
            // remember to use getNodeData(pagename).then( ... do stuff )
            return fetchNode(pagename);
        }
    }

})();

var EmbeddedGraphWidget = {

    cy: cytoscape({
    container: document.getElementById('cy'),
    elements: [{group: 'nodes', data: {id: 'personA'}}],
    style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#666',
                'label': 'data(id)'
            }
        },

        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'overlay-padding': 1
            }
        },

        {
            selector: 'edge.foo',
            style: {
                'width': 3,
                'line-color': '#cc1244',
                'line-style': 'dashed',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        },

        {
            selector: 'edge._notype',
            style: {
                'width': 3,
                'line-color': '#002fcc',
                'line-style': 'dotted',
                'target-arrow-color': '#ffffff',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        },

        {
            selector: 'edge.gwikicategory',
            style: {
                'width': 3,
                'line-color': '#0fcc12',
                'line-style': 'dotted',
                'target-arrow-color': '#ffffff',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier'
            }
        }
    ]
        
    }),

    setAndRunLayout: function() {
        console.info("running 'setAndRunLayout()'-function")
        var layoutOption = document.querySelector('#layout-options').value;
        var layout = cy.makeLayout({name: layoutOption})
        layout.run();
    },

    getStyleList: function (style) {
        /*
        * Method for generating HTML list of style parameters of a category
        * param: style cy.style() -object
        *
        *   style = {
        *      selector:"group.category"
        *      style: Object
        *      curve-style: "bezier"
        *      line-color: "#002fcc"
        *      line-style: "dotted"
        *      target-arrow-color: "#ffffff"
        *      target-arrow-shape: "triangle"
        *      width: "3px"
        * */
        var ul = document.createElement("ul");
        var styles = style.style;
        var styleKeyValues = Object.keys(styles).map(function (key) {
            return {key: key, value: styles[key]};
        });

        styleKeyValues.forEach(function (style) {
            var li = document.createElement('li');
            var str = style.key + " : " + style.value;
            li.innerHTML = li.innerHTML + str;
            ul.appendChild(li);
        });

        return ul;
    },

    eventHandler: function (event) {
        this.doSomething(event.target.id);
    },

    doSomething: function (id) {
        console.log(id);
    }
};
/*
addListener(element, "click", function (event) {
    EmbeddedGraphWidget.eventHandler(event);
});


var lineStyleOptions = {
    "width": "integer",
    "line-color": "rgb",
    "line-style": [],
    "target-arrow-color": "rgb",
    "target-arrow-shape": [],
    "curve-style": []
};


/*
 store link categories
 update when new nodes are added
 */
/*
var categories = [];


function arrayContains(array, value) {
    "use strict";
    return array.indexOf(value) !== -1;
}

function styleList(style) {
    var ul = document.createElement("ul");
    // ul.className = "category-style-parameter-list";
    console.groupCollapsed("styleList -function");
    console.debug(style);
    console.debug(style.selector);
    console.debug(style.style);
    var styles = style.style;
    var styleKeyValues = Object.keys(styles).map(function (key) {
        return {key: key, value: styles[key]};
    });
    styleKeyValues.forEach(function (style) {
        var li = document.createElement('li');
        var str = style.key + " : " + style.value;
        li.innerHTML = li.innerHTML + str;
        ul.appendChild(li);
    });
    console.debug(ul);
    console.groupEnd();
    return ul;
}

function categoryListElement(category, style) {
    var li = document.createElement('li');
    var div = document.createElement('div');
    div.appendChild(styleList(style));
    li.innerHTML = li.innerHTML + category;
    li.appendChild(div);
    return li;
}

function categoryList(categories, styles) {

}

function renderStyles(containerId, newCategories, styles) {

    var container = document.getElementById(containerId);

    var categoryList = document.createElement('section');
    categoryList.setAttribute('id', 'category-list');

    var ul = document.createElement('ul');

    container.appendChild(categoryList);
    categoryList.appendChild(ul);

    newCategories.forEach(function (category) {

        // get the style
        var categoryStyle = {};
        console.groupCollapsed("Style Debug!");
        console.debug(category);
        styles.forEach(function (style) {
            /*
             * edge._notype == gwikicategory
             * false
             * edge.gwikicategory == gwikicategory
             * true
             * */
            if (style.selector.endsWith(category)) {
                categoryStyle = style;
                console.debug(style);
            }
        });

        ul.appendChild(categoryListElement(category, categoryStyle));
        // li.innerHTML = li.innerHTML + category + JSON.stringify(categoryStyle);
        console.groupEnd();
    });
}

function updateCategories(newCategories) {
    /*
     when: A new node is loaded.
     why: To add new possible categories.
     how: [( the category is already listed ) ? do nothing : add new category to list]
     CategoryStyles is the function, which handles the updating.
     */

    // this is what is passed to renderStyles -function.
    var newUniqueCategories = [];

    // this could be written with reducer Todo ?
    newCategories.forEach(function (category) {
        if (categories.indexOf(category) === -1) {
            newUniqueCategories.push(category)
            categories.push(category);
        }
    });

    renderStyles('cy-panel', newUniqueCategories, cy.style().json());

}




// initialize download image link

function downloadGraphPNG() {
    console.info('running downloadGraphPNG() -function')
    var png = cy.png();
    var a = document.createElement('a');

    a.href = png;
    a.download = 'image.png';
    console.debug(a);
    a.click()
}

var downloadGraphButton = document.querySelector('#download-graph-button');
downloadGraphButton.addEventListener('click', downloadGraphPNG);


// initialize run layout button action



var runLayoutButton = document.querySelector('#run-layout-button');
runLayoutButton.addEventListener('click', setAndRunLayout);

function addNode(node) {
    cy.add(node);
}



function handleSaveGraph() {

    var developmentPath = 'http://127.0.0.1:5000/save/';
    var graphToSave = cy.json();
    var graphId = document.getElementById('graph-name').value;
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

    var promise = fetch(saveGraphRequest);

    promise.then(function (response) {
        console.log(response);
    })
}

var saveGraphButton = document.querySelector('#save-graph-button');
saveGraphButton.addEventListener('click', handleSaveGraph);

function handleLoadGraph() {
    var graphId = document.getElementById('graph-query').value;
    var developmentPath = 'http://127.0.0.1:5000/graph/' + graphId;
    console.log("GRAPHID: " + graphId);
    var loadGraphRequest = new Request(developmentPath, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'get'
    });
    console.debug(loadGraphRequest);
    var promise = fetch(loadGraphRequest);
    promise.then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            var json = response.json(); // there's always a body
            console.debug(json);
            console.debug(response.ok);
            return json;
        } else {
            return json.then(Promise.reject.bind(Promise));
        }
    }).then(function (response) {
        console.log(response);
        var newGraphData = response.data;
    });
}

var loadGraphButton = document.querySelector('#load-graph-button');
loadGraphButton.addEventListener('click', handleLoadGraph);

// Dynamic CSS: cy.style().selector('edge.foo').style('line-color', 'magenta').update()


function loadNewGraph(initData) {
    cy.destroy();
    cy = cytoscape(initData);
}


function loadGraphList() {
    var developmentPath = 'http://127.0.0.1:5000/graphs';
    console.log("Loading graphs");
    var loadGraphsRequest = new Request(developmentPath, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'get'
    });
    var promise = fetch(loadGraphsRequest);
    promise.then(function (response) {
        if (response.status >= 200 && response.status < 300) {
            var json = response.json(); // there's always a body
            console.debug(json);
            console.debug(response.ok);
            return json;
        } else {
            return json.then(Promise.reject.bind(Promise));
        }
    }).then(function (response) {
        console.log(response);
        var newGraphData = response.data;
    });
}

var loadGraphsButton = document.querySelector('#load-graphs-button');
loadGraphsButton.addEventListener('click', loadGraphList);


function renderBrowserContent(active, containerId, newCategories, styles) {
    if (active === 'graphs') {
        return renderGraphList()
    } else if (active === 'elements') {
        return renderElements()
    } else if (active === 'styles') {
        return renderStyles(containerId, newCategories, styles);
    }
}


function graphWidget(containerId) {

}














