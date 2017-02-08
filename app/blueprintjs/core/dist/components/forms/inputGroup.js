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
var Classes = require("../../common/classes");
var props_1 = require("../../common/props");
var InputGroup = (function (_super) {
    __extends(InputGroup, _super);
    function InputGroup() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            rightElementWidth: 30,
        };
        this.refHandlers = {
            rightElement: function (ref) { return _this.rightElement = ref; },
        };
    }
    InputGroup.prototype.render = function () {
        var _a = this.props, className = _a.className, intent = _a.intent, leftIconName = _a.leftIconName;
        var classes = classNames(Classes.INPUT_GROUP, Classes.intentClass(intent), (_b = {},
            _b[Classes.DISABLED] = this.props.disabled,
            _b
        ), className);
        var style = { paddingRight: this.state.rightElementWidth };
        return (React.createElement("div", {className: classes}, 
            leftIconName == null ? null : React.createElement("span", {className: "pt-icon " + Classes.iconClass(leftIconName)}), 
            React.createElement("input", __assign({type: "text"}, props_1.removeNonHTMLProps(this.props), {className: Classes.INPUT, ref: this.props.inputRef, style: style})), 
            this.maybeRenderRightElement()));
        var _b;
    };
    InputGroup.prototype.componentDidMount = function () {
        this.updateInputWidth();
    };
    InputGroup.prototype.componentDidUpdate = function () {
        this.updateInputWidth();
    };
    InputGroup.prototype.maybeRenderRightElement = function () {
        var rightElement = this.props.rightElement;
        if (rightElement == null) {
            return undefined;
        }
        return React.createElement("span", {className: "pt-input-action", ref: this.refHandlers.rightElement}, rightElement);
    };
    InputGroup.prototype.updateInputWidth = function () {
        if (this.rightElement != null) {
            var clientWidth = this.rightElement.clientWidth;
            // small threshold to prevent infinite loops
            if (Math.abs(clientWidth - this.state.rightElementWidth) > 2) {
                this.setState({ rightElementWidth: clientWidth });
            }
        }
    };
    InputGroup.displayName = "Blueprint.InputGroup";
    InputGroup = __decorate([
        PureRender
    ], InputGroup);
    return InputGroup;
}(React.Component));
exports.InputGroup = InputGroup;
exports.InputGroupFactory = React.createFactory(InputGroup);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2Zvcm1zL2lucHV0R3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsc0JBQTJGLG9CQUFvQixDQUFDLENBQUE7QUFxQ2hIO0lBQWdDLDhCQUFvRTtJQUFwRztRQUFBLGlCQTZEQztRQTdEK0IsOEJBQW9FO1FBR3pGLFVBQUssR0FBcUI7WUFDN0IsaUJBQWlCLEVBQUUsRUFBRTtTQUN4QixDQUFDO1FBR00sZ0JBQVcsR0FBRztZQUNsQixZQUFZLEVBQUUsVUFBQyxHQUFvQixJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQXZCLENBQXVCO1NBQ2xFLENBQUM7SUFtRE4sQ0FBQztJQWpEVSwyQkFBTSxHQUFiO1FBQ0ksSUFBQSxlQUFzRCxFQUE5Qyx3QkFBUyxFQUFFLGtCQUFNLEVBQUUsOEJBQVksQ0FBZ0I7UUFDdkQsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN6RSxHQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7O1NBQzFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDZCxJQUFNLEtBQUssR0FBd0IsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRWxGLE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBUTtZQUNuQixZQUFZLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFFLGFBQVcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUksRUFBSTtZQUVqRyxxQkFBQyxLQUFLLGFBQ0YsSUFBSSxFQUFDLE1BQU0sR0FDUCwwQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQ2xDLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBTSxFQUN6QixHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLEVBQ3pCLEtBQUssRUFBRSxLQUFNLEdBQ2Y7WUFFRCxJQUFJLENBQUMsdUJBQXVCLEVBQUcsQ0FDOUIsQ0FDVCxDQUFDOztJQUNOLENBQUM7SUFFTSxzQ0FBaUIsR0FBeEI7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sdUNBQWtCLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLDRDQUF1QixHQUEvQjtRQUNZLDBDQUFZLENBQWdCO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUNELE1BQU0sQ0FBQyxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFDLGlCQUFpQixFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQWEsR0FBRSxZQUFhLENBQU8sQ0FBQztJQUN2RyxDQUFDO0lBRU8scUNBQWdCLEdBQXhCO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLCtDQUFXLENBQXVCO1lBQzFDLDRDQUE0QztZQUM1QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDdEQsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBM0RhLHNCQUFXLEdBQUcsc0JBQXNCLENBQUM7SUFGdkQ7UUFBQyxVQUFVO2tCQUFBO0lBOERYLGlCQUFDO0FBQUQsQ0E3REEsQUE2REMsQ0E3RCtCLEtBQUssQ0FBQyxTQUFTLEdBNkQ5QztBQTdEWSxrQkFBVSxhQTZEdEIsQ0FBQTtBQUVZLHlCQUFpQixHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9mb3Jtcy9pbnB1dEdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBQdXJlUmVuZGVyIGZyb20gXCJwdXJlLXJlbmRlci1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0IHsgSFRNTElucHV0UHJvcHMsIElDb250cm9sbGVkUHJvcHMsIElJbnRlbnRQcm9wcywgSVByb3BzLCByZW1vdmVOb25IVE1MUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlucHV0R3JvdXBQcm9wcyBleHRlbmRzIElDb250cm9sbGVkUHJvcHMsIElJbnRlbnRQcm9wcywgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBpbnB1dCBpcyBub24taW50ZXJhY3RpdmUuXG4gICAgICogTm90ZSB0aGF0IGByaWdodEVsZW1lbnRgIG11c3QgYmUgZGlzYWJsZWQgc2VwYXJhdGVseTsgdGhpcyBwcm9wIHdpbGwgbm90IGFmZmVjdCBpdC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcblxuICAgIC8qKiBSZWYgaGFuZGxlciB0aGF0IHJlY2VpdmVzIEhUTUwgYDxpbnB1dD5gIGVsZW1lbnQgYmFja2luZyB0aGlzIGNvbXBvbmVudC4gKi9cbiAgICBpbnB1dFJlZj86IChyZWY6IEhUTUxJbnB1dEVsZW1lbnQpID0+IGFueTtcblxuICAgIC8qKiBOYW1lIG9mIGljb24gKHRoZSBwYXJ0IGFmdGVyIGBwdC1pY29uLWApIHRvIHJlbmRlciBvbiBsZWZ0IHNpZGUgb2YgaW5wdXQuICovXG4gICAgbGVmdEljb25OYW1lPzogc3RyaW5nO1xuXG4gICAgLyoqIFBsYWNlaG9sZGVyIHRleHQgaW4gdGhlIGFic2VuY2Ugb2YgYW55IHZhbHVlLiAqL1xuICAgIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogRWxlbWVudCB0byByZW5kZXIgb24gcmlnaHQgc2lkZSBvZiBpbnB1dC5cbiAgICAgKiBGb3IgYmVzdCByZXN1bHRzLCB1c2UgYSBtaW5pbWFsIGJ1dHRvbiBvciBhIHRhZy5cbiAgICAgKi9cbiAgICByaWdodEVsZW1lbnQ/OiBKU1guRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEhUTUwgYGlucHV0YCB0eXBlIGF0dHJpYnV0ZS5cbiAgICAgKiBAZGVmYXVsdCBcInRleHRcIlxuICAgICAqL1xuICAgIHR5cGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUlucHV0R3JvdXBTdGF0ZSB7XG4gICAgcmlnaHRFbGVtZW50V2lkdGg/OiBudW1iZXI7XG59XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgSW5wdXRHcm91cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxIVE1MSW5wdXRQcm9wcyAmIElJbnB1dEdyb3VwUHJvcHMsIElJbnB1dEdyb3VwU3RhdGU+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRpc3BsYXlOYW1lID0gXCJCbHVlcHJpbnQuSW5wdXRHcm91cFwiO1xuXG4gICAgcHVibGljIHN0YXRlOiBJSW5wdXRHcm91cFN0YXRlID0ge1xuICAgICAgICByaWdodEVsZW1lbnRXaWR0aDogMzAsXG4gICAgfTtcblxuICAgIHByaXZhdGUgcmlnaHRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHJlZkhhbmRsZXJzID0ge1xuICAgICAgICByaWdodEVsZW1lbnQ6IChyZWY6IEhUTUxTcGFuRWxlbWVudCkgPT4gdGhpcy5yaWdodEVsZW1lbnQgPSByZWYsXG4gICAgfTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBpbnRlbnQsIGxlZnRJY29uTmFtZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5JTlBVVF9HUk9VUCwgQ2xhc3Nlcy5pbnRlbnRDbGFzcyhpbnRlbnQpLCB7XG4gICAgICAgICAgICBbQ2xhc3Nlcy5ESVNBQkxFRF06IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICAgIH0sIGNsYXNzTmFtZSk7XG4gICAgICAgIGNvbnN0IHN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0geyBwYWRkaW5nUmlnaHQ6IHRoaXMuc3RhdGUucmlnaHRFbGVtZW50V2lkdGggfTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxuICAgICAgICAgICAgICAgIHtsZWZ0SWNvbk5hbWUgPT0gbnVsbCA/IG51bGwgOiA8c3BhbiBjbGFzc05hbWU9e2BwdC1pY29uICR7Q2xhc3Nlcy5pY29uQ2xhc3MobGVmdEljb25OYW1lKX1gfSAvPn1cblxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHsuLi5yZW1vdmVOb25IVE1MUHJvcHModGhpcy5wcm9wcyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Q2xhc3Nlcy5JTlBVVH1cbiAgICAgICAgICAgICAgICAgICAgcmVmPXt0aGlzLnByb3BzLmlucHV0UmVmfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIHt0aGlzLm1heWJlUmVuZGVyUmlnaHRFbGVtZW50KCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXRXaWR0aCgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJSaWdodEVsZW1lbnQoKSB7XG4gICAgICAgIGNvbnN0IHsgcmlnaHRFbGVtZW50IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAocmlnaHRFbGVtZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cInB0LWlucHV0LWFjdGlvblwiIHJlZj17dGhpcy5yZWZIYW5kbGVycy5yaWdodEVsZW1lbnR9PntyaWdodEVsZW1lbnR9PC9zcGFuPjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0V2lkdGgoKSB7XG4gICAgICAgIGlmICh0aGlzLnJpZ2h0RWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNsaWVudFdpZHRoIH0gPSB0aGlzLnJpZ2h0RWxlbWVudDtcbiAgICAgICAgICAgIC8vIHNtYWxsIHRocmVzaG9sZCB0byBwcmV2ZW50IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMoY2xpZW50V2lkdGggLSB0aGlzLnN0YXRlLnJpZ2h0RWxlbWVudFdpZHRoKSA+IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcmlnaHRFbGVtZW50V2lkdGg6IGNsaWVudFdpZHRoIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgSW5wdXRHcm91cEZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KElucHV0R3JvdXApO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
