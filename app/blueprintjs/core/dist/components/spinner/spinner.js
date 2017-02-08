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
var Classes = require("../../common/classes");
var utils_1 = require("../../common/utils");
// see http://stackoverflow.com/a/18473154/3124288 for calculating arc path
var SPINNER_TRACK = "M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89";
// unitless total length of SVG path, to which stroke-dash* properties are relative.
// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/pathLength
// this value is the result of `<path d={SPINNER_TRACK} />.getTotalLength()` and works in all browsers:
var PATH_LENGTH = 280;
var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        _super.apply(this, arguments);
    }
    Spinner.prototype.render = function () {
        var _a = this.props, className = _a.className, intent = _a.intent, value = _a.value;
        var classes = classNames(Classes.SPINNER, Classes.intentClass(intent), {
            "pt-no-spin": value != null,
        }, className);
        var style = {
            strokeDasharray: PATH_LENGTH + " " + PATH_LENGTH,
            // default to quarter-circle when indeterminate
            // IE11: CSS transitions on SVG elements are Not Supported :(
            strokeDashoffset: PATH_LENGTH - PATH_LENGTH * (value == null ? 0.25 : utils_1.clamp(value, 0, 1)),
        };
        // HACKHACK to temporarily squash error regarding React.SVGProps missing prop pathLength
        var headElement = React.createElement("path", {
            className: "pt-spinner-head",
            d: SPINNER_TRACK,
            pathLength: PATH_LENGTH,
            style: style,
        });
        return this.renderContainer(classes, React.createElement("svg", {viewBox: classes.indexOf(Classes.SMALL) >= 0 ? "-15 -15 130 130" : "0 0 100 100"}, 
            React.createElement("path", {className: "pt-spinner-track", d: SPINNER_TRACK}), 
            headElement));
    };
    // abstract away the container elements so SVGSpinner can do its own thing
    Spinner.prototype.renderContainer = function (classes, content) {
        return (React.createElement("div", {className: classes}, 
            React.createElement("div", {className: "pt-spinner-svg-container"}, content)
        ));
    };
    Spinner.displayName = "Blueprint.Spinner";
    Spinner = __decorate([
        PureRender
    ], Spinner);
    return Spinner;
}(React.Component));
exports.Spinner = Spinner;
exports.SpinnerFactory = React.createFactory(Spinner);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFFaEQsc0JBQXNCLG9CQUFvQixDQUFDLENBQUE7QUFFM0MsMkVBQTJFO0FBQzNFLElBQU0sYUFBYSxHQUFHLGtFQUFrRSxDQUFDO0FBRXpGLG9GQUFvRjtBQUNwRix3RUFBd0U7QUFDeEUsdUdBQXVHO0FBQ3ZHLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQztBQVl4QjtJQUE2QiwyQkFBa0M7SUFBL0Q7UUFBNkIsOEJBQWtDO0lBMEMvRCxDQUFDO0lBdkNVLHdCQUFNLEdBQWI7UUFDSSxJQUFBLGVBQStDLEVBQXZDLHdCQUFTLEVBQUUsa0JBQU0sRUFBRSxnQkFBSyxDQUFnQjtRQUNoRCxJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JFLFlBQVksRUFBRSxLQUFLLElBQUksSUFBSTtTQUM5QixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRWQsSUFBTSxLQUFLLEdBQXdCO1lBQy9CLGVBQWUsRUFBSyxXQUFXLFNBQUksV0FBYTtZQUNoRCwrQ0FBK0M7WUFDL0MsNkRBQTZEO1lBQzdELGdCQUFnQixFQUFFLFdBQVcsR0FBRyxXQUFXLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxhQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1RixDQUFDO1FBRUYsd0ZBQXdGO1FBQ3hGLElBQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQzVDLFNBQVMsRUFBRSxpQkFBaUI7WUFDNUIsQ0FBQyxFQUFFLGFBQWE7WUFDaEIsVUFBVSxFQUFFLFdBQVc7WUFDdkIsWUFBSztTQUNSLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFDL0IscUJBQUMsR0FBRyxJQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLEdBQUcsYUFBYztZQUNsRixxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFDLGtCQUFrQixFQUFDLENBQUMsRUFBRSxhQUFjLEVBQUc7WUFDdEQsV0FBWSxDQUNYLENBQ1QsQ0FBQztJQUNOLENBQUM7SUFFRCwwRUFBMEU7SUFDaEUsaUNBQWUsR0FBekIsVUFBMEIsT0FBZSxFQUFFLE9BQW9CO1FBQzNELE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBUTtZQUNwQixxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLDBCQUEwQixHQUNwQyxPQUFRLENBQ1A7U0FDSixDQUNULENBQUM7SUFDTixDQUFDO0lBeENhLG1CQUFXLEdBQUcsbUJBQW1CLENBQUM7SUFGcEQ7UUFBQyxVQUFVO2VBQUE7SUEyQ1gsY0FBQztBQUFELENBMUNBLEFBMENDLENBMUM0QixLQUFLLENBQUMsU0FBUyxHQTBDM0M7QUExQ1ksZUFBTyxVQTBDbkIsQ0FBQTtBQUVZLHNCQUFjLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL3NwaW5uZXIvc3Bpbm5lci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IElJbnRlbnRQcm9wcywgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0IHsgY2xhbXAgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XG5cbi8vIHNlZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xODQ3MzE1NC8zMTI0Mjg4IGZvciBjYWxjdWxhdGluZyBhcmMgcGF0aFxuY29uc3QgU1BJTk5FUl9UUkFDSyA9IFwiTSA1MCw1MCBtIDAsLTQ0LjUgYSA0NC41LDQ0LjUgMCAxIDEgMCw4OSBhIDQ0LjUsNDQuNSAwIDEgMSAwLC04OVwiO1xuXG4vLyB1bml0bGVzcyB0b3RhbCBsZW5ndGggb2YgU1ZHIHBhdGgsIHRvIHdoaWNoIHN0cm9rZS1kYXNoKiBwcm9wZXJ0aWVzIGFyZSByZWxhdGl2ZS5cbi8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1NWRy9BdHRyaWJ1dGUvcGF0aExlbmd0aFxuLy8gdGhpcyB2YWx1ZSBpcyB0aGUgcmVzdWx0IG9mIGA8cGF0aCBkPXtTUElOTkVSX1RSQUNLfSAvPi5nZXRUb3RhbExlbmd0aCgpYCBhbmQgd29ya3MgaW4gYWxsIGJyb3dzZXJzOlxuY29uc3QgUEFUSF9MRU5HVEggPSAyODA7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNwaW5uZXJQcm9wcyBleHRlbmRzIElQcm9wcywgSUludGVudFByb3BzIHtcbiAgICAvKipcbiAgICAgKiBBIHZhbHVlIGJldHdlZW4gMCBhbmQgMSAoaW5jbHVzaXZlKSByZXByZXNlbnRpbmcgaG93IGZhciBhbG9uZyB0aGUgb3BlcmF0aW9uIGlzLlxuICAgICAqIFZhbHVlcyBiZWxvdyAwIG9yIGFib3ZlIDEgd2lsbCBiZSBpbnRlcnByZXRlZCBhcyAwIG9yIDEgcmVzcGVjdGl2ZWx5LlxuICAgICAqIE9taXR0aW5nIHRoaXMgcHJvcCB3aWxsIHJlc3VsdCBpbiBhbiBcImluZGV0ZXJtaW5hdGVcIiBzcGlubmVyIHdoZXJlIHRoZSBoZWFkIHNwaW5zIGluZGVmaW5pdGVseS5cbiAgICAgKi9cbiAgICB2YWx1ZT86IG51bWJlcjtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBTcGlubmVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElTcGlubmVyUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LlNwaW5uZXJcIjtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBpbnRlbnQsIHZhbHVlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NOYW1lcyhDbGFzc2VzLlNQSU5ORVIsIENsYXNzZXMuaW50ZW50Q2xhc3MoaW50ZW50KSwge1xuICAgICAgICAgICAgXCJwdC1uby1zcGluXCI6IHZhbHVlICE9IG51bGwsXG4gICAgICAgIH0sIGNsYXNzTmFtZSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICBzdHJva2VEYXNoYXJyYXk6IGAke1BBVEhfTEVOR1RIfSAke1BBVEhfTEVOR1RIfWAsXG4gICAgICAgICAgICAvLyBkZWZhdWx0IHRvIHF1YXJ0ZXItY2lyY2xlIHdoZW4gaW5kZXRlcm1pbmF0ZVxuICAgICAgICAgICAgLy8gSUUxMTogQ1NTIHRyYW5zaXRpb25zIG9uIFNWRyBlbGVtZW50cyBhcmUgTm90IFN1cHBvcnRlZCA6KFxuICAgICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldDogUEFUSF9MRU5HVEggLSBQQVRIX0xFTkdUSCAqICh2YWx1ZSA9PSBudWxsID8gMC4yNSA6IGNsYW1wKHZhbHVlLCAwLCAxKSksXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gSEFDS0hBQ0sgdG8gdGVtcG9yYXJpbHkgc3F1YXNoIGVycm9yIHJlZ2FyZGluZyBSZWFjdC5TVkdQcm9wcyBtaXNzaW5nIHByb3AgcGF0aExlbmd0aFxuICAgICAgICBjb25zdCBoZWFkRWxlbWVudCA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwdC1zcGlubmVyLWhlYWRcIixcbiAgICAgICAgICAgIGQ6IFNQSU5ORVJfVFJBQ0ssXG4gICAgICAgICAgICBwYXRoTGVuZ3RoOiBQQVRIX0xFTkdUSCxcbiAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDb250YWluZXIoY2xhc3NlcyxcbiAgICAgICAgICAgIDxzdmcgdmlld0JveD17Y2xhc3Nlcy5pbmRleE9mKENsYXNzZXMuU01BTEwpID49IDAgPyBcIi0xNSAtMTUgMTMwIDEzMFwiIDogXCIwIDAgMTAwIDEwMFwifT5cbiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzc05hbWU9XCJwdC1zcGlubmVyLXRyYWNrXCIgZD17U1BJTk5FUl9UUkFDS30gLz5cbiAgICAgICAgICAgICAgICB7aGVhZEVsZW1lbnR9XG4gICAgICAgICAgICA8L3N2Zz4sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gYWJzdHJhY3QgYXdheSB0aGUgY29udGFpbmVyIGVsZW1lbnRzIHNvIFNWR1NwaW5uZXIgY2FuIGRvIGl0cyBvd24gdGhpbmdcbiAgICBwcm90ZWN0ZWQgcmVuZGVyQ29udGFpbmVyKGNsYXNzZXM6IHN0cmluZywgY29udGVudDogSlNYLkVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LXNwaW5uZXItc3ZnLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFNwaW5uZXJGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShTcGlubmVyKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
