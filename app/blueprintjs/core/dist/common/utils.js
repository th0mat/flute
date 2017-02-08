/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
/** Returns whether the value is a function. Acts as a type guard. */
function isFunction(value) {
    return typeof value === "function";
}
exports.isFunction = isFunction;
function safeInvoke(func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (isFunction(func)) {
        return func.apply(void 0, args);
    }
}
exports.safeInvoke = safeInvoke;
function elementIsOrContains(element, testElement) {
    return element === testElement || element.contains(testElement);
}
exports.elementIsOrContains = elementIsOrContains;
/**
 * Returns the difference in length between two arrays. A `null` argument is considered an empty list.
 * The return value will be positive if `a` is longer than `b`, negative if the opposite is true,
 * and zero if their lengths are equal.
 */
function arrayLengthCompare(a, b) {
    if (a === void 0) { a = []; }
    if (b === void 0) { b = []; }
    return a.length - b.length;
}
exports.arrayLengthCompare = arrayLengthCompare;
/**
 * Returns true if the two numbers are within the given tolerance of each other.
 * This is useful to correct for floating point precision issues, less useful for integers.
 */
function approxEqual(a, b, tolerance) {
    if (tolerance === void 0) { tolerance = 0.00001; }
    return Math.abs(a - b) <= tolerance;
}
exports.approxEqual = approxEqual;
/* Clamps the given number between min and max values. Returns value if within range, or closest bound. */
function clamp(val, min, max) {
    if (max < min) {
        throw new Error("clamp: max cannot be less than min");
    }
    return Math.min(Math.max(val, min), max);
}
exports.clamp = clamp;
/** Return a new object with the same keys as the given object (values are copied, not cloned). */
function shallowClone(object) {
    var clonedObject = {};
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            clonedObject[key] = object[key];
        }
    }
    return clonedObject;
}
exports.shallowClone = shallowClone;
/**
 * Throttle an event on an EventTarget by wrapping it in `requestAnimationFrame` call.
 * Returns the event handler that was bound to given eventName so you can clean up after yourself.
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
function throttleEvent(target, eventName, newEventName) {
    var running = false;
    /* istanbul ignore next: borrowed directly from MDN */
    var func = function (event) {
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(function () {
            target.dispatchEvent(new CustomEvent(newEventName, event));
            running = false;
        });
    };
    target.addEventListener(eventName, func);
    return func;
}
exports.throttleEvent = throttleEvent;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21tb24vdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7O0FBRUgscUVBQXFFO0FBQ3JFLG9CQUEyQixLQUFVO0lBQ2pDLE1BQU0sQ0FBQyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUM7QUFDdkMsQ0FBQztBQUZlLGtCQUFVLGFBRXpCLENBQUE7QUFPRCxvQkFBMkIsSUFBYztJQUFFLGNBQWM7U0FBZCxXQUFjLENBQWQsc0JBQWMsQ0FBZCxJQUFjO1FBQWQsNkJBQWM7O0lBQ3JELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLElBQUksZUFBSSxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0FBQ0wsQ0FBQztBQUplLGtCQUFVLGFBSXpCLENBQUE7QUFFRCw2QkFBb0MsT0FBb0IsRUFBRSxXQUF3QjtJQUM5RSxNQUFNLENBQUMsT0FBTyxLQUFLLFdBQVcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFGZSwyQkFBbUIsc0JBRWxDLENBQUE7QUFFRDs7OztHQUlHO0FBQ0gsNEJBQW1DLENBQWEsRUFBRSxDQUFhO0lBQTVCLGlCQUFhLEdBQWIsTUFBYTtJQUFFLGlCQUFhLEdBQWIsTUFBYTtJQUMzRCxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQy9CLENBQUM7QUFGZSwwQkFBa0IscUJBRWpDLENBQUE7QUFFRDs7O0dBR0c7QUFDSCxxQkFBNEIsQ0FBUyxFQUFFLENBQVMsRUFBRSxTQUFtQjtJQUFuQix5QkFBbUIsR0FBbkIsbUJBQW1CO0lBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7QUFDeEMsQ0FBQztBQUZlLG1CQUFXLGNBRTFCLENBQUE7QUFFRCwwR0FBMEc7QUFDMUcsZUFBc0IsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBTGUsYUFBSyxRQUtwQixDQUFBO0FBRUQsa0dBQWtHO0FBQ2xHLHNCQUFnQyxNQUFTO0lBQ3JDLElBQU0sWUFBWSxHQUFRLEVBQUUsQ0FBQztJQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBVSxNQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUMsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsWUFBaUIsQ0FBQztBQUM3QixDQUFDO0FBUmUsb0JBQVksZUFRM0IsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDSCx1QkFBOEIsTUFBbUIsRUFBRSxTQUFpQixFQUFFLFlBQW9CO0lBQ3RGLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixzREFBc0Q7SUFDdEQsSUFBSSxJQUFJLEdBQUcsVUFBQyxLQUFZO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7UUFBQyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDZixxQkFBcUIsQ0FBQztZQUNsQixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUM7SUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQWJlLHFCQUFhLGdCQWE1QixDQUFBO0FBQUEsQ0FBQyIsImZpbGUiOiJjb21tb24vdXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTUgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbi8qKiBSZXR1cm5zIHdoZXRoZXIgdGhlIHZhbHVlIGlzIGEgZnVuY3Rpb24uIEFjdHMgYXMgYSB0eXBlIGd1YXJkLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWU6IGFueSk6IHZhbHVlIGlzIEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbi8qKiBTYWZlbHkgaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBnaXZlbiBhcmd1bWVudHMsIGlmIGl0IGlzIGluZGVlZCBhIGZ1bmN0aW9uLCBhbmQgcmV0dXJuIGl0cyB2YWx1ZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzYWZlSW52b2tlPFI+KGZ1bmM6ICgpID0+IFIpOiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVJbnZva2U8QSwgUj4oZnVuYzogKGFyZzE6IEEpID0+IFIsIGFyZzE6IEEpOiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVJbnZva2U8QSwgQiwgUj4oZnVuYzogKGFyZzE6IEEsIGFyZzI6IEIpID0+IFIsIGFyZzE6IEEsIGFyZzI6IEIpOiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVJbnZva2U8QSwgQiwgQywgUj4oZnVuYzogKGFyZzE6IEEsIGFyZzI6IEIsIGFyZzM6IEMpID0+IFIsIGFyZzE6IEEsIGFyZzI6IEIsIGFyZzM6IEMpOiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHNhZmVJbnZva2UoZnVuYzogRnVuY3Rpb24sIC4uLmFyZ3M6IGFueVtdKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMoLi4uYXJncyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZWxlbWVudElzT3JDb250YWlucyhlbGVtZW50OiBIVE1MRWxlbWVudCwgdGVzdEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPT09IHRlc3RFbGVtZW50IHx8IGVsZW1lbnQuY29udGFpbnModGVzdEVsZW1lbnQpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGRpZmZlcmVuY2UgaW4gbGVuZ3RoIGJldHdlZW4gdHdvIGFycmF5cy4gQSBgbnVsbGAgYXJndW1lbnQgaXMgY29uc2lkZXJlZCBhbiBlbXB0eSBsaXN0LlxuICogVGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIHBvc2l0aXZlIGlmIGBhYCBpcyBsb25nZXIgdGhhbiBgYmAsIG5lZ2F0aXZlIGlmIHRoZSBvcHBvc2l0ZSBpcyB0cnVlLFxuICogYW5kIHplcm8gaWYgdGhlaXIgbGVuZ3RocyBhcmUgZXF1YWwuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcnJheUxlbmd0aENvbXBhcmUoYTogYW55W10gPSBbXSwgYjogYW55W10gPSBbXSkge1xuICAgIHJldHVybiBhLmxlbmd0aCAtIGIubGVuZ3RoO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdHdvIG51bWJlcnMgYXJlIHdpdGhpbiB0aGUgZ2l2ZW4gdG9sZXJhbmNlIG9mIGVhY2ggb3RoZXIuXG4gKiBUaGlzIGlzIHVzZWZ1bCB0byBjb3JyZWN0IGZvciBmbG9hdGluZyBwb2ludCBwcmVjaXNpb24gaXNzdWVzLCBsZXNzIHVzZWZ1bCBmb3IgaW50ZWdlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHByb3hFcXVhbChhOiBudW1iZXIsIGI6IG51bWJlciwgdG9sZXJhbmNlID0gMC4wMDAwMSkge1xuICAgIHJldHVybiBNYXRoLmFicyhhIC0gYikgPD0gdG9sZXJhbmNlO1xufVxuXG4vKiBDbGFtcHMgdGhlIGdpdmVuIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4IHZhbHVlcy4gUmV0dXJucyB2YWx1ZSBpZiB3aXRoaW4gcmFuZ2UsIG9yIGNsb3Nlc3QgYm91bmQuICovXG5leHBvcnQgZnVuY3Rpb24gY2xhbXAodmFsOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIGlmIChtYXggPCBtaW4pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2xhbXA6IG1heCBjYW5ub3QgYmUgbGVzcyB0aGFuIG1pblwiKTtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbCwgbWluKSwgbWF4KTtcbn1cblxuLyoqIFJldHVybiBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgc2FtZSBrZXlzIGFzIHRoZSBnaXZlbiBvYmplY3QgKHZhbHVlcyBhcmUgY29waWVkLCBub3QgY2xvbmVkKS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93Q2xvbmU8VD4ob2JqZWN0OiBUKTogVCB7XG4gICAgY29uc3QgY2xvbmVkT2JqZWN0OiBhbnkgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBjbG9uZWRPYmplY3Rba2V5XSA9ICg8YW55PiBvYmplY3QpW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNsb25lZE9iamVjdCBhcyBUO1xufVxuXG4vKipcbiAqIFRocm90dGxlIGFuIGV2ZW50IG9uIGFuIEV2ZW50VGFyZ2V0IGJ5IHdyYXBwaW5nIGl0IGluIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgIGNhbGwuXG4gKiBSZXR1cm5zIHRoZSBldmVudCBoYW5kbGVyIHRoYXQgd2FzIGJvdW5kIHRvIGdpdmVuIGV2ZW50TmFtZSBzbyB5b3UgY2FuIGNsZWFuIHVwIGFmdGVyIHlvdXJzZWxmLlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvc2Nyb2xsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZUV2ZW50KHRhcmdldDogRXZlbnRUYXJnZXQsIGV2ZW50TmFtZTogc3RyaW5nLCBuZXdFdmVudE5hbWU6IHN0cmluZykge1xuICAgIGxldCBydW5uaW5nID0gZmFsc2U7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGJvcnJvd2VkIGRpcmVjdGx5IGZyb20gTUROICovXG4gICAgbGV0IGZ1bmMgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChydW5uaW5nKSB7IHJldHVybjsgfVxuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuZXdFdmVudE5hbWUsIGV2ZW50KSk7XG4gICAgICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jKTtcbiAgICByZXR1cm4gZnVuYztcbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
