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
var props_1 = require("../../common/props");
var utils_1 = require("../../common/utils");
var Classes = require("../../common/classes");
var Tag = (function (_super) {
    __extends(Tag, _super);
    function Tag() {
        _super.apply(this, arguments);
        this.displayName = "Blueprint.Tag";
    }
    Tag.prototype.render = function () {
        var _a = this.props, className = _a.className, intent = _a.intent, onRemove = _a.onRemove;
        var tagClasses = classNames(Classes.TAG, Classes.intentClass(intent), (_b = {},
            _b[Classes.TAG_REMOVABLE] = onRemove != null,
            _b
        ), className);
        return (React.createElement("span", __assign({}, props_1.removeNonHTMLProps(this.props), {className: tagClasses}), 
            this.props.children, 
            utils_1.isFunction(onRemove) ? React.createElement("button", {className: Classes.TAG_REMOVE, onClick: onRemove}) : null));
        var _b;
    };
    Tag = __decorate([
        PureRender
    ], Tag);
    return Tag;
}(React.Component));
exports.Tag = Tag;
exports.TagFactory = React.createFactory(Tag);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RhZy90YWcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLHNCQUF5RCxvQkFBb0IsQ0FBQyxDQUFBO0FBQzlFLHNCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBRWhELElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFXaEQ7SUFBeUIsdUJBQThCO0lBQXZEO1FBQXlCLDhCQUE4QjtRQUM1QyxnQkFBVyxHQUFHLGVBQWUsQ0FBQztJQWV6QyxDQUFDO0lBYlUsb0JBQU0sR0FBYjtRQUNJLElBQUEsZUFBa0QsRUFBMUMsd0JBQVMsRUFBRSxrQkFBTSxFQUFFLHNCQUFRLENBQWdCO1FBQ25ELElBQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEUsR0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUUsUUFBUSxJQUFJLElBQUk7O1NBQzVDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFZCxNQUFNLENBQUMsQ0FDSCxxQkFBQyxJQUFJLGdCQUFLLDBCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRSxTQUFTLEVBQUUsVUFBVztZQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVM7WUFDcEIsa0JBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxxQkFBQyxNQUFNLElBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxVQUFXLEVBQUMsT0FBTyxFQUFFLFFBQVMsRUFBRyxHQUFHLElBQUssQ0FDekYsQ0FDVixDQUFDOztJQUNOLENBQUM7SUFoQkw7UUFBQyxVQUFVO1dBQUE7SUFpQlgsVUFBQztBQUFELENBaEJBLEFBZ0JDLENBaEJ3QixLQUFLLENBQUMsU0FBUyxHQWdCdkM7QUFoQlksV0FBRyxNQWdCZixDQUFBO0FBRVksa0JBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvdGFnL3RhZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgSUludGVudFByb3BzLCBJUHJvcHMsIHJlbW92ZU5vbkhUTUxQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcbmltcG9ydCB7IGlzRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XG5cbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRhZ1Byb3BzIGV4dGVuZHMgSVByb3BzLCBJSW50ZW50UHJvcHMsIFJlYWN0LkhUTUxQcm9wczxIVE1MU3BhbkVsZW1lbnQ+IHtcbiAgICAvKipcbiAgICAgKiBDbGljayBoYW5kbGVyIGZvciByZW1vdmUgYnV0dG9uLlxuICAgICAqIEJ1dHRvbiB3aWxsIG9ubHkgYmUgcmVuZGVyZWQgaWYgdGhpcyBwcm9wIGlzIGRlZmluZWQuXG4gICAgICovXG4gICAgb25SZW1vdmU/OiAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MU3BhbkVsZW1lbnQ+KSA9PiB2b2lkO1xufVxuXG5AUHVyZVJlbmRlclxuZXhwb3J0IGNsYXNzIFRhZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJVGFnUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIGRpc3BsYXlOYW1lID0gXCJCbHVlcHJpbnQuVGFnXCI7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNsYXNzTmFtZSwgaW50ZW50LCBvblJlbW92ZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgdGFnQ2xhc3NlcyA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5UQUcsIENsYXNzZXMuaW50ZW50Q2xhc3MoaW50ZW50KSwge1xuICAgICAgICAgICAgW0NsYXNzZXMuVEFHX1JFTU9WQUJMRV06IG9uUmVtb3ZlICE9IG51bGwsXG4gICAgICAgIH0sIGNsYXNzTmFtZSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxzcGFuIHsuLi5yZW1vdmVOb25IVE1MUHJvcHModGhpcy5wcm9wcyl9IGNsYXNzTmFtZT17dGFnQ2xhc3Nlc30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAge2lzRnVuY3Rpb24ob25SZW1vdmUpID8gPGJ1dHRvbiBjbGFzc05hbWU9e0NsYXNzZXMuVEFHX1JFTU9WRX0gb25DbGljaz17b25SZW1vdmV9IC8+IDogbnVsbH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBUYWdGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShUYWcpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
