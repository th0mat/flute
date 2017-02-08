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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Keys = require("../../common/keys");
var utils_1 = require("../../common/utils");
var BUFFER_WIDTH = 30;
var EditableText = (function (_super) {
    __extends(EditableText, _super);
    function EditableText(props, context) {
        var _this = this;
        _super.call(this, props, context);
        this.refHandlers = {
            content: function (spanElement) {
                _this.valueElement = spanElement;
            },
            input: function (input) {
                if (input != null) {
                    input.focus();
                    var length_1 = input.value.length;
                    input.setSelectionRange(_this.props.selectAllOnFocus ? 0 : length_1, length_1);
                }
            },
        };
        this.cancelEditing = function () {
            var lastValue = _this.state.lastValue;
            _this.setState({ isEditing: false, value: lastValue });
            // invoke onCancel after onChange so consumers' onCancel can override their onChange
            utils_1.safeInvoke(_this.props.onChange, lastValue);
            utils_1.safeInvoke(_this.props.onCancel, lastValue);
        };
        this.toggleEditing = function () {
            if (_this.state.isEditing) {
                var value = _this.state.value;
                _this.setState({
                    isEditing: false,
                    lastValue: value,
                });
                utils_1.safeInvoke(_this.props.onChange, value);
                utils_1.safeInvoke(_this.props.onConfirm, value);
            }
            else if (!_this.props.disabled) {
                _this.setState({ isEditing: true });
            }
        };
        this.handleFocus = function () {
            if (!_this.props.disabled) {
                _this.setState({ isEditing: true });
            }
        };
        this.handleTextChange = function (event) {
            var value = event.target.value;
            // state value should be updated only when uncontrolled
            if (_this.props.value == null) {
                _this.setState({ value: value });
            }
            utils_1.safeInvoke(_this.props.onChange, value);
        };
        this.handleKeyEvent = function (_a) {
            var ctrlKey = _a.ctrlKey, metaKey = _a.metaKey, which = _a.which;
            if (which === Keys.ENTER && (!_this.props.multiline || ctrlKey || metaKey)) {
                _this.toggleEditing();
            }
            else if (which === Keys.ESCAPE) {
                _this.cancelEditing();
            }
        };
        this.state = {
            inputHeight: 0,
            inputWidth: 0,
            isEditing: props.isEditing === true && props.disabled === false,
            lastValue: getValue(props),
            value: getValue(props),
        };
    }
    EditableText.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, multiline = _a.multiline;
        var value = (this.props.value == null ? this.state.value : this.props.value);
        var hasValue = (value != null && value !== "");
        var classes = classNames(Classes.EDITABLE_TEXT, Classes.intentClass(this.props.intent), (_b = {},
            _b[Classes.DISABLED] = disabled,
            _b["pt-editable-editing"] = this.state.isEditing,
            _b["pt-editable-placeholder"] = !hasValue,
            _b["pt-multiline"] = multiline,
            _b
        ), this.props.className);
        var contentStyle;
        if (multiline) {
            // set height only in multiline mode when not editing
            // otherwise we're measuring this element to determine appropriate height of text
            contentStyle = { height: !this.state.isEditing ? this.state.inputHeight : null };
        }
        else {
            // minWidth only applies in single line mode (multiline == width 100%)
            contentStyle = {
                height: this.state.inputHeight,
                lineHeight: this.state.inputHeight != null ? this.state.inputHeight + "px" : null,
                minWidth: this.props.minWidth,
            };
        }
        // make enclosing div focusable when not editing, so it can still be tabbed to focus
        // (when editing, input itself is focusable so div doesn't need to be)
        var tabIndex = this.state.isEditing || disabled ? null : 0;
        return (React.createElement("div", {className: classes, onFocus: this.handleFocus, tabIndex: tabIndex}, 
            this.maybeRenderInput(value), 
            React.createElement("span", {className: "pt-editable-content", ref: this.refHandlers.content, style: contentStyle}, hasValue ? value : this.props.placeholder)));
        var _b;
    };
    EditableText.prototype.componentDidMount = function () {
        this.updateInputDimensions();
    };
    EditableText.prototype.componentDidUpdate = function (_, prevState) {
        if (this.state.isEditing && !prevState.isEditing) {
            utils_1.safeInvoke(this.props.onEdit);
        }
        this.updateInputDimensions();
    };
    EditableText.prototype.componentWillReceiveProps = function (nextProps) {
        var state = { value: getValue(nextProps) };
        if (nextProps.isEditing != null) {
            state.isEditing = nextProps.isEditing;
        }
        if (nextProps.disabled || (nextProps.disabled == null && this.props.disabled)) {
            state.isEditing = false;
        }
        this.setState(state);
    };
    EditableText.prototype.maybeRenderInput = function (value) {
        var multiline = this.props.multiline;
        if (!this.state.isEditing) {
            return undefined;
        }
        var props = {
            className: "pt-editable-input",
            onBlur: this.toggleEditing,
            onChange: this.handleTextChange,
            onKeyDown: this.handleKeyEvent,
            ref: this.refHandlers.input,
            style: {
                height: this.state.inputHeight,
                lineHeight: !multiline && this.state.inputHeight != null ? this.state.inputHeight + "px" : null,
                width: multiline ? "100%" : this.state.inputWidth,
            },
            value: value,
        };
        return multiline ? React.createElement("textarea", __assign({}, props)) : React.createElement("input", __assign({type: "text"}, props));
    };
    EditableText.prototype.updateInputDimensions = function () {
        if (this.valueElement != null) {
            var _a = this.props, maxLines = _a.maxLines, minLines = _a.minLines, minWidth = _a.minWidth, multiline = _a.multiline;
            var _b = this.valueElement, parentElement_1 = _b.parentElement, scrollHeight_1 = _b.scrollHeight, scrollWidth = _b.scrollWidth, textContent = _b.textContent;
            var lineHeight = getLineHeight(this.valueElement);
            // add one line to computed <span> height if text ends in newline
            // because <span> collapses that trailing whitespace but <textarea> shows it
            if (multiline && this.state.isEditing && /\n$/.test(textContent)) {
                scrollHeight_1 += lineHeight;
            }
            if (lineHeight > 0) {
                // line height could be 0 if the isNaN block from getLineHeight kicks in
                scrollHeight_1 = utils_1.clamp(scrollHeight_1, minLines * lineHeight, maxLines * lineHeight);
            }
            // Chrome's input caret height misaligns text so the line-height must be larger than font-size.
            // The computed scrollHeight must also account for a larger inherited line-height from the parent.
            scrollHeight_1 = Math.max(scrollHeight_1, getFontSize(this.valueElement) + 1, getLineHeight(parentElement_1));
            // IE11 needs a small buffer so text does not shift prior to resizing
            this.setState({
                inputHeight: scrollHeight_1,
                inputWidth: Math.max(scrollWidth + BUFFER_WIDTH, minWidth),
            });
            // synchronizes the ::before pseudo-element's height while editing for Chrome 53
            if (multiline && this.state.isEditing) {
                this.setTimeout(function () { return parentElement_1.style.height = scrollHeight_1 + "px"; });
            }
        }
    };
    EditableText.defaultProps = {
        defaultValue: "",
        disabled: false,
        maxLines: Infinity,
        minLines: 1,
        minWidth: 80,
        multiline: false,
        placeholder: "Click to Edit",
    };
    EditableText = __decorate([
        PureRender
    ], EditableText);
    return EditableText;
}(abstractComponent_1.AbstractComponent));
exports.EditableText = EditableText;
function getValue(props) {
    return props.value == null ? props.defaultValue : props.value;
}
function getFontSize(element) {
    var fontSize = getComputedStyle(element).fontSize;
    return fontSize === "" ? 0 : parseInt(fontSize.slice(0, -2), 10);
}
function getLineHeight(element) {
    // getComputedStyle() => 18.0001px => 18
    var lineHeight = parseInt(getComputedStyle(element).lineHeight.slice(0, -2), 10);
    // this check will be true if line-height is a keyword like "normal"
    if (isNaN(lineHeight)) {
        // @see http://stackoverflow.com/a/18430767/6342931
        var line = document.createElement("span");
        line.innerHTML = "<br>";
        element.appendChild(line);
        var singleLineHeight = element.offsetHeight;
        line.innerHTML = "<br><br>";
        var doubleLineHeight = element.offsetHeight;
        element.removeChild(line);
        // this can return 0 in edge cases
        lineHeight = doubleLineHeight - singleLineHeight;
    }
    return lineHeight;
}
exports.EditableTextFactory = React.createFactory(EditableText);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2VkaXRhYmxlLXRleHQvZWRpdGFibGVUZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7R0FLRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsSUFBWSxVQUFVLFdBQU0sWUFBWSxDQUFDLENBQUE7QUFDekMsSUFBWSxVQUFVLFdBQU0sdUJBQXVCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksSUFBSSxXQUFNLG1CQUFtQixDQUFDLENBQUE7QUFFMUMsc0JBQWtDLG9CQUFvQixDQUFDLENBQUE7QUE4RXZELElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUd4QjtJQUFrQyxnQ0FBeUQ7SUF5QnZGLHNCQUFtQixLQUEwQixFQUFFLE9BQWE7UUF6QmhFLGlCQW1NQztRQXpLTyxrQkFBTSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFkbEIsZ0JBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUsVUFBQyxXQUE0QjtnQkFDbEMsS0FBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDcEMsQ0FBQztZQUNELEtBQUssRUFBRSxVQUFDLEtBQTZDO2dCQUNqRCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNOLGlDQUFNLENBQWlCO29CQUMvQixLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsUUFBTSxFQUFFLFFBQU0sQ0FBQyxDQUFDO2dCQUM5RSxDQUFDO1lBQ0wsQ0FBQztTQUNKLENBQUM7UUFnRkssa0JBQWEsR0FBRztZQUNYLHFDQUFTLENBQWdCO1lBQ2pDLEtB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LEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDckUsQ0FBQztBQUVELHVCQUF1QixPQUFvQjtJQUN2Qyx3Q0FBd0M7SUFDeEMsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakYsb0VBQW9FO0lBQ3BFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsbURBQW1EO1FBQ25ELElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7UUFDeEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsSUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzlDLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsa0NBQWtDO1FBQ2xDLFVBQVUsR0FBRyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUNyRCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUN0QixDQUFDO0FBRVksMkJBQW1CLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyIsImZpbGUiOiJjb21wb25lbnRzL2VkaXRhYmxlLXRleHQvZWRpdGFibGVUZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE2IFBhbGFudGlyIFRlY2hub2xvZ2llcywgSW5jLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEJTRC0zIExpY2Vuc2UgYXMgbW9kaWZpZWQgKHRoZSDigJxMaWNlbnNl4oCdKTsgeW91IG1heSBvYnRhaW4gYSBjb3B5XG4gKiBvZiB0aGUgbGljZW5zZSBhdCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqIGFuZCBodHRwczovL2dpdGh1Yi5jb20vcGFsYW50aXIvYmx1ZXByaW50L2Jsb2IvbWFzdGVyL1BBVEVOVFNcbiAqL1xuXG5pbXBvcnQgKiBhcyBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgKiBhcyBQdXJlUmVuZGVyIGZyb20gXCJwdXJlLXJlbmRlci1kZWNvcmF0b3JcIjtcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBBYnN0cmFjdENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9jb21tb24vYWJzdHJhY3RDb21wb25lbnRcIjtcbmltcG9ydCAqIGFzIENsYXNzZXMgZnJvbSBcIi4uLy4uL2NvbW1vbi9jbGFzc2VzXCI7XG5pbXBvcnQgKiBhcyBLZXlzIGZyb20gXCIuLi8uLi9jb21tb24va2V5c1wiO1xuaW1wb3J0IHsgSUludGVudFByb3BzLCBJUHJvcHMgfSBmcm9tIFwiLi4vLi4vY29tbW9uL3Byb3BzXCI7XG5pbXBvcnQgeyBjbGFtcCwgc2FmZUludm9rZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdXRpbHNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBJRWRpdGFibGVUZXh0UHJvcHMgZXh0ZW5kcyBJSW50ZW50UHJvcHMsIElQcm9wcyB7XG4gICAgLyoqIERlZmF1bHQgdGV4dCB2YWx1ZSBvZiB1bmNvbnRyb2xsZWQgaW5wdXQuICovXG4gICAgZGVmYXVsdFZhbHVlPzogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdGV4dCBjYW4gYmUgZWRpdGVkLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgZGlzYWJsZWQ/OiBib29sZWFuO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBpcyBjdXJyZW50bHkgYmVpbmcgZWRpdGVkLiAqL1xuICAgIGlzRWRpdGluZz86IGJvb2xlYW47XG5cbiAgICAvKiogTWluaW11bSB3aWR0aCBpbiBwaXhlbHMgb2YgdGhlIGlucHV0LCB3aGVuIG5vdCBgbXVsdGlsaW5lYC4gKi9cbiAgICBtaW5XaWR0aD86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNvbXBvbmVudCBzdXBwb3J0cyBtdWx0aXBsZSBsaW5lcyBvZiB0ZXh0LlxuICAgICAqIFRoaXMgcHJvcCBzaG91bGQgbm90IGJlIGNoYW5nZWQgZHVyaW5nIHRoZSBjb21wb25lbnQncyBsaWZldGltZS5cbiAgICAgKiBAZGVmYXVsdCBmYWxzZVxuICAgICAqL1xuICAgIG11bHRpbGluZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIG51bWJlciBvZiBsaW5lcyBiZWZvcmUgc2Nyb2xsaW5nIGJlZ2lucywgd2hlbiBgbXVsdGlsaW5lYC5cbiAgICAgKi9cbiAgICBtYXhMaW5lcz86IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIE1pbmltdW0gbnVtYmVyIG9mIGxpbmVzIChlc3NlbnRpYWxseSBtaW5pbXVtIGhlaWdodCksIHdoZW4gYG11bHRpbGluZWAuXG4gICAgICogQGRlZmF1bHQgMVxuICAgICAqL1xuICAgIG1pbkxpbmVzPzogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogUGxhY2Vob2xkZXIgdGV4dCB3aGVuIHRoZXJlIGlzIG5vIHZhbHVlLlxuICAgICAqIEBkZWZhdWx0IFwiQ2xpY2sgdG8gRWRpdFwiXG4gICAgICovXG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBlbnRpcmUgdGV4dCBmaWVsZCBzaG91bGQgYmUgc2VsZWN0ZWQgb24gZm9jdXMuXG4gICAgICogSWYgZmFsc2UsIHRoZSBjdXJzb3IgaXMgcGxhY2VkIGF0IHRoZSBlbmQgb2YgdGhlIHRleHQuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBzZWxlY3RBbGxPbkZvY3VzPzogYm9vbGVhbjtcblxuICAgIC8qKiBUZXh0IHZhbHVlIG9mIGNvbnRyb2xsZWQgaW5wdXQuICovXG4gICAgdmFsdWU/OiBzdHJpbmc7XG5cbiAgICAvKiogQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHVzZXIgY2FuY2VscyBpbnB1dCB3aXRoIHRoZSBgZXNjYCBrZXkuIFJlY2VpdmVzIGxhc3QgY29uZmlybWVkIHZhbHVlLiAqL1xuICAgIG9uQ2FuY2VsPyh2YWx1ZTogc3RyaW5nKTogdm9pZDtcblxuICAgIC8qKiBDYWxsYmFjayBpbnZva2VkIHdoZW4gdXNlciBjaGFuZ2VzIGlucHV0IGluIGFueSB3YXkuICovXG4gICAgb25DaGFuZ2U/KHZhbHVlOiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgLyoqIENhbGxiYWNrIGludm9rZWQgd2hlbiB1c2VyIGNvbmZpcm1zIHZhbHVlIHdpdGggYGVudGVyYCBrZXkgb3IgYnkgYmx1cnJpbmcgaW5wdXQuICovXG4gICAgb25Db25maXJtPyh2YWx1ZTogc3RyaW5nKTogdm9pZDtcblxuICAgIC8qKiBDYWxsYmFjayBpbnZva2VkIGFmdGVyIHRoZSB1c2VyIGVudGVycyBlZGl0IG1vZGUuICovXG4gICAgb25FZGl0PygpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFZGl0YWJsZVRleHRTdGF0ZSB7XG4gICAgLyoqIFBpeGVsIGhlaWdodCBvZiB0aGUgaW5wdXQsIG1lYXN1cmVkIGZyb20gc3BhbiBzaXplICovXG4gICAgaW5wdXRIZWlnaHQ/OiBudW1iZXI7XG4gICAgLyoqIFBpeGVsIHdpZHRoIG9mIHRoZSBpbnB1dCwgbWVhc3VyZWQgZnJvbSBzcGFuIHNpemUgKi9cbiAgICBpbnB1dFdpZHRoPzogbnVtYmVyO1xuICAgIC8qKiBXaGV0aGVyIHRoZSB2YWx1ZSBpcyBjdXJyZW50bHkgYmVpbmcgZWRpdGVkICovXG4gICAgaXNFZGl0aW5nPzogYm9vbGVhbjtcbiAgICAvKiogVGhlIGxhc3QgY29uZmlybWVkIHZhbHVlICovXG4gICAgbGFzdFZhbHVlPzogc3RyaW5nO1xuICAgIC8qKiBUaGUgY29udHJvbGxlZCBpbnB1dCB2YWx1ZSwgbWF5IGJlIGRpZmZlcmVudCBmcm9tIHByb3AgZHVyaW5nIGVkaXRpbmcgKi9cbiAgICB2YWx1ZT86IHN0cmluZztcbn1cblxuY29uc3QgQlVGRkVSX1dJRFRIID0gMzA7XG5cbkBQdXJlUmVuZGVyXG5leHBvcnQgY2xhc3MgRWRpdGFibGVUZXh0IGV4dGVuZHMgQWJzdHJhY3RDb21wb25lbnQ8SUVkaXRhYmxlVGV4dFByb3BzLCBJRWRpdGFibGVUZXh0U3RhdGU+IHtcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSUVkaXRhYmxlVGV4dFByb3BzID0ge1xuICAgICAgICBkZWZhdWx0VmFsdWU6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgbWF4TGluZXM6IEluZmluaXR5LFxuICAgICAgICBtaW5MaW5lczogMSxcbiAgICAgICAgbWluV2lkdGg6IDgwLFxuICAgICAgICBtdWx0aWxpbmU6IGZhbHNlLFxuICAgICAgICBwbGFjZWhvbGRlcjogXCJDbGljayB0byBFZGl0XCIsXG4gICAgfTtcblxuICAgIHByaXZhdGUgdmFsdWVFbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZWZIYW5kbGVycyA9IHtcbiAgICAgICAgY29udGVudDogKHNwYW5FbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWVFbGVtZW50ID0gc3BhbkVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGlucHV0OiAoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBsZW5ndGggfSA9IGlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGlucHV0LnNldFNlbGVjdGlvblJhbmdlKHRoaXMucHJvcHMuc2VsZWN0QWxsT25Gb2N1cyA/IDAgOiBsZW5ndGgsIGxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcm9wcz86IElFZGl0YWJsZVRleHRQcm9wcywgY29udGV4dD86IGFueSkge1xuICAgICAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGlucHV0SGVpZ2h0OiAwLFxuICAgICAgICAgICAgaW5wdXRXaWR0aDogMCxcbiAgICAgICAgICAgIGlzRWRpdGluZzogcHJvcHMuaXNFZGl0aW5nID09PSB0cnVlICYmIHByb3BzLmRpc2FibGVkID09PSBmYWxzZSxcbiAgICAgICAgICAgIGxhc3RWYWx1ZTogZ2V0VmFsdWUocHJvcHMpLFxuICAgICAgICAgICAgdmFsdWU6IGdldFZhbHVlKHByb3BzKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGRpc2FibGVkLCBtdWx0aWxpbmUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gKHRoaXMucHJvcHMudmFsdWUgPT0gbnVsbCA/IHRoaXMuc3RhdGUudmFsdWUgOiB0aGlzLnByb3BzLnZhbHVlKTtcbiAgICAgICAgY29uc3QgaGFzVmFsdWUgPSAodmFsdWUgIT0gbnVsbCAmJiB2YWx1ZSAhPT0gXCJcIik7XG5cbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoXG4gICAgICAgICAgICBDbGFzc2VzLkVESVRBQkxFX1RFWFQsXG4gICAgICAgICAgICBDbGFzc2VzLmludGVudENsYXNzKHRoaXMucHJvcHMuaW50ZW50KSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBbQ2xhc3Nlcy5ESVNBQkxFRF06IGRpc2FibGVkLFxuICAgICAgICAgICAgICAgIFwicHQtZWRpdGFibGUtZWRpdGluZ1wiOiB0aGlzLnN0YXRlLmlzRWRpdGluZyxcbiAgICAgICAgICAgICAgICBcInB0LWVkaXRhYmxlLXBsYWNlaG9sZGVyXCI6ICFoYXNWYWx1ZSxcbiAgICAgICAgICAgICAgICBcInB0LW11bHRpbGluZVwiOiBtdWx0aWxpbmUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGNvbnRlbnRTdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgICAgICAgaWYgKG11bHRpbGluZSkge1xuICAgICAgICAgICAgLy8gc2V0IGhlaWdodCBvbmx5IGluIG11bHRpbGluZSBtb2RlIHdoZW4gbm90IGVkaXRpbmdcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSB3ZSdyZSBtZWFzdXJpbmcgdGhpcyBlbGVtZW50IHRvIGRldGVybWluZSBhcHByb3ByaWF0ZSBoZWlnaHQgb2YgdGV4dFxuICAgICAgICAgICAgY29udGVudFN0eWxlID0geyBoZWlnaHQ6ICF0aGlzLnN0YXRlLmlzRWRpdGluZyA/IHRoaXMuc3RhdGUuaW5wdXRIZWlnaHQgOiBudWxsIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBtaW5XaWR0aCBvbmx5IGFwcGxpZXMgaW4gc2luZ2xlIGxpbmUgbW9kZSAobXVsdGlsaW5lID09IHdpZHRoIDEwMCUpXG4gICAgICAgICAgICBjb250ZW50U3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnN0YXRlLmlucHV0SGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IHRoaXMuc3RhdGUuaW5wdXRIZWlnaHQgIT0gbnVsbCA/IGAke3RoaXMuc3RhdGUuaW5wdXRIZWlnaHR9cHhgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogdGhpcy5wcm9wcy5taW5XaWR0aCxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtYWtlIGVuY2xvc2luZyBkaXYgZm9jdXNhYmxlIHdoZW4gbm90IGVkaXRpbmcsIHNvIGl0IGNhbiBzdGlsbCBiZSB0YWJiZWQgdG8gZm9jdXNcbiAgICAgICAgLy8gKHdoZW4gZWRpdGluZywgaW5wdXQgaXRzZWxmIGlzIGZvY3VzYWJsZSBzbyBkaXYgZG9lc24ndCBuZWVkIHRvIGJlKVxuICAgICAgICBjb25zdCB0YWJJbmRleCA9IHRoaXMuc3RhdGUuaXNFZGl0aW5nIHx8IGRpc2FibGVkID8gbnVsbCA6IDA7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30gb25Gb2N1cz17dGhpcy5oYW5kbGVGb2N1c30gdGFiSW5kZXg9e3RhYkluZGV4fT5cbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlcklucHV0KHZhbHVlKX1cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwdC1lZGl0YWJsZS1jb250ZW50XCIgcmVmPXt0aGlzLnJlZkhhbmRsZXJzLmNvbnRlbnR9IHN0eWxlPXtjb250ZW50U3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICB7aGFzVmFsdWUgPyB2YWx1ZSA6IHRoaXMucHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUlucHV0RGltZW5zaW9ucygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUoXzogSUVkaXRhYmxlVGV4dFByb3BzLCBwcmV2U3RhdGU6IElFZGl0YWJsZVRleHRTdGF0ZSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc0VkaXRpbmcgJiYgIXByZXZTdGF0ZS5pc0VkaXRpbmcpIHtcbiAgICAgICAgICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkVkaXQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlSW5wdXREaW1lbnNpb25zKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBJRWRpdGFibGVUZXh0UHJvcHMpIHtcbiAgICAgICAgY29uc3Qgc3RhdGU6IElFZGl0YWJsZVRleHRTdGF0ZSA9IHsgdmFsdWU6IGdldFZhbHVlKG5leHRQcm9wcykgfTtcbiAgICAgICAgaWYgKG5leHRQcm9wcy5pc0VkaXRpbmcgIT0gbnVsbCkgIHtcbiAgICAgICAgICAgIHN0YXRlLmlzRWRpdGluZyA9IG5leHRQcm9wcy5pc0VkaXRpbmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5leHRQcm9wcy5kaXNhYmxlZCB8fCAobmV4dFByb3BzLmRpc2FibGVkID09IG51bGwgJiYgdGhpcy5wcm9wcy5kaXNhYmxlZCkpIHtcbiAgICAgICAgICAgIHN0YXRlLmlzRWRpdGluZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjYW5jZWxFZGl0aW5nID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB7IGxhc3RWYWx1ZSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRWRpdGluZzogZmFsc2UsIHZhbHVlOiBsYXN0VmFsdWUgfSk7XG4gICAgICAgIC8vIGludm9rZSBvbkNhbmNlbCBhZnRlciBvbkNoYW5nZSBzbyBjb25zdW1lcnMnIG9uQ2FuY2VsIGNhbiBvdmVycmlkZSB0aGVpciBvbkNoYW5nZVxuICAgICAgICBzYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGFuZ2UsIGxhc3RWYWx1ZSk7XG4gICAgICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkNhbmNlbCwgbGFzdFZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9nZ2xlRWRpdGluZyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuaXNFZGl0aW5nKSB7XG4gICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgaXNFZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBsYXN0VmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzYWZlSW52b2tlKHRoaXMucHJvcHMub25DaGFuZ2UsIHZhbHVlKTtcbiAgICAgICAgICAgIHNhZmVJbnZva2UodGhpcy5wcm9wcy5vbkNvbmZpcm0sIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRWRpdGluZzogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlRm9jdXMgPSAoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzRWRpdGluZzogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaGFuZGxlVGV4dENoYW5nZSA9IChldmVudDogUmVhY3QuRm9ybUV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgICAgIC8vIHN0YXRlIHZhbHVlIHNob3VsZCBiZSB1cGRhdGVkIG9ubHkgd2hlbiB1bmNvbnRyb2xsZWRcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsdWUgPT0gbnVsbCkgeyB0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSk7IH1cbiAgICAgICAgc2FmZUludm9rZSh0aGlzLnByb3BzLm9uQ2hhbmdlLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVLZXlFdmVudCA9ICh7IGN0cmxLZXksIG1ldGFLZXksIHdoaWNoIH06IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgICAgIGlmICh3aGljaCA9PT0gS2V5cy5FTlRFUiAmJiAoIXRoaXMucHJvcHMubXVsdGlsaW5lIHx8IGN0cmxLZXkgfHwgbWV0YUtleSkpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRWRpdGluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHdoaWNoID09PSBLZXlzLkVTQ0FQRSkge1xuICAgICAgICAgICAgdGhpcy5jYW5jZWxFZGl0aW5nKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIG1heWJlUmVuZGVySW5wdXQodmFsdWU6IHN0cmluZykge1xuICAgICAgICBjb25zdCB7IG11bHRpbGluZSB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgaWYgKCF0aGlzLnN0YXRlLmlzRWRpdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcm9wczogUmVhY3QuSFRNTFByb3BzPEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50PiA9IHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogXCJwdC1lZGl0YWJsZS1pbnB1dFwiLFxuICAgICAgICAgICAgb25CbHVyOiB0aGlzLnRvZ2dsZUVkaXRpbmcsXG4gICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVUZXh0Q2hhbmdlLFxuICAgICAgICAgICAgb25LZXlEb3duOiB0aGlzLmhhbmRsZUtleUV2ZW50LFxuICAgICAgICAgICAgcmVmOiB0aGlzLnJlZkhhbmRsZXJzLmlucHV0LFxuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3RhdGUuaW5wdXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogIW11bHRpbGluZSAmJiB0aGlzLnN0YXRlLmlucHV0SGVpZ2h0ICE9IG51bGwgPyBgJHt0aGlzLnN0YXRlLmlucHV0SGVpZ2h0fXB4YCA6IG51bGwsXG4gICAgICAgICAgICAgICAgd2lkdGg6IG11bHRpbGluZSA/IFwiMTAwJVwiIDogdGhpcy5zdGF0ZS5pbnB1dFdpZHRoLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbXVsdGlsaW5lID8gPHRleHRhcmVhIHsuLi5wcm9wc30gLz4gOiA8aW5wdXQgdHlwZT1cInRleHRcIiB7Li4ucHJvcHN9IC8+O1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlSW5wdXREaW1lbnNpb25zKCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZUVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgeyBtYXhMaW5lcywgbWluTGluZXMsIG1pbldpZHRoLCBtdWx0aWxpbmUgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgICAgICBsZXQgeyBwYXJlbnRFbGVtZW50LCBzY3JvbGxIZWlnaHQsIHNjcm9sbFdpZHRoLCB0ZXh0Q29udGVudCB9ID0gdGhpcy52YWx1ZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBsaW5lSGVpZ2h0ID0gZ2V0TGluZUhlaWdodCh0aGlzLnZhbHVlRWxlbWVudCk7XG4gICAgICAgICAgICAvLyBhZGQgb25lIGxpbmUgdG8gY29tcHV0ZWQgPHNwYW4+IGhlaWdodCBpZiB0ZXh0IGVuZHMgaW4gbmV3bGluZVxuICAgICAgICAgICAgLy8gYmVjYXVzZSA8c3Bhbj4gY29sbGFwc2VzIHRoYXQgdHJhaWxpbmcgd2hpdGVzcGFjZSBidXQgPHRleHRhcmVhPiBzaG93cyBpdFxuICAgICAgICAgICAgaWYgKG11bHRpbGluZSAmJiB0aGlzLnN0YXRlLmlzRWRpdGluZyAmJiAvXFxuJC8udGVzdCh0ZXh0Q29udGVudCkpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxIZWlnaHQgKz0gbGluZUhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW5lSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGxpbmUgaGVpZ2h0IGNvdWxkIGJlIDAgaWYgdGhlIGlzTmFOIGJsb2NrIGZyb20gZ2V0TGluZUhlaWdodCBraWNrcyBpblxuICAgICAgICAgICAgICAgIHNjcm9sbEhlaWdodCA9IGNsYW1wKHNjcm9sbEhlaWdodCwgbWluTGluZXMgKiBsaW5lSGVpZ2h0LCBtYXhMaW5lcyAqIGxpbmVIZWlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2hyb21lJ3MgaW5wdXQgY2FyZXQgaGVpZ2h0IG1pc2FsaWducyB0ZXh0IHNvIHRoZSBsaW5lLWhlaWdodCBtdXN0IGJlIGxhcmdlciB0aGFuIGZvbnQtc2l6ZS5cbiAgICAgICAgICAgIC8vIFRoZSBjb21wdXRlZCBzY3JvbGxIZWlnaHQgbXVzdCBhbHNvIGFjY291bnQgZm9yIGEgbGFyZ2VyIGluaGVyaXRlZCBsaW5lLWhlaWdodCBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICAgICAgICBzY3JvbGxIZWlnaHQgPSBNYXRoLm1heChzY3JvbGxIZWlnaHQsIGdldEZvbnRTaXplKHRoaXMudmFsdWVFbGVtZW50KSArIDEsIGdldExpbmVIZWlnaHQocGFyZW50RWxlbWVudCkpO1xuICAgICAgICAgICAgLy8gSUUxMSBuZWVkcyBhIHNtYWxsIGJ1ZmZlciBzbyB0ZXh0IGRvZXMgbm90IHNoaWZ0IHByaW9yIHRvIHJlc2l6aW5nXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBpbnB1dEhlaWdodDogc2Nyb2xsSGVpZ2h0LFxuICAgICAgICAgICAgICAgIGlucHV0V2lkdGg6IE1hdGgubWF4KHNjcm9sbFdpZHRoICsgQlVGRkVSX1dJRFRILCBtaW5XaWR0aCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIHN5bmNocm9uaXplcyB0aGUgOjpiZWZvcmUgcHNldWRvLWVsZW1lbnQncyBoZWlnaHQgd2hpbGUgZWRpdGluZyBmb3IgQ2hyb21lIDUzXG4gICAgICAgICAgICBpZiAobXVsdGlsaW5lICYmIHRoaXMuc3RhdGUuaXNFZGl0aW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0KCgpID0+IHBhcmVudEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gYCR7c2Nyb2xsSGVpZ2h0fXB4YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldFZhbHVlKHByb3BzOiBJRWRpdGFibGVUZXh0UHJvcHMpIHtcbiAgICByZXR1cm4gcHJvcHMudmFsdWUgPT0gbnVsbCA/IHByb3BzLmRlZmF1bHRWYWx1ZSA6IHByb3BzLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRGb250U2l6ZShlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgIGNvbnN0IGZvbnRTaXplID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5mb250U2l6ZTtcbiAgICByZXR1cm4gZm9udFNpemUgPT09IFwiXCIgPyAwIDogcGFyc2VJbnQoZm9udFNpemUuc2xpY2UoMCwgLTIpLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGdldExpbmVIZWlnaHQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAvLyBnZXRDb21wdXRlZFN0eWxlKCkgPT4gMTguMDAwMXB4ID0+IDE4XG4gICAgbGV0IGxpbmVIZWlnaHQgPSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmxpbmVIZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgLy8gdGhpcyBjaGVjayB3aWxsIGJlIHRydWUgaWYgbGluZS1oZWlnaHQgaXMgYSBrZXl3b3JkIGxpa2UgXCJub3JtYWxcIlxuICAgIGlmIChpc05hTihsaW5lSGVpZ2h0KSkge1xuICAgICAgICAvLyBAc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE4NDMwNzY3LzYzNDI5MzFcbiAgICAgICAgY29uc3QgbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBsaW5lLmlubmVySFRNTCA9IFwiPGJyPlwiO1xuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGxpbmUpO1xuICAgICAgICBjb25zdCBzaW5nbGVMaW5lSGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGxpbmUuaW5uZXJIVE1MID0gXCI8YnI+PGJyPlwiO1xuICAgICAgICBjb25zdCBkb3VibGVMaW5lSGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQobGluZSk7XG4gICAgICAgIC8vIHRoaXMgY2FuIHJldHVybiAwIGluIGVkZ2UgY2FzZXNcbiAgICAgICAgbGluZUhlaWdodCA9IGRvdWJsZUxpbmVIZWlnaHQgLSBzaW5nbGVMaW5lSGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gbGluZUhlaWdodDtcbn1cblxuZXhwb3J0IGNvbnN0IEVkaXRhYmxlVGV4dEZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KEVkaXRhYmxlVGV4dCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
