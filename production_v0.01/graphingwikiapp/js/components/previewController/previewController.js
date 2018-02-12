/**
 * Created by tvaisanen on 12/27/17.
 */


define(["components/templateRenderer/templateRenderer"],
    function (templateRenderer) {
        "use strict";

        /**
         * Component for controlling the preview box.
         * Responsible of rendering the page content and
         * graph data for previewing.
         * @exports previewController
         */

        var styleClass = {
            container: "preview_container"
        };

        var dispatch;

        function content(contentElement){
            var div = document.getElementById('text-preview');
            div.innerHTML = "";
            div.appendChild(contentElement);
        }

        function setPagePreview(data){
            try {
               var div = document.createElement('div');
                console.debug(typeof data.content);
                div.appendChild(templateRenderer.render(data.content));
                content(div);
                console.debug(div);
            } catch (error){
                console.group("previewController.setPagePreview()");
                console.debug(error);
                console.debug(data);
                console.groupEnd();
            }


        }

        function setGraphInfoPreview(data){
            var div = document.createElement('div');
            div.innerHTML = "Graph Info";
            content(div);

        }

        function setMessage(data){
            console.debug('setting message');
            var div = document.createElement('div');
            div.innerHTML = "Message: " + data.message;
            setContent(div);

        }

        function setContent(data){
            switch (data.type){
                case 'PAGE': {
                    console.debug('case: PAGE');
                    console.debug(data.content);
                    setPagePreview(data);
                    break;
                }
                case 'GRAPH': {
                    console.debug('case: GRAPH');
                    setGraphInfoPreview(data);
                    break;
                }
                case 'MESSAGE': {
                    console.debug('case: MESSAGE');
                    setMessage(data);
                    break;
                }
                default: {
                    alert('this is not supposed to happen?\n' + JSON.stringify(data))
                }
            }
        }

        var dispatchActions = {
            SET_CONTENT: setContent,
            trigger: function (props) {
                this[props.action](props.data);
            }
        };

        return {
            setPreviewContent: setContent,
            setDispatch: function (fn) {
                dispatch = fn;
                dispatch({
                    action: "CONFIRM_SUBSCRIPTION",
                    ctx: this,
                    target: "eventProxy",
                    source: "previewController",
                    fn: null,
                    info: "dev test"
                });
            },
            triggerEvent: function (props) {
                console.log(props);
                return dispatchActions.trigger(props);
            }
        }
    });