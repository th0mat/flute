import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import * as PosUtils from "../../common/position";
import { IProps } from "../../common/props";
import * as TetherUtils from "../../common/tetherUtils";
import { IOverlayableProps } from "../overlay/overlay";
export declare enum PopoverInteractionKind {
    CLICK = 0,
    CLICK_TARGET_ONLY = 1,
    HOVER = 2,
    HOVER_TARGET_ONLY = 3,
}
export interface IPopoverProps extends IOverlayableProps, IProps {
    /** HTML props for the backdrop element. Can be combined with `backdropClassName`. */
    backdropProps?: React.HTMLProps<HTMLDivElement>;
    /**
     * The content displayed inside the popover.
     */
    content?: JSX.Element | string;
    /**
     * Constraints for the underlying Tether instance.
     * See http://tether.io/#constraints.
     */
    constraints?: TetherUtils.ITetherConstraint[];
    /**
     * Initial opened state when uncontrolled.
     * @default false
     */
    defaultIsOpen?: boolean;
    /**
     * The amount of time in milliseconds the popover should remain open after the
     * user hovers off the trigger. The timer is canceled if the user mouses over the
     * target before it expires. This option only applies when `interactionKind` is `HOVER` or
     * `HOVER_TARGET_ONLY`.
     * @default 300
     */
    hoverCloseDelay?: number;
    /**
     * The amount of time in milliseconds the popover should wait before opening after the the
     * user hovers over the trigger. The timer is canceled if the user mouses away from the
     * target before it expires. This option only applies when `interactionKind` is `HOVER` or
     * `HOVER_TARGET_ONLY`.
     * @default 150
     */
    hoverOpenDelay?: number;
    /**
     * Whether a non-inline popover should automatically inherit the dark theme from its parent.
     * @default true
     */
    inheritDarkTheme?: boolean;
    /**
     * The kind of interaction that triggers the display of the popover.
     * @default PopoverInteractionKind.CLICK
     */
    interactionKind?: PopoverInteractionKind;
    /**
     * Prevents the popover from appearing when `true`.
     * @default false
     */
    isDisabled?: boolean;
    /**
     * Enables an invisible overlay beneath the popover that captures clicks and prevents
     * interaction with the rest of the document until the popover is closed.
     * This prop is only available when `interactionKind` is `PopoverInteractionKind.CLICK`.
     * When modal popovers are opened, they become focused.
     * @default false
     */
    isModal?: boolean;
    /**
     * Whether the popover is visible. Passing this prop puts the popover in
     * controlled mode, where the only way to change visibility is by updating this property.
     * @default undefined
     */
    isOpen?: boolean;
    /**
     * Callback invoked in controlled mode when the popover open state *would* change due to
     * user interaction based on the value of `interactionKind`.
     */
    onInteraction?: (nextOpenState: boolean) => void;
    /**
     * A space-delimited string of class names that are applied to the popover (but not the target).
     */
    popoverClassName?: string;
    /**
     * Callback invoked when the popover opens after it is added to the DOM.
     */
    popoverDidOpen?: () => void;
    /**
     * Callback invoked when a popover begins to close.
     */
    popoverWillClose?: () => void;
    /**
     * Callback invoked before the popover opens.
     */
    popoverWillOpen?: () => void;
    /**
     * Space-delimited string of class names applied to the
     * portal that holds the popover if `inline = false`.
     */
    portalClassName?: string;
    /**
     * The position (relative to the target) at which the popover should appear.
     * @default Blueprint.Common.Position.RIGHT
     */
    position?: PosUtils.Position;
    /**
     * The name of the HTML tag to use when rendering the popover target wrapper element (`.pt-popover-target`).
     * @default "span"
     */
    rootElementTag?: string;
    /**
     * Whether the arrow's offset should be computed such that it always points at the center
     * of the target. If false, arrow position is hardcoded via CSS, which expects a 30px target.
     * @default true
     */
    useSmartArrowPositioning?: boolean;
    /**
     * Whether the popover will try to reposition itself
     * if there isn't room for it in its current position.
     * The popover will try to flip to the opposite side of the target element but
     * will not move to an adjacent side.
     * @default false
     */
    useSmartPositioning?: boolean;
}
export interface IPopoverState {
    isOpen?: boolean;
    ignoreTargetDimensions?: boolean;
    targetHeight?: number;
    targetWidth?: number;
}
export declare class Popover extends AbstractComponent<IPopoverProps, IPopoverState> {
    static defaultProps: IPopoverProps;
    displayName: string;
    private hasDarkParent;
    private isContentMounting;
    private cancelOpenTimeout;
    private popoverElement;
    private targetElement;
    private tether;
    private refHandlers;
    constructor(props?: IPopoverProps, context?: any);
    render(): React.DOMElement<React.HTMLProps<HTMLElement>, HTMLElement>;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IPopoverProps): void;
    componentWillUpdate(_: IPopoverProps, nextState: IPopoverState): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    protected validateProps(props: IPopoverProps & {
        children?: React.ReactNode;
    }): void;
    private componentDOMChange();
    private renderPopover();
    private getArrowPositionStyles();
    private getPopoverTransformOrigin();
    private handleContentMount;
    private handleMouseEnter;
    private handleMouseLeave;
    private handlePopoverClick;
    private handleOverlayClose;
    private handleTargetClick;
    private updateArrowPosition();
    private updateTether();
    private destroyTether();
    private setOpenState(isOpen, e?, timeout?);
    private isElementInPopover(element);
}
export declare const PopoverFactory: React.ComponentFactory<IPopoverProps & {
    children?: React.ReactNode;
}, Popover>;
