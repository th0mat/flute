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
var React = require("react");
/**
 * An abstract component that Blueprint components can extend
 * in order to add some common functionality like runtime props validation.
 */
var AbstractComponent = (function (_super) {
    __extends(AbstractComponent, _super);
    function AbstractComponent(props, context) {
        var _this = this;
        _super.call(this, props, context);
        // Not bothering to remove entries when their timeouts finish because clearing invalid ID is a no-op
        this.timeoutIds = [];
        /**
         * Clear all known timeouts.
         */
        this.clearTimeouts = function () {
            if (_this.timeoutIds.length > 0) {
                for (var _i = 0, _a = _this.timeoutIds; _i < _a.length; _i++) {
                    var timeoutId = _a[_i];
                    clearTimeout(timeoutId);
                }
                _this.timeoutIds = [];
            }
        };
        this.validateProps(this.props);
    }
    AbstractComponent.prototype.componentWillReceiveProps = function (nextProps) {
        this.validateProps(nextProps);
    };
    AbstractComponent.prototype.componentWillUnmount = function () {
        this.clearTimeouts();
    };
    /**
     * Set a timeout and remember its ID.
     * All stored timeouts will be cleared when component unmounts.
     * @returns a "cancel" function that will clear timeout when invoked.
     */
    AbstractComponent.prototype.setTimeout = function (handler, timeout) {
        var handle = setTimeout(handler, timeout);
        this.timeoutIds.push(handle);
        return function () { return clearTimeout(handle); };
    };
    /**
     * Ensures that the props specified for a component are valid.
     * Implementations should check that props are valid and usually throw an Error if they are not.
     * Implementations should not duplicate checks that the type system already guarantees.
     *
     * This method should be used instead of React's
     * [propTypes](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) feature.
     * In contrast to propTypes, these runtime checks are _always_ run, not just in development mode.
     */
    AbstractComponent.prototype.validateProps = function (_) {
        // implement in subclass
    };
    ;
    return AbstractComponent;
}(React.Component));
exports.AbstractComponent = AbstractComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vYWJzdHJhY3RDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7QUFFSCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQjs7O0dBR0c7QUFDSDtJQUFzRCxxQ0FBcUI7SUFNdkUsMkJBQVksS0FBUyxFQUFFLE9BQWE7UUFOeEMsaUJBc0RDO1FBL0NPLGtCQUFNLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUoxQixvR0FBb0c7UUFDNUYsZUFBVSxHQUFhLEVBQUUsQ0FBQztRQTBCbEM7O1dBRUc7UUFDSSxrQkFBYSxHQUFHO1lBQ25CLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxDQUFvQixVQUFlLEVBQWYsS0FBQSxLQUFJLENBQUMsVUFBVSxFQUFmLGNBQWUsRUFBZixJQUFlLENBQUM7b0JBQW5DLElBQU0sU0FBUyxTQUFBO29CQUNoQixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzNCO2dCQUNELEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDLENBQUE7UUFoQ0csSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLHFEQUF5QixHQUFoQyxVQUFpQyxTQUEyQztRQUN4RSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxnREFBb0IsR0FBM0I7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxzQ0FBVSxHQUFqQixVQUFrQixPQUFpQixFQUFFLE9BQWdCO1FBQ2pELElBQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLGNBQU0sT0FBQSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQXBCLENBQW9CLENBQUM7SUFDdEMsQ0FBQztJQWNGOzs7Ozs7OztPQVFHO0lBQ1EseUNBQWEsR0FBdkIsVUFBd0IsQ0FBbUM7UUFDdkQsd0JBQXdCO0lBQzVCLENBQUM7O0lBQ0wsd0JBQUM7QUFBRCxDQXREQSxBQXNEQyxDQXREcUQsS0FBSyxDQUFDLFNBQVMsR0FzRHBFO0FBdERxQix5QkFBaUIsb0JBc0R0QyxDQUFBIiwiZmlsZSI6ImNvbW1vbi9hYnN0cmFjdENvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgY29tcG9uZW50IHRoYXQgQmx1ZXByaW50IGNvbXBvbmVudHMgY2FuIGV4dGVuZFxuICogaW4gb3JkZXIgdG8gYWRkIHNvbWUgY29tbW9uIGZ1bmN0aW9uYWxpdHkgbGlrZSBydW50aW1lIHByb3BzIHZhbGlkYXRpb24uXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdENvbXBvbmVudDxQLCBTPiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQLCBTPiB7XG4gICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG5cbiAgICAvLyBOb3QgYm90aGVyaW5nIHRvIHJlbW92ZSBlbnRyaWVzIHdoZW4gdGhlaXIgdGltZW91dHMgZmluaXNoIGJlY2F1c2UgY2xlYXJpbmcgaW52YWxpZCBJRCBpcyBhIG5vLW9wXG4gICAgcHJpdmF0ZSB0aW1lb3V0SWRzOiBudW1iZXJbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM/OiBQLCBjb250ZXh0PzogYW55KSB7XG4gICAgICAgIHN1cGVyKHByb3BzLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVByb3BzKHRoaXMucHJvcHMpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogUCAmIHtjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZX0pIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVByb3BzKG5leHRQcm9wcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgYSB0aW1lb3V0IGFuZCByZW1lbWJlciBpdHMgSUQuXG4gICAgICogQWxsIHN0b3JlZCB0aW1lb3V0cyB3aWxsIGJlIGNsZWFyZWQgd2hlbiBjb21wb25lbnQgdW5tb3VudHMuXG4gICAgICogQHJldHVybnMgYSBcImNhbmNlbFwiIGZ1bmN0aW9uIHRoYXQgd2lsbCBjbGVhciB0aW1lb3V0IHdoZW4gaW52b2tlZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0VGltZW91dChoYW5kbGVyOiBGdW5jdGlvbiwgdGltZW91dD86IG51bWJlcikge1xuICAgICAgICBjb25zdCBoYW5kbGUgPSBzZXRUaW1lb3V0KGhhbmRsZXIsIHRpbWVvdXQpO1xuICAgICAgICB0aGlzLnRpbWVvdXRJZHMucHVzaChoYW5kbGUpO1xuICAgICAgICByZXR1cm4gKCkgPT4gY2xlYXJUaW1lb3V0KGhhbmRsZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXIgYWxsIGtub3duIHRpbWVvdXRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBjbGVhclRpbWVvdXRzID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50aW1lb3V0SWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdGltZW91dElkIG9mIHRoaXMudGltZW91dElkcykge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50aW1lb3V0SWRzID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgIC8qKlxuICAgICogRW5zdXJlcyB0aGF0IHRoZSBwcm9wcyBzcGVjaWZpZWQgZm9yIGEgY29tcG9uZW50IGFyZSB2YWxpZC5cbiAgICAqIEltcGxlbWVudGF0aW9ucyBzaG91bGQgY2hlY2sgdGhhdCBwcm9wcyBhcmUgdmFsaWQgYW5kIHVzdWFsbHkgdGhyb3cgYW4gRXJyb3IgaWYgdGhleSBhcmUgbm90LlxuICAgICogSW1wbGVtZW50YXRpb25zIHNob3VsZCBub3QgZHVwbGljYXRlIGNoZWNrcyB0aGF0IHRoZSB0eXBlIHN5c3RlbSBhbHJlYWR5IGd1YXJhbnRlZXMuXG4gICAgKlxuICAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiBSZWFjdCdzXG4gICAgKiBbcHJvcFR5cGVzXShodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3JldXNhYmxlLWNvbXBvbmVudHMuaHRtbCNwcm9wLXZhbGlkYXRpb24pIGZlYXR1cmUuXG4gICAgKiBJbiBjb250cmFzdCB0byBwcm9wVHlwZXMsIHRoZXNlIHJ1bnRpbWUgY2hlY2tzIGFyZSBfYWx3YXlzXyBydW4sIG5vdCBqdXN0IGluIGRldmVsb3BtZW50IG1vZGUuXG4gICAgKi9cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVQcm9wcyhfOiBQICYge2NoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlfSkge1xuICAgICAgICAvLyBpbXBsZW1lbnQgaW4gc3ViY2xhc3NcbiAgICB9O1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
