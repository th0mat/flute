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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var ReactDOM = require("react-dom");
var Classes = require("../../common/classes");
var props_1 = require("../../common/props");
var utils_1 = require("../../common/utils");
/**
 * This component detaches its contents and re-attaches them to document.body.
 * Use it when you need to circumvent DOM z-stacking (for dialogs, popovers, etc.).
 * Any class names passed to this element will be propagated to the new container element on document.body.
 */
var Portal = (function (_super) {
    __extends(Portal, _super);
    function Portal() {
        _super.apply(this, arguments);
        this.displayName = "Blueprint.Portal";
    }
    Portal.prototype.render = function () {
        return null;
    };
    Portal.prototype.componentDidMount = function () {
        var targetElement = document.createElement("div");
        targetElement.classList.add(Classes.PORTAL);
        document.body.appendChild(targetElement);
        this.targetElement = targetElement;
        this.componentDidUpdate();
    };
    Portal.prototype.componentDidUpdate = function () {
        var _this = this;
        // use special render function to preserve React context, in case children need it
        ReactDOM.unstable_renderSubtreeIntoContainer(
        /* parentComponent */ this, React.createElement("div", __assign({}, props_1.removeNonHTMLProps(this.props), {ref: this.props.containerRef}), this.props.children), this.targetElement, function () { return utils_1.safeInvoke(_this.props.onChildrenMount); });
    };
    Portal.prototype.componentWillUnmount = function () {
        ReactDOM.unmountComponentAtNode(this.targetElement);
        this.targetElement.remove();
    };
    return Portal;
}(React.Component));
exports.Portal = Portal;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3BvcnRhbC9wb3J0YWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUMvQixJQUFZLFFBQVEsV0FBTSxXQUFXLENBQUMsQ0FBQTtBQUV0QyxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELHNCQUEyQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hFLHNCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBZ0JoRDs7OztHQUlHO0FBQ0g7SUFBNEIsMEJBQWlDO0lBQTdEO1FBQTRCLDhCQUFpQztRQUNsRCxnQkFBVyxHQUFHLGtCQUFrQixDQUFDO0lBK0I1QyxDQUFDO0lBNUJVLHVCQUFNLEdBQWI7UUFDSSxNQUFNLENBQUMsSUFBbUIsQ0FBQztJQUMvQixDQUFDO0lBRU0sa0NBQWlCLEdBQXhCO1FBQ0ksSUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLG1DQUFrQixHQUF6QjtRQUFBLGlCQVVDO1FBVEcsa0ZBQWtGO1FBQ2xGLFFBQVEsQ0FBQyxtQ0FBbUM7UUFDeEMscUJBQXFCLENBQUMsSUFBSSxFQUMxQixxQkFBQyxHQUFHLGdCQUFLLDBCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFhLElBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUyxDQUNuQixFQUNOLElBQUksQ0FBQyxhQUFhLEVBQ2xCLGNBQU0sT0FBQSxrQkFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQXRDLENBQXNDLENBQy9DLENBQUM7SUFDTixDQUFDO0lBRU0scUNBQW9CLEdBQTNCO1FBQ0ksUUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsQ0FoQzJCLEtBQUssQ0FBQyxTQUFTLEdBZ0MxQztBQWhDWSxjQUFNLFNBZ0NsQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvcG9ydGFsL3BvcnRhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgeyBJUHJvcHMsIHJlbW92ZU5vbkhUTUxQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcbmltcG9ydCB7IHNhZmVJbnZva2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVBvcnRhbFByb3BzIGV4dGVuZHMgSVByb3BzLCBSZWFjdC5IVE1MUHJvcHM8SFRNTERpdkVsZW1lbnQ+IHtcbiAgICAvKipcbiAgICAgKiBBIFJlYWN0IGByZWZgIGhhbmRsZXIgY2FsbGJhY2sgZm9yIHRoZSBkZXRhY2hlZCBjb250YWluZXIgcm9vdCBlbGVtZW50LlxuICAgICAqIEFzIHRoaXMgY29tcG9uZW50IHJlbmRlcnMgaXRzIGNvbnRlbnRzIGludG8gYSBzZXBhcmF0ZSBjb250YWluZXIsIHRoZSByZXN1bHQgb2YgdGhlIGByZWZgXG4gICAgICogcHJvcCBpcyBub3QgYmFja2VkIGJ5IGEgRE9NIG5vZGUuIEhlbmNlIHRoaXMgY2FsbGJhY2sgaXMgbmVjZXNzYXJ5IHRvIGdldCB0aGUgcmVhbCBET00gbm9kZS5cbiAgICAgKi9cbiAgICBjb250YWluZXJSZWY/OiAocmVmOiBIVE1MRGl2RWxlbWVudCkgPT4gdm9pZDtcblxuICAgLyoqXG4gICAgKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gdGhlIGNoaWxkcmVuIG9mIHRoaXMgYFBvcnRhbGAgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBET00uXG4gICAgKi9cbiAgICBvbkNoaWxkcmVuTW91bnQ/OiAoKSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IGRldGFjaGVzIGl0cyBjb250ZW50cyBhbmQgcmUtYXR0YWNoZXMgdGhlbSB0byBkb2N1bWVudC5ib2R5LlxuICogVXNlIGl0IHdoZW4geW91IG5lZWQgdG8gY2lyY3VtdmVudCBET00gei1zdGFja2luZyAoZm9yIGRpYWxvZ3MsIHBvcG92ZXJzLCBldGMuKS5cbiAqIEFueSBjbGFzcyBuYW1lcyBwYXNzZWQgdG8gdGhpcyBlbGVtZW50IHdpbGwgYmUgcHJvcGFnYXRlZCB0byB0aGUgbmV3IGNvbnRhaW5lciBlbGVtZW50IG9uIGRvY3VtZW50LmJvZHkuXG4gKi9cbmV4cG9ydCBjbGFzcyBQb3J0YWwgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVBvcnRhbFByb3BzLCB7fT4ge1xuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LlBvcnRhbFwiO1xuICAgIHByaXZhdGUgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gbnVsbCBhcyBKU1guRWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5hZGQoQ2xhc3Nlcy5QT1JUQUwpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhcmdldEVsZW1lbnQpO1xuICAgICAgICB0aGlzLnRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgICAgIC8vIHVzZSBzcGVjaWFsIHJlbmRlciBmdW5jdGlvbiB0byBwcmVzZXJ2ZSBSZWFjdCBjb250ZXh0LCBpbiBjYXNlIGNoaWxkcmVuIG5lZWQgaXRcbiAgICAgICAgUmVhY3RET00udW5zdGFibGVfcmVuZGVyU3VidHJlZUludG9Db250YWluZXIoXG4gICAgICAgICAgICAvKiBwYXJlbnRDb21wb25lbnQgKi8gdGhpcyxcbiAgICAgICAgICAgIDxkaXYgey4uLnJlbW92ZU5vbkhUTUxQcm9wcyh0aGlzLnByb3BzKX0gcmVmPXt0aGlzLnByb3BzLmNvbnRhaW5lclJlZn0+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj4sXG4gICAgICAgICAgICB0aGlzLnRhcmdldEVsZW1lbnQsXG4gICAgICAgICAgICAoKSA9PiBzYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGlsZHJlbk1vdW50KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIFJlYWN0RE9NLnVubW91bnRDb21wb25lbnRBdE5vZGUodGhpcy50YXJnZXRFbGVtZW50KTtcbiAgICAgICAgdGhpcy50YXJnZXRFbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
