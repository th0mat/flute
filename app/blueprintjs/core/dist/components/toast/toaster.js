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
var ReactDOM = require("react-dom");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var keys_1 = require("../../common/keys");
var position_1 = require("../../common/position");
var utils_1 = require("../../common/utils");
var overlay_1 = require("../overlay/overlay");
var toast_1 = require("./toast");
var Toaster = (function (_super) {
    __extends(Toaster, _super);
    function Toaster() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            toasts: [],
        };
        // auto-incrementing identifier for un-keyed toasts
        this.toastId = 0;
        this.getDismissHandler = function (toast) { return function (timeoutExpired) {
            _this.dismiss(toast.key, timeoutExpired);
        }; };
        this.handleClose = function (e) {
            // NOTE that `e` isn't always a KeyboardEvent but that's the only type we care about
            if (e.which === keys_1.ESCAPE) {
                _this.clear();
            }
        };
    }
    /**
     * Create a new `Toaster` instance that can be shared around your application.
     * The `Toaster` will be rendered into a new element appended to the given container.
     */
    Toaster.create = function (props, container) {
        if (container === void 0) { container = document.body; }
        var containerElement = document.createElement("div");
        container.appendChild(containerElement);
        return ReactDOM.render(React.createElement(Toaster, __assign({}, props, {inline: true})), containerElement);
    };
    Toaster.prototype.show = function (props) {
        var options = props;
        options.key = "toast-" + this.toastId++;
        this.setState(function (prevState) { return ({
            toasts: [options].concat(prevState.toasts),
        }); });
        return options.key;
    };
    Toaster.prototype.update = function (key, props) {
        var options = props;
        options.key = key;
        this.setState(function (prevState) { return ({
            toasts: prevState.toasts.map(function (t) { return t.key === key ? options : t; }),
        }); });
    };
    Toaster.prototype.dismiss = function (key, timeoutExpired) {
        if (timeoutExpired === void 0) { timeoutExpired = false; }
        this.setState(function (_a) {
            var toasts = _a.toasts;
            return ({
                toasts: toasts.filter(function (t) {
                    var matchesKey = t.key === key;
                    if (matchesKey) {
                        utils_1.safeInvoke(t.onDismiss, timeoutExpired);
                    }
                    return !matchesKey;
                }),
            });
        });
    };
    Toaster.prototype.clear = function () {
        this.state.toasts.map(function (t) { return utils_1.safeInvoke(t.onDismiss, false); });
        this.setState({ toasts: [] });
    };
    Toaster.prototype.getToasts = function () {
        return this.state.toasts;
    };
    Toaster.prototype.render = function () {
        // $pt-transition-duration * 3 + $pt-transition-duration / 2
        var classes = classNames(Classes.TOAST_CONTAINER, this.getPositionClasses(), this.props.className);
        return (React.createElement(overlay_1.Overlay, {autoFocus: this.props.autoFocus, canEscapeKeyClose: this.props.canEscapeKeyClear, canOutsideClickClose: false, className: classes, enforceFocus: false, hasBackdrop: false, inline: this.props.inline, isOpen: this.state.toasts.length > 0, onClose: this.handleClose, transitionDuration: 350, transitionName: "pt-toast"}, this.state.toasts.map(this.renderToast, this)));
    };
    Toaster.prototype.validateProps = function (props) {
        if (props.position === position_1.Position.LEFT || props.position === position_1.Position.RIGHT) {
            throw new Error("Toaster does not support LEFT or RIGHT positions.");
        }
    };
    Toaster.prototype.renderToast = function (toast) {
        return React.createElement(toast_1.Toast, __assign({}, toast, {onDismiss: this.getDismissHandler(toast)}));
    };
    Toaster.prototype.getPositionClasses = function () {
        var positions = position_1.Position[this.props.position].split("_");
        // NOTE that there is no -center class because that's the default style
        return positions.map(function (p) { return (Classes.TOAST_CONTAINER + "-" + p.toLowerCase()); });
    };
    Toaster.defaultProps = {
        autoFocus: false,
        canEscapeKeyClear: true,
        inline: false,
        position: position_1.Position.TOP,
    };
    Toaster = __decorate([
        PureRender
    ], Toaster);
    return Toaster;
}(abstractComponent_1.AbstractComponent));
exports.Toaster = Toaster;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RvYXN0L3RvYXN0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLElBQVksUUFBUSxXQUFNLFdBQVcsQ0FBQyxDQUFBO0FBRXRDLGtDQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQscUJBQXVCLG1CQUFtQixDQUFDLENBQUE7QUFDM0MseUJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFFakQsc0JBQTJCLG9CQUFvQixDQUFDLENBQUE7QUFDaEQsd0JBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFDN0Msc0JBQW1DLFNBQVMsQ0FBQyxDQUFBO0FBMkQ3QztJQUE2QiwyQkFBK0M7SUFBNUU7UUFBQSxpQkErR0M7UUEvRzRCLDhCQUErQztRQWtCakUsVUFBSyxHQUFHO1lBQ1gsTUFBTSxFQUFFLEVBQXFCO1NBQ2hDLENBQUM7UUFFRixtREFBbUQ7UUFDM0MsWUFBTyxHQUFHLENBQUMsQ0FBQztRQThFWixzQkFBaUIsR0FBRyxVQUFDLEtBQW9CLElBQUssT0FBQSxVQUFDLGNBQXVCO1lBQzFFLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBRnFELENBRXJELENBQUE7UUFFTyxnQkFBVyxHQUFHLFVBQUMsQ0FBbUM7WUFDdEQsb0ZBQW9GO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssYUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLENB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LENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELHVFQUF1RTtRQUN2RSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUcsT0FBTyxDQUFDLGVBQWUsU0FBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUUsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFsR2Esb0JBQVksR0FBa0I7UUFDeEMsU0FBUyxFQUFFLEtBQUs7UUFDaEIsaUJBQWlCLEVBQUUsSUFBSTtRQUN2QixNQUFNLEVBQUUsS0FBSztRQUNiLFFBQVEsRUFBRSxtQkFBUSxDQUFDLEdBQUc7S0FDekIsQ0FBQztJQVBOO1FBQUMsVUFBVTtlQUFBO0lBZ0hYLGNBQUM7QUFBRCxDQS9HQSxBQStHQyxDQS9HNEIscUNBQWlCLEdBK0c3QztBQS9HWSxlQUFPLFVBK0duQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdG9hc3QvdG9hc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuaW1wb3J0IHsgQWJzdHJhY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Fic3RyYWN0Q29tcG9uZW50XCI7XG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0IHsgRVNDQVBFIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9rZXlzXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcG9zaXRpb25cIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcbmltcG9ydCB7IHNhZmVJbnZva2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XG5pbXBvcnQgeyBPdmVybGF5IH0gZnJvbSBcIi4uL292ZXJsYXkvb3ZlcmxheVwiO1xuaW1wb3J0IHsgSVRvYXN0UHJvcHMsIFRvYXN0IH0gZnJvbSBcIi4vdG9hc3RcIjtcblxuZXhwb3J0IHR5cGUgSVRvYXN0T3B0aW9ucyA9IElUb2FzdFByb3BzICYge2tleT86IHN0cmluZ307XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRvYXN0ZXIge1xuICAgIC8qKiBTaG93IGEgbmV3IHRvYXN0IHRvIHRoZSB1c2VyLiBSZXR1cm5zIHRoZSB1bmlxdWUga2V5IG9mIHRoZSBuZXcgdG9hc3QuICovXG4gICAgc2hvdyhwcm9wczogSVRvYXN0UHJvcHMpOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSB0b2FzdCB3aXRoIHRoZSBnaXZlbiBrZXkgdG8gdXNlIHRoZSBuZXcgcHJvcHMuXG4gICAgICogVXBkYXRpbmcgYSBrZXkgdGhhdCBkb2VzIG5vdCBleGlzdCBpcyBlZmZlY3RpdmVseSBhIG5vLW9wLlxuICAgICAqL1xuICAgIHVwZGF0ZShrZXk6IHN0cmluZywgcHJvcHM6IElUb2FzdFByb3BzKTogdm9pZDtcblxuICAgIC8qKiBEaXNtaXNzIHRoZSBnaXZlbiB0b2FzdCBpbnN0YW50bHkuICovXG4gICAgZGlzbWlzcyhrZXk6IHN0cmluZyk6IHZvaWQ7XG5cbiAgICAvKiogRGlzbWlzcyBhbGwgdG9hc3RzIGluc3RhbnRseS4gKi9cbiAgICBjbGVhcigpOiB2b2lkO1xuXG4gICAgLyoqIFJldHVybnMgdGhlIHByb3BzIGZvciBhbGwgY3VycmVudCB0b2FzdHMuICovXG4gICAgZ2V0VG9hc3RzKCk6IElUb2FzdE9wdGlvbnNbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVG9hc3RlclByb3BzIGV4dGVuZHMgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgdG9hc3Qgc2hvdWxkIGFjcXVpcmUgYXBwbGljYXRpb24gZm9jdXMgd2hlbiBpdCBmaXJzdCBvcGVucy5cbiAgICAgKiBUaGlzIGlzIGRpc2FibGVkIGJ5IGRlZmF1bHQgc28gdGhhdCB0b2FzdHMgZG8gbm90IGludGVycnVwdCB0aGUgdXNlcidzIGZsb3cuXG4gICAgICogTm90ZSB0aGF0IGBlbmZvcmNlRm9jdXNgIGlzIGFsd2F5cyBkaXNhYmxlZCBmb3IgYFRvYXN0ZXJgcy5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGF1dG9Gb2N1cz86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHByZXNzaW5nIHRoZSBgZXNjYCBrZXkgc2hvdWxkIGNsZWFyIGFsbCBhY3RpdmUgdG9hc3RzLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBjYW5Fc2NhcGVLZXlDbGVhcj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSB0b2FzdGVyIHNob3VsZCBiZSByZW5kZXJlZCBpbmxpbmUgb3IgaW50byBhIG5ldyBlbGVtZW50IG9uIGBkb2N1bWVudC5ib2R5YC5cbiAgICAgKiBJZiBgdHJ1ZWAsIHRoZW4gcG9zaXRpb25pbmcgd2lsbCBiZSByZWxhdGl2ZSB0byB0aGUgcGFyZW50IGVsZW1lbnQuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBpbmxpbmU/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgYFRvYXN0ZXJgIHdpdGhpbiBpdHMgY29udGFpbmVyLiBOb3RlIHRoYXQgYExFRlRgIGFuZCBgUklHSFRgIGFyZSBkaXNhbGxvd2VkXG4gICAgICogYmVjYXVzZSBUb2FzdGVyIG9ubHkgc3VwcG9ydHMgdGhlIHRvcCBhbmQgYm90dG9tIGVkZ2VzLlxuICAgICAqIEBkZWZhdWx0IFBvc2l0aW9uLlRPUFxuICAgICAqL1xuICAgIHBvc2l0aW9uPzogUG9zaXRpb247XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRvYXN0ZXJTdGF0ZSB7XG4gICAgdG9hc3RzOiBJVG9hc3RPcHRpb25zW107XG59XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgVG9hc3RlciBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElUb2FzdGVyUHJvcHMsIElUb2FzdGVyU3RhdGU+IGltcGxlbWVudHMgSVRvYXN0ZXIge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzOiBJVG9hc3RlclByb3BzID0ge1xuICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICBjYW5Fc2NhcGVLZXlDbGVhcjogdHJ1ZSxcbiAgICAgICAgaW5saW5lOiBmYWxzZSxcbiAgICAgICAgcG9zaXRpb246IFBvc2l0aW9uLlRPUCxcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGBUb2FzdGVyYCBpbnN0YW5jZSB0aGF0IGNhbiBiZSBzaGFyZWQgYXJvdW5kIHlvdXIgYXBwbGljYXRpb24uXG4gICAgICogVGhlIGBUb2FzdGVyYCB3aWxsIGJlIHJlbmRlcmVkIGludG8gYSBuZXcgZWxlbWVudCBhcHBlbmRlZCB0byB0aGUgZ2l2ZW4gY29udGFpbmVyLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHByb3BzPzogSVRvYXN0ZXJQcm9wcywgY29udGFpbmVyID0gZG9jdW1lbnQuYm9keSk6IElUb2FzdGVyIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcig8VG9hc3RlciB7Li4ucHJvcHN9IGlubGluZSAvPiAsIGNvbnRhaW5lckVsZW1lbnQpIGFzIFRvYXN0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRlID0ge1xuICAgICAgICB0b2FzdHM6IFtdIGFzIElUb2FzdE9wdGlvbnNbXSxcbiAgICB9O1xuXG4gICAgLy8gYXV0by1pbmNyZW1lbnRpbmcgaWRlbnRpZmllciBmb3IgdW4ta2V5ZWQgdG9hc3RzXG4gICAgcHJpdmF0ZSB0b2FzdElkID0gMDtcblxuICAgIHB1YmxpYyBzaG93KHByb3BzOiBJVG9hc3RQcm9wcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gcHJvcHMgYXMgSVRvYXN0T3B0aW9ucztcbiAgICAgICAgb3B0aW9ucy5rZXkgPSBgdG9hc3QtJHt0aGlzLnRvYXN0SWQrK31gO1xuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7XG4gICAgICAgICAgICB0b2FzdHM6IFtvcHRpb25zLCAuLi5wcmV2U3RhdGUudG9hc3RzXSxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5rZXk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShrZXk6IHN0cmluZywgcHJvcHM6IElUb2FzdFByb3BzKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBwcm9wcyBhcyBJVG9hc3RPcHRpb25zO1xuICAgICAgICBvcHRpb25zLmtleSA9IGtleTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xuICAgICAgICAgICAgdG9hc3RzOiBwcmV2U3RhdGUudG9hc3RzLm1hcCgodCkgPT4gdC5rZXkgPT09IGtleSA/IG9wdGlvbnMgOiB0KSxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNtaXNzKGtleTogc3RyaW5nLCB0aW1lb3V0RXhwaXJlZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHsgdG9hc3RzIH0pID0+ICh7XG4gICAgICAgICAgICB0b2FzdHM6IHRvYXN0cy5maWx0ZXIoKHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzS2V5ID0gdC5rZXkgPT09IGtleTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0tleSkge1xuICAgICAgICAgICAgICAgICAgICBzYWZlSW52b2tlKHQub25EaXNtaXNzLCB0aW1lb3V0RXhwaXJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhbWF0Y2hlc0tleTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnN0YXRlLnRvYXN0cy5tYXAoKHQpID0+IHNhZmVJbnZva2UodC5vbkRpc21pc3MsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b2FzdHM6IFtdIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUb2FzdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnRvYXN0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICAvLyAkcHQtdHJhbnNpdGlvbi1kdXJhdGlvbiAqIDMgKyAkcHQtdHJhbnNpdGlvbi1kdXJhdGlvbiAvIDJcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5UT0FTVF9DT05UQUlORVIsIHRoaXMuZ2V0UG9zaXRpb25DbGFzc2VzKCksIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxPdmVybGF5XG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0aGlzLnByb3BzLmF1dG9Gb2N1c31cbiAgICAgICAgICAgICAgICBjYW5Fc2NhcGVLZXlDbG9zZT17dGhpcy5wcm9wcy5jYW5Fc2NhcGVLZXlDbGVhcn1cbiAgICAgICAgICAgICAgICBjYW5PdXRzaWRlQ2xpY2tDbG9zZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgICAgIGVuZm9yY2VGb2N1cz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgaGFzQmFja2Ryb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLnRvYXN0cy5sZW5ndGggPiAwfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uPXszNTB9XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk5hbWU9XCJwdC10b2FzdFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUudG9hc3RzLm1hcCh0aGlzLnJlbmRlclRvYXN0LCB0aGlzKX1cbiAgICAgICAgICAgIDwvT3ZlcmxheT5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVQcm9wcyhwcm9wczogSVRvYXN0ZXJQcm9wcykge1xuICAgICAgICBpZiAocHJvcHMucG9zaXRpb24gPT09IFBvc2l0aW9uLkxFRlQgfHwgcHJvcHMucG9zaXRpb24gPT09IFBvc2l0aW9uLlJJR0hUKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb2FzdGVyIGRvZXMgbm90IHN1cHBvcnQgTEVGVCBvciBSSUdIVCBwb3NpdGlvbnMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJUb2FzdCh0b2FzdDogSVRvYXN0T3B0aW9ucykge1xuICAgICAgICByZXR1cm4gPFRvYXN0IHsuLi50b2FzdH0gb25EaXNtaXNzPXt0aGlzLmdldERpc21pc3NIYW5kbGVyKHRvYXN0KX0gLz47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQb3NpdGlvbkNsYXNzZXMoKSB7XG4gICAgICAgIGNvbnN0IHBvc2l0aW9ucyA9IFBvc2l0aW9uW3RoaXMucHJvcHMucG9zaXRpb25dLnNwbGl0KFwiX1wiKTtcbiAgICAgICAgLy8gTk9URSB0aGF0IHRoZXJlIGlzIG5vIC1jZW50ZXIgY2xhc3MgYmVjYXVzZSB0aGF0J3MgdGhlIGRlZmF1bHQgc3R5bGVcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9ucy5tYXAoKHApID0+IGAke0NsYXNzZXMuVE9BU1RfQ09OVEFJTkVSfS0ke3AudG9Mb3dlckNhc2UoKX1gKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldERpc21pc3NIYW5kbGVyID0gKHRvYXN0OiBJVG9hc3RPcHRpb25zKSA9PiAodGltZW91dEV4cGlyZWQ6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgdGhpcy5kaXNtaXNzKHRvYXN0LmtleSwgdGltZW91dEV4cGlyZWQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ2xvc2UgPSAoZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgLy8gTk9URSB0aGF0IGBlYCBpc24ndCBhbHdheXMgYSBLZXlib2FyZEV2ZW50IGJ1dCB0aGF0J3MgdGhlIG9ubHkgdHlwZSB3ZSBjYXJlIGFib3V0XG4gICAgICAgIGlmIChlLndoaWNoID09PSBFU0NBUEUpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
