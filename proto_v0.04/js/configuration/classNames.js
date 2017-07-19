/**
 * Created by toni on 19.7.2017.
 */

define(function () {
    return {
        container: 'app-container',
        graph: {
            container: 'graph-container'
        },
        panel: {
            container: 'panel-container'
        },
        menu: {
            container: 'panel-menu',
            item: {

                active: 'panel-menu__menu-item--active',
                inactive: 'panel-menu__menu-item--inactive'
            }
        },
        tab: {
            container: 'panel-tabs',
            nav: {
                container: 'panel-tab-nav',
                item: {
                    item: 'panel-tab-nav__nav-item',
                    active: 'panel-tab-nav__nav-item--active',
                    inactive: 'panel-tab-nav__nav-item--inactive'
                }
            },
            graph: {
                container: 'tab-graph',
                listHeader: 'tab-graph__list-header',
                listItem: {
                    active: 'tab-graph__list-item--active',
                    inactive: 'tab-graph__list-item--inactive'
                },
                filter: "tab-graph__filter",
                filterClasses: {
                    input: "tab-elements__filter-input"
                }
            },
            elements: {
                container: 'tab-elements',
                listHeader: 'tab-elements__list-header',
                listItem: {
                    active: 'tab-elements__list-item--active',
                    inactive: 'tab-elements__list-item--inactive',
                    selected: '.tab-elements__list-item__selected'
                },
                filter: "tab-elements__filter",
                filterInput: "tab-elements__filter-input"

            },
            styles: {
                container: 'tab-styles',
                listHeader: 'tab-styles__list-header',
                listItem: {
                    active: 'tab-styles__list-item--active',
                    inactive: 'tab-styles__list-item--inactive'
                }
            }
        },
        text: {
            container: "text-preview",
            header: "text-preview__header",
            content: "text-preview__content"
        },
        popup: {
            header: {
                btnClose: 'popup-header__btn-close',
                text: 'popup-header__text'
            }
        }
    }
});