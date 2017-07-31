# -*- coding: utf-8 -*-"
"""
    getGraphJSON action for GraphingWiki for querying graph information
    via JSON. Intended to work as an ÁPI for GraphingWikiBrowser.


    @copyright: 2017 Toni Väisänen <vaisanen.toni@gmail.com>
    @license: MIT <http://www.opensource.org/licenses/mit-license.php>

"""

#
from graphingwiki.util import format_wikitext
import graphingwiki as gw
import graphingwiki.util as gw_util


from time import time

try:
    import simplejson as json
except ImportError:
    import json


def execute(pagename, request):
    # parse query configuration to a dict
    form = gw.values_to_form(request.values)


    # Set up the graph data query
    t0 = time()
    request.content_type = "application/json"

    # for additional information along with the request
    notifications = None
    # for error messages
    errors = None

    try:
        # set query node name from query params
        query_node = form['pagename'][0]
    except Exception as ex:
        # use pagename from the path as query param, as in https://<PATH>/pagename/
        query_node = pagename
        notifications = 'Pagename can be passed on as a parameter. pagename=PAGE_TO_QUERY'

    try:

        try:
            # request graph data
            data = request.graphdata.getpage(query_node)
            error_with_response_graph = False
        except Exception as ex:
            # if there's no pagename in query configuration, use the one defined in the path
            data = request.graphdata.getpage(pagename)
            error_with_response_graph = True

    except Exception as ex:
        errors = str(ex)
        notifications = 'Something went wront with the: "request.graphdata.getpage(pagename)"'

    t1 = time()
    server_response_time = t1 - t0

    response = {
        'data': data,
        'response_time': server_response_time
    }

    if (notifications):
        response['notifications'] = notifications

    if (errors):
        response['errors'] = errors

    response['debug'] = str(request)

    json.dump(response, request, indent=4)
    request.status_code = 200
    request.ok = True

    return
