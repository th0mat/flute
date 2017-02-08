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
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Keys = require("../../common/keys");
var utils_1 = require("../../common/utils");
// props that require number values, for validation
var NUMBER_PROPS = ["max", "min", "stepSize", "tickSize", "value"];
var Handle = (function (_super) {
    __extends(Handle, _super);
    function Handle() {
        var _this = this;
        _super.apply(this, arguments);
        this.displayName = "Blueprint.SliderHandle";
        this.state = {
            isMoving: false,
        };
        this.refHandlers = {
            handle: function (el) { return _this.handleElement = el; },
        };
        this.beginHandleMovement = function (event) {
            document.addEventListener("mousemove", _this.handleHandleMovement);
            document.addEventListener("mouseup", _this.endHandleMovement);
            _this.setState({ isMoving: true });
            _this.changeValue(_this.clientToValue(event.clientX));
        };
        this.beginHandleTouchMovement = function (event) {
            document.addEventListener("touchmove", _this.handleHandleTouchMovement);
            document.addEventListener("touchend", _this.endHandleTouchMovement);
            document.addEventListener("touchcancel", _this.endHandleTouchMovement);
            _this.setState({ isMoving: true });
            _this.changeValue(_this.clientToValue(_this.touchEventClientX(event)));
        };
        this.endHandleMovement = function (event) {
            _this.handleMoveEndedAt(event.clientX);
        };
        this.endHandleTouchMovement = function (event) {
            _this.handleMoveEndedAt(_this.touchEventClientX(event));
        };
        this.handleMoveEndedAt = function (clientPixel) {
            _this.removeDocumentEventListeners();
            _this.setState({ isMoving: false });
            // not using changeValue because we want to invoke the handler regardless of current prop value
            var onRelease = _this.props.onRelease;
            var finalValue = _this.clamp(_this.clientToValue(clientPixel));
            utils_1.safeInvoke(onRelease, finalValue);
        };
        this.handleHandleMovement = function (event) {
            _this.handleMovedTo(event.clientX);
        };
        this.handleHandleTouchMovement = function (event) {
            _this.handleMovedTo(_this.touchEventClientX(event));
        };
        this.handleMovedTo = function (clientPixel) {
            if (_this.state.isMoving && !_this.props.disabled) {
                _this.changeValue(_this.clientToValue(clientPixel));
            }
        };
        this.handleKeyDown = function (event) {
            var _a = _this.props, stepSize = _a.stepSize, value = _a.value;
            var which = event.which;
            if (which === Keys.ARROW_DOWN || which === Keys.ARROW_LEFT) {
                _this.changeValue(value - stepSize);
                // this key event has been handled! prevent browser scroll on up/down
                event.preventDefault();
            }
            else if (which === Keys.ARROW_UP || which === Keys.ARROW_RIGHT) {
                _this.changeValue(value + stepSize);
                event.preventDefault();
            }
        };
        this.handleKeyUp = function (event) {
            if ([Keys.ARROW_UP, Keys.ARROW_DOWN, Keys.ARROW_LEFT, Keys.ARROW_RIGHT].indexOf(event.which) >= 0) {
                utils_1.safeInvoke(_this.props.onRelease, _this.props.value);
            }
        };
    }
    Handle.prototype.render = function () {
        var _a = this.props, className = _a.className, disabled = _a.disabled, label = _a.label, min = _a.min, tickSize = _a.tickSize, value = _a.value;
        var isMoving = this.state.isMoving;
        // getBoundingClientRect().height includes border size as opposed to clientHeight
        var handleSize = (this.handleElement == null ? 0 : this.handleElement.getBoundingClientRect().height);
        return (React.createElement("span", {className: classNames(Classes.SLIDER_HANDLE, (_b = {}, _b[Classes.ACTIVE] = isMoving, _b), className), onKeyDown: disabled ? null : this.handleKeyDown, onKeyUp: disabled ? null : this.handleKeyUp, onMouseDown: disabled ? null : this.beginHandleMovement, onTouchStart: disabled ? null : this.beginHandleTouchMovement, ref: this.refHandlers.handle, style: { left: Math.round((value - min) * tickSize - handleSize / 2) }, tabIndex: 0}, label == null ? null : React.createElement("span", {className: Classes.SLIDER_LABEL}, label)));
        var _b;
    };
    Handle.prototype.componentWillUnmount = function () {
        this.removeDocumentEventListeners();
    };
    /** Convert client pixel to value between min and max. */
    Handle.prototype.clientToValue = function (clientPixel) {
        var _a = this.props, stepSize = _a.stepSize, tickSize = _a.tickSize, value = _a.value;
        if (this.handleElement == null) {
            return value;
        }
        var handleRect = this.handleElement.getBoundingClientRect();
        var handleCenterPixel = handleRect.left + handleRect.width / 2;
        var pixelDelta = clientPixel - handleCenterPixel;
        // convert pixels to range value in increments of `stepSize`
        var valueDelta = Math.round(pixelDelta / (tickSize * stepSize)) * stepSize;
        return value + valueDelta;
    };
    Handle.prototype.touchEventClientX = function (event) {
        return event.changedTouches[0].clientX;
    };
    Handle.prototype.validateProps = function (props) {
        for (var _i = 0, NUMBER_PROPS_1 = NUMBER_PROPS; _i < NUMBER_PROPS_1.length; _i++) {
            var prop = NUMBER_PROPS_1[_i];
            if (typeof props[prop] !== "number") {
                throw new Error("Handle requires number for " + prop + " prop");
            }
        }
    };
    /** Clamp value and invoke callback if it differs from current value */
    Handle.prototype.changeValue = function (newValue, callback) {
        if (callback === void 0) { callback = this.props.onChange; }
        newValue = this.clamp(newValue);
        if (!isNaN(newValue) && this.props.value !== newValue) {
            utils_1.safeInvoke(callback, newValue);
        }
    };
    /** Clamp value between min and max props */
    Handle.prototype.clamp = function (value) {
        return utils_1.clamp(value, this.props.min, this.props.max);
    };
    Handle.prototype.removeDocumentEventListeners = function () {
        document.removeEventListener("mousemove", this.handleHandleMovement);
        document.removeEventListener("mouseup", this.endHandleMovement);
        document.removeEventListener("touchmove", this.handleHandleTouchMovement);
        document.removeEventListener("touchend", this.endHandleTouchMovement);
        document.removeEventListener("touchcancel", this.endHandleTouchMovement);
    };
    Handle = __decorate([
        PureRender
    ], Handle);
    return Handle;
}(abstractComponent_1.AbstractComponent));
exports.Handle = Handle;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3NsaWRlci9oYW5kbGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxVQUFVLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksSUFBSSxXQUFNLG1CQUFtQixDQUFDLENBQUE7QUFFMUMsc0JBQWtDLG9CQUFvQixDQUFDLENBQUE7QUFtQnZELG1EQUFtRDtBQUNuRCxJQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUdyRTtJQUE0QiwwQkFBNkM7SUFBekU7UUFBQSxpQkFpSkM7UUFqSjJCLDhCQUE2QztRQUM5RCxnQkFBVyxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZDLFVBQUssR0FBRztZQUNYLFFBQVEsRUFBRSxLQUFLO1NBQ2xCLENBQUM7UUFHTSxnQkFBVyxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxVQUFDLEVBQW1CLElBQUssT0FBQSxLQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsRUFBdkIsQ0FBdUI7U0FDM0QsQ0FBQztRQTJDSyx3QkFBbUIsR0FBRyxVQUFDLEtBQWlEO1lBQzNFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3RCxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7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LENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTyw2Q0FBNEIsR0FBcEM7UUFDSSxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEUsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUMxRSxRQUFRLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDN0UsQ0FBQztJQWpKTDtRQUFDLFVBQVU7Y0FBQTtJQWtKWCxhQUFDO0FBQUQsQ0FqSkEsQUFpSkMsQ0FqSjJCLHFDQUFpQixHQWlKNUM7QUFqSlksY0FBTSxTQWlKbEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL3NsaWRlci9oYW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEtleXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9rZXlzXCI7XG5pbXBvcnQgeyBJUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5pbXBvcnQgeyBjbGFtcCwgc2FmZUludm9rZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJSGFuZGxlUHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICBsYWJlbDogUmVhY3QuUmVhY3RDaGlsZDtcbiAgICBtYXg6IG51bWJlcjtcbiAgICBtaW46IG51bWJlcjtcbiAgICBvbkNoYW5nZT86IChuZXdWYWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuICAgIG9uUmVsZWFzZT86IChuZXdWYWx1ZTogbnVtYmVyKSA9PiB2b2lkO1xuICAgIHN0ZXBTaXplOiBudW1iZXI7XG4gICAgdGlja1NpemU6IG51bWJlcjtcbiAgICB2YWx1ZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElIYW5kbGVTdGF0ZSB7XG4gICAgLyoqIHdoZXRoZXIgc2xpZGVyIGhhbmRsZSBpcyBjdXJyZW50bHkgYmVpbmcgZHJhZ2dlZCAqL1xuICAgIGlzTW92aW5nPzogYm9vbGVhbjtcbn1cblxuLy8gcHJvcHMgdGhhdCByZXF1aXJlIG51bWJlciB2YWx1ZXMsIGZvciB2YWxpZGF0aW9uXG5jb25zdCBOVU1CRVJfUFJPUFMgPSBbXCJtYXhcIiwgXCJtaW5cIiwgXCJzdGVwU2l6ZVwiLCBcInRpY2tTaXplXCIsIFwidmFsdWVcIl07XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgSGFuZGxlIGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SUhhbmRsZVByb3BzLCBJSGFuZGxlU3RhdGU+IHtcbiAgICBwdWJsaWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5TbGlkZXJIYW5kbGVcIjtcbiAgICBwdWJsaWMgc3RhdGUgPSB7XG4gICAgICAgIGlzTW92aW5nOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoYW5kbGVFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHJlZkhhbmRsZXJzID0ge1xuICAgICAgICBoYW5kbGU6IChlbDogSFRNTFNwYW5FbGVtZW50KSA9PiB0aGlzLmhhbmRsZUVsZW1lbnQgPSBlbCxcbiAgICB9O1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjbGFzc05hbWUsIGRpc2FibGVkLCBsYWJlbCwgbWluLCB0aWNrU2l6ZSwgdmFsdWUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHsgaXNNb3ZpbmcgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIC8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCBpbmNsdWRlcyBib3JkZXIgc2l6ZSBhcyBvcHBvc2VkIHRvIGNsaWVudEhlaWdodFxuICAgICAgICBjb25zdCBoYW5kbGVTaXplID0gKHRoaXMuaGFuZGxlRWxlbWVudCA9PSBudWxsID8gMCA6IHRoaXMuaGFuZGxlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5TTElERVJfSEFORExFLCB7IFtDbGFzc2VzLkFDVElWRV06IGlzTW92aW5nIH0sIGNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgICAgb25LZXlEb3duPXtkaXNhYmxlZCA/IG51bGwgOiB0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgICAgICAgb25LZXlVcD17ZGlzYWJsZWQgPyBudWxsIDogdGhpcy5oYW5kbGVLZXlVcH1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRG93bj17ZGlzYWJsZWQgPyBudWxsIDogdGhpcy5iZWdpbkhhbmRsZU1vdmVtZW50fVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17ZGlzYWJsZWQgPyBudWxsIDogdGhpcy5iZWdpbkhhbmRsZVRvdWNoTW92ZW1lbnR9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnJlZkhhbmRsZXJzLmhhbmRsZX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiBNYXRoLnJvdW5kKCh2YWx1ZSAtIG1pbikgKiB0aWNrU2l6ZSAtIGhhbmRsZVNpemUgLyAyKSB9fVxuICAgICAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtsYWJlbCA9PSBudWxsID8gbnVsbCA6IDxzcGFuIGNsYXNzTmFtZT17Q2xhc3Nlcy5TTElERVJfTEFCRUx9PntsYWJlbH08L3NwYW4+fVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVEb2N1bWVudEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqIENvbnZlcnQgY2xpZW50IHBpeGVsIHRvIHZhbHVlIGJldHdlZW4gbWluIGFuZCBtYXguICovXG4gICAgcHVibGljIGNsaWVudFRvVmFsdWUoY2xpZW50UGl4ZWw6IG51bWJlcikge1xuICAgICAgICBjb25zdCB7IHN0ZXBTaXplLCB0aWNrU2l6ZSwgdmFsdWUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmICh0aGlzLmhhbmRsZUVsZW1lbnQgPT0gbnVsbCkgeyByZXR1cm4gdmFsdWU7IH1cbiAgICAgICAgY29uc3QgaGFuZGxlUmVjdCA9IHRoaXMuaGFuZGxlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgaGFuZGxlQ2VudGVyUGl4ZWwgPSBoYW5kbGVSZWN0LmxlZnQgKyBoYW5kbGVSZWN0LndpZHRoIC8gMjtcbiAgICAgICAgY29uc3QgcGl4ZWxEZWx0YSA9IGNsaWVudFBpeGVsIC0gaGFuZGxlQ2VudGVyUGl4ZWw7XG4gICAgICAgIC8vIGNvbnZlcnQgcGl4ZWxzIHRvIHJhbmdlIHZhbHVlIGluIGluY3JlbWVudHMgb2YgYHN0ZXBTaXplYFxuICAgICAgICBjb25zdCB2YWx1ZURlbHRhID0gTWF0aC5yb3VuZChwaXhlbERlbHRhIC8gKHRpY2tTaXplICogc3RlcFNpemUpKSAqIHN0ZXBTaXplO1xuICAgICAgICByZXR1cm4gdmFsdWUgKyB2YWx1ZURlbHRhO1xuICAgIH1cblxuICAgIHB1YmxpYyB0b3VjaEV2ZW50Q2xpZW50WChldmVudDogVG91Y2hFdmVudCB8IFJlYWN0LlRvdWNoRXZlbnQ8SFRNTEVsZW1lbnQ+KSB7XG4gICAgICAgIHJldHVybiBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xuICAgIH1cblxuICAgIHB1YmxpYyBiZWdpbkhhbmRsZU1vdmVtZW50ID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgUmVhY3QuTW91c2VFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLmhhbmRsZUhhbmRsZU1vdmVtZW50KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5lbmRIYW5kbGVNb3ZlbWVudCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc01vdmluZzogdHJ1ZSB9KTtcbiAgICAgICAgdGhpcy5jaGFuZ2VWYWx1ZSh0aGlzLmNsaWVudFRvVmFsdWUoZXZlbnQuY2xpZW50WCkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBiZWdpbkhhbmRsZVRvdWNoTW92ZW1lbnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQgfCBSZWFjdC5Ub3VjaEV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMuaGFuZGxlSGFuZGxlVG91Y2hNb3ZlbWVudCk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLmVuZEhhbmRsZVRvdWNoTW92ZW1lbnQpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hjYW5jZWxcIiwgdGhpcy5lbmRIYW5kbGVUb3VjaE1vdmVtZW50KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTW92aW5nOiB0cnVlIH0pO1xuICAgICAgICB0aGlzLmNoYW5nZVZhbHVlKHRoaXMuY2xpZW50VG9WYWx1ZSh0aGlzLnRvdWNoRXZlbnRDbGllbnRYKGV2ZW50KSkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB2YWxpZGF0ZVByb3BzKHByb3BzOiBJSGFuZGxlUHJvcHMpIHtcbiAgICAgICAgZm9yIChjb25zdCBwcm9wIG9mIE5VTUJFUl9QUk9QUykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAocHJvcHMgYXMgYW55KVtwcm9wXSAhPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSGFuZGxlIHJlcXVpcmVzIG51bWJlciBmb3IgJHtwcm9wfSBwcm9wYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGVuZEhhbmRsZU1vdmVtZW50ID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUVuZGVkQXQoZXZlbnQuY2xpZW50WCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBlbmRIYW5kbGVUb3VjaE1vdmVtZW50ID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZUVuZGVkQXQodGhpcy50b3VjaEV2ZW50Q2xpZW50WChldmVudCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlTW92ZUVuZGVkQXQgPSAoY2xpZW50UGl4ZWw6IG51bWJlcikgPT4ge1xuICAgICAgICB0aGlzLnJlbW92ZURvY3VtZW50RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzTW92aW5nOiBmYWxzZSB9KTtcbiAgICAgICAgLy8gbm90IHVzaW5nIGNoYW5nZVZhbHVlIGJlY2F1c2Ugd2Ugd2FudCB0byBpbnZva2UgdGhlIGhhbmRsZXIgcmVnYXJkbGVzcyBvZiBjdXJyZW50IHByb3AgdmFsdWVcbiAgICAgICAgY29uc3QgeyBvblJlbGVhc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGZpbmFsVmFsdWUgPSB0aGlzLmNsYW1wKHRoaXMuY2xpZW50VG9WYWx1ZShjbGllbnRQaXhlbCkpO1xuICAgICAgICBzYWZlSW52b2tlKG9uUmVsZWFzZSwgZmluYWxWYWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVIYW5kbGVNb3ZlbWVudCA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZU1vdmVkVG8oZXZlbnQuY2xpZW50WCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVIYW5kbGVUb3VjaE1vdmVtZW50ID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlTW92ZWRUbyh0aGlzLnRvdWNoRXZlbnRDbGllbnRYKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVNb3ZlZFRvID0gKGNsaWVudFBpeGVsOiBudW1iZXIpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNNb3ZpbmcgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVmFsdWUodGhpcy5jbGllbnRUb1ZhbHVlKGNsaWVudFBpeGVsKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUtleURvd24gPSAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTFNwYW5FbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCB7IHN0ZXBTaXplLCB2YWx1ZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgeyB3aGljaCB9ID0gZXZlbnQ7XG4gICAgICAgIGlmICh3aGljaCA9PT0gS2V5cy5BUlJPV19ET1dOIHx8IHdoaWNoID09PSBLZXlzLkFSUk9XX0xFRlQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVmFsdWUodmFsdWUgLSBzdGVwU2l6ZSk7XG4gICAgICAgICAgICAvLyB0aGlzIGtleSBldmVudCBoYXMgYmVlbiBoYW5kbGVkISBwcmV2ZW50IGJyb3dzZXIgc2Nyb2xsIG9uIHVwL2Rvd25cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAod2hpY2ggPT09IEtleXMuQVJST1dfVVAgfHwgd2hpY2ggPT09IEtleXMuQVJST1dfUklHSFQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVmFsdWUodmFsdWUgKyBzdGVwU2l6ZSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVLZXlVcCA9IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MU3BhbkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGlmIChbS2V5cy5BUlJPV19VUCwgS2V5cy5BUlJPV19ET1dOLCBLZXlzLkFSUk9XX0xFRlQsIEtleXMuQVJST1dfUklHSFRdLmluZGV4T2YoZXZlbnQud2hpY2gpID49IDApIHtcbiAgICAgICAgICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vblJlbGVhc2UsIHRoaXMucHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsYW1wIHZhbHVlIGFuZCBpbnZva2UgY2FsbGJhY2sgaWYgaXQgZGlmZmVycyBmcm9tIGN1cnJlbnQgdmFsdWUgKi9cbiAgICBwcml2YXRlIGNoYW5nZVZhbHVlKG5ld1ZhbHVlOiBudW1iZXIsIGNhbGxiYWNrID0gdGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuY2xhbXAobmV3VmFsdWUpO1xuICAgICAgICBpZiAoIWlzTmFOKG5ld1ZhbHVlKSAmJiB0aGlzLnByb3BzLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgc2FmZUludm9rZShjYWxsYmFjaywgbmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIENsYW1wIHZhbHVlIGJldHdlZW4gbWluIGFuZCBtYXggcHJvcHMgKi9cbiAgICBwcml2YXRlIGNsYW1wKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGNsYW1wKHZhbHVlLCB0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgcmVtb3ZlRG9jdW1lbnRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLmhhbmRsZUhhbmRsZU1vdmVtZW50KTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5lbmRIYW5kbGVNb3ZlbWVudCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5oYW5kbGVIYW5kbGVUb3VjaE1vdmVtZW50KTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuZW5kSGFuZGxlVG91Y2hNb3ZlbWVudCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGNhbmNlbFwiLCB0aGlzLmVuZEhhbmRsZVRvdWNoTW92ZW1lbnQpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
