## Requirements

* gwClient - API interface to Graphingwiki


## API specification

API config

    API_PATHS: {
        root: <ROOT>
        graph: "/graph" 
        graph: function(revision){ return root + graph + "&rev=" + revision;},
        node: "/node"
        node: function(revision) { return root + node + "&rev=" + revision; },
    }

### Graph
GET


`example request`

    // Revision?
    var requestUrl = API_PATHS.graph();

    var req = new Request(requestUrl, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'GET',
        body: {}
    });
    
    var promise = fetch(req);
    
    promise.then(function (response){
        return response.json();
    }).then(function(json){
        console.log(json);
    });
    
    ...
    
    {
    }

            
POST - Store new graph 

    var req = new Request(API_PATH.graph, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: {
            graphId: <ID>,
            cyInstance: <cy.json()>,
            elementStyles: elementStyles.styles()  
        }
    });
    
    select http responses
    200, 403, 404..
    
PUT - Update existing graph

    var req = new Request(API_PATH.graph, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'PUT',
        body: {
            graphId: <ID>,
            cyInstance: <cy.json()>,
            elementStyles: elementStyles.styles()       }
    });
    
    select http responses
    200, 403, 404..

DELETE - Delete existing graph

    var req = new Request(API_PATH.graph, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
  
        method: 'DELETE',
        body: {}
    });
    
    select http responses
    200, 403, 404..
    
### Graphlist
GET - Get list of stored graphs

    var req = new Request(API_PATH.graph, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'GET',
        body: {}
    });

### Node

#### Metas format

    var metas = {
        "foo": [
            "[[bar]]"
        ]
    },

GET - Get node


`example request`

    // Revision?
    // textContent = True/False
    var requesUrl = API_PATHS.node();

    var req = new Request(requestUrl, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'GET',
        body: {}
    });
    
    var promise = fetch(req);
    
    promise.then(function (response){
        return response.json();
    }).then(function(json){
        console.log(json);
    });
    
    ...
    
    {
        data: {
            acl: ""
            meta: {}
            mtime: 1497600051.268435,
            imageUrl: <IMAGE_PATH>,
            out: {
                gwikicategory: ["CategoryHomepage"]
                _notype: ["personA", "personB", "organizationA", ...]
            saved: true
        }
    }
    
    
POST - Store new node

    var req = new Request(API_PATH.graph, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: {['template', metas}
    });

    
PUT - Update existing node

    var req = new Request(API_PATH.graph, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'PUT',
        body: {[metas]}
    });
    
DELETE- Delete existing page/node

    var req = new Request(API_PATH.graph, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'DELETE',
        body: {}
    });


## Get parsed text content

GET 

    var req = new Request(API_PATH.parsedTextContent, {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        method: 'GET',
        body: {}
    });


## Development Server

The proxy used in development uses the following actions.

### Dependencies

* `requests` - For interacting with MoinMoin and GraphingWiki.
* `flask` - Serving the proxy.

### API

#### GET list of stored graphs
Get list of stored graphs - the graphs tab from the panel uses these.

    @app.route("/graphs", methods=['GET'])
    def graphlist():
        if request.method == 'GET':
            response = get_graph_list_from_db()
            return jsonify(response)

    def get_graph_list_from_db():
        try:
            d = shelve.open(DATABASE, 'r')
            keys = [key for key in d.keys()]
            d.close()
            return {'status': 'ok', 'data': keys}
        except Exception as ex:
            return {'status': 'error', 'data': str(ex)}

#### GET graph data about a MoinMoin page
Proxy for getGraphJSON action.    
    
    @app.route("/<node>", methods=['GET'])
    def get_node(node):
        r = requests.get(
            '{moinpath}?action=getGraphJSON&pagename={pagename}'
            .format(moinpath=MOIN_PATH, pagename=node))
        return jsonify(r.json())
   
   
#### POST save cytoscape graph to shelve

@`graph`: cy.json( ) - Json representation of cytoscape graph.

    @app.route("/save/", methods=['POST'])
    def save_graph():
        if request.method == 'POST':
            graph = request.get_json()
            response = save_to_db(graph)
            return jsonify(response)

    def save_to_db(graph):
        try:
            d = shelve.open(DATABASE)
            key = graph['id']
            d[key] = graph['data']
            d.close()
            return {'status': 'success'}
        except Exception as ex:
            raise Exception
            
#### GET stored graph from the shelve
            
@`graphId`: string of graphId - return corresponding graph from the shelve.

    @app.route("/graph/<graphId>", methods=['GET'])
    def grapdetail(graphId):
        if request.method == 'GET':
            response = get_graph_from_db(graphId)
            return jsonify(response)

    def get_graph_from_db(graphId):
        try:
            d = shelve.open(DATABASE)
            graph = d[graphId]
            d.close()
            return {'status': 'ok', 'data': graph}
        except Exception as ex:
            return {'status': 'error', 'data': str(ex)}
            
            
## Todo
 
* support showgraph/savegraphs..
* add meta to node (ctx menu)
** user is prompted to add list of metas
* post photo [Attachment api] with putNode
