/**
 * Created by toni on 19.7.2017.
 */

define(function () {
    'use strict';
    return {
        header: "Graphingwiki 2.0",
        appContainerId: "app-container",
        contentContainerId: "content-container",
        graphContainerId: "cy",

        tabs: {
            graphs: {
                key: "graphs",
                label: "Graphs",
                active: true,
                graphs: [
                    'graph1',
                    'graph2'
                ]
            },
            elements: {
                key: "elements",
                filter: "",
                label: "Elements",
                active: false,
                data: "Data for elements"
            },
            styles: {
                key: "styles",
                label: "Styles",
                active: false,
                categories: []
            },
            createnode: {
                key: "createnode",
                label: "New Node",
                active: false
            }
        },

        API_PATH: 'http://192.168.1.105:5000/',
        API_CREATE_NEW_NODE: 'http://192.168.1.105:5000/add-to-wiki/',
        style: {
            generic: {
                lineColor: 'line-color-grey',
                lineStyle: 'solid',
                lineWidth: 'line-width-10',
                arrowShape: 'arrow-shape-triangle'
            }
        },
        gwClient: {
            API_PATH: 'http://127.0.0.1:5000/',
            API_CREATE_NEW_NODE: 'http://127.0.0.1:5000/add-to-wiki/'
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
            ],
            lineWidth: [
                {label: '1', styleClass: 'line-width-1'},
                {label: '2', styleClass: 'line-width-2'},
                {label: '3', styleClass: 'line-width-3'},
                {label: '4', styleClass: 'line-width-4'},
                {label: '5', styleClass: 'line-width-5'},
                {label: '6', styleClass: 'line-width-6'},
                {label: '7', styleClass: 'line-width-7'},
                {label: '8', styleClass: 'line-width-8'},
                {label: '9', styleClass: 'line-width-9'},
                {label: '10', styleClass: 'line-width-10'},
                {label: '11', styleClass: 'line-width-11'},
                {label: '12', styleClass: 'line-width-12'},
                {label: '13', styleClass: 'line-width-13'},
                {label: '14', styleClass: 'line-width-14'},
                {label: '15', styleClass: 'line-width-15'},
                {label: '16', styleClass: 'line-width-16'},
                {label: '17', styleClass: 'line-width-17'},
                {label: '18', styleClass: 'line-width-18'},
                {label: '19', styleClass: 'line-width-19'},
                {label: '20', styleClass: 'line-width-20'},
                {label: '21', styleClass: 'line-width-21'},
                {label: '22', styleClass: 'line-width-22'},
                {label: '23', styleClass: 'line-width-23'},
                {label: '24', styleClass: 'line-width-24'},
                {label: '25', styleClass: 'line-width-25'},
                {label: '26', styleClass: 'line-width-26'},
                {label: '27', styleClass: 'line-width-27'},
                {label: '28', styleClass: 'line-width-28'},
                {label: '29', styleClass: 'line-width-29'},
                {label: '30', styleClass: 'line-width-30'}
            ]
        },
        params: ['line-style', 'arrow-shape', 'line-color', 'line-width'],
        layoutOptions: ['cola', 'breadthfirst', 'circle', 'concentric', 'cose', 'grid', 'random']
    }
});