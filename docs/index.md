# GraphingWikiBrowser  v0.02

GraphingWikiBrowser is an extension for [GraphingWiki ](https://github.com/graphingwiki/graphingwiki). Providing visual tool for browsing the wiki. The browser can also input data to MoinMoin and store graphs to be viewed later.

## Initialization

### Client

* `<div id="graph-browser"/>` - create div for the app.
* `<script src="cytoscape.js"/>` - The graphing library used.
* `<script src="cola.js"/>` - Cola provides the dynamic layout.
* `<script src="cytoscape-cola.js"/>` - Cytoscape wrappings for cola.
* `<script src="graphBrowser.js"/>` - Include the app into the page where to use it.

### Server

Make sure you have [MoinMoin](https://moinmo.in/MoinMoinDownload) and [GraphingWiki ](https://github.com/graphingwiki/graphingwiki) installed. In addition the browser needs to have the latest getGraphJSON action installed, which is not yet included in the GraphingWiki. This action provides the API for querying the basic information for graphing.

* GraphingWikiBrowser uses GraphingWiki backend for querying graph data.
* getGraphJSON action has to be installed

Current development version needs the proxy server `devProxyServer.py`,  which uses [Flask](http://flask.pocoo.org/) to create proxy for accessing the MoinMoin and storing the graphs to a shelve database. Please refer to [development](development.md) to further instructions on how to set up the development environment.

## Testing

Open the file: `test.html` in a browser to run unit tests.


## Project layout

    mkdocs.yml    # The configuration file.
    docs/
        index.md  # The documentation homepage.
        ...       # Other markdown pages, images and other files.
