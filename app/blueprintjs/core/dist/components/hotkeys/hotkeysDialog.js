/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var classNames = require("classnames");
var React = require("react");
var ReactDOM = require("react-dom");
var common_1 = require("../../common");
var components_1 = require("../../components");
var hotkey_1 = require("./hotkey");
var hotkeys_1 = require("./hotkeys");
var HotkeysDialog = (function () {
    function HotkeysDialog() {
        var _this = this;
        this.componentProps = {
            globalHotkeysGroup: "Global hotkeys",
        };
        this.hotkeysQueue = [];
        this.isDialogShowing = false;
        this.timeoutToken = 0;
        this.show = function () {
            _this.isDialogShowing = true;
            _this.render();
        };
        this.hide = function () {
            _this.isDialogShowing = false;
            _this.render();
        };
    }
    HotkeysDialog.prototype.render = function () {
        if (this.container == null) {
            this.container = this.getContainer();
        }
        ReactDOM.render(this.renderComponent(), this.container);
    };
    HotkeysDialog.prototype.unmount = function () {
        if (this.container != null) {
            ReactDOM.unmountComponentAtNode(this.container);
            this.container.remove();
            delete this.container;
        }
    };
    /**
     * Because hotkeys can be registered globally and locally and because
     * event ordering cannot be guaranteed, we use this debouncing method to
     * allow all hotkey listeners to fire and add their hotkeys to the dialog.
     *
     * 10msec after the last listener adds their hotkeys, we render the dialog
     * and clear the queue.
     */
    HotkeysDialog.prototype.enqueueHotkeysForDisplay = function (hotkeys) {
        this.hotkeysQueue.push(hotkeys);
        // reset timeout for debounce
        clearTimeout(this.timeoutToken);
        this.timeoutToken = setTimeout(this.show, 10);
    };
    HotkeysDialog.prototype.isShowing = function () {
        return this.isDialogShowing;
    };
    HotkeysDialog.prototype.getContainer = function () {
        if (this.container == null) {
            this.container = document.createElement("div");
            this.container.classList.add(common_1.Classes.PORTAL);
            document.body.appendChild(this.container);
        }
        return this.container;
    };
    HotkeysDialog.prototype.renderComponent = function () {
        return (React.createElement(components_1.Dialog, __assign({}, this.componentProps, {className: classNames(this.componentProps.className, "pt-hotkey-dialog"), isOpen: this.isDialogShowing, onClose: this.hide}), 
            React.createElement("div", {className: common_1.Classes.DIALOG_BODY}, this.renderHotkeys())
        ));
    };
    HotkeysDialog.prototype.renderHotkeys = function () {
        var _this = this;
        var hotkeys = this.emptyHotkeyQueue();
        var elements = hotkeys.map(function (hotkey, index) {
            var group = (hotkey.global === true && hotkey.group == null) ?
                _this.componentProps.globalHotkeysGroup : hotkey.group;
            return React.createElement(hotkey_1.Hotkey, __assign({key: index}, hotkey, {group: group}));
        });
        return React.createElement(hotkeys_1.Hotkeys, null, elements);
    };
    HotkeysDialog.prototype.emptyHotkeyQueue = function () {
        // flatten then empty the hotkeys queue
        var hotkeys = this.hotkeysQueue.reduce((function (arr, queued) { return arr.concat(queued); }), []);
        this.hotkeysQueue.length = 0;
        return hotkeys;
    };
    return HotkeysDialog;
}());
// singleton instance
var HOTKEYS_DIALOG = new HotkeysDialog();
function isHotkeysDialogShowing() {
    return HOTKEYS_DIALOG.isShowing();
}
exports.isHotkeysDialogShowing = isHotkeysDialogShowing;
function setHotkeysDialogProps(props) {
    for (var key in props) {
        if (props.hasOwnProperty(key)) {
            HOTKEYS_DIALOG.componentProps[key] = props[key];
        }
    }
}
exports.setHotkeysDialogProps = setHotkeysDialogProps;
function showHotkeysDialog(hotkeys) {
    HOTKEYS_DIALOG.enqueueHotkeysForDisplay(hotkeys);
}
exports.showHotkeysDialog = showHotkeysDialog;
function hideHotkeysDialog() {
    HOTKEYS_DIALOG.hide();
}
exports.hideHotkeysDialog = hideHotkeysDialog;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2hvdGtleXMvaG90a2V5c0RpYWxvZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUMvQixJQUFZLFFBQVEsV0FBTSxXQUFXLENBQUMsQ0FBQTtBQUV0Qyx1QkFBd0IsY0FBYyxDQUFDLENBQUE7QUFDdkMsMkJBQXFDLGtCQUFrQixDQUFDLENBQUE7QUFDeEQsdUJBQXFDLFVBQVUsQ0FBQyxDQUFBO0FBQ2hELHdCQUF3QixXQUFXLENBQUMsQ0FBQTtBQVVwQztJQUFBO1FBQUEsaUJBK0ZDO1FBOUZVLG1CQUFjLEdBQUc7WUFDcEIsa0JBQWtCLEVBQUUsZ0JBQWdCO1NBQ1QsQ0FBQztRQUd4QixpQkFBWSxHQUFHLEVBQXNCLENBQUM7UUFDdEMsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFpQ2xCLFNBQUksR0FBRztZQUNWLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQzVCLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUE7UUFFTSxTQUFJLEdBQUc7WUFDVixLQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQyxDQUFBO0lBOENMLENBQUM7SUFyRlUsOEJBQU0sR0FBYjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUUsSUFBSSxDQUFD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QUMsQ0FBQztRQUNwRixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQS9GQSxBQStGQyxJQUFBO0FBRUQscUJBQXFCO0FBQ3JCLElBQU0sY0FBYyxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7QUFFM0M7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ3RDLENBQUM7QUFGZSw4QkFBc0IseUJBRXJDLENBQUE7QUFFRCwrQkFBc0MsS0FBMEI7SUFDNUQsR0FBRyxDQUFDLENBQUMsSUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixjQUFjLENBQUMsY0FBc0IsQ0FBQyxHQUFHLENBQUMsR0FBSSxLQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBTmUsNkJBQXFCLHdCQU1wQyxDQUFBO0FBRUQsMkJBQWtDLE9BQXVCO0lBQ3JELGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBRmUseUJBQWlCLG9CQUVoQyxDQUFBO0FBRUQ7SUFDSSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDMUIsQ0FBQztBQUZlLHlCQUFpQixvQkFFaEMsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2hvdGtleXMvaG90a2V5c0RpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmltcG9ydCB7IENsYXNzZXMgfSBmcm9tIFwiLi4vLi4vY29tbW9uXCI7XG5pbXBvcnQgeyBEaWFsb2csIElEaWFsb2dQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBIb3RrZXksIElIb3RrZXlQcm9wcyB9IGZyb20gXCIuL2hvdGtleVwiO1xuaW1wb3J0IHsgSG90a2V5cyB9IGZyb20gXCIuL2hvdGtleXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJSG90a2V5c0RpYWxvZ1Byb3BzIGV4dGVuZHMgSURpYWxvZ1Byb3BzIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIHN0cmluZyBkaXNwbGF5ZWQgYXMgdGhlIGdyb3VwIG5hbWUgaW4gdGhlIGhvdGtleXMgZGlhbG9nIGZvciBhbGxcbiAgICAgKiBnbG9iYWwgaG90a2V5cy5cbiAgICAgKi9cbiAgICBnbG9iYWxIb3RrZXlzR3JvdXA/OiBzdHJpbmc7XG59XG5cbmNsYXNzIEhvdGtleXNEaWFsb2cge1xuICAgIHB1YmxpYyBjb21wb25lbnRQcm9wcyA9IHtcbiAgICAgICAgZ2xvYmFsSG90a2V5c0dyb3VwOiBcIkdsb2JhbCBob3RrZXlzXCIsXG4gICAgfSBhcyBhbnkgYXMgSUhvdGtleXNEaWFsb2dQcm9wcztcblxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGhvdGtleXNRdWV1ZSA9IFtdIGFzIElIb3RrZXlQcm9wc1tdW107XG4gICAgcHJpdmF0ZSBpc0RpYWxvZ1Nob3dpbmcgPSBmYWxzZTtcbiAgICBwcml2YXRlIHRpbWVvdXRUb2tlbiA9IDA7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmdldENvbnRhaW5lcigpO1xuICAgICAgICB9XG4gICAgICAgIFJlYWN0RE9NLnJlbmRlcih0aGlzLnJlbmRlckNvbXBvbmVudCgpLCB0aGlzLmNvbnRhaW5lcikgYXMgUmVhY3QuQ29tcG9uZW50PGFueSwgUmVhY3QuQ29tcG9uZW50U3RhdGU+O1xuICAgIH1cblxuICAgIHB1YmxpYyB1bm1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgUmVhY3RET00udW5tb3VudENvbXBvbmVudEF0Tm9kZSh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbnRhaW5lcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJlY2F1c2UgaG90a2V5cyBjYW4gYmUgcmVnaXN0ZXJlZCBnbG9iYWxseSBhbmQgbG9jYWxseSBhbmQgYmVjYXVzZVxuICAgICAqIGV2ZW50IG9yZGVyaW5nIGNhbm5vdCBiZSBndWFyYW50ZWVkLCB3ZSB1c2UgdGhpcyBkZWJvdW5jaW5nIG1ldGhvZCB0b1xuICAgICAqIGFsbG93IGFsbCBob3RrZXkgbGlzdGVuZXJzIHRvIGZpcmUgYW5kIGFkZCB0aGVpciBob3RrZXlzIHRvIHRoZSBkaWFsb2cuXG4gICAgICpcbiAgICAgKiAxMG1zZWMgYWZ0ZXIgdGhlIGxhc3QgbGlzdGVuZXIgYWRkcyB0aGVpciBob3RrZXlzLCB3ZSByZW5kZXIgdGhlIGRpYWxvZ1xuICAgICAqIGFuZCBjbGVhciB0aGUgcXVldWUuXG4gICAgICovXG4gICAgcHVibGljIGVucXVldWVIb3RrZXlzRm9yRGlzcGxheShob3RrZXlzOiBJSG90a2V5UHJvcHNbXSkge1xuICAgICAgICB0aGlzLmhvdGtleXNRdWV1ZS5wdXNoKGhvdGtleXMpO1xuXG4gICAgICAgIC8vIHJlc2V0IHRpbWVvdXQgZm9yIGRlYm91bmNlXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUb2tlbik7XG4gICAgICAgIHRoaXMudGltZW91dFRva2VuID0gc2V0VGltZW91dCh0aGlzLnNob3csIDEwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2hvdyA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5pc0RpYWxvZ1Nob3dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlID0gKCkgPT4ge1xuICAgICAgICB0aGlzLmlzRGlhbG9nU2hvd2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc1Nob3dpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRGlhbG9nU2hvd2luZztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldENvbnRhaW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVyID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoQ2xhc3Nlcy5QT1JUQUwpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRhaW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVuZGVyQ29tcG9uZW50KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPERpYWxvZ1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLmNvbXBvbmVudFByb3BzfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh0aGlzLmNvbXBvbmVudFByb3BzLmNsYXNzTmFtZSwgXCJwdC1ob3RrZXktZGlhbG9nXCIpfVxuICAgICAgICAgICAgICAgIGlzT3Blbj17dGhpcy5pc0RpYWxvZ1Nob3dpbmd9XG4gICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oaWRlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDbGFzc2VzLkRJQUxPR19CT0RZfT57dGhpcy5yZW5kZXJIb3RrZXlzKCl9PC9kaXY+XG4gICAgICAgICAgICA8L0RpYWxvZz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckhvdGtleXMoKSB7XG4gICAgICAgIGNvbnN0IGhvdGtleXMgPSB0aGlzLmVtcHR5SG90a2V5UXVldWUoKTtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBob3RrZXlzLm1hcCgoaG90a2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZ3JvdXAgPSAoaG90a2V5Lmdsb2JhbCA9PT0gdHJ1ZSAmJiBob3RrZXkuZ3JvdXAgPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcG9uZW50UHJvcHMuZ2xvYmFsSG90a2V5c0dyb3VwIDogaG90a2V5Lmdyb3VwO1xuXG4gICAgICAgICAgICByZXR1cm4gPEhvdGtleSBrZXk9e2luZGV4fSB7Li4uaG90a2V5fSBncm91cD17Z3JvdXB9IC8+O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gPEhvdGtleXM+e2VsZW1lbnRzfTwvSG90a2V5cz47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbXB0eUhvdGtleVF1ZXVlKCkge1xuICAgICAgICAvLyBmbGF0dGVuIHRoZW4gZW1wdHkgdGhlIGhvdGtleXMgcXVldWVcbiAgICAgICAgY29uc3QgaG90a2V5cyA9IHRoaXMuaG90a2V5c1F1ZXVlLnJlZHVjZSgoKGFyciwgcXVldWVkKSA9PiBhcnIuY29uY2F0KHF1ZXVlZCkpLCBbXSk7XG4gICAgICAgIHRoaXMuaG90a2V5c1F1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgIHJldHVybiBob3RrZXlzO1xuICAgIH1cbn1cblxuLy8gc2luZ2xldG9uIGluc3RhbmNlXG5jb25zdCBIT1RLRVlTX0RJQUxPRyA9IG5ldyBIb3RrZXlzRGlhbG9nKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0hvdGtleXNEaWFsb2dTaG93aW5nKCkge1xuICAgIHJldHVybiBIT1RLRVlTX0RJQUxPRy5pc1Nob3dpbmcoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEhvdGtleXNEaWFsb2dQcm9wcyhwcm9wczogSUhvdGtleXNEaWFsb2dQcm9wcykge1xuICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAoSE9US0VZU19ESUFMT0cuY29tcG9uZW50UHJvcHMgYXMgYW55KVtrZXldID0gKHByb3BzIGFzIGFueSlba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dIb3RrZXlzRGlhbG9nKGhvdGtleXM6IElIb3RrZXlQcm9wc1tdKSB7XG4gICAgSE9US0VZU19ESUFMT0cuZW5xdWV1ZUhvdGtleXNGb3JEaXNwbGF5KGhvdGtleXMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZUhvdGtleXNEaWFsb2coKSB7XG4gICAgSE9US0VZU19ESUFMT0cuaGlkZSgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
