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
var utils_1 = require("../../common/utils");
var CoreSlider = (function (_super) {
    __extends(CoreSlider, _super);
    function CoreSlider() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            tickSize: 0,
        };
        this.className = Classes.SLIDER;
        this.refHandlers = {
            track: function (el) { return _this.trackElement = el; },
        };
        this.maybeHandleTrackClick = function (event) {
            if (_this.canHandleTrackEvent(event)) {
                _this.handleTrackClick(event);
            }
        };
        this.maybeHandleTrackTouch = function (event) {
            if (_this.canHandleTrackEvent(event)) {
                _this.handleTrackTouch(event);
            }
        };
        this.canHandleTrackEvent = function (event) {
            var target = event.target;
            // ensure event does not come from inside the handle
            return !_this.props.disabled && target.closest("." + Classes.SLIDER_HANDLE) == null;
        };
    }
    CoreSlider.prototype.render = function () {
        var disabled = this.props.disabled;
        var classes = classNames(this.className, (_a = {},
            _a[Classes.DISABLED] = disabled,
            _a[Classes.SLIDER + "-unlabeled"] = this.props.renderLabel === false,
            _a
        ), this.props.className);
        return (React.createElement("div", {className: classes, onMouseDown: this.maybeHandleTrackClick, onTouchStart: this.maybeHandleTrackTouch}, 
            React.createElement("div", {className: Classes.SLIDER + "-track", ref: this.refHandlers.track}), 
            this.maybeRenderFill(), 
            this.maybeRenderAxis(), 
            this.renderHandles()));
        var _a;
    };
    CoreSlider.prototype.componentDidMount = function () {
        this.updateTickSize();
    };
    CoreSlider.prototype.componentDidUpdate = function () {
        this.updateTickSize();
    };
    CoreSlider.prototype.formatLabel = function (value) {
        var renderLabel = this.props.renderLabel;
        if (renderLabel === false) {
            return undefined;
        }
        else if (utils_1.isFunction(renderLabel)) {
            return renderLabel(value);
        }
        else {
            return value;
        }
    };
    CoreSlider.prototype.maybeRenderAxis = function () {
        var _a = this.props, max = _a.max, min = _a.min, labelStepSize = _a.labelStepSize;
        if (this.props.renderLabel === false) {
            return undefined;
        }
        var stepSize = Math.round(this.state.tickSize * labelStepSize);
        var labels = [];
        // tslint:disable-next-line:one-variable-per-declaration
        for (var i = min, left = 0; i < max || utils_1.approxEqual(i, max); i += labelStepSize, left += stepSize) {
            labels.push(React.createElement("div", {className: Classes.SLIDER + "-label", key: i, style: { left: left }}, this.formatLabel(i)));
        }
        return React.createElement("div", {className: Classes.SLIDER + "-axis"}, labels);
    };
    CoreSlider.prototype.maybeRenderFill = function () {
        if (this.props.showTrackFill && this.trackElement != null) {
            return this.renderFill();
        }
        return undefined;
    };
    CoreSlider.prototype.updateTickSize = function () {
        if (this.trackElement != null) {
            var tickSize = this.trackElement.clientWidth / (this.props.max - this.props.min);
            this.setState({ tickSize: tickSize });
        }
    };
    CoreSlider = __decorate([
        PureRender
    ], CoreSlider);
    return CoreSlider;
}(abstractComponent_1.AbstractComponent));
exports.CoreSlider = CoreSlider;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3NsaWRlci9jb3JlU2xpZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0Isa0NBQWtDLGdDQUFnQyxDQUFDLENBQUE7QUFDbkUsSUFBWSxPQUFPLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUVoRCxzQkFBd0Msb0JBQW9CLENBQUMsQ0FBQTtBQXNEN0Q7SUFBcUUsOEJBQWtDO0lBQXZHO1FBQUEsaUJBcUdDO1FBckdvRSw4QkFBa0M7UUFDNUYsVUFBSyxHQUFpQjtZQUN6QixRQUFRLEVBQUUsQ0FBQztTQUNkLENBQUM7UUFFSyxjQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUcxQixnQkFBVyxHQUFHO1lBQ2xCLEtBQUssRUFBRSxVQUFDLEVBQWtCLElBQUssT0FBQSxLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBdEIsQ0FBc0I7U0FDeEQsQ0FBQztRQW1FTSwwQkFBcUIsR0FBRyxVQUFDLEtBQXVDO1lBQ3BFLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRU8sMEJBQXFCLEdBQUcsVUFBQyxLQUF1QztZQUNwRSxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQUVPLHdC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RUFBQyxVQUFJLEVBQUUsR0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBRSxDQUFNLENBQUMsQ0FBQztRQUMvRyxDQUFDO1FBQ0QsTUFBTSxDQUFDLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUssT0FBTyxDQUFDLE1BQU0sVUFBUSxHQUFFLE1BQU8sQ0FBTSxDQUFDO0lBQ3BFLENBQUM7SUFFTyxvQ0FBZSxHQUF2QjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFvQk8sbUNBQWMsR0FBdEI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25GLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxrQkFBUSxFQUFFLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0wsQ0FBQztJQXJHTDtRQUFDLFVBQVU7a0JBQUE7SUFzR1gsaUJBQUM7QUFBRCxDQXJHQSxBQXFHQyxDQXJHb0UscUNBQWlCLEdBcUdyRjtBQXJHcUIsa0JBQVUsYUFxRy9CLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9zbGlkZXIvY29yZVNsaWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgQWJzdHJhY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Fic3RyYWN0Q29tcG9uZW50XCI7XG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0IHsgYXBwcm94RXF1YWwsIGlzRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcmVTbGlkZXJQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgc2xpZGVyIGlzIG5vbi1pbnRlcmFjdGl2ZS5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEluY3JlbWVudCBiZXR3ZWVuIHN1Y2Nlc3NpdmUgbGFiZWxzLlxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBsYWJlbFN0ZXBTaXplPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogTWF4aW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLlxuICAgICAqIEBkZWZhdWx0IDEwXG4gICAgICovXG4gICAgbWF4PzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogTWluaW11bSB2YWx1ZSBvZiB0aGUgc2xpZGVyLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICBtaW4/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgc29saWQgYmFyIHNob3VsZCBiZSByZW5kZXJlZCBvbiB0aGUgdHJhY2sgYmV0d2VlbiBjdXJyZW50IGFuZCBpbml0aWFsIHZhbHVlcyxcbiAgICAgKiBvciBiZXR3ZWVuIGhhbmRsZXMgZm9yIGBSYW5nZVNsaWRlcmAuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHNob3dUcmFja0ZpbGw/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSW5jcmVtZW50IGJldHdlZW4gc3VjY2Vzc2l2ZSB2YWx1ZXM7IGFtb3VudCBieSB3aGljaCB0aGUgaGFuZGxlIG1vdmVzLlxuICAgICAqIEBkZWZhdWx0IDFcbiAgICAgKi9cbiAgICBzdGVwU2l6ZT86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIHJlbmRlciBhIHNpbmdsZSBsYWJlbC4gVXNlZnVsIGZvciBmb3JtYXR0aW5nIG51bWJlcnMgYXMgY3VycmVuY3kgb3IgcGVyY2VudGFnZXMuXG4gICAgICogSWYgYHRydWVgLCBsYWJlbHMgd2lsbCB1c2UgbnVtYmVyIHZhbHVlLiBJZiBgZmFsc2VgLCBsYWJlbHMgd2lsbCBub3QgYmUgc2hvd24uXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIHJlbmRlckxhYmVsPzogKCh2YWx1ZTogbnVtYmVyKSA9PiBzdHJpbmcgfCBKU1guRWxlbWVudCkgfCBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTbGlkZXJTdGF0ZSB7XG4gICAgLyoqIHRoZSBjbGllbnQgc2l6ZSwgaW4gcGl4ZWxzLCBvZiBvbmUgdGljayAqL1xuICAgIHRpY2tTaXplPzogbnVtYmVyO1xufVxuXG5AUHVyZVJlbmRlclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvcmVTbGlkZXI8UCBleHRlbmRzIElDb3JlU2xpZGVyUHJvcHM+IGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8UCwgSVNsaWRlclN0YXRlPiB7XG4gICAgcHVibGljIHN0YXRlOiBJU2xpZGVyU3RhdGUgPSB7XG4gICAgICAgIHRpY2tTaXplOiAwLFxuICAgIH07XG5cbiAgICBwdWJsaWMgY2xhc3NOYW1lID0gQ2xhc3Nlcy5TTElERVI7XG5cbiAgICBwcml2YXRlIHRyYWNrRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZWZIYW5kbGVycyA9IHtcbiAgICAgICAgdHJhY2s6IChlbDogSFRNTERpdkVsZW1lbnQpID0+IHRoaXMudHJhY2tFbGVtZW50ID0gZWwsXG4gICAgfTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgZGlzYWJsZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWVzKHRoaXMuY2xhc3NOYW1lLCB7XG4gICAgICAgICAgICBbQ2xhc3Nlcy5ESVNBQkxFRF06IGRpc2FibGVkLFxuICAgICAgICAgICAgW2Ake0NsYXNzZXMuU0xJREVSfS11bmxhYmVsZWRgXTogdGhpcy5wcm9wcy5yZW5kZXJMYWJlbCA9PT0gZmFsc2UsXG4gICAgICAgIH0sIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXN9XG4gICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMubWF5YmVIYW5kbGVUcmFja0NsaWNrfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17dGhpcy5tYXliZUhhbmRsZVRyYWNrVG91Y2h9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake0NsYXNzZXMuU0xJREVSfS10cmFja2B9IHJlZj17dGhpcy5yZWZIYW5kbGVycy50cmFja30gLz5cbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckZpbGwoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckF4aXMoKX1cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJIYW5kbGVzKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlVGlja1NpemUoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRpY2tTaXplKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IHJlbmRlckhhbmRsZXMoKTogSlNYLkVsZW1lbnQgfCBKU1guRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCByZW5kZXJGaWxsKCk6IEpTWC5FbGVtZW50O1xuICAgIC8qKiBBbiBldmVudCBsaXN0ZW5lciBpbnZva2VkIHdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSB0cmFjayBvdXRzaWRlIGEgaGFuZGxlICovXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGhhbmRsZVRyYWNrQ2xpY2soZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEVsZW1lbnQ+KTogdm9pZDtcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgaGFuZGxlVHJhY2tUb3VjaChldmVudDogUmVhY3QuVG91Y2hFdmVudDxIVE1MRWxlbWVudD4pOiB2b2lkO1xuXG4gICAgcHJvdGVjdGVkIGZvcm1hdExhYmVsKHZhbHVlOiBudW1iZXIpOiBSZWFjdC5SZWFjdENoaWxkIHtcbiAgICAgICAgY29uc3QgeyByZW5kZXJMYWJlbCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKHJlbmRlckxhYmVsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHJlbmRlckxhYmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlbmRlckxhYmVsKHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJBeGlzKCkge1xuICAgICAgICBjb25zdCB7IG1heCwgbWluLCBsYWJlbFN0ZXBTaXplIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZW5kZXJMYWJlbCA9PT0gZmFsc2UpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuXG4gICAgICAgIGNvbnN0IHN0ZXBTaXplID0gTWF0aC5yb3VuZCh0aGlzLnN0YXRlLnRpY2tTaXplICogbGFiZWxTdGVwU2l6ZSk7XG4gICAgICAgIGNvbnN0IGxhYmVsczogSlNYLkVsZW1lbnRbXSA9IFtdO1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b25lLXZhcmlhYmxlLXBlci1kZWNsYXJhdGlvblxuICAgICAgICBmb3IgKGxldCBpID0gbWluLCBsZWZ0ID0gMDsgaSA8IG1heCB8fCBhcHByb3hFcXVhbChpLCBtYXgpOyBpICs9IGxhYmVsU3RlcFNpemUsIGxlZnQgKz0gc3RlcFNpemUpIHtcbiAgICAgICAgICAgIGxhYmVscy5wdXNoKDxkaXYgY2xhc3NOYW1lPXtgJHtDbGFzc2VzLlNMSURFUn0tbGFiZWxgfSBrZXk9e2l9IHN0eWxlPXt7bGVmdH19Pnt0aGlzLmZvcm1hdExhYmVsKGkpfTwvZGl2Pik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtgJHtDbGFzc2VzLlNMSURFUn0tYXhpc2B9PntsYWJlbHN9PC9kaXY+O1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJGaWxsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaG93VHJhY2tGaWxsICYmIHRoaXMudHJhY2tFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZpbGwoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVIYW5kbGVUcmFja0NsaWNrID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYW5IYW5kbGVUcmFja0V2ZW50KGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVUcmFja0NsaWNrKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVIYW5kbGVUcmFja1RvdWNoID0gKGV2ZW50OiBSZWFjdC5Ub3VjaEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgICBpZiAodGhpcy5jYW5IYW5kbGVUcmFja0V2ZW50KGV2ZW50KSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVUcmFja1RvdWNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgY2FuSGFuZGxlVHJhY2tFdmVudCA9IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4gfCBSZWFjdC5Ub3VjaEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIC8vIGVuc3VyZSBldmVudCBkb2VzIG5vdCBjb21lIGZyb20gaW5zaWRlIHRoZSBoYW5kbGVcbiAgICAgICAgcmV0dXJuICF0aGlzLnByb3BzLmRpc2FibGVkICYmIHRhcmdldC5jbG9zZXN0KGAuJHtDbGFzc2VzLlNMSURFUl9IQU5ETEV9YCkgPT0gbnVsbDtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVRpY2tTaXplKCkge1xuICAgICAgICBpZiAodGhpcy50cmFja0VsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgdGlja1NpemUgPSB0aGlzLnRyYWNrRWxlbWVudC5jbGllbnRXaWR0aCAvICh0aGlzLnByb3BzLm1heCAtIHRoaXMucHJvcHMubWluKTtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0aWNrU2l6ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
