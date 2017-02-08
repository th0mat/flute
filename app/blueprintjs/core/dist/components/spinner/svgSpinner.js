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
var classNames = require("classnames");
var React = require("react");
var Classes = require("../../common/classes");
// import * to avoid "cannot be named" error on factory
var spinner = require("./spinner");
var SVGSpinner = (function (_super) {
    __extends(SVGSpinner, _super);
    function SVGSpinner() {
        _super.apply(this, arguments);
    }
    SVGSpinner.prototype.renderContainer = function (classes, content) {
        return (React.createElement("g", {className: classNames(Classes.SVG_SPINNER, classes)}, 
            React.createElement("g", {className: "pt-svg-spinner-transform-group"}, content)
        ));
    };
    return SVGSpinner;
}(spinner.Spinner));
exports.SVGSpinner = SVGSpinner;
exports.SVGSpinnerFactory = React.createFactory(SVGSpinner);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvc3ZnU3Bpbm5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELHVEQUF1RDtBQUN2RCxJQUFZLE9BQU8sV0FBTSxXQUFXLENBQUMsQ0FBQTtBQUVyQztJQUFnQyw4QkFBZTtJQUEvQztRQUFnQyw4QkFBZTtJQVUvQyxDQUFDO0lBVGEsb0NBQWUsR0FBekIsVUFBMEIsT0FBZSxFQUFFLE9BQW9CO1FBQzNELE1BQU0sQ0FBQyxDQUNILHFCQUFDLENBQUMsSUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFFO1lBQ25ELHFCQUFDLENBQUMsSUFBQyxTQUFTLEVBQUMsZ0NBQWdDLEdBQ3hDLE9BQVEsQ0FDVDtTQUNKLENBQ1AsQ0FBQztJQUNOLENBQUM7SUFDTCxpQkFBQztBQUFELENBVkEsQUFVQyxDQVYrQixPQUFPLENBQUMsT0FBTyxHQVU5QztBQVZZLGtCQUFVLGFBVXRCLENBQUE7QUFFWSx5QkFBaUIsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvc3Bpbm5lci9zdmdTcGlubmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbi8vIGltcG9ydCAqIHRvIGF2b2lkIFwiY2Fubm90IGJlIG5hbWVkXCIgZXJyb3Igb24gZmFjdG9yeVxuaW1wb3J0ICogYXMgc3Bpbm5lciBmcm9tIFwiLi9zcGlubmVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTVkdTcGlubmVyIGV4dGVuZHMgc3Bpbm5lci5TcGlubmVyIHtcbiAgICBwcm90ZWN0ZWQgcmVuZGVyQ29udGFpbmVyKGNsYXNzZXM6IHN0cmluZywgY29udGVudDogSlNYLkVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxnIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhDbGFzc2VzLlNWR19TUElOTkVSLCBjbGFzc2VzKX0+XG4gICAgICAgICAgICAgICAgPGcgY2xhc3NOYW1lPVwicHQtc3ZnLXNwaW5uZXItdHJhbnNmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBTVkdTcGlubmVyRmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoU1ZHU3Bpbm5lcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
