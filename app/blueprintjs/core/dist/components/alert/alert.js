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
var common_1 = require("../../common");
var Errors = require("../../common/errors");
var buttons_1 = require("../button/buttons");
var dialog_1 = require("../dialog/dialog");
var Alert = (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        _super.apply(this, arguments);
    }
    Alert.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, intent = _a.intent, isOpen = _a.isOpen, confirmButtonText = _a.confirmButtonText, onConfirm = _a.onConfirm, style = _a.style;
        return (React.createElement(dialog_1.Dialog, {className: classNames(common_1.Classes.ALERT, className), isOpen: isOpen, style: style}, 
            React.createElement("div", {className: common_1.Classes.ALERT_BODY}, 
                this.maybeRenderIcon(), 
                React.createElement("div", {className: common_1.Classes.ALERT_CONTENTS}, children)), 
            React.createElement("div", {className: common_1.Classes.ALERT_FOOTER}, 
                React.createElement(buttons_1.Button, {intent: intent, text: confirmButtonText, onClick: onConfirm}), 
                this.maybeRenderSecondaryAction())));
    };
    Alert.prototype.validateProps = function (props) {
        if (props.cancelButtonText != null && props.onCancel == null ||
            props.cancelButtonText == null && props.onCancel != null) {
            throw new Error(Errors.ALERT_CANCEL_PROPS);
        }
    };
    Alert.prototype.maybeRenderIcon = function () {
        var iconName = this.props.iconName;
        if (iconName != null) {
            var iconClass = classNames("pt-icon", common_1.Classes.iconClass(iconName));
            return React.createElement("span", {className: iconClass});
        }
        return undefined;
    };
    Alert.prototype.maybeRenderSecondaryAction = function () {
        if (this.props.cancelButtonText != null) {
            return React.createElement(buttons_1.Button, {text: this.props.cancelButtonText, onClick: this.props.onCancel});
        }
        return undefined;
    };
    Alert.defaultProps = {
        confirmButtonText: "Ok",
        isOpen: false,
        onConfirm: null,
    };
    Alert.displayName = "Blueprint.Alert";
    return Alert;
}(common_1.AbstractComponent));
exports.Alert = Alert;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2FsZXJ0L2FsZXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLHVCQUEyRCxjQUFjLENBQUMsQ0FBQTtBQUMxRSxJQUFZLE1BQU0sV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBQzlDLHdCQUF1QixtQkFBbUIsQ0FBQyxDQUFBO0FBQzNDLHVCQUF1QixrQkFBa0IsQ0FBQyxDQUFBO0FBNEMxQztJQUEyQix5QkFBa0M7SUFBN0Q7UUFBMkIsOEJBQWtDO0lBaUQ3RCxDQUFDO0lBeENVLHNCQUFNLEdBQWI7UUFDSSxJQUFBLGVBQStGLEVBQXZGLHNCQUFRLEVBQUUsd0JBQVMsRUFBRSxrQkFBTSxFQUFFLGtCQUFNLEVBQUUsd0NBQWlCLEVBQUUsd0JBQVMsRUFBRSxnQkFBSyxDQUFnQjtRQUNoRyxNQUFNLENBQUMsQ0FDSCxvQkFBQyxlQUFNLEdBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxnQkFBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTyxFQUFDLEtBQUssRUFBRSxLQUFNO1lBQ2xGLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsZ0JBQU8sQ0FBQyxVQUFXO2dCQUM5QixJQUFJLENBQUMsZUFBZSxFQUFHO2dCQUN4QixxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLGdCQUFPLENBQUMsY0FBZSxHQUNsQyxRQUFTLENBQ1IsQ0FDSjtZQUNOLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsZ0JBQU8sQ0FBQyxZQUFhO2dCQUNqQyxvQkFBQyxnQkFBTSxHQUFDLE1BQU0sRUFBRSxNQUFPLEVBQUMsSUFBSSxFQUFFLGlCQUFrQixFQUFDLE9BQU8sRUFBRSxTQUFVLEVBQUc7Z0JBQ3RFLElBQUksQ0FBQywwQkFBMEIsRUFBRyxDQUNqQyxDQUNELENBQ1osQ0FBQztJQUNOLENBQUM7SUFFUyw2QkFBYSxHQUF2QixVQUF3QixLQUFrQjtRQUN0QyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSTtZQUN4RCxLQUFLLENBQUMsZ0JBQWdCLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSyxDQUFDLENBQUMsQ0FBQztZQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQy9DLENBQUM7SUFDTCxDQUFDO0lBRU8sK0JBQWUsR0FBdkI7UUFDWSxrQ0FBUSxDQUFnQjtRQUNoQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLGdCQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckUsTUFBTSxDQUFDLHFCQUFDLElBQUksSUFBQyxTQUFTLEVBQUUsU0FBVSxFQUFHLENBQUM7UUFDMUMsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLDBDQUEwQixHQUFsQztRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsb0JBQUMsZ0JBQU0sR0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBaUIsRUFBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLEVBQUcsQ0FBQztRQUN2RixDQUFDO1FBQ0QsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBL0NhLGtCQUFZLEdBQWdCO1FBQ3RDLGlCQUFpQixFQUFFLElBQUk7UUFDdkIsTUFBTSxFQUFFLEtBQUs7UUFDYixTQUFTLEVBQUUsSUFBSTtLQUNsQixDQUFDO0lBRVksaUJBQVcsR0FBRyxpQkFBaUIsQ0FBQztJQTBDbEQsWUFBQztBQUFELENBakRBLEFBaURDLENBakQwQiwwQkFBaUIsR0FpRDNDO0FBakRZLGFBQUssUUFpRGpCLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9hbGVydC9hbGVydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50LCBDbGFzc2VzLCBJbnRlbnQsIElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb25cIjtcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vLi4vY29tbW9uL2Vycm9yc1wiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIi4uL2J1dHRvbi9idXR0b25zXCI7XG5pbXBvcnQgeyBEaWFsb2cgfSBmcm9tIFwiLi4vZGlhbG9nL2RpYWxvZ1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElBbGVydFByb3BzIGV4dGVuZHMgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBUaGUgdGV4dCBmb3IgdGhlIGNhbmNlbCBidXR0b24uXG4gICAgICovXG4gICAgY2FuY2VsQnV0dG9uVGV4dD86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSB0ZXh0IGZvciB0aGUgY29uZmlybSAocmlnaHQtbW9zdCkgYnV0dG9uLlxuICAgICAqIEBkZWZhdWx0IFwiT2tcIlxuICAgICAqL1xuICAgIGNvbmZpcm1CdXR0b25UZXh0Pzogc3RyaW5nO1xuXG4gICAgLyoqIE5hbWUgb2Ygb3B0aW9uYWwgaWNvbiB0byBkaXNwbGF5IG5leHQgdG8gYWxlcnQgbWVzc2FnZS4gKi9cbiAgICBpY29uTmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbnRlbnQgdG8gYmUgYXBwbGllZCB0byB0aGUgY29uZmlybSAocmlnaHQtbW9zdCkgYnV0dG9uLlxuICAgICAqL1xuICAgIGludGVudD86IEludGVudDtcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGFsZXJ0LlxuICAgICAqIFRoaXMgcHJvcCBpcyByZXF1aXJlZCBiZWNhdXNlIHRoZSBjb21wb25lbnQgaXMgY29udHJvbGxlZC5cbiAgICAgKi9cbiAgICBpc09wZW46IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDU1MgU3R5bGVzIHRvIGFwcGx5IHRvIHRoZSAucHQtYWxlcnQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGludm9rZWQgd2hlbiB0aGUgY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqL1xuICAgIG9uQ2FuY2VsPyhlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50Pik6IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVyIGludm9rZWQgd2hlbiB0aGUgY29uZmlybSBidXR0b24gaXMgY2xpY2tlZC5cbiAgICAgKi9cbiAgICBvbkNvbmZpcm0oZTogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pOiB2b2lkO1xuIH1cblxuZXhwb3J0IGNsYXNzIEFsZXJ0IGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SUFsZXJ0UHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElBbGVydFByb3BzID0ge1xuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXCJPa1wiLFxuICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICBvbkNvbmZpcm06IG51bGwsXG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5BbGVydFwiO1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCBpbnRlbnQsIGlzT3BlbiwgY29uZmlybUJ1dHRvblRleHQsIG9uQ29uZmlybSwgc3R5bGUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8RGlhbG9nIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhDbGFzc2VzLkFMRVJULCBjbGFzc05hbWUpfSBpc09wZW49e2lzT3Blbn0gc3R5bGU9e3N0eWxlfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Q2xhc3Nlcy5BTEVSVF9CT0RZfT5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJJY29uKCl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDbGFzc2VzLkFMRVJUX0NPTlRFTlRTfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0NsYXNzZXMuQUxFUlRfRk9PVEVSfT5cbiAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBpbnRlbnQ9e2ludGVudH0gdGV4dD17Y29uZmlybUJ1dHRvblRleHR9IG9uQ2xpY2s9e29uQ29uZmlybX0gLz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJTZWNvbmRhcnlBY3Rpb24oKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvRGlhbG9nPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB2YWxpZGF0ZVByb3BzKHByb3BzOiBJQWxlcnRQcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuY2FuY2VsQnV0dG9uVGV4dCAhPSBudWxsICYmIHByb3BzLm9uQ2FuY2VsID09IG51bGwgfHxcbiAgICAgICAgICAgIHByb3BzLmNhbmNlbEJ1dHRvblRleHQgPT0gbnVsbCAmJiBwcm9wcy5vbkNhbmNlbCAhPSBudWxsICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVycm9ycy5BTEVSVF9DQU5DRUxfUFJPUFMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckljb24oKSB7XG4gICAgICAgIGNvbnN0IHsgaWNvbk5hbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmIChpY29uTmFtZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpY29uQ2xhc3MgPSBjbGFzc05hbWVzKFwicHQtaWNvblwiLCBDbGFzc2VzLmljb25DbGFzcyhpY29uTmFtZSkpO1xuICAgICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT17aWNvbkNsYXNzfSAvPjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJTZWNvbmRhcnlBY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhbmNlbEJ1dHRvblRleHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIDxCdXR0b24gdGV4dD17dGhpcy5wcm9wcy5jYW5jZWxCdXR0b25UZXh0fSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2FuY2VsfSAvPjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
