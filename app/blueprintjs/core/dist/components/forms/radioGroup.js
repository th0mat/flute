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
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var controls_1 = require("./controls");
var counter = 0;
function nextName() { return RadioGroup.displayName + "-" + counter++; }
var RadioGroup = (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup() {
        _super.apply(this, arguments);
        // a unique name for this group, which can be overridden by `name` prop.
        this.autoGroupName = nextName();
    }
    RadioGroup.prototype.render = function () {
        var label = this.props.label;
        return (React.createElement("div", {className: this.props.className}, 
            label == null ? null : React.createElement("label", {className: Classes.LABEL}, label), 
            Array.isArray(this.props.options) ? this.renderOptions() : this.renderChildren()));
    };
    RadioGroup.prototype.validateProps = function () {
        if (this.props.children != null) {
            if (this.props.options != null) {
                throw new Error(Errors.RADIOGROUP_CHILDREN_OPTIONS_MUTEX);
            }
            React.Children.forEach(this.props.children, function (child) {
                var radio = child;
                if (radio.type !== controls_1.Radio) {
                    throw new Error(Errors.RADIOGROUP_RADIO_CHILDREN);
                }
            });
        }
    };
    RadioGroup.prototype.renderChildren = function () {
        var _this = this;
        return React.Children.map(this.props.children, function (child) {
            var radio = child;
            return React.cloneElement(radio, _this.getRadioProps(radio.props));
        });
    };
    RadioGroup.prototype.renderOptions = function () {
        var _this = this;
        return this.props.options.map(function (option) { return (React.createElement(controls_1.Radio, __assign({}, option, _this.getRadioProps(option), {key: option.value}))); });
    };
    RadioGroup.prototype.getRadioProps = function (optionProps) {
        var name = this.props.name;
        var value = optionProps.value, disabled = optionProps.disabled;
        return {
            checked: value === this.props.selectedValue,
            disabled: disabled || this.props.disabled,
            name: name == null ? this.autoGroupName : name,
            onChange: this.props.onChange,
        };
    };
    RadioGroup.displayName = "Blueprint.RadioGroup";
    return RadioGroup;
}(abstractComponent_1.AbstractComponent));
exports.RadioGroup = RadioGroup;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2Zvcm1zL3JhZGlvR3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksTUFBTSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFFOUMseUJBQXNCLFlBQVksQ0FBQyxDQUFBO0FBbUNuQyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDaEIsc0JBQXNCLE1BQU0sQ0FBSSxVQUFVLENBQUMsV0FBVyxTQUFJLE9BQU8sRUFBSSxDQUFDLENBQUMsQ0FBQztBQUV4RTtJQUFnQyw4QkFBdUM7SUFBdkU7UUFBZ0MsOEJBQXVDO1FBR25FLHdFQUF3RTtRQUNoRSxrQkFBYSxHQUFHLFFBQVEsRUFBRSxDQUFDO0lBaUR2QyxDQUFDO0lBL0NVLDJCQUFNLEdBQWI7UUFDWSw0QkFBSyxDQUFnQjtRQUM3QixNQUFNLENBQUMsQ0FDSCxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBVTtZQUNoQyxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxxQkFBQyxLQUFLLElBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxLQUFNLEdBQUUsS0FBTSxDQUFTO1lBQ3hFLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRyxDQUNoRixDQUNULENBQUM7SUFDTixDQUFDO0lBRVMsa0NBQWEsR0FBdkI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDOUQsQ0FBQztZQUNELEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSztnQkFDOUMsSUFBTSxLQUFLLEdBQUcsS0FBb0IsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxnQkFBSyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFDdEQsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLENBQUM7SUFFTyxtQ0FBYyxHQUF0QjtRQUFBLGlCQUtDO1FBSkcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSztZQUNqRCxJQUFNLEtBQUssR0FBRyxLQUFvQixDQUFDO1lBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLGtDQUFhLEdBQXJCO1FBQUEsaUJBSUM7UUFIRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsQ0FDdEMsb0JBQUMsZ0JBQUssZUFBSyxNQUFNLEVBQU0sS0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEtBQU0sR0FBRyxDQUMzRSxFQUZ5QyxDQUV6QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sa0NBQWEsR0FBckIsVUFBc0IsV0FBeUI7UUFDbkMsMEJBQUksQ0FBZ0I7UUFDcEIsNkJBQUssRUFBRSwrQkFBUSxDQUFpQjtRQUN4QyxNQUFNLENBQUM7WUFDSCxPQUFPLEVBQUUsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYTtZQUMzQyxRQUFRLEVBQUUsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUN6QyxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUk7WUFDOUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtTQUNoQyxDQUFDO0lBQ04sQ0FBQztJQW5EYSxzQkFBVyxHQUFHLHNCQUFzQixDQUFDO0lBb0R2RCxpQkFBQztBQUFELENBckRBLEFBcURDLENBckQrQixxQ0FBaUIsR0FxRGhEO0FBckRZLGtCQUFVLGFBcUR0QixDQUFBO0FBQUEsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL2Zvcm1zL3JhZGlvR3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBBYnN0cmFjdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9jb21tb24vYWJzdHJhY3RDb21wb25lbnRcIjtcbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSBcIi4uLy4uL2NvbW1vbi9lcnJvcnNcIjtcbmltcG9ydCB7IElPcHRpb25Qcm9wcywgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0IHsgUmFkaW8gfSBmcm9tIFwiLi9jb250cm9sc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElSYWRpb0dyb3VwUHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGdyb3VwIGFuZCBfYWxsXyBpdHMgcmFkaW9zIGFyZSBkaXNhYmxlZC5cbiAgICAgKiBJbmRpdmlkdWFsIHJhZGlvcyBjYW4gYmUgZGlzYWJsZWQgdXNpbmcgdGhlaXIgYGRpc2FibGVkYCBwcm9wLlxuICAgICAqL1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcblxuICAgIC8qKiBPcHRpb25hbCBsYWJlbCB0ZXh0IHRvIGRpc3BsYXkgYWJvdmUgdGhlIHJhZGlvIGJ1dHRvbnMuICovXG4gICAgbGFiZWw/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBncm91cCwgdXNlZCB0byBsaW5rIHJhZGlvIGJ1dHRvbnMgdG9nZXRoZXIgaW4gSFRNTC5cbiAgICAgKiBJZiBvbWl0dGVkLCBhIHVuaXF1ZSBuYW1lIHdpbGwgYmUgZ2VuZXJhdGVkIGludGVybmFsbHkuXG4gICAgICovXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIHJhZGlvIGNoYW5nZXMuXG4gICAgICogVGhpcyBwcm9wIGlzIHJlcXVpcmVkIGJlY2F1c2UgdGhpcyBjb21wb25lbnQgY3VycmVudGx5IHN1cHBvcnRzIG9ubHkgY29udHJvbGxlZCB1c2FnZS5cbiAgICAgKi9cbiAgICBvbkNoYW5nZTogKGV2ZW50OiBSZWFjdC5Gb3JtRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQXJyYXkgb2Ygb3B0aW9ucyB0byByZW5kZXIgaW4gdGhlIGdyb3VwLlxuICAgICAqIFRoaXMgcHJvcCBpcyBtdXR1YWxseSBleGNsdXNpdmUgd2l0aCBgY2hpbGRyZW5gOiBlaXRoZXIgcHJvdmlkZSBhbiBhcnJheSBvZiBgSU9wdGlvblByb3BzYFxuICAgICAqIG9iamVjdHMgb3IgcHJvdmlkZSBgPFJhZGlvPmAgY2hpbGRyZW4gZWxlbWVudHMuXG4gICAgICovXG4gICAgb3B0aW9ucz86IElPcHRpb25Qcm9wc1tdO1xuXG4gICAgLyoqIFZhbHVlIG9mIHRoZSBzZWxlY3RlZCByYWRpby4gVGhlIGNoaWxkIHdpdGggdGhpcyB2YWx1ZSB3aWxsIGJlIGA6Y2hlY2tlZGAuICovXG4gICAgc2VsZWN0ZWRWYWx1ZT86IHN0cmluZztcbn1cblxubGV0IGNvdW50ZXIgPSAwO1xuZnVuY3Rpb24gbmV4dE5hbWUoKSB7IHJldHVybiBgJHtSYWRpb0dyb3VwLmRpc3BsYXlOYW1lfS0ke2NvdW50ZXIrK31gOyB9XG5cbmV4cG9ydCBjbGFzcyBSYWRpb0dyb3VwIGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SVJhZGlvR3JvdXBQcm9wcywge30+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRpc3BsYXlOYW1lID0gXCJCbHVlcHJpbnQuUmFkaW9Hcm91cFwiO1xuXG4gICAgLy8gYSB1bmlxdWUgbmFtZSBmb3IgdGhpcyBncm91cCwgd2hpY2ggY2FuIGJlIG92ZXJyaWRkZW4gYnkgYG5hbWVgIHByb3AuXG4gICAgcHJpdmF0ZSBhdXRvR3JvdXBOYW1lID0gbmV4dE5hbWUoKTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgbGFiZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9PlxuICAgICAgICAgICAgICAgIHtsYWJlbCA9PSBudWxsID8gbnVsbCA6IDxsYWJlbCBjbGFzc05hbWU9e0NsYXNzZXMuTEFCRUx9PntsYWJlbH08L2xhYmVsPn1cbiAgICAgICAgICAgICAgICB7QXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLm9wdGlvbnMpID8gdGhpcy5yZW5kZXJPcHRpb25zKCkgOiB0aGlzLnJlbmRlckNoaWxkcmVuKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVQcm9wcygpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2hpbGRyZW4gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub3B0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVycm9ycy5SQURJT0dST1VQX0NISUxEUkVOX09QVElPTlNfTVVURVgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgUmVhY3QuQ2hpbGRyZW4uZm9yRWFjaCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByYWRpbyA9IGNoaWxkIGFzIEpTWC5FbGVtZW50O1xuICAgICAgICAgICAgICAgIGlmIChyYWRpby50eXBlICE9PSBSYWRpbykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLlJBRElPR1JPVVBfUkFESU9fQ0hJTERSRU4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJDaGlsZHJlbigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJhZGlvID0gY2hpbGQgYXMgSlNYLkVsZW1lbnQ7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHJhZGlvLCB0aGlzLmdldFJhZGlvUHJvcHMocmFkaW8ucHJvcHMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICA8UmFkaW8gey4uLm9wdGlvbn0gey4uLnRoaXMuZ2V0UmFkaW9Qcm9wcyhvcHRpb24pfSBrZXk9e29wdGlvbi52YWx1ZX0gLz5cbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRSYWRpb1Byb3BzKG9wdGlvblByb3BzOiBJT3B0aW9uUHJvcHMpIHtcbiAgICAgICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7IHZhbHVlLCBkaXNhYmxlZCB9ID0gb3B0aW9uUHJvcHM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjaGVja2VkOiB2YWx1ZSA9PT0gdGhpcy5wcm9wcy5zZWxlY3RlZFZhbHVlLFxuICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkIHx8IHRoaXMucHJvcHMuZGlzYWJsZWQsXG4gICAgICAgICAgICBuYW1lOiBuYW1lID09IG51bGwgPyB0aGlzLmF1dG9Hcm91cE5hbWUgOiBuYW1lLFxuICAgICAgICAgICAgb25DaGFuZ2U6IHRoaXMucHJvcHMub25DaGFuZ2UsXG4gICAgICAgIH07XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
