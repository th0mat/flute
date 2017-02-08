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
var classNames = require("classnames");
var React = require("react");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
(function (AnimationStates) {
    AnimationStates[AnimationStates["CLOSED"] = 0] = "CLOSED";
    AnimationStates[AnimationStates["OPENING"] = 1] = "OPENING";
    AnimationStates[AnimationStates["OPEN"] = 2] = "OPEN";
    AnimationStates[AnimationStates["CLOSING_START"] = 3] = "CLOSING_START";
    AnimationStates[AnimationStates["CLOSING_END"] = 4] = "CLOSING_END";
})(exports.AnimationStates || (exports.AnimationStates = {}));
var AnimationStates = exports.AnimationStates;
/*
 * A collapse can be in one of 5 states:
 * CLOSED
 * When in this state, the contents of the collapse is not rendered, the collapse height is 0,
 * and the body Y is at -height (so that the bottom of the body is at Y=0).
 *
 * OPEN
 * When in this state, the collapse height is set to auto, and the body Y is set to 0 (so the element can be seen
 * as normal).
 *
 * CLOSING_START
 * When in this state, height has been changed from auto to the measured height of the body to prepare for the
 * closing animation in CLOSING_END.
 *
 * CLOSING_END
 * When in this state, the height is set to 0 and the body Y is at -height. Both of these properties are transformed,
 * and then after the animation is complete, the state changes to CLOSED.
 *
 * OPENING
 * When in this state, the body is re-rendered, height is set to the measured body height and the body Y is set to 0.
 * This is all animated, and on complete, the state changes to OPEN.
 *
 * When changing the isOpen prop, the following happens to the states:
 * isOpen = true : CLOSED -> OPENING -> OPEN
 * isOpen = false: OPEN -> CLOSING_START -> CLOSING_END -> CLOSED
 * These are all animated.
 */
var Collapse = (function (_super) {
    __extends(Collapse, _super);
    function Collapse() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            animationState: AnimationStates.OPEN,
            height: "0px",
        };
        // The most recent non-0 height (once a height has been measured - is 0 until then)
        this.height = 0;
        this.contentsRefHandler = function (el) {
            _this.contents = el;
            if (el != null) {
                _this.height = _this.contents.clientHeight;
                _this.setState({
                    animationState: _this.props.isOpen ? AnimationStates.OPEN : AnimationStates.CLOSED,
                    height: _this.height + "px",
                });
            }
        };
    }
    Collapse.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        if (this.contents != null && this.contents.clientHeight !== 0) {
            this.height = this.contents.clientHeight;
        }
        if (this.props.isOpen !== nextProps.isOpen) {
            if (this.state.animationState !== AnimationStates.CLOSED && !nextProps.isOpen) {
                this.setState({
                    animationState: AnimationStates.CLOSING_START,
                    height: this.height + "px",
                });
            }
            else if (this.state.animationState !== AnimationStates.OPEN && nextProps.isOpen) {
                this.setState({
                    animationState: AnimationStates.OPENING,
                    height: this.height + "px",
                });
                this.setTimeout(function () { return _this.onDelayedStateChange(); }, this.props.transitionDuration);
            }
        }
    };
    Collapse.prototype.render = function () {
        var showContents = (this.state.animationState !== AnimationStates.CLOSED);
        var displayWithTransform = showContents && (this.state.animationState !== AnimationStates.CLOSING_END);
        var isAutoHeight = (this.state.height === "auto");
        var containerStyle = {
            height: showContents ? this.state.height : null,
            overflow: isAutoHeight ? "visible" : null,
            transition: isAutoHeight ? "none" : null,
        };
        var contentsStyle = {
            transform: displayWithTransform ? "translateY(0)" : "translateY(-" + this.height + "px)",
            transition: isAutoHeight ? "none" : null,
        };
        // quick type cast because there's no single overload that supports all three ReactTypes (str | Cmp | SFC)
        return React.createElement(this.props.component, {
            className: classNames(Classes.COLLAPSE, this.props.className),
            style: containerStyle,
        }, React.createElement("div", {className: "pt-collapse-body", ref: this.contentsRefHandler, style: contentsStyle}, showContents ? this.props.children : null));
    };
    Collapse.prototype.componentDidMount = function () {
        this.forceUpdate();
        if (this.props.isOpen) {
            this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
        }
        else {
            this.setState({ animationState: AnimationStates.CLOSED });
        }
    };
    Collapse.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.state.animationState === AnimationStates.CLOSING_START) {
            this.setTimeout(function () { return _this.setState({
                animationState: AnimationStates.CLOSING_END,
                height: "0px",
            }); });
            this.setTimeout(function () { return _this.onDelayedStateChange(); }, this.props.transitionDuration);
        }
    };
    Collapse.prototype.onDelayedStateChange = function () {
        switch (this.state.animationState) {
            case AnimationStates.OPENING:
                this.setState({ animationState: AnimationStates.OPEN, height: "auto" });
                break;
            case AnimationStates.CLOSING_END:
                this.setState({ animationState: AnimationStates.CLOSED });
                break;
            default:
                break;
        }
    };
    Collapse.displayName = "Blueprint.Collapse";
    Collapse.defaultProps = {
        component: "div",
        isOpen: false,
        transitionDuration: 200,
    };
    return Collapse;
}(abstractComponent_1.AbstractComponent));
exports.Collapse = Collapse;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2NvbGxhcHNlL2NvbGxhcHNlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7OztBQUVILElBQVksVUFBVSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBQ3pDLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLGtDQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFpQ2hELFdBQVksZUFBZTtJQUN2Qix5REFBTSxDQUFBO0lBQ04sMkRBQU8sQ0FBQTtJQUNQLHFEQUFJLENBQUE7SUFDSix1RUFBYSxDQUFBO0lBQ2IsbUVBQVcsQ0FBQTtBQUNmLENBQUMsRUFOVyx1QkFBZSxLQUFmLHVCQUFlLFFBTTFCO0FBTkQsSUFBWSxlQUFlLEdBQWYsdUJBTVgsQ0FBQTtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNIO0lBQThCLDRCQUFpRDtJQUEvRTtRQUFBLGlCQTRHQztRQTVHNkIsOEJBQWlEO1FBU3BFLFVBQUssR0FBRztZQUNYLGNBQWMsRUFBRSxlQUFlLENBQUMsSUFBSTtZQUNwQyxNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDO1FBSUYsbUZBQW1GO1FBQzNFLFdBQU0sR0FBVyxDQUFDLENBQUM7UUFvRW5CLHVCQUFrQixHQUFHLFVBQUMsRUFBZTtZQUN6QyxLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDYixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO2dCQUN6QyxLQUFJLENBQUMsUUFBUSxDQUFDO29CQUNWLGNBQWMsRUFBRSxLQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxNQUFNO29C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TztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxLQUFLLENBQUM7WUFDVixLQUFLLGVBQWUsQ0FBQyxXQUFXO2dCQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRCxLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQTFHYSxvQkFBVyxHQUFHLG9CQUFvQixDQUFDO0lBRW5DLHFCQUFZLEdBQW1CO1FBQ3pDLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxLQUFLO1FBQ2Isa0JBQWtCLEVBQUUsR0FBRztLQUMxQixDQUFDO0lBcUdOLGVBQUM7QUFBRCxDQTVHQSxBQTRHQyxDQTVHNkIscUNBQWlCLEdBNEc5QztBQTVHWSxnQkFBUSxXQTRHcEIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NvbGxhcHNlL2NvbGxhcHNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE1IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxuaW1wb3J0IHsgQWJzdHJhY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Fic3RyYWN0Q29tcG9uZW50XCI7XG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElDb2xsYXBzZVByb3BzIGV4dGVuZHMgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBDb21wb25lbnQgdG8gcmVuZGVyIGFzIHRoZSByb290IGVsZW1lbnQuXG4gICAgICogVXNlZnVsIHdoZW4gcmVuZGVyaW5nIGEgQ29sbGFwc2UgaW5zaWRlIGEgYDx0YWJsZT5gLCBmb3IgaW5zdGFuY2UuXG4gICAgICogQGRlZmF1bHQgXCJkaXZcIlxuICAgICAqL1xuICAgIGNvbXBvbmVudD86IFJlYWN0LlJlYWN0VHlwZTtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBvcGVuIG9yIGNsb3NlZC5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIGlzT3Blbj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbGVuZ3RoIG9mIHRpbWUgdGhlIHRyYW5zaXRpb24gdGFrZXMsIGluIG1zLiBUaGlzIG11c3QgbWF0Y2ggdGhlIGR1cmF0aW9uIG9mIHRoZSBhbmltYXRpb24gaW4gQ1NTLlxuICAgICAqIE9ubHkgc2V0IHRoaXMgcHJvcCBpZiB5b3Ugb3ZlcnJpZGUgQmx1ZXByaW50J3MgZGVmYXVsdCB0cmFuc2l0aW9ucyB3aXRoIG5ldyB0cmFuc2l0aW9ucyBvZiBhIGRpZmZlcmVudCBsZW5ndGguXG4gICAgICogQGRlZmF1bHQgMjAwXG4gICAgICovXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb2xsYXBzZVN0YXRlIHtcbiAgICAvKiogVGhlIGhlaWdodCB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0aGUgY29udGVudCBhbmltYXRpb25zLiBUaGlzIGlzIGEgQ1NTIHZhbHVlLCBub3QganVzdCBhIG51bWJlci4gKi9cbiAgICBoZWlnaHQ/OiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIHN0YXRlIHRoZSBlbGVtZW50IGlzIGN1cnJlbnRseSBpbi4gKi9cbiAgICBhbmltYXRpb25TdGF0ZT86IEFuaW1hdGlvblN0YXRlcztcbn1cblxuZXhwb3J0IGVudW0gQW5pbWF0aW9uU3RhdGVzIHtcbiAgICBDTE9TRUQsXG4gICAgT1BFTklORyxcbiAgICBPUEVOLFxuICAgIENMT1NJTkdfU1RBUlQsXG4gICAgQ0xPU0lOR19FTkQsXG59XG5cbi8qXG4gKiBBIGNvbGxhcHNlIGNhbiBiZSBpbiBvbmUgb2YgNSBzdGF0ZXM6XG4gKiBDTE9TRURcbiAqIFdoZW4gaW4gdGhpcyBzdGF0ZSwgdGhlIGNvbnRlbnRzIG9mIHRoZSBjb2xsYXBzZSBpcyBub3QgcmVuZGVyZWQsIHRoZSBjb2xsYXBzZSBoZWlnaHQgaXMgMCxcbiAqIGFuZCB0aGUgYm9keSBZIGlzIGF0IC1oZWlnaHQgKHNvIHRoYXQgdGhlIGJvdHRvbSBvZiB0aGUgYm9keSBpcyBhdCBZPTApLlxuICpcbiAqIE9QRU5cbiAqIFdoZW4gaW4gdGhpcyBzdGF0ZSwgdGhlIGNvbGxhcHNlIGhlaWdodCBpcyBzZXQgdG8gYXV0bywgYW5kIHRoZSBib2R5IFkgaXMgc2V0IHRvIDAgKHNvIHRoZSBlbGVtZW50IGNhbiBiZSBzZWVuXG4gKiBhcyBub3JtYWwpLlxuICpcbiAqIENMT1NJTkdfU1RBUlRcbiAqIFdoZW4gaW4gdGhpcyBzdGF0ZSwgaGVpZ2h0IGhhcyBiZWVuIGNoYW5nZWQgZnJvbSBhdXRvIHRvIHRoZSBtZWFzdXJlZCBoZWlnaHQgb2YgdGhlIGJvZHkgdG8gcHJlcGFyZSBmb3IgdGhlXG4gKiBjbG9zaW5nIGFuaW1hdGlvbiBpbiBDTE9TSU5HX0VORC5cbiAqXG4gKiBDTE9TSU5HX0VORFxuICogV2hlbiBpbiB0aGlzIHN0YXRlLCB0aGUgaGVpZ2h0IGlzIHNldCB0byAwIGFuZCB0aGUgYm9keSBZIGlzIGF0IC1oZWlnaHQuIEJvdGggb2YgdGhlc2UgcHJvcGVydGllcyBhcmUgdHJhbnNmb3JtZWQsXG4gKiBhbmQgdGhlbiBhZnRlciB0aGUgYW5pbWF0aW9uIGlzIGNvbXBsZXRlLCB0aGUgc3RhdGUgY2hhbmdlcyB0byBDTE9TRUQuXG4gKlxuICogT1BFTklOR1xuICogV2hlbiBpbiB0aGlzIHN0YXRlLCB0aGUgYm9keSBpcyByZS1yZW5kZXJlZCwgaGVpZ2h0IGlzIHNldCB0byB0aGUgbWVhc3VyZWQgYm9keSBoZWlnaHQgYW5kIHRoZSBib2R5IFkgaXMgc2V0IHRvIDAuXG4gKiBUaGlzIGlzIGFsbCBhbmltYXRlZCwgYW5kIG9uIGNvbXBsZXRlLCB0aGUgc3RhdGUgY2hhbmdlcyB0byBPUEVOLlxuICpcbiAqIFdoZW4gY2hhbmdpbmcgdGhlIGlzT3BlbiBwcm9wLCB0aGUgZm9sbG93aW5nIGhhcHBlbnMgdG8gdGhlIHN0YXRlczpcbiAqIGlzT3BlbiA9IHRydWUgOiBDTE9TRUQgLT4gT1BFTklORyAtPiBPUEVOXG4gKiBpc09wZW4gPSBmYWxzZTogT1BFTiAtPiBDTE9TSU5HX1NUQVJUIC0+IENMT1NJTkdfRU5EIC0+IENMT1NFRFxuICogVGhlc2UgYXJlIGFsbCBhbmltYXRlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbGxhcHNlIGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SUNvbGxhcHNlUHJvcHMsIElDb2xsYXBzZVN0YXRlPiB7XG4gICAgcHVibGljIHN0YXRpYyBkaXNwbGF5TmFtZSA9IFwiQmx1ZXByaW50LkNvbGxhcHNlXCI7XG5cbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSUNvbGxhcHNlUHJvcHMgPSB7XG4gICAgICAgIGNvbXBvbmVudDogXCJkaXZcIixcbiAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAyMDAsXG4gICAgfTtcblxuICAgIHB1YmxpYyBzdGF0ZSA9IHtcbiAgICAgICAgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5PUEVOLFxuICAgICAgICBoZWlnaHQ6IFwiMHB4XCIsXG4gICAgfTtcblxuICAgIC8vIFRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGNvbnRlbnRzIG9mIHRoZSBjb2xsYXBzZS5cbiAgICBwcml2YXRlIGNvbnRlbnRzOiBIVE1MRWxlbWVudDtcbiAgICAvLyBUaGUgbW9zdCByZWNlbnQgbm9uLTAgaGVpZ2h0IChvbmNlIGEgaGVpZ2h0IGhhcyBiZWVuIG1lYXN1cmVkIC0gaXMgMCB1bnRpbCB0aGVuKVxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBJQ29sbGFwc2VQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50cyAhPSBudWxsICYmIHRoaXMuY29udGVudHMuY2xpZW50SGVpZ2h0ICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY29udGVudHMuY2xpZW50SGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlzT3BlbiAhPT0gbmV4dFByb3BzLmlzT3Blbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uU3RhdGUgIT09IEFuaW1hdGlvblN0YXRlcy5DTE9TRUQgJiYgIW5leHRQcm9wcy5pc09wZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX1NUQVJULFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hbmltYXRpb25TdGF0ZSAhPT0gQW5pbWF0aW9uU3RhdGVzLk9QRU4gJiYgbmV4dFByb3BzLmlzT3Blbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGVzLk9QRU5JTkcsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogYCR7dGhpcy5oZWlnaHR9cHhgLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dCgoKSA9PiB0aGlzLm9uRGVsYXllZFN0YXRlQ2hhbmdlKCksIHRoaXMucHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHNob3dDb250ZW50cyA9ICh0aGlzLnN0YXRlLmFuaW1hdGlvblN0YXRlICE9PSBBbmltYXRpb25TdGF0ZXMuQ0xPU0VEKTtcbiAgICAgICAgY29uc3QgZGlzcGxheVdpdGhUcmFuc2Zvcm0gPSBzaG93Q29udGVudHMgJiYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uU3RhdGUgIT09IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX0VORCk7XG4gICAgICAgIGNvbnN0IGlzQXV0b0hlaWdodCA9ICh0aGlzLnN0YXRlLmhlaWdodCA9PT0gXCJhdXRvXCIpO1xuXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICAgICAgICAgICAgaGVpZ2h0OiBzaG93Q29udGVudHMgPyB0aGlzLnN0YXRlLmhlaWdodCA6IG51bGwsXG4gICAgICAgICAgICBvdmVyZmxvdzogaXNBdXRvSGVpZ2h0ID8gXCJ2aXNpYmxlXCIgOiBudWxsLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogaXNBdXRvSGVpZ2h0ID8gXCJub25lXCIgOiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnRzU3R5bGUgPSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IGRpc3BsYXlXaXRoVHJhbnNmb3JtID8gXCJ0cmFuc2xhdGVZKDApXCIgOiBgdHJhbnNsYXRlWSgtJHt0aGlzLmhlaWdodH1weClgLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogaXNBdXRvSGVpZ2h0ID8gXCJub25lXCIgOiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHF1aWNrIHR5cGUgY2FzdCBiZWNhdXNlIHRoZXJlJ3Mgbm8gc2luZ2xlIG92ZXJsb2FkIHRoYXQgc3VwcG9ydHMgYWxsIHRocmVlIFJlYWN0VHlwZXMgKHN0ciB8IENtcCB8IFNGQylcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodGhpcy5wcm9wcy5jb21wb25lbnQgYXMgc3RyaW5nLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZXMoQ2xhc3Nlcy5DT0xMQVBTRSwgdGhpcy5wcm9wcy5jbGFzc05hbWUpLFxuICAgICAgICAgICAgc3R5bGU6IGNvbnRhaW5lclN0eWxlLFxuICAgICAgICB9LFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC1jb2xsYXBzZS1ib2R5XCIgcmVmPXt0aGlzLmNvbnRlbnRzUmVmSGFuZGxlcn0gc3R5bGU9e2NvbnRlbnRzU3R5bGV9PlxuICAgICAgICAgICAgICAgIHtzaG93Q29udGVudHMgPyB0aGlzLnByb3BzLmNoaWxkcmVuIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMuZm9yY2VVcGRhdGUoKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNPcGVuKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5PUEVOLCBoZWlnaHQ6IFwiYXV0b1wiIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFuaW1hdGlvblN0YXRlOiBBbmltYXRpb25TdGF0ZXMuQ0xPU0VEIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uU3RhdGUgPT09IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX1NUQVJUKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX0VORCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMHB4XCIsXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXQoKCkgPT4gdGhpcy5vbkRlbGF5ZWRTdGF0ZUNoYW5nZSgpLCB0aGlzLnByb3BzLnRyYW5zaXRpb25EdXJhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRlbnRzUmVmSGFuZGxlciA9IChlbDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgdGhpcy5jb250ZW50cyA9IGVsO1xuICAgICAgICBpZiAoZWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvbnRlbnRzLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlOiB0aGlzLnByb3BzLmlzT3BlbiA/IEFuaW1hdGlvblN0YXRlcy5PUEVOIDogQW5pbWF0aW9uU3RhdGVzLkNMT1NFRCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke3RoaXMuaGVpZ2h0fXB4YCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvbkRlbGF5ZWRTdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnN0YXRlLmFuaW1hdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIEFuaW1hdGlvblN0YXRlcy5PUEVOSU5HOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBhbmltYXRpb25TdGF0ZTogQW5pbWF0aW9uU3RhdGVzLk9QRU4sIGhlaWdodDogXCJhdXRvXCIgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEFuaW1hdGlvblN0YXRlcy5DTE9TSU5HX0VORDpcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgYW5pbWF0aW9uU3RhdGU6IEFuaW1hdGlvblN0YXRlcy5DTE9TRUQgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
