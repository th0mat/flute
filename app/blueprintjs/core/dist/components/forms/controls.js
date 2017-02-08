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
// HACKHACK: these components should go in separate files
// tslint:disable max-classes-per-file
var classNames = require("classnames");
var React = require("react");
var props_1 = require("../../common/props");
var utils_1 = require("../../common/utils");
/** Base Component class for all Controls */
var Control = (function (_super) {
    __extends(Control, _super);
    function Control() {
        _super.apply(this, arguments);
    }
    // generates control markup for given input type.
    // optional inputRef in case the component needs reference for itself (don't forget to invoke the prop!).
    Control.prototype.renderControl = function (type, typeClassName, inputRef) {
        if (inputRef === void 0) { inputRef = this.props.inputRef; }
        return (React.createElement("label", {className: classNames("pt-control", typeClassName, this.props.className), style: this.props.style}, 
            React.createElement("input", __assign({}, props_1.removeNonHTMLProps(this.props, ["children"], true), {ref: inputRef, type: type})), 
            React.createElement("span", {className: "pt-control-indicator"}), 
            this.props.label, 
            this.props.children));
    };
    return Control;
}(React.Component));
exports.Control = Control;
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleInputRef = function (ref) {
            _this.input = ref;
            utils_1.safeInvoke(_this.props.inputRef, ref);
        };
    }
    Checkbox.prototype.render = function () {
        return this.renderControl("checkbox", "pt-checkbox", this.handleInputRef);
    };
    Checkbox.prototype.componentDidMount = function () {
        if (this.props.defaultIndeterminate != null) {
            this.input.indeterminate = this.props.defaultIndeterminate;
        }
        this.updateIndeterminate();
    };
    Checkbox.prototype.componentDidUpdate = function () {
        this.updateIndeterminate();
    };
    Checkbox.prototype.updateIndeterminate = function () {
        if (this.props.indeterminate != null) {
            this.input.indeterminate = this.props.indeterminate;
        }
    };
    Checkbox.displayName = "Blueprint.Checkbox";
    return Checkbox;
}(Control));
exports.Checkbox = Checkbox;
var Switch = (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        _super.apply(this, arguments);
    }
    Switch.prototype.render = function () {
        return this.renderControl("checkbox", "pt-switch");
    };
    Switch.displayName = "Blueprint.Switch";
    return Switch;
}(Control));
exports.Switch = Switch;
var Radio = (function (_super) {
    __extends(Radio, _super);
    function Radio() {
        _super.apply(this, arguments);
    }
    Radio.prototype.render = function () {
        return this.renderControl("radio", "pt-radio");
    };
    Radio.displayName = "Blueprint.Radio";
    return Radio;
}(Control));
exports.Radio = Radio;
exports.CheckboxFactory = React.createFactory(Checkbox);
exports.SwitchFactory = React.createFactory(Switch);
exports.RadioFactory = React.createFactory(Radio);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2Zvcm1zL2NvbnRyb2xzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7Ozs7O0FBRUgseURBQXlEO0FBQ3pELHNDQUFzQztBQUV0QyxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixzQkFBMkMsb0JBQW9CLENBQUMsQ0FBQTtBQUNoRSxzQkFBMkIsb0JBQW9CLENBQUMsQ0FBQTtBQW1CaEQsNENBQTRDO0FBQzVDO0lBQXNELDJCQUEwRDtJQUFoSDtRQUFzRCw4QkFBMEQ7SUFhaEgsQ0FBQztJQVpHLGlEQUFpRDtJQUNqRCx5R0FBeUc7SUFDL0YsK0JBQWEsR0FBdkIsVUFBd0IsSUFBMEIsRUFBRSxhQUFxQixFQUFFLFFBQThCO1FBQTlCLHdCQUE4QixHQUE5QixXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtRQUNyRyxNQUFNLENBQUMsQ0FDSCxxQkFBQyxLQUFLLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBTTtZQUNyRyxxQkFBQyxLQUFLLGdCQUFLLDBCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRSxHQUFHLEVBQUUsUUFBUyxFQUFDLElBQUksRUFBRSxJQUFLLEdBQUc7WUFDNUYscUJBQUMsSUFBSSxJQUFDLFNBQVMsRUFBQyxzQkFBc0IsRUFBRztZQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU07WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLENBQ2pCLENBQ1gsQ0FBQztJQUNOLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FiQSxBQWFDLENBYnFELEtBQUssQ0FBQyxTQUFTLEdBYXBFO0FBYlksZUFBTyxVQWFuQixDQUFBO0FBVUQ7SUFBOEIsNEJBQXVCO0lBQXJEO1FBQUEsaUJBK0JDO1FBL0I2Qiw4QkFBdUI7UUEyQnpDLG1CQUFjLEdBQUcsVUFBQyxHQUFxQjtZQUMzQyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUNqQixrQkFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUF6QlUseUJBQU0sR0FBYjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFTSxvQ0FBaUIsR0FBeEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVNLHFDQUFrQixHQUF6QjtRQUNJLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTyxzQ0FBbUIsR0FBM0I7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ3hELENBQUM7SUFDTCxDQUFDO0lBeEJhLG9CQUFXLEdBQUcsb0JBQW9CLENBQUM7SUE4QnJELGVBQUM7QUFBRCxDQS9CQSxBQStCQyxDQS9CNkIsT0FBTyxHQStCcEM7QUEvQlksZ0JBQVEsV0ErQnBCLENBQUE7QUFJRDtJQUE0QiwwQkFBcUI7SUFBakQ7UUFBNEIsOEJBQXFCO0lBTWpELENBQUM7SUFIVSx1QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFKYSxrQkFBVyxHQUFHLGtCQUFrQixDQUFDO0lBS25ELGFBQUM7QUFBRCxDQU5BLEFBTUMsQ0FOMkIsT0FBTyxHQU1sQztBQU5ZLGNBQU0sU0FNbEIsQ0FBQTtBQUlEO0lBQTJCLHlCQUFvQjtJQUEvQztRQUEyQiw4QkFBb0I7SUFNL0MsQ0FBQztJQUhVLHNCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUphLGlCQUFXLEdBQUcsaUJBQWlCLENBQUM7SUFLbEQsWUFBQztBQUFELENBTkEsQUFNQyxDQU4wQixPQUFPLEdBTWpDO0FBTlksYUFBSyxRQU1qQixDQUFBO0FBRVksdUJBQWUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELHFCQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxvQkFBWSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9mb3Jtcy9jb250cm9scy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuLy8gSEFDS0hBQ0s6IHRoZXNlIGNvbXBvbmVudHMgc2hvdWxkIGdvIGluIHNlcGFyYXRlIGZpbGVzXG4vLyB0c2xpbnQ6ZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZVxuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgSVByb3BzLCByZW1vdmVOb25IVE1MUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5pbXBvcnQgeyBzYWZlSW52b2tlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb250cm9sUHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIC8qKiBXaGV0aGVyIHRoZSBjb250cm9sIGlzIGNoZWNrZWQuICovXG4gICAgY2hlY2tlZD86IGJvb2xlYW47XG5cbiAgICAvKiogV2hldGhlciB0aGUgY29udHJvbCBpcyBpbml0aWFsbHkgY2hlY2tlZCAodW5jb250cm9sbGVkKSAqL1xuICAgIGRlZmF1bHRDaGVja2VkPzogYm9vbGVhbjtcblxuICAgIC8qKiBSZWYgaGFuZGxlciB0aGF0IHJlY2VpdmVzIEhUTUwgYDxpbnB1dD5gIGVsZW1lbnQgYmFja2luZyB0aGlzIGNvbXBvbmVudC4gKi9cbiAgICBpbnB1dFJlZj86IChyZWY6IEhUTUxJbnB1dEVsZW1lbnQpID0+IGFueTtcblxuICAgIC8qKiBUZXh0IGxhYmVsIGZvciBjb250cm9sLiAqL1xuICAgIGxhYmVsPzogc3RyaW5nO1xuXG4gICAgLyoqIEV2ZW50IGhhbmRsZXIgaW52b2tlZCB3aGVuIGlucHV0IHZhbHVlIGlzIGNoYW5nZWQgKi9cbiAgICBvbkNoYW5nZT86IFJlYWN0LkZvcm1FdmVudEhhbmRsZXI8SFRNTElucHV0RWxlbWVudD47XG59XG5cbi8qKiBCYXNlIENvbXBvbmVudCBjbGFzcyBmb3IgYWxsIENvbnRyb2xzICovXG5leHBvcnQgY2xhc3MgQ29udHJvbDxQIGV4dGVuZHMgSUNvbnRyb2xQcm9wcz4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UmVhY3QuSFRNTFByb3BzPEhUTUxJbnB1dEVsZW1lbnQ+ICYgUCwge30+IHtcbiAgICAvLyBnZW5lcmF0ZXMgY29udHJvbCBtYXJrdXAgZm9yIGdpdmVuIGlucHV0IHR5cGUuXG4gICAgLy8gb3B0aW9uYWwgaW5wdXRSZWYgaW4gY2FzZSB0aGUgY29tcG9uZW50IG5lZWRzIHJlZmVyZW5jZSBmb3IgaXRzZWxmIChkb24ndCBmb3JnZXQgdG8gaW52b2tlIHRoZSBwcm9wISkuXG4gICAgcHJvdGVjdGVkIHJlbmRlckNvbnRyb2wodHlwZTogXCJjaGVja2JveFwiIHwgXCJyYWRpb1wiLCB0eXBlQ2xhc3NOYW1lOiBzdHJpbmcsIGlucHV0UmVmID0gdGhpcy5wcm9wcy5pbnB1dFJlZikge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInB0LWNvbnRyb2xcIiwgdHlwZUNsYXNzTmFtZSwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG4gICAgICAgICAgICAgICAgPGlucHV0IHsuLi5yZW1vdmVOb25IVE1MUHJvcHModGhpcy5wcm9wcywgW1wiY2hpbGRyZW5cIl0sIHRydWUpfSByZWY9e2lucHV0UmVmfSB0eXBlPXt0eXBlfSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB0LWNvbnRyb2wtaW5kaWNhdG9yXCIgLz5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sYWJlbH1cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDaGVja2JveFByb3BzIGV4dGVuZHMgSUNvbnRyb2xQcm9wcyB7XG4gICAgLyoqIFdoZXRoZXIgdGhpcyBjaGVja2JveCBpcyBpbml0aWFsbHkgaW5kZXRlcm1pbmF0ZSAodW5jb250cm9sbGVkKSAqL1xuICAgIGRlZmF1bHRJbmRldGVybWluYXRlPzogYm9vbGVhbjtcblxuICAgIC8qKiBXaGV0aGVyIHRoaXMgY2hlY2tib3ggaXMgaW5kZXRlcm1pbmF0ZSAqL1xuICAgIGluZGV0ZXJtaW5hdGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBDb250cm9sPElDaGVja2JveFByb3BzPiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LkNoZWNrYm94XCI7XG5cbiAgICAvLyBtdXN0IG1haW50YWluIGludGVybmFsIHJlZmVyZW5jZSBmb3IgYGluZGV0ZXJtaW5hdGVgIHN1cHBvcnRcbiAgICBwcml2YXRlIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ29udHJvbChcImNoZWNrYm94XCIsIFwicHQtY2hlY2tib3hcIiwgdGhpcy5oYW5kbGVJbnB1dFJlZik7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kZWZhdWx0SW5kZXRlcm1pbmF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSB0aGlzLnByb3BzLmRlZmF1bHRJbmRldGVybWluYXRlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlSW5kZXRlcm1pbmF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlSW5kZXRlcm1pbmF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlSW5kZXRlcm1pbmF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5kZXRlcm1pbmF0ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LmluZGV0ZXJtaW5hdGUgPSB0aGlzLnByb3BzLmluZGV0ZXJtaW5hdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUlucHV0UmVmID0gKHJlZjogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICB0aGlzLmlucHV0ID0gcmVmO1xuICAgICAgICBzYWZlSW52b2tlKHRoaXMucHJvcHMuaW5wdXRSZWYsIHJlZik7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTd2l0Y2hQcm9wcyBleHRlbmRzIElDb250cm9sUHJvcHMge31cblxuZXhwb3J0IGNsYXNzIFN3aXRjaCBleHRlbmRzIENvbnRyb2w8SVN3aXRjaFByb3BzPiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LlN3aXRjaFwiO1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ29udHJvbChcImNoZWNrYm94XCIsIFwicHQtc3dpdGNoXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUmFkaW9Qcm9wcyBleHRlbmRzIElDb250cm9sUHJvcHMge31cblxuZXhwb3J0IGNsYXNzIFJhZGlvIGV4dGVuZHMgQ29udHJvbDxJUmFkaW9Qcm9wcz4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5SYWRpb1wiO1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQ29udHJvbChcInJhZGlvXCIsIFwicHQtcmFkaW9cIik7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQ2hlY2tib3hGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShDaGVja2JveCk7XG5leHBvcnQgY29uc3QgU3dpdGNoRmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoU3dpdGNoKTtcbmV4cG9ydCBjb25zdCBSYWRpb0ZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KFJhZGlvKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
