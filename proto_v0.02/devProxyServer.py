
import requests
import json
from flask import Flask, g, jsonify, request
from flask_cors import CORS, cross_origin
import shelve

app = Flask(__name__)
CORS(app)

DATABASE = 'development.db'


def save_to_db(graph):
    try:
        d = shelve.open(DATABASE)
        print(graph['id'])
        key = graph['id']  # version control
        d[key] = graph['data']
        print("stored")
        print(d[key])
        d.close()
        return {'status': 'success'}
    except Exception as ex:
        raise Exception


def get_graph_from_db(graphId):
    print(graphId)
    try:
        d = shelve.open(DATABASE)
        graph = d[graphId]
        print(graph)
        d.close()
        return {'status': 'ok', 'data': graph}
    except Exception as ex:
        print(str(ex))
        return {'status': 'error', 'data': str(ex)}


def get_graph_list_from_db():
    try:
        d = shelve.open(DATABASE, 'r')
        keys = [key for key in d.keys()]
        d.close()
        return {'status': 'ok', 'data': keys}
    except Exception as ex:
        return {'status': 'error', 'data': str(ex)}



@app.route("/<node>", methods=['GET'])
def get_node(node):
    """
    :param node: pagename to query
    :return: Json representation of the connections of MoinMoin wikipage
    """
    r = requests.get('http://localhost/?action=getGraphJSON&pagename={pagename}'.format(pagename=node))
    print(r)
    json_response = json.dumps(r.json())
    for k, v in r.json()['data'].items():
        print('%s: %s' %(k,v))
    return json_response


@app.route("/save/", methods=['GET', 'POST'])
def save_graph():
    print(request)

    if request.method == 'GET':
        return jsonify({'message': 'getting'})

    if request.method == 'POST':
        graph = request.get_json()
        response = save_to_db(graph)
        return jsonify(response)
    return 'whaaat?'


@app.route("/graph/<graphId>", methods=['GET'])
def grapdetail(graphId):
    print(graphId)
    if request.method == 'GET':
        response = get_graph_from_db(graphId)
        return jsonify(response)
    return 'whaaat?'

@app.route("/graphs", methods=['GET'])
def graphlist():
    print("getting graphlist")
    if request.method == 'GET':
        response = get_graph_list_from_db()
        return jsonify(response)
    return 'whaaat?'


if __name__ == "__main__":
    app.run()