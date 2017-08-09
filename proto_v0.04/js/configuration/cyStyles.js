/**
 * Created by toni on 8.8.2017.
 */

// Todo: generate these from config! priority: low
define(function () {


    return [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                'background-color': '#6490af',
                'size': '40',
                'label': 'data(id)',
                'content': 'data(id)',
                'text-valign': 'center',
                'color': 'white',
                'text-outline-width': 1,
                'text-outline-color': '#000000',
                'background-color': '#9a9a9a'
            }
        },


        {
            selector: 'node.highlight',
            style: {
                'background-color': '#c50004',
            }
        },

        {
            selector: 'node.hover-on',
            style: {
                'background-color': '#00ff14',
            }
        },

        {
            selector: 'edge',
            style: {
                'line-color': '#ccc',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                'overlay-padding': 1
            }
        },
        {
            selector: 'edge.mouse-over',
            style: {label: 'category'}
        },


        {selector: 'edge.line-style-solid', style: {'line-style': 'solid'}},
        {selector: 'edge.line-style-dotted', style: {'line-style': 'dotted'}},
        {selector: 'edge.line-style-dashed', style: {'line-style': 'dashed'}},

        {selector: 'edge.line-width-0', style: {'line-width': 0}},
        {selector: 'edge.line-width-1', style: {'line-width': 1}},
        {selector: 'edge.line-width-2', style: {'line-width': 2}},
        {selector: 'edge.line-width-3', style: {'line-width': 3}},
        {selector: 'edge.line-width-4', style: {'line-width': 4}},
        {selector: 'edge.line-width-5', style: {'line-width': 5}},
        {selector: 'edge.line-width-6', style: {'line-width': 6}},
        {selector: 'edge.line-width-7', style: {'line-width': 7}},
        {selector: 'edge.line-width-8', style: {'line-width': 8}},
        {selector: 'edge.line-width-9', style: {'line-width': 9}},
        {selector: 'edge.line-width-10', style: {'line-width': 10}},
        {selector: 'edge.line-width-11', style: {'line-width': 11}},
        {selector: 'edge.line-width-12', style: {'line-width': 12}},
        {selector: 'edge.line-width-13', style: {'line-width': 13}},
        {selector: 'edge.line-width-14', style: {'line-width': 14}},
        {selector: 'edge.line-width-15', style: {'line-width': 15}},
        {selector: 'edge.line-width-16', style: {'line-width': 16}},
        {selector: 'edge.line-width-17', style: {'line-width': 17}},
        {selector: 'edge.line-width-18', style: {'line-width': 18}},
        {selector: 'edge.line-width-19', style: {'line-width': 19}},
        {selector: 'edge.line-width-20', style: {'line-width': 20}},
        {selector: 'edge.line-width-21', style: {'line-width': 21}},
        {selector: 'edge.line-width-22', style: {'line-width': 22}},
        {selector: 'edge.line-width-23', style: {'line-width': 23}},
        {selector: 'edge.line-width-24', style: {'line-width': 24}},
        {selector: 'edge.line-width-25', style: {'line-width': 25}},
        {selector: 'edge.line-width-26', style: {'line-width': 26}},
        {selector: 'edge.line-width-27', style: {'line-width': 27}},
        {selector: 'edge.line-width-28', style: {'line-width': 28}},
        {selector: 'edge.line-width-29', style: {'line-width': 29}},
        {selector: 'edge.line-width-30', style: {'line-width': 30}},

        {selector: 'edge.arrow-shape-tee', style: {'target-arrow-shape': 'tee'}},
        {selector: 'edge.arrow-shape-triangle', style: {'target-arrow-shape': 'triangle'}},
        {selector: 'edge.arrow-shape-triangle-tee', style: {'target-arrow-shape': 'triangle-tee'}},
        {selector: 'edge.arrow-shape-triangle-cross', style: {'target-arrow-shape': 'triangle-cross'}},
        {selector: 'edge.arrow-shape-triangle-backcurve', style: {'target-arrow-shape': 'triangle-backcurve'}},
        {selector: 'edge.arrow-shape-square', style: {'target-arrow-shape': 'square'}},
        {selector: 'edge.arrow-shape-circle', style: {'target-arrow-shape': 'circle'}},
        {selector: 'edge.arrow-shape-diamond', style: {'target-arrow-shape': 'diamond'}},
        {selector: 'edge.arrow-shape-none', style: {'target-arrow-shape': 'none'}},

        {selector: 'edge.line-color-grey', style: {'line-color': 'grey', 'arrow-color': 'grey'}},
        {selector: 'edge.line-color-black', style: {'line-color': 'black', 'arrow-color': 'black'}},
        {selector: 'edge.line-color-red', style: {'line-color': 'red', 'arrow-color': 'red'}},
        {selector: 'edge.line-color-green', style: {'line-color': 'green', 'arrow-color': 'green'}},
        {selector: 'edge.line-color-orange', style: {'line-color': 'orange', 'arrow-color': 'orange'}},
        {selector: 'edge.line-color-yellow', style: {'line-color': 'yellow', 'arrow-color': 'yellow'}},
        {selector: 'edge.line-color-cyan', style: {'line-color': 'cyan', 'arrow-color': 'cyan'}},
        {selector: 'edge.line-color-blue', style: {'line-color': 'blue', 'arrow-color': 'blue'}},


        {
            selector: 'edge.hover-on',
            style: {
                'width': 5,
                'line-color': '#cc7500',
                'line-style': 'dashed',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }
        },

        {
            selector: 'edge.highlight',
            style: {
                'width': 5,
                'line-color': '#cc7500',
                'line-style': 'dashed',
                'target-arrow-color': '#000000',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
            }
        }
    ];
});