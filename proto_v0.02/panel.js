/**
 * Created by toni on 6.6.2017.
 */
var d = document;

var testState = {
    containerId: "panel-container",
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
            label: "Elements",
            active: false,
            data: "Data for elements"
        },
        styles: {
            label: "Styles",
            active: false,
            styles: [
                {
                    name: "category 1",
                    data: "data for 1"
                },
                {
                    name: "category 2",
                    data: "data for 2"
                }
            ]
        }
    }
};

var panel = (function () {

    var props;

    function renderGraphsContent() {
        /*
         * Implement graphs tab rendering here
         *
         * */

        var content = props.tabs.graphs;
        var div = document.createElement('div');
        div.setAttribute('id', "graphs-content");
        var ul = document.createElement('ul');

        content.graphs.forEach(function (graph) {
            // get the graph
            var categoryStyle = {};
            var li = document.createElement('li');
            li.innerHTML = graph;
            ul.appendChild(li);
        });
        div.appendChild(ul);
        return div;
    }

    function testRenderGraphsContent(testState){
        // set context for tests
        console.group("testRenderGraphsContent()");
        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesContent = renderGraphsContent();
        assert(stylesContent.id == "graphs-content", "renderGraphsContent() returns div with proper id");
        console.groupEnd();
    }

    function renderElementsContent() {
        /*
         * Implement elements tab rendering here
         *
         * */
        var content = props.tabs.elements;
        var div = document.createElement('div');
        div.setAttribute('id', "elements-content");
        div.innerHTML = content.data;

        return div;
    }
    function testRenderElementsContent(testState){
        // set context for tests
        console.group("testRenderStylesContent()");
        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesContent = renderElementsContent();
        assert(stylesContent.id == "elements-content", "renderElementsContent() returns div with proper id");
        console.groupEnd();
    }


    function renderStylesContent() {
        /*
         * Implement style tab rendering here
         *
         *  styles: {
                label: "Styles",
                active: false,
                styles: [
                    {
                        categoryName: "category 1",
                        data: "data for 1"
                    },
                    {
                        categoryName: "category 2",
                        data: "data for 2"
                    }
                ]
            }
         * */

        var styles = props.tabs.styles.styles;
        var div = document.createElement('div');
        div.setAttribute('id', "styles-content");
        var ul = document.createElement('ul');

        styles.forEach(function (style) {
            var li = document.createElement('li');
            li.innerHTML = style.name + " : " + style.data;
            ul.appendChild(li);

        });
        div.appendChild(ul);


        return div;
    }

    function testRenderStylesContent(testState){
        // set context for tests
        console.group("testRenderStylesContent()");
        setProps(testState, 'all');
        handleNavClick('styles');
        var stylesContent = renderStylesContent();
        assert(stylesContent.id == "styles-content", "renderStylesContent() returns div with proper id");
        console.groupEnd();
    }

    function handleNavClick(keyToActivate) {

        var tabs = props.tabs;
        // toggle all navlink classes to inactive
        var links = Object.keys(tabs);
        links.forEach(function (key) {
            tabs[key].active = false;
        });

        // activate clicked navlink
        tabs[keyToActivate].active = true;

        updatePanel();
    }

    function testHandleNavClick(testState){
        setProps(testState, 'all');
        var result = handleNavClick('elements');
        console.group('testHandleNavClick()');
        var conditionA = assert(props.tabs.elements.active == true, 'handleNavClick(key) activates the tab correctly');
        var conditionB = assert(props.tabs.graphs.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var conditionC = assert(props.tabs.styles.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var firstTestsNotPassed = !(conditionA && conditionB && conditionC);

        var result = handleNavClick('styles');
        var conditionA = assert(props.tabs.elements.active == false, 'handleNavClick(key) activates the tab correctly');
        var conditionB = assert(props.tabs.graphs.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var conditionC = assert(props.tabs.styles.active == true, 'handleNavClick(key) deactivates the tab correctly');
        console.groupEnd();
        var secondTestsNotPassed = !(conditionA && conditionB && conditionC);

        if (firstTestsNotPassed && secondTestsNotPassed){
            alert("Virhe korjaa bugi ennen ko jatkat");
            throw Error('testHandleNavClick() failed');
        }
    }

    function renderNavigation() {

        var tabs = props.tabs;
        var divNav = document.createElement('div');
        divNav.id = "panel-nav";
        console.debug(tabs);
        var links = Object.keys(tabs);

        links.forEach(function (key) {

            var link = tabs[key];
            var divLink = d.createElement('div');

            if (link.active) {
                divLink.classList.add("browser-nav__item--active");

            } else {
                divLink.classList.add("browser-nav__item--inactive");
                divLink.addEventListener('click', function (event) {
                    handleNavClick(key);
                });
            }

            divLink.innerHTML = link.label;
            divNav.appendChild(divLink);
        });

        divNav.classList.add("browser-nav");

        return divNav;
    }

    function updatePanel() {

        var divNav = d.getElementById('panel-nav');
        var divContent = d.getElementById('panel-content');
        var childsToRemove = divNav.childNodes;

        /*
        console.log(childsToRemove);
        console.log(typeof childsToRemove);
        */

        childsToRemove.forEach(function (child) {
            divNav.remove(child);
        });

        childsToRemove = divContent.childNodes;
        childsToRemove.forEach(function (child) {
            divContent.remove(child);
        });


        renderPanel();
        renderContent();
    }

    function changeContentView() {

    }

    function renderContent() {

        var tabs = props.tabs;

        var divContent = d.createElement('div');
        divContent.id = "panel-content";

        // render content


        if (tabs.graphs.active) {
            divContent.appendChild(renderGraphsContent());

        } else if (tabs.elements.active) {
            divContent.appendChild(renderElementsContent());

        } else if (tabs.styles.active) {
            divContent.appendChild(renderStylesContent());
        }


        return divContent;

    }

    function setProps(updatedProps, selector) {
        /**
         * Update props
         *
         */

        if (selector === "all") {
            props = updatedProps;
        } else {
            props[selector] = updatedProps;
        }
    }

    function renderPanel() {
        var content = props.tabs;
        var container = document.getElementById(props.containerId);
        container.appendChild(renderNavigation(content));
        container.appendChild(renderContent(content));
    }

    function testHandleNavClick(testState){
        setProps(testState, 'all');
        var result = handleNavClick('elements');
        console.group('testHandleNavClick()');
        var conditionA = assert(props.tabs.elements.active == true, 'handleNavClick(key) activates the tab correctly');
        var conditionB = assert(props.tabs.graphs.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var conditionC = assert(props.tabs.styles.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var firstTestsNotPassed = !(conditionA && conditionB && conditionC);

        var result = handleNavClick('styles');
        var conditionA = assert(props.tabs.elements.active == false, 'handleNavClick(key) activates the tab correctly');
        var conditionB = assert(props.tabs.graphs.active == false, 'handleNavClick(key) deactivates the tab correctly');
        var conditionC = assert(props.tabs.styles.active == true, 'handleNavClick(key) deactivates the tab correctly');
        console.groupEnd();
        var secondTestsNotPassed = !(conditionA && conditionB && conditionC);

        if (firstTestsNotPassed && secondTestsNotPassed){
            alert("Virhe korjaa bugi ennen ko jatkat");
            throw Error('testHandleNavClick() failed');
        }
    }

    function tests(){
        var stateForTests = testState;
        console.group("Panel tests!");
        testHandleNavClick(stateForTests);
        testRenderElementsContent(stateForTests);
        testRenderGraphsContent(stateForTests);
        testRenderStylesContent(stateForTests);
        console.groupEnd();
    }

    return {

        render: function (props) {
            setProps(props, "all");
            renderPanel();
        },

        updateStylesContent: function (newCategories, styles) {
            renderStylesContent(newCategories, styles);
        },

        updateElementsContent: function (elementsProps, styles) {
            setProps(elementProps, 'elements');
            renderElementsContent()
        },

        changeView: function () {

        },

        updateProps: function () {

        },

        runTests: function (containerId) {
            tests(containerId);
        }
    }

})();


function assert(outcome, description) {
    if (outcome){
        console.log("%cPASS: " + "%c" + description, "color: green; font-size:15px;", "color: blac; font-size:14px;");
    } else {
        console.log("%cFAIL: " + "%c" + description, "color: red; font-size:15px;", "color: blac; font-size:14px;");
    }
    return outcome
}



