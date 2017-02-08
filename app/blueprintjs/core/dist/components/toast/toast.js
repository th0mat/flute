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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var utils_1 = require("../../common/utils");
var buttons_1 = require("../button/buttons");
var Toast = (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = this;
        _super.apply(this, arguments);
        this.displayName = "Blueprint.Toast";
        this.handleActionClick = function (e) {
            utils_1.safeInvoke(_this.props.action.onClick, e);
            _this.triggerDismiss(false);
        };
        this.handleCloseClick = function () { return _this.triggerDismiss(false); };
        this.startTimeout = function () {
            if (_this.props.timeout > 0) {
                _this.setTimeout(function () { return _this.triggerDismiss(true); }, _this.props.timeout);
            }
        };
    }
    Toast.prototype.render = function () {
        var _a = this.props, className = _a.className, intent = _a.intent, message = _a.message;
        return (React.createElement("div", {className: classNames(Classes.TOAST, Classes.intentClass(intent), className), onBlur: this.startTimeout, onFocus: this.clearTimeouts, onMouseEnter: this.clearTimeouts, onMouseLeave: this.startTimeout}, 
            this.maybeRenderIcon(), 
            React.createElement("span", {className: Classes.TOAST_MESSAGE}, message), 
            React.createElement("div", {className: classNames(Classes.BUTTON_GROUP, Classes.MINIMAL)}, 
                this.maybeRenderActionButton(), 
                React.createElement(buttons_1.Button, {iconName: "cross", onClick: this.handleCloseClick}))));
    };
    Toast.prototype.componentDidMount = function () {
        this.startTimeout();
    };
    Toast.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.timeout <= 0 && this.props.timeout > 0) {
            this.startTimeout();
        }
        else if (prevProps.timeout > 0 && this.props.timeout <= 0) {
            this.clearTimeouts();
        }
    };
    Toast.prototype.componentWillUnmount = function () {
        this.clearTimeouts();
    };
    Toast.prototype.maybeRenderActionButton = function () {
        var action = this.props.action;
        return action == null ? undefined : React.createElement(buttons_1.Button, __assign({}, action, {intent: null, onClick: this.handleActionClick}));
    };
    Toast.prototype.maybeRenderIcon = function () {
        var iconName = this.props.iconName;
        if (iconName == null) {
            return undefined;
        }
        else {
            return React.createElement("span", {className: classNames(Classes.ICON_STANDARD, Classes.iconClass(iconName))});
        }
    };
    Toast.prototype.triggerDismiss = function (didTimeoutExpire) {
        utils_1.safeInvoke(this.props.onDismiss, didTimeoutExpire);
        this.clearTimeouts();
    };
    Toast.defaultProps = {
        className: "",
        message: "",
        timeout: 5000,
    };
    Toast = __decorate([
        PureRender
    ], Toast);
    return Toast;
}(abstractComponent_1.AbstractComponent));
exports.Toast = Toast;
exports.ToastFactory = React.createFactory(Toast);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RvYXN0L3RvYXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxVQUFVLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBRWhELHNCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELHdCQUF1QixtQkFBbUIsQ0FBQyxDQUFBO0FBZ0MzQztJQUEyQix5QkFBa0M7SUFBN0Q7UUFBQSxpQkE0RUM7UUE1RTBCLDhCQUFrQztRQU9sRCxnQkFBVyxHQUFHLGlCQUFpQixDQUFDO1FBb0QvQixzQkFBaUIsR0FBRyxVQUFDLENBQXNDO1lBQy9ELGtCQUFVLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFBO1FBRU8scUJBQWdCLEdBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQTFCLENBQTBCLENBQUM7UUFPcEQsaUJBQVksR0FBRztZQUNuQixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QixLQUFJLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUF6QixDQUF5QixFQUFFLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekUsQ0FBQztRQUNMLENBQUMsQ0FB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QztBQUFELENBNUVBLEFBNEVDLENBNUUwQixxQ0FBaUIsR0E0RTNDO0FBNUVZLGFBQUssUUE0RWpCLENBQUE7QUFFWSxvQkFBWSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy90b2FzdC90b2FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgQWJzdHJhY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Fic3RyYWN0Q29tcG9uZW50XCI7XG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0IHsgSUFjdGlvblByb3BzLCBJSW50ZW50UHJvcHMsIElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcbmltcG9ydCB7IHNhZmVJbnZva2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiLi4vYnV0dG9uL2J1dHRvbnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJVG9hc3RQcm9wcyBleHRlbmRzIElQcm9wcywgSUludGVudFByb3BzIHtcbiAgICAvKipcbiAgICAgKiBBY3Rpb24gdG8gZGlzcGxheSBpbiBhIG1pbmltYWwgYnV0dG9uLiBUaGUgdG9hc3QgaXMgZGlzbWlzc2VkIGF1dG9tYXRpY2FsbHkgd2hlbiB0aGVcbiAgICAgKiB1c2VyIGNsaWNrcyB0aGUgYWN0aW9uIGJ1dHRvbi4gTm90ZSB0aGF0IHRoZSBgaW50ZW50YCBwcm9wIGlzIGlnbm9yZWQgKHRoZSBhY3Rpb24gYnV0dG9uXG4gICAgICogY2Fubm90IGhhdmUgaXRzIG93biBpbnRlbnQgY29sb3IgdGhhdCBtaWdodCBjb25mbGljdCB3aXRoIHRoZSB0b2FzdCdzIGludGVudCkuIE9taXQgdGhpc1xuICAgICAqIHByb3AgdG8gb21pdCB0aGUgYWN0aW9uIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBhY3Rpb24/OiBJQWN0aW9uUHJvcHM7XG5cbiAgICAvKiogTmFtZSBvZiBpY29uIHRvIGFwcGVhciBiZWZvcmUgbWVzc2FnZS4gU3BlY2lmeSBvbmx5IHRoZSBwYXJ0IG9mIHRoZSBuYW1lIGFmdGVyIGBwdC1pY29uLWAuICovXG4gICAgaWNvbk5hbWU/OiBzdHJpbmc7XG5cbiAgICAvKiogTWVzc2FnZSB0byBkaXNwbGF5IGluIHRoZSBib2R5IG9mIHRoZSB0b2FzdC4gKi9cbiAgICBtZXNzYWdlOiBzdHJpbmcgfCBKU1guRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiB0aGUgdG9hc3QgaXMgZGlzbWlzc2VkLCBlaXRoZXIgYnkgdGhlIHVzZXIgb3IgYnkgdGhlIHRpbWVvdXQuXG4gICAgICogVGhlIHZhbHVlIG9mIHRoZSBhcmd1bWVudCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgdG9hc3Qgd2FzIGNsb3NlZCBiZWNhdXNlIHRoZSB0aW1lb3V0IGV4cGlyZWQuXG4gICAgICovXG4gICAgb25EaXNtaXNzPzogKGRpZFRpbWVvdXRFeHBpcmU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgYXV0b21hdGljYWxseSBkaXNtaXNzaW5nIHRvYXN0LlxuICAgICAqIFByb3ZpZGluZyBhIHZhbHVlIDw9IDAgd2lsbCBkaXNhYmxlIHRoZSB0aW1lb3V0ICh0aGlzIGlzIGRpc2NvdXJhZ2VkKS5cbiAgICAgKiBAZGVmYXVsdCA1MDAwXG4gICAgICovXG4gICAgdGltZW91dD86IG51bWJlcjtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBUb2FzdCBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElUb2FzdFByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzOiBJVG9hc3RQcm9wcyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiBcIlwiLFxuICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICB0aW1lb3V0OiA1MDAwLFxuICAgIH07XG5cbiAgICBwdWJsaWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5Ub2FzdFwiO1xuXG4gICAgcHVibGljIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBpbnRlbnQsIG1lc3NhZ2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuVE9BU1QsIENsYXNzZXMuaW50ZW50Q2xhc3MoaW50ZW50KSwgY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuc3RhcnRUaW1lb3V0fVxuICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuY2xlYXJUaW1lb3V0c31cbiAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9e3RoaXMuY2xlYXJUaW1lb3V0c31cbiAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU9e3RoaXMuc3RhcnRUaW1lb3V0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVySWNvbigpfVxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Q2xhc3Nlcy5UT0FTVF9NRVNTQUdFfT57bWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5CVVRUT05fR1JPVVAsIENsYXNzZXMuTUlOSU1BTCl9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckFjdGlvbkJ1dHRvbigpfVxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGljb25OYW1lPVwiY3Jvc3NcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsb3NlQ2xpY2t9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IElUb2FzdFByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMudGltZW91dCA8PSAwICYmIHRoaXMucHJvcHMudGltZW91dCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUaW1lb3V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJldlByb3BzLnRpbWVvdXQgPiAwICYmIHRoaXMucHJvcHMudGltZW91dCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRzKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckFjdGlvbkJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgeyBhY3Rpb24gfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiBhY3Rpb24gPT0gbnVsbCA/IHVuZGVmaW5lZCA6IDxCdXR0b24gey4uLmFjdGlvbn0gaW50ZW50PXtudWxsfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUFjdGlvbkNsaWNrfSAvPjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVySWNvbigpIHtcbiAgICAgICAgY29uc3QgeyBpY29uTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKGljb25OYW1lID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuSUNPTl9TVEFOREFSRCwgQ2xhc3Nlcy5pY29uQ2xhc3MoaWNvbk5hbWUpKX0gLz47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUFjdGlvbkNsaWNrID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5hY3Rpb24ub25DbGljaywgZSk7XG4gICAgICAgIHRoaXMudHJpZ2dlckRpc21pc3MoZmFsc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xvc2VDbGljayA9ICgpID0+IHRoaXMudHJpZ2dlckRpc21pc3MoZmFsc2UpO1xuXG4gICAgcHJpdmF0ZSB0cmlnZ2VyRGlzbWlzcyhkaWRUaW1lb3V0RXhwaXJlOiBib29sZWFuKSB7XG4gICAgICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkRpc21pc3MsIGRpZFRpbWVvdXRFeHBpcmUpO1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dHMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHN0YXJ0VGltZW91dCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudGltZW91dCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyaWdnZXJEaXNtaXNzKHRydWUpLCB0aGlzLnByb3BzLnRpbWVvdXQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgVG9hc3RGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShUb2FzdCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
