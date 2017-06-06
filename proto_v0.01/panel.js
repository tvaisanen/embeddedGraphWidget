/**
 * Created by toni on 6.6.2017.
 */
var d = document;


var containerProps = {
    containerId: "panel-container",
    content: {
        graphs: {label: "Graphs", active: true, data: "Data for graphs"},
        elements: {label: "Elements", active: false, data: "Data for elements"},
        styles: {label: "Styles", active: false, data: "Data for styles"}
    }
};

var panel = (function () {

    var props;

    function renderGraphsContent(content){
        var div = document.createElement('div');
        div.innerHTML = content.data;
        console.debug(div);
        return div;
    }

    function renderElementsContent(content){
        var div = document.createElement('div');
        div.innerHTML = content.data;
        console.debug(div);
        return div;
    }

    function renderStylesContent(content){
        var div = document.createElement('div');
        div.innerHTML = content.data;
        console.debug(div);
        return div;
    }

    function handleNavClick(event, keyToActivate, navLinks){

        var links = Object.keys(navLinks);
        links.forEach(function (key) {
            navLinks[key].active = false;
        });

        navLinks[keyToActivate].active = true;
        console.debug('handleNavClick()');
        updatePanel();
    }

    function renderNavigation(navLinks){

        var divNav = document.createElement('div');
        divNav.id = "panel-nav";
        var links = Object.keys(navLinks);

        links.forEach(function(key) {
            console.log(key);
            var link = navLinks[key];
            var divLink = d.createElement('div');
            if (link.active){
                divLink.classList.add("browser-nav-item__active");
            } else {
                divLink.classList.add("browser-nav-item__inactive");
                divLink.addEventListener('click', function (event) {
                    handleNavClick(event, key, navLinks);
                });
            }

            divLink.innerHTML = link.label;
            divNav.appendChild(divLink);
        });

        divNav.classList.add("browser-nav");

        console.debug('renderNavigation()');
        return divNav;
    }

    function updatePanel(){
        console.debug('updatePanel()');
        var divNav = d.getElementById('panel-nav');
        var divContent = d.getElementById('panel-content');

        divNav.childNodes.forEach(function(child){
            divNav.remove(child);
        });

        divContent.childNodes.forEach(function(child){
            divContent.remove(child);
        });


        renderPanel();
        renderContent();
    }

    function changeContentView(){

    }

    function renderContent() {

        var content = props.content;

        var divContent = d.createElement('div');
        divContent.id = "panel-content";

        // render content


        if (content.graphs.active) {
            divContent.appendChild(renderGraphsContent(content.graphs));

        } else if (content.elements.active) {
            divContent.appendChild(renderElementsContent(content.elements));

        } else if (content.styles.active) {
            divContent.appendChild(renderStylesContent(content.styles));
        }



        return divContent;

    }

    function setProps(initProps) {
        props = initProps;
    }

    function renderPanel(){
        var content = props.content;
        var container = document.getElementById(props.containerId);
        container.appendChild(renderNavigation(content));
        container.appendChild(renderContent(content));
    }

    return {

        render: function (props) {
            setProps(props);
            renderPanel();
        }
    }

})();

panel.render(containerProps);