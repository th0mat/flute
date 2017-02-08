/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var React = require("react");
var utils_1 = require("../../common/utils");
var ContextMenu = require("./contextMenu");
function ContextMenuTarget(constructor) {
    var _a = constructor.prototype, render = _a.render, renderContextMenu = _a.renderContextMenu;
    if (!utils_1.isFunction(renderContextMenu)) {
        throw new Error("@ContextMenuTarget-decorated class must implement `renderContextMenu`. " + constructor);
    }
    // patching classes like this requires preserving function context
    // tslint:disable-next-line only-arrow-functions
    constructor.prototype.render = function () {
        var _this = this;
        /* tslint:disable:no-invalid-this */
        var element = render.call(this);
        if (element == null) {
            // always return `element` in case caller is distinguishing between `null` and `undefined`
            return element;
        }
        var oldOnContextMenu = element.props.onContextMenu;
        var onContextMenu = function (e) {
            // support nested menus (inner menu target would have called preventDefault())
            if (e.defaultPrevented) {
                return;
            }
            var menu = _this.renderContextMenu(e);
            if (menu != null) {
                e.preventDefault();
                ContextMenu.show(menu, { left: e.clientX, top: e.clientY });
            }
            utils_1.safeInvoke(oldOnContextMenu, e);
        };
        return React.cloneElement(element, { onContextMenu: onContextMenu });
        /* tslint:enable:no-invalid-this */
    };
}
exports.ContextMenuTarget = ContextMenuTarget;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2NvbnRleHQtbWVudS9jb250ZXh0TWVudVRhcmdldC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0Isc0JBQXVDLG9CQUFvQixDQUFDLENBQUE7QUFDNUQsSUFBWSxXQUFXLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFNN0MsMkJBQStFLFdBQWM7SUFDekYsSUFBQSwwQkFBMkQsRUFBbkQsa0JBQU0sRUFBRSx3Q0FBaUIsQ0FBMkI7SUFFNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEVBQTRFLFdBQWEsQ0FBQyxDQUFDO0lBQy9HLENBQUM7SUFFRCxrRUFBa0U7SUFDbEUsZ0RBQWdEO0lBQ2hELFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHO1FBQUEsaUJBMkI5QjtRQTFCRyxvQ0FBb0M7UUFDcEMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQWdCLENBQUM7UUFFakQsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsMEZBQTBGO1lBQzFGLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztRQUVELElBQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFxRCxDQUFDO1FBQzdGLElBQU0sYUFBYSxHQUFHLFVBQUMsQ0FBZ0M7WUFDbkQsOEVBQThFO1lBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQztZQUNYLENBQUM7WUFFRCxJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUNuQixXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBRUQsa0JBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsRUFBRSw0QkFBYSxFQUFFLENBQUMsQ0FBQztRQUN0RCxtQ0FBbUM7SUFDdkMsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQXJDZSx5QkFBaUIsb0JBcUNoQyxDQUFBO0FBQUEsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL2NvbnRleHQtbWVudS9jb250ZXh0TWVudVRhcmdldC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IGlzRnVuY3Rpb24sIHNhZmVJbnZva2UgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3V0aWxzXCI7XG5pbXBvcnQgKiBhcyBDb250ZXh0TWVudSBmcm9tIFwiLi9jb250ZXh0TWVudVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb250ZXh0TWVudVRhcmdldCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xuICAgIHJlbmRlckNvbnRleHRNZW51KGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEVsZW1lbnQ+KTogSlNYLkVsZW1lbnQgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ29udGV4dE1lbnVUYXJnZXQ8VCBleHRlbmRzIHsgcHJvdG90eXBlOiBJQ29udGV4dE1lbnVUYXJnZXQgfT4oY29uc3RydWN0b3I6IFQpIHtcbiAgICBjb25zdCB7IHJlbmRlciwgcmVuZGVyQ29udGV4dE1lbnUgfSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcblxuICAgIGlmICghaXNGdW5jdGlvbihyZW5kZXJDb250ZXh0TWVudSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBAQ29udGV4dE1lbnVUYXJnZXQtZGVjb3JhdGVkIGNsYXNzIG11c3QgaW1wbGVtZW50IFxcYHJlbmRlckNvbnRleHRNZW51XFxgLiAke2NvbnN0cnVjdG9yfWApO1xuICAgIH1cblxuICAgIC8vIHBhdGNoaW5nIGNsYXNzZXMgbGlrZSB0aGlzIHJlcXVpcmVzIHByZXNlcnZpbmcgZnVuY3Rpb24gY29udGV4dFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBvbmx5LWFycm93LWZ1bmN0aW9uc1xuICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbih0aGlzOiBJQ29udGV4dE1lbnVUYXJnZXQpIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGU6bm8taW52YWxpZC10aGlzICovXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZW5kZXIuY2FsbCh0aGlzKSBhcyBKU1guRWxlbWVudDtcblxuICAgICAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBhbHdheXMgcmV0dXJuIGBlbGVtZW50YCBpbiBjYXNlIGNhbGxlciBpcyBkaXN0aW5ndWlzaGluZyBiZXR3ZWVuIGBudWxsYCBhbmQgYHVuZGVmaW5lZGBcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2xkT25Db250ZXh0TWVudSA9IGVsZW1lbnQucHJvcHMub25Db250ZXh0TWVudSBhcyBSZWFjdC5Nb3VzZUV2ZW50SGFuZGxlcjxIVE1MRWxlbWVudD47XG4gICAgICAgIGNvbnN0IG9uQ29udGV4dE1lbnUgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgICAgIC8vIHN1cHBvcnQgbmVzdGVkIG1lbnVzIChpbm5lciBtZW51IHRhcmdldCB3b3VsZCBoYXZlIGNhbGxlZCBwcmV2ZW50RGVmYXVsdCgpKVxuICAgICAgICAgICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWVudSA9IHRoaXMucmVuZGVyQ29udGV4dE1lbnUoZSk7XG4gICAgICAgICAgICBpZiAobWVudSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIENvbnRleHRNZW51LnNob3cobWVudSwgeyBsZWZ0OiBlLmNsaWVudFgsIHRvcDogZS5jbGllbnRZIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzYWZlSW52b2tlKG9sZE9uQ29udGV4dE1lbnUsIGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoZWxlbWVudCwgeyBvbkNvbnRleHRNZW51IH0pO1xuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOm5vLWludmFsaWQtdGhpcyAqL1xuICAgIH07XG59O1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
