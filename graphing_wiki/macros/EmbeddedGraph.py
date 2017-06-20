from graphingwiki.util import format_wikitext, render_error
import requests
import json

GRAPH_URL = 'http://127.0.0.1:5000/graph/'


def execute(macro, args):
    request = macro.request
    _ = request.getText

    if args:
        args = [x.strip() for x in args.split(',')]
    # Wrong number of arguments
    if not args or len(args) not in [0, 1, 2, 3]:
        return render_error(_("Invalid args"))

    # Get all non-empty args
    args = [x for x in args if x]

    # If not page specified, defaulting to current page
    if len(args) == 1:
        page = request.page.page_name
        key = args[0]
    elif len(args) == 2:
        page = args[0]
        key = args[1]
    # Faulty args
    else:
        return render_error(_("GetMetaData: Need to specify page, or page and key"))

    graphId = args[0]

    graph_response = requests.get(GRAPH_URL + graphId)
    graph_dict = graph_response.json()['data']
    graph_json = json.dumps(graph_dict)

    # request.write(elements)

    test = """
    	<div style="border:solid;">
    	<h4>Loaded: %s</h4>
    	<div id="graphId" style="width:auto;height:400px;display:block;"></div>
    	</div>
    	<script src='https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.0.0/cytoscape.js'></script>
    	<script>
    		if (graphCount === 'undefined'){
    			var graphCount = 1;
    		} else {
    			graphCount += 1;
    		}

    		var graphDivId = "graph-" + graphCount;

    		var graphContainer = document.getElementById('graphId');
    		graphContainer.setAttribute('id', graphDivId);
   			var other = %s
			var cy = cytoscape({
                container: graphContainer,
                elements: other.elements,
                style: other.style,
                layout: {name:'preset'},
                });

    	 </script>
    """ % (args[0], graph_json)

    request.write(test)

    script_name = request.getScriptname()

    try:
        request.write("Script name: %s, args: %s" % (script_name, str(args)))
    except Exception as ex:
        request.write("Script name: %s" % str(ex))

    return format_wikitext(request, "")
