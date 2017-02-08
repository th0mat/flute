/** Returns whether the value is a function. Acts as a type guard. */
export declare function isFunction(value: any): value is Function;
/** Safely invoke the function with the given arguments, if it is indeed a function, and return its value. */
export declare function safeInvoke<R>(func: () => R): R;
export declare function safeInvoke<A, R>(func: (arg1: A) => R, arg1: A): R;
export declare function safeInvoke<A, B, R>(func: (arg1: A, arg2: B) => R, arg1: A, arg2: B): R;
export declare function safeInvoke<A, B, C, R>(func: (arg1: A, arg2: B, arg3: C) => R, arg1: A, arg2: B, arg3: C): R;
export declare function elementIsOrContains(element: HTMLElement, testElement: HTMLElement): boolean;
/**
 * Returns the difference in length between two arrays. A `null` argument is considered an empty list.
 * The return value will be positive if `a` is longer than `b`, negative if the opposite is true,
 * and zero if their lengths are equal.
 */
export declare function arrayLengthCompare(a?: any[], b?: any[]): number;
/**
 * Returns true if the two numbers are within the given tolerance of each other.
 * This is useful to correct for floating point precision issues, less useful for integers.
 */
export declare function approxEqual(a: number, b: number, tolerance?: number): boolean;
export declare function clamp(val: number, min: number, max: number): number;
/** Return a new object with the same keys as the given object (values are copied, not cloned). */
export declare function shallowClone<T>(object: T): T;
/**
 * Throttle an event on an EventTarget by wrapping it in `requestAnimationFrame` call.
 * Returns the event handler that was bound to given eventName so you can clean up after yourself.
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 */
export declare function throttleEvent(target: EventTarget, eventName: string, newEventName: string): (event: Event) => void;
