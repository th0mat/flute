/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
// HACKHACK: these components should go in separate files
// tslint:disable max-classes-per-file
var classNames = require("classnames");
var React = require("react");
var Classes = require("../../common/classes");
var props_1 = require("../../common/props");
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype.render = function () {
        var _a = this.props, children = _a.children, disabled = _a.disabled, elementRef = _a.elementRef, onClick = _a.onClick, rightIconName = _a.rightIconName, text = _a.text;
        return (React.createElement("button", __assign({type: "button"}, props_1.removeNonHTMLProps(this.props), {className: getButtonClasses(this.props), onClick: disabled ? undefined : onClick, ref: elementRef}), 
            text, 
            children, 
            maybeRenderRightIcon(rightIconName)));
    };
    Button.displayName = "Blueprint.Button";
    return Button;
}(React.Component));
exports.Button = Button;
exports.ButtonFactory = React.createFactory(Button);
var AnchorButton = (function (_super) {
    __extends(AnchorButton, _super);
    function AnchorButton() {
        _super.apply(this, arguments);
    }
    AnchorButton.prototype.render = function () {
        var _a = this.props, children = _a.children, disabled = _a.disabled, href = _a.href, onClick = _a.onClick, rightIconName = _a.rightIconName, _b = _a.tabIndex, tabIndex = _b === void 0 ? 0 : _b, text = _a.text;
        return (React.createElement("a", __assign({role: "button"}, props_1.removeNonHTMLProps(this.props), {className: getButtonClasses(this.props), href: disabled ? undefined : href, onClick: disabled ? undefined : onClick, ref: this.props.elementRef, tabIndex: disabled ? undefined : tabIndex}), 
            text, 
            children, 
            maybeRenderRightIcon(rightIconName)));
    };
    AnchorButton.displayName = "Blueprint.AnchorButton";
    return AnchorButton;
}(React.Component));
exports.AnchorButton = AnchorButton;
exports.AnchorButtonFactory = React.createFactory(AnchorButton);
function getButtonClasses(props) {
    return classNames(Classes.BUTTON, (_a = {}, _a[Classes.DISABLED] = props.disabled, _a), Classes.iconClass(props.iconName), Classes.intentClass(props.intent), props.className);
    var _a;
}
function maybeRenderRightIcon(iconName) {
    if (iconName == null) {
        return undefined;
    }
    else {
        return React.createElement("span", {className: classNames(Classes.ICON_STANDARD, Classes.iconClass(iconName), Classes.ALIGN_RIGHT)});
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2J1dHRvbi9idXR0b25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7Ozs7O0FBRUgseURBQXlEO0FBQ3pELHNDQUFzQztBQUV0QyxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELHNCQUFpRCxvQkFBb0IsQ0FBQyxDQUFBO0FBVXRFO0lBQTRCLDBCQUFzRTtJQUFsRztRQUE0Qiw4QkFBc0U7SUFtQmxHLENBQUM7SUFoQlUsdUJBQU0sR0FBYjtRQUNJLElBQUEsZUFBbUYsRUFBM0Usc0JBQVEsRUFBRSxzQkFBUSxFQUFFLDBCQUFVLEVBQUUsb0JBQU8sRUFBRSxnQ0FBYSxFQUFFLGNBQUksQ0FBZ0I7UUFDcEYsTUFBTSxDQUFDLENBQ0gscUJBQUMsTUFBTSxhQUNILElBQUksRUFBQyxRQUFRLEdBQ1QsMEJBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUNsQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxFQUN4QyxPQUFPLEVBQUUsUUFBUSxHQUFHLFNBQVMsR0FBRyxPQUFRLEVBQ3hDLEdBQUcsRUFBRSxVQUFXO1lBRWYsSUFBSztZQUNMLFFBQVM7WUFDVCxvQkFBb0IsQ0FBQyxhQUFhLENBQUUsQ0FDaEMsQ0FDWixDQUFDO0lBQ04sQ0FBQztJQWpCYSxrQkFBVyxHQUFHLGtCQUFrQixDQUFDO0lBa0JuRCxhQUFDO0FBQUQsQ0FuQkEsQUFtQkMsQ0FuQjJCLEtBQUssQ0FBQyxTQUFTLEdBbUIxQztBQW5CWSxjQUFNLFNBbUJsQixDQUFBO0FBRVkscUJBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXpEO0lBQWtDLGdDQUFzRTtJQUF4RztRQUFrQyw4QkFBc0U7SUFxQnhHLENBQUM7SUFsQlUsNkJBQU0sR0FBYjtRQUNJLElBQUEsZUFBMkYsRUFBbkYsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLGNBQUksRUFBRSxvQkFBTyxFQUFFLGdDQUFhLEVBQUUsZ0JBQVksRUFBWixpQ0FBWSxFQUFFLGNBQUksQ0FBZ0I7UUFDNUYsTUFBTSxDQUFDLENBQ0gscUJBQUMsQ0FBQyxhQUNFLElBQUksRUFBQyxRQUFRLEdBQ1QsMEJBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUNsQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBRSxFQUN4QyxJQUFJLEVBQUUsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFLLEVBQ2xDLE9BQU8sRUFBRSxRQUFRLEdBQUcsU0FBUyxHQUFHLE9BQVEsRUFDeEMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVyxFQUMzQixRQUFRLEVBQUUsUUFBUSxHQUFHLFNBQVMsR0FBRyxRQUFTO1lBRXpDLElBQUs7WUFDTCxRQUFTO1lBQ1Qsb0JBQW9CLENBQUMsYUFBYSxDQUFFLENBQ3JDLENBQ1AsQ0FBQztJQUNOLENBQUM7SUFuQmEsd0JBQVcsR0FBRyx3QkFBd0IsQ0FBQztJQW9CekQsbUJBQUM7QUFBRCxDQXJCQSxBQXFCQyxDQXJCaUMsS0FBSyxDQUFDLFNBQVMsR0FxQmhEO0FBckJZLG9CQUFZLGVBcUJ4QixDQUFBO0FBRVksMkJBQW1CLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVyRSwwQkFBMEIsS0FBbUI7SUFDekMsTUFBTSxDQUFDLFVBQVUsQ0FDYixPQUFPLENBQUMsTUFBTSxFQUNkLFVBQUUsR0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUUsS0FBSyxDQUFDLFFBQVEsS0FBRSxFQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFDakMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQ2pDLEtBQUssQ0FBQyxTQUFTLENBQ2xCLENBQUM7O0FBQ04sQ0FBQztBQUVELDhCQUE4QixRQUFnQjtJQUMxQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBRSxFQUFHLENBQUM7SUFDcEgsQ0FBQztBQUNMLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9idXR0b24vYnV0dG9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuLy8gSEFDS0hBQ0s6IHRoZXNlIGNvbXBvbmVudHMgc2hvdWxkIGdvIGluIHNlcGFyYXRlIGZpbGVzXG4vLyB0c2xpbnQ6ZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IElBY3Rpb25Qcm9wcywgcmVtb3ZlTm9uSFRNTFByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElCdXR0b25Qcm9wcyBleHRlbmRzIElBY3Rpb25Qcm9wcyB7XG4gICAgLyoqIEEgcmVmIGhhbmRsZXIgdGhhdCByZWNlaXZlcyB0aGUgbmF0aXZlIEhUTUwgZWxlbWVudCBiYWNraW5nIHRoaXMgY29tcG9uZW50LiAqL1xuICAgIGVsZW1lbnRSZWY/OiAocmVmOiBIVE1MRWxlbWVudCkgPT4gYW55O1xuXG4gICAgLyoqIE5hbWUgb2YgaWNvbiAodGhlIHBhcnQgYWZ0ZXIgYHB0LWljb24tYCkgdG8gYWRkIHRvIGJ1dHRvbi4gKi9cbiAgICByaWdodEljb25OYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFJlYWN0LkhUTUxQcm9wczxIVE1MQnV0dG9uRWxlbWVudD4gJiBJQnV0dG9uUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LkJ1dHRvblwiO1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgZGlzYWJsZWQsIGVsZW1lbnRSZWYsIG9uQ2xpY2ssIHJpZ2h0SWNvbk5hbWUsIHRleHQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgey4uLnJlbW92ZU5vbkhUTUxQcm9wcyh0aGlzLnByb3BzKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2dldEJ1dHRvbkNsYXNzZXModGhpcy5wcm9wcyl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17ZGlzYWJsZWQgPyB1bmRlZmluZWQgOiBvbkNsaWNrfVxuICAgICAgICAgICAgICAgIHJlZj17ZWxlbWVudFJlZn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7dGV4dH1cbiAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAge21heWJlUmVuZGVyUmlnaHRJY29uKHJpZ2h0SWNvbk5hbWUpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQnV0dG9uRmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoQnV0dG9uKTtcblxuZXhwb3J0IGNsYXNzIEFuY2hvckJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxSZWFjdC5IVE1MUHJvcHM8SFRNTEFuY2hvckVsZW1lbnQ+ICYgSUJ1dHRvblByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5BbmNob3JCdXR0b25cIjtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGRpc2FibGVkLCBocmVmLCBvbkNsaWNrLCByaWdodEljb25OYW1lLCB0YWJJbmRleCA9IDAsIHRleHQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHsuLi5yZW1vdmVOb25IVE1MUHJvcHModGhpcy5wcm9wcyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtnZXRCdXR0b25DbGFzc2VzKHRoaXMucHJvcHMpfVxuICAgICAgICAgICAgICAgIGhyZWY9e2Rpc2FibGVkID8gdW5kZWZpbmVkIDogaHJlZn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtkaXNhYmxlZCA/IHVuZGVmaW5lZCA6IG9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnByb3BzLmVsZW1lbnRSZWZ9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9e2Rpc2FibGVkID8gdW5kZWZpbmVkIDogdGFiSW5kZXh9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgIHttYXliZVJlbmRlclJpZ2h0SWNvbihyaWdodEljb25OYW1lKX1cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBBbmNob3JCdXR0b25GYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShBbmNob3JCdXR0b24pO1xuXG5mdW5jdGlvbiBnZXRCdXR0b25DbGFzc2VzKHByb3BzOiBJQnV0dG9uUHJvcHMpIHtcbiAgICByZXR1cm4gY2xhc3NOYW1lcyhcbiAgICAgICAgQ2xhc3Nlcy5CVVRUT04sXG4gICAgICAgIHsgW0NsYXNzZXMuRElTQUJMRURdOiBwcm9wcy5kaXNhYmxlZCB9LFxuICAgICAgICBDbGFzc2VzLmljb25DbGFzcyhwcm9wcy5pY29uTmFtZSksXG4gICAgICAgIENsYXNzZXMuaW50ZW50Q2xhc3MocHJvcHMuaW50ZW50KSxcbiAgICAgICAgcHJvcHMuY2xhc3NOYW1lLFxuICAgICk7XG59XG5cbmZ1bmN0aW9uIG1heWJlUmVuZGVyUmlnaHRJY29uKGljb25OYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoaWNvbk5hbWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5JQ09OX1NUQU5EQVJELCBDbGFzc2VzLmljb25DbGFzcyhpY29uTmFtZSksIENsYXNzZXMuQUxJR05fUklHSFQpfSAvPjtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
