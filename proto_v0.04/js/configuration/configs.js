/**
 * Created by toni on 19.7.2017.
 */

define(function () {
    return {
        header: "GraphingWikiBrowser Prototype v0.03",
        appContainerId: "app-container",
        contentContainerId: "content-container",
        graphContainerId: "cy",

        tabs: {
            graphs: {
                label: "Graphs",
                active: true,
                graphs: [
                    'graph1',
                    'graph2'
                ]
            },
            elements: {
                filter: "",
                label: "Elements",
                active: false,
                data: "Data for elements"
            },
            styles: {
                label: "Styles",
                active: false,
                categories: []
            }
        },

        API_PATH: 'http://127.0.0.1:5000/',
        API_CREATE_NEW_NODE: 'http://127.0.0.1:5000/add-to-wiki/',
        style: {
            generic: {
                lineColor: 'line-color-grey',
                lineWidth: 'line-width-10',
                arrowShape: 'arrow-shape-triangle'
            }
        },
        styleOptions: {
            lineStyle: [
                {label: 'solid', styleClass: 'line-style-solid'},
                {label: 'dotted', styleClass: 'line-style-dotted'},
                {label: 'dashed', styleClass: 'line-style-dashed'}
            ],
            arrowShape: [
                {label: 'tee', styleClass: 'arrow-shape-tee'},
                {label: 'triangle', styleClass: 'arrow-shape-triangle'},
                {label: 'triangle-tee', styleClass: 'arrow-shape-triangle-tee'},
                {label: 'triangle-cross', styleClass: 'arrow-shape-triangle-cross'},
                {label: 'triangle-backcurve', styleClass: 'arrow-shape-triangle-backcurve'},
                {label: 'square', styleClass: 'arrow-shape-square'},
                {label: 'circle', styleClass: 'arrow-shape-circle'},
                {label: 'diamond', styleClass: 'arrow-shape-diamond'},
                {label: 'none', styleClass: 'arrow-shape-none'}
            ],
            lineColor: [
                {label: 'red', styleClass: 'line-color-red'},
                {label: 'green', styleClass: 'line-color-green'},
                {label: 'orange', styleClass: 'line-color-orange'},
                {label: 'yellow', styleClass: 'line-color-yellow'},
                {label: 'cyan', styleClass: 'line-color-cyan'},
                {label: 'blue', styleClass: 'line-color-blue'}
            ]
        },
        widths: function () {
            // generate array of width objects {label: VALUE, styleClass: 'line-width-VALUE'}
            var range = Array.from(Array(31).keys());
            var widths = [];
            range.forEach(function (value) {
                widths.push({label: value, styleClass: 'line-width-' + value});
            });
            return widths;
        },
        params: ['line-style', 'arrow-shape', 'line-color', 'line-width'],
        layoutOptions: ['cola', 'breadthfirst', 'circle', 'concentric', 'cose', 'grid', 'random']
    }
});