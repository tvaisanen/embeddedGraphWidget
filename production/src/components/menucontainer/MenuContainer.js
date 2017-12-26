/**
 * Created by tvaisanen on 12/21/17.
 */

import React, {Component} from 'react';
import './menu-container.css'

const menuTabStyles = {
    default: "menu-tabs__item",
    selected: "menu-tabs__item-selected",
}

class MenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            tabs: [
                {
                    key: 0,
                    label: 'Graphs',
                    selected: false,
                    content: () => this.state.graphs
                },
                {
                    key: 1,
                    label: 'Elements',
                    selected: false,
                    content: () => this.state.elements

                },
                {
                    key: 2,
                    label: 'Styles',
                    selected: false,
                    content: () => this.state.styles
                },

            ],
            elements: props.elements,
            graphs: props.graphs,
            styles: props.styles,
        };

        this.handleNavClick = this.handleNavClick.bind(this);
    }

    handleNavClick(key) {
        // set selected tab to key
        this.setState({selected: key})
    }

    tabs() {
        return (
            <div className="menu-tabs">
                {this.state.tabs.map(tab => (
                    <span
                        key={tab.key}
                        className={
                        this.state.selected === tab.key ?
                            menuTabStyles.selected :
                            menuTabStyles.default
                        }
                        onClick={() => this.handleNavClick(tab.key)}
                    >{tab.label}</span>
                ))}
            </div>
        )
    }

    tabContent() {

        return (
            <div>
                <ul>
                    {this.state.tabs[this.state.selected].content().map(graph => <li>{graph}</li>)}
                </ul>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.tabs()}
                <hr/>
                {this.tabContent()}
            </div>
        )
    }
}

export default MenuContainer;