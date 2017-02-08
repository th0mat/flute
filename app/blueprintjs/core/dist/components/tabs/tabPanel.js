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
var TabPanel = (function (_super) {
    __extends(TabPanel, _super);
    function TabPanel() {
        _super.apply(this, arguments);
        this.displayName = "Blueprint.TabPanel";
    }
    TabPanel.prototype.render = function () {
        return (React.createElement("div", {"aria-labelledby": this.props._tabId, className: classNames(Classes.TAB_PANEL, this.props.className), id: this.props._id, role: "tabpanel"}, this.props.children));
    };
    TabPanel = __decorate([
        PureRender
    ], TabPanel);
    return TabPanel;
}(React.Component));
exports.TabPanel = TabPanel;
exports.TabPanelFactory = React.createFactory(TabPanel);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFiUGFuZWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxVQUFVLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBaUJoRDtJQUE4Qiw0QkFBbUM7SUFBakU7UUFBOEIsOEJBQW1DO1FBQ3RELGdCQUFXLEdBQUcsb0JBQW9CLENBQUM7SUFjOUMsQ0FBQztJQVpVLHlCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLEtBQ0EsZUFBZSxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTyxFQUNuQyxTQUFTLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUUsRUFDL0QsRUFBRSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBSSxFQUNuQixJQUFJLEVBQUMsVUFBVSxHQUVkLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUNuQixDQUNULENBQUM7SUFDTixDQUFDO0lBZkw7UUFBQyxVQUFVO2dCQUFBO0lBZ0JYLGVBQUM7QUFBRCxDQWZBLEFBZUMsQ0FmNkIsS0FBSyxDQUFDLFNBQVMsR0FlNUM7QUFmWSxnQkFBUSxXQWVwQixDQUFBO0FBRVksdUJBQWUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvdGFicy90YWJQYW5lbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcblxuLy8gcHJvcGVydGllcyB3aXRoIHVuZGVyc2NvcmVzIHNob3VsZCBub3QgYmUgc2V0IGJ5IHVzZXJzICh3ZSBzZXQgdGhlbSBpbiB0aGUgPFRhYnM+IGNvbXBvbmVudCkuXG5leHBvcnQgaW50ZXJmYWNlIElUYWJQYW5lbFByb3BzIGV4dGVuZHMgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBFbGVtZW50IElELlxuICAgICAqL1xuICAgIF9pZD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBJRCBvZiB0aGUgdGFiIHRoaXMgcGFuZWwgY29ycmVzcG9uZHMgdG8uXG4gICAgICovXG4gICAgX3RhYklkPzogc3RyaW5nO1xufVxuXG5AUHVyZVJlbmRlclxuZXhwb3J0IGNsYXNzIFRhYlBhbmVsIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElUYWJQYW5lbFByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LlRhYlBhbmVsXCI7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17dGhpcy5wcm9wcy5fdGFiSWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuVEFCX1BBTkVMLCB0aGlzLnByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgaWQ9e3RoaXMucHJvcHMuX2lkfVxuICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBUYWJQYW5lbEZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KFRhYlBhbmVsKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
