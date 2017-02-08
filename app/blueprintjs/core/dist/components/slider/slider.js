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
var Classes = require("../../common/classes");
var utils_1 = require("../../common/utils");
var coreSlider_1 = require("./coreSlider");
var handle_1 = require("./handle");
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        var _this = this;
        _super.apply(this, arguments);
        this.handleHandleRef = function (ref) {
            _this.handle = ref;
        };
    }
    Slider.prototype.renderFill = function () {
        var initialValue = utils_1.clamp(this.props.initialValue, this.props.min, this.props.max);
        var left = Math.round((initialValue - this.props.min) * this.state.tickSize);
        var width = Math.round((this.props.value - initialValue) * this.state.tickSize);
        if (width < 0) {
            left += width;
            width = Math.abs(width);
        }
        return React.createElement("div", {className: Classes.SLIDER + "-progress", style: { left: left, width: width }});
    };
    Slider.prototype.renderHandles = function () {
        // make sure to *not* pass this.props.className to handle
        return (React.createElement(handle_1.Handle, __assign({}, this.props, this.state, {className: "", label: this.formatLabel(this.props.value), ref: this.handleHandleRef})));
    };
    Slider.prototype.handleTrackClick = function (event) {
        if (this.handle != null) {
            this.handle.beginHandleMovement(event);
        }
    };
    Slider.prototype.handleTrackTouch = function (event) {
        if (this.handle != null) {
            this.handle.beginHandleTouchMovement(event);
        }
    };
    Slider.defaultProps = {
        disabled: false,
        initialValue: 0,
        labelStepSize: 1,
        max: 10,
        min: 0,
        showTrackFill: true,
        stepSize: 1,
        value: 0,
    };
    return Slider;
}(coreSlider_1.CoreSlider));
exports.Slider = Slider;
exports.SliderFactory = React.createFactory(Slider);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3NsaWRlci9zbGlkZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELHNCQUFzQixvQkFBb0IsQ0FBQyxDQUFBO0FBQzNDLDJCQUE2QyxjQUFjLENBQUMsQ0FBQTtBQUM1RCx1QkFBdUIsVUFBVSxDQUFDLENBQUE7QUFzQmxDO0lBQTRCLDBCQUF3QjtJQUFwRDtRQUFBLGlCQXVEQztRQXZEMkIsOEJBQXdCO1FBb0R4QyxvQkFBZSxHQUFHLFVBQUMsR0FBVztZQUNsQyxLQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUN0QixDQUFDLENBQUE7SUFDTCxDQUFDO0lBdkNhLDJCQUFVLEdBQXBCO1FBQ0ksSUFBTSxZQUFZLEdBQUcsYUFBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEYsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0UsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEYsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLElBQUksS0FBSyxDQUFDO1lBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNELE1BQU0sQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFLLE9BQU8sQ0FBQyxNQUFNLGNBQVksRUFBQyxLQUFLLEVBQUUsRUFBRSxVQUFJLEVBQUUsWUFBSyxFQUFHLEVBQUcsQ0FBQztJQUNwRixDQUFDO0lBRVMsOEJBQWEsR0FBdkI7UUFDSSx5REFBeUQ7UUFDekQsTUFBTSxDQUFDLENBQ0gsb0JBQUMsZUFBTSxlQUNDLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLEtBQUssR0FDZCxTQUFTLEVBQUMsRUFBRSxFQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQzFDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZ0IsR0FDNUIsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVTLGlDQUFnQixHQUExQixVQUEyQixLQUFvQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLGlDQUFnQixHQUExQixVQUEyQixLQUFvQztRQUMzRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0wsQ0FBQztJQWpEYSxtQkFBWSxHQUFpQjtRQUN2QyxRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxDQUFDO1FBQ2YsYUFBYSxFQUFFLENBQUM7UUFDaEIsR0FBRyxFQUFFLEVBQUU7UUFDUCxHQUFHLEVBQUUsQ0FBQztRQUNOLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFFBQVEsRUFBRSxDQUFDO1FBQ1gsS0FBSyxFQUFFLENBQUM7S0FDWCxDQUFDO0lBNkNOLGFBQUM7QUFBRCxDQXZEQSxBQXVEQyxDQXZEMkIsdUJBQVUsR0F1RHJDO0FBdkRZLGNBQU0sU0F1RGxCLENBQUE7QUFFWSxxQkFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9zbGlkZXIvc2xpZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuaW1wb3J0IHsgQ29yZVNsaWRlciwgSUNvcmVTbGlkZXJQcm9wcyB9IGZyb20gXCIuL2NvcmVTbGlkZXJcIjtcbmltcG9ydCB7IEhhbmRsZSB9IGZyb20gXCIuL2hhbmRsZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTbGlkZXJQcm9wcyBleHRlbmRzIElDb3JlU2xpZGVyUHJvcHMge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWwgdmFsdWUgb2YgdGhlIHNsaWRlciwgZGV0ZXJtaW5lcyB3aGVyZSB0aGUgZmlsbCBzdGFydHMgZnJvbS5cbiAgICAgKiBAZGVmYXVsdCAwXG4gICAgICovXG4gICAgaW5pdGlhbFZhbHVlPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVmFsdWUgb2Ygc2xpZGVyLlxuICAgICAqIEBkZWZhdWx0IDBcbiAgICAgKi9cbiAgICB2YWx1ZT86IG51bWJlcjtcblxuICAgIC8qKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuICovXG4gICAgb25DaGFuZ2U/KHZhbHVlOiBudW1iZXIpOiB2b2lkO1xuXG4gICAgLyoqIENhbGxiYWNrIGludm9rZWQgd2hlbiB0aGUgaGFuZGxlIGlzIHJlbGVhc2VkLiAqL1xuICAgIG9uUmVsZWFzZT8odmFsdWU6IG51bWJlcik6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBDb3JlU2xpZGVyPElTbGlkZXJQcm9wcz4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzOiBJU2xpZGVyUHJvcHMgPSB7XG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgaW5pdGlhbFZhbHVlOiAwLFxuICAgICAgICBsYWJlbFN0ZXBTaXplOiAxLFxuICAgICAgICBtYXg6IDEwLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIHNob3dUcmFja0ZpbGw6IHRydWUsXG4gICAgICAgIHN0ZXBTaXplOiAxLFxuICAgICAgICB2YWx1ZTogMCxcbiAgICB9O1xuXG4gICAgcHVibGljIGRpc3BsYXlOYW1lOiBcIkJsdWVwcmludC5TbGlkZXJcIjtcblxuICAgIHByaXZhdGUgaGFuZGxlOiBIYW5kbGU7XG5cbiAgICBwcm90ZWN0ZWQgcmVuZGVyRmlsbCgpIHtcbiAgICAgICAgY29uc3QgaW5pdGlhbFZhbHVlID0gY2xhbXAodGhpcy5wcm9wcy5pbml0aWFsVmFsdWUsIHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCk7XG4gICAgICAgIGxldCBsZWZ0ID0gTWF0aC5yb3VuZCgoaW5pdGlhbFZhbHVlIC0gdGhpcy5wcm9wcy5taW4pICogdGhpcy5zdGF0ZS50aWNrU2l6ZSk7XG4gICAgICAgIGxldCB3aWR0aCA9IE1hdGgucm91bmQoKHRoaXMucHJvcHMudmFsdWUgLSBpbml0aWFsVmFsdWUpICogdGhpcy5zdGF0ZS50aWNrU2l6ZSk7XG4gICAgICAgIGlmICh3aWR0aCA8IDApIHtcbiAgICAgICAgICAgIGxlZnQgKz0gd2lkdGg7XG4gICAgICAgICAgICB3aWR0aCA9IE1hdGguYWJzKHdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e2Ake0NsYXNzZXMuU0xJREVSfS1wcm9ncmVzc2B9IHN0eWxlPXt7IGxlZnQsIHdpZHRoIH19IC8+O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZW5kZXJIYW5kbGVzKCkge1xuICAgICAgICAvLyBtYWtlIHN1cmUgdG8gKm5vdCogcGFzcyB0aGlzLnByb3BzLmNsYXNzTmFtZSB0byBoYW5kbGVcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxIYW5kbGVcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5zdGF0ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJcIlxuICAgICAgICAgICAgICAgIGxhYmVsPXt0aGlzLmZvcm1hdExhYmVsKHRoaXMucHJvcHMudmFsdWUpfVxuICAgICAgICAgICAgICAgIHJlZj17dGhpcy5oYW5kbGVIYW5kbGVSZWZ9XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoYW5kbGVUcmFja0NsaWNrKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50Pikge1xuICAgICAgICBpZiAodGhpcy5oYW5kbGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGUuYmVnaW5IYW5kbGVNb3ZlbWVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGFuZGxlVHJhY2tUb3VjaChldmVudDogUmVhY3QuVG91Y2hFdmVudDxIVE1MRWxlbWVudD4pIHtcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlLmJlZ2luSGFuZGxlVG91Y2hNb3ZlbWVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUhhbmRsZVJlZiA9IChyZWY6IEhhbmRsZSkgPT4ge1xuICAgICAgICB0aGlzLmhhbmRsZSA9IHJlZjtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBTbGlkZXJGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShTbGlkZXIpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
