/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var TAB_KEY_CODE = 9;
/* istanbul ignore next */
/**
 * A nifty little class that maintains event handlers to add a class to the container element
 * when entering "mouse mode" (on a `mousedown` event) and remove it when entering "keyboard mode"
 * (on a `tab` key `keydown` event).
 */
var InteractionModeEngine = (function () {
    // tslint:disable-next-line:no-constructor-vars
    function InteractionModeEngine(container, className) {
        var _this = this;
        this.container = container;
        this.className = className;
        this.isRunning = false;
        this.handleKeyDown = function (e) {
            if (e.which === TAB_KEY_CODE) {
                _this.reset();
                _this.container.addEventListener("mousedown", _this.handleMouseDown);
            }
        };
        this.handleMouseDown = function () {
            _this.reset();
            _this.container.classList.add(_this.className);
            _this.container.addEventListener("keydown", _this.handleKeyDown);
        };
    }
    /** Returns whether the engine is currently running. */
    InteractionModeEngine.prototype.isActive = function () {
        return this.isRunning;
    };
    /** Enable behavior which applies the given className when in mouse mode. */
    InteractionModeEngine.prototype.start = function () {
        this.container.addEventListener("mousedown", this.handleMouseDown);
        this.isRunning = true;
    };
    /** Disable interaction mode behavior and remove className from container. */
    InteractionModeEngine.prototype.stop = function () {
        this.reset();
        this.isRunning = false;
    };
    InteractionModeEngine.prototype.reset = function () {
        this.container.classList.remove(this.className);
        this.container.removeEventListener("keydown", this.handleKeyDown);
        this.container.removeEventListener("mousedown", this.handleMouseDown);
    };
    return InteractionModeEngine;
}());
exports.InteractionModeEngine = InteractionModeEngine;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vaW50ZXJhY3Rpb25Nb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOztBQUVILElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQztBQUV2QiwwQkFBMEI7QUFFMUI7Ozs7R0FJRztBQUNIO0lBR0ksK0NBQStDO0lBQy9DLCtCQUFvQixTQUFrQixFQUFVLFNBQWlCO1FBSnJFLGlCQXlDQztRQXJDdUIsY0FBUyxHQUFULFNBQVMsQ0FBUztRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFIekQsY0FBUyxHQUFHLEtBQUssQ0FBQztRQTRCbEIsa0JBQWEsR0FBRyxVQUFDLENBQWdCO1lBQ3JDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLEtBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2RSxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBRU8sb0JBQWUsR0FBRztZQUN0QixLQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixLQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzdDLEtBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUE7SUFwQ21FLENBQUM7SUFFckUsdURBQXVEO0lBQ2hELHdDQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQsNEVBQTRFO0lBQ3JFLHFDQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVELDZFQUE2RTtJQUN0RSxvQ0FBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVPLHFDQUFLLEdBQWI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQWNMLDRCQUFDO0FBQUQsQ0F6Q0EsQUF5Q0MsSUFBQTtBQXpDWSw2QkFBcUIsd0JBeUNqQyxDQUFBIiwiZmlsZSI6ImNvbW1vbi9pbnRlcmFjdGlvbk1vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTYgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmNvbnN0IFRBQl9LRVlfQ09ERSA9IDk7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG5cbi8qKlxuICogQSBuaWZ0eSBsaXR0bGUgY2xhc3MgdGhhdCBtYWludGFpbnMgZXZlbnQgaGFuZGxlcnMgdG8gYWRkIGEgY2xhc3MgdG8gdGhlIGNvbnRhaW5lciBlbGVtZW50XG4gKiB3aGVuIGVudGVyaW5nIFwibW91c2UgbW9kZVwiIChvbiBhIGBtb3VzZWRvd25gIGV2ZW50KSBhbmQgcmVtb3ZlIGl0IHdoZW4gZW50ZXJpbmcgXCJrZXlib2FyZCBtb2RlXCJcbiAqIChvbiBhIGB0YWJgIGtleSBga2V5ZG93bmAgZXZlbnQpLlxuICovXG5leHBvcnQgY2xhc3MgSW50ZXJhY3Rpb25Nb2RlRW5naW5lIHtcbiAgICBwcml2YXRlIGlzUnVubmluZyA9IGZhbHNlO1xuXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnN0cnVjdG9yLXZhcnNcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbnRhaW5lcjogRWxlbWVudCwgcHJpdmF0ZSBjbGFzc05hbWU6IHN0cmluZykge31cblxuICAgIC8qKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGVuZ2luZSBpcyBjdXJyZW50bHkgcnVubmluZy4gKi9cbiAgICBwdWJsaWMgaXNBY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzUnVubmluZztcbiAgICB9XG5cbiAgICAvKiogRW5hYmxlIGJlaGF2aW9yIHdoaWNoIGFwcGxpZXMgdGhlIGdpdmVuIGNsYXNzTmFtZSB3aGVuIGluIG1vdXNlIG1vZGUuICovXG4gICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlTW91c2VEb3duKTtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKiBEaXNhYmxlIGludGVyYWN0aW9uIG1vZGUgYmVoYXZpb3IgYW5kIHJlbW92ZSBjbGFzc05hbWUgZnJvbSBjb250YWluZXIuICovXG4gICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlc2V0KCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuY2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5oYW5kbGVLZXlEb3duKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZU1vdXNlRG93bik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVLZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IFRBQl9LRVlfQ09ERSkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZU1vdXNlRG93bik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU1vdXNlRG93biA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5oYW5kbGVLZXlEb3duKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
