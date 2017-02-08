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
var React = require("react");
var common_1 = require("../../common");
var keyCombo_1 = require("./keyCombo");
var Hotkey = (function (_super) {
    __extends(Hotkey, _super);
    function Hotkey() {
        _super.apply(this, arguments);
    }
    Hotkey.isInstance = function (element) {
        return element.type === Hotkey;
    };
    Hotkey.prototype.render = function () {
        var _a = this.props, combo = _a.combo, label = _a.label;
        return React.createElement("div", {className: "pt-hotkey"}, 
            React.createElement("div", {className: "pt-hotkey-label"}, label), 
            React.createElement(keyCombo_1.KeyCombo, {combo: combo}));
    };
    Hotkey.prototype.validateProps = function (props) {
        if (props.global !== true && props.group == null) {
            throw new Error("non-global <Hotkey>s must define a group");
        }
    };
    Hotkey.defaultProps = {
        global: false,
    };
    return Hotkey;
}(common_1.AbstractComponent));
exports.Hotkey = Hotkey;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2hvdGtleXMvaG90a2V5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUVILElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRy9CLHVCQUFrQyxjQUFjLENBQUMsQ0FBQTtBQUNqRCx5QkFBeUIsWUFBWSxDQUFDLENBQUE7QUF1Q3RDO0lBQTRCLDBCQUFtQztJQUEvRDtRQUE0Qiw4QkFBbUM7SUFzQi9ELENBQUM7SUFqQmlCLGlCQUFVLEdBQXhCLFVBQXlCLE9BQTBCO1FBQy9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztJQUNuQyxDQUFDO0lBRU0sdUJBQU0sR0FBYjtRQUNJLElBQUEsZUFBbUMsRUFBM0IsZ0JBQUssRUFBRSxnQkFBSyxDQUFnQjtRQUNwQyxNQUFNLENBQUMscUJBQUMsR0FBRyxJQUFDLFNBQVMsRUFBQyxXQUFXO1lBQzdCLHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUMsaUJBQWlCLEdBQUUsS0FBTSxDQUFNO1lBQzlDLG9CQUFDLG1CQUFRLEdBQUMsS0FBSyxFQUFFLEtBQU0sRUFBRyxDQUN4QixDQUFDO0lBQ1gsQ0FBQztJQUVTLDhCQUFhLEdBQXZCLFVBQXdCLEtBQW1CO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7UUFDaEUsQ0FBQztJQUNMLENBQUM7SUFwQmEsbUJBQVksR0FBRztRQUN6QixNQUFNLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBbUJOLGFBQUM7QUFBRCxDQXRCQSxBQXNCQyxDQXRCMkIsMEJBQWlCLEdBc0I1QztBQXRCWSxjQUFNLFNBc0JsQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvaG90a2V5cy9ob3RrZXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vblwiO1xuaW1wb3J0IHsgS2V5Q29tYm8gfSBmcm9tIFwiLi9rZXlDb21ib1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElIb3RrZXlQcm9wcyB7XG4gICAgLyoqXG4gICAgICogSG90a2V5IGNvbWJpbmF0aW9uIHN0cmluZywgc3VjaCBhcyBcInNwYWNlXCIgb3IgXCJjbWQrblwiLlxuICAgICAqL1xuICAgIGNvbWJvOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBIdW1hbi1mcmllbmRseSBsYWJlbCBmb3IgdGhpcyBob3RrZXkuXG4gICAgICovXG4gICAgbGFiZWw6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIElmIGBmYWxzZWAsIHRoZSBob3RrZXkgaXMgYWN0aXZlIG9ubHkgd2hlbiB0aGUgdGFyZ2V0IGlzIGZvY3VzZWQuIElmXG4gICAgICogYHRydWVgLCB0aGUgaG90a2V5IGNhbiBiZSB0cmlnZ2VyZWQgcmVnYXJkbGVzcyBvZiB3aGF0IGNvbXBvbmVudCBpc1xuICAgICAqIGZvY3VzZWQuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBnbG9iYWw/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogVW5sZXNzIHRoZSBob3RrZXkgaXMgZ2xvYmFsLCB5b3UgbXVzdCBzcGVjaWZ5IGEgZ3JvdXAgd2hlcmUgdGhlIGhvdGtleVxuICAgICAqIHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBob3RrZXlzIGRpYWxvZy4gVGhpcyBzdHJpbmcgd2lsbCBiZSBkaXNwbGF5ZWRcbiAgICAgKiBpbiBhIGhlYWRlciBhdCB0aGUgc3RhcnQgb2YgdGhlIGdyb3VwIG9mIGhvdGtleXMuXG4gICAgICovXG4gICAgZ3JvdXA/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBga2V5ZG93bmAgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIG9uS2V5RG93bj8oZTogS2V5Ym9hcmRFdmVudCk6IGFueTtcblxuICAgIC8qKlxuICAgICAqIGBrZXl1cGAgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIG9uS2V5VXA/KGU6IEtleWJvYXJkRXZlbnQpOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBIb3RrZXkgZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxJSG90a2V5UHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGdsb2JhbDogZmFsc2UsXG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0aWMgaXNJbnN0YW5jZShlbGVtZW50OiBSZWFjdEVsZW1lbnQ8YW55Pik6IGVsZW1lbnQgaXMgUmVhY3RFbGVtZW50PElIb3RrZXlQcm9wcz4ge1xuICAgICAgICByZXR1cm4gZWxlbWVudC50eXBlID09PSBIb3RrZXk7XG4gICAgfVxuXG4gICAgcHVibGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgeyBjb21ibywgbGFiZWwgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInB0LWhvdGtleVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC1ob3RrZXktbGFiZWxcIj57bGFiZWx9PC9kaXY+XG4gICAgICAgICAgICA8S2V5Q29tYm8gY29tYm89e2NvbWJvfSAvPlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlUHJvcHMocHJvcHM6IElIb3RrZXlQcm9wcykge1xuICAgICAgICBpZiAocHJvcHMuZ2xvYmFsICE9PSB0cnVlICYmIHByb3BzLmdyb3VwID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vbi1nbG9iYWwgPEhvdGtleT5zIG11c3QgZGVmaW5lIGEgZ3JvdXBcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
