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
var react_1 = require("react");
var React = require("react");
var common_1 = require("../../common");
var hotkey_1 = require("./hotkey");
var hotkey_2 = require("./hotkey");
exports.Hotkey = hotkey_2.Hotkey;
var keyCombo_1 = require("./keyCombo");
exports.KeyCombo = keyCombo_1.KeyCombo;
var hotkeysTarget_1 = require("./hotkeysTarget");
exports.HotkeysTarget = hotkeysTarget_1.HotkeysTarget;
var hotkeyParser_1 = require("./hotkeyParser");
exports.comboMatches = hotkeyParser_1.comboMatches;
exports.getKeyCombo = hotkeyParser_1.getKeyCombo;
exports.getKeyComboString = hotkeyParser_1.getKeyComboString;
exports.parseKeyCombo = hotkeyParser_1.parseKeyCombo;
var hotkeysDialog_1 = require("./hotkeysDialog");
exports.hideHotkeysDialog = hotkeysDialog_1.hideHotkeysDialog;
exports.setHotkeysDialogProps = hotkeysDialog_1.setHotkeysDialogProps;
var Hotkeys = (function (_super) {
    __extends(Hotkeys, _super);
    function Hotkeys() {
        _super.apply(this, arguments);
    }
    Hotkeys.prototype.render = function () {
        var hotkeys = react_1.Children.map(this.props.children, function (child) { return child.props; });
        // sort by group label alphabetically, globals first
        hotkeys.sort(function (a, b) {
            if (a.global) {
                return b.global ? 0 : -1;
            }
            if (b.global) {
                return 1;
            }
            return a.group.localeCompare(b.group);
        });
        var lastGroup = null;
        var elems = [];
        for (var _i = 0, hotkeys_1 = hotkeys; _i < hotkeys_1.length; _i++) {
            var hotkey = hotkeys_1[_i];
            var groupLabel = hotkey.group;
            if (groupLabel !== lastGroup) {
                elems.push(React.createElement("h4", {key: "group-" + elems.length, className: "pt-hotkey-group"}, groupLabel));
                lastGroup = groupLabel;
            }
            elems.push(React.createElement(hotkey_1.Hotkey, __assign({key: elems.length}, hotkey)));
        }
        return React.createElement("div", {className: "pt-hotkey-column"}, elems);
    };
    Hotkeys.prototype.validateProps = function (props) {
        react_1.Children.forEach(props.children, function (child) {
            if (typeof child !== "object" || !hotkey_1.Hotkey.isInstance(child)) {
                throw new Error("Hotkeys only accepts <Hotkey> children");
            }
        });
    };
    Hotkeys.defaultProps = {
        tabIndex: 0,
    };
    return Hotkeys;
}(common_1.AbstractComponent));
exports.Hotkeys = Hotkeys;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2hvdGtleXMvaG90a2V5cy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7OztBQUVILHNCQUF1QyxPQUFPLENBQUMsQ0FBQTtBQUMvQyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUMvQix1QkFBMEMsY0FBYyxDQUFDLENBQUE7QUFFekQsdUJBQXFDLFVBQVUsQ0FBQyxDQUFBO0FBRWhELHVCQUFxQyxVQUFVLENBQUM7QUFBdkMsaUNBQXVDO0FBQ2hELHlCQUF5QyxZQUFZLENBQUM7QUFBN0MsdUNBQTZDO0FBQ3RELDhCQUE4QyxpQkFBaUIsQ0FBQztBQUF2RCxzREFBdUQ7QUFDaEUsNkJBQXVGLGdCQUFnQixDQUFDO0FBQXBGLG1EQUFZO0FBQUUsaURBQVc7QUFBRSw2REFBaUI7QUFBRSxxREFBc0M7QUFDeEcsOEJBQThFLGlCQUFpQixDQUFDO0FBQWxFLDhEQUFpQjtBQUFFLHNFQUErQztBQWNoRztJQUE2QiwyQkFBb0M7SUFBakU7UUFBNkIsOEJBQW9DO0lBb0NqRSxDQUFDO0lBL0JVLHdCQUFNLEdBQWI7UUFDSSxJQUFNLE9BQU8sR0FBRyxnQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxVQUFDLEtBQWlDLElBQUssT0FBQSxLQUFLLENBQUMsS0FBSyxFQUFYLENBQVcsQ0FBQyxDQUFDO1FBRXRHLG9EQUFvRDtRQUNwRCxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDO1lBQzNDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBRyxJQUFjLENBQUM7UUFDL0IsSUFBTSxLQUFLLEdBQUcsRUFBbUIsQ0FBQztRQUNsQyxHQUFHLENBQUMsQ0FBaUIsVUFBTyxFQUFQLG1CQUFPLEVBQVAscUJBQU8sRUFBUCxJQUFPLENBQUM7WUFBeEIsSUFBTSxNQUFNLGdCQUFBO1lBQ2IsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNoQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBQyxFQUFFLElBQUMsR0FBRyxFQUFFLFdBQVMsS0FBSyxDQUFDLE1BQVMsRUFBQyxTQUFTLEVBQUMsaUJBQWlCLEdBQUUsVUFBVyxDQUFLLENBQUMsQ0FBQztnQkFDNUYsU0FBUyxHQUFHLFVBQVUsQ0FBQztZQUMzQixDQUFDO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBQyxlQUFNLFlBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFPLEdBQUssTUFBTSxFQUFJLENBQUMsQ0FBQztTQUN6RDtRQUVELE1BQU0sQ0FBQyxxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFDLGtCQUFrQixHQUFFLEtBQU0sQ0FBTSxDQUFDO0lBQzNELENBQUM7SUFFUywrQkFBYSxHQUF2QixVQUF3QixLQUFvRDtRQUN4RSxnQkFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQUMsS0FBSztZQUNuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksQ0FBQyxlQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQzlELENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFsQ2Esb0JBQVksR0FBRztRQUN6QixRQUFRLEVBQUUsQ0FBQztLQUNkLENBQUM7SUFpQ04sY0FBQztBQUFELENBcENBLEFBb0NDLENBcEM0QiwwQkFBaUIsR0FvQzdDO0FBcENZLGVBQU8sVUFvQ25CLENBQUEiLCJmaWxlIjoiY29tcG9uZW50cy9ob3RrZXlzL2hvdGtleXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCB7IENoaWxkcmVuLCBSZWFjdEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQWJzdHJhY3RDb21wb25lbnQsIElQcm9wcyB9IGZyb20gXCIuLi8uLi9jb21tb25cIjtcblxuaW1wb3J0IHsgSG90a2V5LCBJSG90a2V5UHJvcHMgfSBmcm9tIFwiLi9ob3RrZXlcIjtcblxuZXhwb3J0IHsgSG90a2V5LCBJSG90a2V5UHJvcHMgfSBmcm9tIFwiLi9ob3RrZXlcIjtcbmV4cG9ydCB7IEtleUNvbWJvLCBJS2V5Q29tYm9Qcm9wcyB9IGZyb20gXCIuL2tleUNvbWJvXCI7XG5leHBvcnQgeyBIb3RrZXlzVGFyZ2V0LCBJSG90a2V5c1RhcmdldCB9IGZyb20gXCIuL2hvdGtleXNUYXJnZXRcIjtcbmV4cG9ydCB7IElLZXlDb21ibywgY29tYm9NYXRjaGVzLCBnZXRLZXlDb21ibywgZ2V0S2V5Q29tYm9TdHJpbmcsIHBhcnNlS2V5Q29tYm8gfSBmcm9tIFwiLi9ob3RrZXlQYXJzZXJcIjtcbmV4cG9ydCB7IElIb3RrZXlzRGlhbG9nUHJvcHMsIGhpZGVIb3RrZXlzRGlhbG9nLCBzZXRIb3RrZXlzRGlhbG9nUHJvcHMgfSBmcm9tIFwiLi9ob3RrZXlzRGlhbG9nXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUhvdGtleXNQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogSW4gb3JkZXIgdG8gbWFrZSBsb2NhbCBob3RrZXlzIHdvcmsgb24gZWxlbWVudHMgdGhhdCBhcmUgbm90IG5vcm1hbGx5XG4gICAgICogZm9jdXNhYmxlLCBzdWNoIGFzIGA8ZGl2PmBzIG9yIGA8c3Bhbj5gcywgd2UgYWRkIGEgYHRhYkluZGV4YCBhdHRyaWJ1dGVcbiAgICAgKiB0byB0aGUgaG90a2V5IHRhcmdldCwgd2hpY2ggbWFrZXMgaXQgZm9jdXNhYmxlLiBCeSBkZWZhdWx0LCB3ZSB1c2UgYDBgLFxuICAgICAqIGJ1dCB5b3UgY2FuIG92ZXJyaWRlIHRoaXMgdmFsdWUgdG8gY2hhbmdlIHRoZSB0YWIgbmF2aWdhdGlvbiBiZWhhdmlvclxuICAgICAqIG9mIHRoZSBjb21wb25lbnQuIFlvdSBtYXkgZXZlbiBzZXQgdGhpcyB2YWx1ZSB0byBgbnVsbGAsIHdoaWNoIHdpbGwgb21pdFxuICAgICAqIHRoZSB0YWJJbmRleCBmcm9tIHRoZSBjb21wb25lbnQgZGVjb3JhdGVkIGJ5IGBIb3RrZXlzVGFyZ2V0YC5cbiAgICAgKi9cbiAgICB0YWJJbmRleD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIEhvdGtleXMgZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxJSG90a2V5c1Byb3BzLCB7fT4ge1xuICAgIHB1YmxpYyBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICB0YWJJbmRleDogMCxcbiAgICB9O1xuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgaG90a2V5cyA9IENoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuLCAoY2hpbGQ6IFJlYWN0RWxlbWVudDxJSG90a2V5UHJvcHM+KSA9PiBjaGlsZC5wcm9wcyk7XG5cbiAgICAgICAgLy8gc29ydCBieSBncm91cCBsYWJlbCBhbHBoYWJldGljYWxseSwgZ2xvYmFscyBmaXJzdFxuICAgICAgICBob3RrZXlzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGlmIChhLmdsb2JhbCkgeyByZXR1cm4gYi5nbG9iYWwgPyAwIDogLTE7IH1cbiAgICAgICAgICAgIGlmIChiLmdsb2JhbCkgeyByZXR1cm4gMTsgfVxuICAgICAgICAgICAgcmV0dXJuIGEuZ3JvdXAubG9jYWxlQ29tcGFyZShiLmdyb3VwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGxhc3RHcm91cCA9IG51bGwgYXMgc3RyaW5nO1xuICAgICAgICBjb25zdCBlbGVtcyA9IFtdIGFzIEpTWC5FbGVtZW50W107XG4gICAgICAgIGZvciAoY29uc3QgaG90a2V5IG9mIGhvdGtleXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyb3VwTGFiZWwgPSBob3RrZXkuZ3JvdXA7XG4gICAgICAgICAgICBpZiAoZ3JvdXBMYWJlbCAhPT0gbGFzdEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZWxlbXMucHVzaCg8aDQga2V5PXtgZ3JvdXAtJHtlbGVtcy5sZW5ndGh9YH0gY2xhc3NOYW1lPVwicHQtaG90a2V5LWdyb3VwXCI+e2dyb3VwTGFiZWx9PC9oND4pO1xuICAgICAgICAgICAgICAgIGxhc3RHcm91cCA9IGdyb3VwTGFiZWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtcy5wdXNoKDxIb3RrZXkga2V5PXtlbGVtcy5sZW5ndGh9IHsuLi5ob3RrZXl9IC8+KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInB0LWhvdGtleS1jb2x1bW5cIj57ZWxlbXN9PC9kaXY+O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB2YWxpZGF0ZVByb3BzKHByb3BzOiBJSG90a2V5c1Byb3BzICYgeyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0pIHtcbiAgICAgICAgQ2hpbGRyZW4uZm9yRWFjaChwcm9wcy5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkICE9PSBcIm9iamVjdFwiIHx8ICFIb3RrZXkuaXNJbnN0YW5jZShjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIb3RrZXlzIG9ubHkgYWNjZXB0cyA8SG90a2V5PiBjaGlsZHJlblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
