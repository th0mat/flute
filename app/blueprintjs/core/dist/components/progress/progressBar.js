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
var ProgressBar = (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        _super.apply(this, arguments);
    }
    ProgressBar.prototype.render = function () {
        var _a = this.props, className = _a.className, intent = _a.intent, value = _a.value;
        var classes = classNames("pt-progress-bar", Classes.intentClass(intent), className);
        // don't set width if value is null (rely on default CSS value)
        var width = (value == null ? null : 100 * utils_1.clamp(value, 0, 1) + "%");
        return (React.createElement("div", {className: classes}, 
            React.createElement("div", {className: "pt-progress-meter", style: { width: width }})
        ));
    };
    ProgressBar.displayName = "Blueprint.ProgressBar";
    ProgressBar = __decorate([
        PureRender
    ], ProgressBar);
    return ProgressBar;
}(React.Component));
exports.ProgressBar = ProgressBar;
exports.ProgressBarFactory = React.createFactory(ProgressBar);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3Byb2dyZXNzL3Byb2dyZXNzQmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0IsSUFBWSxPQUFPLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUVoRCxzQkFBc0Isb0JBQW9CLENBQUMsQ0FBQTtBQVkzQztJQUFpQywrQkFBc0M7SUFBdkU7UUFBaUMsOEJBQXNDO0lBZXZFLENBQUM7SUFaVSw0QkFBTSxHQUFiO1FBQ0ksSUFBQSxlQUErQyxFQUF2Qyx3QkFBUyxFQUFFLGtCQUFNLEVBQUUsZ0JBQUssQ0FBZ0I7UUFDaEQsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDdEYsK0RBQStEO1FBQy9ELElBQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLGFBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRXRFLE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBUTtZQUNwQixxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEtBQUssRUFBRSxFQUFFLFlBQUssRUFBRyxFQUFHO1NBQ3JELENBQ1QsQ0FBQztJQUNOLENBQUM7SUFiYSx1QkFBVyxHQUFHLHVCQUF1QixDQUFDO0lBRnhEO1FBQUMsVUFBVTttQkFBQTtJQWdCWCxrQkFBQztBQUFELENBZkEsQUFlQyxDQWZnQyxLQUFLLENBQUMsU0FBUyxHQWUvQztBQWZZLG1CQUFXLGNBZXZCLENBQUE7QUFFWSwwQkFBa0IsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvcHJvZ3Jlc3MvcHJvZ3Jlc3NCYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgeyBJSW50ZW50UHJvcHMsIElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9ncmVzc0JhclByb3BzIGV4dGVuZHMgSVByb3BzLCBJSW50ZW50UHJvcHMge1xuICAgIC8qKlxuICAgICAqIEEgdmFsdWUgYmV0d2VlbiAwIGFuZCAxIChpbmNsdXNpdmUpIHJlcHJlc2VudGluZyBob3cgZmFyIGFsb25nIHRoZSBvcGVyYXRpb24gaXMuXG4gICAgICogVmFsdWVzIGJlbG93IDAgb3IgYWJvdmUgMSB3aWxsIGJlIGludGVycHJldGVkIGFzIDAgb3IgMSwgcmVzcGVjdGl2ZWx5LlxuICAgICAqIE9taXR0aW5nIHRoaXMgcHJvcCB3aWxsIHJlc3VsdCBpbiBhbiBcImluZGV0ZXJtaW5hdGVcIiBwcm9ncmVzcyBtZXRlciB0aGF0IGZpbGxzIHRoZSBlbnRpcmUgYmFyLlxuICAgICAqL1xuICAgIHZhbHVlPzogbnVtYmVyO1xufVxuXG5AUHVyZVJlbmRlclxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElQcm9ncmVzc0JhclByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5Qcm9ncmVzc0JhclwiO1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjbGFzc05hbWUsIGludGVudCwgdmFsdWUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWVzKFwicHQtcHJvZ3Jlc3MtYmFyXCIsIENsYXNzZXMuaW50ZW50Q2xhc3MoaW50ZW50KSwgY2xhc3NOYW1lKTtcbiAgICAgICAgLy8gZG9uJ3Qgc2V0IHdpZHRoIGlmIHZhbHVlIGlzIG51bGwgKHJlbHkgb24gZGVmYXVsdCBDU1MgdmFsdWUpXG4gICAgICAgIGNvbnN0IHdpZHRoID0gKHZhbHVlID09IG51bGwgPyBudWxsIDogMTAwICogY2xhbXAodmFsdWUsIDAsIDEpICsgXCIlXCIpO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC1wcm9ncmVzcy1tZXRlclwiIHN0eWxlPXt7IHdpZHRoIH19IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBQcm9ncmVzc0JhckZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KFByb2dyZXNzQmFyKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
