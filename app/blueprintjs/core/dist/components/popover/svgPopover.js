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
var React = require("react");
var popover_1 = require("./popover");
var SVGPopover = (function (_super) {
    __extends(SVGPopover, _super);
    function SVGPopover() {
        _super.apply(this, arguments);
    }
    SVGPopover.prototype.render = function () {
        return React.createElement(popover_1.Popover, __assign({rootElementTag: "g"}, this.props), this.props.children);
    };
    return SVGPopover;
}(React.Component));
exports.SVGPopover = SVGPopover;
exports.SVGPopoverFactory = React.createFactory(SVGPopover);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvc3ZnUG9wb3Zlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7OztBQUVILElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLHdCQUF1QyxXQUFXLENBQUMsQ0FBQTtBQUVuRDtJQUFnQyw4QkFBa0M7SUFBbEU7UUFBZ0MsOEJBQWtDO0lBSWxFLENBQUM7SUFIVSwyQkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLG9CQUFDLGlCQUFPLFlBQUMsY0FBYyxFQUFDLEdBQUcsR0FBSyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFVLENBQUM7SUFDdkYsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FKQSxBQUlDLENBSitCLEtBQUssQ0FBQyxTQUFTLEdBSTlDO0FBSlksa0JBQVUsYUFJdEIsQ0FBQTtBQUVZLHlCQUFpQixHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9wb3BvdmVyL3N2Z1BvcG92ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBJUG9wb3ZlclByb3BzLCBQb3BvdmVyIH0gZnJvbSBcIi4vcG9wb3ZlclwiO1xuXG5leHBvcnQgY2xhc3MgU1ZHUG9wb3ZlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJUG9wb3ZlclByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8UG9wb3ZlciByb290RWxlbWVudFRhZz1cImdcIiB7Li4udGhpcy5wcm9wc30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9Qb3BvdmVyPjtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBTVkdQb3BvdmVyRmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoU1ZHUG9wb3Zlcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
