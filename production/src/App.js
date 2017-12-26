import React, {Component} from 'react';
import {Col, Row, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import MenuContainer from './components/menucontainer/MenuContainer';

import CytoscapeRenderer from './components/CytoscapeRenderer';

class App extends Component {
    render() {
        return (
            <div className="App">

                <Row>
                    <Col xs={3} sm={3} md={3} lg={3}>
                        <MenuContainer
                            graphs={graphs}
                            elements={els}
                            styles={styles}
                        />
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9}>
                        <div id="cy" style={{
                            border: "1px solid red",
                            minWidth: 400,
                            minHeight: "100vh",
                        }}></div>
                        <CytoscapeRenderer

                            elements={elements}/>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default App;

const graphs = ['graph uno', 'graph dos', 'graph tres'];
const styles = ['style one', 'style dos', 'style three'];
const els = ['element one', 'element two', 'element sd'];

const elements = [
    { // node n1
        group: 'nodes', // 'nodes' for a node, 'edges' for an edge
        // NB the group field can be automatically inferred for you but specifying it
        // gives you nice debug messages if you mis-init elements


        data: { // element data (put json serialisable dev data here)
            id: 'n1', // mandatory (string or number) id for each element, assigned automatically on undefined
            parent: 'nparent', // indicates the compound node parent id; not defined => no parent
        },

        // scratchpad data (usually temp or nonserialisable data)
        scratch: {
            _foo: 'bar' // app fields prefixed by underscore; extension fields unprefixed
        },

        position: { // the model position of the node (optional on init, mandatory after)
            x: 100,
            y: 100
        },

        selected: false, // whether the element is selected (default false)

        selectable: true, // whether the selection state is mutable (default true)

        locked: false, // when locked a node's position is immutable (default false)

        grabbable: true, // whether the node can be grabbed and moved by the user

        classes: 'foo bar' // a space separated list of class names that the element has
    },

    { // node n2
        data: {id: 'n2'},
        renderedPosition: {x: 200, y: 200} // can alternatively specify position in rendered on-screen pixels
    },

    { // node n3
        data: {id: 'n3', parent: 'nparent'},
        position: {x: 123, y: 234}
    },

    { // node nparent
        data: {id: 'nparent', position: {x: 200, y: 100}}
    },

    { // edge e1
        data: {
            id: 'e1',
            // inferred as an edge because `source` and `target` are specified:
            source: 'n1', // the source node id (edge comes from this node)
            target: 'n2'  // the target node id (edge goes to this node)
        }
    }
]