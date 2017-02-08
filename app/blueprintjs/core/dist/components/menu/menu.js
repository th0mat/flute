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
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.apply(this, arguments);
    }
    Menu.prototype.render = function () {
        return React.createElement("ul", {className: classNames(Classes.MENU, this.props.className)}, this.props.children);
    };
    Menu.displayName = "Blueprint.Menu";
    return Menu;
}(React.Component));
exports.Menu = Menu;
exports.MenuFactory = React.createFactory(Menu);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL21lbnUvbWVudS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBTWhEO0lBQTBCLHdCQUErQjtJQUF6RDtRQUEwQiw4QkFBK0I7SUFNekQsQ0FBQztJQUhVLHFCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMscUJBQUMsRUFBRSxJQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBRSxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUFLLENBQUM7SUFDckcsQ0FBQztJQUphLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7SUFLakQsV0FBQztBQUFELENBTkEsQUFNQyxDQU55QixLQUFLLENBQUMsU0FBUyxHQU14QztBQU5ZLFlBQUksT0FNaEIsQ0FBQTtBQUVZLG1CQUFXLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL21lbnUvbWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgeyBJUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU1lbnVQcm9wcyBleHRlbmRzIElQcm9wcyB7XG59XG5cbmV4cG9ydCBjbGFzcyBNZW51IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElNZW51UHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50Lk1lbnVcIjtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dWwgY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuTUVOVSwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L3VsPjtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBNZW51RmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoTWVudSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
