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
var classNames = require("classnames");
var React = require("react");
var Classes = require("../../common/classes");
var MenuDivider = (function (_super) {
    __extends(MenuDivider, _super);
    function MenuDivider() {
        _super.apply(this, arguments);
    }
    MenuDivider.prototype.render = function () {
        var _a = this.props, className = _a.className, title = _a.title;
        if (title == null) {
            // simple divider
            return React.createElement("li", {className: classNames(Classes.MENU_DIVIDER, className)});
        }
        else {
            // section header with title
            return React.createElement("li", {className: classNames(Classes.MENU_HEADER, className)}, 
                React.createElement("h6", null, title)
            );
        }
    };
    MenuDivider.displayName = "Blueprint.MenuDivider";
    return MenuDivider;
}(React.Component));
exports.MenuDivider = MenuDivider;
exports.MenuDividerFactory = React.createFactory(MenuDivider);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL21lbnUvbWVudURpdmlkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0IsSUFBWSxPQUFPLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQVFoRDtJQUFpQywrQkFBc0M7SUFBdkU7UUFBaUMsOEJBQXNDO0lBYXZFLENBQUM7SUFWVSw0QkFBTSxHQUFiO1FBQ0ksSUFBQSxlQUF1QyxFQUEvQix3QkFBUyxFQUFFLGdCQUFLLENBQWdCO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLGlCQUFpQjtZQUNqQixNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUUsRUFBRyxDQUFDO1FBQzFFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLDRCQUE0QjtZQUM1QixNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUU7Z0JBQUMscUJBQUMsRUFBRSxTQUFFLEtBQU0sQ0FBSzthQUFLLENBQUM7UUFDNUYsQ0FBQztJQUNMLENBQUM7SUFYYSx1QkFBVyxHQUFHLHVCQUF1QixDQUFDO0lBWXhELGtCQUFDO0FBQUQsQ0FiQSxBQWFDLENBYmdDLEtBQUssQ0FBQyxTQUFTLEdBYS9DO0FBYlksbUJBQVcsY0FhdkIsQ0FBQTtBQUVZLDBCQUFrQixHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9tZW51L21lbnVEaXZpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE1IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJTWVudURpdmlkZXJQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqIE9wdGlvbmFsIGhlYWRlciB0aXRsZSAqL1xuICAgIHRpdGxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgTWVudURpdmlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SU1lbnVEaXZpZGVyUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50Lk1lbnVEaXZpZGVyXCI7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGNsYXNzTmFtZSwgdGl0bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmICh0aXRsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBzaW1wbGUgZGl2aWRlclxuICAgICAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5NRU5VX0RJVklERVIsIGNsYXNzTmFtZSl9IC8+O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gc2VjdGlvbiBoZWFkZXIgd2l0aCB0aXRsZVxuICAgICAgICAgICAgcmV0dXJuIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5NRU5VX0hFQURFUiwgY2xhc3NOYW1lKX0+PGg2Pnt0aXRsZX08L2g2PjwvbGk+O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTWVudURpdmlkZXJGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShNZW51RGl2aWRlcik7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
