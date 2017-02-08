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
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var TabList = (function (_super) {
    __extends(TabList, _super);
    function TabList() {
        _super.apply(this, arguments);
        this.displayName = "Blueprint.TabList";
        this.state = {
            shouldAnimate: false,
        };
    }
    TabList.prototype.render = function () {
        return (React.createElement("ul", {className: classNames(Classes.TAB_LIST, this.props.className), role: "tablist"}, 
            React.createElement("div", {className: classNames("pt-tab-indicator-wrapper", { "pt-no-animation": !this.state.shouldAnimate }), style: this.props.indicatorWrapperStyle}, 
                React.createElement("div", {className: "pt-tab-indicator"})
            ), 
            this.props.children));
    };
    TabList.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (prevProps.indicatorWrapperStyle == null) {
            this.setTimeout(function () { return _this.setState({ shouldAnimate: true }); });
        }
    };
    TabList = __decorate([
        PureRender
    ], TabList);
    return TabList;
}(abstractComponent_1.AbstractComponent));
exports.TabList = TabList;
exports.TabListFactory = React.createFactory(TabList);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFiTGlzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLGtDQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFtQmhEO0lBQTZCLDJCQUFvQztJQUFqRTtRQUE2Qiw4QkFBb0M7UUFDdEQsZ0JBQVcsR0FBRyxtQkFBbUIsQ0FBQztRQUNsQyxVQUFLLEdBQWtCO1lBQzFCLGFBQWEsRUFBRSxLQUFLO1NBQ3ZCLENBQUM7SUF3Qk4sQ0FBQztJQXRCVSx3QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLENBQ0gscUJBQUMsRUFBRSxJQUNDLFNBQVMsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBRSxFQUM5RCxJQUFJLEVBQUMsU0FBUztZQUVkLHFCQUFDLEdBQUcsSUFDQSxTQUFTLEVBQUUsVUFBVSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFFLEVBQ3BHLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFzQjtnQkFFeEMscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBQyxrQkFBa0IsRUFBRzthQUNsQztZQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUNwQixDQUNSLENBQUM7SUFDTixDQUFDO0lBRU0sb0NBQWtCLEdBQXpCLFVBQTBCLFNBQXdCO1FBQWxELGlCQUlDO1FBSEcsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNMLENBQUM7SUE1Qkw7UUFBQyxVQUFVO2VBQUE7SUE2QlgsY0FBQztBQUFELENBNUJBLEFBNEJDLENBNUI0QixxQ0FBaUIsR0E0QjdDO0FBNUJZLGVBQU8sVUE0Qm5CLENBQUE7QUFFWSxzQkFBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy90YWJzL3RhYkxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTUgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJVGFiTGlzdFByb3BzIGV4dGVuZHMgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbGlzdCBvZiBDU1MgcnVsZXMgdG8gdXNlIG9uIHRoZSBpbmRpY2F0b3Igd3JhcHBlci5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBpbmRpY2F0b3JXcmFwcGVyU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUYWJMaXN0U3RhdGUge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGFuaW1hdGlvbiBzaG91bGQgYmUgcnVuIHdoZW4gdHJhbnNmb3JtIGNoYW5nZXMuXG4gICAgICovXG4gICAgc2hvdWxkQW5pbWF0ZT86IGJvb2xlYW47XG59XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgVGFiTGlzdCBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PElUYWJMaXN0UHJvcHMsIHt9PiB7XG4gICAgcHVibGljIGRpc3BsYXlOYW1lID0gXCJCbHVlcHJpbnQuVGFiTGlzdFwiO1xuICAgIHB1YmxpYyBzdGF0ZTogSVRhYkxpc3RTdGF0ZSA9IHtcbiAgICAgICAgc2hvdWxkQW5pbWF0ZTogZmFsc2UsXG4gICAgfTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dWxcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5UQUJfTElTVCwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJsaXN0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInB0LXRhYi1pbmRpY2F0b3Itd3JhcHBlclwiLCB7IFwicHQtbm8tYW5pbWF0aW9uXCI6ICF0aGlzLnN0YXRlLnNob3VsZEFuaW1hdGUgfSl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt0aGlzLnByb3BzLmluZGljYXRvcldyYXBwZXJTdHlsZX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtdGFiLWluZGljYXRvclwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L3VsPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBJVGFiTGlzdFByb3BzKSB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuaW5kaWNhdG9yV3JhcHBlclN0eWxlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldFN0YXRlKHsgc2hvdWxkQW5pbWF0ZTogdHJ1ZSB9KSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBUYWJMaXN0RmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoVGFiTGlzdCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
