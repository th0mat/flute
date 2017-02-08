/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var react_dom_1 = require("react-dom");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var Keys = require("../../common/keys");
var Utils = require("../../common/utils");
var tab_1 = require("./tab");
var tabList_1 = require("./tabList");
var tabPanel_1 = require("./tabPanel");
var TAB_CSS_SELECTOR = "li[role=tab]";
var Tabs = (function (_super) {
    __extends(Tabs, _super);
    function Tabs(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.displayName = "Blueprint.Tabs";
        // state is initialized in the constructor but getStateFromProps needs state defined
        this.state = {};
        this.panelIds = [];
        this.tabIds = [];
        this.handleClick = function (e) {
            _this.handleTabSelectingEvent(e);
        };
        this.handleKeyPress = function (e) {
            var insideTab = e.target.closest("." + Classes.TAB) != null;
            if (insideTab && (e.which === Keys.SPACE || e.which === Keys.ENTER)) {
                e.preventDefault();
                _this.handleTabSelectingEvent(e);
            }
        };
        this.handleKeyDown = function (e) {
            // don't want to handle keyDown events inside a tab panel
            var insideTabList = e.target.closest("." + Classes.TAB_LIST) != null;
            if (!insideTabList) {
                return;
            }
            var focusedTabIndex = _this.getFocusedTabIndex();
            if (focusedTabIndex === -1) {
                return;
            }
            if (e.which === Keys.ARROW_LEFT) {
                e.preventDefault();
                // find previous tab that isn't disabled
                var newTabIndex = focusedTabIndex - 1;
                var tabIsDisabled = _this.isTabDisabled(newTabIndex);
                while (tabIsDisabled && newTabIndex !== -1) {
                    newTabIndex--;
                    tabIsDisabled = _this.isTabDisabled(newTabIndex);
                }
                if (newTabIndex !== -1) {
                    _this.focusTab(newTabIndex);
                }
            }
            else if (e.which === Keys.ARROW_RIGHT) {
                e.preventDefault();
                // find next tab that isn't disabled
                var tabsCount = _this.getTabsCount();
                var newTabIndex = focusedTabIndex + 1;
                var tabIsDisabled = _this.isTabDisabled(newTabIndex);
                while (tabIsDisabled && newTabIndex !== tabsCount) {
                    newTabIndex++;
                    tabIsDisabled = _this.isTabDisabled(newTabIndex);
                }
                if (newTabIndex !== tabsCount) {
                    _this.focusTab(newTabIndex);
                }
            }
        };
        this.handleTabSelectingEvent = function (e) {
            var tabElement = e.target.closest(TAB_CSS_SELECTOR);
            // select only if Tab is one of us and is enabled
            if (tabElement != null
                && _this.tabIds.indexOf(tabElement.id) >= 0
                && tabElement.getAttribute("aria-disabled") !== "true") {
                var index = tabElement.parentElement.queryAll(TAB_CSS_SELECTOR).indexOf(tabElement);
                _this.setSelectedTabIndex(index);
            }
        };
        this.state = this.getStateFromProps(this.props);
    }
    Tabs.prototype.render = function () {
        return (React.createElement("div", {className: classNames(Classes.TABS, this.props.className), onClick: this.handleClick, onKeyPress: this.handleKeyPress, onKeyDown: this.handleKeyDown}, this.getChildren()));
    };
    Tabs.prototype.componentWillReceiveProps = function (newProps) {
        var newState = this.getStateFromProps(newProps);
        var newIndex = newState.selectedTabIndex;
        if (newIndex !== this.state.selectedTabIndex) {
            this.setSelectedTabIndex(newIndex);
        }
        this.setState(newState);
    };
    Tabs.prototype.componentDidMount = function () {
        var _this = this;
        var selectedTab = react_dom_1.findDOMNode(this.refs[("tabs-" + this.state.selectedTabIndex)]);
        this.setTimeout(function () { return _this.moveIndicator(selectedTab); });
    };
    Tabs.prototype.componentDidUpdate = function (_, prevState) {
        var _this = this;
        var newIndex = this.state.selectedTabIndex;
        if (newIndex !== prevState.selectedTabIndex) {
            var tabElement_1 = react_dom_1.findDOMNode(this.refs[("tabs-" + newIndex)]);
            // need to measure on the next frame in case the Tab children simultaneously change
            this.setTimeout(function () { return _this.moveIndicator(tabElement_1); });
        }
    };
    Tabs.prototype.validateProps = function (props) {
        if (React.Children.count(props.children) > 0) {
            var child = React.Children.toArray(props.children)[0];
            if (child != null && child.type !== tabList_1.TabList) {
                throw new Error(Errors.TABS_FIRST_CHILD);
            }
            if (this.getTabsCount() !== this.getPanelsCount()) {
                throw new Error(Errors.TABS_MISMATCH);
            }
        }
    };
    /**
     * Calculate the new height, width, and position of the tab indicator.
     * Store the CSS values so the transition animation can start.
     */
    Tabs.prototype.moveIndicator = function (_a) {
        var clientHeight = _a.clientHeight, clientWidth = _a.clientWidth, offsetLeft = _a.offsetLeft, offsetTop = _a.offsetTop;
        var indicatorWrapperStyle = {
            height: clientHeight,
            transform: "translateX(" + Math.floor(offsetLeft) + "px) translateY(" + Math.floor(offsetTop) + "px)",
            width: clientWidth,
        };
        this.setState({ indicatorWrapperStyle: indicatorWrapperStyle });
    };
    /**
     * Most of the component logic lives here. We clone the children provided by the user to set up refs,
     * accessibility attributes, and selection props correctly.
     */
    Tabs.prototype.getChildren = function () {
        var _this = this;
        for (var unassignedTabs = this.getTabsCount() - this.tabIds.length; unassignedTabs > 0; unassignedTabs--) {
            this.tabIds.push(generateTabId());
            this.panelIds.push(generatePanelId());
        }
        var childIndex = 0;
        return React.Children.map(this.props.children, function (child) {
            var result;
            // can be null if conditionally rendering TabList / TabPanel
            if (child == null) {
                return null;
            }
            if (childIndex === 0) {
                // clone TabList / Tab elements
                result = _this.cloneTabList(child);
            }
            else {
                var tabPanelIndex = childIndex - 1;
                var shouldRenderTabPanel = _this.state.selectedTabIndex === tabPanelIndex;
                result = shouldRenderTabPanel ? _this.cloneTabPanel(child, tabPanelIndex) : null;
            }
            childIndex++;
            return result;
        });
    };
    Tabs.prototype.cloneTabList = function (child) {
        var _this = this;
        var tabIndex = 0;
        var tabs = React.Children.map(child.props.children, function (tab) {
            // can be null if conditionally rendering Tab
            if (tab == null) {
                return null;
            }
            var clonedTab = React.cloneElement(tab, {
                id: _this.tabIds[tabIndex],
                isSelected: _this.state.selectedTabIndex === tabIndex,
                panelId: _this.panelIds[tabIndex],
                ref: "tabs-" + tabIndex,
            });
            tabIndex++;
            return clonedTab;
        });
        return React.cloneElement(child, {
            children: tabs,
            indicatorWrapperStyle: this.state.indicatorWrapperStyle,
            ref: "tablist",
        });
    };
    Tabs.prototype.cloneTabPanel = function (child, tabIndex) {
        return React.cloneElement(child, {
            id: this.panelIds[tabIndex],
            isSelected: this.state.selectedTabIndex === tabIndex,
            ref: "panels-" + tabIndex,
            tabId: this.tabIds[tabIndex],
        });
    };
    Tabs.prototype.focusTab = function (index) {
        var ref = "tabs-" + index;
        var tab = react_dom_1.findDOMNode(this.refs[ref]);
        tab.focus();
    };
    Tabs.prototype.getFocusedTabIndex = function () {
        var focusedElement = document.activeElement;
        if (focusedElement != null && focusedElement.classList.contains(Classes.TAB)) {
            var tabId = focusedElement.id;
            return this.tabIds.indexOf(tabId);
        }
        return -1;
    };
    Tabs.prototype.getTabs = function () {
        if (this.props.children == null) {
            return [];
        }
        var tabs = [];
        if (React.Children.count(this.props.children) > 0) {
            var firstChild = React.Children.toArray(this.props.children)[0];
            if (firstChild != null) {
                React.Children.forEach(firstChild.props.children, function (tabListChild) {
                    if (tabListChild.type === tab_1.Tab) {
                        tabs.push(tabListChild);
                    }
                });
            }
        }
        return tabs;
    };
    Tabs.prototype.getTabsCount = function () {
        return this.getTabs().length;
    };
    Tabs.prototype.getPanelsCount = function () {
        if (this.props.children == null) {
            return 0;
        }
        var index = 0;
        var panelCount = 0;
        React.Children.forEach(this.props.children, function (child) {
            if (child.type === tabPanel_1.TabPanel) {
                panelCount++;
            }
            index++;
        });
        return panelCount;
    };
    Tabs.prototype.getStateFromProps = function (props) {
        var selectedTabIndex = props.selectedTabIndex, initialSelectedTabIndex = props.initialSelectedTabIndex;
        if (this.isValidTabIndex(selectedTabIndex)) {
            return { selectedTabIndex: selectedTabIndex };
        }
        else if (this.isValidTabIndex(initialSelectedTabIndex) && this.state.selectedTabIndex == null) {
            return { selectedTabIndex: initialSelectedTabIndex };
        }
        else {
            return this.state;
        }
    };
    Tabs.prototype.isTabDisabled = function (index) {
        var tab = this.getTabs()[index];
        return tab != null && tab.props.isDisabled;
    };
    Tabs.prototype.isValidTabIndex = function (index) {
        return index != null && index >= 0 && index < this.getTabsCount();
    };
    /**
     * Updates the component's state if uncontrolled and calls onChange.
     */
    Tabs.prototype.setSelectedTabIndex = function (index) {
        if (index === this.state.selectedTabIndex || !this.isValidTabIndex(index)) {
            return;
        }
        var prevSelectedIndex = this.state.selectedTabIndex;
        if (this.props.selectedTabIndex == null) {
            this.setState({
                selectedTabIndex: index,
            });
        }
        if (Utils.isFunction(this.props.onChange)) {
            this.props.onChange(index, prevSelectedIndex);
        }
    };
    Tabs.defaultProps = {
        initialSelectedTabIndex: 0,
    };
    Tabs = __decorate([
        PureRender
    ], Tabs);
    return Tabs;
}(abstractComponent_1.AbstractComponent));
exports.Tabs = Tabs;
var tabCount = 0;
function generateTabId() {
    return "pt-tab-" + tabCount++;
}
var panelCount = 0;
function generatePanelId() {
    return "pt-tab-panel-" + panelCount++;
}
exports.TabsFactory = React.createFactory(Tabs);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFicy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLDBCQUE0QixXQUFXLENBQUMsQ0FBQTtBQUV4QyxrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksTUFBTSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDOUMsSUFBWSxJQUFJLFdBQU0sbUJBQW1CLENBQUMsQ0FBQTtBQUUxQyxJQUFZLEtBQUssV0FBTSxvQkFBb0IsQ0FBQyxDQUFBO0FBRTVDLG9CQUErQixPQUFPLENBQUMsQ0FBQTtBQUN2Qyx3QkFBdUMsV0FBVyxDQUFDLENBQUE7QUFDbkQseUJBQXlDLFlBQVksQ0FBQyxDQUFBO0FBc0N0RCxJQUFNLGdCQUFnQixHQUFHLGNBQWMsQ0FBQztBQUd4QztJQUEwQix3QkFBeUM7SUFZL0QsY0FBWSxLQUFrQixFQUFFLE9BQWE7UUFaakQsaUJBb1RDO1FBdlNPLGtCQUFNLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQVJuQixnQkFBVyxHQUFHLGdCQUFnQixDQUFDO1FBQ3RDLG9GQUFvRjtRQUM3RSxVQUFLLEdBQWUsRUFBRSxDQUFDO1FBRXRCLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFDeEIsV0FBTSxHQUFhLEVBQUUsQ0FBQztRQXdEdEIsZ0JBQVcsR0FBRyxVQUFDLENBQXVDO1lBQzFELEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUE7UUFFTyxtQkFBYyxHQUFHLFVBQUMsQ0FBc0M7WUFDNUQsSUFBTSxTQUFTLEdBQUksQ0FB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QUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7SUFDTCxDQUFDO0lBbFRhLGlCQUFZLEdBQWU7UUFDckMsdUJBQXVCLEVBQUUsQ0FBQztLQUM3QixDQUFDO0lBSk47UUFBQyxVQUFVO1lBQUE7SUFxVFgsV0FBQztBQUFELENBcFRBLEFBb1RDLENBcFR5QixxQ0FBaUIsR0FvVDFDO0FBcFRZLFlBQUksT0FvVGhCLENBQUE7QUFFRCxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakI7SUFDSSxNQUFNLENBQUMsWUFBVSxRQUFRLEVBQUksQ0FBQztBQUNsQyxDQUFDO0FBRUQsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ25CO0lBQ0ksTUFBTSxDQUFDLGtCQUFnQixVQUFVLEVBQUksQ0FBQztBQUMxQyxDQUFDO0FBRVksbUJBQVcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvdGFicy90YWJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE1IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBQdXJlUmVuZGVyIGZyb20gXCJwdXJlLXJlbmRlci1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vLi4vY29tbW9uL2Vycm9yc1wiO1xuaW1wb3J0ICogYXMgS2V5cyBmcm9tIFwiLi4vLi4vY29tbW9uL2tleXNcIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcbmltcG9ydCAqIGFzIFV0aWxzIGZyb20gXCIuLi8uLi9jb21tb24vdXRpbHNcIjtcblxuaW1wb3J0IHsgSVRhYlByb3BzLCBUYWIgfSBmcm9tIFwiLi90YWJcIjtcbmltcG9ydCB7IElUYWJMaXN0UHJvcHMsIFRhYkxpc3QgfSBmcm9tIFwiLi90YWJMaXN0XCI7XG5pbXBvcnQgeyBJVGFiUGFuZWxQcm9wcywgVGFiUGFuZWwgfSBmcm9tIFwiLi90YWJQYW5lbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUYWJzUHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleCBvZiB0aGUgaW5pdGlhbGx5IHNlbGVjdGVkIHRhYiB3aGVuIHRoaXMgY29tcG9uZW50IHJlbmRlcnMuXG4gICAgICogVGhpcyBwcm9wIGhhcyBubyBlZmZlY3QgaWYgYHNlbGVjdGVkVGFiSW5kZXhgIGlzIGFsc28gcHJvdmlkZWQuXG4gICAgICogQGRlZmF1bHQgMFxuICAgICAqL1xuICAgIGluaXRpYWxTZWxlY3RlZFRhYkluZGV4PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGluZGV4IG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgdGFiLlxuICAgICAqIFVzZSB0aGlzIHByb3AgaWYgeW91IHdhbnQgdG8gZXhwbGljaXRseSBjb250cm9sIHRoZSBjdXJyZW50bHkgZGlzcGxheWVkIHBhbmVsXG4gICAgICogeW91cnNlbGYgd2l0aCB0aGUgYG9uQ2hhbmdlYCBldmVudCBoYW5kbGVyLlxuICAgICAqIElmIHRoaXMgcHJvcCBpcyBsZWZ0IHVuZGVmaW5lZCwgdGhlIGNvbXBvbmVudCBjaGFuZ2VzIHRhYiBwYW5lbHMgYXV0b21hdGljYWxseVxuICAgICAqIHdoZW4gdGFicyBhcmUgY2xpY2tlZC5cbiAgICAgKi9cbiAgICBzZWxlY3RlZFRhYkluZGV4PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayBmdW5jdGlvbiB0aGF0IGlzIGludm9rZWQgd2hlbiB0YWJzIGluIHRoZSB0YWIgbGlzdCBhcmUgY2xpY2tlZC5cbiAgICAgKi9cbiAgICBvbkNoYW5nZT8oc2VsZWN0ZWRUYWJJbmRleDogbnVtYmVyLCBwcmV2U2VsZWN0ZWRUYWJJbmRleDogbnVtYmVyKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVGFic1N0YXRlIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbGlzdCBvZiBDU1MgcnVsZXMgdG8gdXNlIG9uIHRoZSBpbmRpY2F0b3Igd3JhcHBlciBvZiB0aGUgdGFiIGxpc3QuXG4gICAgICovXG4gICAgaW5kaWNhdG9yV3JhcHBlclN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleCBvZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHRhYi5cbiAgICAgKiBJZiBhIHByb3Agd2l0aCB0aGUgc2FtZSBuYW1lIGlzIHNldCwgdGhpcyBiaXQgb2Ygc3RhdGUgc2ltcGx5IGFsaWFzZXMgdGhlIHByb3AuXG4gICAgICovXG4gICAgc2VsZWN0ZWRUYWJJbmRleD86IG51bWJlcjtcbn1cblxuY29uc3QgVEFCX0NTU19TRUxFQ1RPUiA9IFwibGlbcm9sZT10YWJdXCI7XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgVGFicyBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElUYWJzUHJvcHMsIElUYWJzU3RhdGU+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSVRhYnNQcm9wcyA9IHtcbiAgICAgICAgaW5pdGlhbFNlbGVjdGVkVGFiSW5kZXg6IDAsXG4gICAgfTtcblxuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LlRhYnNcIjtcbiAgICAvLyBzdGF0ZSBpcyBpbml0aWFsaXplZCBpbiB0aGUgY29uc3RydWN0b3IgYnV0IGdldFN0YXRlRnJvbVByb3BzIG5lZWRzIHN0YXRlIGRlZmluZWRcbiAgICBwdWJsaWMgc3RhdGU6IElUYWJzU3RhdGUgPSB7fTtcblxuICAgIHByaXZhdGUgcGFuZWxJZHM6IHN0cmluZ1tdID0gW107XG4gICAgcHJpdmF0ZSB0YWJJZHM6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcz86IElUYWJzUHJvcHMsIGNvbnRleHQ/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLnN0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyh0aGlzLnByb3BzKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhDbGFzc2VzLlRBQlMsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrfVxuICAgICAgICAgICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlS2V5UHJlc3N9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMuZ2V0Q2hpbGRyZW4oKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzOiBJVGFic1Byb3BzKSB7XG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0gdGhpcy5nZXRTdGF0ZUZyb21Qcm9wcyhuZXdQcm9wcyk7XG4gICAgICAgIGNvbnN0IG5ld0luZGV4ID0gbmV3U3RhdGUuc2VsZWN0ZWRUYWJJbmRleDtcbiAgICAgICAgaWYgKG5ld0luZGV4ICE9PSB0aGlzLnN0YXRlLnNlbGVjdGVkVGFiSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRUYWJJbmRleChuZXdJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFRhYiA9IGZpbmRET01Ob2RlKHRoaXMucmVmc1tgdGFicy0ke3RoaXMuc3RhdGUuc2VsZWN0ZWRUYWJJbmRleH1gXSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2V0VGltZW91dCgoKSA9PiB0aGlzLm1vdmVJbmRpY2F0b3Ioc2VsZWN0ZWRUYWIpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKF86IElUYWJzUHJvcHMsIHByZXZTdGF0ZTogSVRhYnNTdGF0ZSkge1xuICAgICAgICBjb25zdCBuZXdJbmRleCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRUYWJJbmRleDtcbiAgICAgICAgaWYgKG5ld0luZGV4ICE9PSBwcmV2U3RhdGUuc2VsZWN0ZWRUYWJJbmRleCkge1xuICAgICAgICAgICAgY29uc3QgdGFiRWxlbWVudCA9IGZpbmRET01Ob2RlKHRoaXMucmVmc1tgdGFicy0ke25ld0luZGV4fWBdKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIC8vIG5lZWQgdG8gbWVhc3VyZSBvbiB0aGUgbmV4dCBmcmFtZSBpbiBjYXNlIHRoZSBUYWIgY2hpbGRyZW4gc2ltdWx0YW5lb3VzbHkgY2hhbmdlXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5tb3ZlSW5kaWNhdG9yKHRhYkVsZW1lbnQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB2YWxpZGF0ZVByb3BzKHByb3BzOiBJVGFic1Byb3BzICYge2NoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlfSkge1xuICAgICAgICBpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQocHJvcHMuY2hpbGRyZW4pID4gMCkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBSZWFjdC5DaGlsZHJlbi50b0FycmF5KHByb3BzLmNoaWxkcmVuKVswXSBhcyBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PjtcbiAgICAgICAgICAgIGlmIChjaGlsZCAhPSBudWxsICYmIGNoaWxkLnR5cGUgIT09IFRhYkxpc3QpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLlRBQlNfRklSU1RfQ0hJTEQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRUYWJzQ291bnQoKSAhPT0gdGhpcy5nZXRQYW5lbHNDb3VudCgpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVycm9ycy5UQUJTX01JU01BVENIKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xpY2sgPSAoZTogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlVGFiU2VsZWN0aW5nRXZlbnQoZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVLZXlQcmVzcyA9IChlOiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCBpbnNpZGVUYWIgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3QoYC4ke0NsYXNzZXMuVEFCfWApICE9IG51bGw7XG4gICAgICAgIGlmIChpbnNpZGVUYWIgJiYgKGUud2hpY2ggPT09IEtleXMuU1BBQ0UgfHwgZS53aGljaCA9PT0gS2V5cy5FTlRFUikpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVGFiU2VsZWN0aW5nRXZlbnQoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUtleURvd24gPSAoZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgICAgLy8gZG9uJ3Qgd2FudCB0byBoYW5kbGUga2V5RG93biBldmVudHMgaW5zaWRlIGEgdGFiIHBhbmVsXG4gICAgICAgIGNvbnN0IGluc2lkZVRhYkxpc3QgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3QoYC4ke0NsYXNzZXMuVEFCX0xJU1R9YCkgIT0gbnVsbDtcbiAgICAgICAgaWYgKCFpbnNpZGVUYWJMaXN0KSB7IHJldHVybjsgfVxuXG4gICAgICAgIGNvbnN0IGZvY3VzZWRUYWJJbmRleCA9IHRoaXMuZ2V0Rm9jdXNlZFRhYkluZGV4KCk7XG4gICAgICAgIGlmIChmb2N1c2VkVGFiSW5kZXggPT09IC0xKSB7IHJldHVybjsgfVxuXG4gICAgICAgIGlmIChlLndoaWNoID09PSBLZXlzLkFSUk9XX0xFRlQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gZmluZCBwcmV2aW91cyB0YWIgdGhhdCBpc24ndCBkaXNhYmxlZFxuICAgICAgICAgICAgbGV0IG5ld1RhYkluZGV4ID0gZm9jdXNlZFRhYkluZGV4IC0gMTtcbiAgICAgICAgICAgIGxldCB0YWJJc0Rpc2FibGVkID0gdGhpcy5pc1RhYkRpc2FibGVkKG5ld1RhYkluZGV4KTtcblxuICAgICAgICAgICAgd2hpbGUgKHRhYklzRGlzYWJsZWQgJiYgbmV3VGFiSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbmV3VGFiSW5kZXgtLTtcbiAgICAgICAgICAgICAgICB0YWJJc0Rpc2FibGVkID0gdGhpcy5pc1RhYkRpc2FibGVkKG5ld1RhYkluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1RhYkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNUYWIobmV3VGFiSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGUud2hpY2ggPT09IEtleXMuQVJST1dfUklHSFQpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gZmluZCBuZXh0IHRhYiB0aGF0IGlzbid0IGRpc2FibGVkXG4gICAgICAgICAgICBjb25zdCB0YWJzQ291bnQgPSB0aGlzLmdldFRhYnNDb3VudCgpO1xuXG4gICAgICAgICAgICBsZXQgbmV3VGFiSW5kZXggPSBmb2N1c2VkVGFiSW5kZXggKyAxO1xuICAgICAgICAgICAgbGV0IHRhYklzRGlzYWJsZWQgPSB0aGlzLmlzVGFiRGlzYWJsZWQobmV3VGFiSW5kZXgpO1xuXG4gICAgICAgICAgICB3aGlsZSAodGFiSXNEaXNhYmxlZCAmJiBuZXdUYWJJbmRleCAhPT0gdGFic0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbmV3VGFiSW5kZXgrKztcbiAgICAgICAgICAgICAgICB0YWJJc0Rpc2FibGVkID0gdGhpcy5pc1RhYkRpc2FibGVkKG5ld1RhYkluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1RhYkluZGV4ICE9PSB0YWJzQ291bnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzVGFiKG5ld1RhYkluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVGFiU2VsZWN0aW5nRXZlbnQgPSAoZTogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhYkVsZW1lbnQgPSAoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmNsb3Nlc3QoVEFCX0NTU19TRUxFQ1RPUikgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gc2VsZWN0IG9ubHkgaWYgVGFiIGlzIG9uZSBvZiB1cyBhbmQgaXMgZW5hYmxlZFxuICAgICAgICBpZiAodGFiRWxlbWVudCAhPSBudWxsXG4gICAgICAgICAgICAgICAgJiYgdGhpcy50YWJJZHMuaW5kZXhPZih0YWJFbGVtZW50LmlkKSA+PSAwXG4gICAgICAgICAgICAgICAgJiYgdGFiRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWRpc2FibGVkXCIpICE9PSBcInRydWVcIikge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0YWJFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlBbGwoVEFCX0NTU19TRUxFQ1RPUikuaW5kZXhPZih0YWJFbGVtZW50KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTZWxlY3RlZFRhYkluZGV4KGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGN1bGF0ZSB0aGUgbmV3IGhlaWdodCwgd2lkdGgsIGFuZCBwb3NpdGlvbiBvZiB0aGUgdGFiIGluZGljYXRvci5cbiAgICAgKiBTdG9yZSB0aGUgQ1NTIHZhbHVlcyBzbyB0aGUgdHJhbnNpdGlvbiBhbmltYXRpb24gY2FuIHN0YXJ0LlxuICAgICAqL1xuICAgIHByaXZhdGUgbW92ZUluZGljYXRvcih7IGNsaWVudEhlaWdodCwgY2xpZW50V2lkdGgsIG9mZnNldExlZnQsIG9mZnNldFRvcCB9OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbmRpY2F0b3JXcmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICAgICBoZWlnaHQ6IGNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtNYXRoLmZsb29yKG9mZnNldExlZnQpfXB4KSB0cmFuc2xhdGVZKCR7TWF0aC5mbG9vcihvZmZzZXRUb3ApfXB4KWAsXG4gICAgICAgICAgICB3aWR0aDogY2xpZW50V2lkdGgsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpbmRpY2F0b3JXcmFwcGVyU3R5bGUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW9zdCBvZiB0aGUgY29tcG9uZW50IGxvZ2ljIGxpdmVzIGhlcmUuIFdlIGNsb25lIHRoZSBjaGlsZHJlbiBwcm92aWRlZCBieSB0aGUgdXNlciB0byBzZXQgdXAgcmVmcyxcbiAgICAgKiBhY2Nlc3NpYmlsaXR5IGF0dHJpYnV0ZXMsIGFuZCBzZWxlY3Rpb24gcHJvcHMgY29ycmVjdGx5LlxuICAgICAqL1xuICAgIHByaXZhdGUgZ2V0Q2hpbGRyZW4oKSB7XG4gICAgICAgIGZvciAobGV0IHVuYXNzaWduZWRUYWJzID0gdGhpcy5nZXRUYWJzQ291bnQoKSAtIHRoaXMudGFiSWRzLmxlbmd0aDsgdW5hc3NpZ25lZFRhYnMgPiAwOyB1bmFzc2lnbmVkVGFicy0tKSB7XG4gICAgICAgICAgICB0aGlzLnRhYklkcy5wdXNoKGdlbmVyYXRlVGFiSWQoKSk7XG4gICAgICAgICAgICB0aGlzLnBhbmVsSWRzLnB1c2goZ2VuZXJhdGVQYW5lbElkKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNoaWxkSW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZDogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4pID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+O1xuXG4gICAgICAgICAgICAvLyBjYW4gYmUgbnVsbCBpZiBjb25kaXRpb25hbGx5IHJlbmRlcmluZyBUYWJMaXN0IC8gVGFiUGFuZWxcbiAgICAgICAgICAgIGlmIChjaGlsZCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjaGlsZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gY2xvbmUgVGFiTGlzdCAvIFRhYiBlbGVtZW50c1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuY2xvbmVUYWJMaXN0KGNoaWxkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiUGFuZWxJbmRleCA9IGNoaWxkSW5kZXggLSAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNob3VsZFJlbmRlclRhYlBhbmVsID0gdGhpcy5zdGF0ZS5zZWxlY3RlZFRhYkluZGV4ID09PSB0YWJQYW5lbEluZGV4O1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHNob3VsZFJlbmRlclRhYlBhbmVsID8gdGhpcy5jbG9uZVRhYlBhbmVsKGNoaWxkLCB0YWJQYW5lbEluZGV4KSA6IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaWxkSW5kZXgrKztcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvbmVUYWJMaXN0KGNoaWxkOiBSZWFjdC5SZWFjdEVsZW1lbnQ8SVRhYkxpc3RQcm9wcyAmIHtjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZX0+KSB7XG4gICAgICAgIGxldCB0YWJJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IHRhYnMgPSBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGQucHJvcHMuY2hpbGRyZW4sICh0YWI6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICAvLyBjYW4gYmUgbnVsbCBpZiBjb25kaXRpb25hbGx5IHJlbmRlcmluZyBUYWJcbiAgICAgICAgICAgIGlmICh0YWIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjbG9uZWRUYWIgPSBSZWFjdC5jbG9uZUVsZW1lbnQodGFiLCB7XG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMudGFiSWRzW3RhYkluZGV4XSxcbiAgICAgICAgICAgICAgICBpc1NlbGVjdGVkOiB0aGlzLnN0YXRlLnNlbGVjdGVkVGFiSW5kZXggPT09IHRhYkluZGV4LFxuICAgICAgICAgICAgICAgIHBhbmVsSWQ6IHRoaXMucGFuZWxJZHNbdGFiSW5kZXhdLFxuICAgICAgICAgICAgICAgIHJlZjogYHRhYnMtJHt0YWJJbmRleH1gLFxuICAgICAgICAgICAgfSBhcyBJVGFiUHJvcHMpO1xuICAgICAgICAgICAgdGFiSW5kZXgrKztcbiAgICAgICAgICAgIHJldHVybiBjbG9uZWRUYWI7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICBjaGlsZHJlbjogdGFicyxcbiAgICAgICAgICAgIGluZGljYXRvcldyYXBwZXJTdHlsZTogdGhpcy5zdGF0ZS5pbmRpY2F0b3JXcmFwcGVyU3R5bGUsXG4gICAgICAgICAgICByZWY6IFwidGFibGlzdFwiLFxuICAgICAgICB9IGFzIElUYWJMaXN0UHJvcHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2xvbmVUYWJQYW5lbChjaGlsZDogUmVhY3QuUmVhY3RFbGVtZW50PGFueT4sIHRhYkluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xuICAgICAgICAgICAgaWQ6IHRoaXMucGFuZWxJZHNbdGFiSW5kZXhdLFxuICAgICAgICAgICAgaXNTZWxlY3RlZDogdGhpcy5zdGF0ZS5zZWxlY3RlZFRhYkluZGV4ID09PSB0YWJJbmRleCxcbiAgICAgICAgICAgIHJlZjogYHBhbmVscy0ke3RhYkluZGV4fWAsXG4gICAgICAgICAgICB0YWJJZDogdGhpcy50YWJJZHNbdGFiSW5kZXhdLFxuICAgICAgICB9IGFzIElUYWJQYW5lbFByb3BzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzVGFiKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgcmVmID0gYHRhYnMtJHtpbmRleH1gO1xuICAgICAgICBjb25zdCB0YWIgPSBmaW5kRE9NTm9kZSh0aGlzLnJlZnNbcmVmXSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRhYi5mb2N1cygpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9jdXNlZFRhYkluZGV4KCkge1xuICAgICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmIChmb2N1c2VkRWxlbWVudCAhPSBudWxsICYmIGZvY3VzZWRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc2VzLlRBQikpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYklkID0gZm9jdXNlZEVsZW1lbnQuaWQ7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50YWJJZHMuaW5kZXhPZih0YWJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0VGFicygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICAgIGxldCB0YWJzOiBBcnJheTxSZWFjdC5SZWFjdEVsZW1lbnQ8SVRhYlByb3BzPj4gPSBbXTtcbiAgICAgICAgaWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RDaGlsZCA9IFJlYWN0LkNoaWxkcmVuLnRvQXJyYXkodGhpcy5wcm9wcy5jaGlsZHJlbilbMF0gYXMgUmVhY3QuUmVhY3RFbGVtZW50PGFueT47XG4gICAgICAgICAgICBpZiAoZmlyc3RDaGlsZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaChmaXJzdENoaWxkLnByb3BzLmNoaWxkcmVuLCAodGFiTGlzdENoaWxkOiBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFiTGlzdENoaWxkLnR5cGUgPT09IFRhYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFicy5wdXNoKHRhYkxpc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFicztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFRhYnNDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGFicygpLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBhbmVsc0NvdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGxldCBwYW5lbENvdW50ID0gMDtcbiAgICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQ6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gVGFiUGFuZWwpIHtcbiAgICAgICAgICAgICAgICBwYW5lbENvdW50Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcGFuZWxDb3VudDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFN0YXRlRnJvbVByb3BzKHByb3BzOiBJVGFic1Byb3BzKTogSVRhYnNTdGF0ZSB7XG4gICAgICAgIGNvbnN0IHsgc2VsZWN0ZWRUYWJJbmRleCwgaW5pdGlhbFNlbGVjdGVkVGFiSW5kZXggfSA9IHByb3BzO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRUYWJJbmRleChzZWxlY3RlZFRhYkluZGV4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc2VsZWN0ZWRUYWJJbmRleCB9O1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNWYWxpZFRhYkluZGV4KGluaXRpYWxTZWxlY3RlZFRhYkluZGV4KSAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkVGFiSW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgc2VsZWN0ZWRUYWJJbmRleDogaW5pdGlhbFNlbGVjdGVkVGFiSW5kZXggfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1RhYkRpc2FibGVkKGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgdGFiID0gdGhpcy5nZXRUYWJzKClbaW5kZXhdO1xuICAgICAgICByZXR1cm4gdGFiICE9IG51bGwgJiYgdGFiLnByb3BzLmlzRGlzYWJsZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1ZhbGlkVGFiSW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gaW5kZXggIT0gbnVsbCAmJiBpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5nZXRUYWJzQ291bnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBjb21wb25lbnQncyBzdGF0ZSBpZiB1bmNvbnRyb2xsZWQgYW5kIGNhbGxzIG9uQ2hhbmdlLlxuICAgICAqL1xuICAgIHByaXZhdGUgc2V0U2VsZWN0ZWRUYWJJbmRleChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZFRhYkluZGV4IHx8ICF0aGlzLmlzVmFsaWRUYWJJbmRleChpbmRleCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHByZXZTZWxlY3RlZEluZGV4ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZFRhYkluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbGVjdGVkVGFiSW5kZXggPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUYWJJbmRleDogaW5kZXgsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChVdGlscy5pc0Z1bmN0aW9uKHRoaXMucHJvcHMub25DaGFuZ2UpKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGluZGV4LCBwcmV2U2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmxldCB0YWJDb3VudCA9IDA7XG5mdW5jdGlvbiBnZW5lcmF0ZVRhYklkKCkge1xuICAgIHJldHVybiBgcHQtdGFiLSR7dGFiQ291bnQrK31gO1xufVxuXG5sZXQgcGFuZWxDb3VudCA9IDA7XG5mdW5jdGlvbiBnZW5lcmF0ZVBhbmVsSWQoKSB7XG4gICAgcmV0dXJuIGBwdC10YWItcGFuZWwtJHtwYW5lbENvdW50Kyt9YDtcbn1cblxuZXhwb3J0IGNvbnN0IFRhYnNGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShUYWJzKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
