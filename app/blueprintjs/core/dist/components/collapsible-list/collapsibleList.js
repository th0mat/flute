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
var classNames = require("classnames");
var React = require("react");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var position_1 = require("../../common/position");
var menu_1 = require("../menu/menu");
var menuItem_1 = require("../menu/menuItem");
var popover_1 = require("../popover/popover");
(function (CollapseFrom) {
    CollapseFrom[CollapseFrom["START"] = 0] = "START";
    CollapseFrom[CollapseFrom["END"] = 1] = "END";
})(exports.CollapseFrom || (exports.CollapseFrom = {}));
var CollapseFrom = exports.CollapseFrom;
var CollapsibleList = (function (_super) {
    __extends(CollapsibleList, _super);
    function CollapsibleList() {
        _super.apply(this, arguments);
    }
    CollapsibleList.prototype.render = function () {
        var _this = this;
        var collapseFrom = this.props.collapseFrom;
        var childrenLength = React.Children.count(this.props.children);
        var _a = this.partitionChildren(), visibleChildren = _a[0], collapsedChildren = _a[1];
        var visibleItems = visibleChildren.map(function (child, index) {
            var absoluteIndex = (collapseFrom === CollapseFrom.START ? childrenLength - 1 - index : index);
            return (React.createElement("li", {className: _this.props.visibleItemClassName, key: absoluteIndex}, _this.props.renderVisibleItem(child.props, absoluteIndex)));
        });
        if (collapseFrom === CollapseFrom.START) {
            // reverse START list so separators appear before items
            visibleItems.reverse();
        }
        // construct dropdown menu for collapsed items
        var collapsedPopover;
        if (collapsedChildren.length > 0) {
            var position = (collapseFrom === CollapseFrom.END ? position_1.Position.BOTTOM_RIGHT : position_1.Position.BOTTOM_LEFT);
            collapsedPopover = (React.createElement("li", {className: this.props.visibleItemClassName}, 
                React.createElement(popover_1.Popover, __assign({content: React.createElement(menu_1.Menu, null, collapsedChildren), position: position}, this.props.dropdownProps), this.props.dropdownTarget)
            ));
        }
        return (React.createElement("ul", {className: classNames(Classes.COLLAPSIBLE_LIST, this.props.className)}, 
            collapseFrom === CollapseFrom.START ? collapsedPopover : null, 
            visibleItems, 
            collapseFrom === CollapseFrom.END ? collapsedPopover : null));
    };
    // splits the list of children into two arrays: visible and collapsed
    CollapsibleList.prototype.partitionChildren = function () {
        if (this.props.children == null) {
            return [[], []];
        }
        var childrenArray = React.Children.map(this.props.children, function (child, index) {
            if (child.type !== menuItem_1.MenuItem) {
                throw new Error(Errors.COLLAPSIBLE_LIST_INVALID_CHILD);
            }
            return React.cloneElement(child, { key: "visible-" + index });
        });
        if (this.props.collapseFrom === CollapseFrom.START) {
            // reverse START list so we can always slice visible items from the front of the list
            childrenArray.reverse();
        }
        var visibleItemCount = this.props.visibleItemCount;
        return [
            childrenArray.slice(0, visibleItemCount),
            childrenArray.slice(visibleItemCount),
        ];
    };
    CollapsibleList.displayName = "Blueprint.CollapsibleList";
    CollapsibleList.defaultProps = {
        collapseFrom: CollapseFrom.START,
        dropdownTarget: null,
        renderVisibleItem: null,
        visibleItemCount: 3,
    };
    return CollapsibleList;
}(React.Component));
exports.CollapsibleList = CollapsibleList;
exports.CollapsibleListFactory = React.createFactory(CollapsibleList);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2NvbGxhcHNpYmxlLWxpc3QvY29sbGFwc2libGVMaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFFL0IsSUFBWSxPQUFPLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUNoRCxJQUFZLE1BQU0sV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBQzlDLHlCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBRWpELHFCQUFxQixjQUFjLENBQUMsQ0FBQTtBQUNwQyx5QkFBeUMsa0JBQWtCLENBQUMsQ0FBQTtBQUM1RCx3QkFBdUMsb0JBQW9CLENBQUMsQ0FBQTtBQUk1RCxXQUFZLFlBQVk7SUFDcEIsaURBQUssQ0FBQTtJQUNMLDZDQUFHLENBQUE7QUFDUCxDQUFDLEVBSFcsb0JBQVksS0FBWixvQkFBWSxRQUd2QjtBQUhELElBQVksWUFBWSxHQUFaLG9CQUdYLENBQUE7QUFxQ0Q7SUFBcUMsbUNBQTBDO0lBQS9FO1FBQXFDLDhCQUEwQztJQTJFL0UsQ0FBQztJQWpFVSxnQ0FBTSxHQUFiO1FBQUEsaUJBMENDO1FBekNXLDBDQUFZLENBQWdCO1FBQ3BDLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakUsSUFBQSw2QkFBcUUsRUFBOUQsdUJBQWUsRUFBRSx5QkFBaUIsQ0FBNkI7UUFFdEUsSUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQXNCLEVBQUUsS0FBYTtZQUMzRSxJQUFNLGFBQWEsR0FBRyxDQUFDLFlBQVksS0FBSyxZQUFZLENBQUMsS0FBSyxHQUFHLGNBQWMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUss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QUFXLEdBQUcsMkJBQTJCLENBQUM7SUFFMUMsNEJBQVksR0FBMEI7UUFDaEQsWUFBWSxFQUFFLFlBQVksQ0FBQyxLQUFLO1FBQ2hDLGNBQWMsRUFBRSxJQUFJO1FBQ3BCLGlCQUFpQixFQUFFLElBQUk7UUFDdkIsZ0JBQWdCLEVBQUUsQ0FBQztLQUN0QixDQUFDO0lBbUVOLHNCQUFDO0FBQUQsQ0EzRUEsQUEyRUMsQ0EzRW9DLEtBQUssQ0FBQyxTQUFTLEdBMkVuRDtBQTNFWSx1QkFBZSxrQkEyRTNCLENBQUE7QUFFWSw4QkFBc0IsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvY29sbGFwc2libGUtbGlzdC9jb2xsYXBzaWJsZUxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTUgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gXCIuLi8uLi9jb21tb24vZXJyb3JzXCI7XG5pbXBvcnQgeyBQb3NpdGlvbiB9IGZyb20gXCIuLi8uLi9jb21tb24vcG9zaXRpb25cIjtcbmltcG9ydCB7IElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb24vcHJvcHNcIjtcbmltcG9ydCB7IE1lbnUgfSBmcm9tIFwiLi4vbWVudS9tZW51XCI7XG5pbXBvcnQgeyBJTWVudUl0ZW1Qcm9wcywgTWVudUl0ZW0gfSBmcm9tIFwiLi4vbWVudS9tZW51SXRlbVwiO1xuaW1wb3J0IHsgSVBvcG92ZXJQcm9wcywgUG9wb3ZlciB9IGZyb20gXCIuLi9wb3BvdmVyL3BvcG92ZXJcIjtcblxudHlwZSBDb2xsYXBzaWJsZUl0ZW0gPSBSZWFjdC5SZWFjdEVsZW1lbnQ8SU1lbnVJdGVtUHJvcHM+O1xuXG5leHBvcnQgZW51bSBDb2xsYXBzZUZyb20ge1xuICAgIFNUQVJULFxuICAgIEVORCxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29sbGFwc2libGVMaXN0UHJvcHMgZXh0ZW5kcyBJUHJvcHMge1xuICAgIC8qKlxuICAgICAqIEVsZW1lbnQgdG8gcmVuZGVyIGFzIGRyb3Bkb3duIHRhcmdldCB3aXRoIGBDTElDS2AgaW50ZXJhY3Rpb24gdG8gc2hvdyBjb2xsYXBzZWQgbWVudS5cbiAgICAgKi9cbiAgICBkcm9wZG93blRhcmdldDogSlNYLkVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBQcm9wcyB0byBwYXNzIHRvIHRoZSBkcm9wZG93biBwb3BvdmVyLlxuICAgICAqL1xuICAgIGRyb3Bkb3duUHJvcHM/OiBJUG9wb3ZlclByb3BzO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCB0byByZW5kZXIgZWFjaCB2aXNpYmxlIGl0ZW0uIFRoZSBpdGVtIHdpbGwgYmUgd3JhcHBlZCBpbiBhbiBgbGlgIHdpdGhcbiAgICAgKiB0aGUgb3B0aW9uYWwgYHZpc2libGVJdGVtQ2xhc3NOYW1lYCBwcm9wLlxuICAgICAqL1xuICAgIHJlbmRlclZpc2libGVJdGVtOiAocHJvcHM6IElNZW51SXRlbVByb3BzLCBpbmRleDogbnVtYmVyKSA9PiBKU1guRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFdoaWNoIGRpcmVjdGlvbiB0aGUgaXRlbXMgc2hvdWxkIGNvbGxhcHNlIGZyb206IHN0YXJ0IG9yIGVuZCBvZiB0aGUgY2hpbGRyZW4uXG4gICAgICogQGRlZmF1bHQgQ29sbGFwc2VGcm9tLlNUQVJUXG4gICAgICovXG4gICAgY29sbGFwc2VGcm9tPzogQ29sbGFwc2VGcm9tO1xuXG4gICAgLyoqXG4gICAgICogQ1NTIGNsYXNzIG5hbWVzIHRvIGFkZCB0byBgPGxpPmAgdGFncyBjb250YWluaW5nIGVhY2ggdmlzaWJsZSBpdGVtIGFuZCB0aGUgZHJvcGRvd24uXG4gICAgICovXG4gICAgdmlzaWJsZUl0ZW1DbGFzc05hbWU/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBFeGFjdCBudW1iZXIgb2YgdmlzaWJsZSBpdGVtcy5cbiAgICAgKiBAZGVmYXVsdCAzXG4gICAgICovXG4gICAgdmlzaWJsZUl0ZW1Db3VudD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIENvbGxhcHNpYmxlTGlzdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJQ29sbGFwc2libGVMaXN0UHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LkNvbGxhcHNpYmxlTGlzdFwiO1xuXG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElDb2xsYXBzaWJsZUxpc3RQcm9wcyA9IHtcbiAgICAgICAgY29sbGFwc2VGcm9tOiBDb2xsYXBzZUZyb20uU1RBUlQsXG4gICAgICAgIGRyb3Bkb3duVGFyZ2V0OiBudWxsLFxuICAgICAgICByZW5kZXJWaXNpYmxlSXRlbTogbnVsbCxcbiAgICAgICAgdmlzaWJsZUl0ZW1Db3VudDogMyxcbiAgICB9O1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjb2xsYXBzZUZyb20gfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuTGVuZ3RoID0gUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbik7XG4gICAgICAgIGNvbnN0IFt2aXNpYmxlQ2hpbGRyZW4sIGNvbGxhcHNlZENoaWxkcmVuXSA9IHRoaXMucGFydGl0aW9uQ2hpbGRyZW4oKTtcblxuICAgICAgICBjb25zdCB2aXNpYmxlSXRlbXMgPSB2aXNpYmxlQ2hpbGRyZW4ubWFwKChjaGlsZDogQ29sbGFwc2libGVJdGVtLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhYnNvbHV0ZUluZGV4ID0gKGNvbGxhcHNlRnJvbSA9PT0gQ29sbGFwc2VGcm9tLlNUQVJUID8gY2hpbGRyZW5MZW5ndGggLSAxIC0gaW5kZXggOiBpbmRleCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e3RoaXMucHJvcHMudmlzaWJsZUl0ZW1DbGFzc05hbWV9IGtleT17YWJzb2x1dGVJbmRleH0+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnJlbmRlclZpc2libGVJdGVtKGNoaWxkLnByb3BzLCBhYnNvbHV0ZUluZGV4KX1cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjb2xsYXBzZUZyb20gPT09IENvbGxhcHNlRnJvbS5TVEFSVCkge1xuICAgICAgICAgICAgLy8gcmV2ZXJzZSBTVEFSVCBsaXN0IHNvIHNlcGFyYXRvcnMgYXBwZWFyIGJlZm9yZSBpdGVtc1xuICAgICAgICAgICAgdmlzaWJsZUl0ZW1zLnJldmVyc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnN0cnVjdCBkcm9wZG93biBtZW51IGZvciBjb2xsYXBzZWQgaXRlbXNcbiAgICAgICAgbGV0IGNvbGxhcHNlZFBvcG92ZXI6IEpTWC5FbGVtZW50O1xuICAgICAgICBpZiAoY29sbGFwc2VkQ2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSAoY29sbGFwc2VGcm9tID09PSBDb2xsYXBzZUZyb20uRU5EID8gUG9zaXRpb24uQk9UVE9NX1JJR0hUIDogUG9zaXRpb24uQk9UVE9NX0xFRlQpO1xuICAgICAgICAgICAgY29sbGFwc2VkUG9wb3ZlciA9IChcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnZpc2libGVJdGVtQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgPFBvcG92ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9ezxNZW51Pntjb2xsYXBzZWRDaGlsZHJlbn08L01lbnU+fVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb249e3Bvc2l0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuZHJvcGRvd25Qcm9wc31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuZHJvcGRvd25UYXJnZXR9XG4gICAgICAgICAgICAgICAgICAgIDwvUG9wb3Zlcj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuQ09MTEFQU0lCTEVfTElTVCwgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT5cbiAgICAgICAgICAgICAgICB7Y29sbGFwc2VGcm9tID09PSBDb2xsYXBzZUZyb20uU1RBUlQgPyBjb2xsYXBzZWRQb3BvdmVyIDogbnVsbH1cbiAgICAgICAgICAgICAgICB7dmlzaWJsZUl0ZW1zfVxuICAgICAgICAgICAgICAgIHtjb2xsYXBzZUZyb20gPT09IENvbGxhcHNlRnJvbS5FTkQgPyBjb2xsYXBzZWRQb3BvdmVyIDogbnVsbH1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gc3BsaXRzIHRoZSBsaXN0IG9mIGNoaWxkcmVuIGludG8gdHdvIGFycmF5czogdmlzaWJsZSBhbmQgY29sbGFwc2VkXG4gICAgcHJpdmF0ZSBwYXJ0aXRpb25DaGlsZHJlbigpOiBbQ29sbGFwc2libGVJdGVtW10sIENvbGxhcHNpYmxlSXRlbVtdXSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNoaWxkcmVuID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBbW10sIFtdXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGlsZHJlbkFycmF5ID0gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW4sIChjaGlsZDogSlNYLkVsZW1lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGlsZC50eXBlICE9PSBNZW51SXRlbSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFcnJvcnMuQ09MTEFQU0lCTEVfTElTVF9JTlZBTElEX0NISUxEKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHsga2V5OiBgdmlzaWJsZS0ke2luZGV4fWAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5jb2xsYXBzZUZyb20gPT09IENvbGxhcHNlRnJvbS5TVEFSVCkge1xuICAgICAgICAgICAgLy8gcmV2ZXJzZSBTVEFSVCBsaXN0IHNvIHdlIGNhbiBhbHdheXMgc2xpY2UgdmlzaWJsZSBpdGVtcyBmcm9tIHRoZSBmcm9udCBvZiB0aGUgbGlzdFxuICAgICAgICAgICAgY2hpbGRyZW5BcnJheS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyB2aXNpYmxlSXRlbUNvdW50IH0gPSB0aGlzLnByb3BzO1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgY2hpbGRyZW5BcnJheS5zbGljZSgwLCB2aXNpYmxlSXRlbUNvdW50KSxcbiAgICAgICAgICAgIGNoaWxkcmVuQXJyYXkuc2xpY2UodmlzaWJsZUl0ZW1Db3VudCksXG4gICAgICAgIF07XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgQ29sbGFwc2libGVMaXN0RmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoQ29sbGFwc2libGVMaXN0KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
