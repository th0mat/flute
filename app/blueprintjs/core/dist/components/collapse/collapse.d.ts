/// <reference types="dom4" />
import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import { IProps } from "../../common/props";
export interface ICollapseProps extends IProps {
    /**
     * Component to render as the root element.
     * Useful when rendering a Collapse inside a `<table>`, for instance.
     * @default "div"
     */
    component?: React.ReactType;
    /**
     * Whether the component is open or closed.
     * @default false
     */
    isOpen?: boolean;
    /**
     * The length of time the transition takes, in ms. This must match the duration of the animation in CSS.
     * Only set this prop if you override Blueprint's default transitions with new transitions of a different length.
     * @default 200
     */
    transitionDuration?: number;
}
export interface ICollapseState {
    /** The height that should be used for the content animations. This is a CSS value, not just a number. */
    height?: string;
    /** The state the element is currently in. */
    animationState?: AnimationStates;
}
export declare enum AnimationStates {
    CLOSED = 0,
    OPENING = 1,
    OPEN = 2,
    CLOSING_START = 3,
    CLOSING_END = 4,
}
export declare class Collapse extends AbstractComponent<ICollapseProps, ICollapseState> {
    static displayName: string;
    static defaultProps: ICollapseProps;
    state: {
        animationState: AnimationStates;
        height: string;
    };
    private contents;
    private height;
    componentWillReceiveProps(nextProps: ICollapseProps): void;
    render(): React.DOMElement<{
        className: string;
        style: {
            height: string;
            overflow: string;
            transition: string;
        };
    }, Element>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private contentsRefHandler;
    private onDelayedStateChange();
}
