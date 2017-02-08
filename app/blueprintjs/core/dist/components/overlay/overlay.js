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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var CSSTransitionGroup = require("react-addons-css-transition-group");
var Classes = require("../../common/classes");
var Keys = require("../../common/keys");
var utils_1 = require("../../common/utils");
var portal_1 = require("../portal/portal");
var Overlay = (function (_super) {
    __extends(Overlay, _super);
    function Overlay(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.displayName = "Blueprint.Overlay";
        this.refHandlers = {
            container: function (ref) { return _this.containerElement = ref; },
        };
        this.bringFocusInsideOverlay = function () {
            var containerElement = _this.containerElement;
            // container ref may be undefined between component mounting and Portal rendering
            // activeElement may be undefined in some rare cases in IE
            if (containerElement == null || document.activeElement == null || !_this.props.isOpen) {
                return;
            }
            var isFocusOutsideModal = !containerElement.contains(document.activeElement);
            if (isFocusOutsideModal) {
                // element marked autofocus has higher priority than the other clowns
                var autofocusElement = containerElement.query("[autofocus]");
                var wrapperElement = containerElement.query("[tabindex]");
                if (autofocusElement != null) {
                    autofocusElement.focus();
                }
                else if (wrapperElement != null) {
                    wrapperElement.focus();
                }
            }
        };
        this.handleBackdropMouseDown = function (e) {
            if (_this.props.canOutsideClickClose) {
                utils_1.safeInvoke(_this.props.onClose, e);
            }
            utils_1.safeInvoke(_this.props.backdropProps.onMouseDown, e);
        };
        this.handleDocumentClick = function (e) {
            var _a = _this.props, isOpen = _a.isOpen, onClose = _a.onClose;
            var eventTarget = e.target;
            var isClickInOverlay = _this.containerElement != null
                && _this.containerElement.contains(eventTarget);
            if (isOpen && _this.props.canOutsideClickClose && !isClickInOverlay) {
                // casting to any because this is a native event
                utils_1.safeInvoke(onClose, e);
            }
        };
        this.handleContentMount = function () {
            if (_this.props.isOpen) {
                utils_1.safeInvoke(_this.props.didOpen);
            }
            if (_this.props.autoFocus) {
                _this.bringFocusInsideOverlay();
            }
        };
        this.handleDocumentFocus = function (e) {
            if (_this.props.enforceFocus
                && _this.containerElement != null
                && !_this.containerElement.contains(e.target)) {
                e.stopImmediatePropagation();
                _this.bringFocusInsideOverlay();
            }
        };
        this.handleKeyDown = function (e) {
            var _a = _this.props, canEscapeKeyClose = _a.canEscapeKeyClose, onClose = _a.onClose;
            if (e.which === Keys.ESCAPE && canEscapeKeyClose) {
                utils_1.safeInvoke(onClose, e);
                // prevent browser-specific escape key behavior (Safari exits fullscreen)
                e.preventDefault();
            }
        };
        this.state = { hasEverOpened: props.isOpen };
    }
    Overlay.prototype.render = function () {
        // oh snap! no reason to render anything at all if we're being truly lazy
        if (this.props.lazy && !this.state.hasEverOpened) {
            return null;
        }
        var _a = this.props, children = _a.children, className = _a.className, inline = _a.inline, isOpen = _a.isOpen, transitionDuration = _a.transitionDuration, transitionName = _a.transitionName;
        // add a special class to each child that will automatically set the appropriate
        // CSS position mode under the hood. also, make the container focusable so we can
        // trap focus inside it (via `persistentFocus()`).
        var decoratedChildren = React.Children.map(children, function (child) {
            return React.cloneElement(child, {
                className: classNames(child.props.className, Classes.OVERLAY_CONTENT),
                tabIndex: 0,
            });
        });
        var transitionGroup = (React.createElement(CSSTransitionGroup, {transitionAppear: true, transitionAppearTimeout: transitionDuration, transitionEnterTimeout: transitionDuration, transitionLeaveTimeout: transitionDuration, transitionName: transitionName}, 
            this.maybeRenderBackdrop(), 
            isOpen ? decoratedChildren : null));
        var mergedClassName = classNames(Classes.OVERLAY, (_b = {},
            _b[Classes.OVERLAY_OPEN] = isOpen,
            _b[Classes.OVERLAY_INLINE] = inline,
            _b
        ), className);
        var elementProps = {
            className: mergedClassName,
            onKeyDown: this.handleKeyDown,
        };
        if (inline) {
            return React.createElement("span", __assign({}, elementProps, {ref: this.refHandlers.container}), transitionGroup);
        }
        else {
            return (React.createElement(portal_1.Portal, __assign({}, elementProps, {containerRef: this.refHandlers.container, onChildrenMount: this.handleContentMount}), transitionGroup));
        }
        var _b;
    };
    Overlay.prototype.componentDidMount = function () {
        if (this.props.isOpen) {
            this.overlayWillOpen();
        }
    };
    Overlay.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState({ hasEverOpened: this.state.hasEverOpened || nextProps.isOpen });
    };
    Overlay.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.isOpen && !this.props.isOpen) {
            this.overlayWillClose();
        }
        else if (!prevProps.isOpen && this.props.isOpen) {
            this.overlayWillOpen();
        }
    };
    Overlay.prototype.componentWillUnmount = function () {
        this.overlayWillClose();
    };
    Overlay.prototype.maybeRenderBackdrop = function () {
        var _a = this.props, backdropClassName = _a.backdropClassName, backdropProps = _a.backdropProps, hasBackdrop = _a.hasBackdrop, isOpen = _a.isOpen;
        if (hasBackdrop && isOpen) {
            return (React.createElement("div", __assign({}, backdropProps, {className: classNames(Classes.OVERLAY_BACKDROP, backdropClassName, backdropProps.className), onMouseDown: this.handleBackdropMouseDown, tabIndex: this.props.canOutsideClickClose ? 0 : null})));
        }
        else {
            return undefined;
        }
    };
    Overlay.prototype.overlayWillClose = function () {
        document.removeEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        document.removeEventListener("mousedown", this.handleDocumentClick);
        document.body.classList.remove(Classes.OVERLAY_OPEN);
        var openStack = Overlay.openStack;
        var idx = openStack.indexOf(this);
        if (idx > 0) {
            openStack.splice(idx, 1);
            var lastOpenedOverlay = Overlay.getLastOpened();
            if (openStack.length > 0 && lastOpenedOverlay.props.enforceFocus) {
                document.addEventListener("focus", lastOpenedOverlay.handleDocumentFocus, /* useCapture */ true);
            }
        }
    };
    Overlay.prototype.overlayWillOpen = function () {
        var openStack = Overlay.openStack;
        if (openStack.length > 0) {
            document.removeEventListener("focus", Overlay.getLastOpened().handleDocumentFocus, /* useCapture */ true);
        }
        openStack.push(this);
        if (this.props.canOutsideClickClose && !this.props.hasBackdrop) {
            document.addEventListener("mousedown", this.handleDocumentClick);
        }
        if (this.props.enforceFocus) {
            document.addEventListener("focus", this.handleDocumentFocus, /* useCapture */ true);
        }
        if (this.props.inline) {
            utils_1.safeInvoke(this.props.didOpen);
            if (this.props.autoFocus) {
                this.bringFocusInsideOverlay();
            }
        }
        else if (this.props.hasBackdrop) {
            // add a class to the body to prevent scrolling of content below the overlay
            document.body.classList.add(Classes.OVERLAY_OPEN);
        }
    };
    Overlay.defaultProps = {
        autoFocus: true,
        backdropProps: {},
        canEscapeKeyClose: true,
        canOutsideClickClose: true,
        enforceFocus: true,
        hasBackdrop: true,
        inline: false,
        isOpen: false,
        lazy: true,
        transitionDuration: 300,
        transitionName: "pt-overlay",
    };
    Overlay.openStack = [];
    Overlay.getLastOpened = function () { return Overlay.openStack[Overlay.openStack.length - 1]; };
    Overlay = __decorate([
        PureRender
    ], Overlay);
    return Overlay;
}(React.Component));
exports.Overlay = Overlay;
exports.OverlayFactory = React.createFactory(Overlay);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL292ZXJsYXkvb3ZlcmxheS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFDL0IsSUFBWSxrQkFBa0IsV0FBTSxtQ0FBbUMsQ0FBQyxDQUFBO0FBRXhFLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsSUFBWSxJQUFJLFdBQU0sbUJBQW1CLENBQUMsQ0FBQTtBQUUxQyxzQkFBMkIsb0JBQW9CLENBQUMsQ0FBQTtBQUNoRCx1QkFBdUIsa0JBQWtCLENBQUMsQ0FBQTtBQTBHMUM7SUFBNkIsMkJBQTZDO0lBMEJ0RSxpQkFBbUIsS0FBcUIsRUFBRSxPQUFhO1FBMUIzRCxpQkF3T0M7UUE3TU8sa0JBQU0sS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBVG5CLGdCQUFXLEdBQUcsbUJBQW1CLENBQUM7UUFJakMsZ0JBQVcsR0FBRztZQUNsQixTQUFTLEVBQUUsVUFBQyxHQUFtQixJQUFLLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsRUFBM0IsQ0FBMkI7U0FDbEUsQ0FBQztRQThJTSw0QkFBdUIsR0FBRztZQUN0Qiw2Q0FBZ0IsQ0FBVTtZQUVsQyxpRkFBaUY7WUFDakYsMERBQTBEO1lBQzFELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDbkYsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUVELElBQU0sbUJBQW1CLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFB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Q3ZCLGNBQWMsRUFBRSxZQUFZO0tBQy9CLENBQUM7SUFFYSxpQkFBUyxHQUFjLEVBQUUsQ0FBQztJQUMxQixxQkFBYSxHQUFHLGNBQU0sT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUEvQyxDQUErQyxDQUFDO0lBakJ6RjtRQUFDLFVBQVU7ZUFBQTtJQXlPWCxjQUFDO0FBQUQsQ0F4T0EsQUF3T0MsQ0F4TzRCLEtBQUssQ0FBQyxTQUFTLEdBd08zQztBQXhPWSxlQUFPLFVBd09uQixDQUFBO0FBRVksc0JBQWMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvb3ZlcmxheS9vdmVybGF5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE1IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBQdXJlUmVuZGVyIGZyb20gXCJwdXJlLXJlbmRlci1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgQ1NTVHJhbnNpdGlvbkdyb3VwIGZyb20gXCJyZWFjdC1hZGRvbnMtY3NzLXRyYW5zaXRpb24tZ3JvdXBcIjtcblxuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEtleXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9rZXlzXCI7XG5pbXBvcnQgeyBJUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5pbXBvcnQgeyBzYWZlSW52b2tlIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuaW1wb3J0IHsgUG9ydGFsIH0gZnJvbSBcIi4uL3BvcnRhbC9wb3J0YWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJT3ZlcmxheWFibGVQcm9wcyB7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgb3ZlcmxheSBzaG91bGQgYWNxdWlyZSBhcHBsaWNhdGlvbiBmb2N1cyB3aGVuIGl0IGZpcnN0IG9wZW5zLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBhdXRvRm9jdXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBwcmVzc2luZyB0aGUgYGVzY2Aga2V5IHNob3VsZCBpbnZva2UgYG9uQ2xvc2VgLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBjYW5Fc2NhcGVLZXlDbG9zZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBvdmVybGF5IHNob3VsZCBwcmV2ZW50IGZvY3VzIGZyb20gbGVhdmluZyBpdHNlbGYuIFRoYXQgaXMsIGlmIHRoZSB1c2VyIGF0dGVtcHRzXG4gICAgICogdG8gZm9jdXMgYW4gZWxlbWVudCBvdXRzaWRlIHRoZSBvdmVybGF5IGFuZCB0aGlzIHByb3AgaXMgZW5hYmxlZCwgdGhlbiB0aGUgb3ZlcmxheSB3aWxsXG4gICAgICogaW1tZWRpYXRlbHkgYnJpbmcgZm9jdXMgYmFjayB0byBpdHNlbGYuIElmIHlvdSBhcmUgbmVzdGluZyBvdmVybGF5IGNvbXBvbmVudHMsIGVpdGhlciBkaXNhYmxlXG4gICAgICogdGhpcyBwcm9wIG9uIHRoZSBcIm91dGVybW9zdFwiIG92ZXJsYXlzIG9yIG1hcmsgdGhlIG5lc3RlZCBvbmVzIGBpbmxpbmU9e3RydWV9YC5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgZW5mb3JjZUZvY3VzPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIG92ZXJsYXkgc2hvdWxkIGJlIHJlbmRlcmVkIGlubGluZSBvciBpbnRvIGEgbmV3IGVsZW1lbnQgb24gYGRvY3VtZW50LmJvZHlgLlxuICAgICAqIFRoaXMgcHJvcCBlc3NlbnRpYWxseSBkZXRlcm1pbmVzIHdoaWNoIGVsZW1lbnQgaXMgY292ZXJlZCBieSB0aGUgYmFja2Ryb3A6IGlmIGB0cnVlYCxcbiAgICAgKiB0aGVuIG9ubHkgaXRzIHBhcmVudCBpcyBjb3ZlcmVkOyBvdGhlcndpc2UsIHRoZSBlbnRpcmUgYXBwbGljYXRpb24gaXMgY292ZXJlZC5cbiAgICAgKiBTZXQgdGhpcyBwcm9wIHRvIHRydWUgd2hlbiB0aGlzIGNvbXBvbmVudCBpcyB1c2VkIGluc2lkZSBhbiBgT3ZlcmxheWAgKHN1Y2ggYXNcbiAgICAgKiBgRGlhbG9nYCBvciBgUG9wb3ZlcmApIHRvIGVuc3VyZSB0aGF0IHRoaXMgY29tcG9uZW50IGlzIHJlbmRlcmVkIGFib3ZlIGl0cyBwYXJlbnQuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBpbmxpbmU/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogSWYgYHRydWVgIGFuZCBub3QgYGlubGluZWAsIHRoZSBgUG9ydGFsYCBjb250YWluaW5nIHRoZSBjaGlsZHJlbiBpcyBjcmVhdGVkIGFuZCBhdHRhY2hlZFxuICAgICAqIHRvIHRoZSBET00gd2hlbiB0aGUgb3ZlcmxheSBpcyBvcGVuZWQgZm9yIHRoZSBmaXJzdCB0aW1lOyBvdGhlcndpc2UgdGhpcyBoYXBwZW5zIHdoZW4gdGhlXG4gICAgICogY29tcG9uZW50IG1vdW50cy4gTGF6eSBtb3VudGluZyBwcm92aWRlcyBub3RpY2VhYmxlIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50cyBpZiB5b3UgaGF2ZSBsb3RzXG4gICAgICogb2Ygb3ZlcmxheXMgYXQgb25jZSwgc3VjaCBhcyBvbiBlYWNoIHJvdyBvZiBhIHRhYmxlLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBsYXp5PzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBob3cgbG9uZyAoaW4gbWlsbGlzZWNvbmRzKSB0aGUgb3ZlcmxheSdzIGVudGVyL2xlYXZlIHRyYW5zaXRpb24gdGFrZXMuXG4gICAgICogVGhpcyBpcyB1c2VkIGJ5IFJlYWN0IGBDU1NUcmFuc2l0aW9uR3JvdXBgIHRvIGtub3cgd2hlbiBhIHRyYW5zaXRpb24gY29tcGxldGVzIGFuZCBtdXN0IG1hdGNoXG4gICAgICogdGhlIGR1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gaW4gQ1NTLiBPbmx5IHNldCB0aGlzIHByb3AgaWYgeW91IG92ZXJyaWRlIEJsdWVwcmludCdzIGRlZmF1bHRcbiAgICAgKiB0cmFuc2l0aW9ucyB3aXRoIG5ldyB0cmFuc2l0aW9ucyBvZiBhIGRpZmZlcmVudCBsZW5ndGguXG4gICAgICogQGRlZmF1bHQgMTAwXG4gICAgICovXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogQSBjYWxsYmFjayB0aGF0IGlzIGludm9rZWQgd2hlbiB1c2VyIGludGVyYWN0aW9uIGNhdXNlcyB0aGUgb3ZlcmxheSB0byBjbG9zZSwgc3VjaCBhc1xuICAgICAqIGNsaWNraW5nIG9uIHRoZSBvdmVybGF5IG9yIHByZXNzaW5nIHRoZSBgZXNjYCBrZXkgKGlmIGVuYWJsZWQpLlxuICAgICAqIFJlY2VpdmVzIHRoZSBldmVudCBmcm9tIHRoZSB1c2VyJ3MgaW50ZXJhY3Rpb24sIGlmIHRoZXJlIHdhcyBhbiBldmVudCAoZ2VuZXJhbGx5IGVpdGhlciBhXG4gICAgICogbW91c2Ugb3Iga2V5IGV2ZW50KS4gTm90ZSB0aGF0LCBzaW5jZSB0aGlzIGNvbXBvbmVudCBpcyBjb250cm9sbGVkIGJ5IHRoZSBgaXNPcGVuYCBwcm9wLCBpdFxuICAgICAqIHdpbGwgbm90IGFjdHVhbGx5IGNsb3NlIGl0c2VsZiB1bnRpbCB0aGF0IHByb3AgYmVjb21lcyBgZmFsc2VgLlxuICAgICAqL1xuICAgIG9uQ2xvc2U/KGV2ZW50PzogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQmFja2Ryb3BQcm9wcyB7XG4gICAgLyoqIENTUyBjbGFzcyBuYW1lcyB0byBhcHBseSB0byBiYWNrZHJvcCBlbGVtZW50LiAqL1xuICAgIGJhY2tkcm9wQ2xhc3NOYW1lPzogc3RyaW5nO1xuXG4gICAgLyoqIEhUTUwgcHJvcHMgZm9yIHRoZSBiYWNrZHJvcCBlbGVtZW50LiAqL1xuICAgIGJhY2tkcm9wUHJvcHM/OiBSZWFjdC5IVE1MUHJvcHM8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBjbGlja2luZyBvdXRzaWRlIHRoZSBvdmVybGF5IGVsZW1lbnQgKGVpdGhlciBvbiBiYWNrZHJvcCB3aGVuIHByZXNlbnQgb3Igb24gZG9jdW1lbnQpXG4gICAgICogc2hvdWxkIGludm9rZSBgb25DbG9zZWAuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGNhbk91dHNpZGVDbGlja0Nsb3NlPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgYSBjb250YWluZXItc3Bhbm5pbmcgYmFja2Ryb3AgZWxlbWVudCBzaG91bGQgYmUgcmVuZGVyZWQgYmVoaW5kIHRoZSBjb250ZW50cy5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElPdmVybGF5UHJvcHMgZXh0ZW5kcyBJT3ZlcmxheWFibGVQcm9wcywgSUJhY2tkcm9wUHJvcHMsIElQcm9wcyB7XG4gICAgLyoqIExpZmVjeWNsZSBjYWxsYmFjayBpbnZva2VkIGFmdGVyIHRoZSBvdmVybGF5IG9wZW5zIGFuZCBpcyBtb3VudGVkIGluIHRoZSBET00uICovXG4gICAgZGlkT3Blbj86ICgpID0+IGFueTtcblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG92ZXJsYXkgYW5kIGl0cyBjaGlsZHJlbi5cbiAgICAgKiBUaGlzIHByb3AgaXMgcmVxdWlyZWQgYmVjYXVzZSB0aGUgY29tcG9uZW50IGlzIGNvbnRyb2xsZWQuXG4gICAgICovXG4gICAgaXNPcGVuOiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgdHJhbnNpdGlvbiBmb3IgaW50ZXJuYWwgYENTU1RyYW5zaXRpb25Hcm91cGAuXG4gICAgICogUHJvdmlkaW5nIHlvdXIgb3duIG5hbWUgaGVyZSB3aWxsIHJlcXVpcmUgZGVmaW5pbmcgbmV3IENTUyB0cmFuc2l0aW9uIHByb3BlcnRpZXMuXG4gICAgICogQGRlZmF1bHQgXCJwdC1vdmVybGF5XCJcbiAgICAgKi9cbiAgICB0cmFuc2l0aW9uTmFtZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJT3ZlcmxheVN0YXRlIHtcbiAgICBoYXNFdmVyT3BlbmVkPzogYm9vbGVhbjtcbn1cblxuQFB1cmVSZW5kZXJcbmV4cG9ydCBjbGFzcyBPdmVybGF5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElPdmVybGF5UHJvcHMsIElPdmVybGF5U3RhdGU+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSU92ZXJsYXlQcm9wcyA9IHtcbiAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxuICAgICAgICBiYWNrZHJvcFByb3BzOiB7fSxcbiAgICAgICAgY2FuRXNjYXBlS2V5Q2xvc2U6IHRydWUsXG4gICAgICAgIGNhbk91dHNpZGVDbGlja0Nsb3NlOiB0cnVlLFxuICAgICAgICBlbmZvcmNlRm9jdXM6IHRydWUsXG4gICAgICAgIGhhc0JhY2tkcm9wOiB0cnVlLFxuICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICBpc09wZW46IGZhbHNlLFxuICAgICAgICBsYXp5OiB0cnVlLFxuICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDMwMCxcbiAgICAgICAgdHJhbnNpdGlvbk5hbWU6IFwicHQtb3ZlcmxheVwiLFxuICAgIH07XG5cbiAgICBwcml2YXRlIHN0YXRpYyBvcGVuU3RhY2s6IE92ZXJsYXlbXSA9IFtdO1xuICAgIHByaXZhdGUgc3RhdGljIGdldExhc3RPcGVuZWQgPSAoKSA9PiBPdmVybGF5Lm9wZW5TdGFja1tPdmVybGF5Lm9wZW5TdGFjay5sZW5ndGggLSAxXTtcblxuICAgIHB1YmxpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50Lk92ZXJsYXlcIjtcblxuICAgIC8vIGFuIEhUTUxFbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIGJhY2tkcm9wIGFuZCBhbnkgY2hpbGRyZW4sIHRvIHF1ZXJ5IGZvciBmb2N1cyB0YXJnZXRcbiAgICBwcml2YXRlIGNvbnRhaW5lckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgcmVmSGFuZGxlcnMgPSB7XG4gICAgICAgIGNvbnRhaW5lcjogKHJlZjogSFRNTERpdkVsZW1lbnQpID0+IHRoaXMuY29udGFpbmVyRWxlbWVudCA9IHJlZixcbiAgICB9O1xuXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHByb3BzPzogSU92ZXJsYXlQcm9wcywgY29udGV4dD86IGFueSkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGhhc0V2ZXJPcGVuZWQ6IHByb3BzLmlzT3BlbiB9O1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIC8vIG9oIHNuYXAhIG5vIHJlYXNvbiB0byByZW5kZXIgYW55dGhpbmcgYXQgYWxsIGlmIHdlJ3JlIGJlaW5nIHRydWx5IGxhenlcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubGF6eSAmJiAhdGhpcy5zdGF0ZS5oYXNFdmVyT3BlbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgaW5saW5lLCBpc09wZW4sIHRyYW5zaXRpb25EdXJhdGlvbiwgdHJhbnNpdGlvbk5hbWUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgLy8gYWRkIGEgc3BlY2lhbCBjbGFzcyB0byBlYWNoIGNoaWxkIHRoYXQgd2lsbCBhdXRvbWF0aWNhbGx5IHNldCB0aGUgYXBwcm9wcmlhdGVcbiAgICAgICAgLy8gQ1NTIHBvc2l0aW9uIG1vZGUgdW5kZXIgdGhlIGhvb2QuIGFsc28sIG1ha2UgdGhlIGNvbnRhaW5lciBmb2N1c2FibGUgc28gd2UgY2FuXG4gICAgICAgIC8vIHRyYXAgZm9jdXMgaW5zaWRlIGl0ICh2aWEgYHBlcnNpc3RlbnRGb2N1cygpYCkuXG4gICAgICAgIGNvbnN0IGRlY29yYXRlZENoaWxkcmVuID0gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCAoY2hpbGQ6IFJlYWN0LlJlYWN0RWxlbWVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGNoaWxkLnByb3BzLmNsYXNzTmFtZSwgQ2xhc3Nlcy5PVkVSTEFZX0NPTlRFTlQpLFxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiAwLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25Hcm91cCA9IChcbiAgICAgICAgICAgIDxDU1NUcmFuc2l0aW9uR3JvdXBcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uQXBwZWFyPXt0cnVlfVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25BcHBlYXJUaW1lb3V0PXt0cmFuc2l0aW9uRHVyYXRpb259XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkVudGVyVGltZW91dD17dHJhbnNpdGlvbkR1cmF0aW9ufVxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25MZWF2ZVRpbWVvdXQ9e3RyYW5zaXRpb25EdXJhdGlvbn1cbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTmFtZT17dHJhbnNpdGlvbk5hbWV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMubWF5YmVSZW5kZXJCYWNrZHJvcCgpfVxuICAgICAgICAgICAgICAgIHtpc09wZW4gPyBkZWNvcmF0ZWRDaGlsZHJlbiA6IG51bGx9XG4gICAgICAgICAgICA8L0NTU1RyYW5zaXRpb25Hcm91cD5cbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBtZXJnZWRDbGFzc05hbWUgPSBjbGFzc05hbWVzKENsYXNzZXMuT1ZFUkxBWSwge1xuICAgICAgICAgICAgW0NsYXNzZXMuT1ZFUkxBWV9PUEVOXTogaXNPcGVuLFxuICAgICAgICAgICAgW0NsYXNzZXMuT1ZFUkxBWV9JTkxJTkVdOiBpbmxpbmUsXG4gICAgICAgIH0sIGNsYXNzTmFtZSk7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudFByb3BzID0ge1xuICAgICAgICAgICAgY2xhc3NOYW1lOiBtZXJnZWRDbGFzc05hbWUsXG4gICAgICAgICAgICBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93bixcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoaW5saW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gPHNwYW4gey4uLmVsZW1lbnRQcm9wc30gcmVmPXt0aGlzLnJlZkhhbmRsZXJzLmNvbnRhaW5lcn0+e3RyYW5zaXRpb25Hcm91cH08L3NwYW4+O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8UG9ydGFsXG4gICAgICAgICAgICAgICAgICAgIHsuLi5lbGVtZW50UHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lclJlZj17dGhpcy5yZWZIYW5kbGVycy5jb250YWluZXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hpbGRyZW5Nb3VudD17dGhpcy5oYW5kbGVDb250ZW50TW91bnR9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7dHJhbnNpdGlvbkdyb3VwfVxuICAgICAgICAgICAgICAgIDwvUG9ydGFsPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlXaWxsT3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBJT3ZlcmxheVByb3BzKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBoYXNFdmVyT3BlbmVkOiB0aGlzLnN0YXRlLmhhc0V2ZXJPcGVuZWQgfHwgbmV4dFByb3BzLmlzT3BlbiB9KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogSU92ZXJsYXlQcm9wcykge1xuICAgICAgICBpZiAocHJldlByb3BzLmlzT3BlbiAmJiAhdGhpcy5wcm9wcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVdpbGxDbG9zZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCFwcmV2UHJvcHMuaXNPcGVuICYmIHRoaXMucHJvcHMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLm92ZXJsYXlXaWxsT3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlXaWxsQ2xvc2UoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVyQmFja2Ryb3AoKSB7XG4gICAgICAgIGNvbnN0IHsgYmFja2Ryb3BDbGFzc05hbWUsIGJhY2tkcm9wUHJvcHMsIGhhc0JhY2tkcm9wLCBpc09wZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGlmIChoYXNCYWNrZHJvcCAmJiBpc09wZW4pIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICB7Li4uYmFja2Ryb3BQcm9wc31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuT1ZFUkxBWV9CQUNLRFJPUCwgYmFja2Ryb3BDbGFzc05hbWUsIGJhY2tkcm9wUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZURvd249e3RoaXMuaGFuZGxlQmFja2Ryb3BNb3VzZURvd259XG4gICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXt0aGlzLnByb3BzLmNhbk91dHNpZGVDbGlja0Nsb3NlID8gMCA6IG51bGx9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvdmVybGF5V2lsbENsb3NlKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5oYW5kbGVEb2N1bWVudEZvY3VzLCAvKiB1c2VDYXB0dXJlICovIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlRG9jdW1lbnRDbGljayk7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzZXMuT1ZFUkxBWV9PUEVOKTtcblxuICAgICAgICBjb25zdCB7IG9wZW5TdGFjayB9ID0gT3ZlcmxheTtcbiAgICAgICAgY29uc3QgaWR4ID0gb3BlblN0YWNrLmluZGV4T2YodGhpcyk7XG4gICAgICAgIGlmIChpZHggPiAwKSB7XG4gICAgICAgICAgICBvcGVuU3RhY2suc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICBjb25zdCBsYXN0T3BlbmVkT3ZlcmxheSA9IE92ZXJsYXkuZ2V0TGFzdE9wZW5lZCgpO1xuICAgICAgICAgICAgaWYgKG9wZW5TdGFjay5sZW5ndGggPiAwICYmIGxhc3RPcGVuZWRPdmVybGF5LnByb3BzLmVuZm9yY2VGb2N1cykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBsYXN0T3BlbmVkT3ZlcmxheS5oYW5kbGVEb2N1bWVudEZvY3VzLCAvKiB1c2VDYXB0dXJlICovIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvdmVybGF5V2lsbE9wZW4oKSB7XG4gICAgICAgIGNvbnN0IHsgb3BlblN0YWNrIH0gPSBPdmVybGF5O1xuICAgICAgICBpZiAob3BlblN0YWNrLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBPdmVybGF5LmdldExhc3RPcGVuZWQoKS5oYW5kbGVEb2N1bWVudEZvY3VzLCAvKiB1c2VDYXB0dXJlICovIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIG9wZW5TdGFjay5wdXNoKHRoaXMpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhbk91dHNpZGVDbGlja0Nsb3NlICYmICF0aGlzLnByb3BzLmhhc0JhY2tkcm9wKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuaGFuZGxlRG9jdW1lbnRDbGljayk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZW5mb3JjZUZvY3VzKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5oYW5kbGVEb2N1bWVudEZvY3VzLCAvKiB1c2VDYXB0dXJlICovIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlubGluZSkge1xuICAgICAgICAgICAgc2FmZUludm9rZSh0aGlzLnByb3BzLmRpZE9wZW4pO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuYXV0b0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5icmluZ0ZvY3VzSW5zaWRlT3ZlcmxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuaGFzQmFja2Ryb3ApIHtcbiAgICAgICAgICAgIC8vIGFkZCBhIGNsYXNzIHRvIHRoZSBib2R5IHRvIHByZXZlbnQgc2Nyb2xsaW5nIG9mIGNvbnRlbnQgYmVsb3cgdGhlIG92ZXJsYXlcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChDbGFzc2VzLk9WRVJMQVlfT1BFTik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGJyaW5nRm9jdXNJbnNpZGVPdmVybGF5ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGNvbnRhaW5lckVsZW1lbnQgfSA9IHRoaXM7XG5cbiAgICAgICAgLy8gY29udGFpbmVyIHJlZiBtYXkgYmUgdW5kZWZpbmVkIGJldHdlZW4gY29tcG9uZW50IG1vdW50aW5nIGFuZCBQb3J0YWwgcmVuZGVyaW5nXG4gICAgICAgIC8vIGFjdGl2ZUVsZW1lbnQgbWF5IGJlIHVuZGVmaW5lZCBpbiBzb21lIHJhcmUgY2FzZXMgaW4gSUVcbiAgICAgICAgaWYgKGNvbnRhaW5lckVsZW1lbnQgPT0gbnVsbCB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IG51bGwgfHwgIXRoaXMucHJvcHMuaXNPcGVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc0ZvY3VzT3V0c2lkZU1vZGFsID0gIWNvbnRhaW5lckVsZW1lbnQuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG4gICAgICAgIGlmIChpc0ZvY3VzT3V0c2lkZU1vZGFsKSB7XG4gICAgICAgICAgICAvLyBlbGVtZW50IG1hcmtlZCBhdXRvZm9jdXMgaGFzIGhpZ2hlciBwcmlvcml0eSB0aGFuIHRoZSBvdGhlciBjbG93bnNcbiAgICAgICAgICAgIGNvbnN0IGF1dG9mb2N1c0VsZW1lbnQgPSBjb250YWluZXJFbGVtZW50LnF1ZXJ5KFwiW2F1dG9mb2N1c11cIikgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyRWxlbWVudCA9IGNvbnRhaW5lckVsZW1lbnQucXVlcnkoXCJbdGFiaW5kZXhdXCIpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgaWYgKGF1dG9mb2N1c0VsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGF1dG9mb2N1c0VsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAod3JhcHBlckVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHdyYXBwZXJFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUJhY2tkcm9wTW91c2VEb3duID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmNhbk91dHNpZGVDbGlja0Nsb3NlKSB7XG4gICAgICAgICAgICBzYWZlSW52b2tlKHRoaXMucHJvcHMub25DbG9zZSwgZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2FmZUludm9rZSh0aGlzLnByb3BzLmJhY2tkcm9wUHJvcHMub25Nb3VzZURvd24sIGUpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRG9jdW1lbnRDbGljayA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaXNPcGVuLCBvbkNsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBldmVudFRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBpc0NsaWNrSW5PdmVybGF5ID0gdGhpcy5jb250YWluZXJFbGVtZW50ICE9IG51bGxcbiAgICAgICAgICAgICYmIHRoaXMuY29udGFpbmVyRWxlbWVudC5jb250YWlucyhldmVudFRhcmdldCk7XG4gICAgICAgIGlmIChpc09wZW4gJiYgdGhpcy5wcm9wcy5jYW5PdXRzaWRlQ2xpY2tDbG9zZSAmJiAhaXNDbGlja0luT3ZlcmxheSkge1xuICAgICAgICAgICAgLy8gY2FzdGluZyB0byBhbnkgYmVjYXVzZSB0aGlzIGlzIGEgbmF0aXZlIGV2ZW50XG4gICAgICAgICAgICBzYWZlSW52b2tlKG9uQ2xvc2UsIGUgYXMgYW55KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ29udGVudE1vdW50ID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc09wZW4pIHtcbiAgICAgICAgICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5kaWRPcGVuKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy5hdXRvRm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuYnJpbmdGb2N1c0luc2lkZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRG9jdW1lbnRGb2N1cyA9IChlOiBGb2N1c0V2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVuZm9yY2VGb2N1c1xuICAgICAgICAgICAgICAgICYmIHRoaXMuY29udGFpbmVyRWxlbWVudCAhPSBudWxsXG4gICAgICAgICAgICAgICAgJiYgIXRoaXMuY29udGFpbmVyRWxlbWVudC5jb250YWlucyhlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkpIHtcbiAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmJyaW5nRm9jdXNJbnNpZGVPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZUtleURvd24gPSAoZTogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgY29uc3QgeyBjYW5Fc2NhcGVLZXlDbG9zZSwgb25DbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IEtleXMuRVNDQVBFICYmIGNhbkVzY2FwZUtleUNsb3NlKSB7XG4gICAgICAgICAgICBzYWZlSW52b2tlKG9uQ2xvc2UsIGUpO1xuICAgICAgICAgICAgLy8gcHJldmVudCBicm93c2VyLXNwZWNpZmljIGVzY2FwZSBrZXkgYmVoYXZpb3IgKFNhZmFyaSBleGl0cyBmdWxsc2NyZWVuKVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgT3ZlcmxheUZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KE92ZXJsYXkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
