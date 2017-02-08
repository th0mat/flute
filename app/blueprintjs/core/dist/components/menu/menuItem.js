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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var classNames = require("classnames");
var React = require("react");
var ReactDOM = require("react-dom");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var position_1 = require("../../common/position");
var popover_1 = require("../popover/popover");
var menu_1 = require("./menu");
var REACT_CONTEXT_TYPES = { alignLeft: React.PropTypes.bool };
var MenuItem = (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            alignLeft: false,
        };
        this.liRefHandler = function (r) { return _this.liElement = r; };
        this.measureSubmenu = function (el) {
            if (el != null) {
                var submenuRect = ReactDOM.findDOMNode(el).getBoundingClientRect();
                var parentWidth = _this.liElement.parentElement.getBoundingClientRect().width;
                var adjustmentWidth = submenuRect.width + parentWidth;
                // this ensures that the left and right measurements represent a submenu opened to the right
                var submenuLeft = submenuRect.left;
                var submenuRight = submenuRect.right;
                if (_this.state.alignLeft) {
                    submenuLeft += adjustmentWidth;
                    submenuRight += adjustmentWidth;
                }
                var _a = _this.props.submenuViewportMargin, _b = _a.left, left = _b === void 0 ? 0 : _b, _c = _a.right, right = _c === void 0 ? 0 : _c;
                if (typeof document !== "undefined"
                    && typeof document.documentElement !== "undefined"
                    && Number(document.documentElement.clientWidth)) {
                    // we're in a browser context and the clientWidth is available,
                    // use it to set calculate 'right'
                    right = document.documentElement.clientWidth - right;
                }
                // uses context to prioritize the previous positioning
                var alignLeft = _this.context.alignLeft || false;
                if (alignLeft) {
                    if ((submenuLeft - adjustmentWidth) <= left) {
                        alignLeft = false;
                    }
                }
                else {
                    if (submenuRight >= right) {
                        alignLeft = true;
                    }
                }
                _this.setState({ alignLeft: alignLeft });
            }
        };
        this.renderChildren = function () {
            var _a = _this.props, children = _a.children, submenu = _a.submenu;
            if (children != null) {
                var childProps_1 = _this.cascadeProps();
                if (Object.keys(childProps_1).length !== 0) {
                    children = React.Children.map(children, function (child) {
                        return React.cloneElement(child, childProps_1);
                    });
                }
            }
            else if (submenu != null) {
                children = submenu.map(_this.cascadeProps).map(renderMenuItem);
            }
            return children;
        };
        /**
         * Evalutes this.props and cascades prop values into new props when:
         * - submenuViewportMargin is defined, but is undefined for the supplied input.
         * - useSmartPositioning is false, but is undefined for the supplied input.
         * @param {IMenuItemProps} newProps If supplied, object will be modified, otherwise, defaults to an empty object.
         * @returns An object to be used as child props.
         */
        this.cascadeProps = function (newProps) {
            if (newProps === void 0) { newProps = {}; }
            var _a = _this.props, submenuViewportMargin = _a.submenuViewportMargin, useSmartPositioning = _a.useSmartPositioning;
            if (submenuViewportMargin != null && newProps.submenuViewportMargin == null) {
                newProps.submenuViewportMargin = submenuViewportMargin;
            }
            if (useSmartPositioning === false && newProps.useSmartPositioning == null) {
                newProps.useSmartPositioning = useSmartPositioning;
            }
            return newProps;
        };
    }
    MenuItem.prototype.render = function () {
        var _a = this.props, children = _a.children, label = _a.label, submenu = _a.submenu;
        var hasSubmenu = children != null || submenu != null;
        var liClasses = classNames((_b = {},
            _b[Classes.MENU_SUBMENU] = hasSubmenu,
            _b
        ));
        var anchorClasses = classNames(Classes.MENU_ITEM, Classes.intentClass(this.props.intent), (_c = {},
            _c[Classes.DISABLED] = this.props.disabled,
            // prevent popover from closing when clicking on submenu trigger or disabled item
            _c[Classes.POPOVER_DISMISS] = this.props.shouldDismissPopover && !this.props.disabled && !hasSubmenu,
            _c
        ), Classes.iconClass(this.props.iconName), this.props.className);
        var labelElement;
        if (label != null) {
            labelElement = React.createElement("span", {className: "pt-menu-item-label"}, label);
        }
        var content = (React.createElement("a", {className: anchorClasses, href: this.props.href, onClick: this.props.disabled ? null : this.props.onClick, tabIndex: this.props.disabled ? -1 : 0, target: this.props.target}, 
            labelElement, 
            this.props.text));
        if (hasSubmenu) {
            var measureSubmenu = (this.props.useSmartPositioning) ? this.measureSubmenu : null;
            var submenuElement = React.createElement(menu_1.Menu, {ref: measureSubmenu}, this.renderChildren());
            var popoverClasses = classNames((_d = {},
                _d[Classes.ALIGN_LEFT] = this.state.alignLeft,
                _d
            ));
            content = (React.createElement(popover_1.Popover, {content: submenuElement, enforceFocus: false, hoverCloseDelay: 0, inline: true, interactionKind: popover_1.PopoverInteractionKind.HOVER, position: this.state.alignLeft ? position_1.Position.LEFT_TOP : position_1.Position.RIGHT_TOP, popoverClassName: classNames(Classes.MINIMAL, Classes.MENU_SUBMENU, popoverClasses), useSmartArrowPositioning: false}, content));
        }
        return (React.createElement("li", {className: liClasses, ref: this.liRefHandler}, content));
        var _b, _c, _d;
    };
    MenuItem.prototype.getChildContext = function () {
        return { alignLeft: this.state.alignLeft };
    };
    MenuItem.prototype.validateProps = function (props) {
        if (props.children != null && props.submenu != null) {
            throw new Error(Errors.MENU_CHILDREN_SUBMENU_MUTEX);
        }
    };
    MenuItem.defaultProps = {
        disabled: false,
        shouldDismissPopover: true,
        submenuViewportMargin: {},
        text: "",
        useSmartPositioning: true,
    };
    MenuItem.displayName = "Blueprint.MenuItem";
    MenuItem.contextTypes = REACT_CONTEXT_TYPES;
    MenuItem.childContextTypes = REACT_CONTEXT_TYPES;
    return MenuItem;
}(abstractComponent_1.AbstractComponent));
exports.MenuItem = MenuItem;
function renderMenuItem(props, key) {
    return React.createElement(MenuItem, __assign({key: key}, props));
}
exports.renderMenuItem = renderMenuItem;
exports.MenuItemFactory = React.createFactory(MenuItem);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL21lbnUvbWVudUl0ZW0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUMvQixJQUFZLFFBQVEsV0FBTSxXQUFXLENBQUMsQ0FBQTtBQUV0QyxrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksTUFBTSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDOUMseUJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFFakQsd0JBQWdELG9CQUFvQixDQUFDLENBQUE7QUFDckUscUJBQXFCLFFBQVEsQ0FBQyxDQUFBO0FBaUQ5QixJQUFNLG1CQUFtQixHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFaEU7SUFBOEIsNEJBQWlEO0lBQS9FO1FBQUEsaUJBd0tDO1FBeEs2Qiw4QkFBaUQ7UUFjcEUsVUFBSyxHQUFtQjtZQUMzQixTQUFTLEVBQUUsS0FBSztTQUNuQixDQUFDO1FBNkVNLGlCQUFZLEdBQUcsVUFBQyxDQUFjLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQztRQUV0RCxtQkFBYyxHQUFHLFVBQUMsRUFBUTtZQUM5QixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQ3JFLElBQU0sV0FBVyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDO2dC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SUFDeEUsMEJBQWlCLEdBQXdDLG1CQUFtQixDQUFDO0lBNkovRixlQUFDO0FBQUQsQ0F4S0EsQUF3S0MsQ0F4SzZCLHFDQUFpQixHQXdLOUM7QUF4S1ksZ0JBQVEsV0F3S3BCLENBQUE7QUFFRCx3QkFBK0IsS0FBcUIsRUFBRSxHQUFvQjtJQUN0RSxNQUFNLENBQUMsb0JBQUMsUUFBUSxZQUFDLEdBQUcsRUFBRSxHQUFJLEdBQUssS0FBSyxFQUFJLENBQUM7QUFDN0MsQ0FBQztBQUZlLHNCQUFjLGlCQUU3QixDQUFBO0FBRVksdUJBQWUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvbWVudS9tZW51SXRlbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vLi4vY29tbW9uL2Vycm9yc1wiO1xuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Bvc2l0aW9uXCI7XG5pbXBvcnQgeyBJQWN0aW9uUHJvcHMsIElMaW5rUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5pbXBvcnQgeyBQb3BvdmVyLCBQb3BvdmVySW50ZXJhY3Rpb25LaW5kIH0gZnJvbSBcIi4uL3BvcG92ZXIvcG9wb3ZlclwiO1xuaW1wb3J0IHsgTWVudSB9IGZyb20gXCIuL21lbnVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJTWVudUl0ZW1Qcm9wcyBleHRlbmRzIElBY3Rpb25Qcm9wcywgSUxpbmtQcm9wcyB7XG4gICAgLy8gb3ZlcnJpZGUgZnJvbSBJQWN0aW9uUHJvcHMgdG8gbWFrZSBpdCByZXF1aXJlZFxuICAgIC8qKiBJdGVtIHRleHQsIHJlcXVpcmVkIGZvciB1c2FiaWxpdHkuICovXG4gICAgdGV4dDogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogUmlnaHQtYWxpZ25lZCBsYWJlbCBjb250ZW50LCB1c2VmdWwgZm9yIGhvdGtleXMuXG4gICAgICovXG4gICAgbGFiZWw/OiBzdHJpbmcgfCBKU1guRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgYW4gZW5hYmxlZCwgbm9uLXN1Ym1lbnUgaXRlbSBzaG91bGQgYXV0b21hdGljYWxseSBjbG9zZSB0aGVcbiAgICAgKiBwb3BvdmVyIGl0IGlzIG5lc3RlZCB3aXRoaW4gd2hlbiBjbGlja2VkLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBzaG91bGREaXNtaXNzUG9wb3Zlcj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBwcm9wcyBvYmplY3RzIGZvciBzdWJtZW51IGl0ZW1zLlxuICAgICAqIEFuIGFsdGVybmF0aXZlIHRvIHByb3ZpZGluZyBgTWVudUl0ZW1gIGNvbXBvbmVudHMgYXMgYGNoaWxkcmVuYC5cbiAgICAgKi9cbiAgICBzdWJtZW51PzogSU1lbnVJdGVtUHJvcHNbXTtcblxuICAgIC8qKlxuICAgICAqIFdpZHRoIG9mIFwibWFyZ2luXCIgZnJvbSBsZWZ0IG9yIHJpZ2h0IGVkZ2Ugb2Ygdmlld3BvcnQuIFN1Ym1lbnVzIHdpbGxcbiAgICAgKiBmbGlwIHRvIHRoZSBvdGhlciBzaWRlIGlmIHRoZXkgY29tZSB3aXRoaW4gdGhpcyBkaXN0YW5jZSBvZiB0aGF0IGVkZ2UuXG4gICAgICogVGhpcyBoYXMgbm8gZWZmZWN0IGlmIG9taXR0ZWQgb3IgaWYgYHVzZVNtYXJ0UG9zaXRpb25pbmc9e2ZhbHNlfWAuXG4gICAgICogTm90ZSB0aGF0IHRoZXNlIHZhbHVlcyBhcmUgbm90IENTUyBwcm9wZXJ0aWVzOyB0aGV5IGFyZSB1c2VkIGluXG4gICAgICogaW50ZXJuYWwgbWF0aCB0byBkZXRlcm1pbmUgd2hlbiB0byBmbGlwIHNpZGVzLlxuICAgICAqL1xuICAgIHN1Ym1lbnVWaWV3cG9ydE1hcmdpbj86IHsgbGVmdD86IG51bWJlciwgcmlnaHQ/OiBudW1iZXIgfTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgYSBzdWJtZW51IHBvcG92ZXIgd2lsbCB0cnkgdG8gcmVwb3NpdGlvbiBpdHNlbGZcbiAgICAgKiBpZiB0aGVyZSBpc24ndCByb29tIGZvciBpdCBpbiBpdHMgY3VycmVudCBwb3NpdGlvbi5cbiAgICAgKiBUaGUgcG9wb3ZlciBvcGVucyByaWdodCBieSBkZWZhdWx0LCBidXQgd2lsbCB0cnkgdG8gZmxpcFxuICAgICAqIGxlZnQgaWYgbm90IGVub3VnaCBzcGFjZS5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgdXNlU21hcnRQb3NpdGlvbmluZz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lbnVJdGVtU3RhdGUge1xuICAgIC8qKiBXaGV0aGVyIGEgc3VibWVudSBpcyBvcGVuZWQgdG8gdGhlIGxlZnQgKi9cbiAgICBhbGlnbkxlZnQ/OiBib29sZWFuO1xufVxuXG5jb25zdCBSRUFDVF9DT05URVhUX1RZUEVTID0geyBhbGlnbkxlZnQ6IFJlYWN0LlByb3BUeXBlcy5ib29sIH07XG5cbmV4cG9ydCBjbGFzcyBNZW51SXRlbSBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElNZW51SXRlbVByb3BzLCBJTWVudUl0ZW1TdGF0ZT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzOiBJTWVudUl0ZW1Qcm9wcyA9IHtcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzaG91bGREaXNtaXNzUG9wb3ZlcjogdHJ1ZSxcbiAgICAgICAgc3VibWVudVZpZXdwb3J0TWFyZ2luOiB7fSxcbiAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgdXNlU21hcnRQb3NpdGlvbmluZzogdHJ1ZSxcbiAgICB9O1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5NZW51SXRlbVwiO1xuXG4gICAgcHVibGljIHN0YXRpYyBjb250ZXh0VHlwZXM6IFJlYWN0LlZhbGlkYXRpb25NYXA8SU1lbnVJdGVtU3RhdGU+ID0gUkVBQ1RfQ09OVEVYVF9UWVBFUztcbiAgICBwdWJsaWMgc3RhdGljIGNoaWxkQ29udGV4dFR5cGVzOiBSZWFjdC5WYWxpZGF0aW9uTWFwPElNZW51SXRlbVN0YXRlPiA9IFJFQUNUX0NPTlRFWFRfVFlQRVM7XG4gICAgcHVibGljIGNvbnRleHQ6IElNZW51SXRlbVN0YXRlO1xuXG4gICAgcHVibGljIHN0YXRlOiBJTWVudUl0ZW1TdGF0ZSA9IHtcbiAgICAgICAgYWxpZ25MZWZ0OiBmYWxzZSxcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBsaUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgbGFiZWwsIHN1Ym1lbnUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGhhc1N1Ym1lbnUgPSBjaGlsZHJlbiAhPSBudWxsIHx8IHN1Ym1lbnUgIT0gbnVsbDtcbiAgICAgICAgY29uc3QgbGlDbGFzc2VzID0gY2xhc3NOYW1lcyh7XG4gICAgICAgICAgICBbQ2xhc3Nlcy5NRU5VX1NVQk1FTlVdOiBoYXNTdWJtZW51LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYW5jaG9yQ2xhc3NlcyA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5NRU5VX0lURU0sIENsYXNzZXMuaW50ZW50Q2xhc3ModGhpcy5wcm9wcy5pbnRlbnQpLCB7XG4gICAgICAgICAgICBbQ2xhc3Nlcy5ESVNBQkxFRF06IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICAgICAgICAvLyBwcmV2ZW50IHBvcG92ZXIgZnJvbSBjbG9zaW5nIHdoZW4gY2xpY2tpbmcgb24gc3VibWVudSB0cmlnZ2VyIG9yIGRpc2FibGVkIGl0ZW1cbiAgICAgICAgICAgIFtDbGFzc2VzLlBPUE9WRVJfRElTTUlTU106IHRoaXMucHJvcHMuc2hvdWxkRGlzbWlzc1BvcG92ZXIgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQgJiYgIWhhc1N1Ym1lbnUsXG4gICAgICAgIH0sIENsYXNzZXMuaWNvbkNsYXNzKHRoaXMucHJvcHMuaWNvbk5hbWUpLCB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XG5cbiAgICAgICAgbGV0IGxhYmVsRWxlbWVudDogSlNYLkVsZW1lbnQ7XG4gICAgICAgIGlmIChsYWJlbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBsYWJlbEVsZW1lbnQgPSA8c3BhbiBjbGFzc05hbWU9XCJwdC1tZW51LWl0ZW0tbGFiZWxcIj57bGFiZWx9PC9zcGFuPjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjb250ZW50ID0gKFxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2FuY2hvckNsYXNzZXN9XG4gICAgICAgICAgICAgICAgaHJlZj17dGhpcy5wcm9wcy5ocmVmfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMuZGlzYWJsZWQgPyBudWxsIDogdGhpcy5wcm9wcy5vbkNsaWNrfVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLnByb3BzLmRpc2FibGVkID8gLTEgOiAwfVxuICAgICAgICAgICAgICAgIHRhcmdldD17dGhpcy5wcm9wcy50YXJnZXR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2xhYmVsRWxlbWVudH1cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy50ZXh0fVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChoYXNTdWJtZW51KSB7XG4gICAgICAgICAgICBjb25zdCBtZWFzdXJlU3VibWVudSA9ICh0aGlzLnByb3BzLnVzZVNtYXJ0UG9zaXRpb25pbmcpID8gdGhpcy5tZWFzdXJlU3VibWVudSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBzdWJtZW51RWxlbWVudCA9IDxNZW51IHJlZj17bWVhc3VyZVN1Ym1lbnV9Pnt0aGlzLnJlbmRlckNoaWxkcmVuKCl9PC9NZW51PjtcbiAgICAgICAgICAgIGNvbnN0IHBvcG92ZXJDbGFzc2VzID0gY2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAgICAgW0NsYXNzZXMuQUxJR05fTEVGVF06IHRoaXMuc3RhdGUuYWxpZ25MZWZ0LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSAoXG4gICAgICAgICAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudD17c3VibWVudUVsZW1lbnR9XG4gICAgICAgICAgICAgICAgICAgIGVuZm9yY2VGb2N1cz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgIGhvdmVyQ2xvc2VEZWxheT17MH1cbiAgICAgICAgICAgICAgICAgICAgaW5saW5lPXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBpbnRlcmFjdGlvbktpbmQ9e1BvcG92ZXJJbnRlcmFjdGlvbktpbmQuSE9WRVJ9XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uPXt0aGlzLnN0YXRlLmFsaWduTGVmdCA/IFBvc2l0aW9uLkxFRlRfVE9QIDogUG9zaXRpb24uUklHSFRfVE9QfVxuICAgICAgICAgICAgICAgICAgICBwb3BvdmVyQ2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuTUlOSU1BTCwgQ2xhc3Nlcy5NRU5VX1NVQk1FTlUsIHBvcG92ZXJDbGFzc2VzKX1cbiAgICAgICAgICAgICAgICAgICAgdXNlU21hcnRBcnJvd1Bvc2l0aW9uaW5nPXtmYWxzZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvUG9wb3Zlcj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtsaUNsYXNzZXN9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLmxpUmVmSGFuZGxlcn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldENoaWxkQ29udGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHsgYWxpZ25MZWZ0OiB0aGlzLnN0YXRlLmFsaWduTGVmdCB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB2YWxpZGF0ZVByb3BzKHByb3BzOiBJTWVudUl0ZW1Qcm9wcyAmIHtjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZX0pIHtcbiAgICAgICAgaWYgKHByb3BzLmNoaWxkcmVuICE9IG51bGwgJiYgcHJvcHMuc3VibWVudSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLk1FTlVfQ0hJTERSRU5fU1VCTUVOVV9NVVRFWCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGxpUmVmSGFuZGxlciA9IChyOiBIVE1MRWxlbWVudCkgPT4gdGhpcy5saUVsZW1lbnQgPSByO1xuXG4gICAgcHJpdmF0ZSBtZWFzdXJlU3VibWVudSA9IChlbDogTWVudSkgPT4ge1xuICAgICAgICBpZiAoZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3Qgc3VibWVudVJlY3QgPSBSZWFjdERPTS5maW5kRE9NTm9kZShlbCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRXaWR0aCA9IHRoaXMubGlFbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgICAgICBjb25zdCBhZGp1c3RtZW50V2lkdGggPSBzdWJtZW51UmVjdC53aWR0aCArIHBhcmVudFdpZHRoO1xuXG4gICAgICAgICAgICAvLyB0aGlzIGVuc3VyZXMgdGhhdCB0aGUgbGVmdCBhbmQgcmlnaHQgbWVhc3VyZW1lbnRzIHJlcHJlc2VudCBhIHN1Ym1lbnUgb3BlbmVkIHRvIHRoZSByaWdodFxuICAgICAgICAgICAgbGV0IHN1Ym1lbnVMZWZ0ID0gc3VibWVudVJlY3QubGVmdDtcbiAgICAgICAgICAgIGxldCBzdWJtZW51UmlnaHQgPSBzdWJtZW51UmVjdC5yaWdodDtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmFsaWduTGVmdCkge1xuICAgICAgICAgICAgICAgIHN1Ym1lbnVMZWZ0ICs9IGFkanVzdG1lbnRXaWR0aDtcbiAgICAgICAgICAgICAgICBzdWJtZW51UmlnaHQgKz0gYWRqdXN0bWVudFdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgeyBsZWZ0ID0gMCwgcmlnaHQgPSAwIH0gPSB0aGlzLnByb3BzLnN1Ym1lbnVWaWV3cG9ydE1hcmdpbjtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICAgICAgICAgJiYgTnVtYmVyKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSdyZSBpbiBhIGJyb3dzZXIgY29udGV4dCBhbmQgdGhlIGNsaWVudFdpZHRoIGlzIGF2YWlsYWJsZSxcbiAgICAgICAgICAgICAgICAvLyB1c2UgaXQgdG8gc2V0IGNhbGN1bGF0ZSAncmlnaHQnXG4gICAgICAgICAgICAgICAgcmlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSByaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHVzZXMgY29udGV4dCB0byBwcmlvcml0aXplIHRoZSBwcmV2aW91cyBwb3NpdGlvbmluZ1xuICAgICAgICAgICAgbGV0IGFsaWduTGVmdCA9IHRoaXMuY29udGV4dC5hbGlnbkxlZnQgfHwgZmFsc2U7XG4gICAgICAgICAgICBpZiAoYWxpZ25MZWZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKChzdWJtZW51TGVmdCAtIGFkanVzdG1lbnRXaWR0aCkgPD0gbGVmdCkge1xuICAgICAgICAgICAgICAgICAgICBhbGlnbkxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzdWJtZW51UmlnaHQgPj0gcmlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25MZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYWxpZ25MZWZ0IH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJDaGlsZHJlbiA9ICgpID0+IHtcbiAgICAgICAgbGV0IHsgY2hpbGRyZW4sIHN1Ym1lbnUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaWYgKGNoaWxkcmVuICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkUHJvcHMgPSB0aGlzLmNhc2NhZGVQcm9wcygpO1xuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGNoaWxkUHJvcHMpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQ6IEpTWC5FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIGNoaWxkUHJvcHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN1Ym1lbnUgIT0gbnVsbCkge1xuICAgICAgICAgICAgY2hpbGRyZW4gPSBzdWJtZW51Lm1hcCh0aGlzLmNhc2NhZGVQcm9wcykubWFwKHJlbmRlck1lbnVJdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFdmFsdXRlcyB0aGlzLnByb3BzIGFuZCBjYXNjYWRlcyBwcm9wIHZhbHVlcyBpbnRvIG5ldyBwcm9wcyB3aGVuOlxuICAgICAqIC0gc3VibWVudVZpZXdwb3J0TWFyZ2luIGlzIGRlZmluZWQsIGJ1dCBpcyB1bmRlZmluZWQgZm9yIHRoZSBzdXBwbGllZCBpbnB1dC5cbiAgICAgKiAtIHVzZVNtYXJ0UG9zaXRpb25pbmcgaXMgZmFsc2UsIGJ1dCBpcyB1bmRlZmluZWQgZm9yIHRoZSBzdXBwbGllZCBpbnB1dC5cbiAgICAgKiBAcGFyYW0ge0lNZW51SXRlbVByb3BzfSBuZXdQcm9wcyBJZiBzdXBwbGllZCwgb2JqZWN0IHdpbGwgYmUgbW9kaWZpZWQsIG90aGVyd2lzZSwgZGVmYXVsdHMgdG8gYW4gZW1wdHkgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIEFuIG9iamVjdCB0byBiZSB1c2VkIGFzIGNoaWxkIHByb3BzLlxuICAgICAqL1xuICAgIHByaXZhdGUgY2FzY2FkZVByb3BzID0gKG5ld1Byb3BzOiBJTWVudUl0ZW1Qcm9wcyA9IHt9IGFzIElNZW51SXRlbVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgc3VibWVudVZpZXdwb3J0TWFyZ2luLCB1c2VTbWFydFBvc2l0aW9uaW5nIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIGlmIChzdWJtZW51Vmlld3BvcnRNYXJnaW4gIT0gbnVsbCAmJiBuZXdQcm9wcy5zdWJtZW51Vmlld3BvcnRNYXJnaW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3UHJvcHMuc3VibWVudVZpZXdwb3J0TWFyZ2luID0gc3VibWVudVZpZXdwb3J0TWFyZ2luO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VTbWFydFBvc2l0aW9uaW5nID09PSBmYWxzZSAmJiBuZXdQcm9wcy51c2VTbWFydFBvc2l0aW9uaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgIG5ld1Byb3BzLnVzZVNtYXJ0UG9zaXRpb25pbmcgPSB1c2VTbWFydFBvc2l0aW9uaW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ld1Byb3BzO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlck1lbnVJdGVtKHByb3BzOiBJTWVudUl0ZW1Qcm9wcywga2V5OiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICByZXR1cm4gPE1lbnVJdGVtIGtleT17a2V5fSB7Li4ucHJvcHN9IC8+O1xufVxuXG5leHBvcnQgY29uc3QgTWVudUl0ZW1GYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShNZW51SXRlbSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
