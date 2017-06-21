## Todos

* Implement graph storing at GraphingWiki backend
* Serve the GraphingWikiBrowser within MoinMoin

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
            
            

