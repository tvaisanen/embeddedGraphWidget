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
                list: 'tab-elements__list',
                listContainer: 'tab_elements__list-container',
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
                },
                selectionTable: 'style-selection-table'
            },
            nodeForm: {
                container: 'node-form',
                label: 'node-form__input-label',
                inputBlock: 'node-form__input-block',
                input: 'node-form__input',
                button: 'node-form__button'
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
        },
        components: {
            dynamiceListInput: {
                container: "dynamic-list-input__container",
                label: "dynamic-list-input__label",
                input: "dynamic-list-input__input-text",
                inputBlock: "dynamic-list-input__input-block",
                button: "dynamic-list-input__button",
                list: "dynamic-list-input__list",
                listItem: "dynamic-list-input__list-item",
                listItemText: "dynamic-list-input__list-item__text",
                listItemDeleteBtn: "dynamic-list-input__list-item__delete-btn",

            },

            nodeForm: {
                container: 'node-form',
                label: 'node-form__input-label',
                inputBlock: 'node-form__input-block',
                input: 'node-form__input-text',
                button: 'node-form__button'

            },

            templateFormManager: {
                container: "template-form-manager__container",
                formsContainer: "template-form-manager__forms",
                form: "template-form-manager__form",
                label: "template-form-manager__label",
                input: "template-form-manager__input-text",
                inputBlock: "template-form-manager__input-block",
                button: "template-form-manager__button",
                list: "template-form-manager__list",
                listItem: "template-form-manager__list-item",
                listItemText: "template-form-manager__list-item__text",
                listItemDeleteBtn: "template-form-manager__list-item__delete-btn",

            },
        }
    }
});