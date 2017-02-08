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
var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        _super.apply(this, arguments);
        this.displayName = "Blueprint.Tab";
    }
    Tab.prototype.render = function () {
        return (React.createElement("li", {"aria-controls": this.props.panelId, "aria-disabled": this.props.isDisabled, "aria-expanded": this.props.isSelected, "aria-selected": this.props.isSelected, className: classNames(Classes.TAB, this.props.className), id: this.props.id, role: "tab", selected: this.props.isSelected ? true : null, tabIndex: this.props.isDisabled ? null : 0}, this.props.children));
    };
    Tab.defaultProps = {
        isDisabled: false,
        isSelected: false,
    };
    Tab = __decorate([
        PureRender
    ], Tab);
    return Tab;
}(React.Component));
exports.Tab = Tab;
exports.TabFactory = React.createFactory(Tab);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RhYnMvdGFiLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0IsSUFBWSxPQUFPLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQThCaEQ7SUFBeUIsdUJBQThCO0lBQXZEO1FBQXlCLDhCQUE4QjtRQU01QyxnQkFBVyxHQUFHLGVBQWUsQ0FBQztJQW1CekMsQ0FBQztJQWpCVSxvQkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLENBQ0gscUJBQUMsRUFBRSxLQUNDLGFBQWEsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVEsR0FDbEMsYUFBYSxHQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVyxHQUNyQyxhQUFhLEdBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFXLEdBQ3JDLGFBQWEsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVcsRUFDckMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFFLEVBQ3pELEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUcsRUFDbEIsSUFBSSxFQUFDLEtBQUssRUFDVixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLElBQUssRUFDOUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxDQUFFLEdBRTFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUNwQixDQUNSLENBQUM7SUFDTixDQUFDO0lBdkJhLGdCQUFZLEdBQWM7UUFDcEMsVUFBVSxFQUFFLEtBQUs7UUFDakIsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FBQztJQUxOO1FBQUMsVUFBVTtXQUFBO0lBMEJYLFVBQUM7QUFBRCxDQXpCQSxBQXlCQyxDQXpCd0IsS0FBSyxDQUFDLFNBQVMsR0F5QnZDO0FBekJZLFdBQUcsTUF5QmYsQ0FBQTtBQUVZLGtCQUFVLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL3RhYnMvdGFiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE1IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBQdXJlUmVuZGVyIGZyb20gXCJwdXJlLXJlbmRlci1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUYWJQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudCBJRC5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBpZD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHRhYiBpcyBkaXNhYmxlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGFiIGlzIGN1cnJlbnRseSBzZWxlY3RlZC5cbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBpc1NlbGVjdGVkPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBJRCBvZiB0aGUgdGFiIHBhbmVsIHdoaWNoIHRoaXMgdGFiIGNvcnJlc3BvbmRzIHRvLlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHBhbmVsSWQ/OiBzdHJpbmc7XG59XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgVGFiIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElUYWJQcm9wcywge30+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSVRhYlByb3BzID0ge1xuICAgICAgICBpc0Rpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgfTtcblxuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LlRhYlwiO1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e3RoaXMucHJvcHMucGFuZWxJZH1cbiAgICAgICAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLnByb3BzLmlzRGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17dGhpcy5wcm9wcy5pc1NlbGVjdGVkfVxuICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3RoaXMucHJvcHMuaXNTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5UQUIsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICBpZD17dGhpcy5wcm9wcy5pZH1cbiAgICAgICAgICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZD17dGhpcy5wcm9wcy5pc1NlbGVjdGVkID8gdHJ1ZSA6IG51bGx9XG4gICAgICAgICAgICAgICAgdGFiSW5kZXg9e3RoaXMucHJvcHMuaXNEaXNhYmxlZCA/IG51bGwgOiAwfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBUYWJGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShUYWIpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
