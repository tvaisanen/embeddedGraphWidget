

### AJAX client for accessing GraphingWiki

#### gwClient.js

Provides fetch calls for talking with proxy.

##### public methods 

        setConfigs(configs)
        getGraph (graphId) { return fetchGraph(graphId) }
        getNodeData (pagename) { return fetchNode(pagename); }
        getGraphList(){ return fetchGraphList(); }
        getModuleName () { return moduleName }
        postGraph(graphId, graphData) { return postGraph(graphId, graphData); }


### GraphBrowser

#### graphBrowser.js