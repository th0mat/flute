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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var Classes = require("../../common/classes");
var NonIdealState = (function (_super) {
    __extends(NonIdealState, _super);
    function NonIdealState() {
        _super.apply(this, arguments);
    }
    NonIdealState.prototype.render = function () {
        return (React.createElement("div", {className: classNames(Classes.NON_IDEAL_STATE, this.props.className)}, 
            this.maybeRenderVisual(), 
            this.maybeRenderTitle(), 
            this.maybeRenderDescription(), 
            this.maybeRenderAction()));
    };
    NonIdealState.prototype.maybeRenderAction = function () {
        if (this.props.action == null) {
            return undefined;
        }
        return React.createElement("div", {className: Classes.NON_IDEAL_STATE_ACTION}, this.props.action);
    };
    NonIdealState.prototype.maybeRenderDescription = function () {
        if (this.props.description == null) {
            return undefined;
        }
        return React.createElement("div", {className: Classes.NON_IDEAL_STATE_DESCRIPTION}, this.props.description);
    };
    NonIdealState.prototype.maybeRenderTitle = function () {
        if (this.props.title == null) {
            return undefined;
        }
        return React.createElement("h4", {className: Classes.NON_IDEAL_STATE_TITLE}, this.props.title);
    };
    NonIdealState.prototype.maybeRenderVisual = function () {
        var visual = this.props.visual;
        if (visual == null) {
            return undefined;
        }
        else if (typeof visual === "string") {
            return (React.createElement("div", {className: classNames(Classes.NON_IDEAL_STATE_VISUAL, Classes.NON_IDEAL_STATE_ICON)}, 
                React.createElement("span", {className: classNames("pt-icon", Classes.iconClass(visual))})
            ));
        }
        else {
            return (React.createElement("div", {className: Classes.NON_IDEAL_STATE_VISUAL}, visual));
        }
    };
    NonIdealState = __decorate([
        PureRender
    ], NonIdealState);
    return NonIdealState;
}(React.Component));
exports.NonIdealState = NonIdealState;
exports.NonIdealStateFactory = React.createFactory(NonIdealState);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL25vbi1pZGVhbC1zdGF0ZS9ub25JZGVhbFN0YXRlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0IsSUFBWSxPQUFPLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQTBCaEQ7SUFBbUMsaUNBQXdDO0lBQTNFO1FBQW1DLDhCQUF3QztJQXNEM0UsQ0FBQztJQXJEVSw4QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLENBQ0gscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBRTtZQUNyRSxJQUFJLENBQUMsaUJBQWlCLEVBQUc7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixFQUFHO1lBQ3hCLElBQUksQ0FBQyxzQkFBc0IsRUFBRztZQUM5QixJQUFJLENBQUMsaUJBQWlCLEVBQUcsQ0FDeEIsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUVPLHlDQUFpQixHQUF6QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTSxDQUFDLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLHNCQUF1QixHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTyxDQUFNLENBQUM7SUFDckYsQ0FBQztJQUVPLDhDQUFzQixHQUE5QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTSxDQUFDLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLDJCQUE0QixHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBWSxDQUFNLENBQUM7SUFDL0YsQ0FBQztJQUVPLHdDQUFnQixHQUF4QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTSxDQUFDLHFCQUFDLEVBQUUsSUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLHFCQUFzQixHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBTSxDQUFLLENBQUM7SUFDakYsQ0FBQztJQUVPLHlDQUFpQixHQUF6QjtRQUNZLDhCQUFNLENBQWdCO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUU7Z0JBQ3JGLHFCQUFDLElBQUksSUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFFLEVBQUU7YUFDbEUsQ0FDVCxDQUFDO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxDQUFDLENBQ0gscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsc0JBQXVCLEdBQzFDLE1BQU8sQ0FDTixDQUNULENBQUM7UUFDTixDQUFDO0lBQ0wsQ0FBQztJQXRETDtRQUFDLFVBQVU7cUJBQUE7SUF1RFgsb0JBQUM7QUFBRCxDQXREQSxBQXNEQyxDQXREa0MsS0FBSyxDQUFDLFNBQVMsR0FzRGpEO0FBdERZLHFCQUFhLGdCQXNEekIsQ0FBQTtBQUVZLDRCQUFvQixHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9ub24taWRlYWwtc3RhdGUvbm9uSWRlYWxTdGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJTm9uSWRlYWxTdGF0ZVByb3BzIGV4dGVuZHMgSVByb3BzIHtcbiAgICAvKlxuICAgICAqIEFuIGFjdGlvbiB0aGUgdXNlciBjYW4gdGFrZSB0byBjb3JyZWN0IHRoZSBub24taWRlYWwgc3RhdGUuXG4gICAgICovXG4gICAgYWN0aW9uPzogSlNYLkVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBBIGxvbmdlciBkZXNjcmlwdGlvbiBvZiB0aGUgY3VycmVudCBub24taWRlYWwgc3RhdGUuXG4gICAgICovXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBKU1guRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0aXRsZSBvZiB0aGUgY3VycmVudCBub24taWRlYWwgc3RhdGUuXG4gICAgICovXG4gICAgdGl0bGU/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBBIG5hbWUgb2YgYSBCbHVlcHJpbnQgaWNvbiB0byBkaXNwbGF5IG9yIGEgSlNYIEVsZW1lbnQgKHN1Y2ggYXMgYDxTcGlubmVyLz5gKS5cbiAgICAgKi9cbiAgICB2aXN1YWw/OiBzdHJpbmcgfCBKU1guRWxlbWVudDtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBOb25JZGVhbFN0YXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElOb25JZGVhbFN0YXRlUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuTk9OX0lERUFMX1NUQVRFLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9PlxuICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVyVmlzdWFsKCl9XG4gICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJUaXRsZSgpfVxuICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVyRGVzY3JpcHRpb24oKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckFjdGlvbigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckFjdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuYWN0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e0NsYXNzZXMuTk9OX0lERUFMX1NUQVRFX0FDVElPTn0+e3RoaXMucHJvcHMuYWN0aW9ufTwvZGl2PjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVyRGVzY3JpcHRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmRlc2NyaXB0aW9uID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e0NsYXNzZXMuTk9OX0lERUFMX1NUQVRFX0RFU0NSSVBUSU9OfT57dGhpcy5wcm9wcy5kZXNjcmlwdGlvbn08L2Rpdj47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlclRpdGxlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50aXRsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIDxoNCBjbGFzc05hbWU9e0NsYXNzZXMuTk9OX0lERUFMX1NUQVRFX1RJVExFfT57dGhpcy5wcm9wcy50aXRsZX08L2g0PjtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVyVmlzdWFsKCkge1xuICAgICAgICBjb25zdCB7IHZpc3VhbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKHZpc3VhbCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2aXN1YWwgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5OT05fSURFQUxfU1RBVEVfVklTVUFMLCBDbGFzc2VzLk5PTl9JREVBTF9TVEFURV9JQ09OKX0+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInB0LWljb25cIiwgQ2xhc3Nlcy5pY29uQ2xhc3ModmlzdWFsKSl9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDbGFzc2VzLk5PTl9JREVBTF9TVEFURV9WSVNVQUx9PlxuICAgICAgICAgICAgICAgICAgICB7dmlzdWFsfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE5vbklkZWFsU3RhdGVGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShOb25JZGVhbFN0YXRlKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
