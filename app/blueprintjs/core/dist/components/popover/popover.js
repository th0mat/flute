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
var react_dom_1 = require("react-dom");
var Tether = require("tether");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var PosUtils = require("../../common/position");
var TetherUtils = require("../../common/tetherUtils");
var Utils = require("../../common/utils");
var overlay_1 = require("../overlay/overlay");
var tooltip_1 = require("../tooltip/tooltip");
var Arrows = require("./arrows");
var SVG_SHADOW_PATH = "M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378" +
    "-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z";
var SVG_ARROW_PATH = "M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005" +
    "c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z";
(function (PopoverInteractionKind) {
    PopoverInteractionKind[PopoverInteractionKind["CLICK"] = 0] = "CLICK";
    PopoverInteractionKind[PopoverInteractionKind["CLICK_TARGET_ONLY"] = 1] = "CLICK_TARGET_ONLY";
    PopoverInteractionKind[PopoverInteractionKind["HOVER"] = 2] = "HOVER";
    PopoverInteractionKind[PopoverInteractionKind["HOVER_TARGET_ONLY"] = 3] = "HOVER_TARGET_ONLY";
})(exports.PopoverInteractionKind || (exports.PopoverInteractionKind = {}));
var PopoverInteractionKind = exports.PopoverInteractionKind;
var Popover = (function (_super) {
    __extends(Popover, _super);
    function Popover(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.displayName = "Blueprint.Popover";
        this.hasDarkParent = false;
        // a flag that is set to true while we are waiting for the underlying Portal to complete rendering
        this.isContentMounting = false;
        this.refHandlers = {
            popover: function (ref) {
                _this.popoverElement = ref;
                _this.updateTether();
                _this.updateArrowPosition();
            },
            target: function (ref) {
                _this.targetElement = ref;
            },
        };
        this.handleContentMount = function () {
            if (Utils.isFunction(_this.props.popoverDidOpen) && _this.isContentMounting) {
                _this.props.popoverDidOpen();
                _this.isContentMounting = false;
            }
        };
        this.handleMouseEnter = function (e) {
            // if we're entering the popover, and the mode is set to be HOVER_TARGET_ONLY, we want to manually
            // trigger the mouse leave event, as hovering over the popover shouldn't count.
            if (_this.props.inline
                && _this.isElementInPopover(e.target)
                && _this.props.interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY) {
                _this.handleMouseLeave(e);
            }
            else if (!_this.props.isDisabled) {
                // only begin opening popover when it is enabled
                _this.setOpenState(true, e, _this.props.hoverOpenDelay);
            }
        };
        this.handleMouseLeave = function (e) {
            // user-configurable closing delay is helpful when moving mouse from target to popover
            _this.setOpenState(false, e, _this.props.hoverCloseDelay);
        };
        this.handlePopoverClick = function (e) {
            var eventTarget = e.target;
            var shouldDismiss = eventTarget.closest("." + Classes.POPOVER_DISMISS) != null;
            var overrideDismiss = eventTarget.closest("." + Classes.POPOVER_DISMISS_OVERRIDE) != null;
            if (shouldDismiss && !overrideDismiss) {
                _this.setOpenState(false, e);
            }
        };
        this.handleOverlayClose = function (e) {
            var eventTarget = e.target;
            // if click was in target, target event listener will handle things, so don't close
            if (!Utils.elementIsOrContains(_this.targetElement, eventTarget)
                || e.nativeEvent instanceof KeyboardEvent) {
                _this.setOpenState(false, e);
            }
        };
        this.handleTargetClick = function (e) {
            // ensure click did not originate from within inline popover before closing
            if (!_this.props.isDisabled && !_this.isElementInPopover(e.target)) {
                if (_this.props.isOpen == null) {
                    _this.setState(function (prevState) { return ({ isOpen: !prevState.isOpen }); });
                }
                else {
                    _this.setOpenState(!_this.props.isOpen, e);
                }
            }
        };
        var isOpen = props.defaultIsOpen;
        if (props.isOpen != null) {
            isOpen = props.isOpen;
        }
        this.state = {
            isOpen: isOpen,
            ignoreTargetDimensions: false,
            targetHeight: 0,
            targetWidth: 0,
        };
    }
    Popover.prototype.render = function () {
        var _a = this.props, className = _a.className, interactionKind = _a.interactionKind;
        var targetProps;
        if (interactionKind === PopoverInteractionKind.HOVER
            || interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY) {
            targetProps = {
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
            };
        }
        else {
            targetProps = {
                onClick: this.handleTargetClick,
            };
        }
        targetProps.className = classNames(Classes.POPOVER_TARGET, (_b = {},
            _b[Classes.POPOVER_OPEN] = this.state.isOpen,
            _b
        ), className);
        targetProps.ref = this.refHandlers.target;
        var children = this.props.children;
        if (typeof this.props.children === "string") {
            // wrap text in a <span> so that we have a consistent way to interact with the target node(s)
            children = React.DOM.span({}, this.props.children);
        }
        else {
            var child = React.Children.only(this.props.children);
            // force disable single Tooltip child when popover is open (BLUEPRINT-552)
            if (this.state.isOpen && child.type === tooltip_1.Tooltip) {
                children = React.cloneElement(child, { isDisabled: true });
            }
        }
        return React.createElement(this.props.rootElementTag, targetProps, children, React.createElement(overlay_1.Overlay, {autoFocus: this.props.autoFocus, backdropClassName: Classes.POPOVER_BACKDROP, backdropProps: this.props.backdropProps, canEscapeKeyClose: this.props.canEscapeKeyClose, canOutsideClickClose: this.props.interactionKind === PopoverInteractionKind.CLICK, className: this.props.portalClassName, didOpen: this.handleContentMount, enforceFocus: this.props.enforceFocus, hasBackdrop: this.props.isModal, inline: this.props.inline, isOpen: this.state.isOpen, lazy: this.props.lazy, onClose: this.handleOverlayClose, transitionDuration: this.props.transitionDuration, transitionName: Classes.POPOVER}, this.renderPopover()));
        var _b;
    };
    Popover.prototype.componentDidMount = function () {
        this.componentDOMChange();
    };
    Popover.prototype.componentWillReceiveProps = function (nextProps) {
        _super.prototype.componentWillReceiveProps.call(this, nextProps);
        if (nextProps.isDisabled && !this.props.isDisabled) {
            // ok to use setOpenState here because isDisabled and isOpen are mutex.
            this.setOpenState(false);
        }
        else if (nextProps.isOpen !== this.props.isOpen) {
            // propagate isOpen prop directly to state, circumventing onInteraction callback
            // (which would be invoked if this went through setOpenState)
            this.setState({ isOpen: nextProps.isOpen });
        }
    };
    Popover.prototype.componentWillUpdate = function (_, nextState) {
        if (!this.state.isOpen && nextState.isOpen) {
            this.isContentMounting = true;
            Utils.safeInvoke(this.props.popoverWillOpen);
        }
        else if (this.state.isOpen && !nextState.isOpen) {
            Utils.safeInvoke(this.props.popoverWillClose);
        }
    };
    Popover.prototype.componentDidUpdate = function () {
        this.componentDOMChange();
    };
    Popover.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.destroyTether();
    };
    Popover.prototype.validateProps = function (props) {
        if (props.isOpen == null && props.onInteraction != null) {
            console.warn(Errors.POPOVER_UNCONTROLLED_ONINTERACTION);
        }
        if (props.isOpen != null && props.isDisabled) {
            throw new Error(Errors.POPOVER_CONTROLLED_DISABLED);
        }
        if (props.isModal && props.interactionKind !== PopoverInteractionKind.CLICK) {
            throw new Error(Errors.POPOVER_MODAL_INTERACTION);
        }
        if (props.isModal && props.inline) {
            throw new Error(Errors.POPOVER_MODAL_INLINE);
        }
        if (props.useSmartPositioning && props.inline) {
            throw new Error(Errors.POPOVER_SMART_POSITIONING_INLINE);
        }
        if (typeof props.children !== "string") {
            try {
                React.Children.only(props.children);
            }
            catch (e) {
                throw new Error(Errors.POPOVER_ONE_CHILD);
            }
        }
    };
    Popover.prototype.componentDOMChange = function () {
        this.setState({
            targetHeight: this.targetElement.clientHeight,
            targetWidth: this.targetElement.clientWidth,
        });
        if (!this.props.inline) {
            this.hasDarkParent = this.targetElement.closest("." + Classes.DARK) != null;
            this.updateTether();
        }
    };
    Popover.prototype.renderPopover = function () {
        var _a = this.props, inline = _a.inline, interactionKind = _a.interactionKind;
        var popoverHandlers = {
            // always check popover clicks for dismiss class
            onClick: this.handlePopoverClick,
        };
        if ((interactionKind === PopoverInteractionKind.HOVER)
            || (inline && interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY)) {
            popoverHandlers.onMouseEnter = this.handleMouseEnter;
            popoverHandlers.onMouseLeave = this.handleMouseLeave;
        }
        var positionClasses = TetherUtils.getAttachmentClasses(this.props.position).join(" ");
        var containerClasses = classNames(Classes.TRANSITION_CONTAINER, (_b = {}, _b[positionClasses] = inline, _b));
        var popoverClasses = classNames(Classes.POPOVER, (_c = {},
            _c[Classes.DARK] = this.props.inheritDarkTheme && this.hasDarkParent && !inline,
            _c
        ), this.props.popoverClassName);
        var styles = this.getArrowPositionStyles();
        var transform = { transformOrigin: this.getPopoverTransformOrigin() };
        return (React.createElement("div", {className: containerClasses, ref: this.refHandlers.popover, style: styles.container}, 
            React.createElement("div", __assign({className: popoverClasses, style: transform}, popoverHandlers), 
                React.createElement("div", {className: Classes.POPOVER_ARROW, style: styles.arrow}, 
                    React.createElement("svg", {viewBox: "0 0 30 30"}, 
                        React.createElement("path", {className: Classes.POPOVER_ARROW + "-border", d: SVG_SHADOW_PATH}), 
                        React.createElement("path", {className: Classes.POPOVER_ARROW + "-fill", d: SVG_ARROW_PATH}))
                ), 
                React.createElement("div", {className: Classes.POPOVER_CONTENT}, this.props.content))
        ));
        var _b, _c;
    };
    Popover.prototype.getArrowPositionStyles = function () {
        if (this.props.useSmartArrowPositioning) {
            var dimensions = { height: this.state.targetHeight, width: this.state.targetWidth };
            return Arrows.getArrowPositionStyles(this.props.position, this.props.arrowSize, this.state.ignoreTargetDimensions, dimensions, this.props.inline);
        }
        else {
            return {};
        }
    };
    Popover.prototype.getPopoverTransformOrigin = function () {
        // if smart positioning is enabled then we must rely CSS classes to put transform origin
        // on the correct side and cannot override it in JS. (https://github.com/HubSpot/tether/issues/154)
        if (this.props.useSmartArrowPositioning && !this.props.useSmartPositioning) {
            var dimensions = { height: this.state.targetHeight, width: this.state.targetWidth };
            return Arrows.getPopoverTransformOrigin(this.props.position, this.props.arrowSize, dimensions);
        }
        else {
            return undefined;
        }
    };
    Popover.prototype.updateArrowPosition = function () {
        if (this.popoverElement != null) {
            var arrow = this.popoverElement.getElementsByClassName(Classes.POPOVER_ARROW)[0];
            var centerWidth = (this.state.targetWidth + arrow.clientWidth) / 2;
            var centerHeight = (this.state.targetHeight + arrow.clientHeight) / 2;
            var ignoreWidth = centerWidth > this.popoverElement.clientWidth
                && PosUtils.isPositionHorizontal(this.props.position);
            var ignoreHeight = centerHeight > this.popoverElement.clientHeight
                && PosUtils.isPositionVertical(this.props.position);
            if (!this.state.ignoreTargetDimensions && (ignoreWidth || ignoreHeight)) {
                this.setState({ ignoreTargetDimensions: true });
            }
            else if (this.state.ignoreTargetDimensions && !ignoreWidth && !ignoreHeight) {
                this.setState({ ignoreTargetDimensions: false });
            }
        }
    };
    Popover.prototype.updateTether = function () {
        var _this = this;
        if (this.state.isOpen && !this.props.inline && this.popoverElement != null) {
            // the .pt-popover-target span we wrap the children in won't always be as big as its children
            // so instead, we'll position tether based off of its first child.
            // NOTE: use findDOMNode(this) directly because this.targetElement may not exist yet
            var target = react_dom_1.findDOMNode(this).childNodes[0];
            var tetherOptions = TetherUtils.createTetherOptions(this.popoverElement, target, this.props.position, this.props.useSmartPositioning, this.props.constraints);
            if (this.tether == null) {
                this.tether = new Tether(tetherOptions);
            }
            else {
                this.tether.setOptions(tetherOptions);
            }
            // if props.position has just changed, Tether unfortunately positions the popover based
            // on the margins from the previous position. delay a frame for styles to catch up.
            setTimeout(function () { return _this.tether.position(); });
        }
        else {
            this.destroyTether();
        }
    };
    Popover.prototype.destroyTether = function () {
        if (this.tether != null) {
            this.tether.destroy();
        }
    };
    // a wrapper around setState({isOpen}) that will call props.onInteraction instead when in controlled mode.
    // starts a timeout to delay changing the state if a non-zero duration is provided.
    Popover.prototype.setOpenState = function (isOpen, e, timeout) {
        var _this = this;
        // cancel any existing timeout because we have new state
        Utils.safeInvoke(this.cancelOpenTimeout);
        if (timeout > 0) {
            this.cancelOpenTimeout = this.setTimeout(function () { return _this.setOpenState(isOpen, e); }, timeout);
        }
        else {
            if (this.props.isOpen == null) {
                this.setState({ isOpen: isOpen });
            }
            else {
                Utils.safeInvoke(this.props.onInteraction, isOpen);
            }
            if (!isOpen) {
                Utils.safeInvoke(this.props.onClose, e);
            }
        }
    };
    Popover.prototype.isElementInPopover = function (element) {
        return this.popoverElement != null && this.popoverElement.contains(element);
    };
    Popover.defaultProps = {
        arrowSize: 30,
        className: "",
        content: React.createElement("span", null),
        defaultIsOpen: false,
        hoverCloseDelay: 300,
        hoverOpenDelay: 150,
        inheritDarkTheme: true,
        inline: false,
        interactionKind: PopoverInteractionKind.CLICK,
        isDisabled: false,
        isModal: false,
        popoverClassName: "",
        position: PosUtils.Position.RIGHT,
        rootElementTag: "span",
        transitionDuration: 300,
        useSmartArrowPositioning: true,
        useSmartPositioning: false,
    };
    Popover = __decorate([
        PureRender
    ], Popover);
    return Popover;
}(abstractComponent_1.AbstractComponent));
exports.Popover = Popover;
exports.PopoverFactory = React.createFactory(Popover);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksVUFBVSxXQUFNLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsSUFBWSxLQUFLLFdBQU0sT0FBTyxDQUFDLENBQUE7QUFDL0IsMEJBQTRCLFdBQVcsQ0FBQyxDQUFBO0FBQ3hDLElBQVksTUFBTSxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRWpDLGtDQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsSUFBWSxNQUFNLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUM5QyxJQUFZLFFBQVEsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBRWxELElBQVksV0FBVyxXQUFNLDBCQUEwQixDQUFDLENBQUE7QUFDeEQsSUFBWSxLQUFLLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUM1Qyx3QkFBMkMsb0JBQW9CLENBQUMsQ0FBQTtBQUNoRSx3QkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUU3QyxJQUFZLE1BQU0sV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUVuQyxJQUFNLGVBQWUsR0FBRywyREFBMkQ7SUFDL0UsK0VBQStFLENBQUM7QUFDcEYsSUFBTSxjQUFjLEdBQUcseURBQXlEO0lBQzVFLGlGQUFpRixDQUFDO0FBRXRGLFdBQVksc0JBQXNCO0lBQzlCLHFFQUFLLENBQUE7SUFDTCw2RkFBaUIsQ0FBQTtJQUNqQixxRUFBSyxDQUFBO0lBQ0wsNkZBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUxXLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFLakM7QUFMRCxJQUFZLHNCQUFzQixHQUF0Qiw4QkFLWCxDQUFBO0FBdUpEO0lBQTZCLDJCQUErQztJQTBDeEUsaUJBQW1CLEtB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QUUsSUFBSTtRQUM5QixtQkFBbUIsRUFBRSxLQUFLO0tBQzdCLENBQUM7SUFwQk47UUFBQyxVQUFVO2VBQUE7SUF1WFgsY0FBQztBQUFELENBdFhBLEFBc1hDLENBdFg0QixxQ0FBaUIsR0FzWDdDO0FBdFhZLGVBQU8sVUFzWG5CLENBQUE7QUFFWSxzQkFBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMiLCJmaWxlIjoiY29tcG9uZW50cy9wb3BvdmVyL3BvcG92ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTUgUGFsYW50aXIgVGVjaG5vbG9naWVzLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQlNELTMgTGljZW5zZSBhcyBtb2RpZmllZCAodGhlIOKAnExpY2Vuc2XigJ0pOyB5b3UgbWF5IG9idGFpbiBhIGNvcHlcbiAqIG9mIHRoZSBsaWNlbnNlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICogYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9wYWxhbnRpci9ibHVlcHJpbnQvYmxvYi9tYXN0ZXIvUEFURU5UU1xuICovXG5cbmltcG9ydCAqIGFzIGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCAqIGFzIFB1cmVSZW5kZXIgZnJvbSBcInB1cmUtcmVuZGVyLWRlY29yYXRvclwiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCAqIGFzIFRldGhlciBmcm9tIFwidGV0aGVyXCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vLi4vY29tbW9uL2Vycm9yc1wiO1xuaW1wb3J0ICogYXMgUG9zVXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi9wb3NpdGlvblwiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0ICogYXMgVGV0aGVyVXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi90ZXRoZXJVdGlsc1wiO1xuaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuaW1wb3J0IHsgSU92ZXJsYXlhYmxlUHJvcHMsIE92ZXJsYXkgfSBmcm9tIFwiLi4vb3ZlcmxheS9vdmVybGF5XCI7XG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSBcIi4uL3Rvb2x0aXAvdG9vbHRpcFwiO1xuXG5pbXBvcnQgKiBhcyBBcnJvd3MgZnJvbSBcIi4vYXJyb3dzXCI7XG5cbmNvbnN0IFNWR19TSEFET1dfUEFUSCA9IFwiTTguMTEgNi4zMDJjMS4wMTUtLjkzNiAxLjg4Ny0yLjkyMiAxLjg4Ny00LjI5N3YyNmMwLTEuMzc4XCIgK1xuICAgIFwiLS44NjgtMy4zNTctMS44ODgtNC4yOTdMLjkyNSAxNy4wOWMtMS4yMzctMS4xNC0xLjIzMy0zLjAzNCAwLTQuMTdMOC4xMSA2LjMwMnpcIjtcbmNvbnN0IFNWR19BUlJPV19QQVRIID0gXCJNOC43ODcgNy4wMzZjMS4yMi0xLjEyNSAyLjIxLTMuMzc2IDIuMjEtNS4wM1YwdjMwLTIuMDA1XCIgK1xuICAgIFwiYzAtMS42NTQtLjk4My0zLjktMi4yMS01LjAzbC03LjE4My02LjYxNmMtLjgxLS43NDYtLjgwMi0xLjk2IDAtMi43bDcuMTgzLTYuNjE0elwiO1xuXG5leHBvcnQgZW51bSBQb3BvdmVySW50ZXJhY3Rpb25LaW5kIHtcbiAgICBDTElDSyxcbiAgICBDTElDS19UQVJHRVRfT05MWSxcbiAgICBIT1ZFUixcbiAgICBIT1ZFUl9UQVJHRVRfT05MWSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUG9wb3ZlclByb3BzIGV4dGVuZHMgSU92ZXJsYXlhYmxlUHJvcHMsIElQcm9wcyB7XG4gICAgLyoqIEhUTUwgcHJvcHMgZm9yIHRoZSBiYWNrZHJvcCBlbGVtZW50LiBDYW4gYmUgY29tYmluZWQgd2l0aCBgYmFja2Ryb3BDbGFzc05hbWVgLiAqL1xuICAgIGJhY2tkcm9wUHJvcHM/OiBSZWFjdC5IVE1MUHJvcHM8SFRNTERpdkVsZW1lbnQ+O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGNvbnRlbnQgZGlzcGxheWVkIGluc2lkZSB0aGUgcG9wb3Zlci5cbiAgICAgKi9cbiAgICBjb250ZW50PzogSlNYLkVsZW1lbnQgfCBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbGVuZ3RoIG9mIGEgc2lkZSBvZiB0aGUgc3F1YXJlIHVzZWQgdG8gcmVuZGVyIHRoZSBhcnJvdy5cbiAgICAgKiBAZGVmYXVsdCAzMFxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIGFycm93U2l6ZT86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cmFpbnRzIGZvciB0aGUgdW5kZXJseWluZyBUZXRoZXIgaW5zdGFuY2UuXG4gICAgICogU2VlIGh0dHA6Ly90ZXRoZXIuaW8vI2NvbnN0cmFpbnRzLlxuICAgICAqL1xuICAgIGNvbnN0cmFpbnRzPzogVGV0aGVyVXRpbHMuSVRldGhlckNvbnN0cmFpbnRbXTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWwgb3BlbmVkIHN0YXRlIHdoZW4gdW5jb250cm9sbGVkLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZGVmYXVsdElzT3Blbj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgYW1vdW50IG9mIHRpbWUgaW4gbWlsbGlzZWNvbmRzIHRoZSBwb3BvdmVyIHNob3VsZCByZW1haW4gb3BlbiBhZnRlciB0aGVcbiAgICAgKiB1c2VyIGhvdmVycyBvZmYgdGhlIHRyaWdnZXIuIFRoZSB0aW1lciBpcyBjYW5jZWxlZCBpZiB0aGUgdXNlciBtb3VzZXMgb3ZlciB0aGVcbiAgICAgKiB0YXJnZXQgYmVmb3JlIGl0IGV4cGlyZXMuIFRoaXMgb3B0aW9uIG9ubHkgYXBwbGllcyB3aGVuIGBpbnRlcmFjdGlvbktpbmRgIGlzIGBIT1ZFUmAgb3JcbiAgICAgKiBgSE9WRVJfVEFSR0VUX09OTFlgLlxuICAgICAqIEBkZWZhdWx0IDMwMFxuICAgICAqL1xuICAgIGhvdmVyQ2xvc2VEZWxheT86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBhbW91bnQgb2YgdGltZSBpbiBtaWxsaXNlY29uZHMgdGhlIHBvcG92ZXIgc2hvdWxkIHdhaXQgYmVmb3JlIG9wZW5pbmcgYWZ0ZXIgdGhlIHRoZVxuICAgICAqIHVzZXIgaG92ZXJzIG92ZXIgdGhlIHRyaWdnZXIuIFRoZSB0aW1lciBpcyBjYW5jZWxlZCBpZiB0aGUgdXNlciBtb3VzZXMgYXdheSBmcm9tIHRoZVxuICAgICAqIHRhcmdldCBiZWZvcmUgaXQgZXhwaXJlcy4gVGhpcyBvcHRpb24gb25seSBhcHBsaWVzIHdoZW4gYGludGVyYWN0aW9uS2luZGAgaXMgYEhPVkVSYCBvclxuICAgICAqIGBIT1ZFUl9UQVJHRVRfT05MWWAuXG4gICAgICogQGRlZmF1bHQgMTUwXG4gICAgICovXG4gICAgaG92ZXJPcGVuRGVsYXk/OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgbm9uLWlubGluZSBwb3BvdmVyIHNob3VsZCBhdXRvbWF0aWNhbGx5IGluaGVyaXQgdGhlIGRhcmsgdGhlbWUgZnJvbSBpdHMgcGFyZW50LlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBpbmhlcml0RGFya1RoZW1lPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBraW5kIG9mIGludGVyYWN0aW9uIHRoYXQgdHJpZ2dlcnMgdGhlIGRpc3BsYXkgb2YgdGhlIHBvcG92ZXIuXG4gICAgICogQGRlZmF1bHQgUG9wb3ZlckludGVyYWN0aW9uS2luZC5DTElDS1xuICAgICAqL1xuICAgIGludGVyYWN0aW9uS2luZD86IFBvcG92ZXJJbnRlcmFjdGlvbktpbmQ7XG5cbiAgICAvKipcbiAgICAgKiBQcmV2ZW50cyB0aGUgcG9wb3ZlciBmcm9tIGFwcGVhcmluZyB3aGVuIGB0cnVlYC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGlzRGlzYWJsZWQ/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBhbiBpbnZpc2libGUgb3ZlcmxheSBiZW5lYXRoIHRoZSBwb3BvdmVyIHRoYXQgY2FwdHVyZXMgY2xpY2tzIGFuZCBwcmV2ZW50c1xuICAgICAqIGludGVyYWN0aW9uIHdpdGggdGhlIHJlc3Qgb2YgdGhlIGRvY3VtZW50IHVudGlsIHRoZSBwb3BvdmVyIGlzIGNsb3NlZC5cbiAgICAgKiBUaGlzIHByb3AgaXMgb25seSBhdmFpbGFibGUgd2hlbiBgaW50ZXJhY3Rpb25LaW5kYCBpcyBgUG9wb3ZlckludGVyYWN0aW9uS2luZC5DTElDS2AuXG4gICAgICogV2hlbiBtb2RhbCBwb3BvdmVycyBhcmUgb3BlbmVkLCB0aGV5IGJlY29tZSBmb2N1c2VkLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgaXNNb2RhbD86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBwb3BvdmVyIGlzIHZpc2libGUuIFBhc3NpbmcgdGhpcyBwcm9wIHB1dHMgdGhlIHBvcG92ZXIgaW5cbiAgICAgKiBjb250cm9sbGVkIG1vZGUsIHdoZXJlIHRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdmlzaWJpbGl0eSBpcyBieSB1cGRhdGluZyB0aGlzIHByb3BlcnR5LlxuICAgICAqIEBkZWZhdWx0IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIGlzT3Blbj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayBpbnZva2VkIGluIGNvbnRyb2xsZWQgbW9kZSB3aGVuIHRoZSBwb3BvdmVyIG9wZW4gc3RhdGUgKndvdWxkKiBjaGFuZ2UgZHVlIHRvXG4gICAgICogdXNlciBpbnRlcmFjdGlvbiBiYXNlZCBvbiB0aGUgdmFsdWUgb2YgYGludGVyYWN0aW9uS2luZGAuXG4gICAgICovXG4gICAgb25JbnRlcmFjdGlvbj86IChuZXh0T3BlblN0YXRlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQSBzcGFjZS1kZWxpbWl0ZWQgc3RyaW5nIG9mIGNsYXNzIG5hbWVzIHRoYXQgYXJlIGFwcGxpZWQgdG8gdGhlIHBvcG92ZXIgKGJ1dCBub3QgdGhlIHRhcmdldCkuXG4gICAgICovXG4gICAgcG9wb3ZlckNsYXNzTmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiB0aGUgcG9wb3ZlciBvcGVucyBhZnRlciBpdCBpcyBhZGRlZCB0byB0aGUgRE9NLlxuICAgICAqL1xuICAgIHBvcG92ZXJEaWRPcGVuPzogKCkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiBhIHBvcG92ZXIgYmVnaW5zIHRvIGNsb3NlLlxuICAgICAqL1xuICAgIHBvcG92ZXJXaWxsQ2xvc2U/OiAoKSA9PiB2b2lkO1xuXG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCBiZWZvcmUgdGhlIHBvcG92ZXIgb3BlbnMuXG4gICAgICovXG4gICAgcG9wb3ZlcldpbGxPcGVuPzogKCkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIFNwYWNlLWRlbGltaXRlZCBzdHJpbmcgb2YgY2xhc3MgbmFtZXMgYXBwbGllZCB0byB0aGVcbiAgICAgKiBwb3J0YWwgdGhhdCBob2xkcyB0aGUgcG9wb3ZlciBpZiBgaW5saW5lID0gZmFsc2VgLlxuICAgICAqL1xuICAgIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFRoZSBwb3NpdGlvbiAocmVsYXRpdmUgdG8gdGhlIHRhcmdldCkgYXQgd2hpY2ggdGhlIHBvcG92ZXIgc2hvdWxkIGFwcGVhci5cbiAgICAgKiBAZGVmYXVsdCBCbHVlcHJpbnQuQ29tbW9uLlBvc2l0aW9uLlJJR0hUXG4gICAgICovXG4gICAgcG9zaXRpb24/OiBQb3NVdGlscy5Qb3NpdGlvbjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBIVE1MIHRhZyB0byB1c2Ugd2hlbiByZW5kZXJpbmcgdGhlIHBvcG92ZXIgdGFyZ2V0IHdyYXBwZXIgZWxlbWVudCAoYC5wdC1wb3BvdmVyLXRhcmdldGApLlxuICAgICAqIEBkZWZhdWx0IFwic3BhblwiXG4gICAgICovXG4gICAgcm9vdEVsZW1lbnRUYWc/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBhcnJvdydzIG9mZnNldCBzaG91bGQgYmUgY29tcHV0ZWQgc3VjaCB0aGF0IGl0IGFsd2F5cyBwb2ludHMgYXQgdGhlIGNlbnRlclxuICAgICAqIG9mIHRoZSB0YXJnZXQuIElmIGZhbHNlLCBhcnJvdyBwb3NpdGlvbiBpcyBoYXJkY29kZWQgdmlhIENTUywgd2hpY2ggZXhwZWN0cyBhIDMwcHggdGFyZ2V0LlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICB1c2VTbWFydEFycm93UG9zaXRpb25pbmc/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgcG9wb3ZlciB3aWxsIHRyeSB0byByZXBvc2l0aW9uIGl0c2VsZlxuICAgICAqIGlmIHRoZXJlIGlzbid0IHJvb20gZm9yIGl0IGluIGl0cyBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAqIFRoZSBwb3BvdmVyIHdpbGwgdHJ5IHRvIGZsaXAgdG8gdGhlIG9wcG9zaXRlIHNpZGUgb2YgdGhlIHRhcmdldCBlbGVtZW50IGJ1dFxuICAgICAqIHdpbGwgbm90IG1vdmUgdG8gYW4gYWRqYWNlbnQgc2lkZS5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIHVzZVNtYXJ0UG9zaXRpb25pbmc/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQb3BvdmVyU3RhdGUge1xuICAgIGlzT3Blbj86IGJvb2xlYW47XG4gICAgaWdub3JlVGFyZ2V0RGltZW5zaW9ucz86IGJvb2xlYW47XG4gICAgdGFyZ2V0SGVpZ2h0PzogbnVtYmVyO1xuICAgIHRhcmdldFdpZHRoPzogbnVtYmVyO1xufVxuXG5AUHVyZVJlbmRlclxuZXhwb3J0IGNsYXNzIFBvcG92ZXIgZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxJUG9wb3ZlclByb3BzLCBJUG9wb3ZlclN0YXRlPiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElQb3BvdmVyUHJvcHMgPSB7XG4gICAgICAgIGFycm93U2l6ZTogMzAsXG4gICAgICAgIGNsYXNzTmFtZTogXCJcIixcbiAgICAgICAgY29udGVudDogPHNwYW4vPixcbiAgICAgICAgZGVmYXVsdElzT3BlbjogZmFsc2UsXG4gICAgICAgIGhvdmVyQ2xvc2VEZWxheTogMzAwLFxuICAgICAgICBob3Zlck9wZW5EZWxheTogMTUwLFxuICAgICAgICBpbmhlcml0RGFya1RoZW1lOiB0cnVlLFxuICAgICAgICBpbmxpbmU6IGZhbHNlLFxuICAgICAgICBpbnRlcmFjdGlvbktpbmQ6IFBvcG92ZXJJbnRlcmFjdGlvbktpbmQuQ0xJQ0ssXG4gICAgICAgIGlzRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBpc01vZGFsOiBmYWxzZSxcbiAgICAgICAgcG9wb3ZlckNsYXNzTmFtZTogXCJcIixcbiAgICAgICAgcG9zaXRpb246IFBvc1V0aWxzLlBvc2l0aW9uLlJJR0hULFxuICAgICAgICByb290RWxlbWVudFRhZzogXCJzcGFuXCIsXG4gICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogMzAwLFxuICAgICAgICB1c2VTbWFydEFycm93UG9zaXRpb25pbmc6IHRydWUsXG4gICAgICAgIHVzZVNtYXJ0UG9zaXRpb25pbmc6IGZhbHNlLFxuICAgIH07XG5cbiAgICBwdWJsaWMgZGlzcGxheU5hbWUgPSBcIkJsdWVwcmludC5Qb3BvdmVyXCI7XG5cbiAgICBwcml2YXRlIGhhc0RhcmtQYXJlbnQgPSBmYWxzZTtcbiAgICAvLyBhIGZsYWcgdGhhdCBpcyBzZXQgdG8gdHJ1ZSB3aGlsZSB3ZSBhcmUgd2FpdGluZyBmb3IgdGhlIHVuZGVybHlpbmcgUG9ydGFsIHRvIGNvbXBsZXRlIHJlbmRlcmluZ1xuICAgIHByaXZhdGUgaXNDb250ZW50TW91bnRpbmcgPSBmYWxzZTtcbiAgICBwcml2YXRlIGNhbmNlbE9wZW5UaW1lb3V0OiAoKSA9PiB2b2lkO1xuICAgIHByaXZhdGUgcG9wb3ZlckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSB0ZXRoZXI6IFRldGhlcjtcblxuICAgIHByaXZhdGUgcmVmSGFuZGxlcnMgPSB7XG4gICAgICAgIHBvcG92ZXI6IChyZWY6IEhUTUxEaXZFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJFbGVtZW50ID0gcmVmO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVUZXRoZXIoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXJyb3dQb3NpdGlvbigpO1xuICAgICAgICB9LFxuICAgICAgICB0YXJnZXQ6IChyZWY6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldEVsZW1lbnQgPSByZWY7XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm9wcz86IElQb3BvdmVyUHJvcHMsIGNvbnRleHQ/OiBhbnkpIHtcbiAgICAgICAgc3VwZXIocHJvcHMsIGNvbnRleHQpO1xuXG4gICAgICAgIGxldCBpc09wZW4gPSBwcm9wcy5kZWZhdWx0SXNPcGVuO1xuICAgICAgICBpZiAocHJvcHMuaXNPcGVuICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlzT3BlbiA9IHByb3BzLmlzT3BlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBpc09wZW4sXG4gICAgICAgICAgICBpZ25vcmVUYXJnZXREaW1lbnNpb25zOiBmYWxzZSxcbiAgICAgICAgICAgIHRhcmdldEhlaWdodDogMCxcbiAgICAgICAgICAgIHRhcmdldFdpZHRoOiAwLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgY2xhc3NOYW1lLCBpbnRlcmFjdGlvbktpbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCB0YXJnZXRQcm9wczogUmVhY3QuSFRNTFByb3BzPEhUTUxFbGVtZW50PjtcbiAgICAgICAgaWYgKGludGVyYWN0aW9uS2luZCA9PT0gUG9wb3ZlckludGVyYWN0aW9uS2luZC5IT1ZFUlxuICAgICAgICAgICAgfHwgaW50ZXJhY3Rpb25LaW5kID09PSBQb3BvdmVySW50ZXJhY3Rpb25LaW5kLkhPVkVSX1RBUkdFVF9PTkxZKSB7XG4gICAgICAgICAgICB0YXJnZXRQcm9wcyA9IHtcbiAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI6IHRoaXMuaGFuZGxlTW91c2VFbnRlcixcbiAgICAgICAgICAgICAgICBvbk1vdXNlTGVhdmU6IHRoaXMuaGFuZGxlTW91c2VMZWF2ZSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIC8vIGFueSBvbmUgb2YgdGhlIENMSUNLKiB2YWx1ZXNcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFByb3BzID0ge1xuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlVGFyZ2V0Q2xpY2ssXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldFByb3BzLmNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5QT1BPVkVSX1RBUkdFVCwge1xuICAgICAgICAgICAgW0NsYXNzZXMuUE9QT1ZFUl9PUEVOXTogdGhpcy5zdGF0ZS5pc09wZW4sXG4gICAgICAgIH0sIGNsYXNzTmFtZSk7XG4gICAgICAgIHRhcmdldFByb3BzLnJlZiA9IHRoaXMucmVmSGFuZGxlcnMudGFyZ2V0O1xuXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5jaGlsZHJlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLy8gd3JhcCB0ZXh0IGluIGEgPHNwYW4+IHNvIHRoYXQgd2UgaGF2ZSBhIGNvbnNpc3RlbnQgd2F5IHRvIGludGVyYWN0IHdpdGggdGhlIHRhcmdldCBub2RlKHMpXG4gICAgICAgICAgICBjaGlsZHJlbiA9IFJlYWN0LkRPTS5zcGFuKHt9LCB0aGlzLnByb3BzLmNoaWxkcmVuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKSBhcyBSZWFjdC5SZWFjdEVsZW1lbnQ8YW55PjtcbiAgICAgICAgICAgIC8vIGZvcmNlIGRpc2FibGUgc2luZ2xlIFRvb2x0aXAgY2hpbGQgd2hlbiBwb3BvdmVyIGlzIG9wZW4gKEJMVUVQUklOVC01NTIpXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc09wZW4gJiYgY2hpbGQudHlwZSA9PT0gVG9vbHRpcCkge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7IGlzRGlzYWJsZWQ6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0aGlzLnByb3BzLnJvb3RFbGVtZW50VGFnLCB0YXJnZXRQcm9wcywgY2hpbGRyZW4sXG4gICAgICAgICAgICA8T3ZlcmxheVxuICAgICAgICAgICAgICAgIGF1dG9Gb2N1cz17dGhpcy5wcm9wcy5hdXRvRm9jdXN9XG4gICAgICAgICAgICAgICAgYmFja2Ryb3BDbGFzc05hbWU9e0NsYXNzZXMuUE9QT1ZFUl9CQUNLRFJPUH1cbiAgICAgICAgICAgICAgICBiYWNrZHJvcFByb3BzPXt0aGlzLnByb3BzLmJhY2tkcm9wUHJvcHN9XG4gICAgICAgICAgICAgICAgY2FuRXNjYXBlS2V5Q2xvc2U9e3RoaXMucHJvcHMuY2FuRXNjYXBlS2V5Q2xvc2V9XG4gICAgICAgICAgICAgICAgY2FuT3V0c2lkZUNsaWNrQ2xvc2U9e3RoaXMucHJvcHMuaW50ZXJhY3Rpb25LaW5kID09PSBQb3BvdmVySW50ZXJhY3Rpb25LaW5kLkNMSUNLfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5wb3J0YWxDbGFzc05hbWV9XG4gICAgICAgICAgICAgICAgZGlkT3Blbj17dGhpcy5oYW5kbGVDb250ZW50TW91bnR9XG4gICAgICAgICAgICAgICAgZW5mb3JjZUZvY3VzPXt0aGlzLnByb3BzLmVuZm9yY2VGb2N1c31cbiAgICAgICAgICAgICAgICBoYXNCYWNrZHJvcD17dGhpcy5wcm9wcy5pc01vZGFsfVxuICAgICAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLmlzT3Blbn1cbiAgICAgICAgICAgICAgICBsYXp5PXt0aGlzLnByb3BzLmxhenl9XG4gICAgICAgICAgICAgICAgb25DbG9zZT17dGhpcy5oYW5kbGVPdmVybGF5Q2xvc2V9XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uPXt0aGlzLnByb3BzLnRyYW5zaXRpb25EdXJhdGlvbn1cbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uTmFtZT17Q2xhc3Nlcy5QT1BPVkVSfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclBvcG92ZXIoKX1cbiAgICAgICAgICAgIDwvT3ZlcmxheT4sXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudERPTUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogSVBvcG92ZXJQcm9wcykge1xuICAgICAgICBzdXBlci5jb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcyk7XG5cbiAgICAgICAgaWYgKG5leHRQcm9wcy5pc0Rpc2FibGVkICYmICF0aGlzLnByb3BzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIG9rIHRvIHVzZSBzZXRPcGVuU3RhdGUgaGVyZSBiZWNhdXNlIGlzRGlzYWJsZWQgYW5kIGlzT3BlbiBhcmUgbXV0ZXguXG4gICAgICAgICAgICB0aGlzLnNldE9wZW5TdGF0ZShmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV4dFByb3BzLmlzT3BlbiAhPT0gdGhpcy5wcm9wcy5pc09wZW4pIHtcbiAgICAgICAgICAgIC8vIHByb3BhZ2F0ZSBpc09wZW4gcHJvcCBkaXJlY3RseSB0byBzdGF0ZSwgY2lyY3VtdmVudGluZyBvbkludGVyYWN0aW9uIGNhbGxiYWNrXG4gICAgICAgICAgICAvLyAod2hpY2ggd291bGQgYmUgaW52b2tlZCBpZiB0aGlzIHdlbnQgdGhyb3VnaCBzZXRPcGVuU3RhdGUpXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNPcGVuOiBuZXh0UHJvcHMuaXNPcGVufSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50V2lsbFVwZGF0ZShfOiBJUG9wb3ZlclByb3BzLCBuZXh0U3RhdGU6IElQb3BvdmVyU3RhdGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzT3BlbiAmJiBuZXh0U3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLmlzQ29udGVudE1vdW50aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIFV0aWxzLnNhZmVJbnZva2UodGhpcy5wcm9wcy5wb3BvdmVyV2lsbE9wZW4pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuaXNPcGVuICYmICFuZXh0U3RhdGUuaXNPcGVuKSB7XG4gICAgICAgICAgICBVdGlscy5zYWZlSW52b2tlKHRoaXMucHJvcHMucG9wb3ZlcldpbGxDbG9zZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgICAgICB0aGlzLmNvbXBvbmVudERPTUNoYW5nZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgc3VwZXIuY29tcG9uZW50V2lsbFVubW91bnQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95VGV0aGVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlUHJvcHMocHJvcHM6IElQb3BvdmVyUHJvcHMgJiB7Y2hpbGRyZW4/OiBSZWFjdC5SZWFjdE5vZGV9KSB7XG4gICAgICAgIGlmIChwcm9wcy5pc09wZW4gPT0gbnVsbCAmJiBwcm9wcy5vbkludGVyYWN0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihFcnJvcnMuUE9QT1ZFUl9VTkNPTlRST0xMRURfT05JTlRFUkFDVElPTik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJvcHMuaXNPcGVuICE9IG51bGwgJiYgcHJvcHMuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVycm9ycy5QT1BPVkVSX0NPTlRST0xMRURfRElTQUJMRUQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlzTW9kYWwgJiYgcHJvcHMuaW50ZXJhY3Rpb25LaW5kICE9PSBQb3BvdmVySW50ZXJhY3Rpb25LaW5kLkNMSUNLKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLlBPUE9WRVJfTU9EQUxfSU5URVJBQ1RJT04pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLmlzTW9kYWwgJiYgcHJvcHMuaW5saW5lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoRXJyb3JzLlBPUE9WRVJfTU9EQUxfSU5MSU5FKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcm9wcy51c2VTbWFydFBvc2l0aW9uaW5nICYmIHByb3BzLmlubGluZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKEVycm9ycy5QT1BPVkVSX1NNQVJUX1BPU0lUSU9OSU5HX0lOTElORSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHByb3BzLmNoaWxkcmVuICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIFJlYWN0LkNoaWxkcmVuLm9ubHkocHJvcHMuY2hpbGRyZW4pO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihFcnJvcnMuUE9QT1ZFUl9PTkVfQ0hJTEQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb21wb25lbnRET01DaGFuZ2UoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGFyZ2V0SGVpZ2h0OiB0aGlzLnRhcmdldEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgdGFyZ2V0V2lkdGg6IHRoaXMudGFyZ2V0RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbmxpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzRGFya1BhcmVudCA9IHRoaXMudGFyZ2V0RWxlbWVudC5jbG9zZXN0KGAuJHtDbGFzc2VzLkRBUkt9YCkgIT0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVGV0aGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlclBvcG92ZXIoKSB7XG4gICAgICAgIGNvbnN0IHsgaW5saW5lLCBpbnRlcmFjdGlvbktpbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGxldCBwb3BvdmVySGFuZGxlcnM6IFJlYWN0LkhUTUxBdHRyaWJ1dGVzPEhUTUxEaXZFbGVtZW50PiA9IHtcbiAgICAgICAgICAgIC8vIGFsd2F5cyBjaGVjayBwb3BvdmVyIGNsaWNrcyBmb3IgZGlzbWlzcyBjbGFzc1xuICAgICAgICAgICAgb25DbGljazogdGhpcy5oYW5kbGVQb3BvdmVyQ2xpY2ssXG4gICAgICAgIH07XG4gICAgICAgIGlmICgoaW50ZXJhY3Rpb25LaW5kID09PSBQb3BvdmVySW50ZXJhY3Rpb25LaW5kLkhPVkVSKVxuICAgICAgICAgICAgfHwgKGlubGluZSAmJiBpbnRlcmFjdGlvbktpbmQgPT09IFBvcG92ZXJJbnRlcmFjdGlvbktpbmQuSE9WRVJfVEFSR0VUX09OTFkpKSB7XG4gICAgICAgICAgICBwb3BvdmVySGFuZGxlcnMub25Nb3VzZUVudGVyID0gdGhpcy5oYW5kbGVNb3VzZUVudGVyO1xuICAgICAgICAgICAgcG9wb3ZlckhhbmRsZXJzLm9uTW91c2VMZWF2ZSA9IHRoaXMuaGFuZGxlTW91c2VMZWF2ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvc2l0aW9uQ2xhc3NlcyA9IFRldGhlclV0aWxzLmdldEF0dGFjaG1lbnRDbGFzc2VzKHRoaXMucHJvcHMucG9zaXRpb24pLmpvaW4oXCIgXCIpO1xuICAgICAgICBjb25zdCBjb250YWluZXJDbGFzc2VzID0gY2xhc3NOYW1lcyhDbGFzc2VzLlRSQU5TSVRJT05fQ09OVEFJTkVSLCB7IFtwb3NpdGlvbkNsYXNzZXNdOiBpbmxpbmUgfSk7XG4gICAgICAgIGNvbnN0IHBvcG92ZXJDbGFzc2VzID0gY2xhc3NOYW1lcyhDbGFzc2VzLlBPUE9WRVIsIHtcbiAgICAgICAgICAgIFtDbGFzc2VzLkRBUktdOiB0aGlzLnByb3BzLmluaGVyaXREYXJrVGhlbWUgJiYgdGhpcy5oYXNEYXJrUGFyZW50ICYmICFpbmxpbmUsXG4gICAgICAgIH0sIHRoaXMucHJvcHMucG9wb3ZlckNsYXNzTmFtZSk7XG5cbiAgICAgICAgY29uc3Qgc3R5bGVzID0gdGhpcy5nZXRBcnJvd1Bvc2l0aW9uU3R5bGVzKCk7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybSA9IHsgdHJhbnNmb3JtT3JpZ2luOiB0aGlzLmdldFBvcG92ZXJUcmFuc2Zvcm1PcmlnaW4oKSB9O1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3Nlc30gcmVmPXt0aGlzLnJlZkhhbmRsZXJzLnBvcG92ZXJ9IHN0eWxlPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cG9wb3ZlckNsYXNzZXN9IHN0eWxlPXt0cmFuc2Zvcm19IHsuLi5wb3BvdmVySGFuZGxlcnN9PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Q2xhc3Nlcy5QT1BPVkVSX0FSUk9XfSBzdHlsZT17c3R5bGVzLmFycm93fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAzMCAzMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzTmFtZT17Q2xhc3Nlcy5QT1BPVkVSX0FSUk9XICsgXCItYm9yZGVyXCJ9IGQ9e1NWR19TSEFET1dfUEFUSH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBjbGFzc05hbWU9e0NsYXNzZXMuUE9QT1ZFUl9BUlJPVyArIFwiLWZpbGxcIn0gZD17U1ZHX0FSUk9XX1BBVEh9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtDbGFzc2VzLlBPUE9WRVJfQ09OVEVOVH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QXJyb3dQb3NpdGlvblN0eWxlcygpOiB7IGFycm93PzogUmVhY3QuQ1NTUHJvcGVydGllcywgY29udGFpbmVyPzogUmVhY3QuQ1NTUHJvcGVydGllcyB9IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudXNlU21hcnRBcnJvd1Bvc2l0aW9uaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0geyBoZWlnaHQ6IHRoaXMuc3RhdGUudGFyZ2V0SGVpZ2h0LCB3aWR0aDogdGhpcy5zdGF0ZS50YXJnZXRXaWR0aCB9O1xuICAgICAgICAgICAgcmV0dXJuIEFycm93cy5nZXRBcnJvd1Bvc2l0aW9uU3R5bGVzKHRoaXMucHJvcHMucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hcnJvd1NpemUsIHRoaXMuc3RhdGUuaWdub3JlVGFyZ2V0RGltZW5zaW9ucywgZGltZW5zaW9ucywgdGhpcy5wcm9wcy5pbmxpbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQb3BvdmVyVHJhbnNmb3JtT3JpZ2luKCk6IHN0cmluZyB7XG4gICAgICAgIC8vIGlmIHNtYXJ0IHBvc2l0aW9uaW5nIGlzIGVuYWJsZWQgdGhlbiB3ZSBtdXN0IHJlbHkgQ1NTIGNsYXNzZXMgdG8gcHV0IHRyYW5zZm9ybSBvcmlnaW5cbiAgICAgICAgLy8gb24gdGhlIGNvcnJlY3Qgc2lkZSBhbmQgY2Fubm90IG92ZXJyaWRlIGl0IGluIEpTLiAoaHR0cHM6Ly9naXRodWIuY29tL0h1YlNwb3QvdGV0aGVyL2lzc3Vlcy8xNTQpXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnVzZVNtYXJ0QXJyb3dQb3NpdGlvbmluZyAmJiAhdGhpcy5wcm9wcy51c2VTbWFydFBvc2l0aW9uaW5nKSB7XG4gICAgICAgICAgICBjb25zdCBkaW1lbnNpb25zID0geyBoZWlnaHQ6IHRoaXMuc3RhdGUudGFyZ2V0SGVpZ2h0LCB3aWR0aDogdGhpcy5zdGF0ZS50YXJnZXRXaWR0aCB9O1xuICAgICAgICAgICAgcmV0dXJuIEFycm93cy5nZXRQb3BvdmVyVHJhbnNmb3JtT3JpZ2luKHRoaXMucHJvcHMucG9zaXRpb24sXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hcnJvd1NpemUsIGRpbWVuc2lvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlQ29udGVudE1vdW50ID0gKCkgPT4ge1xuICAgICAgICBpZiAoVXRpbHMuaXNGdW5jdGlvbih0aGlzLnByb3BzLnBvcG92ZXJEaWRPcGVuKSAmJiB0aGlzLmlzQ29udGVudE1vdW50aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnBvcG92ZXJEaWRPcGVuKCk7XG4gICAgICAgICAgICB0aGlzLmlzQ29udGVudE1vdW50aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU1vdXNlRW50ZXIgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgLy8gaWYgd2UncmUgZW50ZXJpbmcgdGhlIHBvcG92ZXIsIGFuZCB0aGUgbW9kZSBpcyBzZXQgdG8gYmUgSE9WRVJfVEFSR0VUX09OTFksIHdlIHdhbnQgdG8gbWFudWFsbHlcbiAgICAgICAgLy8gdHJpZ2dlciB0aGUgbW91c2UgbGVhdmUgZXZlbnQsIGFzIGhvdmVyaW5nIG92ZXIgdGhlIHBvcG92ZXIgc2hvdWxkbid0IGNvdW50LlxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pbmxpbmVcbiAgICAgICAgICAgICYmIHRoaXMuaXNFbGVtZW50SW5Qb3BvdmVyKGUudGFyZ2V0IGFzIEVsZW1lbnQpXG4gICAgICAgICAgICAmJiB0aGlzLnByb3BzLmludGVyYWN0aW9uS2luZCA9PT0gUG9wb3ZlckludGVyYWN0aW9uS2luZC5IT1ZFUl9UQVJHRVRfT05MWSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNb3VzZUxlYXZlKGUpO1xuICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLnByb3BzLmlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgIC8vIG9ubHkgYmVnaW4gb3BlbmluZyBwb3BvdmVyIHdoZW4gaXQgaXMgZW5hYmxlZFxuICAgICAgICAgICAgdGhpcy5zZXRPcGVuU3RhdGUodHJ1ZSwgZSwgdGhpcy5wcm9wcy5ob3Zlck9wZW5EZWxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZU1vdXNlTGVhdmUgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRWxlbWVudD4pID0+IHtcbiAgICAgICAgLy8gdXNlci1jb25maWd1cmFibGUgY2xvc2luZyBkZWxheSBpcyBoZWxwZnVsIHdoZW4gbW92aW5nIG1vdXNlIGZyb20gdGFyZ2V0IHRvIHBvcG92ZXJcbiAgICAgICAgdGhpcy5zZXRPcGVuU3RhdGUoZmFsc2UsIGUsIHRoaXMucHJvcHMuaG92ZXJDbG9zZURlbGF5KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVBvcG92ZXJDbGljayA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCBldmVudFRhcmdldCA9IGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCBzaG91bGREaXNtaXNzID0gZXZlbnRUYXJnZXQuY2xvc2VzdChgLiR7Q2xhc3Nlcy5QT1BPVkVSX0RJU01JU1N9YCkgIT0gbnVsbDtcbiAgICAgICAgY29uc3Qgb3ZlcnJpZGVEaXNtaXNzID0gZXZlbnRUYXJnZXQuY2xvc2VzdChgLiR7Q2xhc3Nlcy5QT1BPVkVSX0RJU01JU1NfT1ZFUlJJREV9YCkgIT0gbnVsbDtcbiAgICAgICAgaWYgKHNob3VsZERpc21pc3MgJiYgIW92ZXJyaWRlRGlzbWlzcykge1xuICAgICAgICAgICAgdGhpcy5zZXRPcGVuU3RhdGUoZmFsc2UsIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVPdmVybGF5Q2xvc2UgPSAoZTogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGNvbnN0IGV2ZW50VGFyZ2V0ID0gZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIC8vIGlmIGNsaWNrIHdhcyBpbiB0YXJnZXQsIHRhcmdldCBldmVudCBsaXN0ZW5lciB3aWxsIGhhbmRsZSB0aGluZ3MsIHNvIGRvbid0IGNsb3NlXG4gICAgICAgIGlmICghVXRpbHMuZWxlbWVudElzT3JDb250YWlucyh0aGlzLnRhcmdldEVsZW1lbnQsIGV2ZW50VGFyZ2V0KVxuICAgICAgICAgICAgICAgIHx8IGUubmF0aXZlRXZlbnQgaW5zdGFuY2VvZiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNldE9wZW5TdGF0ZShmYWxzZSwgZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVRhcmdldENsaWNrID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIC8vIGVuc3VyZSBjbGljayBkaWQgbm90IG9yaWdpbmF0ZSBmcm9tIHdpdGhpbiBpbmxpbmUgcG9wb3ZlciBiZWZvcmUgY2xvc2luZ1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaXNEaXNhYmxlZCAmJiAhdGhpcy5pc0VsZW1lbnRJblBvcG92ZXIoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pc09wZW4gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoKHByZXZTdGF0ZSkgPT4gKHsgaXNPcGVuOiAhcHJldlN0YXRlLmlzT3BlbiB9KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3BlblN0YXRlKCF0aGlzLnByb3BzLmlzT3BlbiwgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZUFycm93UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLnBvcG92ZXJFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGFycm93ID0gdGhpcy5wb3BvdmVyRWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKENsYXNzZXMuUE9QT1ZFUl9BUlJPVylbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBjZW50ZXJXaWR0aCA9ICh0aGlzLnN0YXRlLnRhcmdldFdpZHRoICsgYXJyb3cuY2xpZW50V2lkdGgpIC8gMjtcbiAgICAgICAgICAgIGNvbnN0IGNlbnRlckhlaWdodCA9ICh0aGlzLnN0YXRlLnRhcmdldEhlaWdodCArIGFycm93LmNsaWVudEhlaWdodCkgLyAyO1xuXG4gICAgICAgICAgICBjb25zdCBpZ25vcmVXaWR0aCA9IGNlbnRlcldpZHRoID4gdGhpcy5wb3BvdmVyRWxlbWVudC5jbGllbnRXaWR0aFxuICAgICAgICAgICAgICAgICYmIFBvc1V0aWxzLmlzUG9zaXRpb25Ib3Jpem9udGFsKHRoaXMucHJvcHMucG9zaXRpb24pO1xuICAgICAgICAgICAgY29uc3QgaWdub3JlSGVpZ2h0ID0gY2VudGVySGVpZ2h0ID4gdGhpcy5wb3BvdmVyRWxlbWVudC5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgICAgICAmJiBQb3NVdGlscy5pc1Bvc2l0aW9uVmVydGljYWwodGhpcy5wcm9wcy5wb3NpdGlvbik7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5zdGF0ZS5pZ25vcmVUYXJnZXREaW1lbnNpb25zICYmIChpZ25vcmVXaWR0aCB8fCBpZ25vcmVIZWlnaHQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aWdub3JlVGFyZ2V0RGltZW5zaW9uczogdHJ1ZX0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmlnbm9yZVRhcmdldERpbWVuc2lvbnMgJiYgIWlnbm9yZVdpZHRoICYmICFpZ25vcmVIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtpZ25vcmVUYXJnZXREaW1lbnNpb25zOiBmYWxzZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVUZXRoZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmlzT3BlbiAmJiAhdGhpcy5wcm9wcy5pbmxpbmUgJiYgdGhpcy5wb3BvdmVyRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAvLyB0aGUgLnB0LXBvcG92ZXItdGFyZ2V0IHNwYW4gd2Ugd3JhcCB0aGUgY2hpbGRyZW4gaW4gd29uJ3QgYWx3YXlzIGJlIGFzIGJpZyBhcyBpdHMgY2hpbGRyZW5cbiAgICAgICAgICAgIC8vIHNvIGluc3RlYWQsIHdlJ2xsIHBvc2l0aW9uIHRldGhlciBiYXNlZCBvZmYgb2YgaXRzIGZpcnN0IGNoaWxkLlxuICAgICAgICAgICAgLy8gTk9URTogdXNlIGZpbmRET01Ob2RlKHRoaXMpIGRpcmVjdGx5IGJlY2F1c2UgdGhpcy50YXJnZXRFbGVtZW50IG1heSBub3QgZXhpc3QgeWV0XG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBmaW5kRE9NTm9kZSh0aGlzKS5jaGlsZE5vZGVzWzBdO1xuICAgICAgICAgICAgY29uc3QgdGV0aGVyT3B0aW9ucyA9IFRldGhlclV0aWxzLmNyZWF0ZVRldGhlck9wdGlvbnMoXG4gICAgICAgICAgICAgICAgdGhpcy5wb3BvdmVyRWxlbWVudCwgdGFyZ2V0LCB0aGlzLnByb3BzLnBvc2l0aW9uLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudXNlU21hcnRQb3NpdGlvbmluZywgdGhpcy5wcm9wcy5jb25zdHJhaW50cyxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAodGhpcy50ZXRoZXIgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGV0aGVyID0gbmV3IFRldGhlcih0ZXRoZXJPcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXRoZXIuc2V0T3B0aW9ucyh0ZXRoZXJPcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaWYgcHJvcHMucG9zaXRpb24gaGFzIGp1c3QgY2hhbmdlZCwgVGV0aGVyIHVuZm9ydHVuYXRlbHkgcG9zaXRpb25zIHRoZSBwb3BvdmVyIGJhc2VkXG4gICAgICAgICAgICAvLyBvbiB0aGUgbWFyZ2lucyBmcm9tIHRoZSBwcmV2aW91cyBwb3NpdGlvbi4gZGVsYXkgYSBmcmFtZSBmb3Igc3R5bGVzIHRvIGNhdGNoIHVwLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRldGhlci5wb3NpdGlvbigpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVzdHJveVRldGhlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBkZXN0cm95VGV0aGVyKCkge1xuICAgICAgICBpZiAodGhpcy50ZXRoZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50ZXRoZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gYSB3cmFwcGVyIGFyb3VuZCBzZXRTdGF0ZSh7aXNPcGVufSkgdGhhdCB3aWxsIGNhbGwgcHJvcHMub25JbnRlcmFjdGlvbiBpbnN0ZWFkIHdoZW4gaW4gY29udHJvbGxlZCBtb2RlLlxuICAgIC8vIHN0YXJ0cyBhIHRpbWVvdXQgdG8gZGVsYXkgY2hhbmdpbmcgdGhlIHN0YXRlIGlmIGEgbm9uLXplcm8gZHVyYXRpb24gaXMgcHJvdmlkZWQuXG4gICAgcHJpdmF0ZSBzZXRPcGVuU3RhdGUoaXNPcGVuOiBib29sZWFuLCBlPzogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+LCB0aW1lb3V0PzogbnVtYmVyKSB7XG4gICAgICAgIC8vIGNhbmNlbCBhbnkgZXhpc3RpbmcgdGltZW91dCBiZWNhdXNlIHdlIGhhdmUgbmV3IHN0YXRlXG4gICAgICAgIFV0aWxzLnNhZmVJbnZva2UodGhpcy5jYW5jZWxPcGVuVGltZW91dCk7XG4gICAgICAgIGlmICh0aW1lb3V0ID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxPcGVuVGltZW91dCA9IHRoaXMuc2V0VGltZW91dCgoKSA9PiB0aGlzLnNldE9wZW5TdGF0ZShpc09wZW4sIGUpLCB0aW1lb3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlzT3BlbiA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbiB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuc2FmZUludm9rZSh0aGlzLnByb3BzLm9uSW50ZXJhY3Rpb24sIGlzT3Blbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzT3Blbikge1xuICAgICAgICAgICAgICAgIFV0aWxzLnNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkNsb3NlLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaXNFbGVtZW50SW5Qb3BvdmVyKGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucG9wb3ZlckVsZW1lbnQgIT0gbnVsbCAmJiB0aGlzLnBvcG92ZXJFbGVtZW50LmNvbnRhaW5zKGVsZW1lbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBvcG92ZXJGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShQb3BvdmVyKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
