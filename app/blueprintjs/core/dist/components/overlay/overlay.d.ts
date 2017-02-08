import * as React from "react";
import { IProps } from "../../common/props";
export interface IOverlayableProps {
    /**
     * Whether the overlay should acquire application focus when it first opens.
     * @default true
     */
    autoFocus?: boolean;
    /**
     * Whether pressing the `esc` key should invoke `onClose`.
     * @default true
     */
    canEscapeKeyClose?: boolean;
    /**
     * Whether the overlay should prevent focus from leaving itself. That is, if the user attempts
     * to focus an element outside the overlay and this prop is enabled, then the overlay will
     * immediately bring focus back to itself. If you are nesting overlay components, either disable
     * this prop on the "outermost" overlays or mark the nested ones `inline={true}`.
     * @default true
     */
    enforceFocus?: boolean;
    /**
     * Whether the overlay should be rendered inline or into a new element on `document.body`.
     * This prop essentially determines which element is covered by the backdrop: if `true`,
     * then only its parent is covered; otherwise, the entire application is covered.
     * Set this prop to true when this component is used inside an `Overlay` (such as
     * `Dialog` or `Popover`) to ensure that this component is rendered above its parent.
     * @default false
     */
    inline?: boolean;
    /**
     * If `true` and not `inline`, the `Portal` containing the children is created and attached
     * to the DOM when the overlay is opened for the first time; otherwise this happens when the
     * component mounts. Lazy mounting provides noticeable performance improvements if you have lots
     * of overlays at once, such as on each row of a table.
     * @default true
     */
    lazy?: boolean;
    /**
     * Indicates how long (in milliseconds) the overlay's enter/leave transition takes.
     * This is used by React `CSSTransitionGroup` to know when a transition completes and must match
     * the duration of the animation in CSS. Only set this prop if you override Blueprint's default
     * transitions with new transitions of a different length.
     * @default 100
     */
    transitionDuration?: number;
    /**
     * A callback that is invoked when user interaction causes the overlay to close, such as
     * clicking on the overlay or pressing the `esc` key (if enabled).
     * Receives the event from the user's interaction, if there was an event (generally either a
     * mouse or key event). Note that, since this component is controlled by the `isOpen` prop, it
     * will not actually close itself until that prop becomes `false`.
     */
    onClose?(event?: React.SyntheticEvent<HTMLElement>): void;
}
export interface IBackdropProps {
    /** CSS class names to apply to backdrop element. */
    backdropClassName?: string;
    /** HTML props for the backdrop element. */
    backdropProps?: React.HTMLProps<HTMLDivElement>;
    /**
     * Whether clicking outside the overlay element (either on backdrop when present or on document)
     * should invoke `onClose`.
     * @default true
     */
    canOutsideClickClose?: boolean;
    /**
     * Whether a container-spanning backdrop element should be rendered behind the contents.
     * @default true
     */
    hasBackdrop?: boolean;
}
export interface IOverlayProps extends IOverlayableProps, IBackdropProps, IProps {
    /** Lifecycle callback invoked after the overlay opens and is mounted in the DOM. */
    didOpen?: () => any;
    /**
     * Toggles the visibility of the overlay and its children.
     * This prop is required because the component is controlled.
     */
    isOpen: boolean;
    /**
     * Name of the transition for internal `CSSTransitionGroup`.
     * Providing your own name here will require defining new CSS transition properties.
     * @default "pt-overlay"
     */
    transitionName?: string;
}
export interface IOverlayState {
    hasEverOpened?: boolean;
}
export declare class Overlay extends React.Component<IOverlayProps, IOverlayState> {
    static defaultProps: IOverlayProps;
    private static openStack;
    private static getLastOpened;
    displayName: string;
    private containerElement;
    private refHandlers;
    constructor(props?: IOverlayProps, context?: any);
    render(): JSX.Element;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IOverlayProps): void;
    componentDidUpdate(prevProps: IOverlayProps): void;
    componentWillUnmount(): void;
    private maybeRenderBackdrop();
    private overlayWillClose();
    private overlayWillOpen();
    private bringFocusInsideOverlay;
    private handleBackdropMouseDown;
    private handleDocumentClick;
    private handleContentMount;
    private handleDocumentFocus;
    private handleKeyDown;
}
export declare const OverlayFactory: React.ComponentFactory<IOverlayProps & {
    children?: React.ReactNode;
}, Overlay>;
