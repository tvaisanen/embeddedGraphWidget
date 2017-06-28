# GraphingWikiBrowser  v0.02

GraphingWikiBrowser is an extension for [GraphingWiki ](https://github.com/graphingwiki/graphingwiki). Providing visual tool for browsing the wiki. The browser can also input data to MoinMoin and store graphs to be viewed later or embedded to a wiki page.

## Initialization

### Client

* `<div id="app-container"/>` - create div for the app.
* `<script src="js/cytoscape.js"/>` - The graphing library used.
* `<script src="js/cola.js"/>` - Cola provides the dynamic layout.
* `<script src="js/cytoscape-cola.js"/>` - Cytoscape wrappings for cola.
* `<script src="js/gwClient.js"/>` - Cytoscape wrappings for cola.
* `<script src="js/graphBrowser.js"/>` - Include the app into the page where to use it.

### Server

Make sure you have [MoinMoin](https://moinmo.in/MoinMoinDownload) and [GraphingWiki ](https://github.com/graphingwiki/graphingwiki) installed. In addition the browser needs to have the latest getGraphJSON action installed, which is not yet included in the GraphingWiki. This action provides the API for querying the basic information for graphing.

* GraphingWikiBrowser uses GraphingWiki backend for querying graph data.
* getGraphJSON action has to be installed

Current development version needs the proxy server `devProxyServer.py`,  which uses [Flask](http://flask.pocoo.org/) to create proxy for accessing the MoinMoin and storing the graphs to a shelve database. Please refer to [development](development.md) to further instructions on how to set up the development environment.

## Testing

Open the file: `test.html` in a browser to run unit tests.
GraphingWikiBrowser has unit tests embedded inside the module. These can be 
run manually by calling `panel.test()`. The test state is currently embedded as a global variable inside `panel.js`. 

## Project layout

    proto_v0.01/
        ...                 # Contains files for the first prototype.
    proto_v0.02/
        Planning/           # Design etc.
        devProxyServer.py   # Development proxy server.
        development.db      # Python shelve db for development.
        ...                 # Contains files for the first prototype.
    mkdocs.yml              # The configuration file for running mkdocs.
    docs/
        index.md            # The documentation homepage.
        ...                 # Other markdown pages, images and other files.
