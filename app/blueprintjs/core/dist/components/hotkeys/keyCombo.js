/**
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
var React = require("react");
var hotkeyParser_1 = require("./hotkeyParser");
var KeyIcons = {
    alt: "pt-icon-key-option",
    ctrl: "pt-icon-key-control",
    delete: "pt-icon-key-delete",
    down: "pt-icon-arrow-down",
    enter: "pt-icon-key-enter",
    left: "pt-icon-arrow-left",
    meta: "pt-icon-key-command",
    right: "pt-icon-arrow-right",
    shift: "pt-icon-key-shift",
    up: "pt-icon-arrow-up",
};
var KeyCombo = (function (_super) {
    __extends(KeyCombo, _super);
    function KeyCombo() {
        _super.apply(this, arguments);
    }
    KeyCombo.prototype.render = function () {
        var keys = hotkeyParser_1.normalizeKeyCombo(this.props.combo);
        var components = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var icon = KeyIcons[key];
            if (icon != null) {
                components.push(React.createElement("kbd", {className: "pt-key pt-modifier-key", key: "key-" + i}, 
                    React.createElement("span", {className: "pt-icon-standard " + icon}), 
                    key));
            }
            else {
                if (key.length === 1) {
                    key = key.toUpperCase();
                }
                components.push(React.createElement("kbd", {className: "pt-key", key: "key-" + i}, key));
            }
        }
        return React.createElement("div", {className: "pt-key-combo"}, components);
    };
    return KeyCombo;
}(React.Component));
exports.KeyCombo = KeyCombo;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2hvdGtleXMva2V5Q29tYm8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7O0FBRUgsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFDL0IsNkJBQWtDLGdCQUFnQixDQUFDLENBQUE7QUFFbkQsSUFBTSxRQUFRLEdBQUc7SUFDYixHQUFHLEVBQUUsb0JBQW9CO0lBQ3pCLElBQUksRUFBRSxxQkFBcUI7SUFDM0IsTUFBTSxFQUFFLG9CQUFvQjtJQUM1QixJQUFJLEVBQUUsb0JBQW9CO0lBQzFCLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsSUFBSSxFQUFFLG9CQUFvQjtJQUMxQixJQUFJLEVBQUUscUJBQXFCO0lBQzNCLEtBQUssRUFBRSxxQkFBcUI7SUFDNUIsS0FBSyxFQUFFLG1CQUFtQjtJQUMxQixFQUFFLEVBQUUsa0JBQWtCO0NBQ0UsQ0FBQztBQU03QjtJQUE4Qiw0QkFBbUM7SUFBakU7UUFBOEIsOEJBQW1DO0lBdUJqRSxDQUFDO0lBdEJVLHlCQUFNLEdBQWI7UUFDSSxJQUFNLElBQUksR0FBRyxnQ0FBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQU0sVUFBVSxHQUFHLEVBQW1CLENBQUM7UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDZixVQUFVLENBQUMsSUFBSSxDQUNYLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUMsd0JBQXdCLEVBQUMsR0FBRyxFQUFFLFNBQU8sQ0FBSTtvQkFDcEQscUJBQUMsSUFBSSxJQUFDLFNBQVMsRUFBRSxzQkFBb0IsSUFBTyxFQUFHO29CQUM5QyxHQUFJLENBQ0gsQ0FDVCxDQUFDO1lBQ04sQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFDRCxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBRSxTQUFPLENBQUksR0FBRSxHQUFJLENBQU0sQ0FBQyxDQUFDO1lBQzFFLENBQUM7UUFDTCxDQUFDO1FBQ0QsTUFBTSxDQUFDLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUMsY0FBYyxHQUFFLFVBQVcsQ0FBTSxDQUFDO0lBQzVELENBQUM7SUFDTCxlQUFDO0FBQUQsQ0F2QkEsQUF1QkMsQ0F2QjZCLEtBQUssQ0FBQyxTQUFTLEdBdUI1QztBQXZCWSxnQkFBUSxXQXVCcEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2hvdGtleXMva2V5Q29tYm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUtleUNvbWJvIH0gZnJvbSBcIi4vaG90a2V5UGFyc2VyXCI7XG5cbmNvbnN0IEtleUljb25zID0ge1xuICAgIGFsdDogXCJwdC1pY29uLWtleS1vcHRpb25cIixcbiAgICBjdHJsOiBcInB0LWljb24ta2V5LWNvbnRyb2xcIixcbiAgICBkZWxldGU6IFwicHQtaWNvbi1rZXktZGVsZXRlXCIsXG4gICAgZG93bjogXCJwdC1pY29uLWFycm93LWRvd25cIixcbiAgICBlbnRlcjogXCJwdC1pY29uLWtleS1lbnRlclwiLFxuICAgIGxlZnQ6IFwicHQtaWNvbi1hcnJvdy1sZWZ0XCIsXG4gICAgbWV0YTogXCJwdC1pY29uLWtleS1jb21tYW5kXCIsXG4gICAgcmlnaHQ6IFwicHQtaWNvbi1hcnJvdy1yaWdodFwiLFxuICAgIHNoaWZ0OiBcInB0LWljb24ta2V5LXNoaWZ0XCIsXG4gICAgdXA6IFwicHQtaWNvbi1hcnJvdy11cFwiLFxufSBhcyB7W2tleTogc3RyaW5nXTogc3RyaW5nfTtcblxuZXhwb3J0IGludGVyZmFjZSBJS2V5Q29tYm9Qcm9wcyB7XG4gICAgY29tYm86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEtleUNvbWJvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElLZXlDb21ib1Byb3BzLCB7fT4ge1xuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGtleXMgPSBub3JtYWxpemVLZXlDb21ibyh0aGlzLnByb3BzLmNvbWJvKTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50cyA9IFtdIGFzIEpTWC5FbGVtZW50W107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICAgICAgICBjb25zdCBpY29uID0gS2V5SWNvbnNba2V5XTtcbiAgICAgICAgICAgIGlmIChpY29uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIDxrYmQgY2xhc3NOYW1lPVwicHQta2V5IHB0LW1vZGlmaWVyLWtleVwiIGtleT17YGtleS0ke2l9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BwdC1pY29uLXN0YW5kYXJkICR7aWNvbn1gfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAge2tleX1cbiAgICAgICAgICAgICAgICAgICAgPC9rYmQ+LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChrZXkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb21wb25lbnRzLnB1c2goPGtiZCBjbGFzc05hbWU9XCJwdC1rZXlcIiBrZXk9e2BrZXktJHtpfWB9PntrZXl9PC9rYmQ+KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwdC1rZXktY29tYm9cIj57Y29tcG9uZW50c308L2Rpdj47XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
