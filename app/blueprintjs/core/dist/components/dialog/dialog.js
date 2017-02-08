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
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var overlay_1 = require("../overlay/overlay");
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        _super.apply(this, arguments);
        this.displayName = "Blueprint.Dialog";
    }
    Dialog.prototype.render = function () {
        return (React.createElement(overlay_1.Overlay, __assign({}, this.props, {className: classNames((_a = {}, _a[Classes.OVERLAY_SCROLL_CONTAINER] = !this.props.inline, _a)), hasBackdrop: true}), 
            React.createElement("div", {className: classNames(Classes.DIALOG, this.props.className), style: this.props.style}, 
                this.maybeRenderHeader(), 
                this.props.children)
        ));
        var _a;
    };
    Dialog.prototype.validateProps = function (props) {
        if (props.title == null) {
            if (props.iconName != null) {
                console.error(Errors.WARNING_DIALOG_NO_HEADER_ICON);
            }
            if (props.isCloseButtonShown != null) {
                console.error(Errors.WARNING_DIALOG_NO_HEADER_CLOSE_BUTTON);
            }
        }
    };
    Dialog.prototype.maybeRenderCloseButton = function () {
        // for now, show close button if prop is undefined or null
        // this gives us a behavior as if the default value were `true`
        if (this.props.isCloseButtonShown !== false) {
            var classes = classNames(Classes.DIALOG_CLOSE_BUTTON, Classes.iconClass("small-cross"));
            return React.createElement("button", {"aria-label": "Close", className: classes, onClick: this.props.onClose});
        }
        else {
            return undefined;
        }
    };
    Dialog.prototype.maybeRenderHeader = function () {
        if (this.props.title == null) {
            return undefined;
        }
        var maybeIcon;
        if (this.props.iconName != null) {
            maybeIcon = React.createElement("span", {className: classNames(Classes.ICON_LARGE, Classes.iconClass(this.props.iconName))});
        }
        return (React.createElement("div", {className: Classes.DIALOG_HEADER}, 
            maybeIcon, 
            React.createElement("h5", null, this.props.title), 
            this.maybeRenderCloseButton()));
    };
    Dialog.defaultProps = {
        isOpen: false,
    };
    return Dialog;
}(abstractComponent_1.AbstractComponent));
exports.Dialog = Dialog;
exports.DialogFactory = React.createFactory(Dialog);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksTUFBTSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFFOUMsd0JBQTJELG9CQUFvQixDQUFDLENBQUE7QUEyQ2hGO0lBQTRCLDBCQUFtQztJQUEvRDtRQUE0Qiw4QkFBbUM7UUFLcEQsZ0JBQVcsR0FBRyxrQkFBa0IsQ0FBQztJQXdENUMsQ0FBQztJQXREVSx1QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLENBQ0gsb0JBQUMsaUJBQU8sZUFDQSxJQUFJLENBQUMsS0FBSyxHQUNkLFNBQVMsRUFBRSxVQUFVLENBQUMsVUFBRSxHQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUUsQ0FBRSxFQUNsRixXQUFXLEVBQUUsSUFBSztZQUVsQixxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBTTtnQkFDckYsSUFBSSxDQUFDLGlCQUFpQixFQUFHO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FDbkI7U0FDQSxDQUNiLENBQUM7O0lBQ04sQ0FBQztJQUVTLDhCQUFhLEdBQXZCLFVBQXdCLEtBQW1CO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVDQUFzQixHQUE5QjtRQUNJLDBEQUEwRDtRQUMxRCwrREFBK0Q7UUFDL0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzFGLE1BQU0sQ0FBQyxxQkFBQyxNQUFNLEtBQUMsVUFBVSxHQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBUSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVEsRUFBRyxDQUFDO1FBQzFGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFTyxrQ0FBaUIsR0FBekI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVELElBQUksU0FBc0IsQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFNBQVMsR0FBRyxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBRSxFQUFHLENBQUM7UUFDNUcsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWM7WUFDakMsU0FBVTtZQUNYLHFCQUFDLEVBQUUsU0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU0sQ0FBSztZQUMxQixJQUFJLENBQUMsc0JBQXNCLEVBQUcsQ0FDN0IsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQTNEYSxtQkFBWSxHQUFpQjtRQUN2QyxNQUFNLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBMEROLGFBQUM7QUFBRCxDQTdEQSxBQTZEQyxDQTdEMkIscUNBQWlCLEdBNkQ1QztBQTdEWSxjQUFNLFNBNkRsQixDQUFBO0FBRVkscUJBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vLi4vY29tbW9uL2Vycm9yc1wiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0IHsgSUJhY2tkcm9wUHJvcHMsIElPdmVybGF5YWJsZVByb3BzLCBPdmVybGF5IH0gZnJvbSBcIi4uL292ZXJsYXkvb3ZlcmxheVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEaWFsb2dQcm9wcyBleHRlbmRzIElPdmVybGF5YWJsZVByb3BzLCBJQmFja2Ryb3BQcm9wcywgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBvdmVybGF5IGFuZCBpdHMgY2hpbGRyZW4uXG4gICAgICogVGhpcyBwcm9wIGlzIHJlcXVpcmVkIGJlY2F1c2UgdGhlIGNvbXBvbmVudCBpcyBjb250cm9sbGVkLlxuICAgICAqL1xuICAgIGlzT3BlbjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIERpYWxvZyBhbHdheXMgaGFzIGEgYmFja2Ryb3Agc28gdGhpcyBwcm9wIGlzIGV4Y2x1ZGVkIGZyb20gdGhlIHB1YmxpYyBBUEkuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogTmFtZSBvZiBpY29uICh0aGUgcGFydCBhZnRlciBgcHQtaWNvbi1gKSB0byBhcHBlYXIgaW4gdGhlIGRpYWxvZydzIGhlYWRlci5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIGhlYWRlciB3aWxsIG9ubHkgYmUgcmVuZGVyZWQgaWYgYHRpdGxlYCBpcyBwcm92aWRlZC5cbiAgICAgKi9cbiAgICBpY29uTmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgY2xvc2UgXCJYXCIgYnV0dG9uIGluIHRoZSBkaWFsb2cncyBoZWFkZXIuXG4gICAgICogTm90ZSB0aGF0IHRoZSBoZWFkZXIgd2lsbCBvbmx5IGJlIHJlbmRlcmVkIGlmIGB0aXRsZWAgaXMgcHJvdmlkZWQuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGlzQ2xvc2VCdXR0b25TaG93bj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDU1MgU3R5bGVzIHRvIGFwcGx5IHRvIHRoZSAucHQtZGlhbG9nIGVsZW1lbnQuXG4gICAgICogQGRlZmF1bHQge31cbiAgICAgKi9cbiAgICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiBkaWFsb2cuXG4gICAgICogSWYgcHJvdmlkZWQsIGEgYC5wdC1kaWFsb2ctaGVhZGVyYCBlbGVtZW50IHdpbGwgYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgKiBiZWZvcmUgYW55IGNoaWxkcmVuIGVsZW1lbnRzLlxuICAgICAqIEluIHZlcnNpb24gMy4wLCB0aGlzIHByb3Agd2lsbCBiZSByZXF1aXJlZC5cbiAgICAgKi9cbiAgICB0aXRsZT86IHN0cmluZyB8IEpTWC5FbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgRGlhbG9nIGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SURpYWxvZ1Byb3BzLCB7fT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzOiBJRGlhbG9nUHJvcHMgPSB7XG4gICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgfTtcblxuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LkRpYWxvZ1wiO1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxPdmVybGF5XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHsgW0NsYXNzZXMuT1ZFUkxBWV9TQ1JPTExfQ09OVEFJTkVSXTogIXRoaXMucHJvcHMuaW5saW5lIH0pfVxuICAgICAgICAgICAgICAgIGhhc0JhY2tkcm9wPXt0cnVlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuRElBTE9HLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9IHN0eWxlPXt0aGlzLnByb3BzLnN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJIZWFkZXIoKX1cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L092ZXJsYXk+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlUHJvcHMocHJvcHM6IElEaWFsb2dQcm9wcykge1xuICAgICAgICBpZiAocHJvcHMudGl0bGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHByb3BzLmljb25OYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKEVycm9ycy5XQVJOSU5HX0RJQUxPR19OT19IRUFERVJfSUNPTik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvcHMuaXNDbG9zZUJ1dHRvblNob3duICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKEVycm9ycy5XQVJOSU5HX0RJQUxPR19OT19IRUFERVJfQ0xPU0VfQlVUVE9OKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJDbG9zZUJ1dHRvbigpIHtcbiAgICAgICAgLy8gZm9yIG5vdywgc2hvdyBjbG9zZSBidXR0b24gaWYgcHJvcCBpcyB1bmRlZmluZWQgb3IgbnVsbFxuICAgICAgICAvLyB0aGlzIGdpdmVzIHVzIGEgYmVoYXZpb3IgYXMgaWYgdGhlIGRlZmF1bHQgdmFsdWUgd2VyZSBgdHJ1ZWBcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNDbG9zZUJ1dHRvblNob3duICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5ESUFMT0dfQ0xPU0VfQlVUVE9OLCBDbGFzc2VzLmljb25DbGFzcyhcInNtYWxsLWNyb3NzXCIpKTtcbiAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIGFyaWEtbGFiZWw9XCJDbG9zZVwiIGNsYXNzTmFtZT17Y2xhc3Nlc30gb25DbGljaz17dGhpcy5wcm9wcy5vbkNsb3NlfSAvPjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50aXRsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1heWJlSWNvbjogSlNYLkVsZW1lbnQ7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmljb25OYW1lICE9IG51bGwpIHtcbiAgICAgICAgICAgIG1heWJlSWNvbiA9IDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhDbGFzc2VzLklDT05fTEFSR0UsIENsYXNzZXMuaWNvbkNsYXNzKHRoaXMucHJvcHMuaWNvbk5hbWUpKX0gLz47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDbGFzc2VzLkRJQUxPR19IRUFERVJ9PlxuICAgICAgICAgICAgICAgIHttYXliZUljb259XG4gICAgICAgICAgICAgICAgPGg1Pnt0aGlzLnByb3BzLnRpdGxlfTwvaDU+XG4gICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJDbG9zZUJ1dHRvbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgRGlhbG9nRmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoRGlhbG9nKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
