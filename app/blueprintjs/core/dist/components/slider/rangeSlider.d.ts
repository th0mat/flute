import * as React from "react";
import { CoreSlider, ICoreSliderProps } from "./coreSlider";
import { Handle } from "./handle";
export declare type NumberRange = [number, number];
export interface IRangeSliderProps extends ICoreSliderProps {
    /**
     * Range value of slider. Handles will be rendered at each position in the range.
     * @default [0, 10]
     */
    value?: NumberRange;
    /** Callback invoked when the range value changes. */
    onChange?(value: NumberRange): void;
    /** Callback invoked when a handle is released. */
    onRelease?(value: NumberRange): void;
}
export declare class RangeSlider extends CoreSlider<IRangeSliderProps> {
    static defaultProps: IRangeSliderProps;
    displayName: string;
    className: string;
    private handles;
    protected renderFill(): JSX.Element;
    protected renderHandles(): JSX.Element[];
    protected handleTrackClick(event: React.MouseEvent<HTMLElement>): void;
    protected handleTrackTouch(event: React.TouchEvent<HTMLElement>): void;
    protected nearestHandleForValue(value: number, firstHandle: Handle, secondHandle: Handle): Handle;
    protected validateProps(props: IRangeSliderProps): void;
    private addHandleRef;
    private getHandlerForIndex;
    private handleChange;
}
export declare const RangeSliderFactory: React.ComponentFactory<IRangeSliderProps & {
    children?: React.ReactNode;
}, RangeSlider>;
