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
var ReactDOM = require("react-dom");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var position_1 = require("../../common/position");
var utils_1 = require("../../common/utils");
var popover_1 = require("../popover/popover");
var CONSTRAINTS = [{ attachment: "together", pin: true, to: "window" }];
var TRANSITION_DURATION = 100;
var ContextMenu = (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            isOpen: false,
        };
        this.cancelContextMenu = function (e) { return e.preventDefault(); };
        this.handleBackdropContextMenu = function (e) {
            // HACKHACK: React function to remove from the event pool (not sure why it's not in typings #66)
            e.persist();
            e.preventDefault();
            // wait for backdrop to disappear so we can find the "real" element at event coordinates.
            // timeout duration is equivalent to transition duration so we know it's animated out.
            _this.setTimeout(function () {
                // retrigger context menu event at the element beneath the backdrop.
                // if it has a `contextmenu` event handler then it'll be invoked.
                // if it doesn't, no native menu will show (at least on OSX) :(
                var newTarget = document.elementFromPoint(e.clientX, e.clientY);
                newTarget.dispatchEvent(new MouseEvent("contextmenu", e));
            }, TRANSITION_DURATION);
        };
        this.handlePopoverInteraction = function (nextOpenState) {
            if (!nextOpenState) {
                _this.hide();
            }
        };
    }
    ContextMenu.prototype.render = function () {
        // prevent right-clicking in a context menu
        var content = React.createElement("div", {onContextMenu: this.cancelContextMenu}, this.state.menu);
        return (React.createElement(popover_1.Popover, {backdropProps: { onContextMenu: this.handleBackdropContextMenu }, constraints: CONSTRAINTS, content: content, enforceFocus: false, isModal: true, isOpen: this.state.isOpen, onInteraction: this.handlePopoverInteraction, position: position_1.Position.RIGHT_TOP, popoverClassName: Classes.MINIMAL, useSmartArrowPositioning: false, transitionDuration: TRANSITION_DURATION}, 
            React.createElement("div", {className: Classes.CONTEXT_MENU_POPOVER_TARGET, style: this.state.offset})
        ));
    };
    ContextMenu.prototype.show = function (menu, offset, onClose) {
        this.setState({ isOpen: true, menu: menu, offset: offset, onClose: onClose });
    };
    ContextMenu.prototype.hide = function () {
        var onClose = this.state.onClose;
        this.setState({ isOpen: false, onClose: null });
        utils_1.safeInvoke(onClose);
    };
    return ContextMenu;
}(abstractComponent_1.AbstractComponent));
var contextMenu;
/**
 * Show the given menu element at the given offset from the top-left corner of the viewport.
 * The menu will appear below-right of this point and will flip to below-left if there is not enough
 * room onscreen. The optional callback will be invoked when this menu closes.
 */
function show(menu, offset, onClose) {
    if (contextMenu == null) {
        var contextMenuElement = document.createElement("div");
        contextMenuElement.classList.add(Classes.CONTEXT_MENU);
        document.body.appendChild(contextMenuElement);
        contextMenu = ReactDOM.render(React.createElement(ContextMenu, null), contextMenuElement);
    }
    contextMenu.show(menu, offset, onClose);
}
exports.show = show;
/** Hide the open context menu. */
function hide() {
    if (contextMenu != null) {
        contextMenu.hide();
    }
}
exports.hide = hide;
/** Return whether a context menu is currently open. */
function isOpen() {
    return contextMenu != null && contextMenu.state.isOpen;
}
exports.isOpen = isOpen;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2NvbnRleHQtbWVudS9jb250ZXh0TWVudS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7QUFFSCxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUMvQixJQUFZLFFBQVEsV0FBTSxXQUFXLENBQUMsQ0FBQTtBQUV0QyxrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELHlCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELHNCQUEyQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hELHdCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBYzdDLElBQU0sV0FBVyxHQUFHLENBQUUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFFLENBQUM7QUFDNUUsSUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUM7QUFFaEM7SUFBMEIsK0JBQXdDO0lBQWxFO1FBQUEsaUJBMkRDO1FBM0R5Qiw4QkFBd0M7UUFDdkQsVUFBSyxHQUFzQjtZQUM5QixNQUFNLEVBQUUsS0FBSztTQUNoQixDQUFDO1FBa0NNLHNCQUFpQixHQUFHLFVBQUMsQ0FBdUMsSUFBSyxPQUFBLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQztRQUVwRiw4QkFBeUIsR0FBRyxVQUFDLENBQW1DO1lBQ3BFLGdHQUFnRztZQUMvRixDQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLHlGQUF5RjtZQUN6RixzRkFBc0Y7WUFDdEYsS0FBSSxDQUFDLFVBQVUsQ0FBQztnQkFDWixvRUFBb0U7Z0JBQ3BFLGlFQUFpRTtnQkFDakUsK0RBQStEO2dCQUMvRCxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FB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Q0FBQyxDQUFDLENBQUM7UUFDdEIsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBSmUsWUFBSSxPQUluQixDQUFBO0FBRUQsdURBQXVEO0FBQ3ZEO0lBQ0ksTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDM0QsQ0FBQztBQUZlLGNBQU0sU0FFckIsQ0FBQSIsImZpbGUiOiJjb21wb25lbnRzL2NvbnRleHQtbWVudS9jb250ZXh0TWVudS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wb3NpdGlvblwiO1xuaW1wb3J0IHsgc2FmZUludm9rZSB9IGZyb20gXCIuLi8uLi9jb21tb24vdXRpbHNcIjtcbmltcG9ydCB7IFBvcG92ZXIgfSBmcm9tIFwiLi4vcG9wb3Zlci9wb3BvdmVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9mZnNldCB7XG4gICAgbGVmdDogbnVtYmVyO1xuICAgIHRvcDogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgSUNvbnRleHRNZW51U3RhdGUge1xuICAgIGlzT3Blbj86IGJvb2xlYW47XG4gICAgbWVudT86IEpTWC5FbGVtZW50O1xuICAgIG9mZnNldD86IElPZmZzZXQ7XG4gICAgb25DbG9zZT86ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IENPTlNUUkFJTlRTID0gWyB7IGF0dGFjaG1lbnQ6IFwidG9nZXRoZXJcIiwgcGluOiB0cnVlLCB0bzogXCJ3aW5kb3dcIiB9IF07XG5jb25zdCBUUkFOU0lUSU9OX0RVUkFUSU9OID0gMTAwO1xuXG5jbGFzcyBDb250ZXh0TWVudSBleHRlbmRzIEFic3RyYWN0Q29tcG9uZW50PHt9LCBJQ29udGV4dE1lbnVTdGF0ZT4ge1xuICAgIHB1YmxpYyBzdGF0ZTogSUNvbnRleHRNZW51U3RhdGUgPSB7XG4gICAgICAgIGlzT3BlbjogZmFsc2UsXG4gICAgfTtcblxuICAgIHB1YmxpYyByZW5kZXIoKSB7XG4gICAgICAgIC8vIHByZXZlbnQgcmlnaHQtY2xpY2tpbmcgaW4gYSBjb250ZXh0IG1lbnVcbiAgICAgICAgY29uc3QgY29udGVudCA9IDxkaXYgb25Db250ZXh0TWVudT17dGhpcy5jYW5jZWxDb250ZXh0TWVudX0+e3RoaXMuc3RhdGUubWVudX08L2Rpdj47XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8UG9wb3ZlclxuICAgICAgICAgICAgICAgIGJhY2tkcm9wUHJvcHM9e3sgb25Db250ZXh0TWVudTogdGhpcy5oYW5kbGVCYWNrZHJvcENvbnRleHRNZW51IH19XG4gICAgICAgICAgICAgICAgY29uc3RyYWludHM9e0NPTlNUUkFJTlRTfVxuICAgICAgICAgICAgICAgIGNvbnRlbnQ9e2NvbnRlbnR9XG4gICAgICAgICAgICAgICAgZW5mb3JjZUZvY3VzPXtmYWxzZX1cbiAgICAgICAgICAgICAgICBpc01vZGFsPXt0cnVlfVxuICAgICAgICAgICAgICAgIGlzT3Blbj17dGhpcy5zdGF0ZS5pc09wZW59XG4gICAgICAgICAgICAgICAgb25JbnRlcmFjdGlvbj17dGhpcy5oYW5kbGVQb3BvdmVySW50ZXJhY3Rpb259XG4gICAgICAgICAgICAgICAgcG9zaXRpb249e1Bvc2l0aW9uLlJJR0hUX1RPUH1cbiAgICAgICAgICAgICAgICBwb3BvdmVyQ2xhc3NOYW1lPXtDbGFzc2VzLk1JTklNQUx9XG4gICAgICAgICAgICAgICAgdXNlU21hcnRBcnJvd1Bvc2l0aW9uaW5nPXtmYWxzZX1cbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb249e1RSQU5TSVRJT05fRFVSQVRJT059XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0NsYXNzZXMuQ09OVEVYVF9NRU5VX1BPUE9WRVJfVEFSR0VUfSBzdHlsZT17dGhpcy5zdGF0ZS5vZmZzZXR9IC8+XG4gICAgICAgICAgICA8L1BvcG92ZXI+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHVibGljIHNob3cobWVudTogSlNYLkVsZW1lbnQsIG9mZnNldDogSU9mZnNldCwgb25DbG9zZT86ICgpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzT3BlbjogdHJ1ZSwgbWVudSwgb2Zmc2V0LCBvbkNsb3NlIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBoaWRlKCkge1xuICAgICAgICBjb25zdCB7IG9uQ2xvc2UgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc09wZW46IGZhbHNlLCBvbkNsb3NlOiBudWxsIH0pO1xuICAgICAgICBzYWZlSW52b2tlKG9uQ2xvc2UpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY2FuY2VsQ29udGV4dE1lbnUgPSAoZTogUmVhY3QuU3ludGhldGljRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBwcml2YXRlIGhhbmRsZUJhY2tkcm9wQ29udGV4dE1lbnUgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgICAgLy8gSEFDS0hBQ0s6IFJlYWN0IGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBldmVudCBwb29sIChub3Qgc3VyZSB3aHkgaXQncyBub3QgaW4gdHlwaW5ncyAjNjYpXG4gICAgICAgIChlIGFzIGFueSkucGVyc2lzdCgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vIHdhaXQgZm9yIGJhY2tkcm9wIHRvIGRpc2FwcGVhciBzbyB3ZSBjYW4gZmluZCB0aGUgXCJyZWFsXCIgZWxlbWVudCBhdCBldmVudCBjb29yZGluYXRlcy5cbiAgICAgICAgLy8gdGltZW91dCBkdXJhdGlvbiBpcyBlcXVpdmFsZW50IHRvIHRyYW5zaXRpb24gZHVyYXRpb24gc28gd2Uga25vdyBpdCdzIGFuaW1hdGVkIG91dC5cbiAgICAgICAgdGhpcy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIHJldHJpZ2dlciBjb250ZXh0IG1lbnUgZXZlbnQgYXQgdGhlIGVsZW1lbnQgYmVuZWF0aCB0aGUgYmFja2Ryb3AuXG4gICAgICAgICAgICAvLyBpZiBpdCBoYXMgYSBgY29udGV4dG1lbnVgIGV2ZW50IGhhbmRsZXIgdGhlbiBpdCdsbCBiZSBpbnZva2VkLlxuICAgICAgICAgICAgLy8gaWYgaXQgZG9lc24ndCwgbm8gbmF0aXZlIG1lbnUgd2lsbCBzaG93IChhdCBsZWFzdCBvbiBPU1gpIDooXG4gICAgICAgICAgICBjb25zdCBuZXdUYXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICAgICAgICAgIG5ld1RhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KFwiY29udGV4dG1lbnVcIiwgZSkpO1xuICAgICAgICB9LCBUUkFOU0lUSU9OX0RVUkFUSU9OKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhbmRsZVBvcG92ZXJJbnRlcmFjdGlvbiA9IChuZXh0T3BlblN0YXRlOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGlmICghbmV4dE9wZW5TdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmxldCBjb250ZXh0TWVudTogQ29udGV4dE1lbnU7XG5cbi8qKlxuICogU2hvdyB0aGUgZ2l2ZW4gbWVudSBlbGVtZW50IGF0IHRoZSBnaXZlbiBvZmZzZXQgZnJvbSB0aGUgdG9wLWxlZnQgY29ybmVyIG9mIHRoZSB2aWV3cG9ydC5cbiAqIFRoZSBtZW51IHdpbGwgYXBwZWFyIGJlbG93LXJpZ2h0IG9mIHRoaXMgcG9pbnQgYW5kIHdpbGwgZmxpcCB0byBiZWxvdy1sZWZ0IGlmIHRoZXJlIGlzIG5vdCBlbm91Z2hcbiAqIHJvb20gb25zY3JlZW4uIFRoZSBvcHRpb25hbCBjYWxsYmFjayB3aWxsIGJlIGludm9rZWQgd2hlbiB0aGlzIG1lbnUgY2xvc2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvdyhtZW51OiBKU1guRWxlbWVudCwgb2Zmc2V0OiBJT2Zmc2V0LCBvbkNsb3NlPzogKCkgPT4gdm9pZCkge1xuICAgIGlmIChjb250ZXh0TWVudSA9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGNvbnRleHRNZW51RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRleHRNZW51RWxlbWVudC5jbGFzc0xpc3QuYWRkKENsYXNzZXMuQ09OVEVYVF9NRU5VKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250ZXh0TWVudUVsZW1lbnQpO1xuICAgICAgICBjb250ZXh0TWVudSA9IFJlYWN0RE9NLnJlbmRlcig8Q29udGV4dE1lbnUgLz4sIGNvbnRleHRNZW51RWxlbWVudCkgYXMgQ29udGV4dE1lbnU7XG4gICAgfVxuXG4gICAgY29udGV4dE1lbnUuc2hvdyhtZW51LCBvZmZzZXQsIG9uQ2xvc2UpO1xufVxuXG4vKiogSGlkZSB0aGUgb3BlbiBjb250ZXh0IG1lbnUuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZSgpIHtcbiAgICBpZiAoY29udGV4dE1lbnUgIT0gbnVsbCkge1xuICAgICAgICBjb250ZXh0TWVudS5oaWRlKCk7XG4gICAgfVxufVxuXG4vKiogUmV0dXJuIHdoZXRoZXIgYSBjb250ZXh0IG1lbnUgaXMgY3VycmVudGx5IG9wZW4uICovXG5leHBvcnQgZnVuY3Rpb24gaXNPcGVuKCkge1xuICAgIHJldHVybiBjb250ZXh0TWVudSAhPSBudWxsICYmIGNvbnRleHRNZW51LnN0YXRlLmlzT3Blbjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
